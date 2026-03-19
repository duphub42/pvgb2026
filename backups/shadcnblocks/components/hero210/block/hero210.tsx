"use client";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { motion } from "framer-motion";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero210Props {
  className?: string;
}

const Hero210 = ({ className }: Hero210Props) => {
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
  ];

  const css = `
  .mySwiperHero210 {
    width: 100%;
    height: 420px;
    padding-bottom: 50px;
  }
  
  .mySwiperHero210 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
  
  .mySwiperHero210 .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
    
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="container px-0 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-8 sm:px-0">
          <h1 className="font-calSans text-center text-5xl lg:text-7xl">
            Your Photos
          </h1>
          <p className="text-center text-muted-foreground lg:text-lg">
            All your memories in one place. Organize, relive, and share your
            favorite moments with a photo library that feels like home.
          </p>
        </div>

        <div className="relative mt-12 h-[420px] w-full lg:px-20">
          <div className="absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent sm:via-background md:w-58 lg:left-16" />
          <div className="absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent sm:via-background md:w-58 lg:right-16" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Swiper
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              grabCursor={true}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              className="mySwiperHero210"
              modules={[EffectCoverflow, Autoplay]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                    src={image.src}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-4 flex w-fit justify-center">
          <Button className="rounded-full px-4 py-2 active:scale-105">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero210 };
