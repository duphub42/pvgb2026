"use client";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  type LucideIcon,
  Menu,
  Phone,
  Search,
  Send,
  ShoppingBag,
  X,
} from "lucide-react";
import { type CSSProperties, Fragment, useState } from "react";

import {
  Logo,
  LogoImage,
  LogoTextDesktop,
} from "@/components/shadcnblocks/logo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import usePreventScrollLock from "@/hooks/usePreventScrollLock";
import { cn } from "@/lib/utils";

type MegaMenuSectionType = {
  label: string;
  href: string;
  id: string;
  imageSrc: string;
  items: {
    label: string;
    href: string;
  }[];
};

type FeaturedItemType = {
  imageSrc: string;
  href: string;
  label: string;
};

type MenuItemType = {
  label: string;
  href?: string;
  accentColor?: string;
  id?: string;
  megaMenu?: {
    sections?: MegaMenuSectionType[];
    featuredItems?: FeaturedItemType[];
  };
};

type SocialIcon = {
  title: string;
  light: string;
  dark: string;
};

type SocialLink = {
  href: string;
  icon: SocialIcon;
};

type HelpfullLink = {
  href: string;
  label: string;
};

type ContactInfoItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type HomeLink = {
  href: string;
  logo: {
    src: string;
    alt: string;
  };
};

type MenuItemProps = MenuItemType;

interface EcommerceNavbar1Props {
  menu: MenuItemType[];
  socialLinks?: SocialLink[];
  helpfulLinks?: HelpfullLink[];
  contactInfo?: ContactInfoItem[];
  home: HomeLink;
  className?: string;
}

interface MenuLinksListProps {
  lists?: MegaMenuSectionType[];
}

interface MenuFeaturedLinksProps {
  lists?: FeaturedItemType[];
}

interface MenuLinksProps {
  list: MegaMenuSectionType;
}

interface MobileNavProps {
  menu: MenuItemType[];
  socialLinks?: SocialLink[];
  helpfulLinks?: HelpfullLink[];
  contactInfo?: ContactInfoItem[];
}

type MenuFeaturedLinkProps = FeaturedItemType;

interface MegaMenuMobileProps {
  menuItem?: MenuItemType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openSubMenu: boolean;
  handleOnSubMenuClick: (id?: string) => void;
  linkStyle?: string;
  closeAll: () => void;
}

interface SubMenuMobileProps {
  subMenu?: MegaMenuSectionType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkStyle?: string;
  closeAll: () => void;
}

interface SocialMediaSectionProps {
  links?: SocialLink[];
}

interface HelpfullLinksProps {
  links?: HelpfullLink[];
}

interface ContactInfoListProps {
  links?: ContactInfoItem[];
}

const HELPFULL_LINKS = [
  {
    label: "Returns & Exchanges",
    href: "#",
  },
  {
    label: "Shipping & Tracking",
    href: "#",
  },
  {
    label: "Terms & conditions",
    href: "#",
  },
];

const CONTACT_INFO = [
  {
    label: "+1 855-987-4420",
    href: "tel:+18559874420",
    icon: Phone,
  },
  {
    label: "support@fashion.co",
    href: "mailto:support@fashion.co",
    icon: Send,
  },
];

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

const SOCIAL_MEDIA_LINKS = [
  { icon: SOCIAL_ICONS.facebook, href: "#" },
  { icon: SOCIAL_ICONS.x, href: "#" },
  { icon: SOCIAL_ICONS.instagram, href: "#" },
];

const MENU = [
  {
    id: "store",
    label: "Store",
    href: "#",
    megaMenu: {
      sections: [
        {
          label: "Accessories",
          href: "#",
          id: "accessories",
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Watch-on-Womans-Wrist-2.png",
          items: [
            { label: "Bags & Backpacks", href: "#" },
            { label: "Hats & Caps", href: "#" },
            { label: "Belts", href: "#" },
            { label: "Jewelry", href: "#" },
            { label: "Sunglasses", href: "#" },
            { label: "Watches", href: "#" },
          ],
        },
        {
          label: "Men",
          href: "#",
          id: "men",
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-cottonbro-6764036-2.jpg",
          items: [
            { label: "New Arrivals", href: "#" },
            { label: "T-Shirts", href: "#" },
            { label: "Shirts", href: "#" },
            { label: "Jackets & Coats", href: "#" },
            { label: "Pants", href: "#" },
            { label: "Shoes", href: "#" },
          ],
        },
        {
          label: "Women",
          href: "#",
          id: "women",
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/pexels-429124762-19881454-2.jpg",
          items: [
            { label: "New Arrivals", href: "#" },
            { label: "Dresses", href: "#" },
            { label: "Tops & Blouses", href: "#" },
            { label: "Outerwear", href: "#" },
            { label: "Skirts", href: "#" },
            { label: "Shoes", href: "#" },
          ],
        },
      ],
      featuredItems: [
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Summer-Fashion-Duo-2.png",
          href: "#",
          label: "Summer Edit",
        },
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Contemplative-Casual-Chic-2.png",
          href: "#",
          label: "Best Sellers",
        },
      ],
    },
  },
  {
    id: "collections",
    label: "Collections",
    href: "#",
    megaMenu: {
      featuredItems: [
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Fashionable-Woman-in-Monochrome-Attire-2.png",
          href: "#",
          label: "Wardrobe Essentials",
        },
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Chic-Fashion-Portrait-2.png",
          href: "#",
          label: "Minimal Classics",
        },
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Fashion-Portrait-2.png",
          href: "#",
          label: "Modern Workwear",
        },
        {
          imageSrc:
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Portrait-of-a-Woman-and-Man-2.png",
          href: "#",
          label: "Weekend Wear",
        },
      ],
    },
  },
  {
    label: "Sale",
    href: "#",
    accentColor: "oklch(58.6% 0.253 17.585)",
  },
  {
    label: "Blog",
    href: "#",
  },
];

const HOME = {
  href: "https://shadcnblocks.com",
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "Shadcnblocks.com",
  },
};

const EcommerceNavbar1 = ({
  menu = MENU,
  home = HOME,
  helpfulLinks = HELPFULL_LINKS,
  socialLinks = SOCIAL_MEDIA_LINKS,
  contactInfo = CONTACT_INFO,
  className,
}: EcommerceNavbar1Props) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn("w-full", className)}>
      {isMobile ? (
        <div className="md:hidden">
          <MobileNav
            menu={menu}
            helpfulLinks={helpfulLinks}
            socialLinks={socialLinks}
            contactInfo={contactInfo}
          />
        </div>
      ) : (
        <NavigationMenu
          viewport={isMobile}
          className="w-full max-w-full border-b max-md:hidden [&>div]:w-full"
        >
          <NavigationMenuList asChild className="h-fit min-h-17.5 px-7.5">
            <div className="flex items-center gap-6">
              <div>
                <Logo url={home.href}>
                  <LogoImage
                    src={home.logo.src}
                    alt={home.logo.alt}
                    className="size-8 dark:invert"
                  />
                  <LogoTextDesktop className="font-medium text-foreground">
                    Shadcnblocks.com
                  </LogoTextDesktop>
                </Logo>
              </div>
              <div className="flex items-center gap-1">
                {menu.map((item, index) => (
                  <NavigationMenuItem key={index} className="static" asChild>
                    <MenuItem {...item} />
                  </NavigationMenuItem>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-4">
                <CountrySelector />
                <SecondaryNav />
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
};

const MenuItem = ({ label, href, megaMenu, accentColor }: MenuItemProps) => {
  const menuLinkStyle = "uppercase text-xs font-semibold px-4";
  if (!megaMenu) {
    return (
      <NavigationMenuLink
        asChild
        style={{
          color: accentColor,
        }}
        className={menuLinkStyle}
      >
        <a href={href}>{label}</a>
      </NavigationMenuLink>
    );
  }

  return (
    <Fragment>
      <NavigationMenuTrigger
        style={{
          color: accentColor,
        }}
        className={menuLinkStyle}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={clsx(
          "inset-x-0",
          "mt-0! h-dvh max-h-100 rounded-none! p-0",
          "group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-none! group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-none!",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-7.5 py-10.5">
          <div className="flex justify-center gap-6">
            {megaMenu?.sections && (
              <div className={clsx(megaMenu?.featuredItems && "basis-[60%]")}>
                <MenuLinksList lists={megaMenu?.sections} />
              </div>
            )}
            {megaMenu?.featuredItems && (
              <div
                className={clsx(megaMenu?.sections ? "basis-[40%]" : "flex-1")}
              >
                <MenuFeaturedLinks lists={megaMenu?.featuredItems} />
              </div>
            )}
          </div>
        </div>
      </NavigationMenuContent>
    </Fragment>
  );
};

const MenuLinksList = ({ lists }: MenuLinksListProps) => {
  if (!lists) return;

  return (
    <ul className="flex gap-7.5">
      {lists.map((list, index) => (
        <li key={index} className="basis-1/3">
          <MenuLinks list={list} />
        </li>
      ))}
    </ul>
  );
};

const MenuLinks = ({ list }: MenuLinksProps) => {
  const { label, href, items } = list;

  return (
    <div className="space-y-1.5">
      <h2 className="px-1 text-xs leading-relaxed font-semibold tracking-wider uppercase">
        <a href={href}>{label}</a>
      </h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a
              className="block w-full rounded-sm px-1 py-0.5 text-xs leading-normal text-muted-foreground hover:bg-muted"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuFeaturedLinks = ({ lists }: MenuFeaturedLinksProps) => {
  if (!lists) return;

  return (
    <div className="flex gap-7.5">
      {lists.map((item, index) => (
        <div className="flex-1" key={index}>
          <MenuFeaturedLink {...item} />
        </div>
      ))}
    </div>
  );
};

const MenuFeaturedLink = ({ href, imageSrc, label }: MenuFeaturedLinkProps) => {
  return (
    <a href={href} className="group/feat-link block space-y-3">
      <AspectRatio className="overflow-hidden">
        <img
          src={imageSrc}
          alt={label}
          className="block size-full object-cover object-center transition-all duration-500 group-hover/feat-link:scale-105 group-hover/feat-link:opacity-80"
        />
      </AspectRatio>
      <div className="text-center text-xs leading-relaxed font-semibold tracking-wider uppercase">
        {label}
      </div>
    </a>
  );
};

const SecondaryNav = () => {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon">
        <CircleUserRound />
      </Button>
      <div className="relative">
        <Button variant="ghost" size="icon">
          <ShoppingBag />
        </Button>
        <div className="absolute -top-4 left-1/2">
          <Badge className="text-[0.5rem]">0</Badge>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Search />
      </Button>
    </div>
  );
};

const CountrySelector = ({ className }: { className?: string }) => {
  return (
    <Select defaultValue="AUS">
      <SelectTrigger
        className={cn(
          "w-42 border-none text-xs leading-relaxed font-semibold text-muted-foreground uppercase shadow-none",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="AUS">Australia (AUD $)</SelectItem>
        <SelectItem value="CAN">Canada (CAN $)</SelectItem>
        <SelectItem value="FR">France (EUR €)</SelectItem>
        <SelectItem value="US">United States (USD $)</SelectItem>
      </SelectContent>
    </Select>
  );
};

const MobileNav = ({
  menu,
  socialLinks,
  helpfulLinks,
  contactInfo,
}: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const [menuItem, setMenuItem] = useState<MenuItemType>();
  const [subMenu, setSubMenu] = useState<MegaMenuSectionType>();

  usePreventScrollLock(open);

  const closeAll = () => {
    setOpen(false);
    setOpenMegaMenu(false);
    setOpenSubMenu(false);
  };

  const handleMegaMenu = (value: boolean) => {
    setOpenMegaMenu(value);
  };

  const handleSheet = () => {
    setOpen((state) => !state);
  };

  const handleOnMenuItemClick = (id?: string) => {
    const foundMenu = menu.find((item) => item.id === id);

    setMenuItem(foundMenu);
    setOpenMegaMenu(true);
  };

  const handleSubMenu = (value: boolean) => {
    setOpenSubMenu(value);
  };

  const handleOnSubMenuClick = (id?: string) => {
    const foundMenu = menuItem?.megaMenu?.sections?.find(
      (item) => item.id === id,
    );

    setSubMenu(foundMenu);
    setOpenSubMenu(true);
  };

  const linkStyle =
    "flex w-full py-4 px-2 justify-between hover:bg-inherit rounded-none h-fit border-b font-semibold hover:no-underline text-sm leading-relaxed";

  return (
    <Fragment>
      <nav className="h-15 border-b bg-background">
        <div className="flex h-full items-center gap-4 px-4">
          <Logo url="https://shadcnblocks.com">
            <LogoImage
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              alt="Shadcnblocks.com"
              className="size-8 dark:invert"
            />
          </Logo>
          <div className="ml-auto flex items-center gap-2">
            <SecondaryNav />
            <Button onClick={handleSheet} size="icon" variant="ghost">
              <Menu />
            </Button>
          </div>
        </div>
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          style={
            {
              "--padding-top": "1.25rem",
              "--header-height": "2.25rem",
              "--footer-height": "4rem",
              "--sheet-width": "27.75rem",
            } as CSSProperties
          }
          side="left"
          className="w-full sm:max-w-[var(--sheet-width)] [&>button]:hidden"
          aria-describedby={undefined}
          onInteractOutside={(e: Event) => {
            if (openMegaMenu) {
              e.preventDefault();
            }
          }}
        >
          <div className="h-full pt-5">
            <SheetHeader className="h-9 p-0 px-6">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex items-center justify-between gap-5">
                <SheetClose asChild>
                  <Button size="icon" variant="ghost">
                    <X />
                  </Button>
                </SheetClose>
                <Button variant="ghost">
                  <CircleUserRound />
                  Login
                </Button>
              </div>
            </SheetHeader>
            <div className="h-[calc(100dvh-var(--padding-top)-var(--header-height)-var(--footer-height))] overflow-auto">
              <div className="px-6 py-5">
                <div>
                  {menu.map(
                    ({ megaMenu, id, label, accentColor, href }, index) =>
                      megaMenu ? (
                        <Button
                          key={index}
                          className={linkStyle}
                          variant="ghost"
                          onClick={() => handleOnMenuItemClick(id)}
                        >
                          {label}
                          <ChevronRight />
                        </Button>
                      ) : (
                        <a
                          style={{
                            color: accentColor,
                          }}
                          className={linkStyle}
                          href={href}
                          key={index}
                        >
                          {label}
                        </a>
                      ),
                  )}
                </div>
                <div className="mt-6 space-y-5">
                  <HelpfullLinks links={helpfulLinks} />
                  <div>
                    <ContactInfoList links={contactInfo} />
                    <SocialMediaSection links={socialLinks} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="absolute inset-x-0 bottom-0 border-t bg-background px-6 py-4">
            <CountrySelector className="w-full" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <MegaMenuMobile
        menuItem={menuItem}
        open={openMegaMenu}
        onOpenChange={handleMegaMenu}
        openSubMenu={openSubMenu}
        handleOnSubMenuClick={handleOnSubMenuClick}
        linkStyle={linkStyle}
        closeAll={closeAll}
      />
      <SubMenuMobile
        subMenu={subMenu}
        onOpenChange={handleSubMenu}
        open={openSubMenu}
        linkStyle={linkStyle}
        closeAll={closeAll}
      />
    </Fragment>
  );
};

const MegaMenuMobile = ({
  menuItem,
  open,
  onOpenChange,
  openSubMenu,
  handleOnSubMenuClick,
  linkStyle,
  closeAll,
}: MegaMenuMobileProps) => {
  if (!menuItem) return;

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent
          side="left"
          aria-describedby={undefined}
          className="w-full gap-0 overflow-auto px-6 pt-5 pb-10 sm:max-w-[27.75rem] [&>button]:hidden"
          onInteractOutside={(e: Event) => {
            if (openSubMenu) {
              e.preventDefault();
            }
          }}
        >
          <SheetHeader className="p-0">
            <div className="flex items-center justify-between gap-5">
              <Button onClick={closeAll} size="icon" variant="ghost">
                <X />
              </Button>
            </div>
            <div className="flex items-center py-4">
              <Button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onOpenChange(false);
                }}
                variant="ghost"
              >
                <ChevronLeft />
              </Button>
              <SheetTitle className="flex-1 text-center text-sm">
                {menuItem.label}
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="space-y-6">
            <div>
              {menuItem?.megaMenu?.sections?.map(({ label, id }, index) => (
                <Button
                  onClick={() => {
                    handleOnSubMenuClick(id);
                  }}
                  key={index}
                  className={linkStyle}
                  variant="ghost"
                >
                  {label}
                  <ChevronRight />
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4.5">
              {menuItem?.megaMenu?.featuredItems?.map((item, index) => (
                <MenuFeaturedLink key={index} {...item} />
              ))}
            </div>
            <Button size="lg" className="w-full" variant="outline">
              <a href={menuItem?.href}>View {menuItem?.label}</a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

const SubMenuMobile = ({
  subMenu,
  open,
  onOpenChange,
  linkStyle,
  closeAll,
}: SubMenuMobileProps) => {
  if (!subMenu) return;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="left"
        aria-describedby={undefined}
        className="w-full gap-0 overflow-auto sm:max-w-[27.75rem] [&>button]:hidden"
      >
        <div>
          <AspectRatio ratio={1.77} className="overflow-hidden">
            <img
              src={subMenu.imageSrc}
              alt={subMenu.label}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
        </div>
        <div className="px-6 pt-5 pb-10">
          <SheetHeader className="p-0">
            <div className="flex items-center justify-between gap-5">
              <Button onClick={closeAll} size="icon" variant="ghost">
                <X />
              </Button>
            </div>
            <div className="flex items-center py-4">
              <Button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onOpenChange(false);
                }}
                variant="ghost"
              >
                <ChevronLeft />
              </Button>
              <SheetTitle className="flex-1 text-center text-sm">
                {subMenu.label}
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="space-y-6">
            <div>
              {subMenu?.items?.map(({ label, href }, index) => (
                <Button
                  asChild
                  key={index}
                  className={linkStyle}
                  variant="ghost"
                >
                  <a href={href}>
                    {label}
                    <ChevronRight />
                  </a>
                </Button>
              ))}
            </div>
            <Button size="lg" className="w-full" variant="outline">
              <a href={subMenu?.href}>View {subMenu?.label}</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  if (!links) return;

  return (
    <ul className="flex flex-wrap">
      {links.map(({ icon, href }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon" variant="ghost" asChild className="rounded-full">
            <a href={href}>
              <img
                className="hidden size-4 dark:block"
                alt={icon.title}
                src={icon.dark}
              />
              <img
                className="size-4 dark:hidden"
                alt={icon.title}
                src={icon.light}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const HelpfullLinks = ({ links }: HelpfullLinksProps) => {
  if (!links) return;

  return (
    <ul className="flex flex-col">
      {links.map(({ href, label }, index) => (
        <Button
          asChild
          key={index}
          className="justify-start px-1 text-xs font-semibold text-muted-foreground"
          variant="ghost"
        >
          <a href={href}>{label}</a>
        </Button>
      ))}
    </ul>
  );
};

const ContactInfoList = ({ links }: ContactInfoListProps) => {
  if (!links) return;

  return (
    <ul className="flex flex-col">
      {links.map((item, index) => (
        <Button
          asChild
          key={index}
          className="justify-start px-1 text-xs font-semibold text-muted-foreground"
          variant="ghost"
        >
          <a href={item.href}>
            <item.icon />
            {item.label}
          </a>
        </Button>
      ))}
    </ul>
  );
};

export { EcommerceNavbar1 };
