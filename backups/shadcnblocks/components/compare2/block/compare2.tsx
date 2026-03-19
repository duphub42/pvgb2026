import { CheckCircle2, CircleMinus } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Compare2Props {
  className?: string;
}

const Compare2 = ({ className }: Compare2Props) => {
  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-semibold md:text-7xl">
            Product A vs. Product B: Making the Right Choice
          </h1>
          <p className="mx-auto max-w-4xl text-muted-foreground md:text-xl">
            Product A isn&apos;t just an alternative to Product B. It offers
            enhanced features and capabilities, making it easier to achieve your
            goals with a modern, intuitive interface designed for today&apos;s
            needs.
          </p>
        </div>
        <div className="mt-28">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-background p-6 shadow">
              <span className="flex items-center justify-center gap-2 font-medium">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="company logo"
                  className="h-7"
                />
                Product A
              </span>
              <Separator className="my-6" />
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Plan Available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Advanced Features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Partner Program
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Live Events
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Community Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Premium Support
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-border/40 p-6">
              <span className="flex items-center justify-center gap-2 font-medium">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="company logo"
                  className="h-7"
                />
                Product B
              </span>
              <Separator className="my-6" />
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Plan Available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Features
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Partner Program
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Live Events
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Community Access
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Premium Support
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold">
            Who is Product B suitable for?
          </h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            Product B is a reliable solution designed for basic needs and
            smaller teams. It provides essential functionality for those getting
            started or requiring fundamental features. While it offers a
            straightforward interface, it may lack some of the advanced
            capabilities needed for scaling operations or handling complex
            workflows.
          </p>
          <h2 className="mt-16 mb-4 text-3xl font-semibold">
            Key Differences and Considerations
          </h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            When choosing between Product A and Product B, consider your
            long-term needs and growth plans. Product A offers more advanced
            features, better scalability, and premium support options. While
            Product B might be suitable for basic use cases, Product A provides
            a more comprehensive solution for teams looking to expand and
            optimize their workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Compare2 };
