"use client";

import { Code, Droplet, Layout, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

interface Service5Props {
  className?: string;
}

const Service5 = ({ className }: Service5Props) => {
  const stats = [
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/adobe-icon.png",
      title: "Adobe Creative Suite",
      value: "100%",
      description: "Design proficiency",
    },
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      title: "Figma",
      value: "5+",
      description: "Years experience",
    },
    {
      icon: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
      title: "Sketch",
      value: "200+",
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
      <div className="container max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Content Section */}
          <div className="lg:col-span-2">
            {/* Icon and Intro */}
            <div className="mb-12 space-y-8">
              <div className="flex justify-center lg:justify-start">
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
                  We believe that great design should be intuitive, accessible,
                  and purposeful for every user who interacts with your product.
                  Our UX/UI design approach focuses on understanding your users'
                  needs, behaviors, and pain points to create interfaces that
                  not only look beautiful but function seamlessly.
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>Creating Meaningful Digital Experiences</h2>
              <p>
                We combine user research, information architecture, and visual
                design to deliver experiences that drive engagement and
                conversions.
              </p>

              <p>
                Through comprehensive user research and testing, we validate
                design decisions with real data. Our iterative design process
                ensures that every element serves a purpose and contributes to
                your business goals while providing an exceptional user
                experience.
              </p>

              <p>
                We specialize in creating design systems that scale with your
                business, ensuring consistency across all touchpoints while
                maintaining flexibility for future growth and evolution.
              </p>

              <p>
                Our collaborative approach involves stakeholders throughout the
                design process, from initial wireframes to final prototypes.
                This ensures alignment between business objectives and user
                needs, resulting in products that succeed in the market.
              </p>

              <p>
                Every design decision is backed by research and testing,
                creating solutions that are not just visually appealing but
                strategically sound and user-validated.
              </p>

              <h2>Our UX/UI Design Services</h2>
              <ul>
                <li>User research and persona development</li>
                <li>Information architecture and user journey mapping</li>
                <li>Wireframing and interactive prototyping</li>
                <li>Visual design and brand integration</li>
                <li>Usability testing and design validation</li>
                <li>Design system creation and documentation</li>
              </ul>

              <h2>Strategic Design for Business Success</h2>
              <p>
                Our design philosophy centers on creating interfaces that bridge
                the gap between user needs and business objectives. We
                understand that great UX/UI design is not just about
                aesthetics—it's about creating meaningful interactions that
                drive results.
              </p>

              <p>
                From initial concept to final implementation, we ensure that
                every design element contributes to a cohesive user experience
                that reflects your brand values and supports your business
                goals. Our designs are optimized for performance, accessibility,
                and scalability across all devices and platforms.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            {/* Stats Section */}
            <div className="rounded-lg bg-muted/50 p-6">
              <h3 className="mb-6 text-lg font-semibold">Our Expertise</h3>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                      <img
                        src={stat.icon}
                        alt={stat.title}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{stat.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Services */}
            <div className="rounded-lg bg-muted/50 p-6">
              <h3 className="mb-6 text-lg font-semibold">Related Services</h3>
              <div className="space-y-4">
                {relatedServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} className="group">
                      <a
                        href={service.link}
                        className="block space-y-1 rounded-md p-3 transition-colors hover:bg-background"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          <div className="text-sm font-medium group-hover:text-primary">
                            {service.title}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {service.description}
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Service5 };
