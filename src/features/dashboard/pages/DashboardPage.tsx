import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useAuthStore } from '../../../shared/store/authStore';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <SidebarProvider>
      <AppSidebar user={user as any} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-brand-border bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-slate-50 dark:bg-slate-950">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-white border border-brand-border shadow-sm flex items-center justify-center font-medium text-brand-gray">Departments</div>
            <div className="aspect-video rounded-xl bg-white border border-brand-border shadow-sm flex items-center justify-center font-medium text-brand-gray">Job Openings</div>
            <div className="aspect-video rounded-xl bg-white border border-brand-border shadow-sm flex items-center justify-center font-medium text-brand-gray">Applications</div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-white border border-brand-border shadow-sm md:min-h-min p-12 flex flex-col items-center justify-center">
            
            <h1 className="text-3xl font-bold mb-4">Welcome to Hiring Admin, {user?.name || 'User'}!</h1>
            <p className="text-slate-500 mb-8 max-w-md text-center">Use the sidebar to navigate through departments, manage job openings, and review candidate applications.</p>
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
