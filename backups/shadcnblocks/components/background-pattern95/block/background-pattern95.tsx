import { PatternPlaceholder } from "@/components/shadcnblocks/pattern-placeholder";
import { cn } from "@/lib/utils";

interface BackgroundPattern95Props {
  className?: string;
}

const BackgroundPattern95 = ({ className }: BackgroundPattern95Props) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      {/* Multi-Corner Radial Gradient Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: ` 
            radial-gradient(at 34% 18%, oklch(from var(--chart-1) l c h / 0.15) 0%, transparent 50%),
            radial-gradient(at 90% 64%, oklch(from var(--chart-2) l c h / 0.15) 0%, transparent 50%), 
            radial-gradient(at 69% 59%, oklch(from var(--chart-3) l c h / 0.15) 0%, transparent 50%), 
            radial-gradient(at 0% 78%, oklch(from var(--chart-4) l c h / 0.15) 0%, transparent 50%), 
            var(--background)
          `,
        }}
      />

      {/* Noise Texture Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-conic-gradient(from 0deg at 50% 50%, 
              oklch(from var(--muted) l c h / 0.03) 0deg 0.5deg,
              transparent 0.5deg 1deg
            ),
            repeating-conic-gradient(from 45deg at 50% 50%, 
              oklch(from var(--foreground) l c h / 0.50) 0deg 0.5deg,
              transparent 0.5deg 1deg
            )
          `,
          backgroundSize: "5px 5px, 5px 5px",
          mixBlendMode: "overlay",
        }}
      />

      <PatternPlaceholder />
    </section>
  );
};

export { BackgroundPattern95 };
