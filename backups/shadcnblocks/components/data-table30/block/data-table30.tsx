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
  Search,
  X,
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
import { Input } from "@/components/ui/input";
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
const SEARCH_SHORTCUT_KEY = "k";
const DATA_URL =
  "https://raw.githubusercontent.com/zerostaticthemes/shadcnblocks-library-data/refs/heads/main/data/orders-ecommerce-1000.json";

type CellMatch = {
  rowIndex: number;
  columnId: string;
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
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchMatches, setSearchMatches] = React.useState<CellMatch[]>([]);
  const [matchIndex, setMatchIndex] = React.useState(-1);
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

  const tableState = table.getState();
  const tableSorting = tableState.sorting;
  const tableColumnFilters = tableState.columnFilters;
  const tableColumnVisibility = tableState.columnVisibility;

  const searchMatchKey = React.useCallback(
    (rowIndex: number, columnId: string) => `${rowIndex}::${columnId}`,
    [],
  );

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchMatches([]);
      setMatchIndex(-1);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const rows = table.getRowModel().rows;
    const matches: CellMatch[] = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      if (!row) continue;

      const cells = row.getVisibleCells();
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const value = cell.getValue();
        const stringValue =
          value === undefined || value === null ? "" : String(value);

        if (stringValue.toLowerCase().includes(lowerQuery)) {
          matches.push({ rowIndex, columnId: cell.column.id });
        }
      }
    }

    setSearchMatches(matches);
    setMatchIndex(matches.length > 0 ? 0 : -1);

    if (matches.length > 0) {
      const firstMatch = matches[0];
      requestAnimationFrame(() => {
        rowVirtualizer.scrollToIndex(firstMatch.rowIndex, {
          align: "center",
        });
      });
    }
  }, [
    searchQuery,
    table,
    rowVirtualizer,
    data,
    tableSorting,
    tableColumnFilters,
    tableColumnVisibility,
  ]);

  const openSearch = React.useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeSearch = React.useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchMatches([]);
    setMatchIndex(-1);
  }, []);

  const goToMatch = React.useCallback(
    (targetIndex: number) => {
      const match = searchMatches[targetIndex];
      if (!match) return;

      setMatchIndex(targetIndex);
      rowVirtualizer.scrollToIndex(match.rowIndex, { align: "center" });
    },
    [rowVirtualizer, searchMatches],
  );

  const goToNextMatch = React.useCallback(() => {
    if (searchMatches.length === 0) return;
    const nextIndex = (matchIndex + 1) % searchMatches.length;
    goToMatch(nextIndex);
  }, [goToMatch, matchIndex, searchMatches.length]);

  const goToPrevMatch = React.useCallback(() => {
    if (searchMatches.length === 0) return;
    const prevIndex =
      matchIndex - 1 < 0 ? searchMatches.length - 1 : matchIndex - 1;
    goToMatch(prevIndex);
  }, [goToMatch, matchIndex, searchMatches.length]);

  const searchMatchSet = React.useMemo(() => {
    const set = new Set<string>();
    for (const match of searchMatches) {
      set.add(searchMatchKey(match.rowIndex, match.columnId));
    }
    return set;
  }, [searchMatches, searchMatchKey]);

  const activeMatchKey = React.useMemo(() => {
    if (matchIndex < 0 || !searchMatches[matchIndex]) return null;
    const match = searchMatches[matchIndex];
    return searchMatchKey(match.rowIndex, match.columnId);
  }, [matchIndex, searchMatches, searchMatchKey]);

  const isSearchMatch = React.useCallback(
    (rowIndex: number, columnId: string) =>
      searchMatchSet.has(searchMatchKey(rowIndex, columnId)),
    [searchMatchKey, searchMatchSet],
  );

  const isActiveSearchMatch = React.useCallback(
    (rowIndex: number, columnId: string) =>
      activeMatchKey === searchMatchKey(rowIndex, columnId),
    [activeMatchKey, searchMatchKey],
  );

  const updateSearchQuery = React.useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isCmdOrCtrl = ctrlKey || metaKey;
      const isSearchShortcut =
        isCmdOrCtrl && key.toLowerCase() === SEARCH_SHORTCUT_KEY;
      const target = event.target as HTMLElement | null;
      const container = tableContainerRef.current;
      const isInsideTable = container?.contains(target) ?? false;
      const isInsideSearch =
        target?.closest("[data-table-search-overlay]") !== null;
      const isInputLike =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isSearchShortcut) {
        if (isInsideTable || isInsideSearch || !isInputLike) {
          event.preventDefault();
          openSearch();
        }
        return;
      }

      if (!searchOpen) return;

      if (key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (key === "Enter") {
        const isWithinSearchContext = isInsideSearch || isInsideTable;
        if (!isWithinSearchContext) return;
        event.preventDefault();
        if (shiftKey) {
          goToPrevMatch();
        } else {
          goToNextMatch();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [
    closeSearch,
    goToNextMatch,
    goToPrevMatch,
    openSearch,
    searchOpen,
    tableContainerRef,
  ]);

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
    searchOpen,
    searchQuery,
    searchMatches,
    matchIndex,
    openSearch,
    closeSearch,
    goToNextMatch,
    goToPrevMatch,
    updateSearchQuery,
    isSearchMatch,
    isActiveSearchMatch,
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

type SearchOverlayProps = {
  searchOpen: boolean;
  searchQuery: string;
  matchIndex: number;
  totalMatches: number;
  onSearchQueryChange: (value: string) => void;
  onClose: () => void;
  onNextMatch: () => void;
  onPrevMatch: () => void;
  className?: string;
};

const SearchOverlay = ({
  searchOpen,
  searchQuery,
  matchIndex,
  totalMatches,
  onSearchQueryChange,
  onClose,
  onNextMatch,
  onPrevMatch,
  className,
}: SearchOverlayProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasMatches = totalMatches > 0;

  React.useEffect(() => {
    if (searchOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  return (
    <div
      data-table-search-overlay
      className={cn(
        "absolute z-30 flex items-center gap-3 rounded-md border border-border bg-background/95 px-3 py-2 text-foreground shadow-lg backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search table"
          className="h-8 w-52"
          role="searchbox"
        />
        <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
          {hasMatches ? `${matchIndex + 1} / ${totalMatches}` : "0 / 0"}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onPrevMatch}
          disabled={!hasMatches}
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Previous match</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onNextMatch}
          disabled={!hasMatches}
        >
          <ArrowDown className="h-4 w-4" />
          <span className="sr-only">Next match</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close search</span>
        </Button>
      </div>
    </div>
  );
};

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

export const DataTable30 = ({ className }: { className?: string }) => {
  const [data, setData] = React.useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const openSearchRef = React.useRef<(() => void) | null>(null);
  const columnsWithSearch: ColumnDef<Order, unknown>[] = React.useMemo(
    () =>
      columns.map(
        (column): ColumnDef<Order, unknown> =>
          column.id === "actions"
            ? {
                ...column,
                id: column.id ?? "actions",
                header: () => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mx-auto size-8"
                    onClick={() => openSearchRef.current?.()}
                    aria-label="Open table search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                ),
              }
            : column,
      ),
    [],
  );

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

  const {
    table,
    tableContainerRef,
    rowVirtualizer,
    searchOpen,
    searchQuery,
    searchMatches,
    matchIndex,
    updateSearchQuery,
    closeSearch,
    goToNextMatch,
    goToPrevMatch,
    isSearchMatch,
    isActiveSearchMatch,
    openSearch,
  } = useDataTable({
    data,
    columns: columnsWithSearch,
    getRowId: (row) => row.id.toString(),
    initialColumnPinning: { left: ["select"], right: ["actions"] },
  });
  React.useEffect(() => {
    openSearchRef.current = openSearch;
  }, [openSearch]);
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
  const totalMatches = searchMatches.length;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Virtualised Data Table with Search
            </h2>
            <p className="mt-2 text-muted-foreground">
              Use Cmd/Ctrl + K or search icon search with highlights, Use Enter
              or Shift+Enter to jump through results
            </p>
          </div>
          <div className="relative overflow-visible rounded-lg border-2">
            <SearchOverlay
              searchOpen={searchOpen}
              searchQuery={searchQuery}
              matchIndex={matchIndex}
              totalMatches={totalMatches}
              onSearchQueryChange={updateSearchQuery}
              onClose={closeSearch}
              onNextMatch={goToNextMatch}
              onPrevMatch={goToPrevMatch}
              className="-top-3 right-3 -translate-y-full"
            />
            <div
              ref={tableContainerRef}
              className="relative max-h-[600px] overflow-auto"
              tabIndex={0}
            >
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

                              const isMatch = isSearchMatch(
                                virtualRow.index,
                                cell.column.id,
                              );
                              const isActiveMatch = isActiveSearchMatch(
                                virtualRow.index,
                                cell.column.id,
                              );
                              const highlightClass = isActiveMatch
                                ? "bg-amber-200/90 text-foreground dark:bg-amber-300/30"
                                : isMatch
                                  ? "bg-amber-100/80 text-foreground dark:bg-amber-200/20"
                                  : undefined;

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
                                  data-search-match={isMatch || undefined}
                                  data-search-active={
                                    isActiveMatch || undefined
                                  }
                                >
                                  <div
                                    className={cn(
                                      "inline-flex max-w-full min-w-0 items-center gap-1 rounded px-1 py-0.5 transition-colors",
                                      highlightClass,
                                    )}
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </div>
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
