import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Product from "@/models/product"
import Order from "@/models/order"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get only featured products
    const featuredProducts = await Product.find({ featured: true })

    // If no featured products, return empty array
    if (featuredProducts.length === 0) {
      return NextResponse.json([])
    }

    // Get all orders
    const orders = await Order.find()

    // Count product occurrences in orders
    const productCounts: Record<string, { count: number; product: any }> = {}

    // Initialize all featured products with zero count
    featuredProducts.forEach((product) => {
      productCounts[product._id.toString()] = {
        count: 0,
        product,
      }
    })

    // Count orders for each product
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.productId.toString()
        if (productCounts[productId]) {
          productCounts[productId].count += item.quantity
        }
      })
    })

    // Convert to array and sort by count
    const popularProducts = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .map(({ count, product }) => ({
        _id: product._id,
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        stock: product.stock,
        featured: product.featured,
        orders: count,
      }))

    return NextResponse.json(popularProducts)
  } catch (error) {
    console.error("Error fetching popular products:", error)
    return NextResponse.json({ error: "Failed to fetch popular products" }, { status: 500 })
  }
}
