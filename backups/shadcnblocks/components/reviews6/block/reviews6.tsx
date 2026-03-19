"use client";

import { useEffect, useState } from "react";

import {
  Price,
  type PriceType,
  PriceValue,
} from "@/components/shadcnblocks/price";
import { Rating } from "@/components/shadcnblocks/rating";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  image: string;
  price: PriceType;
  link: string;
};

type ReviewType = {
  image: string;
  rate: number;
  comment: string;
  author: string;
  product: Product;
};

interface Reviews6Props {
  title: string;
  overline?: string;
  reviews: ReviewType[];
  className?: string;
}

type ReviewCardProps = ReviewType;
type ProductCardProps = Product;

const REVIEWS: ReviewType[] = [
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Serene-Listening-2.png",
    rate: 5,
    comment:
      '"These headphones completely changed my daily routine. The sound is rich, the fit is perfect, and the noise isolation is impressive. I genuinely enjoy using them."',
    author: "Evan R.",
    product: {
      name: "AeroTone Wireless Headphones",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
      price: {
        regular: 566.0,
        currency: "USD",
      },
      link: "#",
    },
  },
  {
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Woman-Smiling-Indoors-2.png",
    rate: 5,
    comment:
      '"This smartphone feels like a real upgrade. The camera is sharp, the screen is gorgeous, and the performance is flawless. I absolutely love using it daily."',
    author: "Sofia L.",
    product: {
      name: "LumaEdge Pro Smartphone",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Sleek-Smartphone-Close-Up-1.png",
      price: {
        regular: 1566.0,
        currency: "USD",
      },
      link: "#",
    },
  },
];

const Reviews6 = ({
  reviews = REVIEWS,
  title = "+10000 Happy Customers",
  overline = "What Our Customers Say",
  className,
}: Reviews6Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    <section className={cn("bg-primary py-32", className)}>
      <div className="container space-y-7 lg:space-y-10">
        <div className="space-y-3 text-center">
          {overline && (
            <p className="leading-normal text-primary-foreground">{overline}</p>
          )}
          <h2 className="text-4xl font-bold text-primary-foreground lg:text-6xl">
            {title}
          </h2>
        </div>
        <div className="space-y-5">
          <Carousel setApi={setApi} className="group">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index}>
                  <ReviewCard {...review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <CarouselPrevious className="left-5" />
              <CarouselNext className="right-5" />
            </div>
          </Carousel>
          <div className="flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                data-state={current === index ? "active" : "inactive"}
                className="group flex size-5"
                key={index}
                onClick={() => {
                  onButtonClick(index);
                }}
              >
                <span className="m-auto block size-2 rounded-full bg-primary-foreground/50 group-data-[state=active]:bg-primary-foreground"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({
  image,
  product,
  rate,
  comment,
  author,
}: ReviewCardProps) => {
  return (
    <Card className="h-full max-h-fit min-h-132.5 overflow-hidden border-none p-0">
      <CardContent className="h-full p-0 lg:grid lg:grid-cols-2">
        <div className="relative max-md:flex max-md:flex-col">
          <div className="relative size-full overflow-hidden max-lg:aspect-[1.4]">
            <div className="absolute inset-0">
              <img
                src={image}
                alt={product.name}
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
          <div className="md:absolute md:bottom-4 md:left-4">
            <ProductCard {...product} />
          </div>
        </div>
        <div className="flex p-8 lg:px-20 lg:py-12">
          <div className="m-auto w-full space-y-4">
            <div className="w-fit max-lg:mx-auto">
              <Rating
                rate={rate}
                className="[&>svg]:fill-yellow-500 [&>svg]:stroke-yellow-500"
              />
            </div>
            <CardDescription className="text-xl leading-normal text-foreground max-lg:text-center lg:text-2xl">
              {comment}
            </CardDescription>
            <p className="text-sm font-semibold max-lg:text-center">
              - {author}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCard = ({ image, name, price }: ProductCardProps) => {
  const { regular, sale, currency } = price;

  return (
    <div className="min-h-31 border bg-background p-2 pr-8 md:max-w-100 md:rounded-xl md:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="shrink-0 basis-28">
          <div className="size-28 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="block size-full object-cover object-center"
            />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-base">{name}</h3>
          <Price className="text-sm font-semibold" onSale={!!sale}>
            <PriceValue variant="sale" price={sale} currency={currency} />
            <PriceValue variant="regular" price={regular} currency={currency} />
          </Price>
        </div>
      </div>
    </div>
  );
};

export { Reviews6 };
