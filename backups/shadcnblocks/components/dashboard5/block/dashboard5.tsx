"use client";

import {
  BarChart3,
  Bell,
  Box,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Package,
  RotateCcw,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users,
} from "lucide-react";
import * as React from "react";
import type { TooltipProps } from "recharts";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
  children?: NavItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
};

type UserData = {
  name: string;
  email: string;
  avatar: string;
};

type SidebarData = {
  logo: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
  user?: UserData;
};

type TimePeriod = "6months" | "year";

type StatCardItem = {
  title: string;
  value: number;
  format: "currency" | "number";
  changePercent: number;
  isPositive: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  sparklineData: number[];
};

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: OrderStatus;
};

type ActivityItem = {
  title: string;
  detail: string;
  minutesAgo: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("en-US");
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const formatRelativeTime = (minutesAgo: number) => {
  if (minutesAgo < 60) {
    return relativeTimeFormatter.format(-minutesAgo, "minute");
  }
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) {
    return relativeTimeFormatter.format(-hours, "hour");
  }
  const days = Math.round(hours / 24);
  return relativeTimeFormatter.format(-days, "day");
};

const mixBase = "var(--background)";

const palette = {
  primary: "var(--primary)",
  secondary: {
    light: `color-mix(in oklch, var(--primary) 75%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 85%, ${mixBase})`,
  },
  tertiary: {
    light: `color-mix(in oklch, var(--primary) 55%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 65%, ${mixBase})`,
  },
  quaternary: {
    light: `color-mix(in oklch, var(--primary) 40%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 45%, ${mixBase})`,
  },
};

const revenueChartConfig = {
  thisYear: { label: "This Year", color: palette.primary },
  prevYear: { label: "Previous Year", theme: palette.secondary },
} satisfies ChartConfig;

const sparklinePositiveConfig = {
  value: {
    label: "Value",
    theme: {
      light: "oklch(0.55 0.18 155)",
      dark: "oklch(0.72 0.15 155)",
    },
  },
} satisfies ChartConfig;

const sparklineNegativeConfig = {
  value: {
    label: "Value",
    theme: {
      light: "oklch(0.55 0.18 25)",
      dark: "oklch(0.72 0.15 25)",
    },
  },
} satisfies ChartConfig;

const sidebarData: SidebarData = {
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg",
    alt: "Acme Store",
    title: "Acme Store",
    description: "Ecommerce",
  },
  navGroups: [
    {
      title: "Main",
      defaultOpen: true,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "#",
          isActive: true,
        },
        { label: "Orders", icon: ClipboardList, href: "#" },
        {
          label: "Products",
          icon: Box,
          href: "#",
          children: [
            { label: "All Products", icon: Package, href: "#" },
            { label: "Categories", icon: Package, href: "#" },
            { label: "Inventory", icon: Package, href: "#" },
          ],
        },
        { label: "Customers", icon: Users, href: "#" },
      ],
    },
    {
      title: "Analytics",
      defaultOpen: true,
      items: [
        { label: "Analytics", icon: BarChart3, href: "#" },
        { label: "Reports", icon: Globe, href: "#" },
      ],
    },
    {
      title: "Other",
      defaultOpen: false,
      items: [
        { label: "Shipping", icon: Truck, href: "#" },
        { label: "Messages", icon: MessageSquare, href: "#" },
        { label: "Returns", icon: RotateCcw, href: "#" },
      ],
    },
  ],
  footerGroup: {
    title: "Settings",
    items: [{ label: "Settings", icon: Settings, href: "#" }],
  },
  user: {
    name: "John Doe",
    email: "john@acme.store",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
};

const fullYearData = [
  { month: "Jan", thisYear: 42000, prevYear: 38000 },
  { month: "Feb", thisYear: 38000, prevYear: 45000 },
  { month: "Mar", thisYear: 52000, prevYear: 41000 },
  { month: "Apr", thisYear: 45000, prevYear: 48000 },
  { month: "May", thisYear: 58000, prevYear: 44000 },
  { month: "Jun", thisYear: 41000, prevYear: 52000 },
  { month: "Jul", thisYear: 55000, prevYear: 47000 },
  { month: "Aug", thisYear: 48000, prevYear: 53000 },
  { month: "Sep", thisYear: 62000, prevYear: 49000 },
  { month: "Oct", thisYear: 54000, prevYear: 58000 },
  { month: "Nov", thisYear: 67000, prevYear: 52000 },
  { month: "Dec", thisYear: 71000, prevYear: 61000 },
];

const periodLabels: Record<TimePeriod, string> = {
  "6months": "Last 6 Months",
  year: "Last Year",
};

function getDataForPeriod(period: TimePeriod) {
  if (period === "6months") return fullYearData.slice(0, 6);
  return fullYearData;
}

const statsCardData: StatCardItem[] = [
  {
    title: "Total Sales",
    value: 82450,
    format: "currency",
    changePercent: 20,
    isPositive: true,
    icon: CircleDollarSign,
    sparklineData: [32, 40, 35, 50, 49, 60, 70, 65, 72, 80],
  },
  {
    title: "Orders Processed",
    value: 3670,
    format: "number",
    changePercent: -4.2,
    isPositive: false,
    icon: ShoppingCart,
    sparklineData: [45, 42, 48, 40, 38, 36, 34, 35, 33, 32],
  },
  {
    title: "Avg. Order Value",
    value: 56.2,
    format: "currency",
    changePercent: 4.5,
    isPositive: true,
    icon: CreditCard,
    sparklineData: [20, 25, 22, 30, 28, 35, 40, 38, 42, 45],
  },
];

const orderStatuses: OrderStatus[] = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: "Sarah Johnson",
    status: "Delivered",
    total: 2499.0,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: "Michael Chen",
    status: "Shipped",
    total: 1348.0,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: "Emma Wilson",
    status: "Processing",
    total: 1198.0,
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: "James Rodriguez",
    status: "Delivered",
    total: 799.0,
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    customer: "Lisa Park",
    status: "Cancelled",
    total: 599.0,
  },
  {
    id: "6",
    orderNumber: "ORD-2024-006",
    customer: "David Kim",
    status: "Shipped",
    total: 5498.0,
  },
  {
    id: "7",
    orderNumber: "ORD-2024-007",
    customer: "Anna Martinez",
    status: "Delivered",
    total: 1199.0,
  },
  {
    id: "8",
    orderNumber: "ORD-2024-008",
    customer: "Robert Taylor",
    status: "Processing",
    total: 1128.0,
  },
  {
    id: "9",
    orderNumber: "ORD-2024-009",
    customer: "Jennifer Lee",
    status: "Shipped",
    total: 449.0,
  },
  {
    id: "10",
    orderNumber: "ORD-2024-010",
    customer: "William Brown",
    status: "Delivered",
    total: 2199.0,
  },
  {
    id: "11",
    orderNumber: "ORD-2024-011",
    customer: "Sophia Davis",
    status: "Cancelled",
    total: 349.0,
  },
  {
    id: "12",
    orderNumber: "ORD-2024-012",
    customer: "Daniel Garcia",
    status: "Processing",
    total: 899.0,
  },
];

const tableHeadClassName =
  "text-xs font-medium text-muted-foreground sm:text-sm";

const statusStyles: Record<OrderStatus, string> = {
  Processing:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400/20",
  Shipped:
    "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20",
  Delivered:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-400/20",
  Cancelled:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20",
};

const recentActivity: ActivityItem[] = [
  { title: "New user registration", detail: "Alex Morgan", minutesAgo: 2 },
  { title: "New Order Placed", detail: "Alex Morgan", minutesAgo: 2 },
  { title: "Payment Received", detail: "Alex Morgan", minutesAgo: 2 },
  { title: "Invoice Sent", detail: "Jamie Lee", minutesAgo: 6 },
  { title: "Subscription Upgraded", detail: "Noah Roberts", minutesAgo: 12 },
  { title: "Refund Issued", detail: "Olivia White", minutesAgo: 18 },
  { title: "Password Reset", detail: "Ethan Parker", minutesAgo: 24 },
  { title: "New Comment", detail: "Sophia Davis", minutesAgo: 32 },
  { title: "Support Ticket Closed", detail: "Michael Chen", minutesAgo: 45 },
  { title: "Payout Processed", detail: "Emma Wilson", minutesAgo: 60 },
];

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" tooltip={logo.title}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
            <img
              src={logo.src}
              alt={logo.alt}
              width={24}
              height={24}
              className="size-6 text-primary-foreground invert dark:invert-0"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const NavMenuItem = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={item.isActive}
          tooltip={item.label}
        >
          <a href={item.href}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={item.isActive} tooltip={item.label}>
            <Icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
            <ChevronRight
              className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              aria-hidden="true"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((child) => (
              <SidebarMenuSubItem key={child.label}>
                <SidebarMenuSubButton asChild isActive={child.isActive}>
                  <a href={child.href}>{child.label}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavUser = ({ user }: { user: UserData }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
          <SidebarLogo logo={sidebarData.logo} />
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavMenuItem key={item.label} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {sidebarData.user && <NavUser user={sidebarData.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

const DashboardHeader = () => {
  return (
    <header className="flex w-full items-center gap-3 border-b bg-background px-4 py-4 sm:px-6">
      <LayoutDashboard className="size-5" aria-hidden="true" />
      <h1 className="text-base font-medium text-pretty">Dashboard</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-full max-w-[220px] sm:max-w-[260px]">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            name="header-search"
            inputMode="search"
            autoComplete="off"
            aria-label="Search dashboard"
            placeholder="Search orders, customers…"
            className="h-9 w-full pr-14 pl-9 text-sm"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            {"\u2318"}
            {"\u00a0"}K
          </kbd>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="Notifications"
        >
          <Bell className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="Help"
        >
          <HelpCircle className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
};

function CustomTooltip({
  active,
  payload,
  label,
  colors,
}: TooltipProps<number, string> & {
  colors: { primary: string; secondary: string };
}) {
  if (!active || !payload?.length) return null;

  const thisYear = payload.find((p) => p.dataKey === "thisYear")?.value || 0;
  const prevYear = payload.find((p) => p.dataKey === "prevYear")?.value || 0;
  const diff = Number(thisYear) - Number(prevYear);
  const percentage = prevYear ? Math.round((diff / Number(prevYear)) * 100) : 0;
  const currentYear = new Date().getFullYear();

  return (
    <div className="rounded-lg border border-border bg-popover p-2 shadow-lg sm:p-3">
      <p className="mb-1.5 text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}, {currentYear}
      </p>
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.primary }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            This Year:
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {currencyFormatter.format(Number(thisYear))}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.secondary }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            Prev Year:
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {currencyFormatter.format(Number(prevYear))}
          </span>
        </div>
        <div className="mt-1 border-t border-border pt-1">
          <span
            className={cn(
              "text-[10px] font-medium sm:text-xs",
              diff >= 0 ? "text-emerald-500" : "text-red-500",
            )}
          >
            {diff >= 0 ? "+" : ""}
            {percentage}% vs last year
          </span>
        </div>
      </div>
    </div>
  );
}

const RevenueFlowChart = () => {
  const [period, setPeriod] = React.useState<TimePeriod>("6months");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const nextPeriod = params.get("period");
    if (nextPeriod === "6months" || nextPeriod === "year") {
      setPeriod(nextPeriod);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (period !== "6months") {
      params.set("period", period);
    } else {
      params.delete("period");
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery
      ? `${window.location.pathname}?${nextQuery}`
      : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [period]);

  const chartData = getDataForPeriod(period);
  const totalRevenue = chartData.reduce((acc, item) => acc + item.thisYear, 0);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 sm:gap-6 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
            {currencyFormatter.format(totalRevenue)}
          </p>
          <p className="text-xs text-muted-foreground">
            Total Revenue ({periodLabels[period]})
          </p>
        </div>
        <div className="hidden items-center gap-3 sm:flex sm:gap-5">
          <div className="flex items-center gap-1.5">
            <div
              className="size-2.5 rounded-full sm:size-3"
              style={{ backgroundColor: palette.primary }}
            />
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              This Year
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="size-2.5 rounded-full sm:size-3"
              style={{ backgroundColor: palette.secondary.light }}
            />
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              Prev Year
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 sm:size-8"
              aria-label="Select time period"
            >
              <MoreHorizontal className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Time Period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={period === key}
                onCheckedChange={() => setPeriod(key)}
              >
                {periodLabels[key]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[200px] w-full min-w-0 sm:h-[240px] lg:h-[280px]">
        <ChartContainer config={revenueChartConfig} className="h-full w-full">
          <BarChart data={chartData} barGap={2}>
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dx={-5}
              tickFormatter={(value) => compactCurrencyFormatter.format(value)}
              width={40}
            />
            <Tooltip
              content={
                <CustomTooltip
                  colors={{
                    primary: "var(--color-thisYear)",
                    secondary: "var(--color-prevYear)",
                  }}
                />
              }
              cursor={{ fillOpacity: 0.05, radius: 4 }}
            />
            <Bar
              dataKey="thisYear"
              fill="var(--color-thisYear)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="prevYear"
              fill="var(--color-prevYear)"
              fillOpacity={0.4}
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

const StatsCardsVertical = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:flex xl:w-[360px] xl:flex-col xl:justify-between">
      {statsCardData.map((stat) => {
        const sparkData = stat.sparklineData.map((v, i) => ({
          idx: i,
          value: v,
        }));
        const chartConfig = stat.isPositive
          ? sparklinePositiveConfig
          : sparklineNegativeConfig;
        const sparkColor = stat.isPositive ? "#16a34a" : "#dc2626";
        const gradientId = `sparkFill-${stat.title.replace(/\s+/g, "-")}`;

        return (
          <div
            key={stat.title}
            className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {stat.title}
                </span>
                <span className="text-lg font-semibold tracking-tight sm:text-xl">
                  {stat.format === "currency"
                    ? currencyFormatter.format(stat.value)
                    : numberFormatter.format(stat.value)}
                </span>
              </div>

              <div className="h-10 w-24">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <AreaChart data={sparkData}>
                    <defs>
                      <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={sparkColor}
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="100%"
                          stopColor={sparkColor}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const value = payload[0].value as number;
                        const formatted =
                          stat.format === "currency"
                            ? currencyFormatter.format(value)
                            : numberFormatter.format(value);
                        return (
                          <div className="rounded-md border border-border bg-popover px-2 py-1 shadow-lg">
                            <p className="text-xs font-medium text-foreground">
                              {formatted}
                            </p>
                          </div>
                        );
                      }}
                      cursor={{ strokeOpacity: 0.2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={sparkColor}
                      strokeWidth={1.5}
                      fill={`url(#${gradientId})`}
                      dot={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs">
              <span
                className={cn(
                  "font-medium",
                  stat.isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {stat.isPositive ? "+" : ""}
                {stat.changePercent.toFixed(1)}%
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span>vs Last Month</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RecentTransactionsTable = ({ className }: { className?: string }) => {
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const pageSize = 6;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const nextStatus = params.get("status");
    if (
      nextStatus &&
      (nextStatus === "all" ||
        orderStatuses.includes(nextStatus as OrderStatus))
    ) {
      setStatusFilter(nextStatus as OrderStatus | "all");
    }
    const nextPage = Number(params.get("page"));
    if (!Number.isNaN(nextPage) && nextPage > 0) {
      setCurrentPage(nextPage);
    }
    setIsHydrated(true);
  }, []);

  const filteredOrders = React.useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const paginatedOrders = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  React.useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }
    if (currentPage > 1) {
      params.set("page", String(currentPage));
    } else {
      params.delete("page");
    }
    const nextQuery = params.toString();
    const nextUrl = nextQuery
      ? `${window.location.pathname}?${nextQuery}`
      : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [statusFilter, currentPage, isHydrated]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const startRow = filteredOrders.length ? (currentPage - 1) * pageSize + 1 : 0;
  const endRow = Math.min(currentPage * pageSize, filteredOrders.length);

  return (
    <div className={cn("rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-pretty sm:text-base">
            Recent Transactions
          </h2>
          <span className="ml-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset sm:text-xs dark:bg-gray-800/50 dark:text-gray-400 dark:ring-gray-400/20">
            {filteredOrders.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 sm:h-9 sm:gap-2"
            >
              <span className="text-xs sm:text-sm">
                {statusFilter === "all" ? "All" : statusFilter}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={statusFilter === "all"}
              onCheckedChange={() => setStatusFilter("all")}
            >
              All Statuses
            </DropdownMenuCheckboxItem>
            {orderStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter === status}
                onCheckedChange={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 pt-3 pb-4 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className={tableHeadClassName}>Order Ref</TableHead>
              <TableHead className={tableHeadClassName}>Buyer</TableHead>
              <TableHead className={tableHeadClassName}>Total</TableHead>
              <TableHead className={tableHeadClassName}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-20 text-center text-sm text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground sm:text-sm">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-xs text-foreground tabular-nums sm:text-sm">
                    {currencyFormatter.format(order.total)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium sm:text-xs",
                        statusStyles[order.status],
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3 text-[10px] text-muted-foreground sm:px-6 sm:text-xs">
        <span>
          {startRow}-{endRow} of {filteredOrders.length}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ className }: { className?: string }) => {
  return (
    <div className={cn("rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <h2 className="text-sm font-medium text-pretty sm:text-base">
          Recent Activity
        </h2>
      </div>

      <ScrollArea className="h-[360px] px-4 pt-2 pb-4 text-xs sm:px-6 sm:text-sm">
        <div className="divide-y">
          {recentActivity.map((item) => (
            <div key={`${item.title}-${item.minutesAgo}`} className="py-3">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <span className="min-w-0 truncate font-medium text-foreground">
                  {item.title}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground sm:text-xs">
                  {formatRelativeTime(item.minutesAgo)}
                </span>
              </div>
              <span className="text-[10px] break-words text-muted-foreground sm:text-xs">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const DashboardContent = () => {
  return (
    <main
      id="dashboard-main"
      tabIndex={-1}
      className="w-full flex-1 space-y-4 overflow-auto bg-background p-3 sm:p-4 md:p-6"
    >
      <div className="flex flex-col gap-4 xl:flex-row">
        <RevenueFlowChart />
        <StatsCardsVertical />
      </div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <RecentTransactionsTable className="flex-1" />
        <RecentActivity className="xl:w-[360px]" />
      </div>
    </main>
  );
};

const Dashboard5 = ({ className }: { className?: string }) => {
  return (
    <TooltipProvider>
      <SidebarProvider className={cn("bg-sidebar", className)}>
        <a
          href="#dashboard-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <AppSidebar />
        <div className="h-svh w-full overflow-hidden lg:p-2">
          <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden bg-background lg:rounded-xl lg:border">
            <DashboardHeader />
            <DashboardContent />
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export { Dashboard5 };
