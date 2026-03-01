"use client";
import React, { useRef, useEffect, useId, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  opacityDirection: number;
}

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleColor = "#ffffff",
    particleDensity = 120,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(undefined);
  const generatedId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const createParticle = useCallback(
    (width: number, height: number): Particle => {
      const baseSpeed = speed * 0.02;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * baseSpeed,
        speedY: (Math.random() - 0.5) * baseSpeed,
        opacity: Math.random(),
        opacitySpeed: (Math.random() * 0.5 + 0.5) * speed * 0.01,
        opacityDirection: Math.random() > 0.5 ? 1 : -1,
      };
    },
    [minSize, maxSize, speed],
  );

  const initParticles = useCallback(
    (width: number, height: number) => {
      // Calculate particle count based on density and area
      const area = width * height;
      const baseArea = 400 * 400;
      const count = Math.floor((particleDensity * area) / baseArea);

      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(width, height),
      );
    },
    [particleDensity, createParticle],
  );

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = hexToRgb(particleColor);

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      initParticles(rect.width, rect.height);
    };

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;

        // Update opacity (twinkling effect)
        particle.opacity += particle.opacitySpeed * particle.opacityDirection;
        if (particle.opacity >= 1) {
          particle.opacity = 1;
          particle.opacityDirection = -1;
        } else if (particle.opacity <= 0.1) {
          particle.opacity = 0.1;
          particle.opacityDirection = 1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    // Trigger fade in
    requestAnimationFrame(() => setIsVisible(true));

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [particleColor, initParticles]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ background }}
    >
      <canvas
        ref={canvasRef}
        id={id || generatedId}
        className="h-full w-full"
      />
    </div>
  );
};
