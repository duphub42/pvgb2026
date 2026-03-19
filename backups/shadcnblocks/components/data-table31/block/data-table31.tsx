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
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  LoaderIcon,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import type { CSSProperties } from "react";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const DEFAULT_ROW_HEIGHT = 56;
const DEFAULT_OVERSCAN = 8;
const FOOTER_HEIGHT = DEFAULT_ROW_HEIGHT;
const DATA_URL =
  "https://raw.githubusercontent.com/zerostaticthemes/shadcnblocks-library-data/refs/heads/main/data/orders-ecommerce-1000.json";

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
      onClick={() => column.toggleSorting(sorted === "asc")}
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
    meta: { className: "whitespace-nowrap", width: 160 },
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
    meta: { align: "center", className: "tabular-nums", width: 100 },
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
    meta: { width: 260 },
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

export const DataTable31 = ({ className }: { className?: string }) => {
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
  const editableColumnOrder = React.useMemo(() => {
    const collected: string[] = [];
    for (const col of columns) {
      if ("id" in col && col.id) {
        collected.push(String(col.id));
        continue;
      }
      const withAccessor = col as { accessorKey?: unknown };
      if (typeof withAccessor.accessorKey === "string") {
        collected.push(withAccessor.accessorKey);
      }
    }
    return collected.filter((id) => id && id !== "select" && id !== "actions");
  }, []);
  const firstEditableColumnId = editableColumnOrder[0];
  const pendingAddRef = React.useRef(false);
  const pendingAddedRowIdRef = React.useRef<string | null>(null);
  const rowRefs = React.useRef(new Map<string, HTMLTableRowElement>());
  const editingCellRef = React.useRef<HTMLDivElement | null>(null);
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);

  const addRow = React.useCallback(() => {
    editingCellRef.current = null;
    const newRowId = `#${String(Math.floor(Math.random() * 900000) + 100000)}`;
    const newRow: Order = {
      id: newRowId,
      purchased: "",
      items: 0,
      customer: "",
      customer_email: "",
      fulfillment_channel: "",
      notes: "",
    };
    pendingAddRef.current = true;
    pendingAddedRowIdRef.current = newRowId;
    setEditingRowId(newRowId);
    setData((prev) => [...prev, newRow]);
  }, [setEditingRowId]);

  const deleteSelectedRows = React.useCallback(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 0) return;

    const selectedIds = new Set(selectedRows.map((row) => row.original.id));
    setData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    table.resetRowSelection();
  }, [table]);

  const onContainerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (table.getSelectedRowModel().rows.length > 0) {
          event.preventDefault();
          deleteSelectedRows();
        }
      }
    },
    [deleteSelectedRows, table],
  );

  React.useEffect(() => {
    editingCellRef.current = null;
  }, [editingRowId]);

  React.useEffect(() => {
    if (!pendingAddRef.current || !pendingAddedRowIdRef.current) return;
    const addedRowId = pendingAddedRowIdRef.current;

    pendingAddRef.current = false;
    pendingAddedRowIdRef.current = null;

    const rows = table.getRowModel().rows;
    const targetIndex = rows.findIndex((row) => row.original.id === addedRowId);
    if (targetIndex === -1) return;

    rowVirtualizer.scrollToIndex(targetIndex, { align: "center" });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const editableCell = editingCellRef.current;
        if (editableCell) {
          editableCell.focus();
          return;
        }

        const rowEl = rowRefs.current.get(addedRowId);
        if (rowEl) {
          rowEl.focus({ preventScroll: true });
          return;
        }

        const container = tableContainerRef.current;
        if (container) {
          container.focus({ preventScroll: true });
        }
      });
    });
  }, [data.length, rowVirtualizer, table, tableContainerRef]);

  const coerceEditableValue = React.useCallback(
    (columnId: string, rawValue: string, prevRow: Order) => {
      const trimmed = rawValue.trim();

      switch (columnId) {
        case "id": {
          if (!trimmed) return prevRow.id;
          const normalized = trimmed.startsWith("#")
            ? trimmed
            : `#${trimmed.replace(/^#*/, "")}`;
          return normalized;
        }
        case "items": {
          const parsed = Number.parseInt(trimmed, 10);
          return Number.isFinite(parsed) ? parsed : prevRow.items;
        }

        default:
          return trimmed;
      }
    },
    [],
  );

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
              Virtualized Data Table With Add Row Option
            </h2>
            <p className="mt-2 text-muted-foreground">
              Add rows from the sticky footer action, immediately edit every
              cell inline, and delete selected rows with Delete/Backspace while
              virtualized scrolling keeps navigation smooth.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border-2">
            <div
              ref={tableContainerRef}
              className="relative max-h-[600px] overflow-auto"
              tabIndex={0}
              onKeyDown={onContainerKeyDown}
              style={{
                scrollPaddingBottom: FOOTER_HEIGHT,
              }}
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

                        const isEditingRow = editingRowId === row.original.id;

                        return (
                          <TableRow
                            key={row.id}
                            ref={(node) => {
                              if (node) {
                                rowRefs.current.set(row.id, node);
                              } else {
                                rowRefs.current.delete(row.id);
                              }
                            }}
                            data-state={row.getIsSelected() && "selected"}
                            className="border-b last:border-b-0"
                            tabIndex={-1}
                            style={{ height: virtualRow.size }}
                          >
                            {row.getVisibleCells().map((cell) => {
                              const isEditableCell =
                                isEditingRow &&
                                cell.column.id !== "select" &&
                                cell.column.id !== "actions";
                              const isPrimaryEditableCell =
                                isEditableCell &&
                                firstEditableColumnId &&
                                cell.column.id === firstEditableColumnId &&
                                !editingCellRef.current;
                              const editableRef = isPrimaryEditableCell
                                ? (node: HTMLDivElement | null) => {
                                    if (node) {
                                      editingCellRef.current = node;
                                    }
                                  }
                                : undefined;
                              const handleEditableBlur = (
                                event: React.FocusEvent<HTMLDivElement>,
                              ) => {
                                const nextValue =
                                  event.currentTarget.textContent ?? "";
                                const coercedValue = coerceEditableValue(
                                  cell.column.id,
                                  nextValue,
                                  row.original,
                                );
                                setData((prev) =>
                                  prev.map((rowData) =>
                                    rowData.id === row.original.id
                                      ? {
                                          ...rowData,
                                          [cell.column.id]: coercedValue,
                                        }
                                      : rowData,
                                  ),
                                );
                                if (
                                  cell.column.id === "id" &&
                                  typeof coercedValue === "string"
                                ) {
                                  setEditingRowId(coercedValue);
                                }
                              };
                              const handleEditableKeyDown = (
                                event: React.KeyboardEvent<HTMLDivElement>,
                              ) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  event.currentTarget.blur();
                                } else if (event.key === "Escape") {
                                  event.preventDefault();
                                  event.currentTarget.textContent =
                                    displayValue;
                                  setEditingRowId(null);
                                  event.currentTarget.blur();
                                }
                              };
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
                              const rawValue =
                                row.original[cell.column.id as keyof Order];
                              const displayValue =
                                rawValue === null || rawValue === undefined
                                  ? ""
                                  : String(rawValue);

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
                                  {isEditableCell ? (
                                    <div
                                      ref={editableRef}
                                      role="textbox"
                                      data-editable-cell={cell.column.id}
                                      contentEditable
                                      suppressContentEditableWarning
                                      className="min-h-[1.5rem] outline-none"
                                      onBlur={handleEditableBlur}
                                      onKeyDown={handleEditableKeyDown}
                                    >
                                      {displayValue}
                                    </div>
                                  ) : (
                                    flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )
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
                <tfoot className="sticky bottom-0 z-20 border-t bg-background">
                  <tr>
                    <td
                      colSpan={visibleColumnCount}
                      className="p-0"
                      style={{
                        width: table.getTotalSize(),
                        minWidth: table.getTotalSize(),
                      }}
                    >
                      <button
                        type="button"
                        className="relative flex h-14 w-full items-center gap-2 bg-muted/30 px-4 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        onClick={addRow}
                      >
                        <div className="sticky left-0 flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          <span>Add row</span>
                        </div>
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
