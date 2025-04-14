"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        // Explicitly request only featured products
        const response = await fetch("/api/products?featured=true&limit=4")

        if (!response.ok) {
          throw new Error("Failed to fetch featured products")
        }

        const data = await response.json()
        console.log("Featured products:", data) // Debug log
        setProducts(data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        setError("Failed to load featured products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 h-[350px]">
            <div className="h-[250px] w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No featured products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product: any) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  )
}
