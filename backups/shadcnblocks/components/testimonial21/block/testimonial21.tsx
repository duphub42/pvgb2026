import { Handshake } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
      alt: "Zerostatic logo",
      width: 96.75,
      height: 36,
    },
    quote:
      "Our team at Zerostatic relies heavily on automation, and this app takes it to another level. It&apos;s like having a virtual assistant built right into my workflow.",
    author: {
      name: "Abdulsalam Abdulsalam",
      role: "Product Designer, Zerostatic",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
  },
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
      alt: "Notion logo",
      width: 90.75,
      height: 36,
    },
    quote:
      "I especially love the seamless calendar integrations and advanced task management features keep everyone aligned and organized.",
    author: {
      name: "Emma Lee",
      role: "Product Manager, Notion",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
  },
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-wordmark.svg",
      alt: "Slack logo",
      width: 100.75,
      height: 36,
    },
    quote:
      "We needed a productivity app that could grow with our team&apos;s evolving needs, this has been the perfect fit. The automation tools have saved us hours.",
    author: {
      name: "Ryan Chen",
      role: "Operations Lead, Slack",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
  },
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
      alt: "GitHub logo",
      width: 110.75,
      height: 36,
    },
    quote:
      "This platform has been invaluable for managing projects across distributed teams. Its integration with our existing tools makes setup easy.",
    author: {
      name: "Ryan Patel",
      role: "Engineering Manager, GitHub",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    },
  },
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
      alt: "Figma logo",
      width: 96.75,
      height: 36,
    },
    quote:
      "As a designer, I appreciate how intuitive and visually appealing this app is. It simplifies task management without sacrificing powerful features.",
    author: {
      name: "Carlos Diaz",
      role: "Design Lead, Figma",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
  },
  {
    logo: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
      alt: "Loom logo",
      width: 96.75,
      height: 36,
    },
    quote:
      "The smart reminders and automated scheduling keep our team focused and on track. We&apos;ve also found the collaborative features to be very helpful.",
    author: {
      name: "Matthew Kim",
      role: "Content Strategist, Loom",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    },
  },
];

interface Testimonial21Props {
  className?: string;
}

const Testimonial21 = ({ className }: Testimonial21Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <Handshake className="size-4" />
            <span>lovin' it</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            What industry experts are saying
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Trusted by Professionals from Leading Tech Companies
          </p>
        </div>
      </div>

      <div className="container mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="flex flex-col gap-6 rounded-md bg-background p-6 shadow-sm"
          >
            <img
              src={testimonial.logo.src}
              alt={testimonial.logo.alt}
              width={testimonial.logo.width}
              height={testimonial.logo.height}
              className="object-contain dark:invert"
            />

            <blockquote className="text-muted-foreground-subtle text-lg font-normal italic">{`“${testimonial.quote}”`}</blockquote>

            <div className="mt-auto flex items-center gap-4">
              <img
                src={testimonial.author.image}
                alt={`${testimonial.author.name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-lg tracking-[-0.36px]">
                  {testimonial.author.name}
                </p>
                <p className="text-muted-foreground">
                  {testimonial.author.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Testimonial21 };
