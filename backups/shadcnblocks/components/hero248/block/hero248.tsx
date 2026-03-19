"use client";

import { ArrowRight } from "lucide-react";

import { AnimatedTooltip } from "@/components/magicui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const people = [
  {
    id: 1,
    name: "Alex",
    designation: "Software Engineer",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
  },
  {
    id: 2,
    name: "Lisa",
    designation: "Product Designer",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
  },
  {
    id: 3,
    name: "Julia",
    designation: "UX Researcher",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg",
  },
];

interface Hero248Props {
  className?: string;
}

const Hero248 = ({ className }: Hero248Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Our team{" "}
              <span className="inline-flex items-start gap-4">
                <div className="relative flex items-start">
                  <div className="flex [&>div]:transition-transform [&>div]:duration-300 [&>div:hover]:rotate-0 [&>div:nth-child(1)]:-rotate-3 [&>div:nth-child(2)]:rotate-2 [&>div:nth-child(3)]:-rotate-1">
                    <AnimatedTooltip items={people} />
                  </div>
                </div>
              </span>
              <span className="ml-6">
                build human-centered digital products that inspire, engage, and
                perform.
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              From idea to execution — we craft intuitive experiences and
              scalable solutions that align with your business goals and truly
              connect with your audience. You hat do you want
            </p>
            <Button size="lg">
              Let’s Talk
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mx-auto max-w-xl lg:pt-4"></div>
        </div>
      </div>
    </section>
  );
};

export { Hero248 };
