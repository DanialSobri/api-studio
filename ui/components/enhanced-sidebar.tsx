"use client"

import type { User } from "@/app/page"
import type { Page } from "@/components/enhanced-dashboard"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Database, FolderOpen, LogOut, Settings, Users, ChevronDown, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface EnhancedSidebarProps {
  user: User
  currentPage: Page
  onPageChange: (page: Page) => void
  onLogout: () => void
}

export function EnhancedSidebar({ user, currentPage, onPageChange, onLogout }: EnhancedSidebarProps) {
  const menuItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: BarChart3, color: "text-blue-500" },
    { id: "projects" as Page, label: "Projects", icon: FolderOpen, color: "text-green-500" },
    { id: "api-logs" as Page, label: "API Logs", icon: Database, color: "text-purple-500" },
    ...(user.role === "admin" ? [{ id: "users" as Page, label: "Users", icon: Users, color: "text-orange-500" }] : []),
    { id: "settings" as Page, label: "Settings", icon: Settings, color: "text-gray-500" },
  ]

  return (
    <Sidebar className="border-r border-gray-200/50 bg-white/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-gray-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutoAPI Studio
              </h2>
              <Badge variant="outline" className="text-xs mt-1 bg-white/50">
                {user.tenantName}
              </Badge>
            </div>
          </motion.div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SidebarMenuButton
                      isActive={currentPage === item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`
                        relative h-11 rounded-xl transition-all duration-200 group
                        ${
                          currentPage === item.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                            : "hover:bg-gray-50 hover:shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <item.icon
                          className={`h-5 w-5 transition-colors ${currentPage === item.id ? "text-white" : item.color}`}
                        />
                        <span
                          className={`font-medium transition-colors ${
                            currentPage === item.id ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {currentPage === item.id && (
                        <motion.div
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100/50 p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-16 rounded-xl hover:bg-white/50 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center space-x-3 w-full">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : user.role === "developer" ? "secondary" : "outline"
                        }
                        className="text-xs capitalize mt-1"
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] mb-2 shadow-xl border-0 bg-white/95 backdrop-blur-xl"
              >
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg m-1"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
