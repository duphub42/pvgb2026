import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Waitlist3Props {
  companyLogo?: string;
  badge?: string;
  heading?: string;
  description?: string;
  joinedPeople?: number;
  avatars?: string[];
  companyName?: string;
  companyUrl?: string;
  image?: string;
  className?: string;
}
const Waitlist3 = ({
  companyLogo = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
  badge = "COMING SOON - Q1 2026",
  heading = "Building the next gen of developer tools?",
  description = "Join our early access program to get exclusive access to cutting-edge development tools and be the first to experience the future of coding.",
  joinedPeople = 165,
  avatars = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/nima-motaghian-nejad-_omdf_EgRUo-unsplash.jpg",
  ],
  companyName = "Ramp",
  companyUrl = "https://shadcnblocks.com",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/Geometric Staircase and Concrete Wall.jpeg",
  className,
}: Waitlist3Props) => {
  return (
    <section className={cn("py-32 lg:h-screen", className)}>
      <div className="container h-full">
        <div className="grid h-full grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-0">
          <div className="col-span-1 flex h-full flex-col items-start justify-between gap-20">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-32 dark:invert"
            />

            <div className="flex max-w-sm flex-col gap-4 sm:max-w-full lg:max-w-md">
              <Badge variant="outline">{badge}</Badge>

              <h3 className="text-3xl font-semibold lg:text-4xl">{heading}</h3>

              <p className="max-w-md text-muted-foreground">{description}</p>

              <div className="mt-2 flex flex-col gap-4">
                <form className="flex gap-2">
                  <Input type="email" required placeholder="name@domain.com" />
                  <Button type="submit">Join now</Button>
                </form>

                <div className="flex items-center">
                  <div className="relative flex items-center">
                    {avatars.map((avatar, index) => {
                      return (
                        <img
                          key={`waitlist-avatar-${index}`}
                          src={avatar}
                          alt={`Joined person ${index + 1}`}
                          style={{
                            transform: `translateX(-${index * 10}px)`,
                          }}
                          className="size-8 rounded-full border bg-muted object-cover object-top p-[1px]"
                        />
                      );
                    })}
                    <p
                      style={{
                        transform: `translateX(-${(avatars.length - 2) * 10}px)`,
                      }}
                      className="text-xs text-muted-foreground"
                    >
                      {joinedPeople}+ people already joined
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              @ {new Date().getFullYear()} -{" "}
              <a
                href={companyUrl}
                target="_blank"
                className="text-primary underline"
              >
                {companyName}
              </a>{" "}
              - All rights reserved.
            </p>
          </div>
          <div className="col-span-1 flex h-full flex-col items-start justify-between overflow-hidden">
            <img
              src={image}
              alt="Waitlist Image"
              className="h-full max-h-96 w-full object-cover lg:max-h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Waitlist3 };
