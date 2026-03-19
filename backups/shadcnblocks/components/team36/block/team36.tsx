import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Team36Props {
  heading?: string;
  members?: TeamMember[];
  className?: string;
}

const Team36 = ({
  heading = "Our investors",
  members = [
    {
      name: "Dennis Bouvard",
      role: "Blackbird Ventures",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar-1.webp",
    },
    {
      name: "Renatus Gerard",
      role: "Center Studies",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar-2.webp",
    },
    {
      name: "Leslie Alexander",
      role: "TechNexus",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar-3.webp",
    },
    {
      name: "Matthew Stephens",
      role: "Etymol Cap",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar-4.webp",
    },
    {
      name: "Josephine Newman",
      role: "Vandenberg",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar-5.webp",
    },
  ],
  className,
}: Team36Props) => {
  return (
    <section className={cn("container max-w-5xl py-12", className)}>
      <h2 className="text-4xl font-medium tracking-wide text-foreground">
        {heading}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <div key={member.name}>
            <img
              src={member.image}
              alt={member.name}
              className="size-30 object-cover"
            />
            <h3 className="mt-3 font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Team36 };
