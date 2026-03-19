"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Rating } from "@/components/shadcnblocks/rating";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ReviewType = {
  rate: number;
  title: string;
  comment?: string;
  verifiedBuyer?: boolean;
  author: string;
  image?: string;
  type?: "text" | "image";
};

interface Reviews8Props {
  reviews: ReviewType[];
  title: string;
  className?: string;
}

type ReviewCardProps = ReviewType;

const REVIEWS: ReviewType[] = [
  {
    rate: 4,
    title: "Thoughtful design you can feel.",
    comment:
      "Each piece has a quiet elegance to it. You can tell a lot of care went into the craftsmanship. Subtle, functional, and beautifully made.",
    author: "Luca M.",
    verifiedBuyer: false,
    type: "text",
  },
  {
    rate: 5,
    title: "Minimalist, but full of character.",
    author: "Joanne E.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Fashionable-Woman-in-Monochrome-Attire-1.png",
    type: "image",
  },

  {
    rate: 4,
    title: "Perfect balance of style and utility.",
    comment:
      "I love how everything feels intentional—nothing extra, nothing missing. These pieces add personality to my home without overwhelming the space.",
    author: "Luca M.",
    verifiedBuyer: false,
    type: "text",
  },
  {
    rate: 5,
    title: "Timeless and beautifully photographed.",
    author: "Joanne E.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Jewelry-Portrait-1.png",
    type: "image",
  },

  {
    rate: 4,
    title: "Elevates the everyday.",
    comment:
      "It’s rare to find décor that feels artistic yet practical. These items fit seamlessly into my routine while still catching the eye.",
    author: "Luca M.",
    verifiedBuyer: false,
    type: "text",
  },
  {
    rate: 5,
    title: "Delicate, modern, and stunning.",
    author: "Joanne E.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Gold-Earrings-1.png",
    type: "image",
  },

  {
    rate: 4,
    title: "Crafted with real intention.",
    comment:
      "Nothing feels mass-produced. The textures, the weight, the finish—everything has a warmth and uniqueness you don’t see often.",
    author: "Luca M.",
    verifiedBuyer: false,
    type: "text",
  },
  {
    rate: 5,
    title: "Effortlessly elegant.",
    author: "Joanne E.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Watch-on-Womans-Wrist-1.png",
    type: "image",
  },
];

const Reviews8 = ({
  reviews = REVIEWS,
  title = "Genuine Voices, Honest Reviews",
  className,
}: Reviews8Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);

  const onButtonClick = (index: number) => {
    if (!api) return;
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) return;

    const updateCurrent = (api: CarouselApi) => {
      setCurrent(api?.selectedScrollSnap() ?? 0);
    };

    const updateScrollSnaps = (api: CarouselApi) => {
      setScrollSnaps(api?.scrollSnapList() ?? []);
    };

    updateCurrent(api);
    updateScrollSnaps(api);

    api
      .on("reInit", updateCurrent)
      .on("select", updateCurrent)
      .on("resize", updateScrollSnaps);

    return () => {
      api
        .off("reInit", updateCurrent)
        .off("select", updateCurrent)
        .off("resize", updateScrollSnaps);
    };
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container space-y-7.5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          <div className="flex gap-3 max-md:hidden">
            <Button
              onClick={() => api?.scrollPrev()}
              variant="outline"
              className="rounded-full"
              size="icon-lg"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => api?.scrollNext()}
              variant="outline"
              className="rounded-full"
              size="icon-lg"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <Carousel
            opts={{
              align: "start",
            }}
            setApi={setApi}
            className="[&>div]:overflow-visible"
          >
            <CarouselContent>
              {reviews.map(({ type, ...review }, index) => (
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/6"
                  key={index}
                >
                  {type === "image" ? (
                    <ImageReviewCard {...review} />
                  ) : (
                    <TextReviewCard {...review} />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex items-center justify-center gap-4 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                data-state={current === index ? "active" : "inactive"}
                className="h-2.5 w-2.5 rounded-full border transition-all data-[state=active]:w-5 data-[state=active]:border-primary"
                key={index}
                onClick={() => {
                  onButtonClick(index);
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TextReviewCard = ({
  rate,
  title,
  comment,
  author,
  verifiedBuyer,
}: ReviewCardProps) => {
  return (
    <Card className="h-full rounded-lg border-primary p-5">
      <CardContent className="space-y-5 p-0">
        <Rating className="[&_svg]:size-3 [&>div]:size-3" rate={rate} />
        <CardTitle className="leading-tight">{title}</CardTitle>
        <CardDescription className="leading-relaxed text-foreground">
          {comment}
        </CardDescription>
        <div>
          <p className="text-xs">{author}</p>
          <p className="text-xs text-muted-foreground">
            {verifiedBuyer ? "Verified Customer" : "Customer"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const ImageReviewCard = ({
  image,
  title,
  rate,
  author,
  verifiedBuyer,
}: ReviewCardProps) => {
  return (
    <Card className="h-full border-0 bg-background p-0 shadow-none">
      <CardContent className="space-y-5 p-0">
        <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="block size-full object-cover object-center"
          />
        </AspectRatio>
        <Rating className="[&_svg]:size-3 [&>div]:size-3" rate={rate} />
        <CardTitle className="leading-tight">{title}</CardTitle>
        <div>
          <p className="text-xs">{author}</p>
          <p className="text-xs text-muted-foreground">
            {verifiedBuyer ? "Verified Customer" : "Customer"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { Reviews8 };
