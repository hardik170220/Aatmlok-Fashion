import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import mongoose from "mongoose"

// Define Contact schema
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
)

// Get Contact model (create if it doesn't exist)
const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema)

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Create new contact message
    const contact = new Contact(data)
    await contact.save()

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

