import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedPostData {
  title: string;
  imageUrl: string;
  link: string;
}
const FEATURED_POST: FeaturedPostData = {
  title: "How to Build Reusable UI Component Blocks for Beginners",
  imageUrl:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  link: "#",
};
const ARTICLES = [
  {
    date: "Jan 02, 2025",
    category: "Design Systems",
    link: "#",
    title: "Mastering Reusable UI Block Patterns in React Applications",
  },
  {
    date: "Jan 03, 2025",
    category: "Best Practices",
    link: "#",
    title: "10 Common Mistakes to Avoid When Building UI Components",
  },
  {
    date: "Jan 04, 2025",
    category: "Components",
    link: "#",
    title: "A Step-by-Step Guide to Creating Flexible Card Blocks",
  },
  {
    date: "Jan 05, 2025",
    category: "Accessibility",
    link: "#",
    title: "Ensuring Accessibility in Custom UI Block Components",
  },
  {
    date: "Jan 06, 2025",
    category: "Performance",
    link: "#",
    title: "How to Optimize UI Blocks for Speed and Efficiency",
  },
  {
    date: "Jan 07, 2025",
    category: "Frameworks",
    link: "#",
    title: "Building Scalable UI Blocks with Tailwind and Headless UI",
  },
  {
    date: "Jan 08, 2025",
    category: "Design Systems",
    link: "#",
    title: "Creating Consistent UI Blocks Across a Shared Design System",
  },
  {
    date: "Jan 09, 2025",
    category: "React",
    link: "#",
    title: "Why React Is the Best Tool for Component-Based UI Blocks",
  },
];

interface Resources3Props {
  className?: string;
}

const Resources3 = ({ className }: Resources3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <FeaturedPost {...FEATURED_POST} />
        <div className="flex w-full flex-col gap-4">
          <h2 className="mt-16 text-xl font-semibold">Resources</h2>
          <div className="">
            {ARTICLES.map((article, index) => (
              <a
                href={article.link}
                key={index}
                className="block w-full hover:bg-foreground/10"
              >
                <div className="flex flex-col items-baseline justify-between gap-2 border-t py-6 text-foreground md:flex-row">
                  <div className="basis-1/4 font-medium">{article.date}</div>
                  <div className="basis-1/4">{article.category}</div>
                  <div className="basis-1/2 text-muted-foreground">
                    {article.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedPost = ({ title, imageUrl, link }: FeaturedPostData) => {
  return (
    <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10 xl:flex-row">
      <div className="basis-full lg:basis-1/2">
        <div className="flex flex-col gap-5">
          <Badge variant="outline" className="bg-background">
            Featured Resource
          </Badge>
          <h2 className="text-2xl leading-[1.2] font-normal text-foreground md:text-[2.5rem] xl:text-[3.125rem]">
            {title}
          </h2>
          <div>
            <Button
              asChild
              className="group relative mt-5 !px-6 transition-all hover:!pr-8 hover:!pl-4"
            >
              <a href={link}>
                Read more
                <ArrowRight className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1.5 group-hover:opacity-100" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="basis-full lg:basis-1/2">
        <div className="mx-auto aspect-[1.782729805] w-full max-w-[40rem] overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={title}
            className="block size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export { Resources3 };
