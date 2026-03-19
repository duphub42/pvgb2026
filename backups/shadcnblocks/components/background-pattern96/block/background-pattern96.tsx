import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern96Props {
  className?: string;
}

const BackgroundPattern96 = ({ className }: BackgroundPattern96Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Gradient Glow with Noise Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(at 0% 0%, oklch(from var(--chart-1) l c h / 0.25) 0%, transparent 40%),
            radial-gradient(at 10% 10%, oklch(from var(--chart-2) l c h / 0.2) 0%, transparent 45%),
            radial-gradient(at 5% 15%, oklch(from var(--chart-3) l c h / 0.18) 0%, transparent 50%),
            radial-gradient(at 15% 5%, oklch(from var(--chart-4) l c h / 0.15) 0%, transparent 35%),
            var(--background)
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <svg
          className="h-full w-full opacity-20"
          style={{ mixBlendMode: "overlay" }}
        >
          <filter id="noise-pattern">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              seed="2"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#noise-pattern)"
            fill="white"
          />
        </svg>
      </div>
      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern96 };
