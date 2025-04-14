// File: app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

// Make sure to export these functions directly
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Debug log to verify the API is hit
    console.log("Register API endpoint hit");

    const { name, email, password, role } = await request.json();
    console.log("Received registration data:", { name, email, role });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // Make sure your User model handles password hashing
      role: role || "customer",
    });

    await user.save();
    console.log("New user created with ID:", user._id);

    // Don't return the password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error: any) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: error.message || "Failed to register user" }, { status: 500 });
  }
}

// Optional: Add a GET handler for testing
export async function GET() {
  return NextResponse.json({ message: "Register endpoint is working" }, { status: 200 });
}