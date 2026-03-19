"use client";

import type {
  ColumnFiltersState,
  ColumnPinningState,
  Row,
  RowSelectionState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  type Column,
  type ColumnDef,
  type ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortDirection,
  type SortingState,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ChevronsUpDown,
  LoaderIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import type { CSSProperties } from "react";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const DEFAULT_ROW_HEIGHT = 56;
const DEFAULT_OVERSCAN = 8;
const DATA_URL =
  "https://raw.githubusercontent.com/zerostaticthemes/shadcnblocks-library-data/refs/heads/main/data/orders-ecommerce-1000.json";

type UseDataTableOptions<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, unknown>>;
  getRowId?: (row: TData) => string;
  initialSorting?: SortingState;
  initialGlobalFilter?: string;
  initialFilters?: ColumnFiltersState;
  initialVisibility?: VisibilityState;
  initialSelection?: RowSelectionState;
  initialColumnPinning?: ColumnPinningState;
  enableRowSelection?: boolean;
  rowHeight?: number;
  overscan?: number;
};

type ColumnStyleMeta = {
  align?: "left" | "center" | "right";
  headerClassName?: string;
  cellClassName?: string;
  className?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
};

type ColumnWithPinning = {
  getIsPinned?: () => "left" | "right" | false;
  getIsLastColumn?: (position: "left" | "right") => boolean;
  getIsFirstColumn?: (position: "left" | "right") => boolean;
  getStart?: (position: "left" | "right") => number;
  getAfter?: (position: "left" | "right") => number;
  getSize?: () => number;
};

function getColumnLayoutStyles(
  meta: ColumnStyleMeta,
  columnWithPinning: ColumnWithPinning,
) {
  const baseStyle: CSSProperties = {};
  if (meta.width !== undefined) {
    baseStyle.width =
      typeof meta.width === "number" ? `${meta.width}px` : meta.width;
  }
  if (meta.minWidth !== undefined) {
    baseStyle.minWidth =
      typeof meta.minWidth === "number" ? `${meta.minWidth}px` : meta.minWidth;
  }
  if (meta.maxWidth !== undefined) {
    baseStyle.maxWidth =
      typeof meta.maxWidth === "number" ? `${meta.maxWidth}px` : meta.maxWidth;
  }
  if (
    baseStyle.width === undefined &&
    typeof columnWithPinning.getSize === "function"
  ) {
    const computedWidth = columnWithPinning.getSize();
    if (typeof computedWidth === "number" && Number.isFinite(computedWidth)) {
      baseStyle.width = `${computedWidth}px`;
    }
  }

  const pinned = columnWithPinning.getIsPinned?.();
  const pinnedStyle: CSSProperties = {};
  let lastPinned: "left" | "right" | undefined;

  if (pinned) {
    pinnedStyle.position = "sticky";
    pinnedStyle.zIndex = 1;

    if (pinned === "left") {
      const start = columnWithPinning.getStart?.("left") ?? 0;
      pinnedStyle.left = `${start}px`;
      if (columnWithPinning.getIsLastColumn?.("left")) {
        lastPinned = "left";
      }
    }

    if (pinned === "right") {
      const after = columnWithPinning.getAfter?.("right") ?? 0;
      pinnedStyle.right = `${after}px`;
      if (columnWithPinning.getIsFirstColumn?.("right")) {
        lastPinned = "right";
      }
    }

    const resolvedWidth =
      baseStyle.width ??
      (typeof columnWithPinning.getSize === "function"
        ? columnWithPinning.getSize()
        : undefined);
    if (resolvedWidth !== undefined) {
      pinnedStyle.width =
        typeof resolvedWidth === "number"
          ? `${resolvedWidth}px`
          : resolvedWidth;
    }
  }

  return { baseStyle, pinnedStyle, pinned, lastPinned };
}

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    data,
    columns,
    getRowId,
    initialSorting = [],
    initialSelection = {},
    enableRowSelection = true,
    initialColumnPinning = {},
    rowHeight = DEFAULT_ROW_HEIGHT,
    overscan = DEFAULT_OVERSCAN,
  } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialSelection);
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(initialColumnPinning);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    initialState: {
      sorting: initialSorting,
    },
    state: {
      sorting,
      columnPinning,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnPinningChange: setColumnPinning,
    enableRowSelection,
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  return {
    table,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    columnPinning,
    setColumnPinning,
    tableContainerRef,
    rowVirtualizer,
  };
}

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  if (!canSort) {
    return (
      <span className="flex h-8 items-center text-sm font-medium text-foreground">
        {title}
      </span>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex h-8 items-center gap-2 px-0 text-sm font-medium text-foreground"
      onClick={(event) =>
        column.toggleSorting(
          undefined,
          event.metaKey || event.ctrlKey || event.shiftKey,
        )
      }
    >
      <span>{title}</span>
      {sorted === "desc" ? (
        <ArrowDown className="h-4 w-4" />
      ) : sorted === "asc" ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      )}
    </Button>
  );
};

type DataTableSortMenuProps<TData> = {
  table: Table<TData>;
};

const SORT_DIRECTIONS: Array<{ label: string; value: SortDirection }> = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export function DataTableSortMenu<TData>({
  table,
}: DataTableSortMenuProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const sorting = table.getState().sorting;
  const onSortingChange = table.setSorting;

  const sortableColumns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanSort()),
    [table],
  );

  const sortedColumnIds = React.useMemo(
    () => new Set(sorting.map((sort) => sort.id)),
    [sorting],
  );

  const availableColumns = React.useMemo(
    () => sortableColumns.filter((column) => !sortedColumnIds.has(column.id)),
    [sortableColumns, sortedColumnIds],
  );

  const getColumnLabel = React.useCallback(
    (id: string) => {
      const column = sortableColumns.find((col) => col.id === id);
      if (!column) return id;

      const metaLabel = (column.columnDef.meta as { label?: string })?.label;
      if (metaLabel) return metaLabel;

      const header = column.columnDef.header;
      if (typeof header === "string") return header;

      return column.id;
    },
    [sortableColumns],
  );

  const onSortAdd = React.useCallback(() => {
    const firstAvailable = availableColumns[0];
    if (!firstAvailable) return;

    onSortingChange((prev) => [
      ...prev,
      { id: firstAvailable.id, desc: false },
    ]);
  }, [availableColumns, onSortingChange]);

  const onSortUpdate = React.useCallback(
    (sortId: string, updates: Partial<ColumnSort>) => {
      onSortingChange((prevSorting) =>
        prevSorting.map((sort) =>
          sort.id === sortId ? { ...sort, ...updates } : sort,
        ),
      );
    },
    [onSortingChange],
  );

  const onSortRemove = React.useCallback(
    (sortId: string) => {
      onSortingChange((prevSorting) =>
        prevSorting.filter((sort) => sort.id !== sortId),
      );
    },
    [onSortingChange],
  );

  const onSortMove = React.useCallback(
    (sortId: string, delta: number) => {
      onSortingChange((prevSorting) => {
        const index = prevSorting.findIndex((sort) => sort.id === sortId);
        const targetIndex = index + delta;

        if (
          index === -1 ||
          targetIndex < 0 ||
          targetIndex >= prevSorting.length
        )
          return prevSorting;

        const next = [...prevSorting];
        const [item] = next.splice(index, 1);
        next.splice(targetIndex, 0, item);
        return next;
      });
    },
    [onSortingChange],
  );

  const onSortingReset = React.useCallback(() => {
    onSortingChange(table.initialState?.sorting ?? []);
  }, [onSortingChange, table.initialState?.sorting]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="font-normal">
          <ArrowDownUp className="mr-2 h-4 w-4 text-muted-foreground" />
          Sort
          {sorting.length > 0 ? (
            <Badge
              variant="secondary"
              className="ml-2 rounded px-1.5 font-mono text-[10px]"
            >
              {sorting.length}
            </Badge>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[440px] max-w-[calc(100vw-2rem)] space-y-3">
        <div className="space-y-2">
          {sorting.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sorting applied.</p>
          ) : (
            sorting.map((sort, index) => {
              const usedByOthers = new Set(
                sorting.filter((s) => s.id !== sort.id).map((item) => item.id),
              );

              const columnOptions = sortableColumns.filter(
                (column) =>
                  column.id === sort.id || !usedByOthers.has(column.id),
              );

              return (
                <div
                  key={sort.id}
                  className="flex w-full flex-wrap items-center gap-2 rounded-md border border-border/60 p-2"
                >
                  <Select
                    value={sort.id}
                    onValueChange={(value) =>
                      onSortUpdate(sort.id, { id: value })
                    }
                  >
                    <SelectTrigger className="min-w-[180px] flex-1">
                      <SelectValue placeholder="Column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columnOptions.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {getColumnLabel(column.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={sort.desc ? "desc" : "asc"}
                    onValueChange={(value: SortDirection) =>
                      onSortUpdate(sort.id, { desc: value === "desc" })
                    }
                  >
                    <SelectTrigger className="w-[136px] min-w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_DIRECTIONS.map((direction) => (
                        <SelectItem
                          key={direction.value}
                          value={direction.value}
                        >
                          {direction.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      disabled={index === 0}
                      onClick={() => onSortMove(sort.id, -1)}
                      aria-label="Move sort up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      disabled={index === sorting.length - 1}
                      onClick={() => onSortMove(sort.id, 1)}
                      aria-label="Move sort down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => onSortRemove(sort.id)}
                      aria-label="Remove sort"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="rounded"
            onClick={onSortAdd}
            disabled={availableColumns.length === 0}
          >
            Add sort
          </Button>
          {sorting.length > 0 ? (
            <Button
              size="sm"
              variant="outline"
              className="rounded"
              onClick={onSortingReset}
            >
              Reset
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  schema: z.ZodSchema;
  itemName: string;
  idField?: string;
}

export function DataTableRowActions<TData>({
  row,
  schema,
  itemName,
  idField = "id",
}: DataTableRowActionsProps<TData>) {
  const item = schema.parse(row.original) as TData;
  const itemRecord = item as Record<string, unknown>;
  const handleCopy = async () => {
    const value = itemRecord[idField] ?? itemRecord.id;
    if (!value) {
      toast.error("No ID available to copy");
      return;
    }
    if (!navigator.clipboard?.writeText) {
      toast.error("Clipboard is not available in this browser");
      return;
    }

    try {
      await navigator.clipboard.writeText(String(value));
      toast.success("ID copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard", error);
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopy}>
          Copy {itemName} ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit {itemName}</DropdownMenuItem>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const schema = z.object({
  id: z.string(),
  purchased: z.string(),
  items: z.number(),
  customer: z.string(),
  customer_email: z.string(),
  fulfillment_channel: z.string(),
  notes: z.string(),
});

export type Order = z.infer<typeof schema>;

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      width: 56,
      minWidth: 48,
      headerClassName: "px-2",
      cellClassName: "px-2",
      align: "center",
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] font-mono">{row.original.id}</div>
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      width: 120,
      label: "Order",
    },
  },
  {
    accessorKey: "purchased",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="max-w-[320px] truncate font-medium">
          {row.original.purchased}
        </div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      width: 280,
      label: "Purchased",
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[180px] truncate">{row.original.customer}</div>
    ),
    meta: {
      width: 200,
      label: "Customer",
    },
  },
  {
    accessorKey: "customer_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Email" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[240px] truncate text-xs sm:text-sm">
        {row.original.customer_email}
      </span>
    ),
    meta: {
      width: 240,
      label: "Customer Email",
    },
  },
  {
    accessorKey: "fulfillment_channel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fulfillment" />
    ),
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap sm:text-sm">
        {row.original.fulfillment_channel}
      </span>
    ),
    meta: {
      className: "whitespace-nowrap",
      width: 160,
      label: "Fulfillment",
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <span className="text-xs tabular-nums sm:text-sm">
        {row.original.items}
      </span>
    ),
    meta: {
      align: "center",
      className: "tabular-nums",
      width: 100,
      label: "Items",
    },
  },

  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[240px] truncate text-xs sm:text-sm">
        {row.original.notes}
      </span>
    ),
    meta: { width: 260, label: "Notes" },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        schema={schema}
        itemName="order"
        idField="id"
      />
    ),
    meta: {
      width: 56,
      minWidth: 48,
      headerClassName: "px-2",
      cellClassName: "px-2",
      align: "center",
    },
  },
];

export const DataTable32 = ({ className }: { className?: string }) => {
  const [data, setData] = React.useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch(DATA_URL);
        if (!res.ok) {
          const message = `Failed to fetch orders data (${res.status})`;
          console.error(message, res.statusText);
          if (active) setError(message);
          return;
        }
        const json = await res.json();
        const parsed = schema.array().parse(json);
        if (active) {
          setData(parsed);
        }
      } catch (error) {
        console.error("Error fetching orders data", error);
        if (active) setError("Error fetching orders data");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const { table, tableContainerRef, rowVirtualizer } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
    initialColumnPinning: { left: ["select"], right: ["actions"] },
  });
  const visibleColumns = table.getVisibleLeafColumns();
  const visibleColumnCount = Math.max(visibleColumns.length, 1);
  const visibleColumnIds = visibleColumns.map((column) => column.id);
  const rightPinnedColumnIdSet = new Set(
    table.getState().columnPinning.right ?? [],
  );
  const firstRightPinnedIndex = visibleColumnIds.findIndex((columnId) =>
    rightPinnedColumnIdSet.has(columnId),
  );
  const rightStickyDividerTargetId =
    firstRightPinnedIndex > 0
      ? visibleColumnIds[firstRightPinnedIndex - 1]
      : null;
  const rowModel = table.getRowModel().rows;
  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;
  const hasRows = rowModel.length > 0;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Virtualized Data Table With Multi-Sort Controls
            </h2>
            <p className="mt-2 text-muted-foreground">
              Use the Sort menu to stack multiple column sorts, reorder their
              priority, and reset defaults—plus Shift/Cmd/Ctrl-click headers to
              append sorts instead of replacing—while virtualized scrolling
              keeps large datasets smooth.
            </p>
          </div>
          <div className="mb-4 flex items-center justify-end">
            <DataTableSortMenu table={table} />
          </div>
          <div className="overflow-hidden rounded-lg border-2">
            <div
              ref={tableContainerRef}
              className="relative max-h-[600px] overflow-auto"
            >
              {isLoading ? (
                <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    <span>Loading orders…</span>
                  </div>
                </div>
              ) : null}
              <table className="w-full table-fixed caption-bottom border-separate border-spacing-0 text-sm [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:hover_td[data-pinned]]:bg-muted/50 [&_tr:not(:last-child)_td]:border-b [&_tr[data-state=selected]_td[data-pinned]]:bg-muted [&_tr[data-state=selected]:hover_td[data-pinned]]:bg-muted">
                <TableHeader className="sticky top-0 z-20 bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const meta =
                          (header.column.columnDef.meta as ColumnStyleMeta) ??
                          {};
                        const columnWithPinning =
                          header.column as unknown as ColumnWithPinning;
                        const { baseStyle, pinnedStyle, pinned, lastPinned } =
                          getColumnLayoutStyles(meta, columnWithPinning);

                        const alignClass =
                          meta.align === "center"
                            ? "text-center"
                            : meta.align === "right"
                              ? "text-right"
                              : meta.align === "left"
                                ? "text-left"
                                : undefined;

                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ ...baseStyle, ...pinnedStyle }}
                            className={cn(
                              "relative h-11 truncate border-r px-3 text-sm font-medium last:border-r-0 data-[pinned]:bg-muted/90 data-[pinned]:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                              header.column.id === rightStickyDividerTargetId &&
                                "!border-r-0",
                              meta.className,
                              meta.headerClassName,
                              alignClass,
                            )}
                            data-pinned={pinned || undefined}
                            data-last-col={lastPinned || undefined}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow className="border-b last:border-b-0">
                      <TableCell
                        colSpan={visibleColumnCount}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        <div className="inline-flex items-center gap-2">
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                          <span>Loading orders…</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow className="border-b last:border-b-0">
                      <TableCell
                        colSpan={visibleColumnCount}
                        className="h-24 text-center text-sm text-destructive"
                      >
                        {error}
                      </TableCell>
                    </TableRow>
                  ) : hasRows ? (
                    <>
                      {paddingTop > 0 ? (
                        <TableRow
                          className="pointer-events-none border-none"
                          aria-hidden="true"
                          style={{ height: paddingTop }}
                        >
                          {visibleColumns.map((column) => (
                            <TableCell
                              key={`pad-top-${column.id}`}
                              className="border-none p-0"
                            />
                          ))}
                        </TableRow>
                      ) : null}
                      {virtualRows.map((virtualRow) => {
                        const row = rowModel[virtualRow.index];
                        if (!row) return null;

                        return (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="border-b last:border-b-0"
                            style={{ height: virtualRow.size }}
                          >
                            {row.getVisibleCells().map((cell) => {
                              const meta =
                                (cell.column.columnDef
                                  .meta as ColumnStyleMeta) ?? {};
                              const columnWithPinning =
                                cell.column as unknown as ColumnWithPinning;
                              const {
                                baseStyle,
                                pinnedStyle,
                                pinned,
                                lastPinned,
                              } = getColumnLayoutStyles(
                                meta,
                                columnWithPinning,
                              );

                              const alignClass =
                                meta.align === "center"
                                  ? "text-center"
                                  : meta.align === "right"
                                    ? "text-right"
                                    : meta.align === "left"
                                      ? "text-left"
                                      : undefined;

                              return (
                                <TableCell
                                  key={cell.id}
                                  style={{ ...baseStyle, ...pinnedStyle }}
                                  className={cn(
                                    "truncate border-r p-3 py-2 text-sm last:border-r-0 data-[pinned]:bg-background/90 data-[pinned]:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                                    cell.column.id ===
                                      rightStickyDividerTargetId &&
                                      "!border-r-0",
                                    meta.className,
                                    meta.cellClassName,
                                    alignClass,
                                  )}
                                  data-pinned={pinned || undefined}
                                  data-last-col={lastPinned || undefined}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                      {paddingBottom > 0 ? (
                        <TableRow
                          className="pointer-events-none border-none"
                          aria-hidden="true"
                          style={{ height: paddingBottom }}
                        >
                          {visibleColumns.map((column) => (
                            <TableCell
                              key={`pad-bottom-${column.id}`}
                              className="border-none p-0"
                            />
                          ))}
                        </TableRow>
                      ) : null}
                    </>
                  ) : (
                    <TableRow className="border-b last:border-b-0">
                      <TableCell
                        colSpan={visibleColumnCount}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
