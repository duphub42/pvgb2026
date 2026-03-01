"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { getMediaUrl } from "@/utilities/getMediaUrl";

import { Button } from "@/components/ui/button";

interface Hero215Props {
  className?: string;
  headline?: string | null;
  description?: string | null;
  links?: Array<{
    link?: {
      label?: string | null;
      url?: string | null;
      type?: string;
      reference?: { value?: { slug?: string } | number };
      newTab?: boolean | null;
    };
  }> | null;
  media?: { url?: string | null } | number | null;
}

function mediaImageUrl(media: Hero215Props["media"]): string {
  if (media == null) return "";
  if (typeof media === "object" && media?.url) return getMediaUrl(media.url) || "";
  return "";
}

const Hero215 = ({ className, headline, description, links, media }: Hero215Props) => {
  const headlineText = headline?.trim() || "Find Your Perfect Home in Your City";
  const descriptionText = description?.trim() || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.";
  const firstLink = Array.isArray(links) && links.length > 0 ? links[0]?.link : null;
  const firstLinkHref =
    firstLink?.url ??
    (firstLink?.type === "reference" &&
    firstLink.reference?.value &&
    typeof firstLink.reference.value === "object" &&
    firstLink.reference.value?.slug
      ? `/${firstLink.reference.value.slug}`
      : null);
  const imageUrl = mediaImageUrl(media) || "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/highRise.jpg";

  return (
    <section className={cn("py-32", className)}>
      <div className="relative container min-h-[100vh]">
        <div className="absolute bottom-45 z-10 lg:max-w-xl">
          <div className="absolute top-0 z-1 size-full bg-background blur-2xl" />
          <h1 className="relative z-20 text-left font-playfair text-5xl tracking-tighter lg:text-6xl">
            {headlineText}
          </h1>
          <p className="relative z-20 mt-8 text-muted-foreground">
            {descriptionText}
          </p>
        </div>
        <div className="absolute bottom-20 z-10 max-w-xl lg:right-25 lg:bottom-45">
          {firstLinkHref ? (
            <Button asChild className="group mt-10 flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-1 tracking-tight">
              <Link href={firstLinkHref} target={firstLink?.newTab ? "_blank" : undefined} rel={firstLink?.newTab ? "noopener noreferrer" : undefined}>
                {firstLink.label || "Contact Us now"}
                <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
              </Link>
            </Button>
          ) : (
            <Button className="group mt-10 flex w-fit items-center justify-center gap-2 rounded-full border px-4 py-1 tracking-tight">
              Contact Us now
              <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:rotate-0" />
            </Button>
          )}
        </div>
        <div className="absolute -top-20 right-0 w-[27rem] max-w-xl">
          <img
            src={imageUrl}
            className="animate-fade-in rounded-2xl object-cover"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export { Hero215 };
