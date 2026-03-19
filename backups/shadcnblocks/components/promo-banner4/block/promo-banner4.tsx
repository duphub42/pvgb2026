import { RotateCcw, Shield, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrustItem {
  icon: React.ReactNode;
  text: string;
}

interface PromoBanner4Props {
  items?: TrustItem[];
  className?: string;
}

const DEFAULT_ITEMS: TrustItem[] = [
  { icon: <Truck className="size-4" />, text: "Free shipping over $50" },
  { icon: <RotateCcw className="size-4" />, text: "30-day returns" },
  { icon: <Shield className="size-4" />, text: "Secure checkout" },
];

const PromoBanner4 = ({
  items = DEFAULT_ITEMS,
  className,
}: PromoBanner4Props) => {
  return (
    <div
      className={cn(
        "w-full border-b bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PromoBanner4 };
