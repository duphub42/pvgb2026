"use client";

import { Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PromoBanner7Props {
  endTime?: Date;
  totalStock?: number;
  soldStock?: number;
  className?: string;
}

const PromoBanner7 = ({
  endTime,
  totalStock = 100,
  soldStock = 73,
  className,
}: PromoBanner7Props) => {
  const defaultEndTime = useMemo(
    () => new Date(Date.now() + 6 * 60 * 60 * 1000),
    [],
  );
  const targetTime = endTime ?? defaultEndTime;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const soldPercentage = (soldStock / totalStock) * 100;
  const remaining = totalStock - soldStock;

  return (
    <div className={cn("w-full bg-primary text-primary-foreground", className)}>
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <Zap className="size-4 fill-current" />
            <span className="font-semibold">Flash Sale</span>
          </div>

          <div className="flex items-center gap-2 font-mono font-bold">
            <span>{pad(timeLeft.hours)}</span>
            <span className="animate-pulse">:</span>
            <span>{pad(timeLeft.minutes)}</span>
            <span className="animate-pulse">:</span>
            <span>{pad(timeLeft.seconds)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Progress
              value={soldPercentage}
              className="h-2 w-20 bg-primary/80 [&>div]:bg-white"
            />
            <span className="text-sm">
              <span className="font-semibold">{remaining}</span> left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PromoBanner7 };
