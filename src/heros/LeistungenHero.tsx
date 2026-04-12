import type { ComponentProps, FC } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { buildHeroCopyFadeStyle, getScrambleRevealDurationMs } from '@/heros/scrambleTiming'
import type { Media as PayloadMedia } from '@/payload-types'

type CMSLinkProps = ComponentProps<typeof CMSLink>

export type LeistungenHeroProps = {
  headline: string
  subheadline?: string
  description?: string
  badge?: string
  stats?: { value: string; label: string }[]
  links?: Array<{ link?: CMSLinkProps | null }>
  media?: PayloadMedia | number | null
}

export const LeistungenHero: FC<LeistungenHeroProps> = ({
  headline,
  subheadline,
  description,
  badge,
  stats,
  links,
  media,
}) => {
  const headlineRevealMs = getScrambleRevealDurationMs(headline)
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)
  const badgeText = subheadline?.trim() || badge?.trim()

  return (
    <section className="leistungen-hero relative isolate flex items-end overflow-hidden text-foreground">
      <div className="leistungen-hero-base pointer-events-none absolute inset-0 z-0" aria-hidden />

      {media && typeof media === 'object' && 'url' in media && (
        <div className="absolute inset-0 z-10 select-none pointer-events-none">
          <Media
            fill
            imgClassName="leistungen-hero-media-image object-cover"
            priority
            resource={media}
          />
        </div>
      )}

      <div className="leistungen-hero-overlay pointer-events-none absolute inset-0 z-20" aria-hidden />
      <div className="leistungen-hero-edge-vignette pointer-events-none absolute inset-0 z-20" aria-hidden />

      <div className="container relative z-30 w-full px-4">
        <div className="mr-auto flex w-full max-w-[56rem] flex-col items-start pt-2 text-left md:pt-3">
          {badgeText && (
            <span
              className="order-1 leistungen-hero-badge mb-4 inline-flex hero-blurry-fade-in hero-blurry-fade-in--subheading"
              style={subheadlineFadeStyle}
            >
              {badgeText}
            </span>
          )}

          {headline && (
            <h1 className="order-2 mb-4 text-hero-display hero-heading-gradient hero-headline">
              <ScrambleText text={headline} />
            </h1>
          )}

          {description && (
            <p
              className="order-3 mb-6 mr-auto max-w-[62ch] text-base hero-content-contrast md:text-lg hero-blurry-fade-in hero-blurry-fade-in--description"
              style={descriptionFadeStyle}
            >
              {description}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="order-4 mb-6 flex flex-wrap justify-start gap-4">
              {links.map((item, i) => {
                if (!item || !item.link) return null
                return (
                  <li key={`hero-link-${i}`}>
                    <CMSLink {...item.link} />
                  </li>
                )
              })}
            </ul>
          )}

          {Array.isArray(stats) && stats.length > 0 && (
            <div className="order-5 mb-1 flex flex-wrap justify-start gap-x-6 gap-y-4 md:gap-x-8">
              {stats.map((stat, i) => (
                <div
                  key={`hero-stat-${stat.label ?? stat.value ?? i}-${i}`}
                  className="flex flex-col items-start"
                >
                  <span className="text-2xl font-semibold text-primary md:text-3xl">{stat.value}</span>
                  <span className="text-xs uppercase tracking-[0.16em] hero-subheading-contrast">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="leistungen-hero-footer-fade pointer-events-none absolute inset-x-0 bottom-0 z-20" aria-hidden />
    </section>
  )
}
