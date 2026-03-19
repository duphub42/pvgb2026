import type { CSSProperties } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const INSTAGRAM_ICON = {
  title: "Instagram",
  light:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
  dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
} as const;

type SocialMediaPost = {
  userAvatar: string;
  username: string;
  image: {
    src: string;
    alt: string;
  };
  productLink: string;
  socialMediaIcon: { title: string; light: string; dark: string };
};

interface SocialMediaTrending4Props {
  className?: string;
  posts?: SocialMediaPost[];
  title?: string;
  socialMediaProfile?: {
    href: string;
    label: string;
  };
}

const SECTION_DATA = {
  title: "Follow Us!",
  socialMediaProfile: {
    href: "#",
    label: "@Instagram",
  },
  posts: [
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      username: "@emmacollins",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Chic-Fashion-Portrait-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      username: "@oliviawears",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Contemplative-Casual-Chic-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      username: "@ethansound",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Elegant-Outdoor-Trio-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      username: "@noahplays",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Fashionable-Woman-in-Monochrome-Attire-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      username: "@liamtech",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Minimalist-Fashion-Portrait-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      username: "@sophiam",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Fashion-Portrait-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      username: "@emmacollins",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Casual-Style-m-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      username: "@oliviawears",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Portrait-of-a-Woman-and-Man-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      username: "@ethansound",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-7494681.jpg",
        alt: "",
      },
      productLink: "#",
    },
    {
      userAvatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      username: "@noahplays",
      socialMediaIcon: INSTAGRAM_ICON,
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764033-2.jpg",
        alt: "",
      },
      productLink: "#",
    },
  ],
};

const COLUMNS = 4;

const PostCard = ({ post }: { post: SocialMediaPost }) => {
  const { userAvatar, username, socialMediaIcon, image, productLink } = post;
  return (
    <Card className="group relative gap-0 overflow-hidden p-0">
      <a href={productLink} className="absolute inset-0 z-10 block" />
      <CardContent className="p-0">
        <AspectRatio className="overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="block size-full origin-center object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="gap-2 px-4 py-2.5">
        <div className="shrink-0 basis-10">
          <Avatar className="size-10 border">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="text-sm leading-normal font-medium">{username}</div>
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
      </CardFooter>
    </Card>
  );
};

const MarqueeColumn = ({
  posts,
  reverse = false,
  duration = "30s",
}: {
  posts: SocialMediaPost[];
  reverse?: boolean;
  duration?: string;
}) => {
  return (
    <div
      className="relative flex flex-col gap-(--gap) overflow-hidden"
      style={
        {
          "--gap": "1rem",
          "--duration": duration,
        } as CSSProperties
      }
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 animate-marquee-vertical flex-col justify-around gap-4",
            reverse && "direction-[reverse]",
          )}
          style={{ animationDuration: duration }}
        >
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
};

const SocialMediaTrending4 = ({
  className,
  posts = SECTION_DATA.posts,
  title = SECTION_DATA.title,
  socialMediaProfile = SECTION_DATA.socialMediaProfile,
}: SocialMediaTrending4Props) => {
  const columns: SocialMediaPost[][] = Array.from(
    { length: COLUMNS },
    () => [],
  );
  posts.forEach((post, i) => {
    columns[i % COLUMNS].push(post);
  });

  return (
    <section className={cn("overflow-hidden bg-background py-32", className)}>
      <div className="container space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl leading-tight font-bold tracking-tight max-md:text-center md:text-3xl lg:text-4xl">
              {title}
            </h2>
          </div>
          <div className="shrink-0 max-md:hidden">
            <Button asChild variant="link" className="underline">
              <a href={socialMediaProfile.href}>{socialMediaProfile.label}</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-background to-transparent" />

          <div className="grid h-[600px] grid-cols-2 gap-4 overflow-hidden md:grid-cols-4">
            {columns.map((columnPosts, colIndex) => (
              <MarqueeColumn
                key={colIndex}
                posts={columnPosts}
                reverse={colIndex % 2 === 1}
                duration={`${25 + colIndex * 5}s`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center md:hidden">
          <Button asChild variant="link" className="underline">
            <a href={socialMediaProfile.href}>{socialMediaProfile.label}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { SocialMediaTrending4 };
