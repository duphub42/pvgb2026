import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Product strategy",
    description:
      "Define clear objectives, align stakeholders, and prioritize initiatives that drive measurable impact.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daria-nepriakhina-zoCDWPuiRuA-unsplash.jpg",
    categories: [
      "Vision & goals",
      "Stakeholder alignment",
      "Prioritization",
      "Roadmapping",
      "Delivery planning",
      "Metrics",
    ],
  },
  {
    title: "Growth marketing & lifecycle",
    description:
      "Full-funnel experimentation and lifecycle programs that acquire, activate, and retain customers.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/diggity-marketing-SB0WARG16HI-unsplash.jpg",
    categories: [
      "Acquisition",
      "Activation",
      "Retention",
      "Attribution",
      "Experimentation",
    ],
  },
  {
    title: "Content operations & SEO",
    description:
      "Operationalized content systems and search strategies that compound organic growth over time.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg",
    categories: [
      "Topic mapping",
      "Technical SEO",
      "Editorial process",
      "Distribution",
    ],
  },
  {
    title: "AI Integration & Automation",
    description:
      "Leverage artificial intelligence and automation to streamline workflows, enhance decision-making, and unlock new business opportunities.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
    categories: [
      "Process automation",
      "Machine learning",
      "Data analysis",
      "Chatbots",
      "Predictive analytics",
      "Custom AI solutions",
    ],
  },
];

interface Services16Props {
  className?: string;
}

const Services16 = ({ className }: Services16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-start gap-4 md:grid-cols-4">
          <div className=""></div>
          <h1 className="col-span-3 text-6xl font-semibold sm:text-7xl md:text-8xl lg:text-9xl">
            Services.
          </h1>
        </div>
        <div className="mt-20">
          <Accordion type="multiple" defaultValue={["item-0"]}>
            {services.map((service, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full grid-cols-4 items-center gap-4 sm:grid">
                    <span className="text-base text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="col-span-3 text-lg font-semibold tracking-tight">
                      {service.title}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex grid-cols-4 pt-6 pb-12 sm:grid sm:gap-4">
                  <div />
                  <div className="col-span-3 grid gap-10 lg:grid-cols-5">
                    <div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:col-span-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="aspect-[1.4] w-52 rounded-xl object-cover"
                      />
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <h4 className="text-2xl font-medium tracking-tight sm:text-3xl">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground sm:text-base">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:col-span-2">
                      <p className="text-xs text-muted-foreground">
                        Categories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((category, index) => (
                          <Badge key={index}>{category}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Services16 };
