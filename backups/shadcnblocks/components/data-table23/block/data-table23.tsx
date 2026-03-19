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

type Person = {
  name: string;
  title: string;
  email: string;
  role: string;
};

type EmploymentGroup = {
  type: string;
  people: Person[];
};

type FlattenedPerson = Person & {
  employmentType: string;
};

type ColumnMeta = {
  headerClassName?: string;
  cellClassName?: string;
};

const employmentGroups: EmploymentGroup[] = [
  {
    type: "Full-time",
    people: [
      {
        name: "Amelia Hawkins",
        title: "Lead Product Manager",
        email: "amelia.hawkins@example.com",
        role: "Owner",
      },
      {
        name: "Elias Patel",
        title: "Software Architect",
        email: "elias.patel@example.com",
        role: "Admin",
      },
      {
        name: "Morgan Reed",
        title: "Customer Success Lead",
        email: "morgan.reed@example.com",
        role: "Member",
      },
    ],
  },
  {
    type: "Contract",
    people: [
      {
        name: "Isla Bennett",
        title: "Brand Strategist",
        email: "isla.bennett@example.com",
        role: "Admin",
      },
      {
        name: "Noah Kim",
        title: "Security Consultant",
        email: "noah.kim@example.com",
        role: "Member",
      },
    ],
  },
  {
    type: "Internship",
    people: [
      {
        name: "Priya Sharma",
        title: "Product Design Intern",
        email: "priya.sharma@example.com",
        role: "Intern",
      },
      {
        name: "Caleb Brooks",
        title: "Marketing Intern",
        email: "caleb.brooks@example.com",
        role: "Intern",
      },
    ],
  },
  {
    type: "Part-time",
    people: [
      {
        name: "Sofia Alvarez",
        title: "Technical Writer",
        email: "sofia.alvarez@example.com",
        role: "Member",
      },
    ],
  },
];

export function DataTable23({ className }: { className?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const flatData = React.useMemo(() => {
    const result: FlattenedPerson[] = [];

    employmentGroups.forEach((group) => {
      group.people.forEach((person) =>
        result.push({
          ...person,
          employmentType: group.type,
        }),
      );
    });

    return result;
  }, []);

  const columns = React.useMemo<ColumnDef<FlattenedPerson>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="text-sm font-semibold text-foreground">
            {row.original.name}
          </div>
        ),
        meta: {
          headerClassName: "pl-6 pr-3 text-left text-sm sm:pl-4",
          cellClassName: "py-4 pl-6 pr-3 text-left sm:pl-4",
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.title}
          </span>
        ),
        meta: {
          headerClassName: "px-3 text-left text-sm",
          cellClassName: "px-3 py-4",
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.email}
          </span>
        ),
        meta: {
          headerClassName: "px-3 text-left text-sm",
          cellClassName: "px-3 py-4",
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.role}
          </span>
        ),
        meta: {
          headerClassName: "px-3 text-left text-sm",
          cellClassName: "px-3 py-4",
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.email,
  });

  const rowModelRows = table.getRowModel().rows;

  const groupedRows = React.useMemo(() => {
    if (!rowModelRows.length) {
      return [];
    }

    const groups: Array<{
      employmentType: string;
      rows: Row<FlattenedPerson>[];
    }> = [];

    let currentEmploymentType = "";
    let currentGroup: Row<FlattenedPerson>[] = [];

    rowModelRows.forEach((row) => {
      if (row.original.employmentType !== currentEmploymentType) {
        if (currentGroup.length > 0) {
          groups.push({
            employmentType: currentEmploymentType,
            rows: currentGroup,
          });
        }
        currentEmploymentType = row.original.employmentType;
        currentGroup = [row];
      } else {
        currentGroup.push(row);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({
        employmentType: currentEmploymentType,
        rows: currentGroup,
      });
    }

    return groups;
  }, [rowModelRows]);

  const columnCount = columns.length;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data table with grouped rows
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with grouped rows for separating different tables
              rows within the table
            </p>
          </div>

          <div className="rounded-md bg-background">
            <Table>
              <TableHeader className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta as
                        | ColumnMeta
                        | undefined;

                      return (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "py-3.5 text-left text-sm font-semibold text-muted-foreground",
                            meta?.headerClassName,
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
                {groupedRows.length ? (
                  groupedRows.map((group) => (
                    <React.Fragment key={group.employmentType}>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell
                          colSpan={columnCount}
                          className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                        >
                          {group.employmentType}
                        </TableCell>
                      </TableRow>
                      {group.rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => {
                            const meta =
                              (cell.column.columnDef.meta as ColumnMeta) ?? {};

                            return (
                              <TableCell
                                key={cell.id}
                                className={cn(
                                  "align-middle text-sm text-muted-foreground",
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columnCount}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
