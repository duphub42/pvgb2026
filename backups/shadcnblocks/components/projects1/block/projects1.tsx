"use client";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects1prop = [
  {
    title: "Skyline Room",
    description:
      "Designing cutting-edge architectural visualizations for modern cityscapes and towers.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ali-moradi-qNic6LXHw-w-unsplash.jpg",
    tag: "Architecture",
  },
  {
    title: "Interior Bloom",
    description:
      "Crafting serene and elegant interior layouts that balance functionality with aesthetic harmony.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
    tag: "Interior Design",
  },
  {
    title: "Modular Nest",
    description:
      "Exploring compact and modular housing concepts for sustainable living.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg",
    tag: "Design Concept",
  },
  {
    title: "Urban Visions",
    description:
      "Shaping urban identity through 3D exterior models and concept layouts for public spaces.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-lISGL8VWpPE-unsplash.jpg",
    tag: "Urban Planning",
  },
  {
    title: "Form + Flow",
    description:
      "Redefining open floor plans for residential interiors with seamless transitions and space utility.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    tag: "Interior Architecture",
  },
];

interface Projects1Props {
  className?: string;
}

const Projects1 = ({ className }: Projects1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-semibold sm:text-lg">
            Architectural Highlights
          </h2>
        </div>
        <div className="space-y-12">
          {projects1prop.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:pt-10"
            >
              <div className="flex flex-col justify-between">
                <h3 className="mb-2 text-lg font-medium sm:text-4xl">
                  {project.title}
                </h3>
                <div>
                  <p className="mb-3 max-w-sm text-sm font-medium text-foreground">
                    {project.description}
                  </p>
                  <Badge variant="outline" className="px-3 py-2">
                    {project.tag}
                  </Badge>
                </div>
              </div>

              <motion.div
                className="aspect-[3/2] w-full overflow-hidden rounded-sm"
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full rounded-sm object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects1 };
