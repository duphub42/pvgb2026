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

const Hero187b = ({
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
    <section className={cn("relative overflow-hidden py-32", className)}>
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Left side - Carousel */}
          <div className="relative order-2 lg:order-1">
            <Carousel
              className="size-full"
              setApi={setApi}
              opts={{
                loop: true,
              }}
              plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            >
              <CarouselContent>
                {activeImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full rounded-2xl object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <SlideIndicator
              currentSlide={currentSlide}
              images={activeImages}
              className="mt-6 lg:hidden"
              api={api}
            />
          </div>

          {/* Right side - Content */}
          <div className="order-1 space-y-8 lg:order-2 lg:space-y-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {heading}
              </h1>

              <p className="mt-6 text-xl leading-relaxed font-medium text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features?.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-3">
                    <div className="shrink-0">
                      <Icon className="mt-0.5 size-5 text-primary" />
                    </div>
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
                <Button asChild size="lg" aria-label={buttonPrimary.text}>
                  <a href={buttonPrimary.href}>{buttonPrimary.text}</a>
                </Button>
              )}
              {buttonSecondary && (
                <Button
                  asChild
                  aria-label={buttonSecondary.text}
                  variant="outline"
                  size="lg"
                >
                  <a href={buttonSecondary.href}>
                    <span className="flex items-center gap-2">
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
              className="max-lg:hidden"
              api={api}
            />
          </div>
        </div>
      </div>
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
      className={cn("flex flex-col items-start gap-2 font-medium", className)}
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

export { Hero187b };
