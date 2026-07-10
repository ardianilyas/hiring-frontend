import { JobOpeningsTable } from "../components/JobOpeningsTable";
import { CreateJobOpeningDialog } from "../components/CreateJobOpeningDialog";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useAuthStore } from "@/shared/store/authStore";

export function JobOpeningsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <SidebarProvider>
      <AppSidebar user={user as any} />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-brand-border bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink render={<Link to="/dashboard" />}>Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Job Openings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 md:gap-8 p-4 md:p-8 bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-secondary">Job Openings</h1>
              <p className="text-brand-gray mt-1 text-sm md:text-base">Manage open roles and publish job listings.</p>
            </div>
            <CreateJobOpeningDialog />
          </div>

          <JobOpeningsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
