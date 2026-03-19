"use client";

import { ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type Variant = {
  color: string;
  value: string;
  id: string;
  label: string;
  link: string;
  images: [Image, Image];
};
interface Product {
  name: string;
  category: {
    label: string;
    link: string;
  };
  images: [Image, Image];
  link: string;
  price: ProductPrice;
  variants: Array<Variant>;
  badges?: Array<Badge>;
}

interface PromoData {
  image: string;
  title: string;
  kicker: string;
  cta: {
    label: string;
    link: string;
  };
}

type PromoCardProps = PromoData;

type Badge = {
  text: string;
  color: string;
};

type ProductCardProps = Product;

type Image = {
  srcset?: string;
  src: string;
  sizes?: string;
  alt: string;
};

interface ProductColorsProps {
  variants: Omit<Variant, "images">[];
  value: string;
  onOptionHover: (value: string) => void;
}

interface BadgesProps {
  badges?: Array<Badge>;
}

type ProductList = Array<{
  title: string;
  value: string;
  promotion: PromoData;
  products: Array<Product>;
}>;

const PRODUCTS_LIST: ProductList = [
  {
    title: "New Arrivals",
    value: "new_arrivals",
    promotion: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/john-black-RV9T8txb2uY-unsplash-1.jpg",
      title: "Fresh. Trendy. Now.",
      kicker: "Offer",
      cta: {
        label: "See What’s New",
        link: "#",
      },
    },
    products: [
      {
        name: "Leather Sofa",
        price: {
          regular: 899.0,
          sale: 799.0,
          currency: "USD",
        },
        category: {
          label: "Chairs",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#4e2115",
            link: "#",
            label: "Brown Derby",
            value: "brown_derby-1",
            id: "brown_derby-1",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        badges: [
          {
            text: "Sale",
            color: "oklch(57.7% 0.245 27.325)",
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112729-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112734-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Ceramic Mug",
        price: {
          regular: 5.99,
          currency: "USD",
        },
        category: {
          label: "Cups",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#4E7055",
            link: "#",
            label: "Green",
            value: "green-2",
            id: "green-2",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
          {
            color: "#5F788B",
            link: "#",
            label: "Blue",
            value: "blue-2",
            id: "blue-2",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362198-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-20710970-15362162-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Tea Kettle",
        price: {
          regular: 92.0,
          currency: "USD",
        },
        category: {
          label: "Cookware",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#FFFFFF",
            link: "#",
            label: "White",
            value: "white-3",
            id: "white-3",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-nicola-barts-7937498-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Scented Candles",
        price: {
          regular: 50.0,
          currency: "USD",
        },
        category: {
          label: "Candles",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#000000",
            link: "#",
            label: "Black",
            value: "black-4",
            id: "black-4",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
          {
            color: "#E8B951",
            link: "#",
            label: "Gold",
            value: "gold-5",
            id: "gold-5",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20081033-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-sueda-gln-327513956-20080989-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: '5" x 7" Wood Frame',
        price: {
          regular: 20.0,
          currency: "USD",
        },
        category: {
          label: "Frames",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#C6B89C",
            link: "#",
            label: "Brown",
            value: "brown-6",
            id: "brown-6",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207785-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4464205-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Sphere Lamp",
        price: {
          regular: 199.0,
          currency: "USD",
        },
        category: {
          label: "Lamps",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#B8B9BD",
            link: "#",
            label: "Gray",
            value: "gray-7",
            id: "gray-7",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6825308-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-6920416-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
    ],
  },
  {
    title: "Hot Items",
    value: "hot_items",
    promotion: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-karolina-grabowska-4207892-1.jpg",
      title: "Bold. Must-Have.",
      kicker: "Promotion",
      cta: {
        label: "See What’s New",
        link: "#",
      },
    },
    products: [
      {
        name: "Leather Chair",
        price: {
          regular: 899.0,
          sale: 799.0,
          currency: "USD",
        },
        category: {
          label: "Chairs",
          link: "#",
        },
        link: "#",
        badges: [
          {
            text: "Best Choice!",
            color: "oklch(54.6% 0.245 262.881)",
          },
          {
            text: "Sale",
            color: "oklch(57.7% 0.245 27.325)",
          },
        ],
        variants: [
          {
            color: "#000000",
            link: "#",
            label: "Black",
            value: "black-8",
            id: "black-8",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792096-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-mathilde-14792097-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Ceramic Cup",
        price: {
          regular: 19.0,
          currency: "USD",
        },
        category: {
          label: "Cups",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#A8A081",
            link: "#",
            label: "Brown",
            value: "brown-9",
            id: "brown-9",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
          {
            color: "#C2CCCD",
            link: "#",
            label: "Brown",
            value: "brown-10",
            id: "brown-10",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-bWlbcvFMUh4-unsplash-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/cafeconcetto-L2r9L6Llyp4-unsplash-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Dining Chair",
        price: {
          regular: 299.0,
          sale: 199.0,
          currency: "USD",
        },
        category: {
          label: "Chair",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#DAC9AF",
            link: "#",
            label: "Brown",
            value: "brown-11",
            id: "brown-11",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626409-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-cottonbro-6626392-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Wall Clock",
        price: {
          regular: 159.0,
          currency: "USD",
        },
        category: {
          label: "Clocks",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#FFFFFF",
            link: "#",
            label: "White",
            value: "white-12",
            id: "white-12",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185169-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-cottonbro-5185178-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Ceramic Plate",
        price: {
          regular: 99.0,
          sale: 89.0,
          currency: "USD",
        },
        category: {
          label: "Cookware",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#709C69",
            link: "#",
            label: "Green",
            value: "green-13",
            id: "green-13",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
          {
            color: "#E5BBB4",
            link: "#",
            label: "Pink",
            value: "pink-14",
            id: "pink-14",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        badges: [
          {
            text: "Sale",
            color: "oklch(57.7% 0.245 27.325)",
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410297-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/pexels-micheile-10410289-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Wooden Cabinet",
        price: {
          regular: 699.0,
          currency: "USD",
        },
        category: {
          label: "Drawers",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#9f8568",
            link: "#",
            label: "Brown",
            value: "brown-15",
            id: "brown-15",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112749-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112750-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
      {
        name: "Wooden Chair",
        price: {
          regular: 49.0,
          currency: "USD",
        },
        category: {
          label: "Chairs",
          link: "#",
        },
        link: "#",
        variants: [
          {
            color: "#9f8568",
            link: "#",
            label: "Brown",
            value: "brown-16",
            id: "brown-16",
            images: [
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
              {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-3.jpg",
                srcset:
                  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-1.jpg 640w",
                alt: "",
                sizes:
                  "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
              },
            ],
          },
        ],
        images: [
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112738-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
          {
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-3.jpg",
            srcset:
              "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-3.jpg 1920w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-2.jpg 1280w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/furniture/pexels-kseniachernaya-11112728-1.jpg 640w",
            alt: "",
            sizes:
              "(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, 100vw",
          },
        ],
      },
    ],
  },
];

interface ProductList9Props {
  className?: string;
}

const ProductList9 = ({ className }: ProductList9Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((api: CarouselApi) => {
    const progress = Math.max(0, Math.min(1, api?.scrollProgress() ?? 0));
    setScrollProgress(progress + 0.25);
  }, []);

  useEffect(() => {
    if (!api) return;

    // Defer initial call to avoid synchronous state update in effect
    requestAnimationFrame(() => {
      onScroll(api);
    });

    api
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [api, onScroll]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Tabs defaultValue={PRODUCTS_LIST[0].value} className="block">
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl leading-snug font-bold lg:text-3xl">
                New Arrivals
              </h2>
              <TabsList className="h-auto gap-4 bg-transparent p-0">
                {PRODUCTS_LIST.map((item) => (
                  <TabsTrigger
                    key={`product-list-9-tab-trigger-${item.value}`}
                    value={item.value}
                    className="rounded-none bg-transparent px-0 pb-1 font-medium text-muted-foreground shadow-none data-active:bg-transparent data-active:text-foreground data-active:underline data-active:underline-offset-8 data-active:shadow-none"
                  >
                    {item.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <p className="font-medium text-muted-foreground">
              Traditional divides between personal and professional space.
            </p>
          </div>
          {PRODUCTS_LIST.map((item, index) => (
            <TabsContent
              value={item.value}
              key={`product-list-9-tab-content-${index}`}
              className="mt-0 data-[state=active]:animate-fade-in"
            >
              <Carousel
                opts={{
                  breakpoints: {
                    "(max-width: 768px)": {
                      active: false,
                      startIndex: 0,
                      align: "start",
                      slidesToScroll: 1,
                    },
                  },
                }}
                setApi={setApi}
                className="w-full md:[&>div]:overflow-visible"
              >
                <CarouselContent className="ml-0 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:-ml-4 md:flex md:gap-0">
                  <CarouselItem className="pl-0 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5">
                    <PromoCard {...item.promotion} />
                  </CarouselItem>
                  {item.products.map((item, index) => (
                    <CarouselItem
                      className="pl-0 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                      key={`product-list-9-item-${index}`}
                    >
                      <ProductCard {...item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-6 hidden items-center gap-3 md:flex">
                  <div className="relative h-0.5 w-full overflow-hidden bg-muted">
                    <div
                      style={{
                        transform: `scaleX(${scrollProgress})`,
                      }}
                      className="h-full origin-left bg-primary"
                    ></div>
                  </div>
                  <CarouselPrevious className="static translate-0" />
                  <CarouselNext className="static translate-0" />
                </div>
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const PromoCard = ({ image, title, cta, kicker }: PromoCardProps) => {
  return (
    <Card className="group relative flex size-full min-h-95 min-w-47.5 flex-col justify-between gap-5 overflow-hidden rounded-xl p-6 before:absolute before:inset-0 before:z-10 before:bg-black/20 lg:max-w-80">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 z-5 size-full origin-center object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <a href={cta.link} className="absolute inset-0 z-10 size-full"></a>
      <CardHeader className="pointer-events-none z-20 gap-4 p-0">
        <p className="font-bold text-white">{kicker}</p>
        <CardTitle className="text-3xl leading-tight text-white md:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardAction className="z-20">
        <Button asChild variant="secondary" className="rounded-full">
          <a href={cta.link}>{cta.label}</a>
        </Button>
      </CardAction>
    </Card>
  );
};

const ProductCard = ({
  link,
  images,
  name,
  price,
  category,
  variants,
  badges,
}: ProductCardProps) => {
  const { regular, sale, currency } = price;
  const [selectedColor, setSelectedColor] = useState<string>("");

  const onOptionHover = (value: string) => {
    setSelectedColor(value);
  };

  const productImages = useMemo(() => {
    return variants.find((v) => v.value === selectedColor)?.images ?? images;
  }, [images, selectedColor, variants]);

  return (
    <Card className="relative block rounded-none border-none bg-background p-0 shadow-none">
      <CardContent className="p-0">
        <div className="group relative overflow-hidden">
          <a href={link}>
            <AspectRatio ratio={1} className="overflow-hidden rounded-xl">
              {productImages.map((img, index) => (
                <div
                  className="absolute inset-0 size-full transition-opacity duration-700 first:z-20 group-hover:first:opacity-0 last:z-10 first:[&>img]:scale-105 first:[&>img]:delay-50 group-hover:first:[&>img]:scale-100 last:[&>img]:scale-105 group-hover:last:[&>img]:scale-100"
                  key={`product-list-9-card-img-wrapper-${index}`}
                >
                  <img
                    srcSet={img.srcset}
                    alt={img.alt}
                    sizes={img.sizes}
                    className="block size-full object-cover object-center transition-transform duration-700"
                  />
                </div>
              ))}
            </AspectRatio>
          </a>
          <div className="absolute start-2.5 top-2.5 z-60">
            <Badges badges={badges} />
          </div>
          <div className="absolute end-2.5 bottom-2.5 z-60 md:hidden">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ShoppingBag />
            </Button>
          </div>
          <div className="absolute inset-x-4 bottom-4 z-60 hidden md:block">
            <Button
              variant="secondary"
              className="w-full rounded-full opacity-0 duration-700 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            >
              Choose Options
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-5">
          <a
            href={category.link}
            className="text-xs leading-loose font-bold text-muted-foreground uppercase underline-offset-4 hover:underline"
          >
            {category.label}
          </a>
          <a href={link} className="underline-offset-4 hover:underline">
            <CardTitle className="leading-normal">{name}</CardTitle>
          </a>
          <Price
            onSale={sale != null}
            className="text-sm leading-normal font-bold"
          >
            <PriceValue
              price={sale}
              currency={currency}
              variant="sale"
              className="text-red-700"
            />
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
          <ProductColors
            value={selectedColor}
            onOptionHover={onOptionHover}
            variants={variants}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ProductColors = ({
  value,
  onOptionHover,
  variants,
}: ProductColorsProps) => {
  if (!variants) return;

  return (
    <TooltipProvider>
      <RadioGroup value={value} className="mt-2 flex items-center gap-2">
        {variants.map((item, index) => (
          <Label
            className="relative block pb-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:opacity-0 after:transition-opacity hover:after:opacity-100 has-data-[state=checked]:after:opacity-100"
            htmlFor={item.id}
            key={`product-list-9-color-${index}`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={item.link}>
                  <div
                    style={{
                      backgroundColor: item.color,
                    }}
                    className="size-5.5 border"
                    onMouseEnter={() => onOptionHover(item.value)}
                  ></div>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
            <RadioGroupItem
              value={item.value}
              id={item.id}
              className="sr-only"
            />
          </Label>
        ))}
      </RadioGroup>
    </TooltipProvider>
  );
};

const Badges = ({ badges }: BadgesProps) => {
  if (!badges) return;

  return (
    <div className="flex flex-col gap-1.5">
      {badges.map((item, index) => (
        <Badge
          style={{ backgroundColor: item.color }}
          key={`product-list-9-badge-${index}`}
          className="rounded-full dark:text-white"
        >
          {item.text}
        </Badge>
      ))}
    </div>
  );
};

export { ProductList9 };
