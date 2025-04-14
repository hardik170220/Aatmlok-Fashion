import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/order"
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const customer = searchParams.get("customer")

    // Build query based on filters
    const query: any = {}

    if (status) {
      query.status = status
    }

    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) query.createdAt.$gte = new Date(startDate)
      if (endDate) query.createdAt.$lte = new Date(endDate)
    }

    if (customer) {
      query["customer.name"] = { $regex: customer, $options: "i" }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const data = await request.json()

    // Validate required fields
    if (
      !data.customer ||
      !data.customer.name ||
      !data.customer.email ||
      !data.customer.phone ||
      !data.customer.address
    ) {
      return NextResponse.json({ error: "Customer information is required" }, { status: 400 })
    }

    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 })
    }

    // Process items with safer ObjectId handling
    const items = data.items.map((item: any) => {
      // Create a safe copy of the item
      const safeItem = { ...item }

      // Only convert to ObjectId if it's a valid ObjectId string
      if (item.productId && mongoose.Types.ObjectId.isValid(item.productId)) {
        safeItem.productId = new mongoose.Types.ObjectId(item.productId)
      }

      return safeItem
    })

    // Generate order number manually
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")

    // Find the count of orders created today
    const count =
      (await Order.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      })) || 0

    // Format: AAT-YYMMDD-XXXX (where XXXX is a sequential number)
    const orderNumber = `AAT-${year}${month}${day}-${(count + 1).toString().padStart(4, "0")}`

    // Create new order with manually generated order number
    const order = new Order({
      orderNumber,
      customer: data.customer,
      items: items,
      totalAmount: data.totalAmount,
      notes: data.notes,
      status: "Pending",
    })

    await order.save()

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order: " + (error as Error).message }, { status: 500 })
  }
}
