import { Bell, Mail, MessageSquare } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
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
  sms: boolean;
}

interface SettingsNotifications4Props {
  heading?: string;
  subHeading?: string;
  className?: string;
  notifications?: NotificationSettingItem[];
}

const SettingsNotifications4 = ({
  heading = "Notifications",
  subHeading = "Manage your email and SMS notification preferences",
  notifications = [
    {
      id: "mentions",
      title: "Direct Mentions",
      description: "Get alerted when someone tags you using @.",
      email: true,
      sms: false,
    },
    {
      id: "comments",
      title: "Comments",
      description: "Receive updates when someone comments on your posts.",
      email: true,
      sms: false,
    },
    {
      id: "messages",
      title: "Direct Messages",
      description: "New private messages from other users.",
      email: true,
      sms: true,
    },
    {
      id: "assignments",
      title: "Task Assignments",
      description: "When a task is assigned to you.",
      email: true,
      sms: false,
    },
    {
      id: "deadlines",
      title: "Deadline Reminders",
      description: "Reminders for upcoming due dates.",
      email: true,
      sms: true,
    },
    {
      id: "security",
      title: "Security Alerts",
      description: "Important security notifications for your account.",
      email: true,
      sms: true,
    },
    {
      id: "billing",
      title: "Billing Updates",
      description: "Notifications about payments and invoices.",
      email: true,
      sms: false,
    },
  ],
  className,
}: SettingsNotifications4Props) => {
  return (
    <section className="py-32">
      <div
        className={cn(
          "container max-w-4xl space-y-8 tracking-tight",
          className,
        )}
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{heading}</h3>
          <p className="font-medium text-muted-foreground">{subHeading}</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="[&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:gap-1.5 [&_div]:font-semibold [&_div]:text-muted-foreground/80 [&_div_svg]:size-4">
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
                  <MessageSquare /> SMS
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
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
                  <Checkbox defaultChecked={notification.sms} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export { SettingsNotifications4 };
