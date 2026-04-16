'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HighImpactHeroData = {
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

export const HighImpactHero: React.FC<HighImpactHeroData> = ({
  links,
  media,
  richText,
  subheadline,
  headline,
  description,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const headlineWords = headline ? headline.split(/\s+/).filter(Boolean) : []
  const hasHeadings = Boolean(subheadline || headline || description)

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-[80vh] items-center justify-center bg-muted text-foreground"
      data-theme="dark"
    >
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute inset-0">
          <Media fill imgClassName="object-cover brightness-[0.88]" priority resource={media} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.45),_rgba(0,0,0,0.15))]" />
        <div
          className="absolute inset-0 hero-premium-overlay pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 mb-8 flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {hasHeadings && (
            <div className="mb-6">
              {subheadline && (
                <p className="mb-2 text-lg hero-subheading-contrast--inverse">{subheadline}</p>
              )}
              {headline && (
                <h1 className="text-hero-display hero-heading-gradient hero-heading-gradient--inverse mb-4 hero-headline">
                  {headlineWords.map((word, index) => (
                    <span key={`${word}-${index}`} className="inline-block mr-2 last:mr-0">
                      {word}
                    </span>
                  ))}
                </h1>
              )}
              {description && (
                <p className="text-base hero-content-contrast--inverse">{description}</p>
              )}
            </div>
          )}
          {richText && (
            <div className="prose prose-invert mb-6 prose-p:opacity-90">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
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
