import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type IconType = "dollar" | "users" | "cart" | "trending";

interface StatsCard5Props {
  title?: string;
  value?: string;
  subtitle?: string;
  icon?: IconType;
  className?: string;
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  cart: ShoppingCart,
  trending: TrendingUp,
};

const StatsCard5 = ({
  title = "Total Revenue",
  value = "$45,231",
  subtitle = "+20.1% from last month",
  icon = "dollar",
  className,
}: StatsCard5Props) => {
  const Icon = iconMap[icon];

  return (
    <Card className={cn("w-full max-w-xs", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-md bg-primary/10 p-2">
          <Icon className="size-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export { StatsCard5 };
