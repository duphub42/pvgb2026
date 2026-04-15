'use client'

import { CMSLink } from '@/components/Link'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React from 'react'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import type { HeroBackground } from '@/payload-types'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { buildHeroCopyFadeStyle, getScrambleLinesRevealDurationMs } from '@/heros/scrambleTiming'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CMSLinkProps = React.ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type' | 'reference'>
}

type MediaRef = number | { id?: number | null; url?: string | null; alt?: string | null } | null

export interface SimpleHeroProps {
  // ─── Copy ──────────────────────────────────────────────────────────────────
  label?: string | null
  headline?: string | null
  description?: string | null
  links?: LinkItem[] | null

  // ─── Media ─────────────────────────────────────────────────────────────────
  portrait?: MediaRef
  backgroundGlow?: boolean

  // ─── Background ───────────────────────────────────────────────────────────
  backgroundPreset?: HeroBackground | number | null

  // ─── Marquee ───────────────────────────────────────────────────────────────
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null

  // ─── Meta ─────────────────────────────────────────────────────────────────
  sectionAriaLabel?: string | null
}

// ---------------------------------------------------------------------------
// Simple Hero Component
// ---------------------------------------------------------------------------

export const SimpleHero: React.FC<SimpleHeroProps> = ({
  label,
  headline,
  description,
  links,
  portrait,
  backgroundGlow = true,
  backgroundPreset: _backgroundPreset,
  marqueeHeadline,
  marqueeLogos,
  sectionAriaLabel,
}) => {
  const [isClient, setIsClient] = React.useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const _isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
  const _isDesktop = useMediaQuery('(min-width: 1025px)')

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const portraitSrc = resolveHeroImageSrc(portrait)

  // Animation timing for text elements
  const headlineLines: string[] = headline ? headline.split('\n').filter(Boolean) : []
  const headlineRevealMs = getScrambleLinesRevealDurationMs(
    headlineLines.map((line, i) => ({ text: line, delayMs: i * 120 })),
  )
  const labelFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  const ctaLinks = (links ?? []).filter((e) => Boolean(e?.link?.label)).slice(0, 2)

  return (
    <section
      aria-label={sectionAriaLabel ?? 'Hero'}
      className={cn(
        'relative overflow-hidden bg-background text-foreground',
        'min-h-[100vh] flex items-center',
      )}
    >
      {/* Background Glow Effect */}
      {backgroundGlow && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] transform -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] transform -translate-y-1/2" />
        </div>
      )}

      <div className="relative z-[2] container w-full px-4 py-16 md:py-24">
        {/* Two Column Layout */}
        <div className="grid min-w-0 gap-8 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 max-w-2xl order-2 lg:order-1">
            {/* Label */}
            {label && isClient && (
              <Badge
                variant="secondary"
                className="w-fit px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] opacity-0"
                style={labelFadeStyle}
              >
                {label}
              </Badge>
            )}

            {/* Headline */}
            {headlineLines.length > 0 && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    <ScrambleText text={line} delayMs={i * 120} disableAnimation={isMobile} />
                  </span>
                ))}
              </h1>
            )}

            {/* Description */}
            {description && isClient && (
              <p
                className="text-lg md:text-xl leading-relaxed text-muted-foreground opacity-0"
                style={descriptionFadeStyle}
              >
                {description}
              </p>
            )}

            {/* CTA Links */}
            {ctaLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {ctaLinks.map((item, index) => (
                  <CMSLink
                    key={`${item?.link?.label ?? 'cta'}-${index}`}
                    type={item?.link?.type}
                    url={item?.link?.url}
                    reference={item?.link?.reference}
                    label={item?.link?.label}
                    newTab={item?.link?.newTab}
                    appearance={item?.link?.appearance ?? (index === 0 ? 'default' : 'outline')}
                    className="rounded-lg px-6 py-3"
                  />
                ))}
              </div>
            )}

            {/* Marquee Section */}
            {(marqueeHeadline || marqueeLogos) && (
              <div className="pt-8 border-t border-border/60">
                <HeroLogoMarquee marqueeHeadline={marqueeHeadline} marqueeLogos={marqueeLogos} />
              </div>
            )}
          </div>

          {/* Right Column - Portrait */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Mobile: Portrait overlaps glassbox */}
              {isClient && isMobile && (
                <div className="relative">
                  {/* Glassbox background for mobile */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-md rounded-3xl border border-border/20 -z-10" />

                  {/* Portrait positioned to overlay */}
                  <div className="relative z-10 transform translate-y-8">
                    {portraitSrc ? (
                      <div className="relative aspect-[4/5] w-full max-w-sm mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl" />
                        <Image
                          src={portraitSrc}
                          alt="Portrait"
                          fill
                          className="object-cover rounded-3xl"
                          priority
                          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/5] w-full max-w-sm mx-auto bg-muted/50 rounded-3xl flex items-center justify-center text-center text-sm text-muted-foreground p-6">
                        Kein Portrait gesetzt
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tablet & Desktop: Full height portrait */}
              {isClient && !isMobile && (
                <div className="relative h-[85vh] max-h-[700px]">
                  {portraitSrc ? (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl blur-2xl" />
                      <div className="relative w-full h-full rounded-3xl overflow-hidden">
                        <Image
                          src={portraitSrc}
                          alt="Portrait"
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted/50 rounded-3xl flex items-center justify-center text-center text-sm text-muted-foreground p-6">
                      Kein Portrait gesetzt
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
