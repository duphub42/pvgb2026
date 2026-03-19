"use client";

import { Bar, BarChart, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartCard12Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { quarter: "Q1", revenue: 4200, costs: 2800, profit: 1400 },
  { quarter: "Q2", revenue: 5100, costs: 3200, profit: 1900 },
  { quarter: "Q3", revenue: 4800, costs: 3000, profit: 1800 },
  { quarter: "Q4", revenue: 6200, costs: 3800, profit: 2400 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  costs: {
    label: "Costs",
    color: "var(--chart-2)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ChartCard12 = ({
  title = "Quarterly Breakdown",
  description = "Revenue, costs, and profit by quarter",
  className,
}: ChartCard12Props) => {
  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="revenue"
              stackId="a"
              fill="var(--color-revenue)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="costs"
              stackId="a"
              fill="var(--color-costs)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="profit"
              stackId="a"
              fill="var(--color-profit)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ChartCard12 };
