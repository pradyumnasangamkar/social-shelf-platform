import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import { NextResponse } from "next/server";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: Request) {
  try {
    await ConnectDB();

    // Get session
    const session = (await getServerSession(authOptions)) as Session;

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

    // Find the rented book for the user
    const rentedBook = await RentedBook.findOne({
      bookId,
      renterEmail: session.user.email,
      status: { $in: ["active", "overdue", "returned"] },
    });

    if (!rentedBook) {
      return NextResponse.json(
        { error: "Rented book not found" },
        { status: 404 }
      );
    }

    // Calculate fine if overdue
    const today = new Date();
    const dueDate = new Date(rentedBook.dueDate);
    let overdueDays = Math.ceil(
      (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    overdueDays = overdueDays > 0 ? overdueDays : 0;
    const fine = overdueDays * 10;

    return NextResponse.json({
      success: true,
      fine,
      overdueDays,
      dueDate: dueDate.toISOString(),
      today: today.toISOString(),
    });
  } catch (error: unknown) {
    console.error("Error calculating fine:", error);
    return NextResponse.json(
      { error: "Failed to calculate fine" },
      { status: 500 }
    );
  }
}
