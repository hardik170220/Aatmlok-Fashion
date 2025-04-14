"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { BarChart3, Home, LogOut, Menu, Package, Settings, ShoppingCart, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Fix hydration errors by only rendering client-specific content after mount
  useEffect(() => {
    setIsClient(true)

    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (token) {
      console.log("Token found in AdminLayout")
      setIsAuthenticated(true)

      // Ensure token is also in cookies for middleware
      document.cookie = `adminToken=${token}; path=/; max-age=604800`
    } else {
      console.log("No token found in AdminLayout, redirecting to login")
      router.push("/admin")
    }
  }, [router])

  const routes = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/admin/dashboard",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package,
      active: pathname === "/admin/products" || pathname.startsWith("/admin/products/"),
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: ShoppingCart,
      active: pathname === "/admin/orders" || pathname.startsWith("/admin/orders/"),
    },
    // {
    //   href: "/admin/customers",
    //   label: "Customers",
    //   icon: User,
    //   active: pathname === "/admin/customers",
    // },
    // {
    //   href: "/admin/analytics",
    //   label: "Analytics",
    //   icon: BarChart3,
    //   active: pathname === "/admin/analytics",
    // },
    // {
    //   href: "/admin/settings",
    //   label: "Settings",
    //   icon: Settings,
    //   active: pathname === "/admin/settings",
    // },
  ]

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("adminToken")

    // Also clear the cookie
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/admin")
  }

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50"></div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
          <Button onClick={() => router.push("/admin")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">Aatmlok Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-6 px-4">
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    route.active ? "bg-pink-50 text-pink-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="text-xl">Aatmlok Admin</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-6 px-4">
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      route.active ? "bg-pink-50 text-pink-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[425px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to log in again to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
