"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = ["All", "Data", "AI", "Security", "News"];

interface Blog {
  title: string;
  category: Exclude<(typeof categories)[number], "All">;
  date: string;
  author: string[];
  link: string;
}

const blogs: Blog[] = [
  {
    title:
      "Exploring the Depths of Modern Data Analytics Techniques and Applications",
    category: "Data",
    date: "Dec 4, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Navigating the Complex Landscape of Artificial Intelligence and Advanced Machine Learning",
    category: "AI",
    date: "Dec 3, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Fortifying Digital Defenses: Implementing Advanced Cybersecurity Strategies for Modern Enterprises",
    category: "Security",
    date: "Dec 2, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Understanding and Exploring Distributed Computing Architectures and Concepts",
    category: "Data",
    date: "Dec 1, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
  },
  {
    title:
      "Recent Significant Scientific Breakthroughs in Advanced Quantum Technology Research",
    category: "News",
    date: "Nov 30, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
  },
  {
    title:
      "Applying Practical Machine Learning Techniques in Real-World Business Scenarios and Use Cases",
    category: "AI",
    date: "Nov 29, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    ],
    link: "#",
  },
  {
    title:
      "Developing Effective Strategies for Optimal Database Performance Tuning and Optimization",
    category: "Data",
    date: "Nov 28, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Implementing and Enforcing Robust Zero Trust Security Principles Across the Entire Organization",
    category: "Security",
    date: "Nov 27, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    ],
    link: "#",
  },
  {
    title:
      "A Comprehensive Guide to Modern Serverless Computing Architectures and Development",
    category: "AI",
    date: "Nov 26, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Industry News: The Very Latest Updates on Network Innovations and Emerging Technologies",
    category: "News",
    date: "Nov 25, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "The Evolution of Big Data Analytics: From Historical Insights to Predictive Models",
    category: "Data",
    date: "Nov 24, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
  },
  {
    title:
      "Emerging Trends in Natural Language Processing and Conversational AI",
    category: "AI",
    date: "Nov 23, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Blockchain Security: Protecting Digital Assets in the Modern Era",
    category: "Security",
    date: "Nov 22, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
  },
  {
    title:
      "Breaking News: Revolutionary Advances in Quantum Computing Applications",
    category: "News",
    date: "Nov 21, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Real-time Analytics: Processing and Visualizing Streaming Data",
    category: "Data",
    date: "Nov 20, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Deep Learning Architectures for Computer Vision Applications",
    category: "AI",
    date: "Nov 19, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    ],
    link: "#",
  },
  {
    title: "Advanced Threat Detection: Using AI for Cybersecurity Defense",
    category: "Security",
    date: "Nov 18, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Latest Developments in Cloud-Native Data Processing Technologies",
    category: "News",
    date: "Nov 17, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Machine Learning Operations: Streamlining AI Development Workflows",
    category: "AI",
    date: "Nov 16, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    ],
    link: "#",
  },
  {
    title: "Data Privacy Regulations: Ensuring Compliance in Global Operations",
    category: "Security",
    date: "Nov 15, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
];

interface Resources2Props {
  className?: string;
}

const Resources2 = ({ className }: Resources2Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter(
    (blog) => selectedCategory === "All" || blog.category === selectedCategory,
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-4xl font-medium sm:text-6xl md:text-7xl">
          Resources & Whitepapers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our thoughts and perspectives on key topics.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <a
            href="#"
            className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-7 lg:row-span-2"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ba454dc72896-unsplash.jpg"
              alt="placeholder"
              className="size-full max-h-[550px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                <Sparkles className="size-4" />
                Featured Article
              </Badge>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium text-background">
                  Getting Started With Modern Digital Platforms and
                  Infrastructure
                </h2>
                <div className="flex items-center gap-2">
                  <time className="text-sm text-background/80">
                    Dec 4, 2024
                  </time>
                  <div className="flex items-center -space-x-2">
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                    </Avatar>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                    </Avatar>
                    <span className="z-10 grid size-6 place-items-center rounded-full border border-primary bg-primary/90 text-xs text-background backdrop-blur-sm">
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:flex-col">
            <a
              href="#"
              className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg"
                alt="placeholder"
                className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                  Latest
                </Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium text-background">
                    Streamlining Business Operations Through Effective Workflow
                    Automation
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-sm text-background/80">
                      Feb 12, 2024
                    </time>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-zr8IvMz0OWk-unsplash.jpg"
                alt="placeholder"
                className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                  Latest
                </Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium text-background">
                    Boosting Overall Efficiency: How We Significantly Improved
                    Search Performance
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-sm text-background/80">
                      Apr 1, 2025
                    </time>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="mb-6 text-2xl font-medium md:text-3xl">
            Latest updates
          </h2>
          <Tabs
            defaultValue="All"
            className="border-b border-border"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="flex h-auto gap-2 bg-background p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="group relative py-2.5 uppercase data-[state=active]:shadow-none"
                >
                  {category}
                  <span className="absolute -bottom-px group-data-[state=active]:h-px group-data-[state=active]:w-full group-data-[state=active]:bg-primary" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-4">
            {filteredBlogs.map((blog, idx) => (
              <a
                key={idx}
                href={blog.link}
                className="flex flex-col justify-between gap-4 border-b border-border py-6 md:flex-row"
              >
                <h3 className="font-medium md:line-clamp-1">{blog.title}</h3>
                <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
                  <p className="text-sm text-muted-foreground">
                    {blog.category}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {blog.date}
                  </time>
                  <div className="hidden items-center justify-end -space-x-2 md:flex">
                    {blog.author.map((author, idx) => (
                      <Avatar key={idx} className="size-6 border border-border">
                        <AvatarImage src={author} />
                      </Avatar>
                    ))}
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

export { Resources2 };
