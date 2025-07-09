"use client"

import { useState } from "react"
import type { User } from "@/app/page"
import { SidebarProvider } from "@/components/ui/sidebar"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { EnhancedProjectList } from "@/components/enhanced-project-list"
import { EnhancedProjectOverview } from "@/components/enhanced-project-overview"
import { EnhancedApiManagement } from "@/components/enhanced-api-management"
import { EnhancedUserManagement } from "@/components/enhanced-user-management"
import { EnhancedDashboardOverview } from "@/components/enhanced-dashboard-overview"
import { motion, AnimatePresence } from "framer-motion"

export type Page = "dashboard" | "projects" | "project-overview" | "api-logs" | "users" | "settings"

interface EnhancedDashboardProps {
  user: User
  onLogout: () => void
}

export function EnhancedDashboard({ user, onLogout }: EnhancedDashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const renderContent = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    }

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.3,
    }

    switch (currentPage) {
      case "dashboard":
        return (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedDashboardOverview user={user} />
          </motion.div>
        )
      case "projects":
        return (
          <motion.div
            key="projects"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedProjectList
              user={user}
              onSelectProject={(projectId) => {
                setSelectedProject(projectId)
                setCurrentPage("project-overview")
              }}
            />
          </motion.div>
        )
      case "project-overview":
        return (
          <motion.div
            key="project-overview"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedProjectOverview user={user} projectId={selectedProject} />
          </motion.div>
        )
      case "api-logs":
        return (
          <motion.div
            key="api-logs"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedApiManagement user={user} />
          </motion.div>
        )
      case "users":
        return (
          <motion.div
            key="users"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {user.role === "admin" ? <EnhancedUserManagement user={user} /> : <div>Access Denied</div>}
          </motion.div>
        )
      default:
        return <EnhancedDashboardOverview user={user} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <EnhancedSidebar user={user} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
