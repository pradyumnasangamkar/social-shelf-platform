import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: Request) {
  try {
    await ConnectDB();

    // Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Find the rented book
    const rentedBook = await RentedBook.findOne({
      bookId,
      renterEmail: session.user.email,
      status: "active", // Only active books can be renewed
    });

    if (!rentedBook) {
      return NextResponse.json(
        { error: "Book not found or cannot be renewed" },
        { status: 404 }
      );
    }

    // Calculate new due date (14 days from now)
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + 14);

    // Update the book
    rentedBook.dueDate = newDueDate;
    await rentedBook.save();

    return NextResponse.json({
      success: true,
      message: "Book renewed successfully",
      newDueDate,
    });
  } catch (error: unknown) {
    console.error("Error renewing book:", error);
    return NextResponse.json(
      { error: "Failed to renew book" },
      { status: 500 }
    );
  }
}
