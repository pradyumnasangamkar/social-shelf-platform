import { ConnectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/Event.model";
import EventRegistration from "@/models/EventRegistration.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";

export async function GET() {
  try {
    await ConnectDB();

    const session = (await getServerSession(authOptions)) as Session & {
      user: {
        email: string;
      };
    };

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all events
    const events = await Event.find().sort({ date: 1 });

    // Get all registrations for each event
    const eventsWithRegistrations = await Promise.all(
      events.map(async (event) => {
        const registrations = await EventRegistration.find({
          eventId: event._id,
        })
          .populate("userId", "name email")
          .sort({ createdAt: -1 });

        return {
          ...event.toObject(),
          registeredUsers: registrations.map((reg) => ({
            _id: reg._id,
            name: reg.userName,
            email: reg.userEmail,
            phone: reg.userPhone || "Not provided",
          })),
        };
      })
    );

    return NextResponse.json({
      success: true,
      events: eventsWithRegistrations,
    });
  } catch (error) {
    console.error("Error fetching events with registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch events with registrations" },
      { status: 500 }
    );
  }
}
