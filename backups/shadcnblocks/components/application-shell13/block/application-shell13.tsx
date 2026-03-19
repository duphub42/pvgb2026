"use client";

import {
  BadgeCheck,
  BarChart3,
  Bell,
  Briefcase,
  ChevronDown,
  ChevronsUpDown,
  ClipboardList,
  Clock3,
  FileText,
  Folder,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Star,
  User,
  Users,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
  children?: NavItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const data = {
  brand: {
    name: "Shadcnblocks",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg",
  },
  user: {
    name: "Joh Doe",
    email: "joh@shadcnblocks.com",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  organization: {
    name: "Acme Inc",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
  },
};

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "#",
        isActive: true,
      },
      { label: "Tasks", icon: ClipboardList, href: "#" },
      { label: "Roadmap", icon: BarChart3, href: "#" },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        label: "Active Projects",
        icon: Briefcase,
        href: "#",
        children: [
          { label: "Project Alpha", icon: FileText, href: "#" },
          { label: "Project Beta", icon: FileText, href: "#" },
          { label: "Project Gamma", icon: FileText, href: "#" },
        ],
      },
      {
        label: "Archived",
        icon: Folder,
        href: "#",
        children: [
          { label: "2024 Archive", icon: FileText, href: "#" },
          { label: "2023 Archive", icon: FileText, href: "#" },
        ],
      },
    ],
  },
  {
    title: "Team",
    items: [
      { label: "Members", icon: Users, href: "#" },
      { label: "Sprints", icon: Clock3, href: "#" },
      { label: "Approvals", icon: BadgeCheck, href: "#" },
      { label: "Reviews", icon: Star, href: "#" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Integrations", icon: Globe2, href: "#" },
      { label: "Automations", icon: Sparkles, href: "#" },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded bg-primary">
            <img
              src={data.organization.logo}
              alt={data.organization.name}
              width={16}
              height={16}
              className="size-4 invert dark:invert-0"
            />
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {data.organization.name}
          </span>
          <ChevronDown className="ml-auto size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded bg-primary">
              <img
                src={data.organization.logo}
                alt={data.organization.name}
                width={16}
                height={16}
                className="size-4 invert dark:invert-0"
              />
            </span>
            <span>{data.organization.name}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Create organization</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NavDropdown = ({ group }: { group: NavGroup }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1">
          {group.title}
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {group.items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <DropdownMenuItem asChild>
                <a href={item.href} className="flex items-center gap-2">
                  <Icon className="size-4" />
                  {item.label}
                </a>
              </DropdownMenuItem>
              {item.children?.map((child) => {
                const ChildIcon = child.icon;
                return (
                  <DropdownMenuItem key={child.label} asChild className="pl-6">
                    <a href={child.href} className="flex items-center gap-2">
                      <ChildIcon className="size-4" />
                      {child.label}
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
              <img
                src={data.brand.logo}
                alt={data.brand.name}
                width={20}
                height={20}
                className="size-5 invert dark:invert-0"
              />
            </div>
            {data.brand.name}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1">
          <nav className="flex flex-col gap-4 px-4 py-4">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {group.title}
                </div>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label}>
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                            item.isActive && "bg-muted font-medium",
                          )}
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </a>
                        {item.children?.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm hover:bg-muted"
                            >
                              <ChildIcon className="size-4" />
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function SearchField({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="h-9 w-full pl-8"
        aria-label="Search"
      />
    </div>
  );
}

function NavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2">
          <Avatar className="size-8">
            <AvatarImage src={data.user.avatar} alt={data.user.name} />
            <AvatarFallback className="text-xs">
              {getInitials(data.user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:inline">
            {data.user.name}
          </span>
          <ChevronsUpDown className="hidden size-4 md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{data.user.name}</p>
            <p className="text-xs text-muted-foreground">{data.user.email}</p>
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
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ApplicationShell13Props {
  className?: string;
}

export function ApplicationShell13({ className }: ApplicationShell13Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-muted/50", className)}>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="mx-auto grid h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <MobileNav />
            <a href="#" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
                <img
                  src={data.brand.logo}
                  alt={data.brand.name}
                  width={20}
                  height={20}
                  className="size-5 text-primary-foreground invert dark:invert-0"
                />
              </div>
              <span className="font-semibold">{data.brand.name}</span>
            </a>
          </div>
          <div className="hidden w-full justify-self-center md:block md:max-w-md">
            <SearchField />
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <NavUser />
          </div>
        </div>
        <div className="border-t border-border md:hidden">
          <div className="px-4 py-3">
            <SearchField />
          </div>
        </div>
        <div className="hidden border-t border-border md:block">
          <div className="mx-auto flex items-center gap-3 overflow-x-auto px-4 py-2 lg:px-6">
            <nav className="flex items-center gap-1">
              {navGroups.map((group) => (
                <NavDropdown key={group.title} group={group} />
              ))}
            </nav>
            <div className="ml-auto max-w-52">
              <OrganizationSwitcher />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 pb-24 md:pb-6 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="min-h-[360px]" />
        </div>
      </main>
      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

const bottomNavItems = [
  { label: "Overview", icon: LayoutDashboard, href: "#", isActive: true },
  { label: "Projects", icon: Briefcase, href: "#" },
  { label: "Team", icon: Users, href: "#" },
  { label: "Workspace", icon: Globe2, href: "#" },
];

function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-4">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 text-xs",
                item.isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
              <span aria-hidden="true">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
