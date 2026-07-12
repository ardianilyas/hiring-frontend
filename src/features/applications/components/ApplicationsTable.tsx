import * as React from "react"
import type {
  ColumnDef,
  SortingState,
  PaginationState,
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText } from "lucide-react"
import type { Application } from "../types"
import { useUpdateApplicationStatus } from "../hooks/useApplications"

interface ApplicationsTableProps {
  data: Application[];
  isLoading: boolean;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (updater: any) => void;
}

export function ApplicationsTable({ data, isLoading, pageCount, pagination, onPaginationChange }: ApplicationsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const updateStatus = useUpdateApplicationStatus()

  const handleStatusChange = (id: string, status: string) => {
    updateStatus.mutate({ id, payload: { status } })
  }

  const columns = React.useMemo<ColumnDef<Application>[]>(() => [
    {
      id: "index",
      header: "No.",
      cell: ({ row, table }) => {
        const index = table.getSortedRowModel().rows.findIndex(r => r.id === row.id);
        return <span>{index + 1}</span>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "user",
      header: "Candidate",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-brand-secondary">{user?.name || 'Unknown'}</span>
            <span className="text-xs text-slate-500">{user?.email || 'N/A'}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "jobOpening",
      header: "Job Opening",
      cell: ({ row }) => {
        const app = row.original as any;
        const job = app.jobOpening || app.job_opening || app.job;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-slate-700">{job?.title || app.jobOpeningId || 'Unknown'}</span>
            <span className="text-xs text-slate-500">{job?.department?.name || ''}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }) => {
        const app = row.original as any;
        const dateStr = app.createdAt || app.applied_at || app.appliedAt;
        return <span className="text-sm text-slate-600">{new Date(dateStr).toLocaleString(undefined, { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
      },
    },
    {
      accessorKey: "resume",
      header: "Resume",
      cell: ({ row }) => {
        return (
          <a href={row.original.resume} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline flex items-center gap-1 text-sm">
            <FileText className="w-3.5 h-3.5" /> View
          </a>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const app = row.original;
        return (
          <Select
            disabled={updateStatus.isPending}
            value={app.status ?? "applied"}
            onValueChange={(value) => handleStatusChange(app.id, value as string)}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
  ], [updateStatus.isPending]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  })

  if (isLoading) {
    return (
      <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              {columns.map((_, i) => (
                <TableHead key={i}><div className="h-4 w-20 bg-slate-200 animate-pulse rounded"></div></TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}><div className="h-4 w-full bg-slate-100 animate-pulse rounded"></div></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold text-brand-secondary h-11">
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
                  className="hover:bg-slate-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500 gap-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">No applications found</p>
                    <p className="text-sm">There are no applications matching your criteria.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 p-4 border-t border-brand-border mt-auto bg-white">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="text-sm text-slate-600 font-medium px-2">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount() || 1}
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
  )
}
