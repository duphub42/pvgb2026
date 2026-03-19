import React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const awards = [
  {
    title: "Design Leadership Award",
    year: "2025",
  },
  {
    title: "Best Brand Refresh",
    year: "2025",
  },
  {
    title: "UX Excellence Award",
    year: "2024",
  },
  {
    title: "Innovation in Visual Identity",
    year: "2024",
  },
  {
    title: "Packaging Design Commendation",
    year: "2023",
  },
  {
    title: "Community Impact in Design",
    year: "2023",
  },
];

interface About12Props {
  className?: string;
}

const About12 = ({ className }: About12Props) => {
  return (
    <div className={cn("py-32", className)}>
      <div className="container">
        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-6">
          <div className="col-span-1 flex items-center gap-1 md:col-span-2">
            <span className="size-2 bg-primary" />
            <h1 className="font-mono text-sm text-muted-foreground">ABOUT</h1>
          </div>
          <div className="col-span-1 flex flex-col gap-8 md:col-span-4 md:gap-24">
            <p className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
              We build brands and digital experiences that tell your story and
              move your business forward.
            </p>
            <div className="flex flex-col gap-4 md:gap-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                alt="portrait"
                className="aspect-[6/8] rounded-xl object-cover md:max-w-md"
              />
              <p className="max-w-md text-muted-foreground">
                Beyond deliverables, we value long-term partnerships, learn from
                every collaboration, and turn small insights into meaningful
                change.
              </p>
            </div>
          </div>
        </section>
        <Separator className="my-16 md:my-32" />
        <section className="space-y-6">
          <div className="flex items-center gap-1">
            <span className="size-2 bg-primary" />
            <h1 className="font-mono text-sm text-muted-foreground">PROCESS</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-xl border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="aspect-square object-cover dark:invert"
                />
                <span className="absolute top-3 left-3 rounded-xs bg-primary px-2.5 py-1 font-mono text-sm text-primary-foreground">
                  01
                </span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="text-xl font-medium lg:text-2xl">Understand</h3>
                <p className="text-sm text-muted-foreground lg:text-base">
                  We start with research and conversations to clarify goals,
                  audience, and constraints.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-xl border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt="placeholder"
                  className="aspect-square object-cover dark:invert"
                />
                <span className="absolute top-3 left-3 rounded-xs bg-primary px-2.5 py-1 font-mono text-sm text-primary-foreground">
                  02
                </span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="text-xl font-medium lg:text-2xl">Design</h3>
                <p className="text-sm text-muted-foreground lg:text-base">
                  We craft directions and prototypes across identity, product,
                  and content with clear checkpoints.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-xl border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt="placeholder"
                  className="aspect-square object-cover dark:invert"
                />
                <span className="absolute top-3 left-3 rounded-xs bg-primary px-2.5 py-1 font-mono text-sm text-primary-foreground">
                  03
                </span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="text-xl font-medium lg:text-2xl">Deliver</h3>
                <p className="text-sm text-muted-foreground lg:text-base">
                  We deliver assets, guidelines, and ongoing support so the work
                  scales with you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Separator className="my-16 md:my-32" />
        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-6">
          <div className="col-span-1 flex items-center gap-1 md:col-span-2">
            <span className="size-2 bg-primary" />
            <h1 className="font-mono text-sm text-muted-foreground">
              MILESTONES
            </h1>
          </div>
          <div className="col-span-1 flex flex-col gap-6 md:col-span-4">
            <div className="flex flex-col justify-between gap-2 rounded-lg bg-muted p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-12">
              <span className="text-6xl font-medium lg:text-7xl">120+</span>
              <p className="text-primary/80 lg:max-w-md">
                Projects delivered across diverse industries, from food and
                beverage to fintech.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2 rounded-lg bg-muted p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-12">
              <span className="text-6xl font-medium lg:text-7xl">12+</span>
              <p className="text-primary/80 lg:max-w-md">
                Years building brands, improving processes, and shaping
                thoughtful, resilient systems.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-2 rounded-lg bg-muted p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-12">
              <span className="text-6xl font-medium lg:text-7xl">15+</span>
              <p className="text-primary/80 lg:max-w-md">
                Awards and press recognizing our craft and celebrating work with
                our clients.
              </p>
            </div>
          </div>
        </section>
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/studio-republic-fotKKqWNMQ4-unsplash.jpg"
          alt="placeholder"
          className="my-16 aspect-square w-full rounded-xl object-cover md:my-32 md:aspect-video"
        />
        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-6">
          <div className="col-span-1 flex items-center gap-1 md:col-span-2">
            <span className="size-2 bg-primary" />
            <h1 className="font-mono text-sm text-muted-foreground">AWARDS</h1>
          </div>
          <div className="col-span-1 flex flex-col gap-4 md:col-span-4">
            <Separator />
            {awards.map((award, index) => (
              <React.Fragment key={index}>
                <div key={index} className="flex items-center justify-between">
                  <p className="font-medium tracking-tight md:text-lg">
                    {award.title}
                  </p>
                  <p className="font-mono text-sm font-medium text-muted-foreground md:text-base">
                    {award.year}
                  </p>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </section>
        <Separator className="my-16 md:my-32" />
        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-6">
          <div className="col-span-1 flex items-center gap-1 md:col-span-2">
            <span className="size-2 bg-primary" />
            <h1 className="font-mono text-sm text-muted-foreground">
              TESTIMONIALS
            </h1>
          </div>
          <div className="flex flex-col gap-8 md:col-span-4 md:gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-medium tracking-tight md:text-5xl">
                &ldquo;They aligned our brand and product, and the impact was
                immediate across our teams and customers.&rdquo;
              </p>
              <p className="font-medium text-muted-foreground md:text-lg">
                Maya, COO at a global retailer
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="group relative overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg"
                  alt="placeholder"
                  className="transition-scale aspect-video scale-103 object-cover duration-400 group-hover:scale-101"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-all duration-400 group-hover:opacity-60 md:block" />
                <div className="absolute bottom-5 left-5 hidden translate-y-16 flex-col transition-transform duration-400 group-hover:translate-y-0 md:flex">
                  <p className="text-lg font-medium text-white">Case Study</p>
                  <p className="text-sm font-medium text-white/70">
                    Ecommerce Rebrand
                  </p>
                </div>
              </a>
              <div className="flex flex-col md:hidden">
                <p className="font-medium">Case Study</p>
                <p className="text-sm font-medium text-muted-foreground">
                  Ecommerce Rebrand
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { About12 };
