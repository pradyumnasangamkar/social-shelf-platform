import { ConnectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/Event.model";
import EventRegistration from "@/models/EventRegistration.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await ConnectDB();

    // Get auth session
    const authSession = await getServerSession(authOptions);

    if (!authSession?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Start a session for transaction
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();

    try {
      // Find the event
      const event = await Event.findOne({ _id: eventId });

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      // Check if user is already registered
      const existingRegistration = await EventRegistration.findOne({
        eventId,
        userEmail: authSession.user.email,
        status: "registered",
      });

      if (existingRegistration) {
        return NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        );
      }

      // Count current registrations
      const registeredCount = await EventRegistration.countDocuments({
        eventId,
        status: "registered",
      });

      // Check if event is full
      if (registeredCount >= event.capacity) {
        return NextResponse.json({ error: "Event is full" }, { status: 400 });
      }

      // Create new registration
      const registration = new EventRegistration({
        eventId,
        userId: authSession.user.id,
        userName: authSession.user.name,
        userEmail: authSession.user.email,
        status: "registered",
        registeredAt: new Date(),
      });

      await registration.save({ session: dbSession });

      // Commit the transaction
      await dbSession.commitTransaction();
      dbSession.endSession();

      return NextResponse.json({
        success: true,
        message: "Successfully registered for the event",
        registration,
      });
    } catch (error) {
      // If an error occurs, abort the transaction
      await dbSession.abortTransaction();
      dbSession.endSession();
      throw error;
    }
  } catch (error: unknown) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
}
