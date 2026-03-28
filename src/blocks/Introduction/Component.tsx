import React from 'react'

import type { IntroductionBlock as IntroductionBlockData, Media as MediaType } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

type IntroductionProps = IntroductionBlockData & { disableInnerContainer?: boolean }

export const IntroductionBlock: React.FC<IntroductionProps> = ({
  disableInnerContainer: _disableInnerContainer,
  heading,
  body,
  tagline,
  image,
}) => {
  const hasImage = image != null && typeof image === 'object'

  const taglineLines =
    typeof tagline === 'string' && tagline.trim()
      ? tagline.split('\n').filter((l) => l.trim())
      : []

  return (
    <section className={cn('w-full min-w-0 py-16 md:py-24', 'container')}>
      <div
        className={cn(
          'grid items-center gap-10',
          hasImage ? 'lg:grid-cols-[1fr_auto]' : 'max-w-3xl',
        )}
      >
        <div className="min-w-0">
          {heading && (
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}

          {body && (
            <p className="mb-6 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              {body}
            </p>
          )}

          {taglineLines.length > 0 && (
            <div className="border-l-2 border-primary pl-4">
              {taglineLines.map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    'text-sm font-medium leading-relaxed text-foreground/80 md:text-base',
                    i < taglineLines.length - 1 && 'mb-1',
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {hasImage && (
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted lg:mx-0">
            <Media
              resource={image as MediaType}
              imgClassName="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
