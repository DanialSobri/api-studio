"use client"

import type { User } from "@/app/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Database, FolderOpen, Zap, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface EnhancedDashboardOverviewProps {
  user: User
}

export function EnhancedDashboardOverview({ user }: EnhancedDashboardOverviewProps) {
  const stats = [
    {
      title: "Active Projects",
      value: "3",
      change: "+2 this month",
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      progress: 75,
    },
    {
      title: "Generated APIs",
      value: "12",
      change: "+4 this week",
      icon: Zap,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      progress: 60,
    },
    {
      title: "Connected DBs",
      value: "2",
      change: "All healthy",
      icon: Database,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      progress: 100,
    },
    {
      title: "API Calls Today",
      value: "1,247",
      change: "+23% vs yesterday",
      icon: Activity,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      progress: 85,
    },
  ]

  const recentActivity = [
    {
      action: "Generated CRUD API for users table",
      project: "TV Upgrade",
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle,
    },
    {
      action: "Connected PostgreSQL database",
      project: "Customer Feedback",
      time: "4 hours ago",
      status: "success",
      icon: Database,
    },
    {
      action: "Created custom SQL API /active-users",
      project: "TV Upgrade",
      time: "1 day ago",
      status: "success",
      icon: Zap,
    },
    {
      action: "Database connection timeout",
      project: "Analytics",
      time: "2 days ago",
      status: "warning",
      icon: AlertCircle,
    },
  ]

  const quickActions = [
    {
      title: "Create New Project",
      description: "Start building APIs in minutes",
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Connect Database",
      description: "Link your data sources",
      icon: Database,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Generate API",
      description: "Auto-create endpoints",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "View Analytics",
      description: "Monitor API performance",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          <Clock className="h-4 w-4" />
          <span>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}
          </span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Welcome back, {user.email.split("@")[0]}!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Here's what's happening with your APIs today. Your workspace is performing excellently.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{stat.change}</span>
                    <span className="text-gray-400">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest actions in your workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.status === "success" ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    <activity.icon
                      className={`h-4 w-4 ${activity.status === "success" ? "text-green-600" : "text-yellow-600"}`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.project}
                      </Badge>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-4 justify-start hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`h-12 w-12 rounded-xl ${action.bgColor} flex items-center justify-center`}>
                        <action.icon
                          className={`h-6 w-6 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
