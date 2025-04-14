"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface ProductData {
  _id: string
  name: string
  image: string
  category: string
  price: number
  stock: number
  orders: number
}

export function AdminPopularProducts() {
  const { toast } = useToast()
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)

        // Get token from localStorage
        const token = localStorage.getItem("adminToken")
        if (!token) {
          throw new Error("Not authenticated")
        }

        const response = await fetch("/api/admin/popular-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch popular products")
        }

        const data = await response.json()
        console.log("Popular products data:", data) // Debug log
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching popular products:", error)
        setError("Failed to load popular products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("adminToken")
      if (!token) {
        throw new Error("Not authenticated")
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      // Remove product from state
      setProducts(products.filter((product) => product._id !== productId))

      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully",
      })
    } catch (error: any) {
      console.error("Error deleting product:", error)

      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-3 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Popular Products</CardTitle>
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No products found</div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product._id} className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder.svg?height=48&width=48"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{product.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>{product.orders} orders</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">₹{product.price}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product._id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
