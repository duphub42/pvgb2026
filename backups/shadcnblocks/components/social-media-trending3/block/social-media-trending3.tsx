import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSTAGRAM_ICON = {
  title: "Instagram",
  light:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
  dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
} as const;

type SocialMediaPost = {
  image: {
    src: string;
    alt: string;
  };
  productLink: string;
};

type FeaturedSection = {
  title: string;
  profile: {
    image: string;
    username: string;
    followers: string;
  };
  cta: {
    label: string;
    href: string;
  };
};

interface SocialMediaTrending3Props {
  className?: string;
  posts: SocialMediaPost[];
  featuredSection: FeaturedSection;
}

const SECTION_DATA = {
  featuredSection: {
    title: "Connect With Us Online",
    profile: {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-6.svg",
      username: "@username",
      followers: "28k Followers",
    },
    cta: {
      label: "Join Now",
      href: "#",
    },
  },
  posts: [
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Checkered-Sunglasses-on-Stone-Pedestal-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Gold-Earrings-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Golden-Hair-Clip-Close-Up-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Jewelry-Close-Up-2.png",
        alt: "",
      },
      productLink: "#",
    },

    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Pearl-Bracelet-on-Wrist-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Gold-Hoop-Earrings-on-Ceramic-Dish-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Stylish-Seated-Portrait-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Gold-Heart-Earrings-2.png",
        alt: "",
      },
      productLink: "#",
    },
    {
      image: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Blonde-Hairstyle-2.png",
        alt: "",
      },
      productLink: "#",
    },
  ],
};

const SocialMediaTrending3 = ({
  className,
  posts = SECTION_DATA.posts,
  featuredSection = SECTION_DATA.featuredSection,
}: SocialMediaTrending3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <ul className="grid h-full max-h-150 grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-6 [&>li]:overflow-hidden [&>li]:rounded-xl [&>li]:bg-accent">
          <li className="col-span-2">
            <div className="flex h-full flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="text-2xl leading-tight tracking-tight sm:max-w-60">
                  {featuredSection.title}
                </h3>
              </div>
              <div className="space-y-10 lg:basis-50">
                <div className="flex items-center gap-2.5">
                  <div className="shrink-0 basis-10">
                    <Avatar className="size-10 border">
                      <AvatarImage
                        src={featuredSection.profile.image}
                        alt={featuredSection.profile.username}
                      />
                      <AvatarFallback>
                        {featuredSection.profile.username}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-0.5">
                    <p className="leading-normal font-medium">
                      {featuredSection.profile.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {featuredSection.profile.followers}
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full">
                  <a href={featuredSection.cta.href}>
                    {featuredSection.cta.label}
                  </a>
                </Button>
              </div>
            </div>
          </li>
          {posts.map(({ image, productLink }, index) => (
            <li
              key={index}
              className="not-nth-8:aspect-square nth-8:col-span-2 nth-8:aspect-[2.034]"
            >
              <a
                href={productLink}
                className="group relative block size-full overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="block size-full object-cover object-center"
                />
                <div className="pointer-events-none absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                  <img
                    className="size-5 dark:hidden"
                    alt={INSTAGRAM_ICON.title}
                    src={INSTAGRAM_ICON.light}
                  />
                  <img
                    className="hidden size-5 dark:block"
                    alt={INSTAGRAM_ICON.title}
                    src={INSTAGRAM_ICON.dark}
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { SocialMediaTrending3 };
