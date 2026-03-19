"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Hero70Props {
  className?: string;
}

const Hero70 = ({ className }: Hero70Props) => {
  return (
    <section className={cn("relative bg-background py-14", className)}>
      <div className="relative z-10 container mx-auto">
        <div className="py-8">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
            className="h-12 lg:h-16"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-10 py-10 lg:py-28">
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Design Subscription Monthly</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Rapid Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <CheckCircle className="size-6" />
              <span>Flexible Subscription</span>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="max-w-6xl text-4xl tracking-tighter text-foreground lg:text-7xl xl:text-9xl">
                The All You Can Design buffet to fuel your business growth
              </h1>
              <p className="text-lg text-foreground lg:text-2xl">
                Enjoy professional design expertise —{" "}
                <span className="font-semibold">
                  without the hefty price tag
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex h-fit items-center gap-[10px] self-start rounded-full border-2 border-black px-2 py-1.5 text-sm font-semibold lg:px-4 lg:py-3.5 lg:text-base"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
              alt=""
              className="size-9 rounded-full object-cover lg:size-11"
            />
            <span>Schedule a chat with me</span>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col">
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          plugins={[
            AutoScroll({
              speed: 1,
            }),
            Autoplay({
              playOnInit: true,
              delay: 1000,
            }),
          ]}
          className="relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']"
        >
          <CarouselContent className="ml-5 flex gap-5 pl-4">
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <Button
        variant="outline"
        className="relative z-10 mx-auto mt-10 flex h-fit items-center gap-2.5 rounded-full border-2 border-black px-4 py-3.5 text-sm font-semibold transition hover:bg-black hover:text-white lg:text-base"
      >
        <span>Explore my portfolio</span>
        <ArrowUpRight className="size-6!" />
      </Button>
    </section>
  );
};

export { Hero70 };
