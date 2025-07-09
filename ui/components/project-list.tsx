"use client"

import type { User } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Database, Zap, Calendar } from "lucide-react"

interface ProjectListProps {
  user: User
  onSelectProject: (projectId: string) => void
}

const mockProjects = [
  {
    id: "tv-upgrade",
    name: "TV Upgrade Consent",
    description: "API for managing TV upgrade consent forms",
    status: "active",
    apis: 8,
    lastUpdated: "2 hours ago",
    database: "PostgreSQL",
  },
  {
    id: "customer-feedback",
    name: "Customer Feedback Bot",
    description: "Automated feedback collection and analysis",
    status: "active",
    apis: 4,
    lastUpdated: "1 day ago",
    database: "MySQL",
  },
  {
    id: "dealer-analytics",
    name: "Dealer Analytics API",
    description: "Real-time dealer performance metrics",
    status: "inactive",
    apis: 12,
    lastUpdated: "1 week ago",
    database: "MongoDB",
  },
]

export function ProjectList({ user, onSelectProject }: ProjectListProps) {
  const canCreateProject = user.role === "admin" || user.role === "developer"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your API projects for {user.tenantName}</p>
        </div>
        {canCreateProject && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectProject(project.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span>{project.apis} APIs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-green-500" />
                  <span>{project.database}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated {project.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
