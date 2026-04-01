'use client'

import { cn } from '@/lib/utils'

export function HeroBackgroundThree({ className = '' }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden>
      <style jsx>{`
        @keyframes HeroBackgroundThreeMovement {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(8px, -8px, 0);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.95;
          }
        }

        .hero-bg-three-grid {
          background-image:
            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.08), transparent 28%),
            radial-gradient(circle at 85% 12%, rgba(255, 255, 255, 0.08), transparent 24%),
            linear-gradient(135deg, rgba(50, 63, 90, 0.9), rgba(10, 16, 27, 0.8));
          filter: saturate(1.2);
          opacity: 0.95;
          animation: HeroBackgroundThreeMovement 12s ease-in-out infinite;
        }

        .hero-bg-three-overlay {
          background-image: repeating-linear-gradient(
            60deg,
            rgba(255, 255, 255, 0.09) 0 1px,
            transparent 1px 28px
          );
          opacity: 0.72;
          mix-blend-mode: screen;
          animation: HeroBackgroundThreeMovement 22s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 hero-bg-three-grid" />
      <div className="absolute inset-0 hero-bg-three-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950/65 to-black/80" />
    </div>
  )
}
