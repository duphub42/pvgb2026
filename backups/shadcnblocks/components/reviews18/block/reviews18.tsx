"use client";

import "photoswipe/style.css";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Rating } from "@/components/shadcnblocks/rating";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type ImageType = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

type ReviewType = {
  rate: number;
  author?: string;
  verifiedBuyer?: boolean;
  country?: {
    name: string;
    code: string;
  };
  date: string;
  title: string;
  comment: string;
  images?: ImageType[];
};

type ReplyType = {
  title: string;
  comment: string;
  date: string;
};

type ReviewWithOptionalReply = ReviewType & {
  reply?: ReplyType;
};

interface Reviews18Props {
  reviews: ReviewWithOptionalReply[];
  pageAmmount?: string;
  className?: string;
}

type ReviewProps = ReviewWithOptionalReply;

const REVIEWS: ReviewWithOptionalReply[] = [
  {
    rate: 5,
    author: "Johnson C.",
    verifiedBuyer: true,
    country: {
      name: "Canada",
      code: "CA",
    },
    date: "2 months ago",
    title: "Beautiful watch and great quality",
    comment:
      "Absolutely love this watch! It feels premium, sits comfortably on the wrist, and looks even better in person. The details are stunning and the design goes well with both casual and formal outfits. It also arrived quickly and was packaged securely. I’ve worn it almost every day since it arrived—highly recommended.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Watch-on-Womans-Wrist-2.png",
        width: 1200,
        height: 1200,
      },
    ],
  },
  {
    rate: 5,
    author: "Anonymous",
    verifiedBuyer: true,
    country: {
      name: "United States",
      code: "US",
    },
    date: "2 months ago",
    title: "Stunning piece of jewelry",
    comment:
      "The craftsmanship is amazing. The jewelry looks elegant and shines beautifully under the light. It’s exactly what I hoped for—lightweight, comfortable, and incredibly stylish. The quality feels high-end, and it came in a lovely box that made the experience feel even more premium. I’ve already received several compliments on it.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Jewelry-Portrait-1.png",
        width: 349,
        height: 640,
      },
    ],
  },
  {
    rate: 5,
    author: "Anonymous",
    verifiedBuyer: true,
    country: {
      name: "United States",
      code: "US",
    },
    date: "2 months ago",
    title: "Great fit and stylish design",
    comment:
      "The clothing quality is fantastic—soft fabric, flattering fit, and vibrant colors that look just as good in person as they do online. Both pieces feel durable and comfortable, and the stitching is really well done. I also appreciate how true to size everything is. I’m definitely ordering more from this shop because the overall value is incredible.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-429124762-19881454-1.jpg",
        width: 640,
        height: 853,
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-429124762-19881457-1.jpg",
        width: 640,
        height: 853,
      },
    ],
  },
  {
    rate: 5,
    author: "Anonymous",
    verifiedBuyer: true,
    country: {
      name: "United States",
      code: "US",
    },
    date: "2 months ago",
    title: "Amazing quality",
    comment:
      "Very impressed with the overall quality and packaging. Everything feels premium and well-made, from the materials to the finishing details. The shipping was fast and the items arrived in perfect condition. This brand really exceeded my expectations, and I’m already browsing for my next purchase.",
  },
  {
    rate: 5,
    author: "Anonymous",
    verifiedBuyer: true,
    country: {
      name: "Australia",
      code: "AU",
    },
    date: "2 months ago",
    title: "Highly recommended",
    comment:
      "Exceeded expectations in every way. The materials feel luxurious, the craftsmanship is excellent, and the colors look amazing in person. Customer service was also incredibly helpful when I had a question about sizing. Fast delivery, beautiful packaging, and an overall great shopping experience. Couldn’t be happier with my purchase.",
  },
];

const Reviews18 = ({
  reviews = REVIEWS,
  pageAmmount = "1 - 20 out of 225 reviews",
  className,
}: Reviews18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex items-center justify-between border-b py-4">
          <p className="text-sm max-sm:sr-only">{pageAmmount}</p>
          <Select defaultValue="featured">
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="highest_rating">Highest Rating</SelectItem>
              <SelectItem value="lowest_rating">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {reviews.map((item) => (
            <Review key={crypto.randomUUID()} {...item} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button size="lg" className="rounded-full">
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
};

const Review = ({
  title,
  comment,
  images,
  rate,
  author,
  verifiedBuyer,
  country,
  date,
}: ReviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 py-10 lg:grid-cols-3">
      <div className="col-span-1">
        <div className="space-y-2">
          <Rating rate={rate} />
          <div className="flex items-baseline gap-2 lg:flex-col">
            <p className="text-base leading-normal font-medium text-muted-foreground lg:text-xl">
              {author}
            </p>
            {verifiedBuyer && (
              <p className="text-sm leading-normal font-medium text-green-600">
                Verified Bayer
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 lg:mt-4">
          {country && (
            <div className="inline-flex gap-1">
              <img
                alt={country.name}
                className="inline-block w-5"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
              />{" "}
              <span className="text-sm text-muted-foreground">
                <span>{country.name}</span>, <span>{date}</span>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2 lg:col-span-2 lg:space-y-5">
        <h2 className="text-lg leading-normal font-bold text-primary lg:text-2xl">
          {title}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{comment}</p>
        <div className="max-lg:mt-5">
          <ReviewCarousel images={images} />
        </div>
      </div>
    </div>
  );
};

const ReviewCarousel = ({
  images,
  galleryID,
}: {
  images?: ImageType[];
  galleryID?: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const generatedGalleryID = useId();
  const PhotoSwipeID = galleryID?.trim() ?? generatedGalleryID;

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#" + PhotoSwipeID,
      children: "a",
      bgOpacity: 1,
      wheelToZoom: true,
      arrowPrev: false,
      arrowNext: false,
      close: false,
      zoom: false,
      counter: false,
      mainClass: "[&>div:first-child]:!bg-background",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightboxRef.current = lightbox;
    const buttonClassName = cn(
      buttonVariants({
        variant: "outline",
        size: "icon",
        className: "rounded-full",
      }),
    );
    const indicatorClassName = cn(badgeVariants({ variant: "secondary" }));

    lightbox.on("uiRegister", () => {
      if (lightbox?.pswp?.ui) {
        lightbox.pswp.ui.registerElement({
          name: "custom-close-btn",
          order: 10,
          isButton: false,
          appendTo: "root",
          className: "absolute top-5 right-5",
          html: `
              <button type="button" id="pswp-close" class="${buttonClassName}">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            `,
          onInit: (el, pswp) => {
            el.querySelector("#pswp-close")?.addEventListener("click", () =>
              pswp.close(),
            );
          },
        });
      }

      if (lightbox?.pswp?.ui) {
        lightbox.pswp.ui.registerElement({
          name: "custom-indicator-btn",
          order: 10,
          isButton: false,
          appendTo: "root",
          className: "absolute top-5 left-5",
          html: `
              <div id="pswp-indicator" class="${indicatorClassName} h-8.5 px-4 !rounded-full">
              </div>
            `,
          onInit: (el, pswp) => {
            const indicatorElem = el.querySelector("#pswp-indicator");
            let prevIndex = -1;

            pswp.on("change", () => {
              prevIndex = pswp.currIndex;
              if (indicatorElem) {
                indicatorElem.innerHTML = `${prevIndex + 1} / ${pswp.getNumItems()}`;
              }
            });
          },
        });
      }

      if (lightbox?.pswp?.ui) {
        lightbox.pswp.ui.registerElement({
          name: "custom-next-prev-btns",
          order: 10,
          isButton: false,
          appendTo: "root",
          className: "absolute top-1/2 inset-x-0 -translate-y-1/2",
          html:
            images && images?.length < 2
              ? ""
              : `
            <div class="flex items-center justify-between px-4">
              <button id="pswp-prev" class="${buttonClassName}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button id="pswp-next" class="${buttonClassName}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
              
            `,
          onInit: (el, pswp) => {
            el.querySelector("#pswp-prev")?.addEventListener("click", () =>
              pswp.prev(),
            );
            el.querySelector("#pswp-next")?.addEventListener("click", () =>
              pswp.next(),
            );
          },
        });
      }
    });

    return () => lightbox.destroy();
  }, [PhotoSwipeID, images]);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    onSelect(api);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (lightboxRef.current && api) {
      lightboxRef.current.on("change", () => {
        api?.scrollTo(lightboxRef.current?.pswp?.currIndex || 0);
      });
    }
  }, [api, current]);

  if (!images) return;
  return (
    <div id={PhotoSwipeID}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images?.map((img) => (
            <CarouselItem
              className="sm:basis-1/3 lg:basis-1/5"
              key={crypto.randomUUID()}
            >
              <AspectRatio ratio={1}>
                <a
                  href={img.src}
                  data-pswp-width={img.width}
                  data-pswp-height={img.height}
                  target="_blank"
                  rel="noreferrer"
                  data-cropped="true"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block size-full object-cover object-center"
                  />
                </a>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export { Reviews18 };
