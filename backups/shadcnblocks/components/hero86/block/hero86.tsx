import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero86Props {
  className?: string;
}

const Hero86 = ({ className }: Hero86Props) => {
  return (
    <section className={cn("pb-24", className)}>
      <div className="bg-muted pt-16 lg:pt-24">
        <div className="container flex flex-col items-center lg:flex-row lg:items-start">
          <div className="relative flex flex-col items-start gap-8 pb-20 lg:w-1/2">
            <h2 className="text-3xl leading-tight font-bold tracking-tighter text-foreground lg:text-5xl">
              Your ad campaigns excel with{" "}
              <span className="border-muted2 border-b-2">my expertise</span>,
              delivering optimized performance.
            </h2>
            <p className="text-lg text-foreground">
              I’ll maximize your ad campaigns' potential or teach you the
              strategies so you can manage them yourself!
            </p>
            <Button className="h-fit px-6 py-3.5 text-base font-medium lg:text-lg">
              I want to outsource your ads
            </Button>
          </div>
          <div className="relative flex w-full justify-center lg:w-1/2">
            <div className="relative z-10 -mb-16 h-auto w-[80%] max-w-[355px] lg:w-[520px]">
              <AspectRatio ratio={355 / 520} className="border-muted2 border">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="size-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="absolute bottom-0 w-full overflow-hidden">
              <AspectRatio ratio={2} className="relative">
                <AspectRatio
                  ratio={1}
                  className="absolute w-full rounded-full bg-muted"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero86 };
