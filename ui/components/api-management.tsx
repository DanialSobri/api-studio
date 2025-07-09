"use client"

import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Play, Settings, Trash2 } from "lucide-react"

interface ApiManagementProps {
  user: User
}

const mockApis = [
  {
    route: "/hello",
    type: "Built-in",
    method: "GET",
    status: "active",
  },
  {
    route: "/users",
    type: "CRUD",
    method: "GET",
    status: "active",
  },
  {
    route: "/users/{id}",
    type: "CRUD",
    method: "PUT",
    status: "active",
  },
  {
    route: "/active-users",
    type: "Custom",
    method: "GET",
    status: "active",
  },
]

export function ApiManagement({ user }: ApiManagementProps) {
  const canModify = user.role === "admin" || user.role === "developer"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">API Management</h2>
        <p className="text-muted-foreground">Monitor and manage your generated APIs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>APIs for Project: TV Upgrade</CardTitle>
          <CardDescription>All endpoints generated for this project</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApis.map((api, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{api.route}</TableCell>
                  <TableCell>
                    <Badge
                      variant={api.type === "Built-in" ? "default" : api.type === "CRUD" ? "secondary" : "outline"}
                    >
                      {api.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{api.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={api.status === "active" ? "default" : "secondary"}>{api.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Docs
                      </Button>
                      {canModify && api.type !== "Built-in" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
