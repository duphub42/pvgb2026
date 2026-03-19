import { ChevronRight } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FooterLink = {
  text: string;
  link?: string;
};

type SocialIcon = {
  title: string;
  light: string;
  dark: string;
};

type SocialLink = {
  link: string;
  icon: SocialIcon;
};

type HomeLink = {
  logo: {
    light: string;
    dark?: string;
  };
  link: string;
  alt?: string;
};

type StoreLink = {
  name: string;
  link: string;
  address?: string;
};

type FooterLinksSection = {
  title: string;
  items: FooterLink[];
};

type AppSection = {
  title?: string;
  description?: string;
  links?: {
    link: string;
    badge: string;
    alt?: string;
  }[];
};

interface FooterHomeSectionProps {
  home: HomeLink;
  description?: string;
  socialMediaLinks?: SocialLink[];
}

type AppPromoSectionProps = AppSection;

interface EcommerceFooter9Props {
  className?: string;
  stores?: StoreLink[];
  home: HomeLink;
  description?: string;
  socialMediaLinks?: SocialLink[];
  links?: FooterLinksSection[];
  app?: AppSection;
  paymentMethods: string[];
}

const FOOTER_DATA = {
  stores: [
    {
      name: "New York Flagship",
      link: "#",
      address: "123 Madison Ave, New York, NY 10010",
    },
    {
      name: "Los Angeles Store",
      link: "#",
      address: "456 Sunset Blvd, Los Angeles, CA 90028",
    },
    {
      name: "London Showroom",
      link: "#",
      address: "21 Oxford Street, London W1D 2LT",
    },
    {
      name: "Paris Boutique",
      link: "#",
      address: "8 Rue de Rivoli, 75001 Paris",
    },
  ],
  home: {
    logo: {
      light:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    alt: "Brand logo",
    link: "#",
  },
  description:
    "Thoughtfully designed products made to elevate everyday living. Quality materials, timeless style, and effortless comfort.",
  links: [
    {
      title: "Collections",
      items: [
        {
          text: "New Arrivals",
          link: "#",
        },
        {
          text: "Best Sellers",
          link: "#",
        },
        {
          text: "Seasonal Edits",
          link: "#",
        },
        {
          text: "Wardrobe Essentials",
          link: "#",
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          text: "Contact Us",
          link: "#",
        },
        {
          text: "FAQs",
          link: "#",
        },
        {
          text: "Shipping & Tracking",
          link: "#",
        },
        {
          text: "Returns & Exchanges",
          link: "#",
        },
      ],
    },
    {
      title: "Information",
      items: [
        {
          text: "Terms and Conditions",
          link: "#",
        },
        {
          text: "Privacy Policy",
          link: "#",
        },
        {
          text: "Warranty Policy",
          link: "#",
        },
        {
          text: "Terms of Service",
          link: "#",
        },
      ],
    },
  ],
  paymentMethods: [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amazonpay.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/applepay.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/discover.svg",
  ],
  app: {
    title: "Shop On The Go",
    description:
      "Download our app for exclusive offers, early access drops, and seamless checkout.",
    links: [
      {
        link: "#",
        badge:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/googleplay.svg",
        alt: "",
      },
      {
        link: "#",
        badge:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/appstore.svg",
        alt: "",
      },
    ],
  },
  socialMediaLinks: (() => {
    const SOCIAL_ICONS = {
      facebook: {
        title: "Facebook",
        light:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
        dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
      },
      x: {
        title: "X",
        light:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
        dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
      },
      instagram: {
        title: "Instagram",
        light:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
        dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
      },
    } as const;
    return [
      { icon: SOCIAL_ICONS.facebook, link: "#" },
      { icon: SOCIAL_ICONS.x, link: "#" },
      { icon: SOCIAL_ICONS.instagram, link: "#" },
    ];
  })(),
};

const EcommerceFooter9 = ({
  className,
  stores = FOOTER_DATA.stores,
  home = FOOTER_DATA.home,
  description = FOOTER_DATA.description,
  socialMediaLinks = FOOTER_DATA.socialMediaLinks,
  links = FOOTER_DATA.links,
  app = FOOTER_DATA.app,
  paymentMethods = FOOTER_DATA.paymentMethods,
}: EcommerceFooter9Props) => {
  return (
    <footer className={cn("py-10", className)}>
      <div className="container">
        <div className="py-10">
          <FooterStoresLinks links={stores} />
        </div>
        <Separator />
        <div className="py-10">
          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
            <div className="sm:col-span-2">
              <FooterHomeSection
                home={home}
                description={description}
                socialMediaLinks={socialMediaLinks}
              />
            </div>
            <FooterLinksSection links={links} />
            <div className="lg:col-span-2">
              <AppPromoSection
                title={app.title}
                description={app.description}
                links={app.links}
              />
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-5 py-5 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Made with ❤️ by <b>shadcnblocks.com</b>
          </p>
          <PaymentMethods cards={paymentMethods} />
        </div>
      </div>
    </footer>
  );
};

const FooterHomeSection = ({
  home,
  description,
  socialMediaLinks,
}: FooterHomeSectionProps) => {
  return (
    <div className="space-y-5">
      <HomeLink home={home} />
      {description && (
        <p className="text-sm leading-relaxed text-balance text-muted-foreground">
          {description}
        </p>
      )}
      <div className="space-y-2.5">
        <div className="text-xl leading-relaxed font-semibold">Follow Us</div>
        <SocialMediaSection links={socialMediaLinks} />
      </div>
    </div>
  );
};

const FooterStoresLinks = ({ links }: { links: StoreLink[] }) => {
  if (!links) return;

  return (
    <ul className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4">
      {links.map(({ name, address, link }, index) => (
        <li key={index} className="space-y-1">
          <Button
            asChild
            className="gap-4 p-0 text-base hover:bg-background"
            variant="ghost"
          >
            <a href={link}>
              {name}
              <div className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ChevronRight />
              </div>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{address}</p>
        </li>
      ))}
    </ul>
  );
};

const HomeLink = ({ home }: { home: HomeLink }) => {
  return (
    <a href={home.link} className="inline-block">
      <div className="max-w-50">
        <img
          className="w-full dark:hidden"
          src={home.logo.light}
          alt={home.alt && "Brand Logo"}
        />
        {home.logo.dark && (
          <img
            className="hidden w-full dark:inline-block"
            src={home.logo.dark}
            alt={home.alt && "Brand Logo"}
          />
        )}
      </div>
    </a>
  );
};

const SocialMediaSection = ({ links }: { links?: SocialLink[] }) => {
  if (!links) return;

  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon-sm" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-3.5 dark:hidden"
                alt={icon.title}
                src={icon.light}
              />
              <img
                className="hidden size-3.5 dark:block"
                alt={icon.title}
                src={icon.dark}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterLinksSection = ({ links }: { links?: FooterLinksSection[] }) => {
  if (!links) return;

  return (
    <Fragment>
      {links.map(({ title, items }, i) => (
        <div key={i} className="space-y-4">
          <h2 className="text-base leading-normal font-semibold">{title}</h2>
          <div>
            {items.map(({ link, text }, j) => (
              <a
                key={`${i}-${j}`}
                className="block py-2 text-sm leading-normal text-muted-foreground"
                href={link}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

const AppPromoSection = ({
  title,
  description,
  links,
}: AppPromoSectionProps) => {
  if (!links) return;

  return (
    <div className="space-y-5">
      {title && (
        <h2 className="text-base leading-normal font-semibold">{title}</h2>
      )}
      {description && (
        <p className="text-sm leading-relaxed text-balance text-muted-foreground">
          {description}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {links.map(({ link, badge, alt }, index) => (
          <a
            className="block flex-1 shrink-0 grow-0 basis-33"
            href={link}
            key={index}
          >
            <img src={badge} alt={alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter9 };
