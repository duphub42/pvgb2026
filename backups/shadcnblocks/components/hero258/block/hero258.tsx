"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Megaphone } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Hero258Logo = {
  name: string;
  src: string;
  alt: string;
  className?: string;
};

type Hero258Card = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

interface Hero258Props {
  announcement?: {
    text: string;
    href: string;
  };
  heading?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  logos?: Hero258Logo[];
  cards?: Hero258Card[];
  className?: string;
}

const Hero258 = ({
  announcement = {
    text: "New blocks added weekly 🎨",
    href: "#",
  },
  heading = "Build beautiful UIs faster with Shadcn blocks",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Copy and paste directly into your project and customize to match your brand.",
  cta = {
    label: "Browse blocks",
    href: "#",
  },
  logos = [
    {
      name: "Northwind",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      alt: "Northwind logo",
      className: "h-6 w-auto",
    },
    {
      name: "Helios",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      alt: "Helios logo",
      className: "h-6 w-auto",
    },
    {
      name: "Vista Labs",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      alt: "Vista Labs logo",
      className: "h-6 w-auto",
    },
    {
      name: "Silverline",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg",
      alt: "Silverline logo",
      className: "h-5 w-auto",
    },
    {
      name: "Orion Systems",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-9.svg",
      alt: "Orion Systems logo",
      className: "h-6 w-auto",
    },
    {
      name: "Crescent",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-11.svg",
      alt: "Crescent logo",
      className: "h-6 w-auto",
    },
  ],
  cards = [
    {
      title: "Copy and paste ready",
      description:
        "Every block is production-ready code you can copy directly into your project. No dependencies to install, no complex setup—just beautiful components.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      imageAlt: "Code editor with Shadcn blocks",
      href: "#",
    },
    {
      title: "Built with Shadcn & Tailwind",
      description:
        "All blocks use Shadcn UI components and Tailwind CSS, ensuring consistency, accessibility, and easy customization to match your design system.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      imageAlt: "Shadcn UI components showcase",
      href: "#",
    },
  ],
  className,
}: Hero258Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={cn("bg-muted/40 py-16 lg:py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <Badge
              asChild
              variant="outline"
              className="group rounded-full border-border/50 bg-background/80 px-4 py-1.5 text-sm transition hover:border-border/90 hover:bg-background/90"
            >
              <a href={announcement.href}>
                <span className="flex size-7 items-center justify-center rounded-full bg-foreground/10 text-foreground/80 transition group-hover:bg-foreground/15">
                  <Megaphone aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">Announcement</span>
                </span>
                <span className="font-medium text-foreground/90">
                  {announcement.text}
                </span>
                <ArrowRight className="size-4 text-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-foreground/80" />
              </a>
            </Badge>
            <div className="flex max-w-4xl flex-col gap-4">
              <h1 className="text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
                {heading}
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                {description}
              </p>
            </div>
            <Button asChild size="lg">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>

          {logos.length > 0 && (
            <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-6 text-muted-foreground/60 md:gap-x-12 md:py-6">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="transition hover:text-foreground"
                  aria-label={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={cn(
                      "mx-auto h-6 w-auto opacity-70 grayscale transition hover:opacity-90 hover:grayscale-0 dark:invert",
                      logo.className,
                    )}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          <div
            className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 md:overflow-visible md:pb-0"
            role="list"
            aria-label="Featured stories"
          >
            {cards.map((card, index) => {
              const isHovered = hoveredIndex === index;
              const isOtherHovered =
                hoveredIndex !== null && hoveredIndex !== index;

              return (
                <motion.article
                  layout
                  key={card.title}
                  role="listitem"
                  className={cn(
                    "group relative flex min-h-96 min-w-72 flex-none overflow-hidden rounded-xl border border-border/60 transition duration-300 md:min-w-0 md:flex-1",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
                  animate={{
                    flex: isHovered ? 1.3 : isOtherHovered ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <a href={card.href} key={card.title}>
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition duration-500",
                        isHovered ? "scale-105" : "scale-100",
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70 transition duration-300 group-hover:via-black/50 group-hover:to-black/80" />

                    <div className="relative z-10 flex h-full w-full flex-col justify-between">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold tracking-tight text-primary-foreground md:text-xl">
                          {card.title}
                        </h3>
                      </div>
                      <motion.div
                        layout
                        className="flex w-full items-end gap-4 p-6"
                        initial={false}
                        animate={{
                          justifyContent: isHovered
                            ? "space-between"
                            : "flex-start",
                        }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <AnimatePresence initial={false}>
                          {isHovered && (
                            <motion.p
                              layout
                              key="card-description"
                              className="flex-1 text-sm text-primary-foreground md:text-base"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.2,
                                ease: "easeInOut",
                              }}
                            >
                              <span>{card.description}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <motion.button
                          layout
                          className="rounded-full border border-secondary bg-secondary p-2 text-sm font-medium text-secondary-foreground"
                          initial={false}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <a href={card.href}>
                            <ArrowUpRight className="size-4" />
                          </a>
                        </motion.button>
                      </motion.div>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero258 };
