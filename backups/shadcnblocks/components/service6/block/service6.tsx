"use client";

import {
  BookOpen,
  Code,
  Droplet,
  Layout,
  Map,
  Palette,
  Pen,
  Smartphone,
  TestTube,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Service6Props {
  className?: string;
}

const Service6 = ({ className }: Service6Props) => {
  const services = [
    {
      icon: Users,
      title: "User research and persona development",
    },
    {
      icon: Map,
      title: "Information architecture and user journey mapping",
    },
    {
      icon: Pen,
      title: "Wireframing and interactive prototyping",
    },
    {
      icon: Palette,
      title: "Visual design and brand integration",
    },
    {
      icon: TestTube,
      title: "Usability testing and design validation",
    },
    {
      icon: BookOpen,
      title: "Design system creation and documentation",
    },
  ];

  const stats = [
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/adobe-icon.png",
      title: "Adobe Creative Suite",
      description: "Design proficiency",
    },
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      title: "Figma",
      description: "Years experience",
    },
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
      title: "Sketch",
      description: "Projects completed",
    },
  ];

  const relatedServices = [
    {
      icon: Droplet,
      title: "Brand Identity",
      description: "Logo design and brand guidelines",
      link: "#",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom website development",
      link: "#",
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description: "iOS and Android app interfaces",
      link: "#",
    },
    {
      icon: Layout,
      title: "Design Systems",
      description: "Scalable component libraries",
      link: "#",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-3xl">
        {/* Icon and Intro */}
        <div className="mb-12 space-y-8 text-center">
          <div className="flex justify-center">
            <div className="rounded-lg bg-muted p-4">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/symbols/ux.svg"
                alt="UX/UI Design"
                className="h-12 dark:invert"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              UX/UI Design
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              We believe that great design should be intuitive, accessible, and
              purposeful for every user who interacts with your product. Our
              UX/UI design approach focuses on understanding your users' needs,
              behaviors, and pain points to create interfaces that not only look
              beautiful but function seamlessly.
            </p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg bg-muted/50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                  <img
                    src={stat.icon}
                    alt={stat.title}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto prose prose-sm mb-16 max-w-none dark:prose-invert">
          <h2>Creating Meaningful Digital Experiences</h2>
          <p>
            We combine user research, information architecture, and visual
            design to deliver experiences that drive engagement and conversions.
          </p>

          <p>
            Through comprehensive user research and testing, we validate design
            decisions with real data. Our iterative design process ensures that
            every element serves a purpose and contributes to your business
            goals while providing an exceptional user experience.
          </p>

          <p>
            We specialize in creating design systems that scale with your
            business, ensuring consistency across all touchpoints while
            maintaining flexibility for future growth and evolution.
          </p>

          <p>
            Our collaborative approach involves stakeholders throughout the
            design process, from initial wireframes to final prototypes. This
            ensures alignment between business objectives and user needs,
            resulting in products that succeed in the market.
          </p>

          <p>
            Every design decision is backed by research and testing, creating
            solutions that are not just visually appealing but strategically
            sound and user-validated.
          </p>

          <h2>Our UX/UI Design Services</h2>
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{service.title}</span>
                </div>
              );
            })}
          </div>

          <h2>Strategic Design for Business Success</h2>
          <p>
            Our design philosophy centers on creating interfaces that bridge the
            gap between user needs and business objectives. We understand that
            great UX/UI design is not just about aesthetics—it's about creating
            meaningful interactions that drive results.
          </p>

          <p>
            From initial concept to final implementation, we ensure that every
            design element contributes to a cohesive user experience that
            reflects your brand values and supports your business goals. Our
            designs are optimized for performance, accessibility, and
            scalability across all devices and platforms.
          </p>
        </div>

        {/* Related Services */}
        <div className="rounded-lg">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Related Services
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group rounded-lg bg-muted/50">
                  <a
                    href={service.link}
                    className="block space-y-2 rounded-lg p-6 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      <div className="text-lg font-medium group-hover:text-primary">
                        {service.title}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.description}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Service6 };
