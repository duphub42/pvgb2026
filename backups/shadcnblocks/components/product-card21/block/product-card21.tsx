"use client";
import { Minus, Plus } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

type Image = {
  src: string;
  srcset?: string;
  alt: string;
  sizes?: string;
};

type ProductColorOptions = {
  images: Image[];
  id: string;
  value: string;
  label: string;
  colors: string[];
};

interface Product {
  colorOptions: Array<ProductColorOptions>;
  link: string;
  name: string;
  price: ProductPrice;
  variant: string;
}

interface ProductCardColorOptionsProps {
  options: ProductColorOptions[];
  onValueChange: (value: string) => void;
  value: string;
}

const PRODUCT_CARD: Product = {
  name: "Slate Essential Hoodie",
  variant: "product-1-1",
  price: {
    regular: 49.0,
    sale: 38.0,
    currency: "USD",
  },
  colorOptions: [
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-White-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-White-Hoodie-2.png 1200w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-White-Hoodie-1.png 640w",
          alt: "",
          sizes: "100w",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-Hoodie-&-Jacket-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-Hoodie-&-Jacket-2.png 904w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Man-in-Hoodie-&-Jacket-1.png 482w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-1-1",
      value: "product-1-1",
      label: "White",
      colors: ["#F4F2F0"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Casual-Outfit-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Casual-Outfit-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Casual-Outfit-1.png 360w",
          alt: "",
          sizes: "100w",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Person-in-Green-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Person-in-Green-Hoodie-2.png 655w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Person-in-Green-Hoodie-1.png 349w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-1-2",
      value: "product-1-2",
      label: "Olive",
      colors: ["#52462C"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Navy-and-Orange-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Navy-and-Orange-Hoodie-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Navy-and-Orange-Hoodie-1.png 360w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-1-3",
      value: "product-1-3",
      label: "Navy & Orange",
      colors: ["#2B233A", "#F6862E"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Blue-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Blue-Hoodie-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Blue-Hoodie-1.png 360w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-2-1",
      value: "product-2-1",
      label: "Blue",
      colors: ["#233A4E", "#879698"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Beige-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Beige-Hoodie-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Beige-Hoodie-1.png 360w",
          alt: "",
          sizes: "100w",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Close-up-of-Beige-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Close-up-of-Beige-Hoodie-2.png 655w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Close-up-of-Beige-Hoodie-1.png 349w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-2-2",
      value: "product-2-2",
      label: "Beige",
      colors: ["#BDA994"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Maroon-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Maroon-Hoodie-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Maroon-Hoodie-1.png 360w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-3-1",
      value: "product-3-1",
      label: "Maroon",
      colors: ["#54272E"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Person-in-Bright-Fashion-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Person-in-Bright-Fashion-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Person-in-Bright-Fashion-1.png 360w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-3-2",
      value: "product-3-2",
      label: "Burnt Orange",
      colors: ["#C75922"],
    },
    {
      images: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Green-Hoodie-2.png",
          srcset:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Green-Hoodie-2.png 675w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-Green-Hoodie-1.png 360w",
          alt: "",
          sizes: "100w",
        },
      ],
      id: "product-3-3",
      value: "product-3-3",
      label: "Lime Green",
      colors: ["#91A12E"],
    },
  ],
  link: "#",
};

interface ProductCard21Props {
  className?: string;
}

const ProductCard21 = ({ className }: ProductCard21Props) => {
  const [selectedVariant, setVariant] = useState(PRODUCT_CARD.variant);
  const [variantImages, setSelectedVariantImages] = useState<
    Image[] | undefined
  >();
  const { regular, sale, currency } = PRODUCT_CARD.price;

  const onValueChange = (value: string) => {
    setVariant(value);
  };

  useEffect(() => {
    const checkedColorImages = PRODUCT_CARD.colorOptions.find(
      (option) => option.value === selectedVariant,
    )?.images;
    startTransition(() => {
      setSelectedVariantImages(checkedColorImages);
    });
  }, [selectedVariant]);

  return (
    <Card
      className={cn(
        "max-w-80 rounded-none border-none bg-background p-0 shadow-none",
        className,
      )}
    >
      <CardContent className="flex flex-col px-0">
        <a href={PRODUCT_CARD.link} className="group">
          <AspectRatio ratio={0.860010522} className="overflow-hidden">
            {variantImages &&
              variantImages.map((img, index) => (
                <img
                  key={`product-card-21-img-${index}`}
                  src={img.src}
                  srcSet={img.srcset}
                  alt={img.alt}
                  sizes={img.sizes}
                  className="absolute inset-0 size-full object-cover object-center transition-opacity duration-200 first:opacity-100 group-hover:first:not-only:opacity-0 nth-2:opacity-0 group-hover:nth-2:opacity-100"
                />
              ))}
          </AspectRatio>
        </a>
        <div className="space-y-2 p-6">
          <ProductCardColorOptions
            onValueChange={onValueChange}
            value={selectedVariant}
            options={PRODUCT_CARD.colorOptions}
          />
          <a href={PRODUCT_CARD.link}>
            <CardTitle className="text-sm font-light">
              {PRODUCT_CARD.name}
            </CardTitle>
          </a>
          <Price className="mt-3 text-sm font-medium" onSale={sale != null}>
            <PriceValue price={regular} currency={currency} variant="regular" />
            <PriceValue
              price={sale}
              currency={currency}
              variant="sale"
              className="text-red-800"
            />
          </Price>
          <Button variant="outline" size="sm" className="mt-3 rounded-full">
            <Plus />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductCardColorOptions = ({
  options,
  value,
  onValueChange,
}: ProductCardColorOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!options) return;

  return (
    <TooltipProvider>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex items-start justify-between gap-4"
      >
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          className="flex flex-wrap items-center gap-2"
        >
          {options.slice(0, 5).map((option, index) => (
            <Tooltip key={`product-card-21-${index}`}>
              <TooltipTrigger asChild>
                <Label
                  style={
                    option.colors?.length === 1
                      ? {
                          backgroundColor: option.colors[0],
                        }
                      : {
                          backgroundImage: `linear-gradient(45deg, ${option.colors?.[0]} 0%, ${option.colors?.[0]} 50%, ${option.colors?.[1]} 50%, ${option.colors?.[1]} 100%)`,
                        }
                  }
                  htmlFor={option.id}
                  className="size-8 cursor-pointer rounded-full border-4 border-background has-data-[state=checked]:ring"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.id}
                    className="sr-only"
                  />
                </Label>
              </TooltipTrigger>
              <TooltipContent>{option.label}</TooltipContent>
            </Tooltip>
          ))}

          <CollapsibleContent className="contents">
            {options.slice(5).map((option, index) => (
              <Tooltip key={`product-card-21-${index}`}>
                <TooltipTrigger asChild>
                  <Label
                    style={
                      option.colors?.length === 1
                        ? {
                            backgroundColor: option.colors[0],
                          }
                        : {
                            backgroundImage: `linear-gradient(45deg, ${option.colors?.[0]} 0%, ${option.colors?.[0]} 50%, ${option.colors?.[1]} 50%, ${option.colors?.[1]} 100%)`,
                          }
                    }
                    htmlFor={option.id}
                    className="size-8 cursor-pointer rounded-full border-4 border-background has-data-[state=checked]:ring"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.id}
                      className="sr-only"
                    />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>{option.label}</TooltipContent>
              </Tooltip>
            ))}
          </CollapsibleContent>
        </RadioGroup>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="size-8 rounded-full">
            {isOpen ? <Minus /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </TooltipProvider>
  );
};

export { ProductCard21 };
