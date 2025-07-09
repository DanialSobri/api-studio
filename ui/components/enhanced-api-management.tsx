"use client"

import type { User } from "@/app/page"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, FileText, Settings, Trash2, Zap } from "lucide-react"

interface EnhancedApiManagementProps {
  user: User
}

const mockApis = [
  { route: "/hello", type: "Built-in", method: "GET", status: "active" },
  { route: "/users", type: "CRUD", method: "GET", status: "active" },
  { route: "/users/{id}", type: "CRUD", method: "PUT", status: "active" },
  { route: "/active-users", type: "Custom", method: "GET", status: "active" },
]

export function EnhancedApiManagement({ user }: EnhancedApiManagementProps) {
  const canModify = user.role === "admin" || user.role === "developer"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          API Management
        </h2>
        <p className="text-gray-600">Monitor and manage all endpoints for your project</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span>Endpoints</span>
          </CardTitle>
          <CardDescription>Generated and custom APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">Route</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Method</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApis.map((api, i) => (
                  <motion.tr
                    key={api.route}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
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
