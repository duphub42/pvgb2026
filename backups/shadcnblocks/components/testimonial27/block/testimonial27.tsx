import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "What I love most is having everything in one place—it simplifies routing and is 10x more intuitive than Chili Piper!",
    link: "#",
    author: {
      name: "Sarah Williams",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      role: "CTO, ARC",
    },
    company: {
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      name: "",
    },
  },
  {
    quote:
      "This app seamlessly integrates into our GTM ops, eliminating the need for a standalone tool and complex system connections.",
    link: "#",
    author: {
      name: "John Doe",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      role: "CEO & Founder, descript",
    },
    company: {
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      name: "",
    },
  },
];

const CASE_STUDIES = [
  {
    title: "How we Achieved 10x GTM Efficiency",
    link: "#",
    stats: [
      {
        number: "10x",
        text: "GTM efficiency increase",
      },
    ],
    author: {
      name: "John Doe",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      role: "Head of Marketing",
    },
    background:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
  },
  {
    title: "How Mercury Reduced Speed-to-Lead by 80%",
    link: "#",
    stats: [
      {
        number: "80%",
        text: "faster lead response time",
      },
    ],
    author: {
      name: "Jane Smith",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      role: "Sales Director",
    },
    background:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
  },
  {
    title: "From Zero to $7M in Pipeline",
    link: "#",
    stats: [
      {
        number: "$7M",
        text: "inbound pipeline generated",
      },
    ],
    author: {
      name: "John Doe",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      role: "Head of Marketing",
    },
    background:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
  },
];

interface AuthorProps {
  image: string;
  name: string;
  role: string;
}

const Author = ({ image, name, role }: AuthorProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10 rounded-xl bg-background/50">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  );
};

interface Testimonial27Props {
  className?: string;
}

const Testimonial27 = ({ className }: Testimonial27Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              What people think
            </h2>
            <div className="max-w-[28.75rem]">
              <p className="text-lg text-muted-foreground md:text-xl">
                Transform go-to-market with smarter routing, actionable intent,
                and accelerated scheduling.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-muted p-6"
            >
              <div className="flex flex-col gap-6">
                <p className="text-xl leading-relaxed font-medium text-foreground">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Author
                  image={testimonial.author.image}
                  role={testimonial.author.role}
                  name={testimonial.author.name}
                />
                <div className="w-24">
                  <img
                    className="w-full object-contain object-center opacity-80"
                    src={testimonial.company.logo}
                    alt={testimonial.company.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((caseStudy, index) => (
            <a
              key={index}
              href={caseStudy.link}
              className="group relative flex aspect-square flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-muted p-8 transition-all duration-300 hover:bg-foreground hover:shadow-lg"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-300 group-hover:scale-105 group-hover:opacity-10"
                style={{ backgroundImage: `url(${caseStudy.background})` }}
              />
              <div className="relative flex flex-col gap-3">
                <div className="text-5xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-background">
                  {caseStudy.stats[0].number}
                </div>
                <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-background/80">
                  {caseStudy.stats[0].text}
                </p>
              </div>
              <div className="relative flex flex-col gap-6">
                <p className="text-xl leading-tight font-semibold text-foreground transition-colors duration-300 group-hover:text-background">
                  {caseStudy.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Testimonial27 };
