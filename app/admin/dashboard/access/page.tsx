"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DirectAccessPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedToken = localStorage.getItem("adminToken")
    setToken(storedToken)

    if (storedToken) {
      // Set cookie as well
      document.cookie = `adminToken=${storedToken}; path=/; max-age=604800`
    }
  }, [])

  const handleCreateToken = () => {
    // Create a simple token for testing
    const newToken = "test_token_" + Date.now()
    localStorage.setItem("adminToken", newToken)
    document.cookie = `adminToken=${newToken}; path=/; max-age=604800`
    setToken(newToken)
  }

  const handleGoToDashboard = () => {
    if (token) {
      // Force a hard navigation
      window.location.href = "/admin/dashboard"
    } else {
      router.push("/admin")
    }
  }

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dashboard Access</h1>
          <p className="text-gray-600 mb-6">
            {token
              ? "You have a token stored. You can now access the dashboard."
              : "No token found. Create a temporary token for testing."}
          </p>
        </div>

        <div className="space-y-4">
          {token ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-md">
              <p className="font-medium">Token found</p>
              <p className="text-sm mt-1 break-all">{token}</p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
              <p>No token found in localStorage</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {!token && <Button onClick={handleCreateToken}>Create Temporary Token</Button>}
            <Button onClick={handleGoToDashboard}>{token ? "Go to Dashboard" : "Go to Login"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

