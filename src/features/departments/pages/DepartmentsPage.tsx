import { useDepartments } from "../hooks/useDepartments";
import { DepartmentsTable } from "../components/DepartmentsTable";
import { CreateDepartmentDialog } from "../components/CreateDepartmentDialog";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useAuthStore } from "@/shared/store/authStore";

export function DepartmentsPage() {
  const { data, isLoading } = useDepartments();
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
                  <BreadcrumbLink render={<Link to="/dashboard" />}>Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Departments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 md:gap-8 p-4 md:p-8 bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-secondary">Departments</h1>
              <p className="text-brand-gray mt-1 text-sm md:text-base">Manage company departments and teams.</p>
            </div>
            <CreateDepartmentDialog />
          </div>

          <DepartmentsTable data={data?.data} isLoading={isLoading} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
