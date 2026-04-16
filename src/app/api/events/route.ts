import { ConnectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/Event.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
