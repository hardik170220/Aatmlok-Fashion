"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      category,
      quantity: 1,
    })
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="block">
        <div className="relative h-[150px] w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=250&width=250"}
            alt={name}
            fill
            className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>
      </Link>
      <div className="p-2">
        <div className="mb-2 flex items-center justify-between">
          <Link href={`/products/category/${category}`}>
            <span className="text-xs font-medium text-gray-500 hover:text-pink-600">{category}</span>
          </Link>
        </div>
        <Link href={`/products/${id}`}>
          <h3 className="mb-2 text-lg font-medium text-gray-900 hover:text-pink-600">{name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-pink-600">₹{price.toFixed(2)}</p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full hover:bg-pink-600 hover:text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

