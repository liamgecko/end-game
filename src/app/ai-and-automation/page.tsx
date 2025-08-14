"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table"
import { MoreHorizontal, Play, Pause, Settings, Trash2, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample AI agents data
const data: AIAgent[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    status: "Active",
    timesTriggered: 156,
    lastUsed: "2 minutes ago",
    createdBy: {
      name: "Sarah Johnson",
      avatar: "SJ",
      dateCreated: "2024-01-15 09:30 AM"
    }
  },
  {
    id: "2",
    name: "Lead Qualification Bot",
    status: "Active",
    timesTriggered: 89,
    lastUsed: "15 minutes ago",
    createdBy: {
      name: "Mike Chen",
      avatar: "MC",
      dateCreated: "2024-01-12 02:15 PM"
    }
  },
  {
    id: "3",
    name: "Data Processing Agent",
    status: "Idle",
    timesTriggered: 234,
    lastUsed: "1 hour ago",
    createdBy: {
      name: "Emma Wilson",
      avatar: "EW",
      dateCreated: "2024-01-10 11:45 AM"
    }
  },
  {
    id: "4",
    name: "Email Response Bot",
    status: "Active",
    timesTriggered: 67,
    lastUsed: "5 minutes ago",
    createdBy: {
      name: "David Brown",
      avatar: "DB",
      dateCreated: "2024-01-08 03:20 PM"
    }
  }
]

export type AIAgent = {
  id: string
  name: string
  status: "Active" | "Idle"
  timesTriggered: number
  lastUsed: string
  createdBy: {
    name: string
    avatar: string
    dateCreated: string
  }
}

const columns: ColumnDef<AIAgent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div>{name || "Unnamed Agent"}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex justify-start">
          <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
            status === "Active" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {status}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "timesTriggered",
    header: "Times triggered",
    cell: ({ row }) => {
      const timesTriggered = row.getValue("timesTriggered") as number
      return <div>{timesTriggered || 0}</div>
    },
  },
  {
    accessorKey: "lastUsed",
    header: "Last used",
    cell: ({ row }) => {
      const lastUsed = row.getValue("lastUsed") as string
      return <div>{lastUsed || "Never"}</div>
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created by",
    cell: ({ row }) => {
      const createdBy = row.getValue("createdBy") as AIAgent["createdBy"]
      
      if (!createdBy) {
        return <div className="text-muted-foreground">Not specified</div>
      }
      
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary">{createdBy.avatar}</span>
          </div>
          <div>
            <p>{createdBy.name}</p>
            <p className="text-sm text-muted-foreground">{createdBy.dateCreated}</p>
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const agent = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Play className="mr-2 h-4 w-4" />
              Start
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function AIAndAutomationPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="h-full p-6">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI and automation</h1>
          <p className="text-muted-foreground">
            Manage AI agents, workflows, and automation rules to streamline your operations.
          </p>
        </div>
        <Link href="/ai-and-automation/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add new AI agent
          </Button>
        </Link>
      </div>


      {/* AI Agents Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
