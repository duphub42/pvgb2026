'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '@/utilities/ui'

export type HeroStackResolvedLayer = {
  src: string
  offsetX: number
  offsetY: number
  z: number
  width?: number
  height?: number
  /** Hinten: breitere Fläche wie Profil-„Cloud“ */
  wide?: boolean
}

const DEFAULT_FRONT_IMAGE_WIDTH = 1024
const DEFAULT_FRONT_IMAGE_HEIGHT = 958

function toPositiveDimension(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return null
  return Math.round(value)
}

function getLayerDimensions(layer: HeroStackResolvedLayer): { width: number; height: number } {
  const width = toPositiveDimension(layer.width)
  const height = toPositiveDimension(layer.height)

  if (width && height) return { width, height }
  if (width) {
    return {
      width,
      height: Math.round((width * DEFAULT_FRONT_IMAGE_HEIGHT) / DEFAULT_FRONT_IMAGE_WIDTH),
    }
  }
  if (height) {
    return {
      width: Math.round((height * DEFAULT_FRONT_IMAGE_WIDTH) / DEFAULT_FRONT_IMAGE_HEIGHT),
      height,
    }
  }

  return {
    width: DEFAULT_FRONT_IMAGE_WIDTH,
    height: DEFAULT_FRONT_IMAGE_HEIGHT,
  }
}

/**
 * Bis zu drei Motive, Anker unten Mitte der rechten Spalte + px-Offsets aus dem CMS.
 */
export function PopoutHeroStackVisual({
  layers,
  className,
  frontMobileWidthPercent = 86,
  frontMobileMaxWidth,
  frontMobileImageScale = 1,
  rootMaxWidth,
  rootMinHeight,
  rootMaxWidthMd,
  rootMinHeightMd,
  innerMinHeight,
  innerMinHeightMd,
  desktopLayerWidth = '90%',
  imageMaxHeight,
  imageMaxHeightMd,
}: {
  layers: HeroStackResolvedLayer[]
  className?: string
  /** Mobile width of the front-most non-wide layer (number = %, string = CSS width expression). */
  frontMobileWidthPercent?: number | string
  /** Optional max-width for the front-most non-wide layer on mobile (CSS width expression). */
  frontMobileMaxWidth?: string
  /** Additional mobile-only scale for the front-most image content (helps when image has transparent margins). */
  frontMobileImageScale?: number
  /** Root max-width on mobile (CSS length/expression). */
  rootMaxWidth?: string
  /** Root min-height on mobile (CSS length/expression). */
  rootMinHeight?: string
  /** Root max-width from `md` and up (CSS length/expression). */
  rootMaxWidthMd?: string
  /** Root min-height from `md` and up (CSS length/expression). */
  rootMinHeightMd?: string
  /** Inner container min-height on mobile (CSS length/expression). */
  innerMinHeight?: string
  /** Inner container min-height from `md` and up (CSS length/expression). */
  innerMinHeightMd?: string
  /** Non-wide layer width from `md` and up (CSS length/expression). */
  desktopLayerWidth?: string
  /** Front image max-height on mobile (CSS length/expression). */
  imageMaxHeight?: string
  /** Front image max-height from `md` and up (CSS length/expression). */
  imageMaxHeightMd?: string
}) {
  if (layers.length === 0) return null
  const topLayerZ = layers[layers.length - 1]?.z ?? 0

  const toMobileWidth = (value: number | string): string => {
    if (typeof value === 'number' && Number.isFinite(value)) return `${value}%`
    if (typeof value === 'string' && value.trim() !== '') return value
    return '86%'
  }

  const toMobileMaxWidth = (value?: string): string => {
    if (typeof value === 'string' && value.trim() !== '') return value
    return 'min(560px, 92vw)'
  }

  const toMobileScale = (value?: number): string => {
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) return String(value)
    return '1'
  }

  const toCssExpression = (value: unknown, fallback: string): string => {
    if (typeof value === 'string' && value.trim() !== '') return value.trim()
    return fallback
  }

  const rootStyle = {
    '--hero-stack-root-max-w': toCssExpression(rootMaxWidth, 'min(100%, 580px)'),
    '--hero-stack-root-min-h': toCssExpression(rootMinHeight, 'min(52vh, 520px)'),
    '--hero-stack-root-max-w-md': toCssExpression(rootMaxWidthMd, 'min(100%, 580px)'),
    '--hero-stack-root-min-h-md': toCssExpression(rootMinHeightMd, 'min(58vh, 640px)'),
    '--hero-stack-inner-min-h': toCssExpression(innerMinHeight, 'min(52vh, 520px)'),
    '--hero-stack-inner-min-h-md': toCssExpression(innerMinHeightMd, 'min(58vh, 640px)'),
    '--hero-stack-layer-width-md': toCssExpression(desktopLayerWidth, '90%'),
    '--hero-stack-img-max-h': toCssExpression(imageMaxHeight, 'min(88vh, 920px)'),
    '--hero-stack-img-max-h-md': toCssExpression(imageMaxHeightMd, 'min(92vh, 960px)'),
  } as CSSProperties

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[var(--hero-stack-root-max-w)] min-h-[var(--hero-stack-root-min-h)] items-end justify-center overflow-visible md:h-full md:max-h-none md:max-w-[var(--hero-stack-root-max-w-md)] md:min-h-[var(--hero-stack-root-min-h-md)]',
        className,
      )}
      style={rootStyle}
    >
      <div className="pointer-events-none relative min-h-[var(--hero-stack-inner-min-h)] w-full md:min-h-[var(--hero-stack-inner-min-h-md)]">
        {layers.map((layer) => {
          const isFrontLayer = !layer.wide && layer.z >= 2
          const isTopLayer = layer.z === topLayerZ
          const imageDimensions = getLayerDimensions(layer)
          const mobileLayerWidth = isFrontLayer ? frontMobileWidthPercent : 86
          const mobileLayerMaxWidth = isFrontLayer
            ? toMobileMaxWidth(frontMobileMaxWidth)
            : 'min(560px, 92vw)'
          const frontMobileOffsetExpr = isFrontLayer
            ? ' + var(--hero-stack-front-mobile-offset, 0px)'
            : ''

          return layer.wide ? (
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
                  sizes="(max-width: 768px) 96vw, (max-width: 1280px) 50vw, 820px"
                  priority={isTopLayer}
                  fetchPriority={isTopLayer ? 'high' : undefined}
                  loading={isTopLayer ? undefined : 'lazy'}
                />
              </div>
            </div>
          ) : (
            <div
              key={`${layer.z}-${layer.src}`}
              className="absolute bottom-[2%] left-1/2 flex w-[var(--hero-stack-mobile-layer-width)] max-w-[var(--hero-stack-mobile-layer-max-width)] justify-center md:bottom-[0%] md:w-[var(--hero-stack-layer-width-md)]"
              style={
                {
                  zIndex: 10 + layer.z,
                  transform: `translate(calc(-50% + ${layer.offsetX}px), calc(${layer.offsetY}px + var(--hero-stack-base-y, clamp(1rem, 6vh, 4.5rem)) - var(--hero-stack-lift, 0px)${frontMobileOffsetExpr}))`,
                  '--hero-stack-mobile-layer-width': toMobileWidth(mobileLayerWidth),
                  '--hero-stack-mobile-layer-max-width': mobileLayerMaxWidth,
                  '--hero-stack-front-mobile-scale': isFrontLayer
                    ? toMobileScale(frontMobileImageScale)
                    : '1',
                } as CSSProperties
              }
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
                <div className={cn(isFrontLayer && 'hero-stack-front-mobile-scale')}>
                  <Image
                    src={layer.src}
                    alt=""
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    className="h-auto max-h-[var(--hero-stack-img-max-h)] w-full object-contain object-bottom md:max-h-[var(--hero-stack-img-max-h-md)] md:translate-y-[calc(var(--hero-stack-img-base-y,clamp(1rem,6vh,4rem))-var(--hero-stack-lift,0px))] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 48vw, 780px"
                    priority={isTopLayer}
                    fetchPriority={isTopLayer ? 'high' : undefined}
                    loading={isTopLayer ? undefined : 'lazy'}
                    style={{
                      aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
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

        .hero-stack-front-mobile-scale {
          transform: scale(var(--hero-stack-front-mobile-scale, 1));
          transform-origin: center bottom;
        }

        @media (min-width: 768px) {
          .hero-stack-front-mobile-scale {
            transform: none;
          }
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

        @media (max-width: 767px) {
          .hero-stack-float-back,
          .hero-stack-float-mid,
          .hero-stack-float-front {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  )
}
