"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CreateAdminForm } from "@/components/admin/create-admin-form"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [adminExists, setAdminExists] = useState<boolean | null>(null)
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true)

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      console.log("Token found in localStorage, redirecting to dashboard")
      // Set cookie as well to ensure middleware can access it
      document.cookie = `adminToken=${token}; path=/; max-age=604800`
      router.push("/admin/dashboard")
    } else {
      // Check if admin user exists
      checkAdminExists()
    }
  }, [router])

  const checkAdminExists = async () => {
    try {
      setIsCheckingAdmin(true)
      const response = await fetch("/api/auth/check-admin")
      const data = await response.json()
      setAdminExists(data.exists)
    } catch (error) {
      console.error("Error checking admin:", error)
      setAdminExists(false)
    } finally {
      setIsCheckingAdmin(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Save token to localStorage
      localStorage.setItem("adminToken", data.token)

      // Also set as cookie for middleware
      document.cookie = `adminToken=${data.token}; path=/; max-age=604800`

      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      })

      // Force a hard navigation to dashboard
      window.location.href = "/admin/dashboard"
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Invalid email or password")

      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (adminExists === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <CreateAdminForm />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

