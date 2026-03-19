"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services5Props {
  className?: string;
}

const Services5 = ({ className }: Services5Props) => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Product Strategy",
      description:
        "Comprehensive market analysis and strategic planning to position your product for success in competitive markets.",
      items: [
        "Market Research",
        "User Personas",
        "Competitive Analysis",
        "Product Roadmaps",
      ],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design",
      description:
        "User-centered design solutions that create intuitive and engaging experiences across all digital touchpoints.",
      items: ["UI/UX Design", "Prototyping", "Design Systems", "User Testing"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Modern, scalable web applications built with cutting-edge technologies and development best practices.",
      items: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Performance Optimization",
      ],
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Marketing",
      description:
        "Strategic marketing and optimization services to successfully launch and scale your digital products.",
      items: [
        "SEO Strategy",
        "Analytics Setup",
        "A/B Testing",
        "Growth Marketing",
      ],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              End-to-end digital solutions designed to help your business thrive
              in the modern marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="space-y-6 rounded-xl bg-muted p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-border bg-background p-2">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    What's Included
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-foreground" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services5 };
