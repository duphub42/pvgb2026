"use client";

import type { ColumnDef, Row, SortingState } from "@tanstack/react-table";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ColumnMeta = {
  cellClassName?: string;
};

type Transaction = {
  id: number;
  invoiceNumber: string;
  href: string;
  amount: string;
  tax?: string;
  client: string;
  description: string;
};

type DayGroup = {
  date: string;
  dateTime: string;
  transactions: Transaction[];
};

const days: DayGroup[] = [
  {
    date: "Today",
    dateTime: "2024-05-20",
    transactions: [
      {
        id: 101,
        invoiceNumber: "ORD-48392",
        href: "/orders/ORD-48392",
        amount: "$1,248.50 USD",
        tax: "$98.50",
        client: "Aurora Living",
        description: "3x Linen Sheet Set + gift wrap",
      },
      {
        id: 102,
        invoiceNumber: "PAYOUT-2298",
        href: "/payouts/PAYOUT-2298",
        amount: "$4,830.00 USD",
        client: "Wild Trails Marketplace",
        description: "Weekly seller payout",
      },
      {
        id: 103,
        invoiceNumber: "ORD-48310",
        href: "/orders/ORD-48310",
        amount: "$312.00 USD",
        tax: "$23.80",
        client: "Nyla Greene",
        description: "Chargeback under review",
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2024-05-19",
    transactions: [
      {
        id: 104,
        invoiceNumber: "ORD-48277",
        href: "/orders/ORD-48277",
        amount: "$2,940.00 USD",
        tax: "$201.30",
        client: "Urban Trek Co.",
        description: "12x Carbon Trekking Poles",
      },
      {
        id: 105,
        invoiceNumber: "ORD-48261",
        href: "/orders/ORD-48261",
        amount: "$864.00 USD",
        client: "Maya Patel",
        description: "Limited edition sneaker preorder",
      },
      {
        id: 106,
        invoiceNumber: "PAYOUT-2297",
        href: "/payouts/PAYOUT-2297",
        amount: "$1,980.00 USD",
        client: "Lumen Home Goods",
        description: "Express payout request",
      },
    ],
  },
  {
    date: "Sunday",
    dateTime: "2024-05-18",
    transactions: [
      {
        id: 107,
        invoiceNumber: "ORD-48190",
        href: "/orders/ORD-48190",
        amount: "$490.00 USD",
        tax: "$34.30",
        client: "Atlas Supply",
        description: "B2B sample order",
      },
      {
        id: 108,
        invoiceNumber: "ORD-48175",
        href: "/orders/ORD-48175",
        amount: "$156.00 USD",
        client: "Jamie Lee",
        description: "Split payment missed",
      },
    ],
  },
];

type FlatTransaction = Transaction & { dayDate: string; dayDateTime: string };

function flattenDays(src: DayGroup[]): FlatTransaction[] {
  const out: FlatTransaction[] = [];
  for (const d of src) {
    for (const t of d.transactions) {
      out.push({ ...t, dayDate: d.date, dayDateTime: d.dateTime });
    }
  }
  return out;
}

export function DataTable24({ className }: { className?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useMemo(() => flattenDays(days), []);

  const columns = React.useMemo<ColumnDef<FlatTransaction>[]>(
    () => [
      {
        id: "invoice",
        header: "Invoice",
        cell: ({ row }) => {
          const t = row.original;
          return (
            <div className="flex flex-col gap-1">
              <a href={t.href} className="text-sm font-semibold">
                {t.invoiceNumber}
              </a>
            </div>
          );
        },
        meta: {
          cellClassName: "py-5 pr-6",
        },
      },
      {
        id: "amount-status",
        header: "Amount",
        cell: ({ row }) => {
          const t = row.original;
          return (
            <>
              <div className="flex gap-x-6">
                <div className="flex-auto">
                  <div className="flex items-start gap-x-3">
                    <div className="text-sm/6 font-medium text-foreground">
                      {t.amount}
                    </div>
                    {t.tax ? (
                      <div className="mt-1 text-xs/5 text-muted-foreground">
                        + {t.tax} tax
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="absolute right-full bottom-0 h-px w-screen bg-border" />
              <div className="absolute bottom-0 left-0 h-px w-screen bg-border" />
            </>
          );
        },
        meta: {
          cellClassName: "relative py-5 pr-6",
        },
      },
      {
        id: "client-desc",
        header: "Client",
        cell: ({ row }) => {
          const t = row.original;
          return (
            <>
              <div className="text-sm/6 text-foreground">{t.client}</div>
            </>
          );
        },
        meta: {
          cellClassName: "hidden py-5 pr-6 sm:table-cell",
        },
      },
      {
        id: "description",
        header: "Description",
        cell: ({ row }) => {
          const t = row.original;
          return <div className="text-sm text-foreground">{t.description}</div>;
        },
        meta: {
          cellClassName: "py-5 pr-6",
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (r) => String(r.id),
  });

  const rowModelRows = table.getRowModel().rows;

  const grouped = React.useMemo(() => {
    const byDay = new Map<
      string,
      { date: string; dateTime: string; rows: Row<FlatTransaction>[] }
    >();
    for (const r of rowModelRows) {
      const key = r.original.dayDateTime;
      if (!byDay.has(key)) {
        byDay.set(key, {
          date: r.original.dayDate,
          dateTime: r.original.dayDateTime,
          rows: [],
        });
      }
      byDay.get(key)!.rows.push(r);
    }
    return days.map((d) => byDay.get(d.dateTime)).filter(Boolean) as Array<{
      date: string;
      dateTime: string;
      rows: Row<FlatTransaction>[];
    }>;
  }, [rowModelRows]);

  const columnCount = columns.length;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data table with hidden headings
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with hidden headings and grouped rows perfect for
              separating different tables rows within the table
            </p>
          </div>

          <div className="overflow-hidden border-t border-border">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="[&>div]:overflow-visible">
                <Table className="w-full text-left text-sm">
                  <TableHeader className="sr-only [&_*]:border-0 [&_tr]:border-0">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="border-0">
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            scope="col"
                            className="p-0 text-left"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>

                  <TableBody>
                    {grouped.map((group) => (
                      <React.Fragment key={group.dateTime}>
                        <TableRow className="text-sm/6 text-foreground">
                          <TableHead
                            scope="colgroup"
                            colSpan={columnCount}
                            className="relative isolate border-0 py-2 text-left font-semibold text-foreground"
                          >
                            <time dateTime={group.dateTime}>{group.date}</time>
                            <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-border bg-muted" />
                            <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-border bg-muted" />
                          </TableHead>
                        </TableRow>

                        {group.rows.map((row) => (
                          <TableRow key={row.id} className="border-0">
                            {row.getVisibleCells().map((cell) => {
                              const meta =
                                (cell.column.columnDef.meta as ColumnMeta) ??
                                {};
                              return (
                                <TableCell
                                  key={cell.id}
                                  className={cn(
                                    "border-0 p-0 text-left align-top",
                                    meta.cellClassName,
                                  )}
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
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
