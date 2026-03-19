"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { HeroFeatureIconsProps, Image } from "@/lib/hero-feature-icons";
import { cn } from "@/lib/utils";

const DEFAULT_FEATURES = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    icon: CircleDot,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    icon: Diamond,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    icon: Blend,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    icon: ChartNoAxesColumn,
  },
];

const DEFAULT_IMAGES: [Image, ...Image[]] = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Kanban",
    label: "Kanban",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    alt: "Issues",
    label: "Issues",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    alt: "Add Issues",
    label: "Add Issues",
  },
];

const Hero187 = ({
  heading = "Shadcnblocks components for your next project",
  description = "Streamline is the fit-for-purpose tool for planning and building modern software products.",
  buttonPrimary = { text: "Get started", href: "#" },
  buttonSecondary = { text: "Documentation", href: "#" },
  features = DEFAULT_FEATURES,
  images = DEFAULT_IMAGES,
  className,
}: HeroFeatureIconsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const activeImages = images ?? DEFAULT_IMAGES;

  return (
    <section
      className={cn(
        "relative overflow-hidden py-32 dark:bg-gray-900",
        className,
      )}
    >
      {/* Gradient border */}
      <div className="relative container grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-linear-to-r from-transparent via-border to-border" />
        {/* Left side - Content */}
        <div className="space-y-8 lg:space-y-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {heading}
            </h1>

            <p className="mt-6 text-2xl font-medium text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-5">
            {features?.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                  <Icon className="mt-1 size-4 shrink-0 lg:size-5" />
                  <div>
                    <h2 className="font-semibold">{feature.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {buttonPrimary && (
              <Button asChild aria-label={buttonPrimary.text}>
                <a href={buttonPrimary.href}>{buttonPrimary.text}</a>
              </Button>
            )}
            {buttonSecondary && (
              <Button asChild variant="outline" className="max-sm:hidden">
                <a href={buttonSecondary.href}>
                  <span className="flex items-center gap-2 text-start whitespace-pre-wrap">
                    {buttonSecondary.text}
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </Button>
            )}
          </div>

          <SlideIndicator
            currentSlide={currentSlide}
            images={activeImages}
            className="mb-4! max-lg:hidden"
            api={api}
          />
        </div>

        {/* Right side - Carousel */}
        <div className="relative -mr-[max(2rem,calc((100vw-80rem)/2+2rem))] max-lg:translate-x-10">
          <Carousel
            className="size-full [&>div]:size-full"
            setApi={setApi}
            opts={{
              loop: true,
            }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          >
            <CarouselContent className="size-full">
              {activeImages.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="size-full min-h-[30rem] overflow-hidden rounded-t-xl object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <SlideIndicator
        currentSlide={currentSlide}
        images={activeImages}
        className="mt-6 mb-8 lg:hidden"
        api={api}
      />
    </section>
  );
};

interface SlideIndicatorProps {
  currentSlide: number;
  images: Array<{ label?: string }>;
  className?: string;
  api: CarouselApi | null;
}

const SlideIndicator = ({
  currentSlide,
  images,
  className,
  api,
}: SlideIndicatorProps) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 font-medium", className)}
    >
      <div className="">
        <span className="text-foreground-700">
          {currentSlide + 1} of {images.length} —{" "}
        </span>
        <span className="text-primary">{images[currentSlide].label}</span>
      </div>
      <div className="flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-0.5 w-6 rounded-full transition-colors",
              index === currentSlide
                ? "bg-primary"
                : "bg-primary/20 hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { Hero187 };
