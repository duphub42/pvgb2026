import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HeroFeatureIconsProps } from "@/lib/hero-feature-icons";
import { cn } from "@/lib/utils";

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ],
        )}
      />
    </div>
  );
};

const Hero261 = ({
  heading = "Build faster with Shadcnblocks",
  description = "Components and blocks built with shadcn/ui, Tailwind CSS & React for modern product teams.",
  buttonPrimary = {
    text: "Get started",
    href: "#",
  },
  buttonSecondary = {
    text: "Learn more",
    href: "#",
  },
  features = [
    {
      title: "Tailored workflows",
      description: "Track progress across custom issue flows for your team.",
      icon: CircleDot,
    },
    {
      title: "Cross-team projects",
      description: "Collaborate across teams and departments.",
      icon: Blend,
    },
    {
      title: "Milestones",
      description: "Break projects down into concrete phases.",
      icon: Diamond,
    },
    {
      title: "Progress insights",
      description: "Track scope, velocity, and progress over time.",
      icon: ChartNoAxesColumn,
    },
  ],
  images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/dashboard/kanban-ui-dashboard-mainline.png",
      alt: "Product dashboard preview",
    },
  ],
  className,
}: HeroFeatureIconsProps) => {
  return (
    <section
      className={cn("overflow-hidden py-28 lg:py-32 lg:pt-44", className)}
    >
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="max-w-160 text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {heading}
          </h1>

          {description && (
            <p className="mt-5 text-xl text-muted-foreground md:text-3xl">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            {buttonPrimary && (
              <Button asChild>
                <a href={buttonPrimary.href}>{buttonPrimary.text}</a>
              </Button>
            )}
            {buttonSecondary && (
              <Button variant="outline" asChild>
                <a href={buttonSecondary.href}>
                  {buttonSecondary.text}
                  <ArrowRight className="size-4 stroke-3" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right side - Features */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features?.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="mt-1 size-4 shrink-0 text-primary lg:size-5" />
                <div>
                  <h2 className="font-semibold text-foreground">
                    {feature.title}
                  </h2>
                  <p className="max-w-76 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
        <div className="relative h-[793px] w-full">
          {/* Light grid mask background */}
          <div className="absolute -top-32 left-1/2 h-96 w-screen -translate-x-1/2 [background-image:repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_8px),repeating-linear-gradient(0deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] [background-size:24px_1px,1px_24px] text-primary opacity-10" />
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="absolute inset-0 size-full rounded-2xl object-cover object-top-left shadow-lg max-lg:rounded-tr-none"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero261 };
