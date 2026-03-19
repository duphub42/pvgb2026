import { ArrowRight, BookOpen, Play, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Resources5Props {
  courses: Array<{
    badge?: string;
    title: string;
    description: string;
    author: {
      name: string;
      title: string;
      avatar: string;
      className?: string;
    };
    image: string;
    lessons: number;
    videos: number;
    duration: string;
    audience: string[];
    gradient: string;
    cta: {
      text: string;
      url: string;
    };
  }>;
  className?: string;
}

const Resources5 = ({
  className,
  courses = [
    {
      badge: "Course",
      title: "Master Sanity Studio Fundamentals",
      description:
        "Learn the core concepts of Sanity Studio, from schema design to content modeling. Build your first content management system with hands-on exercises and real-world examples.",
      author: {
        name: "Alex Chen",
        title: "Senior Developer at Sanity",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      },
      lessons: 12,
      videos: 15,
      duration: "42:18 minutes",
      audience: ["Developers", "Content creators"],
      gradient: "from-blue-100 to-purple-100",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      cta: {
        text: "Start",
        url: "https://www.shadcnblocks.com",
      },
    },
    {
      badge: "Course",
      title: "Advanced Content Operations",
      description:
        "Dive deep into advanced Sanity features including custom input components, validation rules, and performance optimization. Learn to build scalable content workflows for enterprise applications.",
      author: {
        name: "Maria Rodriguez",
        title: "Lead Content Strategist",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      },
      lessons: 18,
      videos: 22,
      duration: "58:45 minutes",
      audience: ["Developers", "Content creators", "Designers"],
      gradient: "from-green-100 to-emerald-100",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      cta: {
        text: "Start",
        url: "https://www.shadcnblocks.com",
      },
    },
  ],
}: Resources5Props) => {
  return (
    <section className={cn("bg-background py-16", className)}>
      <div className="flex flex-col gap-8">
        {courses.map((course) => (
          <div
            key={course.title}
            className="relative flex flex-col gap-8 border-t-1 border-border py-16 md:p-8"
          >
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* Left Content */}
              <div className="flex flex-col gap-4">
                {/* Course Type Badge */}
                <div className="">
                  <Badge variant="secondary" className="rounded-none uppercase">
                    {course.badge}
                  </Badge>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl font-bold">{course.title}</h3>

                {/* Course Meta */}
                <div className="space-y-2 text-sm text-foreground/90">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{course.audience.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span>
                      {course.videos} Videos, {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Description */}
                <p className="text-lg leading-relaxed">{course.description}</p>

                {/* Author */}
                <div className="">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border xl:size-12">
                      <AvatarImage src={course.author.avatar} />
                      <AvatarFallback>{course.author.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.author.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <a
                  href={course.cta.url}
                  className="group/btn flex w-fit items-center gap-2 border-l-1 border-border p-1 hover:bg-accent"
                >
                  <span className="font-medium">{course.cta.text}</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>

              {/* Right Visual Element */}
              <div>
                <div
                  className={`group grid aspect-video w-full place-items-center bg-gradient-to-br ${course.gradient} rounded-lg pt-6 pr-8 transition duration-200 ease-out hover:scale-[1.03] hover:-rotate-2 dark:from-muted dark:to-muted/50`}
                >
                  <div className="shadow-duo col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-6deg] rounded-md border border-border bg-muted/50 transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-2deg] lg:w-32"></div>
                  <div className="col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-8deg] rounded-md border border-border bg-muted/50 transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-8deg] lg:w-32"></div>
                  <div className="shadow-duo col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-10deg] rounded-md border border-border bg-card transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-14deg] lg:w-32">
                    <div className="m-4 h-4 w-4 rounded-full bg-muted shadow-inner"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Resources5 };
