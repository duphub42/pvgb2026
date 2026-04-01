'use client'

import { cn } from '@/lib/utils'

export function HeroAnimatedGridWave({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden>
      <style jsx>{`
        @keyframes HeroAnimatedGridWaveShift {
          0% {
            background-position:
              0 0,
              0 0;
            opacity: 0.7;
          }
          50% {
            background-position:
              30px 45px,
              -40px -35px;
            opacity: 0.85;
          }
          100% {
            background-position:
              0 0,
              0 0;
            opacity: 0.7;
          }
        }

        .hero-grid-wave {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size:
            24px 24px,
            24px 24px,
            40px 40px;
          opacity: 0.75;
          animation: HeroAnimatedGridWaveShift 10s linear infinite;
        }

        .hero-grid-wave::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05), transparent 55%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.04), transparent 50%);
        }
      `}</style>

      <div className="hero-grid-wave" />
    </div>
  )
}

export default HeroAnimatedGridWave
