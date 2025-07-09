"use client"

import type { User } from "@/app/page"
import type { Page } from "@/components/dashboard"
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
import { BarChart3, Database, FolderOpen, LogOut, Settings, Users, ChevronDown } from "lucide-react"

interface AppSidebarProps {
  user: User
  currentPage: Page
  onPageChange: (page: Page) => void
  onLogout: () => void
}

export function AppSidebar({ user, currentPage, onPageChange, onLogout }: AppSidebarProps) {
  const menuItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: BarChart3 },
    { id: "projects" as Page, label: "Projects", icon: FolderOpen },
    { id: "api-logs" as Page, label: "API Logs", icon: Database },
    ...(user.role === "admin" ? [{ id: "users" as Page, label: "Users", icon: Users }] : []),
    { id: "settings" as Page, label: "Settings", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-2">
          <h2 className="text-lg font-semibold">AutoAPI Studio</h2>
          <p className="text-sm text-muted-foreground">{user.tenantName}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={currentPage === item.id} onClick={() => onPageChange(item.id)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={onLogout}>
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
