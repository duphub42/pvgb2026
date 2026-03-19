"use client";

import type {
  ColumnPinningState,
  Row,
  RowSelectionState,
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
  CheckCheckIcon,
  CheckCircle,
  ChevronsUpDown,
  Clock,
  Copy,
  LoaderIcon,
  MoreHorizontal,
  Package,
  PieChart,
  RefreshCcw,
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
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const DEFAULT_ROW_HEIGHT = 56;
const DEFAULT_OVERSCAN = 8;
const DATA_URL =
  "https://raw.githubusercontent.com/zerostaticthemes/shadcnblocks-library-data/refs/heads/main/data/orders-ecommerce-1000.json";

type TextEditorConfig = {
  type: "text";
  multiline?: boolean;
  placeholder?: string;
};

type NumberEditorConfig = {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  allowEmpty?: boolean;
};

type SelectOption = {
  label: string;
  value: string;
};

type SelectEditorConfig = {
  type: "select";
  options: Array<SelectOption>;
  placeholder?: string;
};

type BooleanEditorConfig = {
  type: "boolean";
};

type ColumnEditorConfig =
  | TextEditorConfig
  | NumberEditorConfig
  | SelectEditorConfig
  | BooleanEditorConfig;

type DataTableColumnMeta = {
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  headerClassName?: string;
  cellClassName?: string;
  className?: string;
  align?: "left" | "center" | "right";
  editor?: ColumnEditorConfig;
  clearValue?: unknown;
};

type ColumnWithPinning = {
  getIsPinned?: () => "left" | "right" | false;
  getIsLastColumn?: (position: "left" | "right") => boolean;
  getIsFirstColumn?: (position: "left" | "right") => boolean;
  getStart?: (position: "left" | "right") => number;
  getAfter?: (position: "left" | "right") => number;
  getSize?: () => number;
};

type ColumnStyleResult = {
  style: CSSProperties;
  pinned: "left" | "right" | false;
  lastPinned?: "left" | "right";
};

const getColumnStyles = (
  meta: DataTableColumnMeta,
  column: ColumnWithPinning,
): ColumnStyleResult => {
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
  if (baseStyle.width === undefined && typeof column.getSize === "function") {
    const computedWidth = column.getSize();
    if (typeof computedWidth === "number" && Number.isFinite(computedWidth)) {
      baseStyle.width = `${computedWidth}px`;
    }
  }

  const pinned = column.getIsPinned?.() ?? false;
  const pinnedStyle: CSSProperties = {};
  let lastPinned: "left" | "right" | undefined;

  if (pinned) {
    pinnedStyle.position = "sticky";
    pinnedStyle.zIndex = 1;

    if (pinned === "left") {
      const start = column.getStart?.("left") ?? 0;
      pinnedStyle.left = `${start}px`;
      if (column.getIsLastColumn?.("left")) {
        lastPinned = "left";
      }
    }

    if (pinned === "right") {
      const after = column.getAfter?.("right") ?? 0;
      pinnedStyle.right = `${after}px`;
      if (column.getIsFirstColumn?.("right")) {
        lastPinned = "right";
      }
    }

    const resolvedWidth =
      baseStyle.width ??
      (typeof column.getSize === "function" ? column.getSize() : undefined);
    if (resolvedWidth !== undefined) {
      pinnedStyle.width =
        typeof resolvedWidth === "number"
          ? `${resolvedWidth}px`
          : resolvedWidth;
    }
  }

  return { style: { ...baseStyle, ...pinnedStyle }, pinned, lastPinned };
};

type CellPosition = {
  rowId: string;
  columnId: string;
};

type ContextMenuState = {
  open: boolean;
  x: number;
  y: number;
  cell: CellPosition | null;
};

type UseDataTableOptions<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, unknown>>;
  getRowId?: (row: TData) => string;
  initialSorting?: SortingState;
  initialSelection?: RowSelectionState;
  initialColumnPinning?: ColumnPinningState;
  enableRowSelection?: boolean;
  rowHeight?: number;
  overscan?: number;
  onUpdateCells?: (
    updates: Array<{ rowId: string; columnId: string; value: unknown }>,
  ) => void;
};

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
    onUpdateCells,
  } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialSelection);
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(initialColumnPinning);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [editingCell, setEditingCell] = React.useState<CellPosition | null>(
    null,
  );
  const [editingValue, setEditingValue] = React.useState<unknown>("");
  const [editingConfig, setEditingConfig] =
    React.useState<ColumnEditorConfig | null>(null);
  const [contextMenu, setContextMenu] = React.useState<ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
    cell: null,
  });

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

  const columnMetaMap = React.useMemo(() => {
    const map = new Map<string, DataTableColumnMeta>();
    columns.forEach((column) => {
      const id =
        column.id ??
        ("accessorKey" in column && typeof column.accessorKey === "string"
          ? column.accessorKey
          : undefined);
      if (!id) return;
      map.set(id, (column.meta as DataTableColumnMeta) ?? {});
    });
    return map;
  }, [columns]);

  const getEditorConfig = React.useCallback(
    (columnId: string) => columnMetaMap.get(columnId)?.editor,
    [columnMetaMap],
  );

  const getInitialEditorValue = React.useCallback(
    (editor: ColumnEditorConfig | undefined, value: unknown) => {
      if (!editor) {
        return value === undefined || value === null ? "" : String(value);
      }
      switch (editor.type) {
        case "number":
          if (value === undefined || value === null) return "";
          return typeof value === "number" ? value.toString() : String(value);
        case "boolean":
          return Boolean(value);
        case "select":
          return typeof value === "string" ? value : "";
        case "text":
        default:
          return value === undefined || value === null ? "" : String(value);
      }
    },
    [],
  );

  const coerceEditorValue = React.useCallback(
    (
      editor: ColumnEditorConfig | null,
      draft: unknown,
    ): { value: unknown; valid: boolean } => {
      if (!editor) {
        return {
          value: draft === undefined || draft === null ? "" : draft,
          valid: true,
        };
      }
      switch (editor.type) {
        case "number": {
          const raw =
            typeof draft === "number"
              ? draft.toString()
              : draft === undefined || draft === null
                ? ""
                : String(draft);
          const trimmed = raw.trim();
          if (trimmed === "") {
            if (editor.allowEmpty) {
              return { value: null, valid: true };
            }
            return { value: 0, valid: true };
          }
          const parsed = Number(trimmed);
          if (Number.isNaN(parsed)) {
            return { value: draft, valid: false };
          }
          return { value: parsed, valid: true };
        }
        case "boolean":
          return { value: Boolean(draft), valid: true };
        case "select":
          return {
            value: typeof draft === "string" ? draft : "",
            valid: true,
          };
        case "text":
        default:
          return {
            value: draft === undefined || draft === null ? "" : String(draft),
            valid: true,
          };
      }
    },
    [],
  );

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

  const applyRowUpdates = React.useCallback(
    (updates: Array<{ rowId: string; columnId: string; value: unknown }>) => {
      if (!onUpdateCells) return;
      const existingRowIds = new Set(
        table.getRowModel().rows.map((row) => row.id),
      );
      const normalized = updates.filter(({ rowId }) =>
        existingRowIds.has(rowId),
      );
      if (normalized.length > 0) {
        onUpdateCells(normalized);
      }
    },
    [table, onUpdateCells],
  );

  const startEditing = React.useCallback(
    (rowId: string, columnId: string) => {
      const editor = getEditorConfig(columnId);
      if (!editor) return;
      const rows = table.getRowModel().rows;
      const row = rows.find((item) => item.id === rowId);
      if (!row) return;
      const cell = row.getVisibleCells().find((c) => c.column.id === columnId);
      const value = cell?.getValue();
      setEditingCell({ rowId, columnId });
      setEditingConfig(editor);
      setEditingValue(getInitialEditorValue(editor, value));
    },
    [table, getEditorConfig, getInitialEditorValue],
  );

  const cancelEditing = React.useCallback(() => {
    setEditingCell(null);
    setEditingValue("");
    setEditingConfig(null);
  }, []);

  const commitEditing = React.useCallback(
    (draftValue?: unknown) => {
      if (!editingCell) return;
      const { value: nextValue, valid } = coerceEditorValue(
        editingConfig,
        draftValue ?? editingValue,
      );
      if (!valid) {
        return;
      }
      applyRowUpdates([
        {
          rowId: editingCell.rowId,
          columnId: editingCell.columnId,
          value: nextValue,
        },
      ]);
      setEditingCell(null);
      setEditingValue("");
      setEditingConfig(null);
    },
    [
      editingCell,
      editingValue,
      editingConfig,
      applyRowUpdates,
      coerceEditorValue,
    ],
  );

  const copyCellToClipboard = React.useCallback(
    async (cell: CellPosition) => {
      const row = table
        .getRowModel()
        .rows.find((item) => item.id === cell.rowId);
      if (!row) {
        return;
      }

      if (
        typeof navigator === "undefined" ||
        !navigator.clipboard ||
        typeof navigator.clipboard.writeText !== "function"
      ) {
        toast.error("Clipboard is not available in this browser");
        return;
      }

      const value = row.getValue(cell.columnId);
      const text =
        value === null || value === undefined
          ? ""
          : typeof value === "string"
            ? value
            : String(value);

      try {
        await navigator.clipboard.writeText(text);
        toast.success("Cell value copied to clipboard");
      } catch (error) {
        console.error("Failed to copy cell", error);
        toast.error("Could not copy to clipboard");
      }
    },
    [table],
  );

  const handleCellDoubleClick = React.useCallback(
    (rowId: string, columnId: string) => {
      startEditing(rowId, columnId);
    },
    [startEditing],
  );

  const handleCellContextMenu = React.useCallback(
    (
      rowId: string,
      columnId: string,
      event: React.MouseEvent<HTMLTableCellElement>,
    ) => {
      event.preventDefault();
      event.stopPropagation();
      if (editingCell) {
        commitEditing();
      }
      setContextMenu({
        open: true,
        x: event.clientX,
        y: event.clientY,
        cell: { rowId, columnId },
      });
    },
    [editingCell, commitEditing],
  );

  const closeContextMenu = React.useCallback(() => {
    setContextMenu((prev) => ({ ...prev, open: false }));
  }, []);

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
    editingCell,
    editingValue,
    setEditingValue,
    handleCellDoubleClick,
    commitEditing,
    cancelEditing,
    handleCellContextMenu,
    contextMenu,
    closeContextMenu,
    copyCellToClipboard,
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

interface DataTableRowActionsProps<TData extends Record<string, unknown>> {
  row: Row<TData>;
  itemName: string;
  idField?: string;
}

export function DataTableRowActions<TData extends Record<string, unknown>>({
  row,
  itemName,
  idField = "id",
}: DataTableRowActionsProps<TData>) {
  const item = row.original as Record<string, unknown>;
  const resolvedId =
    (item[idField] as string | number | undefined) ??
    (item.id as string | number | undefined);
  const idText = resolvedId != null ? String(resolvedId) : "";
  const handleCopy = async () => {
    if (!idText) {
      toast.error("No ID available to copy");
      return;
    }
    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function"
    ) {
      toast.error("Clipboard is not available in this browser");
      return;
    }
    try {
      await navigator.clipboard.writeText(idText);
      toast.success("ID copied to clipboard");
    } catch (error) {
      console.error("Failed to copy ID", error);
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
        <DropdownMenuItem disabled={!idText} onClick={handleCopy}>
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
  customer_segment: z.string(),
  fulfillment_channel: z.string(),
  shipping_service: z.string(),
  warehouse: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  tracking_number: z.string(),
  assigned_to: z.string(),
  return_status: z.string(),
  coupon_code: z.string().nullable(),
  gift: z.boolean(),
  notes: z.string(),
});

export type Order = z.infer<typeof schema>;

export type StatusOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const orderStatuses: StatusOption[] = [
  { label: "Fulfilled", value: "Fulfilled", icon: CheckCircle },
  { label: "Ready for pickup", value: "Ready for pickup", icon: Package },
  { label: "Unfulfilled", value: "Unfulfilled", icon: Clock },
];

export const paymentStatuses: StatusOption[] = [
  { label: "Paid", value: "Paid", icon: CheckCheckIcon },
  { label: "Pending", value: "Pending", icon: LoaderIcon },
  { label: "Refunded", value: "Refunded", icon: RefreshCcw },
  { label: "Partially refunded", value: "Partially refunded", icon: PieChart },
];

const createStatusLookup = (options: StatusOption[]) =>
  options.reduce<Record<string, StatusOption>>((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {});

const orderStatusLookup = createStatusLookup(orderStatuses);
const paymentStatusLookup = createStatusLookup(paymentStatuses);

export const getOrderStatusMeta = (status: string) => orderStatusLookup[status];
export const getPaymentStatusMeta = (status: string) =>
  paymentStatusLookup[status];

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "Fulfilled":
      return "default";
    case "Ready for pickup":
      return "secondary";
    case "Unfulfilled":
      return "outline";
    default:
      return "outline";
  }
};

export const getPaymentVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "default";
    case "Pending":
      return "secondary";
    case "Refunded":
      return "outline";
    case "Partially refunded":
      return "outline";
    default:
      return "outline";
  }
};

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
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "purchased",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div className="max-w-[320px] truncate font-medium">
            {row.original.purchased}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      width: 280,
      editor: { type: "text" },
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
      editor: { type: "text" },
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
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "customer_segment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Segment" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.customer_segment}</Badge>
    ),
    meta: {
      className: "whitespace-nowrap",
      width: 160,
      editor: {
        type: "select",
        options: [
          { label: "Wholesale", value: "Wholesale" },
          { label: "Retail", value: "Retail" },
          { label: "Enterprise", value: "Enterprise" },
          { label: "Marketplace", value: "Marketplace" },
          { label: "VIP", value: "VIP" },
        ],
      },
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
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
      editor: { type: "text" },
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
    },
  },
  {
    accessorKey: "shipping_service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Service" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[240px] truncate text-xs sm:text-sm">
        {row.original.shipping_service}
      </span>
    ),
    meta: { width: 220, editor: { type: "text" } },
  },
  {
    accessorKey: "warehouse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Warehouse" />
    ),
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap sm:text-sm">
        {row.original.warehouse}
      </span>
    ),
    meta: {
      className: "whitespace-nowrap",
      width: 140,
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.order_status;
      const statusMeta = getOrderStatusMeta(status);
      const StatusIcon = statusMeta?.icon;

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={getStatusVariant(status)}
            className="gap-1 whitespace-nowrap"
          >
            {StatusIcon ? <StatusIcon className="size-3" /> : null}
            <span>{statusMeta?.label ?? status}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
    },
    enableSorting: false,
    meta: {
      width: 200,
      editor: {
        type: "select",
        options: orderStatuses.map((status) => ({
          label: status.label,
          value: status.value,
        })),
      },
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.payment_status;
      const statusMeta = getPaymentStatusMeta(status);
      const StatusIcon = statusMeta?.icon;

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={getPaymentVariant(status)}
            className="gap-1 whitespace-nowrap"
          >
            {StatusIcon ? <StatusIcon className="size-3" /> : null}
            <span>{statusMeta?.label ?? status}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
    },
    enableSorting: false,
    meta: {
      width: 200,
      editor: {
        type: "select",
        options: paymentStatuses.map((status) => ({
          label: status.label,
          value: status.value,
        })),
      },
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
      editor: { type: "number", min: 0, step: 1 },
    },
  },
  {
    accessorKey: "tracking_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracking" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs sm:text-sm">
        {row.original.tracking_number}
      </span>
    ),
    meta: {
      className: "whitespace-nowrap",
      width: 200,
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "assigned_to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap sm:text-sm">
        {row.original.assigned_to}
      </span>
    ),
    meta: {
      className: "whitespace-nowrap",
      width: 180,
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "return_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Return Status" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.return_status}</Badge>
    ),
    filterFn: (row, id, value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.includes(String(row.getValue(id)));
    },
    meta: {
      width: 180,
      editor: { type: "text" },
    },
  },
  {
    accessorKey: "coupon_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coupon" />
    ),
    cell: ({ row }) => (
      <span className="text-xs sm:text-sm">
        {row.original.coupon_code ?? "—"}
      </span>
    ),
    meta: { width: 140, editor: { type: "text" } },
  },
  {
    accessorKey: "gift",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gift" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.gift ? "secondary" : "outline"}>
        {row.original.gift ? "Yes" : "No"}
      </Badge>
    ),
    meta: { width: 120, editor: { type: "boolean" } },
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
    meta: {
      width: 260,
      editor: { type: "text", multiline: true },
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} itemName="order" idField="id" />
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

type CellEditorProps = {
  editor: ColumnEditorConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  onCommit: (value?: unknown) => void;
  onCancel: () => void;
};

const CellEditor = React.memo(function CellEditor({
  editor,
  value,
  onChange,
  onCommit,
  onCancel,
}: CellEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  if (editor.type === "number") {
    return (
      <Input
        type="number"
        autoFocus
        min={editor.min}
        max={editor.max}
        step={editor.step}
        className="h-8"
        value={
          typeof value === "string"
            ? value
            : value === undefined || value === null
              ? ""
              : String(value)
        }
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onCommit()}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (e.key === "Enter") {
            e.preventDefault();
            onCommit();
          }
        }}
      />
    );
  }

  if (editor.type === "select") {
    return (
      <Select
        value={typeof value === "string" ? value : ""}
        onValueChange={(newValue) => {
          onChange(newValue);
          onCommit(newValue);
        }}
      >
        <SelectTrigger
          autoFocus
          className="h-8 w-full"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <SelectValue placeholder={editor.placeholder ?? "Select..."} />
        </SelectTrigger>
        <SelectContent>
          {editor.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (editor.type === "boolean") {
    const boolValue = Boolean(value);
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={boolValue}
          onCheckedChange={(checked) => {
            const nextValue = Boolean(checked);
            onChange(nextValue);
            onCommit(nextValue);
          }}
        />
        <span className="text-sm">{boolValue ? "Yes" : "No"}</span>
      </div>
    );
  }

  if (editor.type === "text" && editor.multiline) {
    return (
      <Textarea
        autoFocus
        rows={3}
        className="min-h-[60px] resize-none"
        value={
          typeof value === "string"
            ? value
            : value === undefined || value === null
              ? ""
              : String(value)
        }
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onCommit()}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (e.key === "Enter" && e.metaKey) {
            e.preventDefault();
            onCommit();
          }
        }}
      />
    );
  }

  return (
    <Input
      type="text"
      autoFocus
      className="h-8"
      value={
        typeof value === "string"
          ? value
          : value === undefined || value === null
            ? ""
            : String(value)
      }
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onCommit()}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        handleKeyDown(e);
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit();
        }
      }}
    />
  );
});

export const DataTable29 = ({ className }: { className?: string }) => {
  const [data, setData] = React.useState<Order[]>([]);
  const initialDataRef = React.useRef<Order[]>([]);
  const contextMenuRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const replaceData = React.useCallback((rows: Order[]) => {
    setData(rows);
    initialDataRef.current = rows;
  }, []);

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
          replaceData(parsed);
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
  }, [replaceData]);

  const handleUpdateCells = React.useCallback(
    (updates: Array<{ rowId: string; columnId: string; value: unknown }>) => {
      setData((previous) => {
        const updateMap = updates.reduce((acc, update) => {
          const existing = acc.get(update.rowId) ?? [];
          existing.push(update);
          acc.set(update.rowId, existing);
          return acc;
        }, new Map<string, Array<{ columnId: string; value: unknown }>>());

        return previous.map((row) => {
          const rowUpdates = updateMap.get(row.id);
          if (!rowUpdates || rowUpdates.length === 0) return row;
          const nextRow: Order = { ...row };
          rowUpdates.forEach(({ columnId, value }) => {
            (nextRow as Record<string, unknown>)[columnId] = value;
          });
          return nextRow;
        });
      });
    },
    [],
  );

  const {
    table,
    tableContainerRef,
    rowVirtualizer,
    editingCell,
    editingValue,
    setEditingValue,
    handleCellDoubleClick,
    commitEditing,
    cancelEditing,
    handleCellContextMenu,
    contextMenu,
    closeContextMenu,
    copyCellToClipboard,
  } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
    initialColumnPinning: { left: ["select"], right: ["actions"] },
    onUpdateCells: handleUpdateCells,
  });

  const handleResetCell = React.useCallback(
    (cell: CellPosition) => {
      const originalRow = initialDataRef.current.find(
        (row) => row.id === cell.rowId,
      );
      if (!originalRow) return;
      const nextValue = (originalRow as Record<string, unknown>)[cell.columnId];
      handleUpdateCells([
        {
          rowId: cell.rowId,
          columnId: cell.columnId,
          value: nextValue,
        },
      ]);
    },
    [handleUpdateCells],
  );

  const handleContextMenuGlobalEvents = React.useCallback(
    (event: Event) => {
      if (event.type === "mousedown") {
        const target = event.target as Node | null;
        if (target && contextMenuRef.current?.contains(target)) {
          return;
        }
      }
      closeContextMenu();
    },
    [closeContextMenu],
  );

  React.useEffect(() => {
    if (!contextMenu.open) return;

    window.addEventListener("mousedown", handleContextMenuGlobalEvents);
    window.addEventListener("resize", handleContextMenuGlobalEvents);
    window.addEventListener("scroll", handleContextMenuGlobalEvents, true);

    return () => {
      window.removeEventListener("mousedown", handleContextMenuGlobalEvents);
      window.removeEventListener("resize", handleContextMenuGlobalEvents);
      window.removeEventListener("scroll", handleContextMenuGlobalEvents, true);
    };
  }, [contextMenu.open, handleContextMenuGlobalEvents]);

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
              Virtualized Data Table With Cell Editing
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              This data table supports inline cell editing. Double-click any
              cell to edit its value. Right-click for copy and clear actions.
              Press Escape to cancel editing, Enter to save.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border">
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
                          (header.column.columnDef
                            .meta as DataTableColumnMeta) ?? {};
                        const columnWithPinning =
                          header.column as unknown as ColumnWithPinning;
                        const {
                          style: columnStyle,
                          pinned,
                          lastPinned,
                        } = getColumnStyles(meta, columnWithPinning);

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
                            style={columnStyle}
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
                                  .meta as DataTableColumnMeta) ?? {};
                              const columnWithPinning =
                                cell.column as unknown as ColumnWithPinning;
                              const {
                                style: columnStyle,
                                pinned,
                                lastPinned,
                              } = getColumnStyles(meta, columnWithPinning);

                              const editor = meta.editor;
                              const isEditingCell =
                                editingCell?.rowId === row.id &&
                                editingCell?.columnId === cell.column.id &&
                                Boolean(editor);

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
                                  style={columnStyle}
                                  className={cn(
                                    "border-r p-3 py-2 text-sm last:border-r-0 data-[pinned]:bg-background/90 data-[pinned]:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                                    cell.column.id ===
                                      rightStickyDividerTargetId &&
                                      "!border-r-0",
                                    meta.className,
                                    meta.cellClassName,
                                    alignClass,
                                    isEditingCell
                                      ? "overflow-visible"
                                      : "truncate",
                                  )}
                                  data-pinned={pinned || undefined}
                                  data-last-col={lastPinned || undefined}
                                  onDoubleClick={() =>
                                    handleCellDoubleClick(
                                      row.id,
                                      cell.column.id,
                                    )
                                  }
                                  onContextMenu={(event) =>
                                    handleCellContextMenu(
                                      row.id,
                                      cell.column.id,
                                      event,
                                    )
                                  }
                                >
                                  {isEditingCell && editor ? (
                                    <CellEditor
                                      editor={editor}
                                      value={editingValue}
                                      onChange={setEditingValue}
                                      onCommit={commitEditing}
                                      onCancel={cancelEditing}
                                    />
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
              </table>
            </div>
          </div>
        </div>
      </div>
      {contextMenu.open && contextMenu.cell ? (
        <div
          className="fixed z-50 min-w-[180px] animate-in overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md fade-in-0 zoom-in-95"
          ref={contextMenuRef}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            onClick={async () => {
              await copyCellToClipboard(contextMenu.cell!);
              closeContextMenu();
            }}
          >
            <Copy className="size-4" />
            Copy cell value
          </button>
          <button
            className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            onClick={() => {
              handleResetCell(contextMenu.cell!);
              closeContextMenu();
            }}
          >
            <RefreshCcw className="size-4" />
            Reset cell value
          </button>
        </div>
      ) : null}
    </section>
  );
};
