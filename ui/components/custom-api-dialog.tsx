"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CustomApiDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomApiDialog({ open, onOpenChange }: CustomApiDialogProps) {
  const [routePath, setRoutePath] = useState("/active-users")
  const [method, setMethod] = useState("GET")
  const [sql, setSql] = useState("SELECT * FROM users WHERE active = TRUE;")
  const [autoInjectTenant, setAutoInjectTenant] = useState(true)

  const handleCreate = () => {
    // Handle API creation logic here
    console.log({ routePath, method, sql, autoInjectTenant })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Custom API</DialogTitle>
          <DialogDescription>Create a custom SQL-based API endpoint for your project.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="route" className="text-right">
              Route Path
            </Label>
            <Input
              id="route"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
              className="col-span-3"
              placeholder="/active-users"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Method
            </Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="sql" className="text-right pt-2">
              SQL Query
            </Label>
            <Textarea
              id="sql"
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              className="col-span-3 min-h-[100px]"
              placeholder="SELECT * FROM users WHERE active = TRUE;"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div></div>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="tenant"
                checked={autoInjectTenant}
                onCheckedChange={(checked) => setAutoInjectTenant(checked as boolean)}
              />
              <Label htmlFor="tenant" className="text-sm">
                Auto inject tenant_id filter
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create API</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
