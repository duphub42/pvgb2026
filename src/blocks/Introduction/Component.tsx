'use client'

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Code2,
  DraftingCompass,
  Fingerprint,
  Gauge,
  Plug,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import type {
  IntroductionBlock as IntroductionBlockData,
  Media as MediaType,
} from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { BlockContainer } from '@/components/BlockContainer'
import { getBlockBackgroundImageStyle } from '@/utilities/getBlockBackgroundImageStyle'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { translateValueForLocale } from '@/i18n/translationOverlay'

type IntroductionProps = IntroductionBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

const wordpressAgencyBuilderIcons = [
  { name: 'Bricks', src: '/wordpress-builders/bricks.svg', className: 'left-[7%] top-[18%]' },
  {
    name: 'Elementor',
    src: '/wordpress-builders/elementor.svg',
    className: 'right-[8%] top-[14%]',
  },
  { name: 'Oxygen', src: '/wordpress-builders/oxygen.svg', className: 'left-[2%] bottom-[27%]' },
  {
    name: 'Gutenberg',
    src: '/wordpress-builders/gutenberg.svg',
    className: 'right-[4%] bottom-[25%]',
  },
]

const wordpressAgencyServiceIcons: Array<{
  label: string
  Icon: LucideIcon
  className: string
}> = [
  { label: 'Plugins', Icon: Plug, className: 'left-[28%] top-[5%]' },
  { label: 'WooCommerce', Icon: ShoppingCart, className: 'right-[30%] top-[4%]' },
  { label: 'Wartung', Icon: Wrench, className: 'left-[26%] bottom-[7%]' },
  { label: 'Sicherheit', Icon: ShieldCheck, className: 'right-[28%] bottom-[7%]' },
  { label: 'Performance', Icon: Gauge, className: 'left-1/2 top-[15%] -translate-x-1/2' },
  { label: 'Code', Icon: Code2, className: 'left-1/2 bottom-[16%] -translate-x-1/2' },
]

function WordPressAgencyOrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div
        className="pointer-events-none absolute inset-[7%] rounded-full border border-border/70 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--foreground)_6%,transparent),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[20%] rounded-full border border-dashed border-border/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-[32%] rounded-full bg-card shadow-[0_22px_70px_-45px_rgba(0,0,0,0.65)]"
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-1/2 z-20 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-[0_18px_54px_-34px_rgba(0,0,0,0.72)] md:size-36">
        <Image
          src="/webdesign-platforms/wordpress.svg"
          alt="WordPress Logo"
          width={76}
          height={76}
          unoptimized
          className="size-20 object-contain dark:invert"
        />
      </div>

      {wordpressAgencyBuilderIcons.map((item) => (
        <div
          key={item.name}
          className={cn(
            'absolute z-10 flex size-16 items-center justify-center rounded-2xl border border-border/70 bg-background/92 shadow-[0_16px_44px_-34px_rgba(0,0,0,0.62)] backdrop-blur-sm md:size-[4.5rem]',
            item.className,
          )}
          aria-label={item.name}
        >
          <Image
            src={item.src}
            alt=""
            width={42}
            height={42}
            unoptimized
            className="size-9 object-contain opacity-80 grayscale dark:invert md:size-10"
          />
        </div>
      ))}

      {wordpressAgencyServiceIcons.map(({ label, Icon, className }) => (
        <div
          key={label}
          className={cn(
            'absolute z-10 flex size-12 items-center justify-center rounded-full border border-border/70 bg-card/92 text-foreground shadow-[0_14px_36px_-30px_rgba(0,0,0,0.58)] backdrop-blur-sm md:size-14',
            className,
          )}
          aria-label={label}
        >
          <Icon className="size-5 md:size-6" strokeWidth={2.1} />
        </div>
      ))}
    </div>
  )
}

function resolveThumbnailStreamSrc(media: unknown): string | null {
  if (typeof media === 'object' && media !== null) {
    const record = media as Record<string, unknown>
    const idRaw = record.id ?? record._id ?? record.documentId ?? record.mediaId

    if (typeof idRaw === 'number' && idRaw > 0) return `/api/media/stream/${idRaw}?size=thumbnail`
    if (typeof idRaw === 'string' && /^\d+$/.test(idRaw)) {
      return `/api/media/stream/${idRaw}?size=thumbnail`
    }
  }

  const src = resolveHeroImageSrc(media)
  if (!src?.startsWith('/api/media/stream/')) return src

  const [path, query = ''] = src.split('?')
  const params = new URLSearchParams(query)
  params.set('size', 'thumbnail')

  return `${path}?${params.toString()}`
}

export const IntroductionBlock: React.FC<IntroductionProps> = (props) => {
  const pathname = usePathname()
  const isEnglish = (pathname || '').startsWith('/en')
  const {
    disableInnerContainer: _disableInnerContainer,
    heading,
    body,
    tagline,
    image,
    useLottie,
    lottieLight,
    lottieDark,
    imageDarkModeInvert = true,
    imageOpacity,
    index = 0,
    ...styleProps
  } = props
  const localizedHeading = isEnglish ? translateValueForLocale(heading, 'en') : heading
  const localizedBody = isEnglish ? translateValueForLocale(body, 'en') : body
  const localizedTagline = isEnglish ? translateValueForLocale(tagline, 'en') : tagline

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles
  const hasImage = image != null && typeof image === 'object'
  const showLottie = useLottie && (lottieLight || lottieDark)
  const hasMedia = hasImage || showLottie
  const isHomeIntro =
    typeof localizedHeading === 'string' &&
    localizedHeading.trim() === 'Web Design, Online Marketing & Automation in Halle (Saale)'
  const useImageAsTopRightBackground = isHomeIntro && hasImage && !showLottie
  const backgroundImageSrc = useImageAsTopRightBackground ? resolveThumbnailStreamSrc(image) : null
  const hasInlineMedia = hasMedia && !useImageAsTopRightBackground
  const reserveMediaColumn = hasInlineMedia || useImageAsTopRightBackground
  const forceDarkModeInvertForWebdesignIntro =
    heading?.trim() === 'Webdesign, das aus Besuchern Kunden macht' ||
    localizedHeading?.trim() === 'Web Design That Turns Visitors Into Customers'
  const imageInvertClass = !showLottie
    ? forceDarkModeInvertForWebdesignIntro
      ? 'invert-0 dark:invert'
      : imageDarkModeInvert
        ? 'invert dark:invert-0'
        : undefined
    : undefined
  const normalizedImageOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(Number(imageOpacity)) ? Number(imageOpacity) / 100 : 1),
  )

  const taglineLines =
    typeof localizedTagline === 'string' && localizedTagline.trim()
      ? localizedTagline.split('\n').filter((l) => l.trim())
      : []
  const isLeistungenHubIntro =
    heading?.trim() === 'Ein Hub für alle Leistungen' ||
    heading?.trim() === 'Ein Hub für alle Services' ||
    localizedHeading?.trim() === 'One Hub for All Services'
  const isPortfolioMarketingIntro =
    heading?.trim() === 'Marketing-Cases mit nachvollziehbarer Wirkung' ||
    localizedHeading?.trim() === 'Marketing Cases With Traceable Impact'
  const isWordPressAgencyStabilityIntro =
    heading?.trim() === 'Weniger Wartungsaufwand. Mehr WordPress-Stabilität.' ||
    localizedHeading?.trim() === 'Less Maintenance Effort. More WordPress Stability.'

  const hubCards = translateValueForLocale(
    [
      {
        title: 'Design & Website',
        description: 'Webdesign, Printmedien und Präsentationen für einen starken Auftritt.',
        Icon: DraftingCompass,
      },
      {
        title: 'Marketing & Sichtbarkeit',
        description: 'SEO, SEM und Content Creation für Reichweite und Anfragen.',
        Icon: BarChart3,
      },
      {
        title: 'Branding & Identity',
        description: 'CI, Logo-Entwicklung und Markenstrategie für klare Wiedererkennung.',
        Icon: Fingerprint,
      },
    ],
    isEnglish ? 'en' : 'de',
  )

  const introGrid = (
    <div
      className={cn(
        'grid items-center gap-10',
        isWordPressAgencyStabilityIntro
          ? 'lg:grid-cols-[minmax(0,0.88fr)_minmax(18rem,0.78fr)] lg:gap-14'
          : reserveMediaColumn
            ? 'md:grid-cols-[minmax(0,1fr)_minmax(14rem,min(31dvw,34rem))] xl:min-h-[clamp(20rem,32vw,30rem)]'
            : 'max-w-3xl',
        reserveMediaColumn && 'sm:px-0 px-0',
      )}
    >
      <div className={cn('min-w-0', hasImage && !useImageAsTopRightBackground && 'xl:max-w-3xl')}>
        {localizedHeading && (
          <h2
            className={cn(
              'mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl',
              useImageAsTopRightBackground && 'max-md:max-w-2/3',
            )}
          >
            {localizedHeading}
          </h2>
        )}

        {localizedBody && (
          <p className="mb-6 max-w-prose whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
            {localizedBody}
          </p>
        )}

        {taglineLines.length > 0 && (
          <div className="border-l-2 border-primary pl-4">
            {taglineLines.map((line, i) => (
              <p
                key={i}
                className={cn(
                  'text-sm font-medium leading-relaxed text-foreground/80 md:text-base',
                  i < taglineLines.length - 1 && 'mb-1',
                )}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      {hasInlineMedia && (
        <div
          className={cn(
            'relative isolate w-full',
            'sm:mx-0 sm:max-w-none',
            'mx-auto max-w-sm lg:mx-0 lg:max-w-[34rem] lg:justify-self-end',
            'xl:mx-0 xl:w-[38rem] xl:max-w-none',
          )}
        >
          <div style={!showLottie ? { opacity: normalizedImageOpacity } : undefined}>
            <Media
              className="w-full"
              resource={showLottie ? undefined : (image as MediaType)}
              themeResource={showLottie ? { light: lottieLight, dark: lottieDark } : undefined}
              quality={60}
              size="(max-width: 480px) 92vw, (max-width: 768px) 380px, (max-width: 1280px) 42vw, 520px"
              imgClassName={cn(
                'w-full h-auto max-h-[750px] object-contain xl:max-h-[840px]',
                imageInvertClass,
              )}
            />
          </div>
        </div>
      )}

      {isWordPressAgencyStabilityIntro && !hasInlineMedia ? (
        <div className="relative isolate mt-2 w-full lg:mt-0 lg:justify-self-end">
          <WordPressAgencyOrbitVisual />
        </div>
      ) : null}
    </div>
  )

  if (isLeistungenHubIntro && !hasMedia) {
    return (
      <BlockContainer styles={styles} index={index}>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {hubCards.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="h-full rounded-xl border border-border/70 bg-card/90 p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-card-foreground md:text-base">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0 lg:justify-self-end lg:max-w-2xl">
            {heading && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}

            {body && (
              <p className="mb-6 max-w-prose whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
                {body}
              </p>
            )}

            {taglineLines.length > 0 && (
              <div className="border-l-2 border-primary pl-4">
                {taglineLines.map((line, i) => (
                  <p
                    key={i}
                    className={cn(
                      'text-sm font-medium leading-relaxed text-foreground/80 md:text-base',
                      i < taglineLines.length - 1 && 'mb-1',
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </BlockContainer>
    )
  }

  if (useImageAsTopRightBackground && backgroundImageSrc) {
    return (
      <section
        className="pt-[115px] pb-8 sm:pt-0 sm:pb-14 lg:pt-0 lg:pb-20"
        style={{ position: 'relative', isolation: 'isolate' }}
      >
        <div
          aria-hidden
          className="render-block-background-image render-block-background-image--top-right home-intro-maneki-background-image"
          style={getBlockBackgroundImageStyle(backgroundImageSrc, 'top-right')}
        />
        <div className="container relative z-10">{introGrid}</div>
      </section>
    )
  }

  return (
    <BlockContainer styles={styles} index={index}>
      {isPortfolioMarketingIntro ? (
        <div
          aria-hidden
          className="marketing-graphpaper-bg absolute left-1/2 top-0 z-0 w-screen -translate-x-1/2"
          style={{ height: 'calc(100% + 40rem)' }}
        />
      ) : null}
      {introGrid}
    </BlockContainer>
  )
}
