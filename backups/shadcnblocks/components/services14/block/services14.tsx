"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceProps = {
  title: string;
  image: string;
  url: string;
};

const services: ServiceProps[] = [
  {
    title: "Web Development",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-6jEVl7xPH3E-unsplash.jpg",
    url: "",
  },
  {
    title: "Mobile App Development",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg",
    url: "",
  },
  {
    title: "UI/UX Design",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
    url: "",
  },
  {
    title: "Digital Marketing",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
    url: "",
  },
];

interface Services14Props {
  className?: string;
}

const Services14 = ({ className }: Services14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-medium text-foreground md:text-6xl">
              Our Services
            </h2>
            <p className="w-80 text-base tracking-tight text-muted-foreground">
              We provide end-to-end digital solutions that transform your
              business. From concept to deployment, we ensure every project
              delivers exceptional results.
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit">
            Explore services <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-semibold text-white">
                    {service.title}
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services14 };
