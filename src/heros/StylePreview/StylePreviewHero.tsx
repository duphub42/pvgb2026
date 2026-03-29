'use client'

import { CMSLink } from '@/components/Link'
import { getMediaUrlSafe } from '@/utils/media'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { type ComponentProps } from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { cn } from '@/utilities/ui'

type CMSLinkProps = ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type'>
}

interface StylePreviewHeroProps {
  subheadline?: string | null
  headline?: string | null
  headlineLine1?: string | null
  headlineLine2?: string | null
  headlineLine3?: string | null
  description?: string | null
  links?: LinkItem[] | null
  media?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null
}

const defaultSubheadline = 'Style Concept Test'
const defaultHeadline = 'Einheitlicher Look fuer die gesamte Seite'
const defaultDescription =
  'Dieser Hero ist bewusst isoliert, damit Typografie, Farben, Radius und CTA-Hierarchie getestet werden koennen, ohne bestehende Komponenten zu veraendern.'

/** Quelle: https://philippbacher.com/portfolio/ (Lazy-Load data-src / gleiche Assets) */
const PORTFOLIO_CLOUD_SRC =
  'https://philippbacher.com/wp-content/uploads/2026/02/powderparty.png'
const PORTFOLIO_SKI_SRC = 'https://philippbacher.com/wp-content/uploads/2026/02/skijump-1.png'

function resolveMediaSrc(media: StylePreviewHeroProps['media']): string | null {
  if (media == null) return null
  if (typeof media === 'number' && Number.isFinite(media)) return `/api/media/stream/${media}`
  if (typeof media === 'object' && media !== null && typeof media.id === 'number' && Number.isFinite(media.id)) {
    return `/api/media/stream/${media.id}`
  }
  const safe = getMediaUrlSafe(media)
  return safe || null
}

/** Asymmetrische Doppelwelle: Übergang Hero → Seiteninhalt (Füllung = Seitenhintergrund). */
function ProfilHeroShapeDivider() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-[30] w-full hero-shape-divider"
      style={{ height: 'calc(10vh + 36px)' }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 w-full text-background"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <path
          fill="currentColor"
          fillOpacity={0.22}
          d="M0,96 C120,52 280,118 420,78 C560,38 700,102 880,64 C1040,32 1220,88 1440,44 L1440,140 L0,140 Z"
        />
        <path
          fill="currentColor"
          fillOpacity={0.92}
          d="M0,108 C160,62 340,128 520,82 C720,34 900,96 1120,58 C1280,36 1380,72 1440,56 L1440,140 L0,140 Z"
        />
        <path
          fill="currentColor"
          d="M0,118 C200,78 380,132 580,88 C780,44 980,108 1200,70 C1320,52 1400,84 1440,74 L1440,140 L0,140 Z"
        />
      </svg>
    </div>
  )
}

function ProfilPortfolioHeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[min(100%,540px)] items-end justify-center md:h-full md:max-h-[min(74vh,680px)] md:min-h-[280px]">
      <div
        className="profil-hero-float-cloud pointer-events-none absolute -right-[6%] bottom-[8%] z-0 w-[108%] max-w-none opacity-95 md:-right-[4%] md:bottom-[10%] md:w-[102%]"
        aria-hidden
      >
        <Image
          src={PORTFOLIO_CLOUD_SRC}
          alt=""
          width={1005}
          height={438}
          className="h-auto w-full object-contain drop-shadow-sm"
          sizes="(max-width: 768px) 96vw, 540px"
          priority
        />
      </div>
      <div className="profil-hero-float-ski relative z-[2] w-[86%] md:w-[92%]">
        <Image
          src={PORTFOLIO_SKI_SRC}
          alt=""
          width={1024}
          height={958}
          className="h-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
          sizes="(max-width: 768px) 78vw, 500px"
          priority
        />
      </div>
    </div>
  )
}

export const StylePreviewHero: React.FC<StylePreviewHeroProps> = ({
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  media,
  marqueeHeadline,
  marqueeLogos,
}) => {
  const pathname = usePathname()
  const pathNorm = (pathname ?? '/').replace(/\/$/, '') || '/'
  const isProfilPage = pathNorm === '/profil'

  const lines = [headlineLine1, headlineLine2, headlineLine3].filter(
    (l): l is string => Boolean(l),
  )
  const resolvedHeadline = lines.length > 0 ? null : (headline || defaultHeadline)
  const ctaLinks = Array.isArray(links) ? links.filter((entry) => Boolean(entry?.link?.label)) : []
  const mediaUrl = resolveMediaSrc(media)
  const directMediaUrl = getMediaUrlSafe(media)
  const portraitSrc = mediaUrl || directMediaUrl

  return (
    <section
      aria-label={isProfilPage ? 'Profil Hero' : 'Style Preview Hero'}
      className={cn(
        'hero-offset relative overflow-visible text-foreground',
        isProfilPage ? 'profil-hero-paper' : 'bg-background',
      )}
      data-profil-hero={isProfilPage ? 'true' : undefined}
    >
      {!isProfilPage ? (
        <>
          <div className="hero-section-surface" aria-hidden />
          <div
            className={cn(
              'hero-background-overlay hero-background-overlay--style-preview-stack',
              portraitSrc && 'hero-background-overlay--style-preview-portrait',
            )}
            aria-hidden
          />
          <div className="hero-section-foreground-tint hero-section-foreground-tint--above-decor" aria-hidden />
        </>
      ) : null}
      <div className="relative z-[2] container flex w-full min-w-0 flex-col px-4 pt-8 pb-14 sm:pt-10 md:pt-6 md:pb-24 lg:pt-8 lg:pb-28 xl:pt-10">
        <div className="grid min-w-0 gap-0 md:grid-cols-[minmax(0,45%)_1fr] md:items-stretch md:gap-6 lg:gap-12 xl:gap-16">
          <div
            className={cn(
              'hero-mobile-glass relative min-w-0 space-y-5 max-md:z-[16] max-md:-mx-4 max-md:px-4 max-md:pt-8 max-md:pb-10 max-md:rounded-t-2xl',
              !isProfilPage && 'max-md:-mt-[min(40vw,13.5rem)]',
            )}
          >
            <div className="flex flex-col gap-1">
              <p className="inline-flex w-fit items-center rounded-full border border-border bg-card px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {subheadline || defaultSubheadline}
              </p>
              <h1 className="text-pretty text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {lines.length > 0
                  ? lines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))
                  : resolvedHeadline}
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description || defaultDescription}
            </p>

            {ctaLinks.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                {ctaLinks.slice(0, 2).map((item, index) => (
                  <CMSLink
                    key={`${item?.link?.label ?? 'cta'}-${index}`}
                    type={item?.link?.type}
                    url={item?.link?.url}
                    label={item?.link?.label}
                    newTab={item?.link?.newTab}
                    appearance={item?.link?.appearance || (index === 0 ? 'default' : 'outline')}
                    className="rounded-[var(--style-radius-l)]"
                  />
                ))}
              </div>
            ) : null}

            <HeroLogoMarquee
              marqueeHeadline={marqueeHeadline}
              marqueeLogos={marqueeLogos}
              className="mt-1 pt-3 border-t border-border/60"
            />
          </div>

          <div className="relative min-w-0 pt-0 order-first max-md:z-[6] max-md:mb-5 md:order-none md:mb-0 md:pl-4 md:h-full md:min-h-0">
            <div className="relative overflow-visible max-md:pb-6 md:h-full md:min-h-0 md:pb-0 md:flex md:items-end md:justify-center">
              {isProfilPage ? (
                <ProfilPortfolioHeroVisual />
              ) : portraitSrc ? (
                <div className="relative mx-auto w-full max-w-[min(100%,556px)] md:flex md:h-full md:max-h-full md:min-h-0 md:max-w-none md:items-end md:justify-center lg:origin-bottom lg:scale-[1.21]">
                  <PopoutPortrait imageSrc={portraitSrc} fillRowHeight />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                  Kein Hero-Bild gesetzt. Im Backend das Feld "Media / Hintergrundbild" befuellen.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isProfilPage ? <ProfilHeroShapeDivider /> : null}
    </section>
  )
}
