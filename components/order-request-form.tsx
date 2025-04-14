"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface OrderRequestFormProps {
  onBack: () => void
}

export function OrderRequestForm({ onBack }: OrderRequestFormProps) {
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        throw new Error("Please fill all required fields")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      // Validate phone number (basic validation)
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(formData.phone)) {
        throw new Error("Please enter a valid 10-digit phone number")
      }

      // Check if cart is empty
      if (items.length === 0) {
        throw new Error("Your cart is empty. Please add items to your cart before placing an order.")
      }

      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: totalPrice,
        notes: formData.notes,
      }

      console.log("Submitting order:", orderData)

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("Order submission error:", responseData)
        throw new Error(responseData.error || "Failed to submit order")
      }

      setIsSubmitted(true)
      clearCart()

      toast({
        title: "Order Submitted",
        description: "Your order has been submitted successfully. We'll contact you soon!",
      })
    } catch (error: any) {
      console.error("Error submitting order:", error)
      setError(error.message || "Failed to submit your order. Please try again.")

      toast({
        title: "Error",
        description: error.message || "Failed to submit your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto py-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Request Submitted!</h2>
        <p className="text-gray-500 mb-6">
          Thank you for your order request. We will contact you shortly to confirm your order details.
        </p>
        <Button onClick={onBack}>Return to Cart</Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <div className="rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Contact Information</h2>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Your phone number"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Your delivery address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any specific requirements or questions"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Order Request"}
          </Button>
        </form>
      </div>
    </div>
  )
}
