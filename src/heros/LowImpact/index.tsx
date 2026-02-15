import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType = Page['hero'] & { children?: React.ReactNode }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  subheadline,
  headline,
  description,
}) => {
  const hasHeadings = subheadline || headline || description

  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {hasHeadings && (
          <div className="mb-6">
            {subheadline && <p className="text-lg opacity-90 mb-2">{subheadline}</p>}
            {headline && <h1 className="text-2xl md:text-3xl font-bold mb-4">{headline}</h1>}
            {description && <p className="text-base opacity-90">{description}</p>}
          </div>
        )}
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
