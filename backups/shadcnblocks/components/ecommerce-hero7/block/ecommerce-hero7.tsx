"use client";

import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Price,
  type PriceType,
  PriceValue,
} from "@/components/shadcnblocks/price";
import { Rating } from "@/components/shadcnblocks/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Image = {
  src: string;
  srcset?: string;
  sizes?: string;
  alt: string;
};

interface Reviews {
  rate: number;
  totalReviewers: string;
}

type Product = {
  name: string;
  category: {
    label: string;
    link: string;
  };
  images: Array<Image>;
  link: string;
  price: PriceType;
  reviews: Reviews;
  badges?: Array<string>;
};

type ProductCardProps = Product;

interface HeroCarouselItem {
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  product?: Product;
}

interface EcommerceHero7Props {
  className?: string;
  carouselItems: HeroCarouselItem[];
}
const HERO_CAROUSEL: HeroCarouselItem[] = [
  {
    title: "Deep Hydration, Visible Glow",
    description:
      "A lightweight daily cream that replenishes moisture, smooths texture, and leaves skin naturally radiant.",
    media: {
      type: "video",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/4153586-hd_1366_720_50fps.mp4",
    },
    cta: {
      label: "Shop Now",
      href: "#",
    },
    product: {
      name: "LumaGlow Hydrating Cream",
      category: {
        label: "Face Cream",
        link: "#",
      },
      badges: ["Best Seller", "New"],
      reviews: {
        rate: 4.5,
        totalReviewers: "5.8k",
      },
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/point-normal-Xp0bTCLD07k-unsplash-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/point-normal-Xp0bTCLD07k-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/point-normal-Xp0bTCLD07k-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/point-normal-Xp0bTCLD07k-unsplash-1.jpg 640w",
          alt: "Hydrating face cream in minimal packaging",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/onela-ymeri-vaQgJjd9TUY-unsplash-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/onela-ymeri-vaQgJjd9TUY-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/onela-ymeri-vaQgJjd9TUY-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/onela-ymeri-vaQgJjd9TUY-unsplash-1.jpg 640w",
          alt: "Cream texture and application detail",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
      ],
      link: "#",
      price: {
        regular: 49.0,
        currency: "USD",
      },
    },
  },
  {
    title: "Your Complete Glow Routine",
    description:
      "A curated skincare set designed to cleanse, hydrate, and restore for a balanced, luminous complexion.",
    media: {
      type: "image",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-3.jpg",
    },
    cta: {
      label: "Shop Now",
      href: "#",
    },
    product: {
      name: "Radiance Ritual Set",
      category: {
        label: "Skincare Set",
        link: "#",
      },
      badges: ["Best Seller", "New"],
      reviews: {
        rate: 5,
        totalReviewers: "5.8k",
      },
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-amelie-chen-243775000-12352170-1.jpg 640w",
          alt: "Complete skincare set arranged on neutral background",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/ibnu-ihza-Z7u2bpbE65Q-unsplash-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/ibnu-ihza-Z7u2bpbE65Q-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/ibnu-ihza-Z7u2bpbE65Q-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/ibnu-ihza-Z7u2bpbE65Q-unsplash-1.jpg 640w",
          alt: "Skincare bottles styled for daily routine",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
      ],
      link: "#",
      price: {
        regular: 499.0,
        sale: 389.0,
        currency: "USD",
      },
    },
  },
  {
    title: "Lock In Radiance",
    description:
      "A refreshing mist that seals hydration, boosts glow, and keeps skin looking fresh all day.",
    media: {
      type: "image",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-3.jpg",
    },
    cta: {
      label: "Shop Now",
      href: "#",
    },
    product: {
      name: "Radiant Lock Mist",
      category: {
        label: "Face Mist",
        link: "#",
      },
      badges: ["New"],
      reviews: {
        rate: 5,
        totalReviewers: "5.8k",
      },
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/pexels-rdne-8903695-1.jpg 640w",
          alt: "Facial mist being applied for hydration",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/nora-hutton-AjU6Z5k_uBI-unsplash-3.jpg",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/nora-hutton-AjU6Z5k_uBI-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/nora-hutton-AjU6Z5k_uBI-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/skin-care-product/nora-hutton-AjU6Z5k_uBI-unsplash-1.jpg 640w",
          alt: "Mist bottle styled with soft natural light",
          sizes:
            "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
        },
      ],
      link: "#",
      price: {
        regular: 69.0,
        currency: "USD",
      },
    },
  },
];

const EcommerceHero7 = ({
  className,
  carouselItems = HERO_CAROUSEL,
}: EcommerceHero7Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = (api: CarouselApi) => {
      if (!api) return;
      setCurrent(api?.selectedScrollSnap());
    };
    api.on("reInit", updateCurrent).on("select", updateCurrent);

    return () => {
      api.off("reInit", updateCurrent).off("select", updateCurrent);
    };
  }, [api]);

  return (
    <header className={cn("", className)}>
      <div className="relative">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent className="m-0">
            {carouselItems.map(
              ({ title, description, media, product, cta }, index) => (
                <CarouselItem className="group h-dvh min-h-170 p-0" key={index}>
                  <div className="relative flex size-full flex-col items-center justify-end px-4 py-25 after:absolute after:inset-0 after:block after:bg-black/20 lg:px-40">
                    <div
                      className={cn(
                        "relative z-10 w-full",
                        "flex flex-col gap-13 md:flex-row",
                        "md:items-end md:group-odd:flex-row-reverse",
                      )}
                    >
                      <div className="flex flex-1 flex-col gap-4 md:group-even:items-end md:group-even:justify-end">
                        <h1 className="font-serif text-5xl text-white md:text-6xl md:group-even:text-right lg:text-7xl">
                          {title}
                        </h1>
                        <p className="max-w-130 text-lg text-white md:group-even:text-right">
                          {description}
                        </p>
                        {cta && (
                          <Button
                            asChild
                            variant="secondary"
                            className="mt-1 self-start rounded-full md:group-even:self-end"
                          >
                            <a href={cta.href}>{cta.label}</a>
                          </Button>
                        )}
                      </div>
                      {product && (
                        <div className="md:basis-80">
                          <ProductCard {...product} />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0">
                      {media.type === "image" ? (
                        <img
                          src={media.src}
                          alt={media.alt}
                          className="block size-full object-cover object-center"
                        />
                      ) : (
                        <video
                          loop
                          muted
                          autoPlay
                          src={media.src}
                          className="block size-full object-cover object-center"
                        ></video>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <div className="pointer-events-none absolute bottom-12.5 contents flex w-full translate-y-1/2 items-center justify-between px-2 lg:top-1/2 lg:-translate-y-1/2 lg:px-12">
            <Button
              size="icon"
              variant="ghost"
              className="pointer-events-auto size-12 rounded-full text-white"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="size-11 stroke-1" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => api?.scrollNext()}
              className="pointer-events-auto size-12 rounded-full text-white"
            >
              <ChevronRight className="size-11 stroke-1" />
            </Button>
          </div>
        </Carousel>
        <div className="absolute inset-x-0 bottom-12.5 translate-y-1/2">
          <ol className="flex items-center justify-center gap-3">
            {api?.scrollSnapList().map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                data-state={current === index ? "active" : "inactive"}
                className="block size-2.5 rounded-full border border-primary data-[state=active]:bg-primary"
              ></button>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
};

const ProductCard = ({
  images,
  link,
  name,
  category,
  price,
  badges,
  reviews,
}: ProductCardProps) => {
  const { regular, sale, currency } = price;

  return (
    <Card className="group w-full rounded-none border-none bg-background p-0 shadow-none md:max-w-[57.5rem]">
      <CardContent className="flex flex-row p-0 md:flex-col">
        <div className="relative basis-30 self-stretch overflow-hidden md:basis-auto">
          <div className="absolute inset-x-0 top-0 z-20 max-md:hidden">
            {badges && (
              <ul className="flex flex-col gap-2 p-4">
                {badges.map((text, index) => (
                  <Badge
                    variant="secondary"
                    className="uppercase"
                    key={`product-list-13-card-badge-${index}`}
                  >
                    {text}
                  </Badge>
                ))}
              </ul>
            )}
          </div>
          <div className="size-full overflow-hidden md:aspect-[0.8]">
            {images.map((img, index) => (
              <img
                key={`product-list-13-card-img-${index}`}
                srcSet={img.srcset}
                src={img.src}
                sizes={img.sizes}
                alt={img.alt}
                className="absolute inset-0 size-full origin-center object-cover object-center transition-all duration-500 group-hover:scale-105 first:opacity-100 group-hover:first:not-only:opacity-0 nth-2:opacity-0 group-hover:nth-2:opacity-100"
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden max-md:hidden">
            <div className="flex gap-4 p-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full duration-350 lg:translate-y-[calc(100%+1rem)] lg:transition-transform lg:group-hover:translate-y-0"
              >
                <ShoppingBag />
              </Button>
              <CardAction className="flex-1 translate-y-[calc(100%+1rem)] transition-transform duration-350 group-hover:translate-y-0">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full rounded-full"
                >
                  Quick View
                </Button>
              </CardAction>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-2 py-4">
          <a
            href={category.link}
            className="mb-2 text-sm leading-normal font-light uppercase"
          >
            {category.label}
          </a>
          <div className="flex items-start justify-between gap-4 max-md:flex-col">
            <CardTitle className="flex-1">
              <a href={link} className="leading-normal font-medium">
                {name}
              </a>
            </CardTitle>
            <Price onSale={sale != null} className="gap-1 text-lg">
              <PriceValue price={sale} currency={currency} variant="sale" />
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
            </Price>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <Rating
              className="[&_svg]:size-3.5 [&>div]:size-3.5"
              rate={reviews.rate}
            />
            <p className="text-xs leading-relaxed text-muted-foreground uppercase">
              {reviews.totalReviewers} Reviews
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { EcommerceHero7 };
