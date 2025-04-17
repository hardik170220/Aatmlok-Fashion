import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Product from "@/models/product"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const inStock = searchParams.get("inStock")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    // Build query based on filters
    const query: any = {}

    if (category) {
      // Make category search case-insensitive
      query.category = { $regex: new RegExp(`^${category}$`, "i") }
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (inStock === "true") {
      query.stock = { $gt: 0 }
    }

    // Add featured filter
    if (featured === "true") {
      query.featured = true
    }

    console.log("Query:", JSON.stringify(query))

    let productsQuery = Product.find(query).sort({ createdAt: -1 })

    if (limit) {
      productsQuery = productsQuery.limit(limit)
    }

    const products = await productsQuery
    console.log(`Found ${products.length} products`)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const data = await request.json()
    const product = new Product(data)
    await product.save()

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
