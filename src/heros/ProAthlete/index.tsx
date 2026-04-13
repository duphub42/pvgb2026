import type { ComponentProps, FC } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { ArrowRight, User } from 'lucide-react'
import { PopoutHeroStackVisual, type HeroStackResolvedLayer } from '@/heros/PopoutHeroStackVisual'
import { buildHeroCopyFadeStyle, getScrambleLinesRevealDurationMs } from '@/heros/scrambleTiming'
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

type ResolvedMediaAsset = {
  src: string | null
  width?: number
  height?: number
}

function toPositiveDimension(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return undefined
  return Math.round(value)
}

function resolveMediaAsset(ref: unknown): ResolvedMediaAsset {
  if (!ref) return { src: null }
  if (typeof ref === 'string') return { src: ref }
  if (typeof ref === 'object' && ref !== null) {
    const media = ref as { url?: string | null; width?: number | null; height?: number | null }
    return {
      src: media.url ?? null,
      width: toPositiveDimension(media.width),
      height: toPositiveDimension(media.height),
    }
  }
  return { src: null }
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
  const effectiveHeadlineLines =
    headlineLines.length > 0 ? headlineLines : ['Unleash the', 'Mountain', 'Within.']
  const headlineRevealMs = getScrambleLinesRevealDurationMs(
    effectiveHeadlineLines.map((line, index) => ({ text: line, delayMs: index * 120 })),
  )
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  const backgroundAsset = resolveMediaAsset(backgroundImage)
  const mediaAsset = resolveMediaAsset(media)
  const stackBackAsset = resolveMediaAsset(stackBackImage)
  const stackMidAsset = resolveMediaAsset(stackMidImage)
  const stackFrontAsset = resolveMediaAsset(stackFrontImage)
  const foregroundAsset = resolveMediaAsset(foregroundImage)

  const backgroundSrc = backgroundAsset.src ?? '/images/bg-profile.png'
  const customPatternCss = mediaAsset.src
  const stackBackSrc = stackBackAsset.src ?? backgroundSrc ?? '/images/powderparty.png'
  const stackMidSrc = stackMidAsset.src
  const athleteSrc = stackFrontAsset.src ?? foregroundAsset.src ?? '/images/skijump.png'
  const athleteDimensions = stackFrontAsset.src
    ? { width: stackFrontAsset.width, height: stackFrontAsset.height }
    : foregroundAsset.src
      ? { width: foregroundAsset.width, height: foregroundAsset.height }
      : {}

  const stackLayers: HeroStackResolvedLayer[] = [
    {
      src: stackBackSrc,
      offsetX: toPx(stackBackOffsetX),
      offsetY: toPx(stackBackOffsetY),
      z: 0,
      wide: true,
      width: stackBackAsset.width,
      height: stackBackAsset.height,
    },
    ...(stackMidSrc
      ? [
          {
            src: stackMidSrc,
            offsetX: toPx(stackMidOffsetX),
            offsetY: toPx(stackMidOffsetY),
            z: 1,
            width: stackMidAsset.width,
            height: stackMidAsset.height,
          },
        ]
      : []),
    {
      src: athleteSrc,
      offsetX: toPx(stackFrontOffsetX),
      offsetY: toPx(stackFrontOffsetY),
      z: 2,
      width: athleteDimensions.width,
      height: athleteDimensions.height,
    },
  ]

  const ctaLinks = (links ?? []).map((item) => item?.link).filter(Boolean) as CMSLinkProps[]

  const primaryLink = ctaLinks[0]
  const secondaryLink = ctaLinks[1]

  return (
    <section className="relative z-20 w-full overflow-visible bg-background min-h-[38rem] transition-colors duration-500 lg:h-[666px] lg:min-h-0 lg:max-h-[666px]">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover opacity-100 dark:opacity-40 transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 via-zinc-300/30 to-slate-400/50 dark:from-zinc-950/90 dark:via-zinc-900/80 dark:to-black/90 mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 pro-athlete-grid-mask opacity-65 dark:opacity-40 transition-opacity">
          <div
            className="absolute inset-0 pro-athlete-checker"
            style={{
              ...(customPatternCss ? { backgroundImage: customPatternCss } : {}),
              opacity: customPatternCss ? 0.36 : 1,
              mixBlendMode: 'normal',
            }}
          />
        </div>
      </div>

      <div className="relative z-30 mx-auto grid w-full max-w-[1200px] min-h-0 grid-cols-1 px-4 py-8 sm:py-10 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:px-4 lg:pt-24 lg:pb-0">
        <div className="relative z-30 order-2 flex flex-col justify-end py-6 sm:py-8 lg:order-1 lg:h-full lg:py-0">
          <div className="w-full max-w-xl">
            {badgeText ? (
              <Badge
                variant="secondary"
                className="mb-8 w-fit px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] hero-subheading-contrast shadow-md hero-blurry-fade-in hero-blurry-fade-in--subheading"
                style={subheadlineFadeStyle}
              >
                <User className="w-3 h-3 mr-2 hero-subheading-contrast" />
                {badgeText}
              </Badge>
            ) : null}

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] hero-heading-gradient mb-8 uppercase italic drop-shadow-sm">
              {headlineLines.length > 0 ? (
                headlineLines.map((line, index) => (
                  <span key={index}>
                    <ScrambleText text={line} delayMs={index * 120} />
                    {index !== headlineLines.length - 1 ? <br /> : null}
                  </span>
                ))
              ) : (
                <>
                  <ScrambleText text="Unleash the" />
                  <br />
                  <ScrambleText text="Mountain" delayMs={120} />
                  <br />
                  <ScrambleText text="Within." delayMs={240} />
                </>
              )}
            </h1>

            <p
              className="text-base lg:text-lg hero-content-contrast mb-10 leading-relaxed max-w-[42ch] font-medium hero-blurry-fade-in hero-blurry-fade-in--description"
              style={descriptionFadeStyle}
            >
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
                    <div className="text-[10px] hero-subheading-contrast uppercase tracking-[0.2em] mt-1 font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative order-1 z-[20] flex h-[50vh] max-h-[30rem] sm:h-[56vh] sm:max-h-[34rem] items-center justify-center overflow-visible md:z-[80] lg:order-2 lg:h-full lg:max-h-[666px] lg:items-end">
          <div className="w-full max-w-[clamp(22rem,96vw,46rem)] translate-y-8 sm:translate-y-10 md:translate-y-0 overflow-visible lg:translate-y-0 lg:scale-[1.5] lg:origin-center">
            <PopoutHeroStackVisual
              layers={stackLayers}
              frontMobileWidthPercent="120vw"
              frontMobileMaxWidth="120vw"
              frontMobileImageScale={1.22}
              className="relative z-0 [--hero-stack-base-y:clamp(7rem,22vh,12rem)] sm:[--hero-stack-base-y:clamp(7.5rem,18vh,12.5rem)] [--hero-stack-front-mobile-offset:0px] lg:[--hero-stack-lift:calc(var(--header-height)*0.5)] lg:[--hero-stack-base-y:32px] lg:[--hero-stack-img-base-y:28px]"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[36vh] z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 24%, color-mix(in srgb, var(--background) 28%, transparent) 52%, transparent 88%), linear-gradient(to top, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.16) 36%, transparent 80%)',
          }}
        />
      </div>
    </section>
  )
}
