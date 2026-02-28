import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Button } from "@/components/ui/button";

interface Hero244Props {
  className?: string;
}

const Hero244 = ({ className }: Hero244Props) => {
  const items = [
    {
      title: "Controller Set",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "June Collection",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Summer Vibes",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img8.jpeg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Urban Style",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Classic Edition",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
      className: "absolute top-20  lg:right-[35%] rotate-[2deg]",
    },
    {
      title: "Premium Series",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Limited Edition",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  return (
    <section
      className={cn(
        "relative grid w-screen overflow-hidden border py-32 lg:min-h-screen",
        className,
      )}
    >
      <div className="relative z-10 container h-full grid-cols-1 items-center justify-center gap-10 lg:grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <h1 className="max-w-lg font-calSans text-7xl">
            Take control of your Saas
          </h1>
          <p className="mt-10 max-w-md text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </p>

          <div className="mt-10 flex gap-5">
            <Button className="h-11 rounded-xl">
              Get Unlimited Access <ArrowRight className="-rotate-45" />
            </Button>
            <Button className="h-11 rounded-xl" variant="secondary">
              Learn More <ArrowRight className="-rotate-45" />
            </Button>
          </div>
        </div>
        <DraggableCardContainer className="relative flex h-[80vh] w-full items-center justify-center lg:h-full">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center font-calSans text-4xl text-muted-foreground">
            Join the Exclusive Shadcn Blocks
          </p>
          {items.map((item) => (
            <DraggableCardBody
              key={item.title}
              className={cn(
                item.className,
                "-translate-x-20 scale-75 rounded-2xl p-3 lg:translate-x-0 lg:scale-100",
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-82 w-80 rounded-2xl object-cover"
              />
              <h3 className="mt-4 text-center text-xl tracking-tighter">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
      <div className="absolute inset-0 flex h-full w-full items-center justify-between">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="h-full w-px bg-border"></div>
        ))}
      </div>
    </section>
  );
};

export { Hero244 };
