"use client";

import { Check } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { cn } from "@/lib/utils";

import { Cover } from "@/components/shadcnblocks/cover";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Hero242Props {
  className?: string;
}

const Hero242 = ({ className }: Hero242Props) => {
  const features = [
    {
      title: "10x Faster Development",
      description: "Build and ship features 10x faster with our components.",
    },
    {
      title: "95% Time Savings",
      description: "Skip design phase and focus on business growth.",
    },
    {
      title: "700+ Ready Components",
      description: "Access 700+ production-ready blocks for any use case.",
    },
    {
      title: "24/7 Growth Support",
      description: "Get instant access to components that scale.",
    },
    {
      title: "Proven Conversion Rates",
      description: "Components designed to convert visitors into customers.",
    },
  ];

  const chartData = [
    { date: "2024-04-01", views: 372 },
    { date: "2024-04-02", views: 277 },
    { date: "2024-04-03", views: 287 },
    { date: "2024-04-04", views: 502 },
    { date: "2024-04-05", views: 663 },
    { date: "2024-04-06", views: 641 },
    { date: "2024-04-07", views: 425 },
    { date: "2024-04-08", views: 729 },
    { date: "2024-04-09", views: 169 },
    { date: "2024-04-10", views: 451 },
    { date: "2024-04-11", views: 677 },
    { date: "2024-04-12", views: 502 },
    { date: "2024-04-13", views: 722 },
    { date: "2024-04-14", views: 357 },
    { date: "2024-04-15", views: 290 },
    { date: "2024-04-16", views: 328 },
    { date: "2024-04-17", views: 806 },
    { date: "2024-04-18", views: 774 },
    { date: "2024-04-19", views: 423 },
    { date: "2024-04-20", views: 239 },
    { date: "2024-04-21", views: 337 },
    { date: "2024-04-22", views: 394 },
    { date: "2024-04-23", views: 368 },
    { date: "2024-04-24", views: 677 },
    { date: "2024-04-25", views: 465 },
    { date: "2024-04-26", views: 205 },
    { date: "2024-04-27", views: 803 },
    { date: "2024-04-28", views: 302 },
    { date: "2024-04-29", views: 555 },
    { date: "2024-04-30", views: 834 },
    { date: "2024-05-01", views: 385 },
    { date: "2024-05-02", views: 603 },
    { date: "2024-05-03", views: 437 },
    { date: "2024-05-04", views: 805 },
    { date: "2024-05-05", views: 871 },
    { date: "2024-05-06", views: 1018 },
    { date: "2024-05-07", views: 688 },
    { date: "2024-05-08", views: 359 },
    { date: "2024-05-09", views: 407 },
  ];

  const chartConfig = {
    views: {
      label: "Page Views",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <section className={cn("h-full w-screen overflow-hidden py-32", className)}>
      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="w-full space-y-5">
          <h1 className="mt-3 w-full max-w-2xl text-5xl font-medium font-semibold tracking-tighter lg:text-6xl">
            A Subscription build to fuel your <Cover>Growth</Cover>
          </h1>

          <p className="max-w-xl text-muted-foreground">
            Join 10,000+ developers who've accelerated their growth with our
            components. Average 40% faster time-to-market and 25% increase in
            conversion rates.
          </p>

          <div className="mt-10 mb-29 flex gap-2">
            <Button className="h-10 rounded-2xl">Get Started</Button>
            <Button variant="secondary" className="h-10 rounded-2xl">
              View on Github
            </Button>
          </div>
          <ul className="space-y-4">
            <li className="mb-3">
              <p className="font-semibold tracking-tight opacity-50">
                How we help you grow
              </p>
            </li>
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4 lg:items-center">
                <Check className="size-4" />
                <p className="font-medium tracking-tight">
                  {feature.title}
                  <span className="pl-2 opacity-30">{feature.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-full w-full rounded-2xl bg-muted p-6">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="views" fill="var(--chart-1)" />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
};

export { Hero242 };
