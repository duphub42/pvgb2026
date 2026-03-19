import { ExternalLink, Settings2, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface IntegrationItem {
  image: string;
  title: string;
  status: "active" | "inactive" | "error";
  lastSync?: string;
  className?: string;
}

interface SettingsIntegrations6Props {
  className?: string;
  heading?: string;
  subHeading?: string;
  integrations?: IntegrationItem[];
}

const SettingsIntegrations6 = ({
  className,
  heading = "Integrations",
  subHeading = "View and manage your connected services.",
  integrations = [
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
      title: "Slack",
      status: "active",
      lastSync: "2 minutes ago",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
      title: "Google Drive",
      status: "active",
      lastSync: "5 minutes ago",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
      title: "Notion",
      status: "error",
      lastSync: "Failed 1 hour ago",
      className: "dark:invert",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
      title: "GitHub",
      status: "active",
      lastSync: "Just now",
      className: "dark:invert",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      title: "Figma",
      status: "inactive",
      lastSync: "Never",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/jira-icon.svg",
      title: "Jira",
      status: "active",
      lastSync: "10 minutes ago",
    },
  ],
}: SettingsIntegrations6Props) => {
  const getStatusBadge = (status: IntegrationItem["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "error":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Error
          </Badge>
        );
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-4xl">
        <div className="space-y-2 border-b pb-6">
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="text-sm text-muted-foreground">{subHeading}</p>
        </div>

        <div className="mt-6">
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrations.map((integration) => (
                  <TableRow key={integration.title}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.image}
                          alt={integration.title}
                          className={cn("size-6", integration.className)}
                        />
                        <span className="font-medium">{integration.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(integration.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {integration.lastSync}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Open</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Settings2 className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Settings</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export { SettingsIntegrations6 };
