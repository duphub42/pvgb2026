import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const news = [
  {
    title: "TechFlow AI Platform now available on Azure Marketplace",
    category: "Partnership",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    date: "June 15, 2024",
    link: "#",
  },
  {
    title: "CodeSphere: the journey behind our latest developer tool",
    category: "Press release",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    date: "June 10, 2024",
    link: "#",
  },
  {
    title:
      "DataViz & CloudNative announce collaboration on next-gen analytics tools",
    category: "Partnership",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    date: "May 28, 2024",
    link: "#",
  },
  {
    title:
      "QuantumByte launches EdgeCompute: a revolutionary edge computing platform",
    category: "News",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    date: "May 12, 2024",
    link: "#",
  },
  {
    title: "Join us at DevCon Global Summit 2024 in Berlin",
    category: "Press release",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    date: "May 5, 2024",
    link: "#",
  },
];

interface Resources4Props {
  className?: string;
}

const Resources4 = ({ className }: Resources4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:gap-2">
          <div className="flex w-full max-w-56 items-center gap-3 text-sm">
            <span className="size-2 rounded-full bg-primary"></span>
            Resources
          </div>
          <div className="flex-1">
            <h2 className="text-3xl">
              Stay in the loop?
              <br />
              <span className="text-primary/50">
                Discover our recent updates.
              </span>
            </h2>
            <div className="mt-14">
              <Separator />
              {news.map((item, idx) => (
                <Fragment key={idx}>
                  <a
                    href={item.link}
                    className="group flex flex-col justify-between gap-10 py-6 transition-all duration-400 lg:flex-row lg:items-center lg:hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 text-lg transition-all duration-400 lg:group-hover:translate-x-8">
                      <p className="inline text-pretty text-primary">
                        {item.title}
                        <ArrowRight className="ml-2 inline size-4 shrink-0 opacity-0 transition-all duration-400 lg:group-hover:text-primary lg:group-hover:opacity-100" />
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between transition-all duration-400 lg:max-w-72 lg:group-hover:-translate-x-4 xl:max-w-80">
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7 rounded-full border border-border">
                          <AvatarImage src={item.avatar} />
                        </Avatar>
                        <time className="text-xs text-muted-foreground">
                          {item.date}
                        </time>
                      </div>
                    </div>
                  </a>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resources4 };
