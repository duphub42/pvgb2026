import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  subheadline,
  headline,
  description,
}) => {
  const hasHeadings = subheadline || headline || description

  return (
    <div className="">
      <div className="container mb-8">
        {hasHeadings && (
          <div className="mb-6">
            {subheadline && <p className="text-lg opacity-90 mb-2">{subheadline}</p>}
            {headline && <h1 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h1>}
            {description && <p className="text-base opacity-90">{description}</p>}
          </div>
        )}
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

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
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
