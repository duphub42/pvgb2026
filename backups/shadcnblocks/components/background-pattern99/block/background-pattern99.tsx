import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern99Props {
  className?: string;
}

const BackgroundPattern99 = ({ className }: BackgroundPattern99Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Duo-Color Gradient Blend with Noise */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 100% 0%, oklch(from var(--chart-1) calc(l * 1.2) calc(c * 1.5) h / 0.6) 0%, transparent 45%),
            radial-gradient(circle at 0% 100%, oklch(from var(--chart-2) calc(l * 1.2) calc(c * 1.4) h / 0.4) 0%, transparent 50%),
            var(--background)
          `,
          filter: "blur(120px)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <svg
          className="h-full w-full opacity-30"
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

export { BackgroundPattern99 };
