"use client";

import React, { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkItem {
  text: string;
  url: string;
}

interface HeaderProps {
  companyLogo: string;
  links: LinkItem[];
  className?: string;
}

const Header = ({ companyLogo, links, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-2",
        className,
      )}
    >
      <img
        src={companyLogo}
        alt={companyLogo}
        className="w-34 md:w-50 dark:invert"
      />
      <div className="flex items-center">
        {links.map((link, index) => {
          return (
            <a href={link.url} key={`link-${index}`}>
              <Button size="sm" variant="ghost" className="text-xs md:text-sm">
                {link.text}
              </Button>
            </a>
          );
        })}
      </div>
    </div>
  );
};

interface ContentProps {
  heading: string;
  buttonText: string;
  buttonUrl: string;
}

const Content = ({ heading, buttonText, buttonUrl }: ContentProps) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <h3 className="leading-tighter max-w-md text-5xl font-medium md:max-w-lg md:text-6xl">
        {heading}
      </h3>
      <a href={buttonUrl}>
        <Button variant="outline" className="text-xs md:text-sm">
          {buttonText}
        </Button>
      </a>
    </div>
  );
};

interface FooterProps {
  companyDescription: string;
  incubators: string;
}

const Footer = ({ companyDescription, incubators }: FooterProps) => {
  return (
    <div className="flex max-w-md flex-col gap-2 text-xs md:text-sm">
      <p className="text-muted-foreground">{incubators}</p>
      <p>{companyDescription}</p>
    </div>
  );
};

const DitherBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const SEED = 42.0;
    const dotSize = 6; // Increased for better performance

    // Shader functions converted to JavaScript
    const swayRandomized = (seed: number, value: number): number => {
      const f = Math.floor(value);
      const start = Math.sin(
        (Math.cos(f * seed) + Math.sin(f * 1024.0)) * 345.0 + seed,
      );
      const end = Math.sin(
        (Math.cos((f + 1.0) * seed) + Math.sin((f + 1.0) * 1024.0)) * 345.0 +
          seed,
      );
      const t = value - f;
      const smooth = t * t * (3 - 2 * t); // smoothstep approximation
      return start + (end - start) * smooth;
    };

    const cosmic = (seed: number, con: [number, number, number]): number => {
      let sum = swayRandomized(seed, con[2] + con[0]);
      sum = sum + swayRandomized(seed, con[0] + con[1] + sum);
      sum = sum + swayRandomized(seed, con[1] + con[2] + sum);
      return sum * 0.3333333333;
    };

    const dither = (chance: number, uv: [number, number]): boolean => {
      // Calculate dot(sin(uv.xy), cos(uv.yx))
      const dotValue =
        Math.sin(uv[0]) * Math.sin(uv[1]) + Math.cos(uv[1]) * Math.cos(uv[0]);
      return dotValue >= chance * 1.5;
    };

    const draw = () => {
      if (!ctx) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      const aTime = timeRef.current * 0.125;

      // Calculate s and c vectors once per frame (cached)
      const s: [number, number, number] = [
        swayRandomized(-16405.31527, aTime - 1.11),
        swayRandomized(-77664.8142, aTime + 1.41),
        swayRandomized(-50993.519, aTime + 2.61),
      ].map((v) => v * 5.0) as [number, number, number];

      const c: [number, number, number] = [
        swayRandomized(-10527.92407, aTime - 1.11),
        swayRandomized(-61557.6687, aTime + 1.41),
        swayRandomized(-43527.899, aTime + 2.61),
      ].map((v) => v * 5.0) as [number, number, number];

      // Use ImageData for faster pixel manipulation
      const cols = Math.ceil(width / dotSize);
      const rows = Math.ceil(height / dotSize);
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Pre-calculate time-based UV multiplier
      const uvTimeMultiplier = timeRef.current * 71.0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * dotSize;
          const y = row * dotSize;

          // Normalized coordinates (UV)
          const uv: [number, number] = [x / width, y / height];

          // Calculate con vector
          const con: [number, number, number] = [
            0.0004375 * aTime + c[0] * uv[0] + s[0] * uv[1],
            0.0005625 * aTime + c[1] * uv[0] + s[1] * uv[1],
            0.0008125 * aTime + c[2] * uv[0] + s[2] * uv[1],
          ];

          // Apply cosmic function
          con[0] = cosmic(SEED, con);
          con[1] = cosmic(SEED, con);
          con[2] = cosmic(SEED, con);

          // Calculate dither chance
          const chance = Math.sin(con[2] * Math.PI);

          // Scale UV by time for animation
          const animatedUv: [number, number] = [
            uv[0] * uvTimeMultiplier,
            uv[1] * uvTimeMultiplier,
          ];

          const shouldDraw = dither(chance, animatedUv);

          // Draw dot using ImageData
          const color = shouldDraw ? 255 : 0; // White or black
          for (let dy = 0; dy < dotSize && y + dy < height; dy++) {
            for (let dx = 0; dx < dotSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              data[idx] = color; // R
              data[idx + 1] = color; // G
              data[idx + 2] = color; // B
              data[idx + 3] = 255; // A
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      timeRef.current += 0.015; // Slightly slower time increment
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
};

interface Hero259Props {
  companyLogo?: string;
  heading?: string;
  buttonText?: string;
  buttonUrl?: string;
  companyDescription?: string;
  incubators?: string;
  links?: LinkItem[];
  className?: string;
}

const Hero259 = ({
  companyLogo = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo-word.svg",
  heading = "The components designed for developers",
  buttonText = "Get Started",
  buttonUrl = "https://www.shadcnblocks.com",
  companyDescription = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  incubators = "Backed by Ramp & Mercury",
  links = [
    {
      text: "Documentation",
      url: "https://www.shadcnblocks.com",
    },
    {
      text: "GitHub",
      url: "https://www.shadcnblocks.com",
    },
    {
      text: "Twitter",
      url: "https://www.shadcnblocks.com",
    },
  ],
}: Hero259Props) => {
  return (
    <section>
      <div className="grid grid-cols-10 lg:grid-cols-2">
        <div className="col-span-9 flex h-screen flex-col justify-between p-6 lg:col-span-1">
          <div className="flex flex-1/2 flex-col justify-between">
            <Header companyLogo={companyLogo} links={links} />
            <Content
              heading={heading}
              buttonText={buttonText}
              buttonUrl={buttonUrl}
            />
          </div>
          <div className="col-span-1 flex h-full flex-1/2 items-end">
            <Footer
              companyDescription={companyDescription}
              incubators={incubators}
            />
          </div>
        </div>
        <div className="col-span-1 h-screen min-h-0 overflow-hidden">
          <DitherBackground />
        </div>
      </div>
    </section>
  );
};

export { Hero259 };
