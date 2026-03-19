"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const defaultTestimonials = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content:
      "This platform has completely transformed how we manage our projects. The intuitive interface and powerful features have increased our team's productivity by 40%. I can't imagine running our business without it. The customer support is outstanding, and the regular updates keep us ahead of the competition.",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    content:
      "Outstanding integration capabilities. We've connected all our existing tools seamlessly, and the real-time collaboration features have revolutionized our development workflow.",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    content:
      "As a product manager, I need tools that help me stay organized and communicate effectively with my team. This platform delivers on both fronts with its comprehensive project management features, clear reporting dashboards, and seamless collaboration tools. The ability to track progress in real-time has been invaluable for our sprint planning and stakeholder updates.",
  },
  {
    name: "David Kim",
    role: "COO",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    content:
      "The analytics and reporting features have given us unprecedented visibility into our operations. We can now make data-driven decisions with confidence, and our efficiency has improved dramatically across all departments. The custom dashboards and automated reports save us hours every week.",
  },
  {
    name: "Lisa Thompson",
    role: "Tech Lead",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    content:
      "Exceptional developer experience. The API is well-documented, the SDKs are robust.",
  },
  {
    name: "Alex Johnson",
    role: "Designer",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    content:
      "The design system and component library have streamlined our design process. We can now create consistent, beautiful interfaces much faster, and the collaboration between design and development has never been smoother. The version control for design assets and the seamless handoff process have eliminated countless back-and-forth iterations.",
  },
  {
    name: "Michael Brown",
    role: "Developer",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    content:
      "The code quality and performance are top-notch. The platform handles our scale effortlessly, and the developer tools make debugging and optimization a breeze. It's been a game-changer for our development team. The comprehensive documentation and active community support make onboarding new developers incredibly smooth.",
  },
  {
    name: "Rachel Green",
    role: "Marketing Director",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    content:
      "Game-changing marketing automation. We've seen a 60% increase in engagement rates and significantly improved ROI. The platform's insights help us understand our audience better than ever.",
  },
];

interface Testimonial8Props {
  testimonials?: Array<{
    name: string;
    role: string;
    avatar: string;
    content: string;
  }>;
  className?: string;
}

const Testimonial8 = ({
  testimonials = defaultTestimonials,
  className,
}: Testimonial8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-3xl font-semibold lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground lg:text-xl">
            Discover how our customers are using our products to build their
            businesses
          </p>
        </div>
        <div className="relative mt-14 w-full after:absolute after:inset-x-0 after:-bottom-2 after:h-96 after:bg-linear-to-t after:from-background">
          <div
            className="columns-1 gap-5 md:columns-2 lg:columns-3"
            style={{ columnGap: "20px" }}
          >
            {testimonials.map((testimonial, idx) => {
              // Reorder for masonry flow: distribute across columns first
              const displayIdx = (idx % 3) * 3 + Math.floor(idx / 3);

              return (
                <div
                  key={idx}
                  className={cn(
                    "mb-5",
                    displayIdx > 3 && displayIdx <= 5 && "hidden md:block",
                    displayIdx > 5 && "hidden lg:block",
                  )}
                >
                  <Card className="break-inside-avoid p-5">
                    <div className="flex gap-4 leading-5">
                      <Avatar className="size-10 rounded-full ring-1 ring-input">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </Avatar>
                      <div className="mb-2 text-sm">
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="leading-7 text-foreground/60">
                      <q>{testimonial.content}</q>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonial8 };
