import { ArrowUpRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Design",
    category: "Design",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/tirza-van-dijk-o1SKqmgSDbg-unsplash.jpg",
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/adem-ay-Tk9m_HP4rgQ-unsplash.jpg",
  },
  {
    title: "App Development",
    category: "Development",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  },
  {
    title: "Content Creation",
    category: "Content",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/christin-hume-Hcfwew744z4-unsplash.jpg",
  },
];

interface Services18Props {
  className?: string;
}

const Services18 = ({ className }: Services18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="size-3 rounded-sm bg-primary" />
            <p className="tracking-tight">Our Services</p>
          </div>
          <p className="text-sm">
            <span className="font-mono">+3000</span> projects completed
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div className="flex flex-col gap-7">
            <h1 className="text-7xl font-semibold">Creative Solutions</h1>
            <p className="text-lg text-muted-foreground">
              Elevate your business with tailored digital strategies and
              impactful design.
            </p>
            <Separator />
            <div className="flex flex-col gap-5 tracking-tight">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted">
                  <Plus className="size-3.5" />
                </span>
                <p className="font-medium">Boost Engagement & Results</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted">
                  <Plus className="size-3.5" />
                </span>
                <p className="font-medium">Built for Tomorrow's Growth</p>
              </div>
            </div>
            <Button className="w-fit" size="lg">
              Get Started <ArrowUpRight />
            </Button>
          </div>
          <div className="col-span-2 space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border bg-muted py-2 pr-6 pl-2 dark:bg-card"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-20 w-32 rounded-sm border object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-medium tracking-tight">
                      {service.title}
                    </h2>
                    <p className="tracking-tight text-muted-foreground">
                      {service.category}
                    </p>
                  </div>
                </div>
                <div className="hidden items-center gap-1.5 sm:flex">
                  {Array.from({ length: services.length }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-2.5 rounded-full",
                        i <= index ? "bg-primary" : "bg-muted-foreground/20",
                      )}
                    />
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

export { Services18 };
