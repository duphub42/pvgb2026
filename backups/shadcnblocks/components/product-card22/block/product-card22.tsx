"use client";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BatteryFull,
  Droplet,
  Eye,
  ShoppingCart,
  Star,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Image = {
  src: string;
  alt: string;
};

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface Product {
  images: [Image, Image, Image, Image];
  link: string;
  rate: string;
  brand: {
    text: string;
    link: string;
  };
  name: string;
  price: ProductPrice;
  variants?: {
    image: Image;
    link: string;
  }[];
  specs: {
    icon: LucideIcon;
    title: string;
    detail: string;
  }[];
}

interface VariantsLinksProps {
  variants?: {
    image: Image;
    link: string;
  }[];
}

interface ProductSpecsProps {
  specs: {
    icon: LucideIcon;
    title: string;
    detail: string;
  }[];
}

const PRODUCT_CARD: Product = {
  images: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-IGO10LkxP_g-unsplash-2.jpg",
      alt: "",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov--TRXQf4GsGY-unsplash-2.jpg",
      alt: "",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-DAGss-dkVOs-unsplash-2.jpg",
      alt: "",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-5BDqNsOroRw-unsplash-2.jpg",
      alt: "",
    },
  ],
  link: "#",
  rate: "5.0",
  brand: {
    text: "Eterna",
    link: "#",
  },
  name: "Horizon Smart Watch",
  price: {
    regular: 399.0,
    sale: 299.0,
    currency: "USD",
  },
  variants: [
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/smart-watch-1.png",
        alt: "",
      },
      link: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/smart-watch-2.png",
        alt: "",
      },
      link: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/smart-watch-3.png",
        alt: "",
      },
      link: "#",
    },
  ],
  specs: [
    {
      icon: BatteryFull,
      title: "Battery Life",
      detail: "20h",
    },
    {
      icon: Activity,
      title: "Fitness",
      detail: "Steps + HR",
    },
    {
      icon: Wifi,
      title: "Connectivity",
      detail: "BT + Wi-Fi",
    },
    {
      icon: Droplet,
      title: "Waterproof",
      detail: "50m",
    },
  ],
};

interface ProductCard22Props {
  className?: string;
}

const ProductCard22 = ({ className }: ProductCard22Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const [zone, setZone] = useState<number>(0);
  const { regular, sale, currency } = PRODUCT_CARD.price;

  useEffect(() => {
    const el = carouselContentRef.current;
    if (!el) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const third = rect.width / 3;

        setZone((prev) => {
          const nextZone = x < third ? 1 : x < third * 2 ? 2 : 3;
          return prev === nextZone ? prev : nextZone;
        });
      });
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const el = carouselContentRef.current;
    if (!api || !el) return;

    const handleMouseLeave = () => {
      setTimeout(() => {
        setZone(0);
      }, 25);
    };

    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api]);

  useEffect(() => {
    if (api) {
      api.scrollTo(zone);
    }
  }, [api, zone]);

  return (
    <Card
      className={cn(
        "group mx-auto max-w-80 overflow-hidden p-0 shadow-none",
        className,
      )}
    >
      <CardContent className="p-0">
        <div
          className="group/carousel relative overflow-hidden"
          ref={carouselContentRef}
        >
          <a href={PRODUCT_CARD.link} className="block">
            <Carousel opts={{ loop: true, watchDrag: false }} setApi={setApi}>
              <CarouselContent className="ml-0">
                {PRODUCT_CARD.images.map((img, index) => (
                  <CarouselItem
                    className="pl-0"
                    key={`product-card-22-img-${index}`}
                  >
                    <AspectRatio ratio={1} className="overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="block size-full object-cover object-center"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-x-0 bottom-3.5 z-10">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button className="rounded-full" size="lg">
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex max-w-25 translate-y-2 items-center justify-between rounded-full bg-background px-4 py-0.5 opacity-0 shadow transition-all duration-500 group-hover/carousel:translate-y-0 group-hover/carousel:opacity-100">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={`${index}`}
                        className="flex size-6 items-center justify-center"
                      >
                        <div
                          className={cn(
                            "size-1.5 origin-center rounded-full border-2 border-primary bg-primary transition-all duration-200",
                            zone === index + 1 && "scale-150 bg-background",
                          )}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Carousel>
          </a>
          <div className="absolute end-5 top-5 opacity-100 transition-opacity duration-500 lg:group-hover:opacity-0">
            <div className="flex items-center gap-1.5 rounded-full bg-background px-4 py-2 shadow">
              <Star className="size-3.5 fill-amber-400 stroke-amber-400" />
              <p className="text-xs">{PRODUCT_CARD.rate}</p>
            </div>
          </div>
          <div className="absolute end-5 top-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-lg:hidden">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye />
            </Button>
          </div>
          <div className="absolute end-5 bottom-5 lg:hidden">
            <Button size="icon" className="rounded-full">
              <ShoppingCart />
            </Button>
          </div>
        </div>
        <div className="pt-6">
          <div className="space-y-2 px-5 pb-5 lg:px-7 lg:pb-8">
            <a className="block" href={PRODUCT_CARD.brand.link}>
              <p className="text-xs text-muted-foreground uppercase">
                {PRODUCT_CARD.brand.text}
              </p>
            </a>
            <div className="flex justify-between gap-2 max-lg:flex-col">
              <div className="flex-1">
                <a href={PRODUCT_CARD.link}>
                  <CardTitle className="text-xl leading-none font-medium">
                    {PRODUCT_CARD.name}
                  </CardTitle>
                </a>
              </div>
              <div className="shrink-0">
                <Price
                  className="flex-col items-start lg:items-end"
                  onSale={sale != null}
                >
                  <PriceValue
                    price={sale}
                    currency={currency}
                    variant="sale"
                    className="font-medium text-rose-500"
                  />
                  <PriceValue
                    price={regular}
                    currency={currency}
                    variant="regular"
                    className={sale ? "text-sm" : ""}
                  />
                </Price>
              </div>
            </div>
            <div className="pt-2">
              <VariantsLinks variants={PRODUCT_CARD.variants} />
            </div>
          </div>
          <ProductSpecs specs={PRODUCT_CARD.specs} />
        </div>
      </CardContent>
    </Card>
  );
};

const VariantsLinks = ({ variants }: VariantsLinksProps) => {
  if (!variants) return;

  return (
    <ul className="flex flex-wrap gap-2">
      {variants.map((variant, index) => (
        <li key={`product-card-22-variant-${index}`}>
          <a
            href={variant.link}
            className="block size-8 overflow-hidden rounded-sm border"
          >
            <img
              src={variant.image.src}
              alt={variant.image.alt}
              className="block size-full object-cover object-center"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

const ProductSpecs = ({ specs }: ProductSpecsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!specs) return;
  return (
    <Carousel
      opts={{
        breakpoints: {
          "(min-width: 1024px)": {
            watchDrag: false,
          },
        },
      }}
      onMouseEnter={() =>
        isDesktop && api?.scrollTo(api.slideNodes().length - 1)
      }
      onMouseLeave={() => isDesktop && api?.scrollTo(0)}
      setApi={setApi}
      className="bg-background py-3 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:h-full before:w-14 before:bg-gradient-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:h-full after:w-14 after:bg-gradient-to-l after:from-background after:to-transparent"
    >
      <CarouselContent className="ml-0">
        {specs.map((item, index) => (
          <CarouselItem
            className="basis-40 pl-0 not-last:border-r first:pl-5 last:pr-5"
            key={`product-card-22-specs-${index}`}
          >
            <div className="flex items-start gap-2 px-5 py-2">
              <item.icon className="size-6 stroke-muted-foreground" />
              <div className="space-y-1">
                <div className="cursor-default text-xs leading-none font-medium">
                  {item.detail}
                </div>
                <div className="cursor-default text-xs leading-none text-muted-foreground">
                  {item.title}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export { ProductCard22 };
