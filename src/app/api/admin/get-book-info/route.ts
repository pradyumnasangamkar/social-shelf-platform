import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database first
    await ConnectDB();

    const bookArray = await Book.find();
    const totalBooks = bookArray.length;
    // const availableBooks = bookArray.filter((book) => book.available).length;
    const categories = [...new Set(bookArray.map((book) => book.category))];
    // const rentedBooks = totalBooks - availableBooks;

    return NextResponse.json({
      message: "Book statistics fetched successfully",
      success: true,
      stats: {
        totalBooks,
        // availableBooks,
        categories,
        // rentedBooks,
      },
      bookArray,
    });
  } catch (error: any) {
    console.error("Book fetching error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
