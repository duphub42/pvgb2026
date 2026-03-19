"use client";
import "photoswipe/style.css";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useCallback, useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type ProductImages = {
  srcset: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  thumbnail: string;
}[];

interface ProductGallery4Props {
  images: ProductImages;
  galleryID: string;
  className?: string;
}

const PRODUCT_IMAGES = [
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Professional-Woman-&-Tote-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Professional-Woman-&-Tote-1.png 427w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Professional-Woman-&-Tote-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Professional-Woman-&-Tote-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Elegant-Professional-Look-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Elegant-Professional-Look-1.png 427w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Elegant-Professional-Look-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Elegant-Professional-Look-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-1-with-Tote-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-1-with-Tote-1.png 427w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-1-with-Tote-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-1-with-Tote-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Fashion-Look-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Fashion-Look-1.png 427w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Fashion-Look-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Fashion-Look-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Leather-Tote-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Leather-Tote-1.png 800w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Leather-Tote-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Leather-Tote-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Tote-Bag-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Tote-Bag-2.png 800w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Tote-Bag-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Woman-with-Tote-Bag-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
  {
    srcset:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-in-Interior-2.png 800w, https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-in-Interior-1.png 800w",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-in-Interior-2.png",
    thumbnail:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Stylish-Woman-in-Interior-1.png",
    alt: "",
    width: 800,
    height: 1200,
    sizes: "(min-width: 800px) 800px, 100vw",
  },
];

const ProductGallery4 = ({
  images = PRODUCT_IMAGES,
  galleryID = "ProductGallery4",
  className,
}: ProductGallery4Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const ignoreScroll = useRef(false);
  const isDesktop = useMediaQuery("(width >= 1024px)");
  const slideHeightRef = useRef<number | null>(null);

  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
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
          html: `
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
  }, [galleryID]);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("reInit", onSelect);
    api.on("select", onSelect);

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

  useEffect(() => {
    if (!api || !isDesktop) return;

    const slides = api.slideNodes();
    if (slides.length === 0) return;

    slideHeightRef.current = slides[0].offsetHeight;

    let lastIndex = -1;
    let ticking = false;

    const updateCurrentIndex = () => {
      if (!slideHeightRef.current) return;
      const scrollTop = window.scrollY;
      const slideHeight = slideHeightRef.current;
      const index = Math.round(scrollTop / slideHeight);

      if (index !== lastIndex) {
        lastIndex = index;
        setCurrent(index);
      }
    };

    const onScroll = () => {
      if (ignoreScroll.current || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        updateCurrentIndex();
        ticking = false;
      });
    };

    const onResize = () => {
      const newHeight = slides[0].offsetHeight;
      slideHeightRef.current = newHeight;
      updateCurrentIndex();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [api, isDesktop, setCurrent]);

  const handleThumbnailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const index = Number(target.getAttribute("data-index"));

    const slides = api?.slideNodes();

    if (slides && index >= 0 && index < slides.length) {
      const offsetTop =
        slides[index].getBoundingClientRect().top + window.scrollY;
      const headerOffset = 80;
      ignoreScroll.current = true;
      window.scrollTo({
        top: offsetTop - headerOffset,
        behavior: "smooth",
      });
      setCurrent(index);

      setTimeout(() => {
        ignoreScroll.current = false;
      }, 500);
    }
  };

  if (!images) return;

  return (
    <section className={cn("max-w-190", className)}>
      <div id={galleryID} className="relative flex gap-20">
        <div className="sticky top-5 hidden self-start lg:block">
          <ol className="flex max-h-[calc(100dvh-2.5rem)] w-fit flex-col gap-4 overflow-y-auto p-px [-ms-overflow-style:none] [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
            {images.map((img, index) => (
              <li
                className="w-14 shrink-0 grow-0"
                key={`product-gallery-4-image-thumbnail-${index}`}
              >
                <button
                  data-state={index === current ? "active" : "inactive"}
                  data-index={index}
                  type="button"
                  onClick={handleThumbnailClick}
                  className="block aspect-square w-14 overflow-hidden ring-foreground transition-shadow duration-200 data-[state=active]:ring"
                >
                  <img
                    src={img.thumbnail}
                    alt={img.alt}
                    className="block size-full object-cover object-center"
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            breakpoints: {
              "(min-width: 1024px)": {
                active: false,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5 md:-ml-6 lg:ml-0 lg:flex-col">
            {images.map((img, index) => (
              <CarouselItem
                className="pl-5 md:pl-6 lg:pl-0"
                key={`product-gallery-4-image-${index}`}
              >
                <AspectRatio ratio={1} className="size-full overflow-hidden">
                  <a
                    href={img.src}
                    data-pswp-width={img.width}
                    data-pswp-height={img.height}
                    data-pswp-srcset={img.srcset}
                    target="_blank"
                    rel="noreferrer"
                    data-cropped="true"
                  >
                    <img
                      srcSet={img.srcset}
                      alt={img.alt}
                      sizes={img.sizes}
                      className="block size-full object-cover object-center"
                    />
                  </a>
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="lg:hidden">
            <ol className="mt-4 flex items-center justify-center">
              {images.map((_, index) => (
                <button
                  onClick={() => api?.scrollTo(index)}
                  data-current={index + 1 === current}
                  key={`product-gallery-4-image-indicator-${index}`}
                  className="flex size-5.5 data-[current=true]:[&>span]:bg-primary"
                >
                  <span className="m-auto block size-1.5 rounded-full bg-primary/50"></span>
                </button>
              ))}
            </ol>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { ProductGallery4 };
