import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/order"

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    await connectToDatabase()

    // Get all orders
    const orders = await Order.find().sort({ createdAt: -1 }).lean()
    
    if (!orders || orders.length === 0) {
      return NextResponse.json([])
    }

    // Extract unique customers from orders
    const customersMap = new Map()

    orders.forEach((order) => {
      if (!order.customer || !order.customer.email) return
      
      const customerEmail = order.customer.email

      if (!customersMap.has(customerEmail)) {
        // Store the first occurrence of this customer
        customersMap.set(customerEmail, {
          _id: order._id.toString(), // Using order ID as a unique identifier
          name: order.customer.name || '',
          email: order.customer.email,
          phone: order.customer.phone || '',
          address: order.customer.address || '',
          createdAt: order.createdAt,
          orderCount: 1,
        })
      } else {
        // Increment order count for existing customer
        const customer = customersMap.get(customerEmail)
        customer.orderCount += 1
      }
    })

    // Convert map to array
    const customers = Array.from(customersMap.values())

    // Sort by order count (highest first)
    customers.sort((a, b) => b.orderCount - a.orderCount)

    // Set proper headers
    return new NextResponse(JSON.stringify(customers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error:any) {
    console.error("Error fetching customers from orders:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch customers", details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}