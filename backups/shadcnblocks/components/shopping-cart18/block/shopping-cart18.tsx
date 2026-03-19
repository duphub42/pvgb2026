"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/minimalist-tank-top-flatlay.png",
    price: 29.99,
    quantity: 2,
    variant: "White / M",
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/maroon-leather-handbag.png",
    price: 89.0,
    quantity: 1,
    variant: "Burgundy",
  },
];

interface ShoppingCart18Props {
  items?: CartItem[];
  className?: string;
}

const ShoppingCart18 = ({
  items: initialItems = DEFAULT_ITEMS,
  className,
}: ShoppingCart18Props) => {
  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={cn("inline-flex", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">Shopping Cart ({itemCount})</h3>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          {items.length > 0 ? (
            <>
              {/* Items */}
              <div className="max-h-80 overflow-y-auto p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        <AspectRatio ratio={1}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h4 className="truncate text-sm font-medium">
                          {item.name}
                        </h4>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">
                            {item.variant}
                          </p>
                        )}
                        <p className="text-sm font-semibold">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-6"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-6"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="size-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Footer */}
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-lg font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="w-full">Checkout</Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <ShoppingBag className="mx-auto mb-3 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your cart is empty
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { ShoppingCart18 };
