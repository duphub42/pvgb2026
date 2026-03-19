"use client";

import {
  Clock,
  MoreVertical,
  Send,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ActiveMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  lastActive: string;
}

interface PendingInvite {
  id: string;
  email: string;
  role: string;
  sentAt: string;
  expiresIn: string;
}

interface SettingsMembers5Props {
  heading?: string;
  description?: string;
  activeMembers?: ActiveMember[];
  pendingInvites?: PendingInvite[];
  className?: string;
}

const SettingsMembers5 = ({
  heading = "Team Management",
  description = "View active members and manage pending invitations.",
  activeMembers = [
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@designlab.io",
      role: "Owner",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar11.jpg",
      lastActive: "Now",
    },
    {
      id: "2",
      name: "Kevin O'Brien",
      email: "kevin@designlab.io",
      role: "Admin",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar12.jpg",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Yuki Tanaka",
      email: "yuki@designlab.io",
      role: "Editor",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar13.jpg",
      lastActive: "Yesterday",
    },
    {
      id: "4",
      name: "Carlos Mendez",
      email: "carlos@designlab.io",
      role: "Editor",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar14.jpg",
      lastActive: "3 days ago",
    },
  ],
  pendingInvites = [
    {
      id: "p1",
      email: "maya.wilson@gmail.com",
      role: "Editor",
      sentAt: "Jan 15, 2026",
      expiresIn: "5 days",
    },
    {
      id: "p2",
      email: "alex.foster@outlook.com",
      role: "Viewer",
      sentAt: "Jan 20, 2026",
      expiresIn: "10 days",
    },
  ],
  className,
}: SettingsMembers5Props) => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <section className="py-32">
      <div className="container max-w-3xl">
        <div className={cn("space-y-6", className)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                {heading}
              </h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="size-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite New Member</DialogTitle>
                  <DialogDescription>
                    Send an email invitation to join your team.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsInviteOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="new-email">Email address</Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-role">Assign role</Label>
                    <Select defaultValue="editor">
                      <SelectTrigger id="new-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsInviteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Send className="size-4" />
                      Send Invite
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="active" className="gap-2">
                <UserCheck className="size-4" />
                Active
                <Badge
                  variant="secondary"
                  className="ml-1 size-5 justify-center rounded-full p-0 text-xs"
                >
                  {activeMembers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="size-4" />
                Pending
                {pendingInvites.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 size-5 justify-center rounded-full bg-amber-100 p-0 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  >
                    {pendingInvites.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <div className="rounded-lg border">
                <ul className="divide-y">
                  {activeMembers.map((member) => (
                    <li
                      key={member.id}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                          <Badge variant="outline" className="font-normal">
                            {member.role}
                          </Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {member.lastActive === "Now" ? (
                              <span className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-green-500" />
                                Online
                              </span>
                            ) : (
                              `Active ${member.lastActive}`
                            )}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit role</DropdownMenuItem>
                            <DropdownMenuItem>View profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              {pendingInvites.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                  <Clock className="mb-3 size-10 text-muted-foreground/50" />
                  <p className="text-sm font-medium">No pending invitations</p>
                  <p className="text-xs text-muted-foreground">
                    Invite team members to get started
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border">
                  <ul className="divide-y">
                    {pendingInvites.map((invite) => (
                      <li
                        key={invite.id}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                            <Clock className="size-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {invite.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Sent {invite.sentAt} · Expires in{" "}
                              {invite.expiresIn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-normal">
                            {invite.role}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Send className="size-4" />
                            Resend
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { SettingsMembers5 };
