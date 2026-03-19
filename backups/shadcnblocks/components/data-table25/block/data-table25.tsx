"use client";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type LineItem = {
  id: number;
  sku: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
};

type LineItemColumnMeta = {
  headerClassName?: string;
  cellClassName?: string;
};

const lineItems: LineItem[] = [
  {
    id: 1,
    sku: "RBK-32-MN",
    name: "Ridgeway Backpack",
    description: "Midnight Navy · 32L capacity",
    quantity: 2,
    unitPrice: "$145.00",
    total: "$290.00",
  },
  {
    id: 2,
    sku: "EVB-20-SL",
    name: "Everyday Bottle 20oz",
    description: "Slate · triple-wall stainless",
    quantity: 3,
    unitPrice: "$28.00",
    total: "$84.00",
  },
  {
    id: 3,
    sku: "DBH-FT-NV",
    name: "Daybreak Fleece Hoodie",
    description: "French terry · Nightfall",
    quantity: 1,
    unitPrice: "$95.00",
    total: "$95.00",
  },
  {
    id: 4,
    sku: "TRV-ORG-SET",
    name: "Travel Organizer Set",
    description: "Mesh packing cubes · 4 pack",
    quantity: 1,
    unitPrice: "$72.00",
    total: "$72.00",
  },
  {
    id: 5,
    sku: "EXP-90-OLV",
    name: "Expedition Duffel 90L",
    description: "Weatherproof ripstop · Olive",
    quantity: 1,
    unitPrice: "$260.00",
    total: "$260.00",
  },
];

export function DataTable25({ className }: { className?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<LineItem>[]>(
    () => [
      {
        id: "product",
        header: "Product",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="text-sm">
              <div className="font-medium text-foreground">{item.name}</div>
              <div className="mt-1 truncate text-muted-foreground">
                {item.description}
              </div>
              <div className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                SKU: {item.sku}
              </div>
            </div>
          );
        },
        meta: {
          headerClassName:
            "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-0 h-auto",
          cellClassName:
            "max-w-0 py-5 pl-4 pr-3 align-top text-sm sm:pl-0 text-foreground",
        },
      },
      {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => row.original.quantity,
        meta: {
          headerClassName:
            "hidden px-3 py-3.5 text-right text-sm font-semibold text-foreground sm:table-cell",
          cellClassName:
            "hidden px-3 py-5 text-right text-sm text-muted-foreground sm:table-cell",
        },
      },
      {
        accessorKey: "unitPrice",
        header: "Unit price",
        cell: ({ row }) => row.original.unitPrice,
        meta: {
          headerClassName:
            "hidden px-3 py-3.5 text-right text-sm font-semibold text-foreground sm:table-cell",
          cellClassName:
            "hidden px-3 py-5 text-right text-sm text-muted-foreground sm:table-cell",
        },
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => row.original.total,
        meta: {
          headerClassName:
            "py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-foreground sm:pr-0 h-auto",
          cellClassName:
            "py-5 pl-3 pr-4 text-right text-sm text-muted-foreground sm:pr-0",
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: lineItems,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => String(row.id),
  });

  const subtotal = "$801.00";
  const tax = "$64.08";
  const total = "$865.08";

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data table with summary rows
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with summary rows perfect for dispalying invoices
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>

            <TableHeader className="text-foreground [&_tr]:border-border/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-0 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    const meta =
                      (header.column.columnDef.meta as LineItemColumnMeta) ??
                      {};
                    return (
                      <TableHead
                        key={header.id}
                        scope="col"
                        className={cn(
                          "h-auto bg-transparent text-sm font-semibold",
                          meta.headerClassName,
                        )}
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
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-border/60 hover:bg-transparent"
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta =
                      (cell.column.columnDef.meta as LineItemColumnMeta) ?? {};
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(meta.cellClassName)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="!border-0 !bg-transparent !font-normal">
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead
                  scope="row"
                  colSpan={3}
                  className="hidden h-auto border-0 pt-6 pr-3 pl-4 text-right text-sm font-normal text-muted-foreground sm:table-cell sm:pl-0"
                >
                  Subtotal
                </TableHead>
                <TableHead
                  scope="row"
                  className="h-auto border-0 pt-6 pr-3 pl-4 text-left text-sm font-normal text-muted-foreground sm:hidden"
                >
                  Subtotal
                </TableHead>
                <TableCell className="border-0 pt-6 pr-4 pl-3 text-right text-sm text-muted-foreground sm:pr-0">
                  {subtotal}
                </TableCell>
              </TableRow>

              <TableRow className="border-0 hover:bg-transparent">
                <TableHead
                  scope="row"
                  colSpan={3}
                  className="hidden h-auto border-0 pt-4 pr-3 pl-4 text-right text-sm font-normal text-muted-foreground sm:table-cell sm:pl-0"
                >
                  Tax
                </TableHead>
                <TableHead
                  scope="row"
                  className="h-auto border-0 pt-4 pr-3 pl-4 text-left text-sm font-normal text-muted-foreground sm:hidden"
                >
                  Tax
                </TableHead>
                <TableCell className="border-0 pt-4 pr-4 pl-3 text-right text-sm text-muted-foreground sm:pr-0">
                  {tax}
                </TableCell>
              </TableRow>

              <TableRow className="border-0 hover:bg-transparent">
                <TableHead
                  scope="row"
                  colSpan={3}
                  className="hidden h-auto border-0 pt-4 pr-3 pl-4 text-right text-sm font-semibold text-foreground sm:table-cell sm:pl-0"
                >
                  Total
                </TableHead>
                <TableHead
                  scope="row"
                  className="h-auto border-0 pt-4 pr-3 pl-4 text-left text-sm font-semibold text-foreground sm:hidden"
                >
                  Total
                </TableHead>
                <TableCell className="border-0 pt-4 pr-4 pl-3 text-right text-sm font-semibold text-foreground sm:pr-0">
                  {total}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  );
}
