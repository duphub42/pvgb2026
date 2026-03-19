import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Hero76Props {
  className?: string;
}

const Hero76 = ({ className }: Hero76Props) => {
  return (
    <section
      className={cn(
        "container mx-auto mt-32 flex flex-col items-center gap-20 bg-background md:gap-40 md:text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-10 md:items-center">
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg"
          alt=""
          className="h-11 w-fit"
        />
        <div className="flex max-w-[880px] flex-col items-center gap-6">
          <h1 className="text-4xl tracking-tighter text-foreground capitalize md:text-5xl lg:text-6xl">
            <p>The continuously growing UI library for Shadcn & Figma</p>
          </h1>
          <div className="text-xl text-muted-foreground">
            <p>
              Create quicker, more efficiently, and boost your design expertise.
            </p>
            <p>Transform into an elite designer instantly</p>
          </div>
        </div>
        <Button className="h-fit self-center rounded-full px-6 py-3">
          Download Now
        </Button>
      </div>
      <div className="w-full overflow-hidden rounded-lg">
        <AspectRatio ratio={1.916786227 / 1}>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt=""
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>
    </section>
  );
};

export { Hero76 };
