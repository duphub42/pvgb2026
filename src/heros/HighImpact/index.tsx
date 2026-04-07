'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { buildHeroCopyFadeStyle, getScrambleRevealDurationMs } from '@/heros/scrambleTiming'

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

  const hasHeadings = subheadline || headline || description
  const headlineRevealMs = getScrambleRevealDurationMs(headline)
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-[80vh] items-center justify-center bg-neutral-900 text-white"
      data-theme="dark"
    >
      <div className="container relative z-10 mb-8 flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {hasHeadings && (
            <div className="mb-6">
              {subheadline && (
                <p
                  className="mb-2 text-lg opacity-90 hero-blurry-fade-in hero-blurry-fade-in--subheading"
                  style={subheadlineFadeStyle}
                >
                  {subheadline}
                </p>
              )}
              {headline && (
                <h1 className="text-hero-display hero-heading-gradient hero-heading-gradient--inverse mb-4">
                  <ScrambleText text={headline} />
                </h1>
              )}
              {description && (
                <p
                  className="text-base opacity-90 hero-blurry-fade-in hero-blurry-fade-in--description"
                  style={descriptionFadeStyle}
                >
                  {description}
                </p>
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
      </div>
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0 select-none">
          <Media fill imgClassName="object-cover" priority resource={media} />
        </div>
      )}
    </div>
  )
}
