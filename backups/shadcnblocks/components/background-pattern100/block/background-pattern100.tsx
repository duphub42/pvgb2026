import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern100Props {
  className?: string;
}

const BackgroundPattern100 = ({ className }: BackgroundPattern100Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Bottom Gradient Blend with Noise */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle 900px at 0% 100%, 
              oklch(from var(--chart-1) calc(l * 1.1) calc(c * 1.8) h / 0.8) 0%,
              oklch(from var(--chart-1) calc(l * 0.9) calc(c * 1.6) h / 0.6) 25%,
              oklch(from var(--chart-1) calc(l * 0.8) calc(c * 1.4) h / 0.3) 50%,
              transparent 80%
            ),
            radial-gradient(circle 900px at 100% 100%, 
              oklch(from var(--chart-2) calc(l * 1.1) calc(c * 1.8) h / 0.8) 0%,
              oklch(from var(--chart-2) calc(l * 0.9) calc(c * 1.6) h / 0.6) 25%,
              oklch(from var(--chart-2) calc(l * 0.8) calc(c * 1.4) h / 0.3) 50%,
              transparent 80%
            ),
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

export { BackgroundPattern100 };
