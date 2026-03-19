"use client";

import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Cotton Crew Tee",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/minimalist-tank-top-flatlay.png",
    price: 35.0,
    quantity: 1,
  },
  {
    id: "2",
    name: "Slim Fit Chinos",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-jay-soundo-2148060180-30624171-2.png",
    price: 68.0,
    quantity: 1,
  },
];

interface ShoppingCart20Props {
  items?: CartItem[];
  className?: string;
}

const ShoppingCart20 = ({
  items: initialItems = DEFAULT_ITEMS,
  className,
}: ShoppingCart20Props) => {
  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);

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
          <Button variant="ghost" size="sm" className="relative gap-2">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="end">
          {items.length > 0 ? (
            <>
              {/* Items - Compact */}
              <div className="max-h-64 overflow-y-auto p-3">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="group flex gap-3">
                      <div className="size-12 shrink-0 overflow-hidden rounded bg-muted">
                        <AspectRatio ratio={1}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="truncate text-sm font-medium">
                            {item.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer - Minimal */}
              <div className="border-t bg-muted/30 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Button>
                  <Button size="sm">Checkout</Button>
                </div>

                {/* Express Checkout */}
                <div className="mt-3 border-t pt-3">
                  <p className="mb-2 text-center text-xs text-muted-foreground">
                    Express checkout
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 bg-black text-white hover:bg-black/90 hover:text-white"
                    >
                      Apple Pay
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 bg-[#ffc439] text-black hover:bg-[#f5bb36] hover:text-black"
                    >
                      PayPal
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <ShoppingBag className="mx-auto mb-2 size-8 text-muted-foreground" />
              <p className="text-sm font-medium">Cart is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add items to get started
              </p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { ShoppingCart20 };
