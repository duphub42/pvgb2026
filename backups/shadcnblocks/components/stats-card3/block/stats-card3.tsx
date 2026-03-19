import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatsCard3Props {
  title?: string;
  value?: number;
  target?: number;
  unit?: string;
  className?: string;
}

const StatsCard3 = ({
  title = "Monthly Goal",
  value = 7500,
  target = 10000,
  unit = "$",
  className,
}: StatsCard3Props) => {
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  const formattedValue = value.toLocaleString();
  const formattedTarget = target.toLocaleString();

  return (
    <Card className={cn("w-full max-w-xs", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {unit}
          {formattedValue}
        </div>
        <div className="mt-3 space-y-2">
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{percentage}% complete</span>
            <span>
              Target: {unit}
              {formattedTarget}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { StatsCard3 };
