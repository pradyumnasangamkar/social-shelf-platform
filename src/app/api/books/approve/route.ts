import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import RentedBook from "@/models/RentedBooks.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const body = await req.json();
    console.log("Received rental approval request:", body);

    const { rentalId, adminId, action } = body;

    // Validate required fields
    if (!rentalId || !adminId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate action
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    // Find the rental request
    const rental = await RentedBook.findOne({
      _id: rentalId,
      status: "pending",
    });
    if (!rental) {
      return NextResponse.json(
        { error: "Rental request not found or already processed" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      // Find the book and check stock
      const book = await Book.findOne({ bookId: rental.bookId });
      if (!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }

      if (book.stock <= 0) {
        return NextResponse.json(
          { error: "Book is out of stock" },
          { status: 400 }
        );
      }

      // Update book stock
      book.stock -= 1;
      await book.save();

      // Update rental status
      rental.status = "active";
      rental.approvedBy = adminId;
      rental.approvedAt = new Date();
      await rental.save();

      return NextResponse.json({
        message: "Rental request approved successfully",
        rental: {
          id: rental._id,
          bookTitle: rental.bookTitle,
          status: rental.status,
          approvedAt: rental.approvedAt,
        },
        remainingStock: book.stock,
      });
    } else {
      // Reject the rental request
      rental.status = "rejected";
      rental.approvedBy = adminId;
      rental.approvedAt = new Date();
      await rental.save();

      return NextResponse.json({
        message: "Rental request rejected successfully",
        rental: {
          id: rental._id,
          bookTitle: rental.bookTitle,
          status: rental.status,
          rejectedAt: rental.approvedAt,
        },
      });
    }
  } catch (error: unknown) {
    console.error("Error processing rental request:", error);
    return NextResponse.json(
      { error: "Failed to process rental request" },
      { status: 500 }
    );
  }
}
