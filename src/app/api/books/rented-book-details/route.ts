import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
  try {
    await ConnectDB();

    // Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find all rented books for the user by email
    const rentedBooks = await RentedBook.find({
      renterEmail: session.user.email,
      status: { $in: ["pending", "active", "overdue", "returned", "rejected"] }, // Include all statuses
    }).sort({ createdAt: -1 }); // Sort by creation date, newest first

    // Calculate days remaining for each book
    const booksWithDetails = rentedBooks.map((book) => {
      const today = new Date();
      const dueDate = new Date(book.dueDate);
      const daysRemaining = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Determine if the book is overdue (only for active books)
      const isOverdue = book.status === "active" && daysRemaining < 0;

      // If book is overdue, update its status
      if (isOverdue) {
        book.status = "overdue";
      }

      return {
        ...book.toObject(),
        daysRemaining: book.status === "active" ? daysRemaining : undefined,
        isOverdue,
        // Include approval details
        approvalDetails:
          book.status === "pending"
            ? {
                message: "Waiting for admin approval",
                requestedAt: book.createdAt,
              }
            : book.status === "rejected"
            ? {
                message: "Request was rejected",
                rejectedAt: book.updatedAt,
              }
            : book.status === "active"
            ? {
                message: "Request approved",
                approvedAt: book.approvedAt,
                approvedBy: book.approvedBy,
              }
            : undefined,
      };
    });

    return NextResponse.json({
      success: true,
      rentedBooks: booksWithDetails,
    });
  } catch (error: unknown) {
    console.error("Error fetching rented books:", error);
    return NextResponse.json(
      { error: "Failed to fetch rented books" },
      { status: 500 }
    );
  }
}
