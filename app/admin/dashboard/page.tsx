"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboardStats } from "@/components/admin/admin-dashboard-stats"
import { AdminRecentOrders } from "@/components/admin/admin-recent-orders"
import { AdminPopularProducts } from "@/components/admin/admin-popular-products"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const token = localStorage.getItem("adminToken")

    if (token) {
      console.log("Token found in dashboard page")
      setIsAuthenticated(true)
      // Ensure token is also in cookies for middleware
      document.cookie = `adminToken=${token}; path=/; max-age=604800`
    } else {
      console.log("No token found in dashboard page")
    }
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the admin dashboard. If you're seeing this message even though you're
            logged in, there might be an issue with your authentication token.
          </p>
          <div className="space-y-4">
            <Button onClick={() => router.push("/admin")}>Go to Login</Button>
            <Button variant="outline" onClick={() => router.push("/admin/dashboard/access")}>
              Troubleshoot Access
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <AdminDashboardStats />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AdminRecentOrders />
          <AdminPopularProducts />
        </div>
      </div>
    </AdminLayout>
  )
}

