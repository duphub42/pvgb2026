import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern98Props {
  className?: string;
}

const BackgroundPattern98 = ({ className }: BackgroundPattern98Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Bottom Glow with Noise Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, oklch(from var(--chart-1) l calc(c * 1.8) h / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, oklch(from var(--chart-2) l calc(c * 1.5) h / 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, oklch(from var(--chart-3) l calc(c * 1.3) h / 0.3) 0%, transparent 80%)
        `,
          filter: "blur(100px)",
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

export { BackgroundPattern98 };
