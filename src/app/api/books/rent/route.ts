import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import RentedBook from "@/models/RentedBooks.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const body = await req.json();
    console.log("Received rental request:", body);

    const { bookId, userId, userName, userEmail } = body;

    // Validate required fields
    if (!bookId || !userId || !userName || !userEmail) {
      console.log("Missing fields:", { bookId, userId, userName, userEmail });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the book
    const book = await Book.findOne({ bookId });
    if (!book) {
      console.log("Book not found:", bookId);
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Check if book is available
    if (book.stock <= 0) {
      console.log("Book out of stock:", bookId);
      return NextResponse.json(
        { error: "Book is out of stock" },
        { status: 400 }
      );
    }

    // Check if user has any pending or active rental for this book
    const existingRental = await RentedBook.findOne({
      bookId,
      renterId: userId,
      status: { $in: ["active", "pending"] },
    });

    if (existingRental) {
      console.log("User already has a pending/active rental for this book:", {
        bookId,
        userId,
      });
      return NextResponse.json(
        { error: "You already have a pending or active rental for this book" },
        { status: 400 }
      );
    }

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create rental request with pending status
    const newRental = new RentedBook({
      bookId,
      renterId: userId,
      renterName: userName,
      renterEmail: userEmail,
      bookTitle: book.title,
      dueDate,
      status: "pending",
      approvedBy: null,
      approvedAt: null,
    });

    await newRental.save();

    console.log("Rental request created successfully:", {
      bookId,
      userId,
      rentalId: newRental._id,
    });

    return NextResponse.json({
      message:
        "Rental request submitted successfully. Waiting for admin approval.",
      rental: {
        id: newRental._id,
        bookTitle: book.title,
        status: newRental.status,
        requestedAt: newRental.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("Error creating rental request:", error);
    return NextResponse.json(
      { error: "Failed to create rental request" },
      { status: 500 }
    );
  }
}
