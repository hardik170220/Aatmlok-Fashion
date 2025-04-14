"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsData {
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenue: number
  orderGrowth: number
  productGrowth: number
  customerGrowth: number
  revenueGrowth: number
}

export function AdminDashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)

        // Get token from localStorage
        const token = localStorage.getItem("adminToken")
        if (!token) {
          throw new Error("Not authenticated")
        }

        const response = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setError("Failed to load dashboard stats")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="h-3 w-1/4 bg-gray-200 animate-pulse rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-md">{error || "Failed to load dashboard stats"}</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <div className="flex items-center text-xs mt-1">
            {stats.orderGrowth > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{stats.orderGrowth.toFixed(1)}% increase</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(stats.orderGrowth).toFixed(1)}% decrease</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
          <Package className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <div className="flex items-center text-xs mt-1">
            {stats.productGrowth > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{stats.productGrowth.toFixed(1)}% increase</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(stats.productGrowth).toFixed(1)}% decrease</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          <div className="flex items-center text-xs mt-1">
            {stats.customerGrowth > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{stats.customerGrowth.toFixed(1)}% increase</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(stats.customerGrowth).toFixed(1)}% decrease</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Revenue (₹)</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-gray-500"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
          <div className="flex items-center text-xs mt-1">
            {stats.revenueGrowth > 0 ? (
              <>
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">{stats.revenueGrowth.toFixed(1)}% increase</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{Math.abs(stats.revenueGrowth).toFixed(1)}% decrease</span>
              </>
            )}
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

