"use client";

import {
  ArrowUpDown,
  Check,
  Heart,
  Share2,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  dateAdded: string;
  category: string;
}

const DEFAULT_ITEMS: WishlistItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
    price: 249.99,
    originalPrice: 299.99,
    inStock: true,
    dateAdded: "Dec 10, 2024",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Premium Leather Crossbody Bag",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/maroon-leather-handbag.png",
    price: 189.0,
    inStock: true,
    dateAdded: "Dec 8, 2024",
    category: "Accessories",
  },
  {
    id: "3",
    name: "Classic Wool Blend Coat",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Young-Man-in-White-Hoodie-1.png",
    price: 329.0,
    inStock: false,
    dateAdded: "Dec 5, 2024",
    category: "Clothing",
  },
  {
    id: "4",
    name: "Gold Hoop Earrings",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Gold-Earrings-1.png",
    price: 79.0,
    inStock: true,
    dateAdded: "Dec 2, 2024",
    category: "Jewelry",
  },
  {
    id: "5",
    name: "Oversized Cotton Hoodie",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/black-hoodie-against-light-background.png",
    price: 65.0,
    inStock: true,
    dateAdded: "Nov 28, 2024",
    category: "Clothing",
  },
];

type SortOption = "date" | "price-low" | "price-high" | "name";

interface Wishlist2Props {
  items?: WishlistItem[];
  className?: string;
}

const Wishlist2 = ({ items = DEFAULT_ITEMS, className }: Wishlist2Props) => {
  const [wishlistItems, setWishlistItems] = useState(items);
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
    }
  });

  const sortLabels: Record<SortOption, string> = {
    date: "Date Added",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    name: "Name",
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Saved Items
            </h1>
            <p className="mt-1 text-muted-foreground">
              {wishlistItems.length} items in your wishlist
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 size-4" />
              Share List
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 size-4" />
                  {sortLabels[sortBy]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                  >
                    {sortBy === option && <Check className="mr-2 size-4" />}
                    <span className={sortBy !== option ? "pl-6" : ""}>
                      {sortLabels[option]}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* List */}
        {sortedItems.length > 0 ? (
          <div className="rounded-lg border">
            {sortedItems.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <Separator />}
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28">
                    <AspectRatio ratio={1}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={cn(
                          "size-full object-cover",
                          !item.inStock && "opacity-50",
                        )}
                      />
                    </AspectRatio>
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="leading-tight font-medium">
                            {item.name}
                          </h3>
                          {!item.inStock && (
                            <Badge variant="secondary" className="shrink-0">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-semibold">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-xs text-muted-foreground">
                        Added {item.dateAdded}
                      </span>
                      <Button size="sm" disabled={!item.inStock}>
                        <ShoppingCart className="mr-2 size-4" />
                        {item.inStock ? "Add to Cart" : "Sold Out"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <Heart className="size-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No saved items</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Browse our collection and save items you love
            </p>
            <Button className="mt-6">Explore Products</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Wishlist2 };
