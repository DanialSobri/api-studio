"use client"

import type { User as TenantUser } from "@/app/page"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Settings, User } from "lucide-react"

interface EnhancedUserManagementProps {
  user: TenantUser
}

const mockUsers = [
  { email: "alice@tm.com", role: "admin", projects: "All", status: "active" },
  { email: "bob@tm.com", role: "developer", projects: "TV Upgrade", status: "active" },
  { email: "viewer@tm.com", role: "viewer", projects: "Feedback Bot", status: "active" },
]

export function EnhancedUserManagement({ user }: EnhancedUserManagementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            User Management
          </h2>
          <p className="text-gray-600">Manage users and permissions for {user.tenantName}</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-500" />
            <span>Users</span>
          </CardTitle>
          <CardDescription>All users in this tenant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((u, i) => (
                  <motion.tr
                    key={u.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={u.role === "admin" ? "default" : u.role === "developer" ? "secondary" : "outline"}
                      >
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{u.projects}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === "active" ? "default" : "secondary"}>{u.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
