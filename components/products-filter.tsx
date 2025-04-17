"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductsFilterProps {
  currentCategory?: string
}

export function ProductsFilter({ currentCategory }: ProductsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([500, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isAvailableOnly, setIsAvailableOnly] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Initialize filters from URL params
  useEffect(() => {
    if (!isInitialized) {
      const minPrice = searchParams.get("minPrice")
      const maxPrice = searchParams.get("maxPrice")
      const category = searchParams.get("category")
      const inStock = searchParams.get("inStock")

      if (minPrice && maxPrice) {
        setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
      }

      if (category) {
        setSelectedCategories(category.split(","))
      } else if (currentCategory) {
        // If we're on a category page, pre-select that category
        setSelectedCategories([currentCategory])
      }

      if (inStock === "true") {
        setIsAvailableOnly(true)
      }

      setIsInitialized(true)
    }
  }, [searchParams, isInitialized, currentCategory])

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]

      applyFilters({
        categories: newCategories,
        priceRange,
        inStock: isAvailableOnly,
      })

      return newCategories
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    applyFilters({
      categories: selectedCategories,
      priceRange: values,
      inStock: isAvailableOnly,
    })
  }

  const handleAvailabilityToggle = () => {
    const newValue = !isAvailableOnly
    setIsAvailableOnly(newValue)
    applyFilters({
      categories: selectedCategories,
      priceRange,
      inStock: newValue,
    })
  }

  const applyFilters = ({
    categories,
    priceRange,
    inStock,
  }: {
    categories: string[]
    priceRange: number[]
    inStock: boolean
  }) => {
    const params = new URLSearchParams(searchParams.toString())

    // Update category params
    if (categories.length > 0) {
      params.set("category", categories.join(","))
    } else {
      params.delete("category")
    }

    // Update price range params
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Update in-stock param
    if (inStock) {
      params.set("inStock", "true")
    } else {
      params.delete("inStock")
    }

    // Update URL with new params
    if (currentCategory) {
      // If we're on a category page, stay on that page
      router.push(`/products/${currentCategory}?${params.toString()}`)
    } else {
      // Otherwise, go to the main products page
      router.push(`/products?${params.toString()}`)
    }
  }

  const handleClearFilters = () => {
    setPriceRange([500, 5000])
    setSelectedCategories([])
    setIsAvailableOnly(false)

    if (currentCategory) {
      // If we're on a category page, stay on that page but clear filters
      router.push(`/products/${currentCategory}`)
    } else {
      // Otherwise, go to the main products page
      router.push("/products")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "availability"]} className="w-full">
        {!currentCategory && (
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center justify-start p-2 w-full"
                      onClick={() => handleCategoryToggle(category.slug)}
                    >
                      <div className="h-4 w-4 border rounded-sm mr-2 flex items-center justify-center">
                        {selectedCategories.includes(category.slug) && <Check className="h-3 w-3" />}
                      </div>
                      <span>{category.name}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[500, 5000]}
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center justify-start p-2 w-full"
                onClick={handleAvailabilityToggle}
              >
                <div className="h-4 w-4 border rounded-sm mr-2 flex items-center justify-center">
                  {isAvailableOnly && <Check className="h-3 w-3" />}
                </div>
                <span>In Stock Only</span>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
