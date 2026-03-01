"use client";

import { Activity, ArrowRight, Receipt, Zap } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import type { HeroFeatureIconsProps } from "@/lib/hero-feature-icons";

const Hero256 = ({
  badge = "Transform your business with intelligent revenue operations",
  heading = "Streamline your entire revenue lifecycle",
  buttonPrimary = {
    text: "Start free trial",
    href: "#",
  },
  buttonSecondary = {
    text: "Schedule a call",
    href: "#",
  },
  features = [
    {
      title: "Modelling",
      description:
        "Dynamic pricing models that adapt to market conditions and customer segments",
      icon: Zap,
      color: "bg-teal-500",
      href: "#",
    },
    {
      title: "Invoicing",
      description:
        "Seamless invoicing and payment processing with intelligent dunning management",
      icon: Receipt,
      color: "bg-blue-500",
      href: "#",
    },
    {
      title: "Analytics",
      description:
        "Real-time insights and forecasting to optimize your revenue streams",
      icon: Activity,
      color: "bg-purple-500",
      href: "#",
    },
  ],
  images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Revenue management dashboard showing analytics and metrics",
    },
  ],
  className,
}: HeroFeatureIconsProps) => {
  return (
    <section className={cn("space-y-8 py-24 lg:py-32", className)}>
      <div className="container space-y-14">
        {/* Main Hero Section */}
        <div className="relative">
          {/* Background Pattern - only for hero section */}
          <div
            className="absolute inset-0 hidden overflow-hidden md:block"
            style={{
              maskImage:
                "radial-gradient(ellipse 150% 200% at 100% 50%, black 0%, black 25%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 150% 200% at 100% 50%, black 0%, black 25%, transparent 65%)",
            }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Decorative Diamond Pattern - positioned on the right */}
            <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2">
              <div className="relative size-64">
                {/* Diamond pattern - circular arrangement */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 360) / 12;
                    const radius = 80;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    return (
                      <div
                        key={i}
                        className="absolute size-3 rotate-45 bg-muted-foreground/20"
                        style={{
                          transform: `translate(${x}px, ${y}px) rotate(45deg)`,
                        }}
                      />
                    );
                  })}
                </div>
                {/* Inner circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 360) / 8;
                    const radius = 50;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    return (
                      <div
                        key={i}
                        className="absolute size-2 rotate-45 bg-muted-foreground/15"
                        style={{
                          transform: `translate(${x}px, ${y}px) rotate(45deg)`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="flex flex-col gap-8">
              {/* Badge */}
              <div className="flex w-fit items-center gap-2 border-b border-dashed">
                <div className="size-2 rounded-full bg-muted-foreground" />
                <p className="text-xs text-muted-foreground md:text-sm">
                  {badge}
                </p>
              </div>

              {/* Heading */}
              <h1 className="text-4xl leading-tight tracking-tight lg:text-6xl">
                {heading}
              </h1>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                {buttonPrimary && (
                  <Button asChild size="lg" className="rounded-lg shadow-md">
                    <a href={buttonPrimary.href}>{buttonPrimary.text}</a>
                  </Button>
                )}
                {buttonSecondary && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-lg shadow-md"
                  >
                    <a href={buttonSecondary.href}>{buttonSecondary.text}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="flex max-w-3xl flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-start px-4 py-2 md:py-0 ${index < features.length - 1 ? "border-b border-dashed md:border-r md:border-b-0" : ""}`}
            >
              {/* Feature Card Link */}
              <a
                href={feature.href}
                className="group flex w-full flex-col gap-4 transition-opacity hover:opacity-80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div
                      className={`${feature.color} flex size-6 items-center justify-center rounded-lg p-1 text-primary-foreground`}
                    >
                      <feature.icon className="size-5" />
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>

                  <ArrowRight className="size-6 shrink-0 text-muted-foreground" />
                </div>
                {/* Description */}
                <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
                  {feature.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div>
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="aspect-video h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export { Hero256 };
