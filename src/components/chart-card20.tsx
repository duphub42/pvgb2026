"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import { cn } from "@/lib/utils";

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

interface ChartCard20Props {
  title?: string;
  description?: string;
  className?: string;
}

const chartData = [
  { skill: "Design", value: 85 },
  { skill: "Frontend", value: 92 },
  { skill: "Backend", value: 78 },
  { skill: "DevOps", value: 65 },
  { skill: "Testing", value: 70 },
  { skill: "Communication", value: 88 },
];

const chartConfig = {
  value: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ChartCard20 = ({
  title = "Skill Assessment",
  description = "Competency scores across areas",
  className,
}: ChartCard20Props) => {
  return (
    <Card className={cn("max-w-2xl w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { ChartCard20 };
