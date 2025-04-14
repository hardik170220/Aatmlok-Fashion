import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Product from "@/models/product"
import Order from "@/models/order"
import User from "@/models/user"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get current date and previous month date
    const currentDate = new Date()
    const previousMonthDate = new Date()
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1)

    // Get total orders
    const totalOrders = await Order.countDocuments()

    // Get orders from previous month
    const previousMonthOrders = await Order.countDocuments({
      createdAt: { $gte: previousMonthDate, $lt: currentDate },
    })

    // Get orders from the month before previous month
    const twoMonthsAgoDate = new Date(previousMonthDate)
    twoMonthsAgoDate.setMonth(twoMonthsAgoDate.getMonth() - 1)
    const twoMonthsAgoOrders = await Order.countDocuments({
      createdAt: { $gte: twoMonthsAgoDate, $lt: previousMonthDate },
    })

    // Calculate order growth
    const orderGrowth =
      twoMonthsAgoOrders === 0 ? 100 : ((previousMonthOrders - twoMonthsAgoOrders) / twoMonthsAgoOrders) * 100

    // Get total products
    const totalProducts = await Product.countDocuments()

    // Get products added in previous month
    const previousMonthProducts = await Product.countDocuments({
      createdAt: { $gte: previousMonthDate, $lt: currentDate },
    })

    // Get products added in the month before previous month
    const twoMonthsAgoProducts = await Product.countDocuments({
      createdAt: { $gte: twoMonthsAgoDate, $lt: previousMonthDate },
    })

    // Calculate product growth
    const productGrowth =
      twoMonthsAgoProducts === 0 ? 100 : ((previousMonthProducts - twoMonthsAgoProducts) / twoMonthsAgoProducts) * 100

    // Get total customers (users with role 'customer')
    const totalCustomers = await User.countDocuments({ role: "customer" })

    // Get customers registered in previous month
    const previousMonthCustomers = await User.countDocuments({
      role: "customer",
      createdAt: { $gte: previousMonthDate, $lt: currentDate },
    })

    // Get customers registered in the month before previous month
    const twoMonthsAgoCustomers = await User.countDocuments({
      role: "customer",
      createdAt: { $gte: twoMonthsAgoDate, $lt: previousMonthDate },
    })

    // Calculate customer growth
    const customerGrowth =
      twoMonthsAgoCustomers === 0
        ? 100
        : ((previousMonthCustomers - twoMonthsAgoCustomers) / twoMonthsAgoCustomers) * 100

    // Calculate total revenue
    const orders = await Order.find()
    const revenue = orders.reduce((total, order) => total + order.totalAmount, 0)

    // Calculate revenue from previous month
    const previousMonthOrdersData = await Order.find({
      createdAt: { $gte: previousMonthDate, $lt: currentDate },
    })
    const previousMonthRevenue = previousMonthOrdersData.reduce((total, order) => total + order.totalAmount, 0)

    // Calculate revenue from the month before previous month
    const twoMonthsAgoOrdersData = await Order.find({
      createdAt: { $gte: twoMonthsAgoDate, $lt: previousMonthDate },
    })
    const twoMonthsAgoRevenue = twoMonthsAgoOrdersData.reduce((total, order) => total + order.totalAmount, 0)

    // Calculate revenue growth
    const revenueGrowth =
      twoMonthsAgoRevenue === 0 ? 100 : ((previousMonthRevenue - twoMonthsAgoRevenue) / twoMonthsAgoRevenue) * 100

    const stats = {
      totalOrders,
      totalProducts,
      totalCustomers,
      revenue,
      orderGrowth,
      productGrowth,
      customerGrowth,
      revenueGrowth,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}

