"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface PromoBanner5Props {
  endTime?: Date;
  message?: string;
  description?: string;
  className?: string;
}

const PromoBanner5 = ({
  endTime,
  message = "Flash Sale Ends In",
  description = "Up to 50% off on selected items",
  className,
}: PromoBanner5Props) => {
  const defaultEndTime = useMemo(
    () => new Date(Date.now() + 24 * 60 * 60 * 1000),
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

  return (
    <div className={cn("w-full bg-primary text-primary-foreground", className)}>
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium">{message}</span>
          <div className="flex items-center gap-1 font-mono text-lg font-bold">
            <span className="rounded bg-primary/80 px-2 py-0.5">
              {pad(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="rounded bg-primary/80 px-2 py-0.5">
              {pad(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="rounded bg-primary/80 px-2 py-0.5">
              {pad(timeLeft.seconds)}
            </span>
          </div>
          <span className="opacity-90">{description}</span>
        </div>
      </div>
    </div>
  );
};

export { PromoBanner5 };
