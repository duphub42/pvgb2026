"use client";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import React from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero211Props {
  className?: string;
}

const Hero211 = ({ className }: Hero211Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person4.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
  ];

  const css = `
  .swiper {
  width: 300px;
  height: 330px;
  border-radius: 30px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  border-radius: 25px;
  background-color: #000;
}

.swiper-pagination-bullet {
  background-color: #fff;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1;
}
`;

  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="container">
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
          <h1 className="font-calSans text-center text-5xl lg:text-6xl">
            We don&apos;t Believe in talk we deliver Results
          </h1>
          <p className="px-10 text-center text-muted-foreground lg:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus odit eius tenetur quaerat, aperiam, iste ea ex
          </p>
        </div>

        <div className="relative mt-16 flex h-full items-center justify-center">
          <Swiper
            loop={true}
            grabCursor={true}
            className="border bg-muted"
            autoplay={{
              delay: 1500,
              disableOnInteraction: true,
            }}
            effect="creative"
            pagination={{
              clickable: true,
            }}
            creativeEffect={{
              prev: {
                shadow: true,
                origin: "left center",
                translate: ["-5%", 0, -200],
                rotate: [0, 100, 0],
              },
              next: {
                origin: "right center",
                translate: ["5%", 0, -200],
                rotate: [0, -100, 0],
              },
            }}
            modules={[EffectCreative, Pagination, Autoplay]}
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img
                  className="h-full w-full object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative z-10 mx-auto mt-10 flex w-fit justify-center">
          <Button className="rounded-full px-4 py-2 active:scale-105">
            Get Started
          </Button>
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="absolute top-3 -right-30 h-1"
          >
            <p className="font-handwriting text-xl tracking-tight">
              Try free tier now
            </p>
            <svg
              width="82"
              className="-translate-x-1/2 pr-4"
              height="45"
              viewBox="0 0 82 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                d="M80.2759 1.95576C67.8687 20.6075 49.1102 55.0246 21.9767 39.1283C15.3299 35.2342 12.7124 29.0489 9.38472 22.4634C9.24096 22.1789 6.96955 15.0574 7.91833 15.4904C10.4589 16.65 25.535 23.253 15.8013 18.8782C14.7716 18.4154 8.31018 14.0924 7.25323 14.6265C4.37354 16.0816 2.6512 30.2469 1.58546 33.4898"
                stroke="#1C1C1C"
                strokeWidth="2.40332"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
        <div className="absolute right-0 bottom-0 left-0">
          <SkiperUiMarquee />
        </div>
      </div>
    </section>
  );
};

export { Hero211 };

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row ![animation-duration:10s]": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

function Card() {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        "relative size-17 cursor-pointer overflow-hidden rounded-2xl border border-muted p-4",
        "bg-gradient-to-b from-muted/50 to-background",
        "dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    ></motion.div>
  );
}

export function SkiperUiMarquee() {
  return (
    <div className="mx-auto px-4 py-12 md:px-8">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex w-full flex-col items-center justify-center"
            >
              <Marquee reverse repeat={5}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Card key={idx} />
                ))}
              </Marquee>
            </div>
          ))}
          <div className="absolute right-0 h-full w-24 bg-gradient-to-r from-transparent to-background to-70% dark:to-background" />
          <div className="absolute left-0 h-full w-24 bg-gradient-to-l from-transparent to-background to-70% dark:to-background" />
          <div className="absolute bottom-0 h-36 w-full bg-gradient-to-b from-transparent to-background to-70% dark:to-background" />
        </div>
      </div>
    </div>
  );
}
