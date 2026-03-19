"use client";

import Marquee from "react-fast-marquee";

import { cn } from "@/lib/utils";

interface Company {
  name: string;
  logo: string;
  href?: string;
}

interface Logos17Props {
  heading?: string;
  subheading?: string;
  topRowCompanies?: Company[];
  bottomRowCompanies?: Company[];
  className?: string;
}

const Logos17 = ({
  heading = "Powering the world's best product teams.",
  subheading = "From next-gen startups to established enterprises.",
  topRowCompanies = [
    {
      name: "Mercury",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/mercury.svg",
      href: "#",
    },
    {
      name: "Watershed",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/watershed.svg",
      href: "#",
    },
    {
      name: "Retool",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/retool.svg",
      href: "#",
    },
    {
      name: "Descript",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/descript.svg",
      href: "#",
    },
  ],
  bottomRowCompanies = [
    {
      name: "Perplexity",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/perplexity.svg",
      href: "#",
    },
    {
      name: "Monzo",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/monzo.svg",
      href: "#",
    },
    {
      name: "Ramp",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/ramp.svg",
      href: "#",
    },
    {
      name: "Raycast",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/raycast.svg",
      href: "#",
    },
    {
      name: "Arc",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/arc.svg",
      href: "#",
    },
  ],
  className,
}: Logos17Props) => {
  return (
    <section className={cn("overflow-hidden pb-28 lg:pb-32", className)}>
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            {heading}
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 4 logos */}
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-4" />

          {/* Bottom row - 5 logos */}
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-5"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

interface LogoRowProps {
  companies: Company[];
  gridClassName: string;
  direction?: "left" | "right";
}

const LogoRow = ({ companies, gridClassName, direction }: LogoRowProps) => {
  return (
    <>
      {/* Desktop static version */}
      <div className="hidden md:block">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-20 lg:gap-x-28",
            gridClassName,
          )}
        >
          {companies.map((company, index) => (
            <a href={company.href || "#"} target="_blank" key={index}>
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-8 w-auto object-contain opacity-50 transition-opacity hover:opacity-70 dark:invert"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile marquee version */}
      <div className="md:hidden">
        <Marquee direction={direction} pauseOnHover>
          {companies.map((company, index) => (
            <a
              href={company.href || "#"}
              target="_blank"
              key={index}
              className="mx-8 inline-block transition-opacity hover:opacity-70"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-8 w-auto object-contain"
              />
            </a>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export { Logos17 };
