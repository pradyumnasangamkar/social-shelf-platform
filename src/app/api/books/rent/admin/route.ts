import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    // Get all rented books with pending status
    const rentedBooks = await RentedBook.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();

    // Format dates and add additional information
    const formattedBooks = rentedBooks.map((book) => ({
      id: book._id,
      bookId: book.bookId,
      bookTitle: book.bookTitle,
      renterName: book.renterName,
      renterEmail: book.renterEmail,
      status: book.status,
      rentDate: book.rentDate,
      dueDate: book.dueDate,
      returnDate: book.returnDate,
      fine: book.fine,
      approvedBy: book.approvedBy,
      approvedAt: book.approvedAt,
      createdAt: book.createdAt,
    }));

    return NextResponse.json({
      success: true,
      rentedBooks: formattedBooks,
    });
  } catch (error: unknown) {
    console.error("Error fetching rented books:", error);
    return NextResponse.json(
      { error: "Failed to fetch rented books" },
      { status: 500 }
    );
  }
}
