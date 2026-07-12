import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useAuthStore } from '@/shared/store/authStore';
import { ApplicationsTable } from "../components/ApplicationsTable";
import { useAllApplications } from "../hooks/useApplications";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import * as React from "react";

export function ApplicationsPage() {
  const user = useAuthStore((state) => state.user);
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 10;
  
  const { data, isLoading, isError, refetch, isRefetching } = useAllApplications({
    page: pageIndex + 1,
    limit: pageSize,
  });

  const applications = data?.data || [];
  const meta = data?.meta;

  return (
    <SidebarProvider>
      <AppSidebar user={user as any} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-brand-border bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink render={<Link to="/dashboard" />}>
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Applications</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-brand-secondary">Applications</h1>
              <p className="text-slate-500 mt-1">Review candidate applications and manage their hiring status.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => refetch()} disabled={isRefetching}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col min-h-0">
            {isError ? (
              <div className="flex-1 flex items-center justify-center bg-white border border-brand-border rounded-xl shadow-sm">
                <p className="text-red-500">Failed to load applications.</p>
              </div>
            ) : (
              <ApplicationsTable 
                data={applications} 
                isLoading={isLoading} 
                pageCount={meta?.totalPages ?? -1}
                pagination={{ pageIndex, pageSize }}
                onPaginationChange={(updater: any) => {
                  if (typeof updater === 'function') {
                    const newState = updater({ pageIndex, pageSize });
                    setPageIndex(newState.pageIndex);
                  } else {
                    setPageIndex(updater.pageIndex);
                  }
                }}
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
