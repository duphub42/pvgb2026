import { Bell, Mail, Smartphone } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface NotificationSettingItem {
  id: string;
  title: string;
  description: string;
  email: boolean;
  app: boolean;
}

interface NotificationSettingsTableProps {
  notificationSettings: NotificationSettingItem[];
}

const NotificationSettingsTable = ({
  notificationSettings,
}: NotificationSettingsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="[&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:gap-1 [&_div]:font-semibold [&_div]:text-muted-foreground/80 [&_div_svg]:size-4">
          <TableHead>
            <div className="!justify-start">
              <Bell /> Notify me about
            </div>
          </TableHead>
          <TableHead>
            <div>
              <Mail /> Email
            </div>
          </TableHead>
          <TableHead>
            <div>
              <Smartphone /> App
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notificationSettings.map((notification) => {
          return (
            <TableRow key={notification.id}>
              <TableCell>
                <p className="font-semibold">{notification.title}</p>
                <p className="text-xs font-medium text-muted-foreground/70">
                  {notification.description}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <Checkbox defaultChecked={notification.email} />
              </TableCell>
              <TableCell className="text-center">
                <Checkbox defaultChecked={notification.app} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

interface SettingsNotifications1Props {
  heading?: string;
  subHeading?: string;
  className?: string;
  notificationSettings?: NotificationSettingItem[];
}

const SettingsNotifications1 = ({
  heading = "Notifications",
  subHeading = "Manage your email and push notification preferences",
  notificationSettings = [
    {
      id: "mentions",
      title: "Direct Mentions",
      description:
        "Get alerted when a team member tags you using @ in discussions or documents.",
      email: true,
      app: true,
    },
    {
      id: "replies",
      title: "Comment Responses",
      description: "Receive updates when others respond to your conversations.",
      email: true,
      app: true,
    },
    {
      id: "access-requests",
      title: "Access Requests",
      description:
        "Stay informed about permission requests and approval status changes.",
      email: true,
      app: true,
    },
    {
      id: "task-assignments",
      title: "New Assignments",
      description: "Get notified when a task or item is assigned to you.",
      email: true,
      app: true,
    },
    {
      id: "shared-items",
      title: "Shared Content",
      description:
        "Be alerted when colleagues share files, links, or other content with you.",
      email: true,
      app: true,
    },
  ],
  className,
}: SettingsNotifications1Props) => {
  return (
    <section className="py-32">
      <div
        className={cn(
          "container max-w-4xl space-y-10 tracking-tight",
          className,
        )}
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{heading}</h3>
          <p className="font-medium text-muted-foreground">{subHeading}</p>
        </div>

        <div className="flex w-full items-center justify-between gap-4 border-y py-10">
          <div>
            <p className="font-semibold">Morning summary</p>
            <p className="text-sm font-medium text-muted-foreground">
              A daily overview of your activity highlights and upcoming
              deadlines.
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold">Team activity alerts</p>

          <NotificationSettingsTable
            notificationSettings={notificationSettings}
          />
        </div>
      </div>
    </section>
  );
};

export { SettingsNotifications1 };
