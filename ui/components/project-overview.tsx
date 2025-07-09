"use client"

import { useState } from "react"
import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomApiDialog } from "@/components/custom-api-dialog"
import { Database, Plus, Settings, CheckCircle, Zap } from "lucide-react"

interface ProjectOverviewProps {
  user: User
  projectId: string | null
}

const mockTables = [
  { name: "users", selected: true, hasCrud: true },
  { name: "upgrades", selected: false, hasCrud: false },
  { name: "devices", selected: true, hasCrud: false },
  { name: "consents", selected: false, hasCrud: false },
]

export function ProjectOverview({ user, projectId }: ProjectOverviewProps) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">TV Upgrade Consent</h2>
          <p className="text-muted-foreground">
            Tenant: {user.tenantName} • Project ID: {projectId}
          </p>
        </div>
      </div>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Hello API</span>
            <Badge variant="outline">Available</Badge>
          </CardTitle>
          <CardDescription>
            Available at <code className="bg-muted px-2 py-1 rounded">/api/tv-upgrade/hello</code>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Database Connection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>Database Connection</CardTitle>
            </div>
            {canModify && (
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Connect Database
              </Button>
            )}
          </div>
          <CardDescription>PostgreSQL database connected</CardDescription>
        </CardHeader>
      </Card>

      {/* Tables */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Database Tables</CardTitle>
            {canModify && (
              <Button onClick={() => setShowCustomApiDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom SQL API
              </Button>
            )}
          </div>
          <CardDescription>Select tables to generate CRUD APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Table Name</TableHead>
                <TableHead>CRUD API</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.name}>
                  <TableCell>
                    <Checkbox
                      checked={table.selected}
                      onCheckedChange={() => toggleTableSelection(table.name)}
                      disabled={!canModify}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{table.name}</TableCell>
                  <TableCell>
                    {table.hasCrud ? (
                      <Badge variant="default">Generated</Badge>
                    ) : (
                      <Badge variant="secondary">Not Generated</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {!table.hasCrud && canModify && (
                        <Button size="sm" onClick={() => generateCrud(table.name)} disabled={!table.selected}>
                          <Zap className="h-4 w-4 mr-1" />
                          Generate CRUD
                        </Button>
                      )}
                      {canModify && (
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CustomApiDialog open={showCustomApiDialog} onOpenChange={setShowCustomApiDialog} />
    </div>
  )
}
