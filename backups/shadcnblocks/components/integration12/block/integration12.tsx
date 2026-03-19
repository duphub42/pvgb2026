"use client";

import { ArrowLeftRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const permissions = [
  "View analytics and performance metrics",
  "Create and manage project milestones",
  "Assign and update team responsibilities",
  "Receive and respond to customer feedback",
  "Manage notification preferences and alerts",
];

interface Integration12Props {
  className?: string;
}

const Integration12 = ({ className }: Integration12Props) => {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center bg-muted py-32",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-0">
          <div className="flex w-full flex-col items-center gap-2 border-b pb-4">
            <div className="mt-2 mb-2 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background p-3 shadow">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                  alt="shadcn/ui"
                />
              </div>
              <ArrowLeftRight className="size-4" />
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background p-3 shadow">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                  alt="shadcn/ui"
                />
              </div>
            </div>
            <h1 className="text-center text-2xl font-semibold">
              Link shadcn/ui to Shadcnblocks
            </h1>
            <p className="mt-1 text-center text-base text-muted-foreground">
              Empower your team with seamless project tracking and real-time
              collaboration across platforms.
            </p>
          </div>
          <div className="w-full py-6">
            <ul className="space-y-3">
              {permissions.map((perm, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <Check className="size-4 text-primary" />
                  {perm}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full items-center justify-end gap-2 pb-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="button">Connect now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Integration12 };
