"use client";

import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartCard23Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { x: 100, y: 200, name: "Product A" },
  { x: 120, y: 100, name: "Product B" },
  { x: 170, y: 300, name: "Product C" },
  { x: 140, y: 250, name: "Product D" },
  { x: 150, y: 400, name: "Product E" },
  { x: 110, y: 280, name: "Product F" },
  { x: 200, y: 320, name: "Product G" },
  { x: 180, y: 150, name: "Product H" },
  { x: 160, y: 350, name: "Product I" },
  { x: 190, y: 220, name: "Product J" },
  { x: 130, y: 180, name: "Product K" },
  { x: 220, y: 280, name: "Product L" },
];

const chartConfig = {
  x: {
    label: "Price ($)",
    color: "var(--chart-1)",
  },
  y: {
    label: "Units Sold",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ChartCard23 = ({
  title = "Price vs Sales",
  description = "Correlation between price and units sold",
  className,
}: ChartCard23Props) => {
  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Price"
              unit="$"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Units"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ZAxis range={[60, 60]} />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "x") return `Price: $${value}`;
                    if (name === "y") return `Units: ${value}`;
                    return `${name}: ${value}`;
                  }}
                />
              }
            />
            <Scatter data={chartData} fill="var(--chart-1)" fillOpacity={0.7} />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ChartCard23 };
