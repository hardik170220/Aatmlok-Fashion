import { Suspense } from "react"
import { CategoryProductsGrid } from "@/components/category-products-grid"
import { ProductsFilter } from "@/components/products-filter"
import { ProductsSearch } from "@/components/products-search"
import { ProductsSkeleton } from "@/components/products-skeleton"

export default function CategoryProductsPage({ params }: { params: { category: string } }) {
  // Format the category name for display (capitalize first letter)
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-gray-500 mt-2">Browse our collection of {params.category.toLowerCase()}</p>
        </div>
        <ProductsSearch />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] mt-8">
        <div className="order-last md:order-first">
          <ProductsFilter currentCategory={params.category} />
        </div>
        <div>
          <Suspense fallback={<ProductsSkeleton />}>
            <CategoryProductsGrid category={params.category} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
