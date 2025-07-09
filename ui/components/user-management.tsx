"use client"

import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Settings } from "lucide-react"

interface UserManagementProps {
  user: User
}

const mockUsers = [
  {
    email: "alice@tm.com",
    role: "admin",
    projects: "All",
    status: "active",
  },
  {
    email: "bob@tm.com",
    role: "developer",
    projects: "TV Upgrade",
    status: "active",
  },
  {
    email: "viewer@tm.com",
    role: "viewer",
    projects: "Feedback Bot",
    status: "active",
  },
]

export function UserManagement({ user }: UserManagementProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage users and permissions for {user.tenantName}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users in Tenant: {user.tenantName}</CardTitle>
          <CardDescription>Manage user roles and project access</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((u, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === "admin" ? "default" : u.role === "developer" ? "secondary" : "outline"}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* RBAC Permissions Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Overview of what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <Badge className="mr-2">Admin</Badge>
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✅ Create projects</li>
                <li>✅ Connect databases</li>
                <li>✅ Generate APIs</li>
                <li>✅ Manage users</li>
                <li>✅ Edit settings</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <Badge variant="secondary" className="mr-2">
                  Developer
                </Badge>
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✅ Create projects</li>
                <li>✅ Connect databases</li>
                <li>✅ Generate APIs</li>
                <li>❌ Manage users</li>
                <li>❌ Edit settings</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <Badge variant="outline" className="mr-2">
                  Viewer
                </Badge>
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>❌ Create projects</li>
                <li>❌ Connect databases</li>
                <li>❌ Generate APIs</li>
                <li>✅ View API docs</li>
                <li>✅ Test APIs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
