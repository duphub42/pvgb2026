"use client";

import { type SVGProps, useEffect, useId, useState } from "react";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Charter's platform delivers unmatched speed, a flexible account framework, and an API-first design. Their deep understanding of the ecosystem has been crucial for scaling our financial operations effectively.",
    author: "Henry Francis",
    role: "Founder, Vercel",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
  },
  {
    id: 2,
    quote:
      "Charter's API-first approach and robust infrastructure have transformed our financial operations completely. The platform's flexibility and speed have enabled us to build exactly what we need efficiently and securely.",
    author: "David Chen",
    role: "Head of Engineering, Astro",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
  },
  {
    id: 3,
    quote:
      "Charter's platform has exceeded our expectations with its seamless integration process and exceptional support team. Their powerful tools and robust infrastructure have been instrumental in our scaling journey.",
    author: "Sarah Williams",
    role: "CTO, Figma",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
  },
  {
    id: 4,
    quote:
      "Charter has revolutionized how we manage our financial infrastructure effectively. Their API-first approach and robust platform capabilities have given us the flexibility to build custom solutions at scale seamlessly and efficiently.",
    author: "Michael Ross",
    role: "CEO, Supabase",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
  },
  {
    id: 5,
    quote:
      "The combination of Charter's flexible platform architecture and exceptional support team has been transformative for our operations. Their speed, reliability, and scalability are unmatched in the industry.",
    author: "Emily Chen",
    role: "Product Lead, Shadcn/ui",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
  },
];

interface Testimonial26Props {
  className?: string;
}

const Testimonial26 = ({ className }: Testimonial26Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className={cn("relative py-32", className)}>
      <div className="container max-w-4xl">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex cursor-grab flex-col gap-6 lg:gap-8"
              >
                <blockquote className="font-hubot-sans pointer-events-none text-2xl leading-relaxed font-semibold tracking-tight text-balance select-none md:text-3xl lg:text-4xl">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  {testimonial.logo && (
                    <div className="relative h-8 w-24">
                      <img
                        src={testimonial.logo}
                        alt={`${testimonial.author}'s company logo`}
                        className="object-contain dark:invert"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="h-8 w-[1px] bg-border" aria-hidden="true" />
                  <div>
                    <cite className="font-semibold not-italic">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm font-medium text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className="mt-10 flex gap-2 lg:mt-16"
          role="tablist"
          aria-label="Testimonials navigation"
        >
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              className={cn(
                "size-4 cursor-pointer rounded-full transition-colors duration-300",
                index === current
                  ? "bg-muted-foreground"
                  : "bg-muted-foreground/20 hover:bg-muted-foreground/50",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === current}
              role="tab"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-16 isolate z-[-1] h-[300px] md:top-28 lg:top-32">
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-linear-to-b from-background via-background/40 to-transparent" />
        <PlusSigns className="size-full text-foreground/[0.05]" />
      </div>
    </section>
  );
};

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 18;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 4;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export { Testimonial26 };
