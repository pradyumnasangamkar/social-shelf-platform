import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";

export async function POST(request: NextRequest) {
  try {
    // Connect to database first
    await ConnectDB();

    const reqBody = await request.json();
    const { fullname, email, password, role } = reqBody;

    console.log("Registration attempt for:", email);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser.email);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error:any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
