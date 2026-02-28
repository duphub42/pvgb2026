import { ArrowRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero215Props {
  className?: string;
}

const Hero215 = ({ className }: Hero215Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="relative container min-h-[100vh]">
        <div className="absolute bottom-45 z-10 lg:max-w-xl">
          <div className="absolute top-0 z-1 size-full bg-background blur-2xl" />
          <h1 className="relative z-20 text-left font-playfair text-5xl tracking-tighter lg:text-6xl">
            Find Your Perfect Home in Your City
          </h1>
          <p className="relative z-20 mt-8 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur
            adipiscing elit,
          </p>
        </div>
        <div className="absolute bottom-20 z-10 max-w-xl lg:right-25 lg:bottom-45">
          <Button className="group mt-10 flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-1 tracking-tight">
            Contact Us now
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
          </Button>
        </div>
        <div className="absolute -top-20 right-0 w-[27rem] max-w-xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/highRise.jpg"
            className="animate-fade-in rounded-2xl object-cover"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export { Hero215 };
