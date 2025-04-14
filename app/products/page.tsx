import { Suspense } from "react"
import { ProductsGrid } from "@/components/products-grid"
import { ProductsFilter } from "@/components/products-filter"
import { ProductsSearch } from "@/components/products-search"
import { ProductsSkeleton } from "@/components/products-skeleton"

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-gray-500 mt-2">Browse our collection of jewelry and clothing</p>
        </div>
        <ProductsSearch />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] mt-8">
        <div className="order-last md:order-first">
          <ProductsFilter />
        </div>
        <div>
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

