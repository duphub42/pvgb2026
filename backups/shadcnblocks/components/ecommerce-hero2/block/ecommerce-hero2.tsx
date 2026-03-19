import { ShoppingBag } from "lucide-react";

import {
  Price,
  type PriceType,
  PriceValue,
} from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MediaType = {
  src: string;
  alt: string;
};

type Product = {
  image: string;
  name: string;
  href: string;
  price: PriceType;
};

type HeroData = {
  title?: string;
  cta?: {
    label: string;
    href: string;
  };
  product?: Product;
  image?: MediaType;
  video?: MediaType;
}[];

type ProductCardProps = Product;

interface EcommerceHero2Props {
  className?: string;
  heroData: HeroData;
}

const HERO_DATA: HeroData = [
  {
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-7494671.jpg",
      alt: "Relaxed hoodie lifestyle shot",
    },
    title: "Everyday Comfort, Elevated Style",
    cta: {
      label: "Shop Hoodies",
      href: "#",
    },
  },
  {
    video: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3888261-hd_720_1366_50fps.mp4",
      alt: "Model wearing modern coat in motion",
    },
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-7494681.jpg",
      price: {
        regular: 780,
        sale: 420,
        currency: "USD",
      },
      name: "Modern Tailored Coat",
      href: "#",
    },
  },
];

const EcommerceHero2 = ({
  className,
  heroData = HERO_DATA,
}: EcommerceHero2Props) => {
  return (
    <header className={cn("py-32", className)}>
      <div className="h-dvh grid-cols-2 md:grid md:max-h-160 xl:max-h-200">
        {heroData.map(({ image, video, title, cta, product }, index) => (
          <div key={index} className="aspect-[0.7] md:aspect-auto">
            <div className="relative flex size-full flex-col justify-end p-6 after:absolute after:inset-0 after:size-full after:bg-black/20">
              {image && (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 block size-full object-cover object-center"
                />
              )}
              {video && (
                <video
                  src={video.src}
                  loop
                  muted
                  autoPlay
                  className="absolute inset-0 block size-full object-cover object-center"
                />
              )}
              <div className="relative z-10 space-y-6">
                {title && (
                  <h1 className="max-w-78 text-5xl tracking-tighter text-balance text-white">
                    {title}
                  </h1>
                )}
                {cta && (
                  <Button asChild variant="outline" size="lg">
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                )}
                {product && <ProductCard {...product} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

const ProductCard = ({ image, name, price, href }: ProductCardProps) => {
  const { regular, sale, currency } = price;

  return (
    <Card className="group max-w-86 flex-row gap-0 gap-4 rounded-none border-none p-0">
      <CardHeader className="block basis-22.5 gap-0 px-0">
        <div className="min-w-18">
          <AspectRatio className="overflow-hidden">
            <img
              src={image}
              alt={name}
              className="block size-full origin-center object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          </AspectRatio>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-0 py-3 pr-4">
        <div className="flex h-full items-center gap-3">
          <div className="flex-1 space-y-2">
            <CardTitle className="line-clamp-1 text-base leading-tight font-medium">
              <a href={href}>{name}</a>
            </CardTitle>
            <Price onSale={sale != null} className="text-xs font-semibold">
              <PriceValue
                price={sale}
                currency={currency}
                variant="sale"
                className="text-rose-600"
              />
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
                className="text-muted-foreground"
              />
            </Price>
          </div>
          <Button
            asChild
            size="icon-sm"
            variant="ghost"
            className="shrink-0 self-center rounded-full"
          >
            <a href={href}>
              <ShoppingBag />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { EcommerceHero2 };
