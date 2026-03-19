"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Waitlist2Props {
  logo?: string;
  badge?: string;
  heading?: string;
  description?: string;
  avatars?: string[];
  joinedPeople?: number;
  launchDate?: string;
  className?: string;
}

const SignupForm = () => {
  return (
    <div className="relative mt-8 w-full max-w-md overflow-hidden rounded-xl p-px md:rounded-lg">
      <div
        style={{
          background:
            "conic-gradient(transparent 70%, var(--color-blue-500) 90%)",
          animationDuration: "4s",
        }}
        className="absolute top-1/2 aspect-square w-full -translate-y-1/2 scale-200 animate-spin opacity-70"
      />
      <form className="relative z-10 flex w-full flex-col items-center gap-2 rounded-xl bg-background p-2 md:flex-row md:rounded-lg md:p-1">
        <Input className="w-full" required type="email" placeholder="Email" />
        <Button type="submit" className="w-full md:w-auto">
          Join waitlist
        </Button>
      </form>
    </div>
  );
};

interface JoinedPeopleProps {
  joinedPeople: number;
  avatars: string[];
}

const JoinedPeople = ({ joinedPeople, avatars }: JoinedPeopleProps) => {
  return (
    <div className="mt-4 flex items-center">
      <div className="relative flex flex-col items-center gap-2 md:flex-row md:gap-4">
        <div className="flex items-center">
          {avatars.map((avatar, index) => {
            return (
              <div key={`waitlist-avatar-${index}`} className="h-8 w-6">
                <div className="size-8">
                  <img
                    src={avatar}
                    alt={`Joined person ${index + 1}`}
                    className="size-full shrink-0 rounded-full bg-background object-cover object-top p-0.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          {joinedPeople.toLocaleString()}+ people already signed up
        </p>
      </div>
    </div>
  );
};

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          day: days,
          hour: hours,
          minute: minutes,
          second: seconds,
        });
      } else {
        setTimeLeft({ day: 0, hour: 0, minute: 0, second: 0 });
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <div className="flex justify-center gap-6">
        {Object.entries(timeLeft).map(([key, value]) => {
          return (
            <React.Fragment key={`waitlist-timer-${key}`}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl">{value}</span>
                <span className="text-xs text-muted-foreground uppercase">
                  {key}
                  {value > 1 ? "s" : ""}
                </span>
              </div>
              <span className="text-muted-foreground last:hidden">:</span>
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="text-muted-foreground" size={14} />
        <span className="text-xs leading-0 uppercase">
          Time remaining until launch
        </span>
      </div>
    </div>
  );
};

const Waitlist2 = ({
  logo = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg",
  badge = `COMING SOON IN ${new Date().getFullYear() + 1}`,
  heading = "Join the waitlist",
  description = "Be the first to know when we launch. Get exclusive early access and special benefits.",
  avatars = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/nima-motaghian-nejad-_omdf_EgRUo-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/good-faces-xmSWVeGEnJw-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/christian-buehner-DItYlc26zVI-unsplash 1.png",
  ],
  joinedPeople = 12500,
  launchDate = `01/01/${new Date().getFullYear() + 1}`,
  className,
}: Waitlist2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary p-2">
              <img src={logo} alt="Logo" className="size-full" />
            </div>
            <Badge variant="outline">
              <div className="relative flex items-center justify-center">
                <span className="size-1.5 rounded-full bg-primary" />
                <motion.span
                  initial={{
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    scale: 2,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.5,
                  }}
                  className="absolute size-1.5 rounded-full bg-primary"
                />
              </div>
              {badge}
            </Badge>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <h3 className="text-center text-3xl font-medium lg:text-4xl">
              {heading}
            </h3>
            <p className="max-w-md text-center text-muted-foreground">
              {description}
            </p>
          </div>

          <SignupForm />

          <JoinedPeople joinedPeople={joinedPeople} avatars={avatars} />

          <CountdownTimer targetDate={launchDate} />
        </div>
      </div>
    </section>
  );
};

export { Waitlist2 };
