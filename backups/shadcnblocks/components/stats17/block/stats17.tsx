"use client";

import { TrendingUp } from "lucide-react";
import React from "react";
import { RadialBar, RadialBarChart } from "recharts";

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface StatItem {
  title: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    title: "100%",
    description: "Pre-Optimised for SEO",
  },
  {
    title: "750+",
    description: "Pre Built Blocks",
  },
  {
    title: "85k+",
    description: "Developers Trust",
  },
];

interface Stats17Props {
  className?: string;
}

const Stats17 = ({ className }: Stats17Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <p className="mb-4 rounded-full bg-muted px-2 py-1 text-xs uppercase">
          STATS
        </p>
        <h2 className="relative py-2 text-center font-sans text-4xl font-semibold tracking-tighter lg:text-5xl">
          Stats That Show the Difference
        </h2>
        <p className="mx-auto max-w-xl px-5 text-center text-sm text-muted-foreground lg:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut
        </p>

        <div className="mt-18 grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-full w-full">
            <ChartRadialSimple />
            <div className="mt-2 w-full flex-col items-center justify-center text-center text-sm">
              <div className="flex items-center justify-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="mt-2 leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </div>
          </div>
          <div className="mt-10 flex w-full flex-row items-center justify-between gap-4 md:mt-0 md:flex-col">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="flex w-25 flex-col items-center justify-center gap-2 text-center"
              >
                <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
                  {stat.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#8EC5FD",
  },
  safari: {
    label: "Safari",
    color: "#2B7FFC",
  },
  firefox: {
    label: "Firefox",
    color: "#165DFC",
  },
  edge: {
    label: "Edge",
    color: "#1448E6",
  },
  other: {
    label: "Other",
    color: "#193CB9",
  },
} satisfies ChartConfig;

const ChartRadialSimple = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <RadialBarChart data={chartData} innerRadius={30} outerRadius={150}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        <RadialBar dataKey="visitors" background />
      </RadialBarChart>
    </ChartContainer>
  );
};

export { Stats17 };
