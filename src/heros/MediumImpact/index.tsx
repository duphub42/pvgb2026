import React from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { buildHeroCopyFadeStyle, getScrambleRevealDurationMs } from '@/heros/scrambleTiming'

type MediumImpactHeroData = {
  links?: SitePage['hero'] extends infer H ? (H extends { links?: infer L } ? L : never) : never
  media?: SitePage['hero'] extends infer H ? (H extends { media?: infer M } ? M : never) : never
  richText?: SitePage['hero'] extends infer H
    ? H extends { richText?: infer R }
      ? R
      : never
    : never
  subheadline?: string | null
  headline?: string | null
  description?: string | null
  marqueeHeadline?: string | null
  marqueeLogos?: SitePage['hero'] extends infer H
    ? H extends { marqueeLogos?: infer M }
      ? M
      : never
    : never
}

export const MediumImpactHero: React.FC<MediumImpactHeroData> = ({
  links,
  media,
  richText,
  subheadline,
  headline,
  description,
}) => {
  const hasHeadings = subheadline || headline || description
  const headlineRevealMs = getScrambleRevealDurationMs(headline)
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  return (
    <div className="bg-background text-foreground">
      <div className="container hero-safe-top mb-8">
        {hasHeadings && (
          <div className="mb-6">
            {subheadline && (
              <p
                className="mb-2 text-lg text-foreground/90 hero-blurry-fade-in hero-blurry-fade-in--subheading"
                style={subheadlineFadeStyle}
              >
                {subheadline}
              </p>
            )}
            {headline && (
              <h1 className="text-hero-display hero-heading-gradient text-foreground mb-4">
                <ScrambleText text={headline} />
              </h1>
            )}
            {description && (
              <p
                className="text-base text-foreground/90 hero-blurry-fade-in hero-blurry-fade-in--description"
                style={descriptionFadeStyle}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {richText && (
          <div className="prose prose-neutral dark:prose-invert mb-6">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3 prose prose-neutral dark:prose-invert">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
