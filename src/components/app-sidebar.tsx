"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Briefcase, FileText, Building2 } from "lucide-react"
import { useLocation } from "react-router"

// Admin navigation data based on API_DOCS.md
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
      isActive: true,
    },
    {
      title: "Departments",
      url: "/dashboard/departments",
      icon: <Users />,
    },
    {
      title: "Job Openings",
      url: "/dashboard/jobs",
      icon: <Briefcase />,
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: <FileText />,
    },
  ],
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user?: { name: string, email: string, avatar?: string } }) {
  const defaultUser = user || {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "",
  }
  
  const location = useLocation()
  
  const navMainWithActive = data.navMain.map(item => ({
    ...item,
    isActive: location.pathname === item.url || (item.url !== '/dashboard' && location.pathname.startsWith(item.url))
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Hiring Admin
                </span>
                <span className="truncate text-xs">Management System</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
