"use client"

import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Database, Zap, Calendar, Search, Filter, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface EnhancedProjectListProps {
  user: User
  onSelectProject: (projectId: string) => void
}

const mockProjects = [
  {
    id: "tv-upgrade",
    name: "TV Upgrade Consent",
    description: "API for managing TV upgrade consent forms and customer data processing",
    status: "active",
    apis: 8,
    lastUpdated: "2 hours ago",
    database: "PostgreSQL",
    health: 98,
    requests: "1.2K",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "customer-feedback",
    name: "Customer Feedback Bot",
    description: "Automated feedback collection and sentiment analysis system",
    status: "active",
    apis: 4,
    lastUpdated: "1 day ago",
    database: "MySQL",
    health: 95,
    requests: "856",
    color: "from-green-500 to-green-600",
  },
  {
    id: "dealer-analytics",
    name: "Dealer Analytics API",
    description: "Real-time dealer performance metrics and business intelligence",
    status: "inactive",
    apis: 12,
    lastUpdated: "1 week ago",
    database: "MongoDB",
    health: 0,
    requests: "0",
    color: "from-gray-400 to-gray-500",
  },
]

export function EnhancedProjectList({ user, onSelectProject }: EnhancedProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const canCreateProject = user.role === "admin" || user.role === "developer"

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your API projects for <span className="font-semibold text-blue-600">{user.tenantName}</span>
          </p>
        </div>
        {canCreateProject && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0 bg-white shadow-md focus:shadow-lg transition-shadow"
          />
        </div>
        <Button variant="outline" className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Card
              className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              onClick={() => onSelectProject(project.id)}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.color}`} />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </CardTitle>
                    <Badge
                      variant={project.status === "active" ? "default" : "secondary"}
                      className={project.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                      <Zap className="h-4 w-4" />
                      <span className="text-lg font-bold">{project.apis}</span>
                    </div>
                    <span className="text-xs text-gray-500">APIs</span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                      <Database className="h-4 w-4" />
                      <span className="text-lg font-bold">{project.requests}</span>
                    </div>
                    <span className="text-xs text-gray-500">Requests</span>
                  </div>
                </div>

                {/* Health & Database */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Health</span>
                    <span
                      className={`font-semibold ${project.health > 90 ? "text-green-600" : project.health > 70 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {project.health}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{project.database}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </motion.div>
      )}
    </div>
  )
}
