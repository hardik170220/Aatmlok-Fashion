"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ImageUpload } from "@/components/admin/image-upload"
import { useToast } from "@/components/ui/use-toast"

export default function NewCategoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    imagePublicId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleImageUploaded = (imageData: { url: string; public_id: string }) => {
    console.log("Image uploaded:", imageData)
    setFormData((prev) => ({
      ...prev,
      image: imageData.url,
      imagePublicId: imageData.public_id,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setValidationErrors({})

    try {
      // Validate form data
      if (!formData.name) {
        setValidationErrors({ name: "Category name is required" })
        throw new Error("Category name is required")
      }

      console.log("Submitting category with data:", formData)

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.validationErrors) {
          setValidationErrors(data.validationErrors)
        }
        throw new Error(data.error || "Failed to create category")
      }

      toast({
        title: "Category created",
        description: "The category has been created successfully",
      })

      router.push("/admin/categories")
    } catch (error: any) {
      console.error("Error creating category:", error)
      setError(error.message || "Failed to create category. Please try again.")

      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Add New Category</h1>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className={validationErrors.name ? "text-red-500" : ""}>
                  Category Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter category name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={validationErrors.name ? "border-red-500" : ""}
                />
                {validationErrors.name && <p className="text-sm text-red-500 mt-1">{validationErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter category description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <ImageUpload onImageUploaded={handleImageUploaded} />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
