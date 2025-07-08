import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/db";
import User from "../../../../../models/User";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return NextResponse.json(
        { error: "User name already exists" },
        { status: 400 }
      );
    } 
    if (existingEmail) {
      return NextResponse.json(
        { error: "User email already exists" },
        { status: 400 }
      );
    }
    
    await User.create({ username, email, password });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
