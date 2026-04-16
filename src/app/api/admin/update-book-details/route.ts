import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { bookId, category, stock, imageUrl } = body;

    // Validate required fields
    if (!bookId || !category) {
      return NextResponse.json(
        { error: "Book ID and category are required" },
        { status: 400 }
      );
    }

    // Handle imageUrl - extract URL if it's an object
    let finalImageUrl = imageUrl;
    if (
      typeof imageUrl === "object" &&
      imageUrl !== null &&
      "url" in imageUrl
    ) {
      finalImageUrl = imageUrl.url;
    }

    // Update book details
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        category,
        stock,
        imageUrl: finalImageUrl,
        needsReview: false, // Mark as reviewed by admin
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Book details updated successfully",
      success: true,
      book: updatedBook,
    });
  } catch (error: any) {
    console.error("Error updating book details:", error);
    return NextResponse.json(
      { error: error.message || "Error updating book details" },
      { status: 500 }
    );
  }
}
