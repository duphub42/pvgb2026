import { ArrowLeft, Facebook, Link, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Resource2Props {
  navigation: {
    backText: string;
    backHref: string;
    className?: string;
  };
  blog: {
    title: string;
    author: string;
    role: string;
    date: string;
    readTime: string;
    imageSrc: string;
    content: React.ReactNode; // HTML content for rich text
  };
  social: {
    heading: string;
    links: Array<{
      icon: "link" | "linkedin" | "twitter" | "facebook";
      href: string;
      label: string;
    }>;
  };
  illustration: {
    imageSrc: string;
    imageAlt: string;
  };
  className?: string;
}

const Resource2 = ({
  className,
  navigation = {
    backText: "All Articles",
    backHref: "/resources",
  },
  blog = {
    title:
      "Building Sustainable Web Applications: A Developer's Guide to Green Coding",
    author: "Sarah Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    role: "Senior Developer",
    imageSrc:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content: (
      <>
        <p>
          The digital world consumes more energy than the entire aviation
          industry. As developers, we have a responsibility to build
          applications that are not only functional and beautiful, but also
          sustainable for our planet.
        </p>

        <h2>The Carbon Footprint of Code</h2>
        <p>
          Every line of code we write has an environmental impact. From the
          energy consumed by servers to the resources used in manufacturing
          devices, our digital choices matter more than we think.
        </p>

        <h3>Understanding the Impact</h3>
        <p>
          Modern web applications are incredibly resource-intensive. Consider
          these staggering facts:
        </p>
        <ul>
          <li>
            <strong>Data centers</strong> consume 1% of global electricity
          </li>
          <li>
            <strong>Video streaming</strong> accounts for 3% of global carbon
            emissions
          </li>
          <li>
            <strong>Email spam</strong> generates 17 million tons of CO2
            annually
          </li>
        </ul>

        <blockquote>
          <p>
            "The most sustainable code is the code you don't write. The second
            most sustainable is the code that runs efficiently."
          </p>
        </blockquote>

        <h2>Green Coding Principles</h2>
        <p>
          Here are the fundamental principles every developer should follow:
        </p>
        <ol>
          <li>
            <strong>Optimize for performance:</strong> Faster code uses less
            energy
          </li>
          <li>
            <strong>Minimize dependencies:</strong> Every package adds to the
            bundle size
          </li>
          <li>
            <strong>Use efficient algorithms:</strong> Better complexity means
            less computation
          </li>
          <li>
            <strong>Implement caching strategies:</strong> Reduce redundant
            operations
          </li>
          <li>
            <strong>Choose green hosting:</strong> Renewable energy-powered
            servers
          </li>
        </ol>

        <h3>Practical Implementation</h3>
        <p>
          Let's look at some concrete examples of how to implement these
          principles:
        </p>

        <h4>1. Image Optimization</h4>
        <p>
          Images often account for 60-80% of a webpage's size. Use modern
          formats like WebP or AVIF, implement lazy loading, and serve
          appropriately sized images.
        </p>

        <h4>2. Code Splitting</h4>
        <p>
          Load only the JavaScript that users actually need. This reduces
          initial bundle size and improves performance.
        </p>

        <h4>3. Database Optimization</h4>
        <p>
          Write efficient queries, use proper indexing, and implement connection
          pooling to reduce database load.
        </p>

        <h2>The Future of Sustainable Development</h2>
        <p>
          As we move forward, sustainability must become a core consideration in
          every development decision. Tools like <strong>WebPageTest</strong>{" "}
          and <strong>Lighthouse</strong> can help measure the environmental
          impact of our applications.
        </p>

        <p>
          The journey to sustainable web development is ongoing, but every small
          optimization contributes to a greener digital future. Start with one
          principle, measure the impact, and gradually incorporate more
          sustainable practices into your development workflow.
        </p>
      </>
    ),
  },
  social = {
    heading: "Share this article",
    links: [
      { icon: "link", href: "#", label: "Copy link" },
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
      { icon: "twitter", href: "#", label: "Share on X" },
      { icon: "facebook", href: "#", label: "Share on Facebook" },
    ],
  },
  illustration = {
    imageSrc:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    imageAlt:
      "Sustainable web development illustration showing green coding practices and environmental impact",
  },
}: Resource2Props) => {
  const getIcon = (icon: string, className: string) => {
    switch (icon) {
      case "link":
        return <Link className={`size-4 ${className}`} />;
      case "linkedin":
        return <Linkedin className={`size-4 ${className}`} />;
      case "twitter":
        return <Twitter className={`size-4 ${className}`} />;
      case "facebook":
        return <Facebook className={`size-4 ${className}`} />;
      default:
        return null;
    }
  };

  return (
    <section className={cn("", className)}>
      <div className="min-h-128 bg-primary text-primary-foreground">
        <div className="container py-16">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Left Section - Content */}
            <div className="flex h-full max-w-md flex-col justify-between gap-8">
              {/* Blog Content */}
              <div className="space-y-6">
                {/* Navigation */}
                <div className="flex items-center gap-2 text-primary-foreground">
                  <a
                    href={navigation.backHref}
                    className="group/nav flex items-center gap-2 transition-all duration-200 hover:gap-4"
                  >
                    <ArrowLeft className="size-4 group-hover/nav:text-primary-foreground" />
                    <span className="transition-colors group-hover/nav:text-primary-foreground group-hover/nav:underline">
                      {navigation.backText}
                    </span>
                  </a>
                </div>
                <h1 className="text-3xl leading-tight font-medium">
                  {blog.title}
                </h1>
              </div>
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">{blog.author}</p>
                  <p className="text-muted-foreground">
                    {blog.date} • {blog.readTime}
                  </p>
                </div>
                {/* Social Sharing */}
                <div className="space-y-4">
                  <h3 className="">{social.heading}</h3>
                  <div className="flex gap-3">
                    {social.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="group/btn h-12 w-12 rounded-full border-border/10 bg-muted/20 transition-colors hover:bg-transparent hover:text-muted"
                        asChild
                      >
                        <a
                          href={link.href}
                          aria-label={link.label}
                          className="flex items-center justify-center"
                        >
                          {getIcon(
                            link.icon,
                            "text-muted/30 group-hover/btn:text-primary-foreground transition-colors",
                          )}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="col-span-2 h-full w-full">
              <div className="aspect-video min-h-96 w-full">
                <img
                  src={illustration.imageSrc}
                  alt={illustration.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 md:max-w-2xl xl:max-w-5xl">
        <div className="prose max-w-none pb-16 prose-headings:text-foreground prose-p:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
          {blog.content}
        </div>
        <div className="flex flex-col justify-between gap-8 border-t border-border py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border xl:size-16">
              <AvatarImage src={blog.imageSrc} />
              <AvatarFallback>{blog.author}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blog.author}</p>
              <p className="text-sm text-muted-foreground">{blog.role}</p>
            </div>
          </div>
          {/* Social Sharing */}
          <div className="space-y-4">
            <h3 className="">{social.heading}</h3>
            <div className="flex gap-3">
              {social.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="group/btn h-12 w-12 rounded-full border-border bg-muted transition-colors hover:bg-transparent hover:text-muted"
                  asChild
                >
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="flex items-center justify-center"
                  >
                    {getIcon(
                      link.icon,
                      "text-muted-foreground group-hover/btn:text-primary transition-colors",
                    )}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resource2 };
