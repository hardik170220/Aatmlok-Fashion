export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 h-[350px]">
          <div className="h-[250px] w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded-md mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

