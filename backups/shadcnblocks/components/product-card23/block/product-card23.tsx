"use client";
import { Search } from "lucide-react";
import { useState } from "react";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type Image = {
  src: string;
  srcset?: string;
  alt: string;
  sizes?: string;
};

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

type ProductColorOptions = {
  images: Image[];
  id: string;
  value: string;
  colors: string[];
};

interface Product {
  images: Array<Image>;
  name: string;
  price: ProductPrice;
  brand: {
    text: string;
    link: string;
  };
  badges?: Array<string>;
  variantId?: string;
  link: string;
  variants?: Array<ProductColorOptions>;
}

interface ColorRadioGroupProps {
  options: ProductColorOptions[];
  onValueChange: (value: string) => void;
  value: string;
}

const PRODUCT_CARD: Product = {
  name: "Solstice Ceramic Mug",
  brand: {
    text: "Terra Clayworks",
    link: "#",
  },
  link: "#",
  price: { regular: 24.0, currency: "USD" },
  images: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-2.png",
      srcset:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-1.png 484w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-2.png 908w",
      sizes: "(min-width: 768px) 908px, 100vw",
      alt: "",
    },
  ],
  variantId: "product-1-1",
  badges: ["New"],
  variants: [
    {
      id: "product-1-1",
      value: "product-1-1",
      colors: ["#A5BFB1", "#E38035"],
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-1.png 484w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Ceramic-Mug-in-Sunlight-2.png 908w",
          sizes: "(min-width: 768px) 908px, 100vw",
          alt: "",
        },
      ],
    },
    {
      id: "product-1-2",
      value: "product-1-2",
      colors: ["#C12F06", "#32414C"],
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Colorful-Ceramic-Mug-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Colorful-Ceramic-Mug-1.png 484w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/Colorful-Ceramic-Mug-2.png 904w",
          sizes: "(min-width: 768px) 908px, 100vw",
          alt: "",
        },
      ],
    },
  ],
};

interface ProductCard23Props {
  className?: string;
}

const ProductCard23 = ({ className }: ProductCard23Props) => {
  const { regular, sale, currency } = PRODUCT_CARD.price;
  const [selectedColorValue, setSelectedColorValue] = useState<string>(
    PRODUCT_CARD.variantId ?? "",
  );

  const onColorChange = (value: string) => {
    setSelectedColorValue(value);
  };

  const selectedColorImages =
    PRODUCT_CARD.variants?.find(
      (variant) => variant.value === selectedColorValue,
    )?.images ?? PRODUCT_CARD.images;

  return (
    <Card
      className={cn(
        "max-w-80 rounded-none border-none bg-background p-0 shadow-none",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="group relative">
          <a href={PRODUCT_CARD.link}>
            <AspectRatio ratio={0.765475848} className="overflow-hidden">
              {selectedColorImages.map((img, index) => (
                <img
                  src={img.src}
                  srcSet={img.srcset}
                  sizes={img.sizes}
                  alt={img.alt}
                  key={`product-card-23-img-${index}`}
                  className="absolute inset-0 size-full origin-center object-cover object-center transition-opacity duration-500 first:opacity-100 group-hover:first:not-only:opacity-0 nth-2:opacity-0 group-hover:nth-2:opacity-100"
                />
              ))}
            </AspectRatio>
          </a>
          <div className="absolute end-4 top-4">
            <Button
              size="icon"
              className="transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
            >
              <Search />
            </Button>
          </div>
          {PRODUCT_CARD.variants && (
            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <ColorRadioGroup
                onValueChange={onColorChange}
                value={selectedColorValue}
                options={PRODUCT_CARD.variants}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5 p-4">
          <a
            href={PRODUCT_CARD.brand.link}
            className="text-xs text-muted-foreground uppercase"
          >
            {PRODUCT_CARD.brand.text}
          </a>
          <a href={PRODUCT_CARD.link}>
            <CardTitle className="mb-1 font-medium">
              {PRODUCT_CARD.name}
            </CardTitle>
          </a>
          <Price className="gap-x-1.5 text-sm" onSale={sale != null}>
            <PriceValue price={sale} currency={currency} variant="sale" />
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
          {PRODUCT_CARD.badges && PRODUCT_CARD.badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {PRODUCT_CARD.badges.map((text, index) => (
                <Badge variant="outline" key={`product-card-23-badge-${index}`}>
                  {text}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ColorRadioGroup = ({
  options,
  value,
  onValueChange,
}: ColorRadioGroupProps) => {
  return (
    <RadioGroup onValueChange={onValueChange} value={value} className="flex">
      {options.map((option, index) => (
        <div className="shrink-0" key={`product-card-23-color-option-${index}`}>
          <RadioGroupItem
            value={option.value}
            id={option.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={option.id}
            style={
              option.colors?.length === 1
                ? {
                    backgroundColor: option.colors[0],
                  }
                : {
                    backgroundImage: `linear-gradient(45deg, ${option.colors?.[0]} 0%, ${option.colors?.[0]} 50%, ${option.colors?.[1]} 50%, ${option.colors?.[1]} 100%)`,
                  }
            }
            className="size-3 cursor-pointer rounded-full peer-data-[state=checked]:ring"
          ></Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export { ProductCard23 };
