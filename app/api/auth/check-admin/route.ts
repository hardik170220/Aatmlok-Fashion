import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Check if any admin user exists
    const adminUser = await User.findOne({ role: "admin" })

    return NextResponse.json({ exists: !!adminUser })
  } catch (error) {
    console.error("Error checking admin:", error)
    return NextResponse.json({ error: "Failed to check admin" }, { status: 500 })
  }
}

