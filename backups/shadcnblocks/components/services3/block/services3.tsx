"use client";

import { Code, Cog, PenTool, Shrub } from "lucide-react";

import { cn } from "@/lib/utils";

interface Services3Props {
  className?: string;
}

const Services3 = ({ className }: Services3Props) => {
  const services = [
    {
      icon: <Cog className="h-5 w-5" />,
      title: "Product Strategy",
      items: ["Market Research", "User Personas"],
    },
    {
      icon: <PenTool className="h-5 w-5" />,
      title: "Design",
      items: ["UI/UX Design", "Prototyping", "Interaction Design"],
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Web Development",
      items: ["Frontend Dev", "Backend Dev"],
    },
    {
      icon: <Shrub className="h-5 w-5" />,
      title: "Marketing",
      items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-12">
          <div className="space-y-4">
            <h2 className="text-start text-xl font-semibold tracking-tight md:text-3xl">
              Services
            </h2>
            <p className="text-start text-lg tracking-tight text-muted-foreground md:text-xl">
              We craft digital experiences that captivate and convert.
            </p>
          </div>

          <div className="space-y-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="grid grid-cols-3 border-b border-border pb-6"
              >
                <div className="flex items-center gap-4">
                  {service.icon}
                  <h2 className="text-base font-medium">{service.title}</h2>
                </div>
                <div />
                <div className="item-end flex flex-col gap-1 text-sm text-muted-foreground">
                  {service.items.map((item, itemIndex) => (
                    <p key={itemIndex}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services3 };
