import { ConnectDB } from "@/dbConfig/dbConfig";
import Event from "@/models/Event.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const {
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      capacity,
      category,
    } = await request.json();

    

    console.log({
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      capacity,
      category,
    } );

    // if (
    //   !title ||
    //   !description ||
    //   !date ||
    //   !time ||
    //   !location ||
    //   !imageUrl ||
    //   !capacity ||
    //   !category
    // ) {
    //     return NextResponse.json(
    //         {error:"Provide All the Required Fields !"},
    //         {status:401}
    //     )
    // }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      capacity,
      category,
    })

    const newEventAdded = await newEvent.save();

    return NextResponse.json(
      {message : "Event Created SuccessFully !",
        status:201,
        newEventAdded
      }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error While Creating an Event !" },
      { status: 500 }
    );
  }
}
