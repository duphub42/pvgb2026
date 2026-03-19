import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IntegrationItem {
  image: string;
  title: string;
  description: string;
  isConnected?: boolean;
  link: string;
  className?: string;
}

interface CtaText {
  title: string;
  ctaText: string;
  ctaLink: string;
}

interface SettingsIntegrations2Props {
  heading?: string;
  description?: CtaText[];
  integrations?: IntegrationItem[];
}

const SettingsIntegrations2 = ({
  heading = "Integrations",
  description = [
    {
      title:
        "Enhance your workflow by connecting your favorite apps and services.",
      ctaText: "Learn more",
      ctaLink: "https://shadcnblocks.com",
    },
    {
      title: "Any questions about how to setup your integrations?",
      ctaText: "Talk to sales",
      ctaLink: "https://shadcnblocks.com",
    },
  ],
  integrations = [
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
      title: "Slack",
      description: "Send notifications and updates to your team channels.",
      isConnected: true,
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/drive.svg",
      title: "Google Drive",
      description: "Access and sync files from your Google Drive.",
      isConnected: true,
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
      title: "Notion",
      description: "Sync your workspace pages and databases.",
      isConnected: true,
      link: "https://shadcnblocks.com",
      className: "dark:invert",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/jira.svg",
      title: "Jira",
      description: "Track issues and manage your agile projects.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/asana.svg",
      title: "Asana",
      description: "Manage tasks and collaborate with your team.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/dropbox-icon.svg",
      title: "Dropbox",
      description: "Store and share files securely in the cloud.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      title: "Figma",
      description: "Import designs and collaborate on prototypes.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
      title: "GitHub",
      description: "Connect repositories and automate workflows.",
      isConnected: true,
      link: "https://shadcnblocks.com",
      className: "dark:invert",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/stripe.svg",
      title: "Stripe",
      description: "Process payments and manage subscriptions.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/confluence.svg",
      title: "Confluence",
      description: "Create and share team documentation.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/monday.svg",
      title: "Monday",
      description: "Organize workflows and track project progress.",
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/excel.svg",
      title: "Excel",
      description: "Import and export spreadsheet data seamlessly.",
      isConnected: true,
      link: "https://shadcnblocks.com",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
      title: "Vercel",
      description: "Deploy and preview your web applications.",
      isConnected: true,
      link: "https://shadcnblocks.com",
      className: "dark:invert",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/logos/retool.svg",
      title: "Retool",
      description: "Build custom internal tools and dashboards.",
      link: "https://shadcnblocks.com",
      className: "dark:invert",
    },
  ],
}: SettingsIntegrations2Props) => {
  return (
    <section className="py-32">
      <div className="container max-w-4xl">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">
            {heading}
          </p>
          <div className="space-y-1 sm:space-y-0">
            {description.map((item, i) => {
              return (
                <p
                  key={`description-${i}`}
                  className="flex flex-wrap items-center gap-1 gap-y-0 text-xs text-muted-foreground sm:text-sm sm:leading-tight"
                >
                  {item.title}
                  <a href={item.ctaLink} className="underline">
                    {item.ctaText}
                  </a>
                </p>
              );
            })}
          </div>
          <ul className="mt-8">
            {integrations.map((integration, i) => {
              return (
                <li
                  key={`integration-${i}-${integration.title}`}
                  className="border-t last:border-b"
                >
                  <a
                    href={integration.link}
                    className="group flex cursor-pointer items-center gap-4 py-6 hover:bg-muted/50 sm:px-2"
                  >
                    <img
                      src={integration.image}
                      alt={integration.title}
                      className={cn("size-6", integration.className)}
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{integration.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                    {integration.isConnected ? (
                      <div>
                        <Badge className="bg-green-100 text-green-800">
                          Connected
                        </Badge>
                      </div>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100">
                        <ArrowRight className="size-5 text-muted-foreground" />
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { SettingsIntegrations2 };
