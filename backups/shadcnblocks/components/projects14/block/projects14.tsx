"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface Projects14Props {
  className?: string;
}

const Projects14 = ({ className }: Projects14Props) => {
  const hiddenGridIndex = [0, 1, 2, 6, 9];

  const projects = [
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Full Stack",
      href: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
    },
    {
      id: 4,
      title: "Mobile Banking App",
      description: "UI/UX",
      href: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img9.png",
    },
    {
      id: 5,
      title: "AI Content Generator",
      description: "AI/ML",
      href: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
    },
    {
      id: 6,
      title: "Media platform ",
      description: "Web App",
      href: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg",
    },
    {
      id: 7,
      title: "Project Management Tool",
      description: "Web App",
      href: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img6.png",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative w-full">
          <div className="flex justify-between text-3xl font-medium tracking-tight lg:text-5xl">
            <h1>Selected work</h1>
            <a
              href="#"
              className="group flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowUpRight className="size-[1em] transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => {
              if (hiddenGridIndex.includes(index)) {
                return (
                  <div key={index} className="mt-10 opacity-0">
                    {/* Hidden grid item */}
                  </div>
                );
              }

              // Get project for the remaining indices
              const projectIndex =
                index -
                hiddenGridIndex.filter((hidden) => hidden < index).length;
              const project = projects[projectIndex];

              if (!project) return null;

              return (
                <motion.a
                  href={project.href}
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group mt-10 flex flex-col gap-2 overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-65 object-cover transition-transform duration-300 group-hover:-translate-y-4 group-hover:scale-110"
                  />
                  <div>
                    <h3 className="text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-muted-foreground">
                      {project.title}
                    </h3>
                    <p className="text-foreground/40">{project.description}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Projects14 };
