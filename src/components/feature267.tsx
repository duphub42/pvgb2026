import { Sparkles } from "lucide-react";
import React from "react";

import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/lib/utils";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CMSLink } from "@/components/Link";

const DEFAULT_IMAGES = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img8.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img10.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img15.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img16.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img17.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img18.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img19.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img20.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img21.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img22.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img23.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img24.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img26.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img27.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img8.jpeg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg",
];

type MediaRef = { url?: string | null; updatedAt?: string | null } | number | null;

function imageUrlFromContentItem(item: { media?: MediaRef } | null): string {
  if (!item?.media) return "";
  const m = item.media;
  if (typeof m === "object" && m?.url) return getMediaUrl(m.url, m.updatedAt ?? null) || "";
  return "";
}

export interface Feature267Props {
  className?: string;
  variant?: string | null;
  content?: {
    headline?: string | null;
    subheadline?: string | null;
    body?: string | null;
    images?: Array<{ media?: MediaRef }> | null;
    links?: Array<{ link?: { type?: string; url?: string | null; label?: string | null; newTab?: boolean } }> | null;
  } | null;
}

const Feature267 = ({ className, content }: Feature267Props) => {
  const cmsImages =
    content?.images
      ?.map((item) => imageUrlFromContentItem(item))
      .filter(Boolean) as string[] | undefined;
  const images = cmsImages?.length ? cmsImages : DEFAULT_IMAGES;

  const headline = content?.headline ?? "Drop-In Ready Blocks to Supercharge Your App";
  const subheadline = content?.subheadline ?? "shadcn Blocks";
  const body =
    content?.body ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad";
  const links = content?.links ?? [];

  return (
    <section
      className={cn(
        "relative h-full w-screen overflow-hidden py-32",
        className,
      )}
    >
      <div className="container grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
        <div className="flex h-full flex-col justify-center">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 fill-foreground" />
            <p className="w-fit rounded-full py-1 font-medium tracking-tight">
              {subheadline}
            </p>
          </div>
          <h1 className="mt-3 mb-8 max-w-xl text-5xl font-medium font-semibold tracking-tighter lg:max-w-3xl lg:text-6xl">
            {headline}
          </h1>
          <p className="max-w-xl text-muted-foreground">{body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            {links.length > 0 ? (
              links.map((item, i) =>
                item?.link ? (
                  <CMSLink
                    key={i}
                    {...item.link}
                    appearance="default"
                    className="h-full rounded-full"
                  >
                    {item.link.label ?? "Link"}
                  </CMSLink>
                ) : null,
              )
            ) : (
              <div className="flex h-15 w-full max-w-md items-center rounded-full border p-1">
                <Input
                  className="w-full rounded-full border-none shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none active:ring-0 active:outline-0"
                  placeholder="Enter your email"
                />
                <Button className="h-full rounded-full">Subscribe Now</Button>
              </div>
            )}
          </div>
        </div>

        <div className="items-center justify-center">
          <ThreeDMarquee className="rounded-none" images={images} />
        </div>
      </div>
    </section>
  );
};

export { Feature267 };
