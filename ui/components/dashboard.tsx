"use client"

import { useState } from "react"
import type { User } from "@/app/page"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectList } from "@/components/project-list"
import { ProjectOverview } from "@/components/project-overview"
import { ApiManagement } from "@/components/api-management"
import { UserManagement } from "@/components/user-management"
import { DashboardOverview } from "@/components/dashboard-overview"

export type Page = "dashboard" | "projects" | "project-overview" | "api-logs" | "users" | "settings"

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview user={user} />
      case "projects":
        return (
          <ProjectList
            user={user}
            onSelectProject={(projectId) => {
              setSelectedProject(projectId)
              setCurrentPage("project-overview")
            }}
          />
        )
      case "project-overview":
        return <ProjectOverview user={user} projectId={selectedProject} />
      case "api-logs":
        return <ApiManagement user={user} />
      case "users":
        return user.role === "admin" ? <UserManagement user={user} /> : <div>Access Denied</div>
      default:
        return <DashboardOverview user={user} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar user={user} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">AutoAPI Studio</h1>
                  <p className="text-muted-foreground">
                    Tenant: {user.tenantName} • Role: {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  )
}
