import { ConnectDB } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await ConnectDB();

    const reqBody = await request.json();
    const { name, email, phone, message } = reqBody;

    // Create new contact entry
    const newContact = new Contact({
      fullname: name,
      email,
      phoneno: phone,
      message,
    });

    const savedContact = await newContact.save();
    console.log("Contact form submitted successfully:", savedContact.email);

    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
      savedContact,
    });
  } catch (error: unknown) {
    console.error("Contact form submission error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
