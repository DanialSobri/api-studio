"use client"

import { useState } from "react"
import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CustomApiDialog } from "@/components/custom-api-dialog"
import { Database, Plus, Settings, CheckCircle, Zap, Activity, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface EnhancedProjectOverviewProps {
  user: User
  projectId: string | null
}

const mockTables = [
  { name: "users", selected: true, hasCrud: true, records: 1250 },
  { name: "upgrades", selected: false, hasCrud: false, records: 890 },
  { name: "devices", selected: true, hasCrud: false, records: 2100 },
  { name: "consents", selected: false, hasCrud: false, records: 750 },
]

export function EnhancedProjectOverview({ user, projectId }: EnhancedProjectOverviewProps) {
  const [tables, setTables] = useState(mockTables)
  const [showCustomApiDialog, setShowCustomApiDialog] = useState(false)

  const canModify = user.role === "admin" || user.role === "developer"

  const toggleTableSelection = (tableName: string) => {
    if (!canModify) return
    setTables(tables.map((table) => (table.name === tableName ? { ...table, selected: !table.selected } : table)))
  }

  const generateCrud = (tableName: string) => {
    if (!canModify) return
    setTables(tables.map((table) => (table.name === tableName ? { ...table, hasCrud: true } : table)))
  }

  if (!projectId) {
    return <div>No project selected</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              TV Upgrade Consent
            </h2>
            <p className="text-gray-600">
              Tenant: <span className="font-semibold text-blue-600">{user.tenantName}</span> • Project ID:{" "}
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{projectId}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total APIs", value: "8", icon: Zap, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
          {
            label: "Active Endpoints",
            value: "6",
            icon: Activity,
            color: "from-green-500 to-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Database Tables",
            value: "4",
            icon: Database,
            color: "from-purple-500 to-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Health Score",
            value: "98%",
            icon: TrendingUp,
            color: "from-orange-500 to-orange-600",
            bg: "bg-orange-50",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* API Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 to-green-600" />
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <span className="text-xl">Hello API</span>
                <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
                  Available
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <span>Available at</span>
              <code className="bg-gray-100 px-3 py-1 rounded-md font-mono text-sm">/api/tv-upgrade/hello</code>
              <Button size="sm" variant="outline">
                Test
              </Button>
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Database Connection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Database Connection</CardTitle>
                  <CardDescription>PostgreSQL database connected and healthy</CardDescription>
                </div>
              </div>
              {canModify && (
                <Button variant="outline" className="shadow-md hover:shadow-lg transition-shadow bg-transparent">
                  <Database className="h-4 w-4 mr-2" />
                  Manage Connection
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Connection Health</span>
                  <span className="text-green-600 font-semibold">Excellent (98%)</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-lg font-semibold text-gray-900">12ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Database Tables</CardTitle>
                <CardDescription>Select tables to generate CRUD APIs automatically</CardDescription>
              </div>
              {canModify && (
                <Button
                  onClick={() => setShowCustomApiDialog(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom SQL API
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="font-semibold">Table Name</TableHead>
                    <TableHead className="font-semibold">Records</TableHead>
                    <TableHead className="font-semibold">CRUD API</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table, index) => (
                    <motion.tr
                      key={table.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>
                        <Checkbox
                          checked={table.selected}
                          onCheckedChange={() => toggleTableSelection(table.name)}
                          disabled={!canModify}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell className="text-gray-600">{table.records.toLocaleString()}</TableCell>
                      <TableCell>
                        {table.hasCrud ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Generated</Badge>
                        ) : (
                          <Badge variant="secondary">Not Generated</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {!table.hasCrud && canModify && (
                            <Button
                              size="sm"
                              onClick={() => generateCrud(table.name)}
                              disabled={!table.selected}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                            >
                              <Zap className="h-4 w-4 mr-1" />
                              Generate CRUD
                            </Button>
                          )}
                          {canModify && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:shadow-md transition-shadow bg-transparent"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
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

      <CustomApiDialog open={showCustomApiDialog} onOpenChange={setShowCustomApiDialog} />
    </div>
  )
}
