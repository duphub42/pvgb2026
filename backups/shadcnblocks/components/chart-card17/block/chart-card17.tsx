"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartCard17Props {
  title?: string;
  description?: string;
  value?: number;
  max?: number;
  unit?: string;
  className?: string;
}

const chartConfig = {
  value: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ChartCard17 = ({
  title = "Performance Score",
  description = "Current system performance",
  value = 73,
  max = 100,
  unit = "",
  className,
}: ChartCard17Props) => {
  const percentage = Math.round((value / max) * 100);
  const chartData = [{ value: percentage, fill: "var(--chart-1)" }];

  // Semi-circle: starts at 180° (left), ends at 0° (right)
  // Progress fills from left to right based on percentage
  const startAngle = 180;
  const endAngle = 180 - (180 * percentage) / 100;

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-2/1 h-40 w-80"
        >
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={100}
            outerRadius={140}
            cx="50%"
            cy="100%"
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {value}
                          {unit}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 8}
                          className="fill-muted-foreground text-sm"
                        >
                          out of {max}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="value"
              background={{ fill: "var(--muted)" }}
              cornerRadius={10}
            />
          </RadialBarChart>
        </ChartContainer>
        {/* Min/Max labels */}
        <div className="-mt-2 flex w-72 justify-between text-sm text-muted-foreground">
          <span>0</span>
          <span>{max}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { ChartCard17 };
