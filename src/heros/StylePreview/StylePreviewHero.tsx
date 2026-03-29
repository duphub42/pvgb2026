'use client'

import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { type ComponentProps } from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'

type CMSLinkProps = ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<
    CMSLinkProps,
    'url' | 'label' | 'appearance' | 'newTab' | 'type' | 'reference'
  >
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
  /** Philipp-Bacher-Typ im CMS: Popout-Bild liegt hier statt in „Media“. */
  foregroundImage?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
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

/**
 * Mehrschichtige S-Wellen (sinusartige Kubiken), leicht phasenversetzt → Fächereffekt durch Überlagerung.
 * Füllung = Seitenhintergrund (--background über currentColor).
 */
function ProfilHeroShapeDivider() {
  const waves: { d: string; opacity: number; tx: number }[] = [
    {
      d: 'M-60,112 C140,58 340,138 540,86 C740,38 940,118 1260,68 L1260,200 L-60,200 Z',
      opacity: 0.1,
      tx: 0,
    },
    {
      d: 'M-40,104 C160,64 360,132 560,90 C760,48 960,112 1240,74 L1240,200 L-40,200 Z',
      opacity: 0.16,
      tx: 18,
    },
    {
      d: 'M-20,98 C180,52 380,128 580,84 C780,44 980,108 1220,70 L1220,200 L-20,200 Z',
      opacity: 0.22,
      tx: 36,
    },
    {
      d: 'M0,92 C200,48 400,124 600,80 C800,38 1000,104 1200,66 L1200,200 L0,200 Z',
      opacity: 0.3,
      tx: 54,
    },
    {
      d: 'M20,86 C220,56 420,118 620,76 C820,36 1020,98 1180,62 L1180,200 L20,200 Z',
      opacity: 0.4,
      tx: 72,
    },
    {
      d: 'M40,82 C240,50 440,114 640,72 C840,34 1040,94 1160,58 L1160,200 L40,200 Z',
      opacity: 0.55,
      tx: 90,
    },
    {
      d: 'M0,78 C240,42 480,108 720,68 C960,32 1080,88 1200,54 L1200,200 L0,200 Z',
      opacity: 0.92,
      tx: 0,
    },
  ]

  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-[30] w-full hero-shape-divider"
      style={{ height: 'calc(11vh + 44px)' }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 w-full text-background"
        viewBox="-80 0 1360 200"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        {waves.map((w, i) => (
          <path
            key={i}
            fill="currentColor"
            fillOpacity={w.opacity}
            transform={`translate(${w.tx} 0)`}
            d={w.d}
          />
        ))}
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
  foregroundImage,
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
  const portraitSrc =
    resolveHeroImageSrc(media) || resolveHeroImageSrc(foregroundImage)

  return (
    <section
      aria-label={isProfilPage ? 'Profil Hero' : 'Hero'}
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
                    reference={item?.link?.reference}
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
                  Kein Hero-Bild gesetzt. Im Backend „Media / Hintergrundbild“ (Style Preview) oder
                  „Vordergrund Bild“ (Philipp Bacher) befüllen.
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
