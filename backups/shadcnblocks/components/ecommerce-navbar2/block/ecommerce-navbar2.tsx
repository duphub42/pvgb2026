"use client";
import {
  Bell,
  Bookmark,
  Bug,
  ChevronDown,
  CreditCard,
  FileQuestion,
  Heart,
  HeartHandshake,
  HelpCircle,
  History,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  type LucideIcon,
  Menu,
  MessageCircleHeart,
  Search,
  Settings,
  ShoppingCart,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import {
  type CSSProperties,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Logo,
  LogoImage,
  LogoTextDesktop,
} from "@/components/shadcnblocks/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type HomeLink = {
  href: string;
  logo: {
    src: string;
    alt: string;
  };
};

type Link = {
  label: string;
  href: string;
};

interface SideMenuItem extends Link {
  icon: LucideIcon;
}

type HelpfullLinkGroup = {
  group: string;
  links: Link[];
};

type SideMenuType = Array<SideMenuItem[]>;

type MegaMenuSectionType = {
  label: string;
  href: string;
  id: string;
  items: {
    label: string;
    href: string;
  }[];
};

type MenuItemType = {
  label: string;
  href?: string;
  id?: string;
  sections?: MegaMenuSectionType[];
};

type MenuType = MenuItemType[];

interface HelpfullLinksDropdownProps {
  groups?: HelpfullLinkGroup[];
}

interface SecondaryMenuProps {
  menu: MenuType;
}

interface SecondaryMenuMobileProps {
  menu: MenuType;
}

type DesktopMenuDropdownItemProps = MenuItemType;

interface MobileMenuProps {
  menu: SideMenuType;
  homeLink: HomeLink;
}

interface EcommerceNavbar2Props {
  home: HomeLink;
  helpfullLinks?: HelpfullLinkGroup[];
  menu: MenuType;
  sideMenu: SideMenuType;
  className?: string;
}

const HOME = {
  href: "https://shadcnblocks.com",
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon-white.svg",
    alt: "Shadcnblocks.com",
  },
};

const HELPFUL_LINKS = [
  {
    group: "Support",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Product Manuals", href: "#" },
      { label: "Warranty & Repairs", href: "#" },
    ],
  },
  {
    group: "Orders & Shipping",
    links: [
      { label: "Order Tracking", href: "#" },
      { label: "Shipping Information", href: "#" },
      { label: "Returns & Refunds", href: "#" },
      { label: "Cancellations", href: "#" },
    ],
  },
  {
    group: "Shopping Tools",
    links: [
      { label: "Store Locator", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Student Discounts", href: "#" },
      { label: "Promotions & Deals", href: "#" },
    ],
  },
  {
    group: "Company & Legal",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

const MENU = [
  {
    id: "shop",
    label: "Shop",
    href: "#",
    sections: [
      {
        label: "Face",
        id: "face",
        href: "#",
        items: [
          "Cleansers",
          "Oil Cleansers",
          "Foam Cleansers",
          "Toners",
          "Essences",
          "Serums",
          "Moisturizers",
          "Eye Creams",
          "Face Oils",
          "Face Masks",
          "Exfoliators",
          "Spot Treatments",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Body",
        id: "body",
        href: "#",
        items: [
          "Body Wash",
          "Body Scrubs",
          "Body Lotions",
          "Body Creams",
          "Body Oils",
          "Hand Creams",
          "Foot Care",
          "Firming Treatments",
          "Bath Essentials",
          "After Sun Care",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Sun Protection",
        id: "sun",
        href: "#",
        items: [
          "Daily SPF",
          "Mineral Sunscreen",
          "Chemical Sunscreen",
          "Tinted SPF",
          "SPF Sticks",
          "Face Sunscreen",
          "Body Sunscreen",
          "Lip SPF",
          "After Sun",
          "Sun Sprays",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Cleansing",
        id: "cleansing",
        href: "#",
        items: [
          "Micellar Water",
          "Gel Cleansers",
          "Cream Cleansers",
          "Balms",
          "Cleansing Oils",
          "Makeup Removers",
          "Exfoliating Cleansers",
          "Sensitive Skin Cleansers",
          "Travel Sizes",
          "Refill Packs",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Treatments",
        id: "treatments",
        href: "#",
        items: [
          "Acne Treatments",
          "Brightening Treatments",
          "Anti-Aging Treatments",
          "Hydration Boosters",
          "Peels",
          "Overnight Masks",
          "Ampoules",
          "Corrective Serums",
          "Calming Treatments",
          "Repair Treatments",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Tools & Devices",
        id: "tools",
        href: "#",
        items: [
          "Facial Rollers",
          "Gua Sha",
          "LED Masks",
          "Cleansing Brushes",
          "Facial Massagers",
          "Ice Rollers",
          "Pore Tools",
          "Microcurrent Devices",
          "Refill Heads",
          "Travel Tools",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Masks",
        id: "masks",
        href: "#",
        items: [
          "Sheet Masks",
          "Clay Masks",
          "Sleeping Masks",
          "Peel-Off Masks",
          "Hydrating Masks",
          "Purifying Masks",
          "Soothing Masks",
          "Brightening Masks",
          "Exfoliating Masks",
          "Multi-Masking Sets",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Eye & Lip Care",
        id: "eye-lip",
        href: "#",
        items: [
          "Eye Creams",
          "Eye Serums",
          "Eye Masks",
          "Lip Balms",
          "Lip Masks",
          "Lip Scrubs",
          "Anti-Puff Treatments",
          "Dark Circle Care",
          "SPF Lip Care",
          "Overnight Lip Care",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Hair & Scalp",
        id: "hair",
        href: "#",
        items: [
          "Scalp Treatments",
          "Scalp Scrubs",
          "Hair Serums",
          "Hair Oils",
          "Hair Masks",
          "Hair Sunscreen",
          "Anti-Dandruff Care",
          "Growth Treatments",
          "Leave-In Care",
          "Hair Tools",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Bath & Wellness",
        id: "wellness",
        href: "#",
        items: [
          "Bath Oils",
          "Bath Salts",
          "Soaks",
          "Aromatherapy",
          "Body Relaxers",
          "Stress Relief",
          "Sleep Care",
          "Massage Oils",
          "Self-Care Sets",
          "Wellness Gifts",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Men’s Care",
        id: "men",
        href: "#",
        items: [
          "Face Wash",
          "Moisturizers",
          "After Shave",
          "Beard Care",
          "Eye Creams",
          "Anti-Aging",
          "Oil Control",
          "Body Care",
          "Travel Kits",
          "Grooming Sets",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Teen Skincare",
        id: "teen",
        href: "#",
        items: [
          "Gentle Cleansers",
          "Acne Care",
          "Oil Control",
          "Soothing Moisturizers",
          "Spot Treatments",
          "SPF",
          "Starter Kits",
          "Sensitive Skin",
          "Travel Sizes",
          "Daily Essentials",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Travel Sizes",
        id: "travel",
        href: "#",
        items: [
          "Mini Cleansers",
          "Mini Serums",
          "Mini Moisturizers",
          "Mini Masks",
          "Travel Kits",
          "Refillables",
          "Carry-On Approved",
          "Sample Sets",
          "Weekend Kits",
          "On-the-Go Care",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Gifts & Sets",
        id: "gifts",
        href: "#",
        items: [
          "Gift Sets",
          "Starter Kits",
          "Routine Bundles",
          "Best Sellers",
          "Holiday Sets",
          "Limited Editions",
          "Mini Sets",
          "Luxury Gifts",
          "Under $50",
          "Under $100",
        ].map((label) => ({ label, href: "#" })),
      },
    ],
  },

  {
    id: "collections",
    label: "Collections",
    href: "#",
    sections: [
      {
        label: "By Concern",
        id: "concerns",
        href: "#",
        items: [
          "Acne",
          "Dryness",
          "Sensitivity",
          "Fine Lines",
          "Wrinkles",
          "Dark Spots",
          "Redness",
          "Dullness",
          "Uneven Texture",
          "Large Pores",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "By Skin Type",
        id: "skin-type",
        href: "#",
        items: [
          "Normal",
          "Dry",
          "Oily",
          "Combination",
          "Sensitive",
          "Mature",
          "Acne-Prone",
          "Dehydrated",
          "Reactive",
          "All Skin Types",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "By Ingredient",
        id: "ingredients",
        href: "#",
        items: [
          "Hyaluronic Acid",
          "Vitamin C",
          "Retinol",
          "Niacinamide",
          "Ceramides",
          "Peptides",
          "Salicylic Acid",
          "AHA & BHA",
          "Bakuchiol",
          "Centella Asiatica",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "By Routine",
        id: "routine",
        href: "#",
        items: [
          "Morning Routine",
          "Night Routine",
          "Minimal Routine",
          "Advanced Routine",
          "Weekly Treatments",
          "Travel Routine",
          "Post-Treatment Care",
          "Seasonal Care",
          "Self-Care Rituals",
          "Professional Inspired",
        ].map((label) => ({ label, href: "#" })),
      },
      {
        label: "Clean & Conscious",
        id: "clean",
        href: "#",
        items: [
          "Clean Beauty",
          "Vegan",
          "Cruelty-Free",
          "Fragrance-Free",
          "Dermatologist Tested",
          "Sensitive-Safe",
          "Eco Packaging",
          "Recyclable",
          "Refillable",
          "Sustainable Brands",
        ].map((label) => ({ label, href: "#" })),
      },
    ],
  },

  { label: "Skin Quiz", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Sale", href: "#" },
];

const SIDE_MENU = [
  [
    {
      label: "Account",
      href: "#",
      icon: User,
    },
    {
      label: "Purchase History",
      href: "#",
      icon: History,
    },
    {
      label: "Payment Methods",
      href: "#",
      icon: CreditCard,
    },
    {
      label: "Account Settings",
      href: "#",
      icon: Settings,
    },
    {
      label: "Sign Out",
      href: "#",
      icon: LogOut,
    },
  ],
  [
    {
      label: "Help",
      href: "#",
      icon: HeartHandshake,
    },
    {
      label: "Help Center",
      href: "#",
      icon: HelpCircle,
    },
    {
      label: "FAQs",
      href: "#",
      icon: FileQuestion,
    },
    {
      label: "Support Tickets",
      href: "#",
      icon: LifeBuoy,
    },
  ],
  [
    {
      label: "Wishlist",
      href: "#",
      icon: Heart,
    },
    {
      label: "Saved Items",
      href: "#",
      icon: Bookmark,
    },
    {
      label: "Back in Stock Alerts",
      href: "#",
      icon: Bell,
    },
    {
      label: "Recently Viewed",
      href: "#",
      icon: Star,
    },
  ],
  [
    {
      label: "Feedback",
      href: "#",
      icon: MessageCircleHeart,
    },
    {
      label: "Rate Your Experience",
      href: "#",
      icon: ThumbsUp,
    },
    {
      label: "Report a Bug",
      href: "#",
      icon: Bug,
    },
  ],
];

const EcommerceNavbar2 = ({
  home = HOME,
  helpfullLinks = HELPFUL_LINKS,
  menu = MENU,
  sideMenu = SIDE_MENU,
  className,
}: EcommerceNavbar2Props) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-nav-height",
      "5.25rem",
    );
    document.documentElement.style.setProperty(
      "--secondary-nav-height",
      "3.25rem",
    );
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50", className)}>
      <div className="flex h-[var(--primary-nav-height)] items-center gap-3 bg-primary px-6 py-4 text-primary-foreground">
        <Logo url={home.href} className="shrink-0 p-2">
          <LogoImage
            src={home.logo.src}
            alt={home.logo.alt}
            className="size-8"
          />
          <LogoTextDesktop className="font-medium text-primary-foreground">
            Shadcnblocks.com
          </LogoTextDesktop>
        </Logo>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:contents">
            <HelpfullLinksDropdown groups={helpfullLinks} />
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Heart />
              Wishlist
            </Button>
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <User />
              Account
            </Button>
          </div>
          <SearchForm />
          <div className="relative size-fit">
            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ShoppingCart />
            </Button>
            <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-amber-500 text-[0.625rem] font-medium text-foreground">
              0
            </Badge>
          </div>
          <div className="contents lg:hidden">
            <MobileMenu menu={sideMenu} homeLink={home} />
          </div>
        </div>
      </div>
      <div className="h-[var(--secondary-nav-height)]">
        <SecondaryMenu menu={menu} />
      </div>
    </header>
  );
};

const SearchForm = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
    >
      <Search />
    </Button>
  );
};

const HelpfullLinksDropdown = ({ groups }: HelpfullLinksDropdownProps) => {
  if (!groups) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground"
        >
          <HeartHandshake className="size-4" />
          Help & Support
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 !border-primary-foreground/20 !bg-primary !text-primary-foreground"
        align="start"
      >
        {groups.map(({ group, links }, index) => (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger className="**:!text-primary-foreground focus:bg-primary-foreground/10 focus:!text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:!text-primary-foreground">
              {group}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="!border-primary-foreground/20 !bg-primary !text-primary-foreground">
                {links.map(({ label, href }, index) => (
                  <DropdownMenuItem
                    asChild
                    key={`${label}-${index}`}
                    className="focus:bg-primary-foreground/10 focus:text-primary-foreground"
                  >
                    <a href={href}>{label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileMenu = ({ menu, homeLink }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus:bg-primary-foreground/10 focus:text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="hide-scrollbar overflow-auto">
        <div className="px-4">
          <SheetHeader>
            <Logo url={homeLink.href} className="max-h-fit shrink-0 basis-11">
              <LogoImage
                src={homeLink.logo.src}
                alt={homeLink.logo.alt}
                className="size-11 shrink-0 invert dark:invert-0"
              />
            </Logo>
          </SheetHeader>
          {menu.map((group, index) => (
            <div key={index} className="py-6 not-last:border-b">
              {group.map(({ href, label, icon: Icon }, index) => (
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start text-left"
                  key={`side-menu-item-${index}`}
                >
                  <a href={href}>
                    <Icon />
                    {label}
                  </a>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SecondaryMenu = ({ menu }: SecondaryMenuProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-accent px-6 py-2">
      <div className="hidden lg:contents">
        <NavigationMenu
          className="justify-start [&_a]:bg-transparent [&_a]:hover:bg-accent-foreground/10 [&_button]:bg-transparent [&_button]:hover:bg-accent-foreground/10"
          viewport={isMobile}
        >
          <NavigationMenuList className="gap-3.5">
            {menu.map(({ sections, ...item }, index) => (
              <NavigationMenuItem value={`${index}`} key={index}>
                {sections ? (
                  <DesktopMenuDropdownItem sections={sections} {...item} />
                ) : (
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-accent-foreground/10",
                    )}
                  >
                    <a href={item.href}>{item.label}</a>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="lg:hidden">
        <SecondaryMenuMobile menu={menu} />
      </div>
    </div>
  );
};

const SecondaryMenuMobile = ({ menu }: SecondaryMenuMobileProps) => {
  if (!menu) return;

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <LayoutGrid />
          Categories
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="!top-[calc(var(--primary-nav-height)+var(--secondary-nav-height))] z-40 !h-[calc(100dvh-var(--primary-nav-height)-var(--secondary-nav-height))] overflow-hidden [&>button]:hidden"
      >
        <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain pb-10">
          <div className="p-6">
            {menu.map(({ sections, label, href }, index) => (
              <div key={index}>
                <h2 className="border-b py-4 text-lg leading-normal font-bold">
                  {href ? <a href={href}>{label}</a> : <span>{label}</span>}
                </h2>
                {sections && (
                  <Accordion type="multiple">
                    {sections.map(({ id, label, items }) => (
                      <AccordionItem value={id} key={`menu-section-${id}`}>
                        <AccordionTrigger>{label}</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col">
                            {items.map(({ href, label }, index) => (
                              <Button
                                className="w-full justify-start"
                                asChild
                                variant="ghost"
                                size="sm"
                                key={`menu-item-${index}`}
                              >
                                <a href={href}>{label}</a>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopMenuDropdownItem = ({
  sections,
  label,
  href,
}: DesktopMenuDropdownItemProps) => {
  const [activeSectionId, setActiveSectionId] = useState<string>();

  const sharedClasses = "h-full space-y-2 overflow-auto pt-6 pb-2";

  const MenuItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedSectionId =
      e.currentTarget.getAttribute("data-id") ?? undefined;

    setActiveSectionId(selectedSectionId);
  };

  const MenuItemMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedSectionId =
      e.currentTarget.getAttribute("data-id") ?? undefined;

    setActiveSectionId(selectedSectionId);
  };

  const activeSectionData = useMemo(
    () => sections?.find((section) => section.id === activeSectionId),
    [sections, activeSectionId],
  );

  if (!sections) return;

  return (
    <Fragment>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent className="p-0">
        <div
          style={
            {
              "--menu-margin-bottom": "5rem",
            } as CSSProperties
          }
          className="flex max-h-[calc(100dvh-var(--secondary-nav-height)-var(--primary-nav-height)-var(--menu-margin-bottom))] max-w-110"
        >
          <div>
            <div className={cn("w-60", sharedClasses)}>
              <h2 className="px-6 text-sm font-bold">
                <a href={href}>{label}</a>
              </h2>
              <ol>
                {sections.map((section, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      data-id={section.id}
                      data-state={
                        section.id === activeSectionId ? "active" : "inactive"
                      }
                      onClick={MenuItemClick}
                      onMouseEnter={MenuItemMouseEnter}
                      className={cn(
                        "relative w-full justify-start rounded-none px-6 text-left font-normal",
                        "data-[state=active]:bg-accent",
                        "transition-opacity after:absolute after:inset-y-0 after:left-0 after:h-full after:w-1 after:bg-primary data-[state=inactive]:after:opacity-0",
                      )}
                    >
                      {section.label}
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {activeSectionData && (
            <div>
              <div className={cn("w-50 bg-accent", sharedClasses)}>
                <h2 className="px-6 text-sm font-bold">
                  {activeSectionData.label}
                </h2>
                <ol>
                  {activeSectionData.items.map((item, index) => (
                    <li key={index}>
                      <NavigationMenuLink
                        className="px-6 hover:underline"
                        asChild
                      >
                        <a href={item.href}>{item.label}</a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </NavigationMenuContent>
    </Fragment>
  );
};

export { EcommerceNavbar2 };
