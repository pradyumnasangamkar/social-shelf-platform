import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import BookId from "@/utils/BookId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await ConnectDB();

    const reqBody = await request.json();
    const { title, author, category, imageUrl } = reqBody;

    const bookId = BookId();

    const newBook = new Book({
      bookId,
      title,
      author,
      category,
      imageUrl,
    });

    const newBookAdded = await newBook.save();
    console.log("Book Donation is done successfully:", newBookAdded.email);

    return NextResponse.json({
      message: "Book Donation successfully",
      success: true,
      newBookAdded,
    });
  } catch (error: any) {
    console.error("Book Add error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
