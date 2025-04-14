"use client"

import { Button } from "@/components/ui/button"

interface CustomerFallbackProps {
  error: string
  onRetry: () => void
}

export function CustomerFallback({ error, onRetry }: CustomerFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 mx-auto"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-bold">Error Loading Customers</h3>
      <p className="mb-4 text-gray-600">{error}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  )
}
