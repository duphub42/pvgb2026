import type { ComponentProps, FC } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'
import { ArrowRight, Zap } from 'lucide-react'
import { PopoutHeroStackVisual, type HeroStackResolvedLayer } from '@/heros/PopoutHeroStackVisual'
import type { SitePage } from '@/payload-types'

type HeroStat = {
  value?: string | null
  label?: string | null
}

type CMSLinkProps = ComponentProps<typeof CMSLink>

type ProAthleteHeroType = SitePage['hero'] & {
  badge?: string | null
  stats?: HeroStat[] | null
}

function resolveMediaSrc(ref: unknown): string | null {
  if (!ref) return null
  if (typeof ref === 'string') return ref
  if (typeof ref === 'object' && ref !== null) return (ref as { url?: string | null }).url ?? null
  return null
}

function toPx(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

export const ProAthleteHero: FC<ProAthleteHeroType> = ({
  badge,
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  media,
  backgroundImage,
  foregroundImage,
  stackBackImage,
  stackBackOffsetX,
  stackBackOffsetY,
  stackMidImage,
  stackMidOffsetX,
  stackMidOffsetY,
  stackFrontImage,
  stackFrontOffsetX,
  stackFrontOffsetY,
  stats,
}) => {
  const badgeText = badge || subheadline || undefined
  const headlineLines = headline
    ? headline.split('\n').filter(Boolean)
    : [headlineLine1, headlineLine2, headlineLine3].filter((line): line is string => Boolean(line))

  const backgroundSrc = resolveMediaSrc(backgroundImage) ?? '/images/bg-profile.png'
  const customPatternCss = resolveMediaSrc(media)
  const stackBackSrc = resolveMediaSrc(stackBackImage) ?? backgroundSrc ?? '/images/powderparty.png'
  const stackMidSrc = resolveMediaSrc(stackMidImage)
  const stackFrontSrc = resolveMediaSrc(stackFrontImage) ?? resolveMediaSrc(foregroundImage)
  const athleteSrc = stackFrontSrc ?? '/images/skijump.png'

  const stackLayers: HeroStackResolvedLayer[] = [
    {
      src: stackBackSrc,
      offsetX: toPx(stackBackOffsetX),
      offsetY: toPx(stackBackOffsetY),
      z: 0,
      wide: true,
    },
    ...(stackMidSrc
      ? [
          {
            src: stackMidSrc,
            offsetX: toPx(stackMidOffsetX),
            offsetY: toPx(stackMidOffsetY),
            z: 1,
          },
        ]
      : []),
    {
      src: athleteSrc,
      offsetX: toPx(stackFrontOffsetX),
      offsetY: toPx(stackFrontOffsetY),
      z: 2,
    },
  ]

  const ctaLinks = (links ?? []).map((item) => item?.link).filter(Boolean) as CMSLinkProps[]

  const primaryLink = ctaLinks[0]
  const secondaryLink = ctaLinks[1]

  return (
    <section className="relative w-full overflow-hidden bg-background min-h-screen lg:min-h-0 lg:max-h-[666px] flex flex-col transition-colors duration-500">
      <style jsx>{`
        @keyframes pro-athlete-speed-shift {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.18;
          }
          50% {
            transform: translate3d(22px, -22px, 0);
            opacity: 0.26;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.18;
          }
        }

        .grid-mask {
          mask-image: linear-gradient(to bottom, black 8%, rgba(0, 0, 0, 0.85) 62%, transparent 100%);
          -webkit-mask-image: linear-gradient(
            to bottom,
            black 8%,
            rgba(0, 0, 0, 0.85) 62%,
            transparent 100%
          );
        }
        .pro-athlete-checker {
          background-image:
            linear-gradient(45deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255, 255, 255, 0.06) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.06) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.06) 75%);
          background-size: 150px 150px;
          background-position:
            0 0,
            0 75px,
            75px -75px,
            -75px 0;
        }
        .pro-athlete-speed-lines {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.12) 0,
            rgba(255, 255, 255, 0.12) 2px,
            transparent 2px,
            transparent 36px
          );
          animation: pro-athlete-speed-shift 6.8s cubic-bezier(0.33, 1, 0.68, 1) infinite;
          mix-blend-mode: soft-light;
        }
        [data-theme='light'] .pro-athlete-checker {
          background-image:
            linear-gradient(45deg, rgba(15, 15, 15, 0.07) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(15, 15, 15, 0.07) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(15, 15, 15, 0.07) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(15, 15, 15, 0.07) 75%);
        }
        [data-theme='light'] .pro-athlete-speed-lines {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(10, 10, 10, 0.08) 0,
            rgba(10, 10, 10, 0.08) 2px,
            transparent 2px,
            transparent 36px
          );
          mix-blend-mode: multiply;
        }
        @media (prefers-reduced-motion: reduce) {
          .pro-athlete-speed-lines {
            animation: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover opacity-100 dark:opacity-40 transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 via-zinc-300/30 to-slate-400/50 dark:from-zinc-950/90 dark:via-zinc-900/80 dark:to-black/90 mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 grid-mask opacity-65 dark:opacity-40 transition-opacity">
          <div
            className="absolute inset-0 pro-athlete-checker"
            style={{
              ...(customPatternCss ? { backgroundImage: customPatternCss } : {}),
              opacity: customPatternCss ? 0.36 : 1,
              mixBlendMode: 'normal',
            }}
          />
          <div className="absolute inset-0 pro-athlete-speed-lines" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto px-4 lg:px-8 py-16 min-h-screen lg:min-h-0 lg:h-full">
        <div className="relative z-30 order-2 lg:order-1 w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 lg:px-10 lg:py-16">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-xl bg-white/20 dark:bg-zinc-950/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/25 dark:border-white/20 shadow-2xl p-6 lg:p-8 rounded-2xl">
              {badgeText ? (
                <Badge
                  variant="outline"
                  className="w-fit font-mono text-[10px] tracking-[0.2em] uppercase border-zinc-500 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 mb-8 bg-white/90 dark:bg-zinc-800/90 shadow-md"
                >
                  <Zap className="w-3 h-3 mr-2 text-zinc-500 fill-zinc-500" />
                  {badgeText}
                </Badge>
              ) : null}

              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-foreground mb-8 uppercase italic drop-shadow-sm">
                {headlineLines.length > 0 ? (
                  headlineLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index !== headlineLines.length - 1 ? <br /> : null}
                    </span>
                  ))
                ) : (
                  <>
                    Unleash the
                    <br />
                    Mountain
                    <br />
                    Within.
                  </>
                )}
              </h1>

              <p className="text-base lg:text-lg text-zinc-900 dark:text-zinc-100 mb-10 leading-relaxed max-w-[42ch] font-medium">
                {description ||
                  'Engineered for elite performance at altitude. Our pro-grade gear system fuses cutting-edge materials science with biomechanical precision.'}
              </p>

              <div className="flex flex-wrap items-center gap-5 mb-12">
                {primaryLink ? (
                  <CMSLink
                    {...primaryLink}
                    appearance="default"
                    className="h-14 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center group shadow-xl"
                  >
                    {primaryLink.label}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </CMSLink>
                ) : null}
                {secondaryLink ? (
                  <CMSLink
                    {...secondaryLink}
                    appearance="link"
                    className="text-foreground font-bold underline decoration-zinc-500 dark:decoration-zinc-500 underline-offset-8 decoration-2 hover:decoration-foreground transition-all"
                  >
                    {secondaryLink.label}
                  </CMSLink>
                ) : null}
              </div>

              {stats && stats.length > 0 ? (
                <div className="flex flex-wrap gap-10 pt-8 border-t border-zinc-900/20 dark:border-white/20">
                  {stats.map((stat, index) => (
                    <div key={`${stat.label || index}-${index}`}>
                      <div className="font-mono text-2xl font-bold text-foreground italic tracking-tighter">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] mt-1 font-bold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative z-50 order-1 lg:order-2 w-full lg:w-1/2 h-[65vh] lg:h-[70vh] max-h-[666px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center overflow-visible -translate-y-6">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full max-w-[560px] lg:scale-[1.5] lg:origin-center">
                  <PopoutHeroStackVisual layers={stackLayers} className="relative z-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[30vh] z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to top, var(--background), rgba(255,255,255,0.08) 40%, transparent 85%), linear-gradient(to top, rgba(0,0,0,0.55), transparent 70%)',
          }}
        />
      </div>
    </section>
  )
}
