import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const items = [
  {
    quote: "We're misusing Mainline as a CRM and it still works!",
    author: "Amy Chase",
    role: "PM",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/amy-chase.webp",
  },
  {
    quote: "I was able to replace 80% of my team with Mainline bots.",
    author: "Jonas Kotara",
    role: "Lead Engineer",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/jonas-kotara.webp",
  },
  {
    quote: "Founder Mode is hard enough without having a really nice PM app.",
    author: "Kevin Yam",
    role: "Founder",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/kevin-yam.webp",
  },
  {
    quote: "I can use the tool as a substitute from my PM.",
    author: "Kundo Marta",
    role: "Founder",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/kundo-marta.webp",
  },
  {
    quote: "We're misusing Mainline as a CRM and it still works!",
    author: "Amy Chase",
    role: "PM",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/amy-chase.webp",
  },
  {
    quote: "I was able to replace 80% of my team with Mainline bots.",
    author: "Jonas Kotara",
    role: "Lead Engineer",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/jonas-kotara.webp",
  },
  {
    quote: "Founder Mode is hard enough without having a really nice PM app.",
    author: "Kevin Yam",
    role: "Founder",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/kevin-yam.webp",
  },
  {
    quote: "I can use the tool as a substitute from my PM.",
    author: "Kundo Marta",
    role: "Founder",
    company: "Mercury Finance",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/mainline/testimonials/kundo-marta.webp",
  },
];

interface Testimonial25Props {
  className?: string;
}

const Testimonial25 = ({ className }: Testimonial25Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Trusted by product builders
          </h2>
          <p className="max-w-md leading-snug font-medium text-muted-foreground">
            Mainline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
          <Button variant="outline" className="">
            Read our Customer Stories <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="relative mt-8 md:mt-12 lg:mt-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="">
              {items.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="grow basis-4/5 md:basis-3/5 lg:basis-[28%] xl:basis-1/4"
                >
                  <Card className="h-full overflow-hidden border-none bg-muted">
                    <CardContent className="flex h-full flex-col p-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="h-[288px] object-cover object-top lg:h-[328px]"
                      />
                      <div className="flex flex-1 flex-col justify-between gap-10 p-6">
                        <blockquote className="text-lg leading-none! font-medium text-primary md:text-xl">
                          {testimonial.quote}
                        </blockquote>
                        <div className="space-y-0.5">
                          <div className="text-sm font-semibold">
                            {testimonial.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex gap-3">
              <CarouselPrevious className="static size-10 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-10 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Testimonial25 };
