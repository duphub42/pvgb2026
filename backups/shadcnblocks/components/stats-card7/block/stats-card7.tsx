"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCard7Props {
  title?: string;
  value?: string;
  percentage?: number;
  label?: string;
  className?: string;
}

const StatsCard7 = ({
  title = "Storage Used",
  value = "75 GB",
  percentage = 75,
  label = "of 100 GB",
  className,
}: StatsCard7Props) => {
  const data = [
    { name: "used", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  return (
    <Card className={cn("w-full max-w-xs", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative size-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  <Cell fill="var(--chart-1)" />
                  <Cell fill="var(--muted)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold">{percentage}%</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { StatsCard7 };
