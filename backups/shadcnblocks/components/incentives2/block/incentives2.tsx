import type { LucideIcon } from "lucide-react";
import { Gift, Headphones, RefreshCw } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Incentive = {
  title: string;
  icon: LucideIcon;
  text: string;
  id: string;
};

type IncentivesSection = {
  list: Incentive[];
  title: string;
};

interface Incentives1Props extends IncentivesSection {
  className?: string;
}

const INCENTIVES_SECTION: IncentivesSection = {
  title: "Helpful Service, Easy Shopping",
  list: [
    {
      id: "1",
      title: "Tech Assistance",
      text: "Mon - Sun, 24h support",
      icon: Headphones,
    },
    {
      id: "2",
      title: "Quick Exchanges",
      text: "Returns processed within 60 days",
      icon: RefreshCw,
    },
    {
      id: "3",
      title: "Premium Wrapping",
      text: "Free wrapping over $100",
      icon: Gift,
    },
  ],
};

const Incentives2 = ({
  list = INCENTIVES_SECTION.list,
  title = INCENTIVES_SECTION.title,
  className,
}: Incentives1Props) => {
  return (
    <section className={cn("overflow-hidden bg-primary py-12.5", className)}>
      <div className="container">
        <div className="flex flex-col gap-10 md:items-center xl:grid xl:grid-cols-4 xl:gap-15">
          <h2 className="text-2xl leading-snug font-bold text-primary-foreground max-xl:text-center xl:text-3xl">
            {title}
          </h2>
          <div className="max-md:-mx-[calc((100vw-var(--breakpoint-sm)+4rem)/2)] max-sm:-mx-8 xl:col-span-3">
            <Carousel
              opts={{
                breakpoints: {
                  "(min-width: 768px)": {
                    active: false,
                  },
                },
                align: "center",
              }}
            >
              <CarouselContent className="ml-0 md:justify-center md:gap-7.5">
                {list.map(({ title, icon: Icon, text, id }) => (
                  <CarouselItem
                    key={id}
                    className="pl-0 sm:basis-100 md:shrink md:basis-1/3"
                  >
                    <div className="mx-auto flex w-full max-w-75 flex-col items-center gap-5">
                      <Icon className="size-10 stroke-primary-foreground stroke-1" />
                      <div className="space-y-3">
                        <h3 className="text-center text-lg font-bold text-primary-foreground xl:text-xl">
                          {title}
                        </h3>
                        <p className="text-center text-primary-foreground/80">
                          {text}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Incentives2 };
