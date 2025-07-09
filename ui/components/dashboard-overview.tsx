"use client"

import type { User } from "@/app/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, FolderOpen, Zap } from "lucide-react"

interface DashboardOverviewProps {
  user: User
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const stats = [
    { title: "Active Projects", value: "3", icon: FolderOpen, color: "bg-blue-500" },
    { title: "Generated APIs", value: "12", icon: Zap, color: "bg-green-500" },
    { title: "Connected DBs", value: "2", icon: Database, color: "bg-purple-500" },
    { title: "API Calls Today", value: "1,247", icon: Activity, color: "bg-orange-500" },
  ]

  const recentActivity = [
    { action: "Generated CRUD API for users table", project: "TV Upgrade", time: "2 hours ago" },
    { action: "Connected PostgreSQL database", project: "Customer Feedback", time: "4 hours ago" },
    { action: "Created custom SQL API /active-users", project: "TV Upgrade", time: "1 day ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.email.split("@")[0]}!</h2>
        <p className="text-muted-foreground">Here's what's happening with your APIs today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-md ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{activity.project}</Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer">
              <FolderOpen className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Create New Project</p>
                <p className="text-sm text-muted-foreground">Start building APIs</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer">
              <Database className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Connect Database</p>
                <p className="text-sm text-muted-foreground">Link your data source</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer">
              <Zap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">Generate API</p>
                <p className="text-sm text-muted-foreground">Auto-create endpoints</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
