import { ConnectDB } from "@/dbConfig/dbConfig";
import Donate from "@/models/Donate.model";
import BookId from "@/utils/BookId";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const donatedBooks = await Donate.find().sort({ createdAt: -1 });
    return NextResponse.json({ donatedBooks });
  } catch (error: any) {
    console.error("Error fetching donated books:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await ConnectDB();

    const reqBody = await request.json();
    const { name, email, title, author, condition, message } = reqBody;

    const bookId = BookId();

    const newDonate = new Donate({
      bookId,
      name,
      email,
      title,
      author,
      condition,
      message,
    });

    const bookDonated = await newDonate.save();
    console.log("Book Donation is done successfully:", bookDonated.email);

    return NextResponse.json({
      message: "Book Donation successfully",
      success: true,
      bookDonated,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
