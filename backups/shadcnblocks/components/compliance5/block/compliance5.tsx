import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Compliance5Props {
  className?: string;
}

const Compliance5 = ({ className }: Compliance5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-16">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Industry-Leading Enterprise Compliance
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Meeting the highest compliance requirements for your business
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-3xl grid-cols-2 place-items-center gap-16 md:grid-cols-4">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/AICPA-SOC.svg"
              alt="AICPA SOC 2"
              className="max-h-32 dark:invert"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg"
              alt="ISO 27001"
              className="max-h-32 dark:invert"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/CCPA.svg"
              alt="CCPA"
              className="max-h-32 dark:invert"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/GDPR.svg"
              alt="GDPR"
              className="max-h-32 dark:invert"
            />
          </div>
          <div className="flex justify-center">
            <Button size="lg">
              Learn more <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compliance5 };
