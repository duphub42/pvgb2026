import React from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

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

  return (
    <div className="bg-background text-foreground">
      <div className="container hero-safe-top">
        <div className="max-w-[48rem]">
          {hasHeadings && (
            <div className="mb-6">
              {subheadline && (
                <p className="mb-2 text-lg hero-subheading-contrast">{subheadline}</p>
              )}
              {headline && (
                <h1 className="mb-4 text-hero-display-sm hero-heading-gradient">{headline}</h1>
              )}
              {description && <p className="text-base hero-content-contrast">{description}</p>}
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
                  <CMSLink {...link} enableIconSwap={link?.enableIconSwap ?? true} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
