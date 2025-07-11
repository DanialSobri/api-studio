"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = onLogin(email, password)
    if (!success) {
      setError("Invalid credentials. Try admin@tm.com, dev@tm.com, or viewer@tm.com with password 'password'")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">AutoAPI Studio</CardTitle>
          <CardDescription>Sign in to your account to manage APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-center">
              <Button variant="link" className="text-sm">
                Forgot password?
              </Button>
            </div>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
            <p className="font-medium">Demo Accounts:</p>
            <p>admin@tm.com / password</p>
            <p>dev@tm.com / password</p>
            <p>viewer@tm.com / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
