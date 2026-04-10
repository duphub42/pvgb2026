import React from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { buildHeroCopyFadeStyle, getScrambleRevealDurationMs } from '@/heros/scrambleTiming'

type LowImpactHeroType = SitePage['hero'] & { children?: React.ReactNode }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  subheadline,
  headline,
  description,
  links,
}) => {
  const hasHeadings = subheadline || headline || description
  const headlineRevealMs = getScrambleRevealDurationMs(headline)
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  return (
    <div className="bg-background text-foreground">
      <div className="container hero-safe-top">
        <div className="max-w-[48rem]">
          {hasHeadings && (
            <div className="mb-6">
              {subheadline && (
                <p
                  className="mb-2 text-lg hero-subheading-contrast hero-blurry-fade-in hero-blurry-fade-in--subheading"
                  style={subheadlineFadeStyle}
                >
                  {subheadline}
                </p>
              )}
              {headline && (
                <h1 className="mb-4 text-hero-display-sm hero-heading-gradient">
                  <ScrambleText text={headline} />
                </h1>
              )}
              {description && (
                <p
                  className="text-base hero-content-contrast hero-blurry-fade-in hero-blurry-fade-in--description"
                  style={descriptionFadeStyle}
                >
                  {description}
                </p>
              )}
            </div>
          )}
          {children ||
            (richText && (
              <div className="prose prose-neutral dark:prose-invert">
                <RichText data={richText} enableGutter={false} />
              </div>
            ))}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
