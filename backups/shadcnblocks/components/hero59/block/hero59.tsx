import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero59Props {
  className?: string;
}

const Hero59 = ({ className }: Hero59Props) => {
  return (
    <section className={cn("dark relative h-screen bg-background", className)}>
      <div className="relative z-10 container mx-auto flex size-full max-w-3xl flex-col justify-center gap-4 lg:items-center lg:text-center">
        <span className="text-xs text-muted-foreground">
          BETA RELEASE AVAILABLE
        </span>
        <h1 className="text-5xl font-bold text-foreground lg:text-[4.2rem]">
          Unveiling MyBusiness Edition 1
        </h1>
        <p className="text-lg text-muted-foreground">
          Tailor and oversee any creative process from start to finish with
          unprecedented speed and efficiency.
        </p>
        <div className="flex lg:justify-center">
          <div className="flex min-w-fit flex-col gap-5 text-sm leading-[.96] whitespace-nowrap lg:flex-row lg:items-stretch">
            <Button className="h-fit flex-1 rounded-full px-6 py-3.5">
              Enroll in Beta
            </Button>
            <Button
              variant="outline"
              className="h-fit flex-1 rounded-full border border-white/50 bg-transparent px-6 py-3.5 text-foreground hover:bg-transparent"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
      <video
        loop
        playsInline
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-5.mp4"
        className="absolute top-0 left-0 size-full object-cover"
        autoPlay
        muted
      />
    </section>
  );
};

export { Hero59 };
