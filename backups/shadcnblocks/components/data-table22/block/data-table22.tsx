"use client";

import type {
  Column,
  ColumnDef,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  ChevronsUpDown,
  Clock,
  LoaderIcon,
  MoreHorizontal,
  SquareMinusIcon,
  SquarePlusIcon,
  Truck,
  XCircle,
} from "lucide-react";
import * as React from "react";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type UseDataTableOptions<TData> = {
  data: Array<TData>;
  columns: Array<ColumnDef<TData, unknown>>;
  getRowId?: (row: TData) => string;
  initialSorting?: SortingState;
  initialGlobalFilter?: string;
  initialSelection?: RowSelectionState;
  enableRowSelection?: boolean;
};

export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    data,
    columns,
    getRowId,
    initialSorting = [],
    initialGlobalFilter = "",
    initialSelection = {},
    enableRowSelection = true,
  } = options;

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const [globalFilter, setGlobalFilter] =
    React.useState<string>(initialGlobalFilter);

  const [rowSelection, setRowSelection] =
    React.useState<RowSelectionState>(initialSelection);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection,
  });

  return {
    table,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
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
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(
              String(itemRecord[idField] || itemRecord.id),
            )
          }
        >
          Copy {itemName} ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit {itemName}</DropdownMenuItem>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type StatusVariant = "info" | "primary" | "success" | "warning" | "destructive";

const OrderItemSchema = z.object({
  id: z.string(),
  productName: z.string(),
  category: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const OrderStatusSchema = z.object({
  label: z.string(),
  variant: z.enum(["info", "primary", "success", "warning", "destructive"]),
});

export const CustomerRecordSchema = z.object({
  id: z.string(),
  latestOrder: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
  total: z.number(),
  totalItems: z.number(),
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema),
});

type CustomerRecord = z.infer<typeof CustomerRecordSchema>;
type OrderItem = z.infer<typeof OrderItemSchema>;

type RawOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  customerAvatar: string;
  total: string;
  status: {
    label: string;
    variant: StatusVariant;
  };
  items: Array<{
    id: string;
    productName: string;
    category: string;
    price: string;
    quantity: number;
  }>;
};

const rawOrders: RawOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2401",
    customer: "Marcus Chen",
    customerEmail: "marcus.chen@email.com",
    customerAvatar: "1.png",
    total: "$384.92",
    status: {
      label: "Processing",
      variant: "info",
    },
    items: [
      {
        id: "1-1",
        productName: "USB-C Hub",
        category: "Electronics",
        price: "$49.99",
        quantity: 1,
      },
      {
        id: "1-2",
        productName: "Laptop Bag",
        category: "Accessories",
        price: "$79.99",
        quantity: 1,
      },
      {
        id: "1-3",
        productName: "Portable SSD",
        category: "Electronics",
        price: "$129.99",
        quantity: 1,
      },
      {
        id: "1-4",
        productName: "Cable Sleeve",
        category: "Accessories",
        price: "$14.99",
        quantity: 2,
      },
      {
        id: "1-5",
        productName: "Webcam Cover",
        category: "Accessories",
        price: "$9.99",
        quantity: 3,
      },
      {
        id: "1-6",
        productName: "Laptop Stand",
        category: "Office",
        price: "$54.99",
        quantity: 1,
      },
      {
        id: "1-7",
        productName: "USB Cable Pack",
        category: "Electronics",
        price: "$19.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2402",
    customer: "Nina Patel",
    customerEmail: "nina.patel@email.com",
    customerAvatar: "2.png",
    total: "$567.45",
    status: {
      label: "Shipped",
      variant: "primary",
    },
    items: [
      {
        id: "2-1",
        productName: "Air Purifier",
        category: "Home",
        price: "$189.99",
        quantity: 1,
      },
      {
        id: "2-2",
        productName: "Essential Oil Set",
        category: "Home",
        price: "$44.99",
        quantity: 1,
      },
      {
        id: "2-3",
        productName: "Humidifier",
        category: "Home",
        price: "$69.99",
        quantity: 1,
      },
      {
        id: "2-4",
        productName: "Room Spray",
        category: "Home",
        price: "$24.99",
        quantity: 2,
      },
      {
        id: "2-5",
        productName: "Aromatherapy Diffuser",
        category: "Home",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "2-6",
        productName: "Scented Candles",
        category: "Home",
        price: "$34.99",
        quantity: 3,
      },
      {
        id: "2-7",
        productName: "Pillow Spray",
        category: "Home",
        price: "$16.99",
        quantity: 1,
      },
      {
        id: "2-8",
        productName: "Room Thermometer",
        category: "Home",
        price: "$19.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2403",
    customer: "Oliver Martinez",
    customerEmail: "oliver.martinez@email.com",
    customerAvatar: "3.png",
    total: "$892.34",
    status: {
      label: "Delivered",
      variant: "success",
    },
    items: [
      {
        id: "3-1",
        productName: "Digital Camera",
        category: "Electronics",
        price: "$449.99",
        quantity: 1,
      },
      {
        id: "3-2",
        productName: "Camera Bag",
        category: "Accessories",
        price: "$89.99",
        quantity: 1,
      },
      {
        id: "3-3",
        productName: "Memory Card 128GB",
        category: "Electronics",
        price: "$34.99",
        quantity: 2,
      },
      {
        id: "3-4",
        productName: "Tripod",
        category: "Accessories",
        price: "$79.99",
        quantity: 1,
      },
      {
        id: "3-5",
        productName: "Camera Lens",
        category: "Electronics",
        price: "$199.99",
        quantity: 1,
      },
      {
        id: "3-6",
        productName: "Lens Cleaning Kit",
        category: "Accessories",
        price: "$12.99",
        quantity: 1,
      },
      {
        id: "3-7",
        productName: "Extra Battery",
        category: "Electronics",
        price: "$44.99",
        quantity: 2,
      },
      {
        id: "3-8",
        productName: "Camera Strap",
        category: "Accessories",
        price: "$24.99",
        quantity: 1,
      },
      {
        id: "3-9",
        productName: "Lens Filter",
        category: "Accessories",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "3-10",
        productName: "Remote Shutter",
        category: "Electronics",
        price: "$19.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2404",
    customer: "Sophia Kim",
    customerEmail: "sophia.kim@email.com",
    customerAvatar: "4.png",
    total: "$246.78",
    status: {
      label: "Pending",
      variant: "warning",
    },
    items: [
      {
        id: "4-1",
        productName: "Art Supplies Set",
        category: "Art",
        price: "$89.99",
        quantity: 1,
      },
      {
        id: "4-2",
        productName: "Sketchbook",
        category: "Art",
        price: "$24.99",
        quantity: 2,
      },
      {
        id: "4-3",
        productName: "Colored Pencils",
        category: "Art",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "4-4",
        productName: "Watercolor Set",
        category: "Art",
        price: "$44.99",
        quantity: 1,
      },
      {
        id: "4-5",
        productName: "Paint Brushes",
        category: "Art",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "4-6",
        productName: "Canvas Pack",
        category: "Art",
        price: "$34.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-2405",
    customer: "Jackson Wu",
    customerEmail: "jackson.wu@email.com",
    customerAvatar: "5.png",
    total: "$1,234.56",
    status: {
      label: "Processing",
      variant: "info",
    },
    items: [
      {
        id: "5-1",
        productName: "Electric Bike",
        category: "Sports",
        price: "$899.99",
        quantity: 1,
      },
      {
        id: "5-2",
        productName: "Bike Helmet",
        category: "Sports",
        price: "$79.99",
        quantity: 1,
      },
      {
        id: "5-3",
        productName: "Bike Lock",
        category: "Accessories",
        price: "$49.99",
        quantity: 1,
      },
      {
        id: "5-4",
        productName: "Bike Lights",
        category: "Accessories",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "5-5",
        productName: "Water Bottle Holder",
        category: "Accessories",
        price: "$14.99",
        quantity: 1,
      },
      {
        id: "5-6",
        productName: "Bike Phone Mount",
        category: "Accessories",
        price: "$24.99",
        quantity: 1,
      },
      {
        id: "5-7",
        productName: "Repair Kit",
        category: "Tools",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "5-8",
        productName: "Bike Pump",
        category: "Tools",
        price: "$34.99",
        quantity: 1,
      },
      {
        id: "5-9",
        productName: "Bike Bell",
        category: "Accessories",
        price: "$9.99",
        quantity: 1,
      },
      {
        id: "5-10",
        productName: "Reflective Vest",
        category: "Clothing",
        price: "$19.99",
        quantity: 1,
      },
      {
        id: "5-11",
        productName: "Cycling Gloves",
        category: "Clothing",
        price: "$24.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "6",
    orderNumber: "ORD-2406",
    customer: "Emma Thompson",
    customerEmail: "emma.thompson@email.com",
    customerAvatar: "6.png",
    total: "$678.90",
    status: {
      label: "Shipped",
      variant: "primary",
    },
    items: [
      {
        id: "6-1",
        productName: "Robot Vacuum",
        category: "Home",
        price: "$299.99",
        quantity: 1,
      },
      {
        id: "6-2",
        productName: "Vacuum Filters",
        category: "Home",
        price: "$19.99",
        quantity: 3,
      },
      {
        id: "6-3",
        productName: "Cleaning Solution",
        category: "Home",
        price: "$24.99",
        quantity: 2,
      },
      {
        id: "6-4",
        productName: "Microfiber Cloths",
        category: "Home",
        price: "$14.99",
        quantity: 2,
      },
      {
        id: "6-5",
        productName: "Dustpan Set",
        category: "Home",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "6-6",
        productName: "Mop System",
        category: "Home",
        price: "$79.99",
        quantity: 1,
      },
      {
        id: "6-7",
        productName: "Broom",
        category: "Home",
        price: "$34.99",
        quantity: 1,
      },
      {
        id: "6-8",
        productName: "Trash Bags",
        category: "Home",
        price: "$19.99",
        quantity: 2,
      },
      {
        id: "6-9",
        productName: "Gloves Pack",
        category: "Home",
        price: "$12.99",
        quantity: 1,
      },
      {
        id: "6-10",
        productName: "Sponge Set",
        category: "Home",
        price: "$9.99",
        quantity: 1,
      },
      {
        id: "6-11",
        productName: "Air Freshener",
        category: "Home",
        price: "$16.99",
        quantity: 2,
      },
      {
        id: "6-12",
        productName: "Duster",
        category: "Home",
        price: "$19.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "7",
    orderNumber: "ORD-2407",
    customer: "Lucas Gonzalez",
    customerEmail: "lucas.gonzalez@email.com",
    customerAvatar: "7.png",
    total: "$423.67",
    status: {
      label: "Delivered",
      variant: "success",
    },
    items: [
      {
        id: "7-1",
        productName: "Mechanical Keyboard",
        category: "Electronics",
        price: "$149.99",
        quantity: 1,
      },
      {
        id: "7-2",
        productName: "Keycap Set",
        category: "Accessories",
        price: "$59.99",
        quantity: 1,
      },
      {
        id: "7-3",
        productName: "Keyboard Wrist Rest",
        category: "Accessories",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "7-4",
        productName: "Switch Puller",
        category: "Tools",
        price: "$9.99",
        quantity: 1,
      },
      {
        id: "7-5",
        productName: "Stabilizers",
        category: "Parts",
        price: "$19.99",
        quantity: 1,
      },
      {
        id: "7-6",
        productName: "Keyboard Cable",
        category: "Accessories",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "7-7",
        productName: "Cleaning Brush",
        category: "Tools",
        price: "$7.99",
        quantity: 1,
      },
      {
        id: "7-8",
        productName: "Lubricant",
        category: "Tools",
        price: "$14.99",
        quantity: 1,
      },
      {
        id: "7-9",
        productName: "Extra Switches",
        category: "Parts",
        price: "$44.99",
        quantity: 2,
      },
    ],
  },
  {
    id: "8",
    orderNumber: "ORD-2408",
    customer: "Ava Robinson",
    customerEmail: "ava.robinson@email.com",
    customerAvatar: "8.png",
    total: "$789.23",
    status: {
      label: "Cancelled",
      variant: "destructive",
    },
    items: [
      {
        id: "8-1",
        productName: "Standing Desk",
        category: "Furniture",
        price: "$399.99",
        quantity: 1,
      },
      {
        id: "8-2",
        productName: "Desk Converter",
        category: "Furniture",
        price: "$149.99",
        quantity: 1,
      },
      {
        id: "8-3",
        productName: "Monitor Arm",
        category: "Accessories",
        price: "$119.99",
        quantity: 1,
      },
      {
        id: "8-4",
        productName: "Cable Tray",
        category: "Accessories",
        price: "$24.99",
        quantity: 1,
      },
      {
        id: "8-5",
        productName: "Desk Pad",
        category: "Office",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "8-6",
        productName: "Footrest",
        category: "Office",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "8-7",
        productName: "LED Desk Light",
        category: "Lighting",
        price: "$64.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "9",
    orderNumber: "ORD-2409",
    customer: "Ethan Foster",
    customerEmail: "ethan.foster@email.com",
    customerAvatar: "9.png",
    total: "$534.12",
    status: {
      label: "Processing",
      variant: "info",
    },
    items: [
      {
        id: "9-1",
        productName: "Espresso Machine",
        category: "Kitchen",
        price: "$299.99",
        quantity: 1,
      },
      {
        id: "9-2",
        productName: "Coffee Grinder",
        category: "Kitchen",
        price: "$89.99",
        quantity: 1,
      },
      {
        id: "9-3",
        productName: "Milk Pitcher",
        category: "Kitchen",
        price: "$24.99",
        quantity: 1,
      },
      {
        id: "9-4",
        productName: "Coffee Beans",
        category: "Food",
        price: "$29.99",
        quantity: 2,
      },
      {
        id: "9-5",
        productName: "Tamper",
        category: "Tools",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "9-6",
        productName: "Cleaning Tablets",
        category: "Kitchen",
        price: "$14.99",
        quantity: 1,
      },
      {
        id: "9-7",
        productName: "Descaling Solution",
        category: "Kitchen",
        price: "$19.99",
        quantity: 1,
      },
      {
        id: "9-8",
        productName: "Knock Box",
        category: "Kitchen",
        price: "$34.99",
        quantity: 1,
      },
      {
        id: "9-9",
        productName: "Thermometer",
        category: "Tools",
        price: "$24.99",
        quantity: 1,
      },
      {
        id: "9-10",
        productName: "Scale",
        category: "Tools",
        price: "$49.99",
        quantity: 1,
      },
    ],
  },
  {
    id: "10",
    orderNumber: "ORD-2410",
    customer: "Isabella Hayes",
    customerEmail: "isabella.hayes@email.com",
    customerAvatar: "10.png",
    total: "$312.45",
    status: {
      label: "Shipped",
      variant: "primary",
    },
    items: [
      {
        id: "10-1",
        productName: "Plant Pots Set",
        category: "Garden",
        price: "$49.99",
        quantity: 1,
      },
      {
        id: "10-2",
        productName: "Potting Soil",
        category: "Garden",
        price: "$24.99",
        quantity: 2,
      },
      {
        id: "10-3",
        productName: "Garden Tools",
        category: "Garden",
        price: "$39.99",
        quantity: 1,
      },
      {
        id: "10-4",
        productName: "Watering Can",
        category: "Garden",
        price: "$29.99",
        quantity: 1,
      },
      {
        id: "10-5",
        productName: "Plant Food",
        category: "Garden",
        price: "$19.99",
        quantity: 2,
      },
      {
        id: "10-6",
        productName: "Garden Gloves",
        category: "Garden",
        price: "$14.99",
        quantity: 1,
      },
      {
        id: "10-7",
        productName: "Plant Labels",
        category: "Garden",
        price: "$9.99",
        quantity: 1,
      },
      {
        id: "10-8",
        productName: "Spray Bottle",
        category: "Garden",
        price: "$12.99",
        quantity: 1,
      },
      {
        id: "10-9",
        productName: "Pruning Shears",
        category: "Garden",
        price: "$34.99",
        quantity: 1,
      },
      {
        id: "10-10",
        productName: "Kneeling Pad",
        category: "Garden",
        price: "$19.99",
        quantity: 1,
      },
    ],
  },
];

const parseCurrency = (value: string) =>
  Number(value.replace(/[^0-9.-]+/g, "")) || 0;

export const validatedData = CustomerRecordSchema.array().parse(
  rawOrders.map((order) => {
    const parsedItems = order.items.map((item) => ({
      ...item,
      price: parseCurrency(item.price),
    }));
    const totalItems = parsedItems.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );

    return {
      id: order.id,
      latestOrder: order.orderNumber,
      customer: {
        name: order.customer,
        email: order.customerEmail,
        avatar: order.customerAvatar,
      },
      total: parseCurrency(order.total),
      totalItems,
      status: order.status,
      items: parsedItems,
    };
  }),
);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const statusBadgeClassMap: Record<StatusVariant, string> = {
  info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-400",
  primary:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-400",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-400",
  destructive:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-400",
};

const getStatusBadgeClasses = (variant: StatusVariant) =>
  statusBadgeClassMap[variant] ?? statusBadgeClassMap.info;

const avatarColorClasses = [
  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-sky-300",
];

const getAvatarColor = (value: string) => {
  const hash = value
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return avatarColorClasses[hash % avatarColorClasses.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  const first = parts[0]?.charAt(0) ?? "";
  const second = parts[1]?.charAt(0) ?? parts[0]?.charAt(1) ?? "";
  return `${first}${second}`.toUpperCase();
};

export type StatusOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const orderStatuses: StatusOption[] = [
  { label: "Processing", value: "Processing", icon: LoaderIcon },
  { label: "Shipped", value: "Shipped", icon: Truck },
  { label: "Delivered", value: "Delivered", icon: CheckCircle },
  { label: "Pending", value: "Pending", icon: Clock },
  { label: "Cancelled", value: "Cancelled", icon: XCircle },
];

const createStatusLookup = (options: StatusOption[]) =>
  options.reduce<Record<string, StatusOption>>((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {});

const orderStatusLookup = createStatusLookup(orderStatuses);

export const getOrderStatusMeta = (status: string) => orderStatusLookup[status];

// Sub-table component for order items
function OrderItemsSubTable({ items }: { items: OrderItem[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = React.useMemo<ColumnDef<OrderItem>[]>(
    () => [
      {
        accessorKey: "productName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product" />
        ),
        cell: (info) => (
          <span className="text-sm font-medium">
            {info.getValue() as string}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: (info) => (
          <span className="text-sm text-muted-foreground">
            {info.getValue() as string}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "quantity",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Qty" />
        ),
        cell: (info) => (
          <span className="text-sm font-medium tabular-nums">
            {info.getValue() as number}
          </span>
        ),
        meta: { align: "right", className: "tabular-nums" },
        enableSorting: true,
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: (info) => (
          <span className="text-sm font-semibold tabular-nums">
            {currencyFormatter.format(info.getValue() as number)}
          </span>
        ),
        meta: { align: "right", className: "tabular-nums" },
        enableSorting: true,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: items,
    columns,
    pageCount: Math.ceil(items.length / pagination.pageSize),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row: OrderItem) => row.id,
  });

  return (
    <div className="rounded-lg bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold">Order items</h4>
        <Badge variant="outline" className="text-xs">
          {items.length} {items.length === 1 ? "item" : "items"}
        </Badge>
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-9">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center text-sm text-muted-foreground"
                >
                  No order history.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {items.length > pagination.pageSize && (
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="text-xs text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {items.length} items
          </div>
          <div className="flex gap-2">
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
        </div>
      )}
    </div>
  );
}

export const columns: ColumnDef<CustomerRecord>[] = [
  {
    id: "expand",
    cell: ({ row }) => {
      const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        row.toggleExpanded();
      };
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            data-state={row.getIsExpanded() ? "open" : "closed"}
            onClick={toggleExpand}
          >
            {row.getIsExpanded() ? <SquareMinusIcon /> : <SquarePlusIcon />}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const { name, email, avatar } = row.original.customer;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-border/60">
            <AvatarFallback
              className={cn(
                "text-xs font-semibold uppercase",
                getAvatarColor(avatar || name),
              )}
            >
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-medium">{name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="text-sm font-semibold tabular-nums">
        {currencyFormatter.format(row.original.total)}
      </span>
    ),
    meta: { align: "right", className: "tabular-nums" },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusMeta = getOrderStatusMeta(status.label);
      const StatusIcon = statusMeta?.icon;

      return (
        <Badge
          variant="outline"
          className={cn("gap-1", getStatusBadgeClasses(status.variant))}
        >
          {StatusIcon ? <StatusIcon className="size-3" /> : null}
          <span className="text-xs font-medium">{status.label}</span>
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "totalItems",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.totalItems}{" "}
        {row.original.totalItems === 1 ? "item" : "items"}
      </span>
    ),
    meta: { align: "right" },
    enableSorting: true,
  },
];

export function DataTable22({ className }: { className?: string }) {
  const { table } = useDataTable({
    data: validatedData,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="w-full">
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Data table with sub data table
            </h2>
            <p className="mt-2 text-muted-foreground">
              A data table with comprehensive column controls including sorting,
              pinning, moving, and visibility management
              {/* Monitor every customer&apos;s latest order status and spend,
              complete with a detailed line-item breakdown on expand. */}
            </p>
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow className="bg-muted/30 transition-colors">
                          <TableCell className="p-0" colSpan={columns.length}>
                            <OrderItemsSubTable items={row.original.items} />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
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
      </div>
    </section>
  );
}
