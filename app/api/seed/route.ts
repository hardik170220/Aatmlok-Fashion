import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@aatmlok.com" })

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists" })
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("admin123", salt)

    const adminUser = new User({
      name: "Admin User",
      email: "admin@aatmlok.com",
      password: hashedPassword,
      role: "admin",
    })

    await adminUser.save()

    return NextResponse.json({ message: "Admin user created successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

