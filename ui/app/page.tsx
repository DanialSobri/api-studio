"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { EnhancedDashboard } from "@/components/enhanced-dashboard"

// Mock user data for demonstration
const mockUsers = {
  "admin@tm.com": {
    id: "1",
    email: "admin@tm.com",
    role: "admin" as const,
    tenantId: "tm-holdings",
    tenantName: "TM Holdings",
  },
  "dev@tm.com": {
    id: "2",
    email: "dev@tm.com",
    role: "developer" as const,
    tenantId: "tm-holdings",
    tenantName: "TM Holdings",
  },
  "viewer@tm.com": {
    id: "3",
    email: "viewer@tm.com",
    role: "viewer" as const,
    tenantId: "tm-holdings",
    tenantName: "TM Holdings",
  },
}

export type User = (typeof mockUsers)[keyof typeof mockUsers]

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleLogin = (email: string, password: string) => {
    const user = mockUsers[email as keyof typeof mockUsers]
    if (user && password === "password") {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <EnhancedDashboard user={currentUser} onLogout={handleLogout} />
}
