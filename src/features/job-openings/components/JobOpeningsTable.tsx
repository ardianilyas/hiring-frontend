import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pencil, Trash, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { useJobOpenings } from "../hooks/useJobOpenings";
import { useDeleteJobOpening } from "../hooks/useDeleteJobOpening";
import { EditJobOpeningDialog } from "./EditJobOpeningDialog";
import type { JobOpening } from "../types";

export function JobOpeningsTable() {
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: response, isLoading } = useJobOpenings({
    page: pageIndex + 1,
    limit: pageSize,
    search: debouncedSearch || undefined,
  });

  const jobOpenings = response?.data || [];
  const meta = response?.meta;

  const [editJob, setEditJob] = React.useState<JobOpening | null>(null);
  const [jobToDelete, setJobToDelete] = React.useState<JobOpening | null>(null);

  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJobOpening(() => {
    setJobToDelete(null);
  });

  const columns = React.useMemo<ColumnDef<JobOpening>[]>(() => [
    {
      id: "index",
      header: "No.",
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination;
        return <div className="text-muted-foreground w-8 text-center">{pageIndex * pageSize + row.index + 1}</div>;
      },
    },
    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <div className="text-muted-foreground">{row.original.department?.name || "-"}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("location")}</div>,
    },
    {
      accessorKey: "employmentType",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("employmentType") as string;
        if (!type) return "-";
        const formatted = type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
        return <Badge variant="outline">{formatted}</Badge>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const dateStr = row.getValue("createdAt") as string;
        if (!dateStr) return "-";
        return new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(dateStr));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger render={<button className="flex h-8 w-8 p-0 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground" />}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(String(job.id));
                      toast.info("Job ID copied to clipboard");
                    } catch (err) {
                      toast.error("Failed to copy ID");
                    }
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy ID
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setEditJob(job)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => setJobToDelete(job)}><Trash className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: jobOpenings,
    columns,
    pageCount: meta?.totalPages ?? -1,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="h-9 w-[250px]" />
        </div>
        <div className="rounded-md border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 border-b">
              <TableRow>
                {columns.map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="flex items-center relative w-full sm:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white pl-9"
        />
      </div>
      
      <div className="w-full rounded-md border bg-white shadow-sm overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-slate-50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
               <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p>No job openings found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {jobOpenings.length} of {meta?.total ?? 0} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm font-medium mx-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() > 0 ? table.getPageCount() : 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <EditJobOpeningDialog 
        jobOpening={editJob} 
        onClose={() => setEditJob(null)} 
      />

      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && !isDeleting && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the <strong>{jobToDelete?.title}</strong> job posting
              and remove all associated applications from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                if (jobToDelete) {
                  deleteJob(jobToDelete.id);
                }
              }}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
