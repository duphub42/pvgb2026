import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Hero75Props {
  className?: string;
}

const Hero75 = ({ className }: Hero75Props) => {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className="text-4xl text-foreground">
            Business{" "}
            <span className="bg-linear-to-tr from-foreground to-muted bg-clip-text text-transparent">
              PRO
            </span>
          </h1>
          <div>
            <h2 className="text-4xl text-foreground lg:text-6xl">
              Achieve More with Elite Access Pro
            </h2>
            <p className="mt-2.5 text-foreground lg:text-xl">
              Enhance your career hunt with increased visibility, first-look
              opportunities and monetary incentives!
            </p>
            <Button className="mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold">
              <span>Upgrade to premium </span>
              <ChevronRight className="size-5!" />
            </Button>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-3">
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <Avatar className="block size-11 min-h-11 min-w-11 rounded-full object-cover lg:size-11">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp" />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-foreground lg:text-sm">
              More than 1 million medical practitioners rely on CareerMed
            </span>
          </div>
        </div>
      </div>
      <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
        alt=""
        className="hidden h-screen w-1/2 object-cover lg:block"
      />
    </section>
  );
};

export { Hero75 };
