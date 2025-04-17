"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubcategoryFilterProps {
  mainCategory: string
  onFilterChange: (subcategories: string[]) => void
}

export function SubcategoryFilter({ mainCategory, onFilterChange }: SubcategoryFilterProps) {
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Define subcategories for main categories
  useEffect(() => {
    setIsLoading(true)

    // This is a simple mapping of main categories to subcategories
    // In a real app, you might fetch this from an API
    const subcategoryMap: Record<string, string[]> = {
      jewelry: ["Necklaces", "Earrings", "Bangles", "Rings", "Bracelets"],
      clothing: ["Dresses", "Sarees", "Suits", "Tops", "Skirts"],
      // Add more mappings as needed
    }

    const normalizedCategory = mainCategory.toLowerCase()
    const categorySubcategories = subcategoryMap[normalizedCategory] || []

    setSubcategories(categorySubcategories)
    setIsLoading(false)
  }, [mainCategory])

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories((prev) => {
      const newSelection = prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]

      // Notify parent component about the change
      onFilterChange(newSelection)
      return newSelection
    })
  }

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded-md"></div>
  }

  if (subcategories.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {subcategories.map((subcategory) => (
        <div key={subcategory} className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center justify-start p-2 w-full"
            onClick={() => handleSubcategoryToggle(subcategory)}
          >
            <div className="h-4 w-4 border rounded-sm mr-2 flex items-center justify-center">
              {selectedSubcategories.includes(subcategory) && <Check className="h-3 w-3" />}
            </div>
            <span>{subcategory}</span>
          </Button>
        </div>
      ))}
    </div>
  )
}
