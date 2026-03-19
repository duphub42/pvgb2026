"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface StatsCard9Props {
  title?: string;
  monthlyValue?: string;
  annualValue?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  className?: string;
}

const StatsCard9 = ({
  title = "MRR",
  monthlyValue = "$12,450",
  annualValue = "$149,400",
  monthlyLabel = "Monthly recurring",
  annualLabel = "Annual recurring",
  className,
}: StatsCard9Props) => {
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <Card className={cn("w-full max-w-xs", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Tabs
          value={period}
          onValueChange={(v) => setPeriod(v as "monthly" | "annual")}
        >
          <TabsList className="h-7">
            <TabsTrigger value="monthly" className="px-2 text-xs">
              MRR
            </TabsTrigger>
            <TabsTrigger value="annual" className="px-2 text-xs">
              ARR
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {period === "monthly" ? monthlyValue : annualValue}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {period === "monthly" ? monthlyLabel : annualLabel}
        </p>
      </CardContent>
    </Card>
  );
};

export { StatsCard9 };
