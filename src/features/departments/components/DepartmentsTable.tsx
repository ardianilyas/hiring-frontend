import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { ArrowUpDown, Copy, MoreHorizontal, Pencil, Search, Trash } from "lucide-react"
import { toast } from "sonner"
import { EditDepartmentDialog } from "./EditDepartmentDialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteDepartment } from "../hooks/useDeleteDepartment"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Department } from "../types"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps {
  data?: Department[]
  isLoading: boolean
}

export function DepartmentsTable({ data = [], isLoading }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [editDepartment, setEditDepartment] = React.useState<Department | null>(null)
  const [departmentToDelete, setDepartmentToDelete] = React.useState<Department | null>(null)

  const { mutate: deleteDepartment, isPending: isDeleting } = useDeleteDepartment(() => {
    setDepartmentToDelete(null)
  })

  const columns = React.useMemo<ColumnDef<Department>[]>(() => [
    {
      id: "index",
      header: "No.",
      cell: ({ row, table }) => {
        const index = table.getSortedRowModel().rows.findIndex(r => r.id === row.id) + 1;
        return <div className="text-muted-foreground w-8 text-center">{index}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium px-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="text-muted-foreground truncate max-w-md">{row.getValue("description") || "-"}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const dateStr = row.getValue("createdAt") as string
        if (!dateStr) return "-"
        return new Intl.DateTimeFormat("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(dateStr))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const department = row.original
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
                      navigator.clipboard.writeText(String(department.id));
                      toast.info("Department ID copied to clipboard");
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
                <DropdownMenuItem onClick={() => setEditDepartment(department)}><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => setDepartmentToDelete(department)}><Trash className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

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
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center relative w-full sm:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter departments by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full bg-white pl-9"
        />
      </div>
      <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
        <Table className="min-w-[600px]">
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
                    <p>No departments found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <EditDepartmentDialog 
        department={editDepartment} 
        onClose={() => setEditDepartment(null)} 
      />

      <AlertDialog open={!!departmentToDelete} onOpenChange={(open) => !open && !isDeleting && setDepartmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the <strong>{departmentToDelete?.name}</strong> department
              and remove all of its associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault()
                if (departmentToDelete) {
                  deleteDepartment(departmentToDelete.id)
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
  )
}
