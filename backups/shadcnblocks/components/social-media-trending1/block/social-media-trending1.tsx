"use client";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const INSTAGRAM_ICON = {
  title: "Instagram",
  light:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
  dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
} as const;

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Product = {
  image: string;
  name: string;
  href: string;
};

type SocialMediaPost = {
  name: string;
  userAvatar: string;
  username: string;
  profileLink: string;
  socialMediaIcon: { title: string; light: string; dark: string };
  video: string;
  product: Product;
};

type SocialMediaPostCardProps = SocialMediaPost;

interface SocialMediaTrending1Props {
  className?: string;
  posts?: SocialMediaPost[];
}

const SOCIAL_MEDIA_POSTS: SocialMediaPost[] = [
  {
    name: "Emma Collins",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    profileLink: "#",
    username: "@emmacollins",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/6875749-hd_720_1366_25fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Modern-White-Headphones-1.png",
      name: "Wireless Headphones",
      href: "#",
    },
  },
  {
    name: "Olivia Reed",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    profileLink: "#",
    username: "@oliviawears",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/4773195-hd_720_1280_24fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-IGO10LkxP_g-unsplash-2.jpg",
      name: "Smart Watch",
      href: "#",
    },
  },
  {
    name: "Ethan Brooks",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    profileLink: "#",
    username: "@ethansound",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9130461-hd_720_1280_30fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/White-Wireless-Earbuds-in-Charging-Case-1.jpeg",
      name: "Wireless Earbuds",
      href: "#",
    },
  },

  {
    name: "Noah Bennett",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    profileLink: "#",
    username: "@noahplays",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/8128031-hd_720_1280_25fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/dennis-cortes-saa-4nYJWns-unsplash-1.jpg",
      name: "PS4 Controller",
      href: "#",
    },
  },
  {
    name: "Liam Walker",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    profileLink: "#",
    username: "@liamtech",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/4076728-hd_720_1280_50fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Laptop-on-Cozy-Blanket-1.png",
      name: "Everyday Laptop",
      href: "#",
    },
  },
  {
    name: "Sophia Martinez",
    userAvatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    profileLink: "#",
    username: "@sophiam",
    socialMediaIcon: INSTAGRAM_ICON,
    video:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3625767-hd_720_1366_50fps.mp4",
    product: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Sleek-Smartphone-Close-Up-1.png",
      name: "Smartphone",
      href: "#",
    },
  },
];

const SocialMediaTrending1 = ({
  className,
  posts = SOCIAL_MEDIA_POSTS,
}: SocialMediaTrending1Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback((emblaApi: CarouselApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi?.scrollProgress() ?? 0));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("scroll", handleScroll);
    api.on("reInit", handleScroll);

    return () => {
      api.off("scroll", handleScroll);
      api.off("reInit", handleScroll);
    };
  }, [api, handleScroll]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <h2 className="mb-8 text-center font-serif text-2xl leading-snug font-medium md:text-3xl">
          What Trending On Social
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="[&>div]:overflow-visible"
          setApi={setApi}
        >
          <CarouselContent>
            {posts.map((item, index) => (
              <CarouselItem
                className="basis-[75%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={index}
              >
                <SocialMediaPostCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1">
            <div className="relative h-0.5 w-full overflow-hidden bg-muted">
              <div
                className="absolute inset-y-0 -left-full w-full bg-primary"
                style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
              />
            </div>
          </div>
          <Button
            onClick={() => api?.scrollPrev()}
            className="shrink-0 rounded-full max-sm:hidden"
            size="icon-lg"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            className="shrink-0 rounded-full max-sm:hidden"
            size="icon-lg"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

const SocialMediaPostCard = ({
  userAvatar,
  username,
  name,
  socialMediaIcon,
  video,
  product,
}: SocialMediaPostCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Card className="h-full gap-3 p-4">
      <CardHeader className="flex items-center gap-2 p-0">
        <div className="shrink-0 basis-10">
          <Avatar className="size-10 border">
            <AvatarImage src={userAvatar} alt={name} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="text-sm leading-normal font-medium">{name}</div>
          <div className="text-xs leading-normal font-medium text-muted-foreground">
            {username}
          </div>
        </div>
        <div className="shrink-0 basis-4.5">
          <img
            className="size-4.5 dark:hidden"
            alt={socialMediaIcon.title}
            src={socialMediaIcon.light}
          />
          <img
            className="hidden size-4.5 dark:block"
            alt={socialMediaIcon.title}
            src={socialMediaIcon.dark}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={0.75} className="group overflow-hidden rounded-xl">
          <video
            muted
            playsInline
            preload="metadata"
            className="size-full object-cover object-center"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onMouseEnter={() => {
              videoRef.current?.play();
            }}
            onMouseLeave={() => {
              if (!videoRef.current) return;
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }}
            ref={videoRef}
            src={video}
          ></video>
          {!isPlaying && (
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-1/2 transition-opacity duration-500 group-hover:opacity-0">
              <Button size="icon-lg" className="rounded-full">
                <Play />
              </Button>
            </div>
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="p-0">
        <a
          className="flex w-full flex-1 items-center gap-3"
          href={product.href}
        >
          <div className="shrink-0 basis-10">
            <div className="size-10 overflow-hidden rounded-full">
              <img
                src={product.image}
                alt={product.name}
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm leading-normal font-medium">{product.name}</p>
          </div>
          <Button variant="outline" className="rounded-full" size="icon-sm">
            <ChevronRight />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export { SocialMediaTrending1 };
