import React from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { HeroLogoMarquee } from '@/heros/HeroLogoMarquee'

type LowImpactHeroType = SitePage['hero'] & { children?: React.ReactNode }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  subheadline,
  headline,
  description,
  links,
  marqueeHeadline,
  marqueeLogos,
}) => {
  const hasHeadings = subheadline || headline || description

  return (
    <div className="bg-background text-foreground">
      <div className="container hero-safe-top">
        <div className="max-w-[48rem]">
          {hasHeadings && (
            <div className="mb-6">
              {subheadline && <p className="text-lg text-foreground/90 mb-2">{subheadline}</p>}
              {headline && (
                <h1 className="text-hero-display-sm hero-heading-gradient text-foreground mb-4">
                  {headline}
                </h1>
              )}
              {description && <p className="text-base text-foreground/90">{description}</p>}
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
          <HeroLogoMarquee
            marqueeHeadline={marqueeHeadline}
            marqueeLogos={marqueeLogos}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  )
}
