"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrderRequestForm } from "@/components/order-request-form"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const [showOrderForm, setShowOrderForm] = useState(false)

  if (totalItems === 0) {
    return (
      <div className="container px-4 py-16 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {!showOrderForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="divide-y">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 relative h-24 w-24 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium">{item.name}</h3>
                            <p className="text-base font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/products">
                <Button variant="outline" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">Subtotal ({totalItems} items)</p>
                  <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>₹{totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" onClick={() => setShowOrderForm(true)}>
                Request Order
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <OrderRequestForm onBack={() => setShowOrderForm(false)} />
      )}
    </div>
  )
}

