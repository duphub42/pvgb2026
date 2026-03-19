import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero91Props {
  className?: string;
}

const Hero91 = ({ className }: Hero91Props) => {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-between bg-background py-14",
        className,
      )}
    >
      <div className="flex flex-col gap-5 px-[10%] lg:w-[50%] lg:pr-0">
        <p className="font-light text-foreground uppercase">
          Virtual Engagement Maximized & AI-Powered Content Transformation
        </p>
        <h1 className="text-5xl font-medium text-foreground md:text-6xl lg:text-7xl">
          Presentation Platform for Marketing Professionals
        </h1>
        <p className="my-8 text-foreground md:text-xl">
          Effortlessly Create, Deliver, and Reimagine All-Hands Corporate
          Meetings
        </p>
        <div className="flex flex-col gap-4 font-medium md:flex-row">
          <Button className="h-fit items-center gap-1 rounded-full px-6 py-3">
            Try it firsthand →
          </Button>
          <Button variant="secondary" className="h-fit rounded-full px-6 py-3">
            Schedule a demo
          </Button>
        </div>
      </div>
      <div className="relative hidden h-[720px] w-[45%] overflow-hidden rounded-l-full bg-black lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
          className="h-full w-full rounded-tl-xl object-cover"
        >
          <source
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export { Hero91 };
