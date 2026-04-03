'use client'

import Image from 'next/image'
import { cn } from '@/utilities/ui'

export type HeroStackResolvedLayer = {
  src: string
  offsetX: number
  offsetY: number
  z: number
  /** Hinten: breitere Fläche wie Profil-„Cloud“ */
  wide?: boolean
}

/**
 * Bis zu drei Motive, Anker unten Mitte der rechten Spalte + px-Offsets aus dem CMS.
 */
export function PopoutHeroStackVisual({
  layers,
  className,
}: {
  layers: HeroStackResolvedLayer[]
  className?: string
}) {
  if (layers.length === 0) return null

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[min(100%,580px)] min-h-[min(52vh,520px)] items-end justify-center overflow-visible md:h-full md:max-h-none md:min-h-0',
        className,
      )}
    >
      <div className="pointer-events-none relative min-h-[min(52vh,520px)] w-full md:min-h-[min(58vh,640px)]">
        {layers.map((layer) =>
          layer.wide ? (
            <div
              key={`${layer.z}-${layer.src}`}
              className="absolute inset-x-[-6%] bottom-[2%] top-[6%] md:inset-x-[-8%] md:bottom-[0%] md:top-[2%]"
              style={{
                zIndex: layer.z,
                transform: `translate(${layer.offsetX}px, ${layer.offsetY}px)`,
              }}
            >
              <div
                className={cn(
                  'relative h-full min-h-[10rem] w-full',
                  layer.z <= 0 && 'hero-stack-back-cloud',
                  layer.z <= 0 ? 'hero-stack-float-back' : 'hero-stack-float-mid',
                )}
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 96vw, 560px"
                  priority
                />
              </div>
            </div>
          ) : (
            <div
              key={`${layer.z}-${layer.src}`}
              className="absolute bottom-[2%] left-1/2 flex w-[86%] max-w-[min(560px,92vw)] justify-center md:bottom-[0%] md:w-[90%]"
              style={{
                zIndex: 10 + layer.z,
                transform: `translate(calc(-50% + ${layer.offsetX}px), calc(${layer.offsetY}px + var(--hero-stack-base-y, clamp(1rem, 6vh, 4.5rem)) - var(--hero-stack-lift, 0px)))`,
              }}
            >
              <div
                className={cn(
                  'w-full',
                  layer.z <= 0
                    ? 'hero-stack-float-back'
                    : layer.z === 1
                      ? 'hero-stack-float-mid'
                      : 'hero-stack-float-front',
                )}
              >
                <Image
                  src={layer.src}
                  alt=""
                  width={1024}
                  height={958}
                  className="h-auto max-h-[min(88vh,920px)] w-full object-contain object-bottom md:max-h-[min(92vh,960px)] md:translate-y-[calc(var(--hero-stack-img-base-y,clamp(1rem,6vh,4rem))-var(--hero-stack-lift,0px))] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  sizes="(max-width: 768px) 80vw, 520px"
                  priority
                />
              </div>
            </div>
          ),
        )}
      </div>
      <style jsx>{`
        @keyframes hero-stack-float-back {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-0.25deg);
          }
          50% {
            transform: translate3d(-14px, -10px, 0) rotate(0.85deg);
          }
        }

        @keyframes hero-stack-float-mid {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(11px, -18px, 0) rotate(-0.65deg);
          }
        }

        @keyframes hero-stack-float-front {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0.35deg);
          }
          50% {
            transform: translate3d(2px, -22px, 0) rotate(-0.85deg);
          }
        }

        .hero-stack-float-back {
          animation: hero-stack-float-back 9.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-stack-float-mid {
          animation: hero-stack-float-mid 7.8s ease-in-out infinite;
          animation-delay: -1s;
          will-change: transform;
        }

        .hero-stack-float-front {
          animation: hero-stack-float-front 6.6s ease-in-out infinite;
          animation-delay: -0.7s;
          will-change: transform;
        }

        [data-theme='dark'] .hero-stack-back-cloud {
          filter:
            drop-shadow(0 24px 54px rgba(0, 0, 0, 0.55))
            drop-shadow(0 0 48px rgba(255, 255, 255, 0.12));
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-stack-float-back,
          .hero-stack-float-mid,
          .hero-stack-float-front {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
