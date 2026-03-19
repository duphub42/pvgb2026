"use client";

import { Minus, Plus, ShoppingBag, Tag, Truck, X } from "lucide-react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface UpsellProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
    price: 249.99,
    quantity: 1,
  },
  {
    id: "2",
    name: "Premium Leather Wallet",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Watch-on-Womans-Wrist-1.png",
    price: 79.0,
    quantity: 1,
  },
];

const DEFAULT_UPSELLS: UpsellProduct[] = [
  {
    id: "u1",
    name: "Headphone Stand",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    price: 29.99,
  },
  {
    id: "u2",
    name: "Carrying Case",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    price: 39.99,
  },
];

const FREE_SHIPPING_THRESHOLD = 150;

interface ShoppingCart19Props {
  items?: CartItem[];
  upsells?: UpsellProduct[];
  className?: string;
}

const ShoppingCart19 = ({
  items: initialItems = DEFAULT_ITEMS,
  upsells = DEFAULT_UPSELLS,
  className,
}: ShoppingCart19Props) => {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState("");
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

  const addUpsell = (product: UpsellProduct) => {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      updateQuantity(product.id, 1);
    } else {
      setItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
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
  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className={cn("inline-flex", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
          <SheetHeader className="border-b p-4">
            <SheetTitle>Your Cart ({itemCount})</SheetTitle>
          </SheetHeader>

          {items.length > 0 ? (
            <>
              {/* Free Shipping Progress */}
              <div className="border-b bg-muted/30 p-4">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <Truck className="size-4" />
                    <span className="font-medium">
                      You&apos;ve unlocked free shipping!
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <Truck className="size-4 text-muted-foreground" />
                      <span>
                        Add{" "}
                        <span className="font-semibold">
                          {formatPrice(amountToFreeShipping)}
                        </span>{" "}
                        more for free shipping
                      </span>
                    </div>
                    <Progress value={freeShippingProgress} className="h-2" />
                  </>
                )}
              </div>

              {/* Cart Items */}
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <AspectRatio ratio={1}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="size-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm leading-tight font-medium">
                              {item.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6 shrink-0"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="size-3" />
                            </Button>
                          </div>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground">
                              {item.variant}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-none"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="size-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-none"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>
                            <span className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upsells */}
                  {upsells.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-medium">
                        You might also like
                      </p>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {upsells.map((product) => (
                          <div
                            key={product.id}
                            className="w-28 shrink-0 rounded-lg border p-2"
                          >
                            <div className="mb-2 aspect-square overflow-hidden rounded bg-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="size-full object-cover"
                              />
                            </div>
                            <p className="truncate text-xs font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(product.price)}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 h-7 w-full text-xs"
                              onClick={() => addUpsell(product)}
                            >
                              Add
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="border-t p-4">
                {/* Promo Code */}
                <div className="mb-4 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>

                <Separator className="mb-4" />

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "Free"
                        : "Calculated at checkout"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Checkout · {formatPrice(subtotal)}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="mb-4 size-12 text-muted-foreground" />
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add items to get started
              </p>
              <Button className="mt-6" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { ShoppingCart19 };
