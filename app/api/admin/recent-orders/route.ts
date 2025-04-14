import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/order"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get the 5 most recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5)

    return NextResponse.json(recentOrders)
  } catch (error) {
    console.error("Error fetching recent orders:", error)
    return NextResponse.json({ error: "Failed to fetch recent orders" }, { status: 500 })
  }
}

