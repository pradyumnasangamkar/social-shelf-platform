import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import Donate from "@/models/Donate.model";
import BookId from "@/utils/BookId";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { title, author, donorName, donorEmail, bookId } = body;

    if (!title || !author || !donorName || !donorEmail || !bookId) {
      return NextResponse.json(
        { error: "Title, author, donor name, email and bookId are required" },
        { status: 400 }
      );
    }

    // Check if book already exists
    const existingBook = await Book.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") },
      author: { $regex: new RegExp(`^${author}$`, "i") },
    });

    let book;
    if (existingBook) {
      // Update stock of existing book
      existingBook.stock += 1;
      existingBook.donorName = donorName;
      existingBook.donorEmail = donorEmail;
      existingBook.needsReview = true;
      book = await existingBook.save();
    } else {
      // Create new book
      const newBookId = BookId();
      book = await Book.create({
        bookId: newBookId,
        title,
        author,
        category: "Donated",
        stock: 1,
        imageUrl: "",
        donorName,
        donorEmail,
        available: true,
        addedAt: new Date(),
        needsReview: true,
      });
    }

    // Mark the donation as accepted
    await Donate.findOneAndUpdate(
      { bookId },
      { accepted: true },
      { new: true }
    );

    return NextResponse.json({
      message: existingBook
        ? "Book stock updated successfully"
        : "New book added successfully",
      success: true,
      book,
    });
  } catch (error: any) {
    console.error("Error adding donated book:", error);
    return NextResponse.json(
      { error: error.message || "Error adding book" },
      { status: 500 }
    );
  }
}
