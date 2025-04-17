import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/category"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const categories = await Category.find().sort({ name: 1 })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const data = await request.json()

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${data.name}$`, "i") },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Category with this name already exists" }, { status: 400 })
    }

    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const category = new Category(data)
    await category.save()

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error("Error creating category:", error)

    // Return validation errors if available
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).reduce((errors: Record<string, string>, key) => {
        errors[key] = error.errors[key].message
        return errors
      }, {})

      return NextResponse.json(
        {
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
