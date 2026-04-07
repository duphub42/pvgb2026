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

  const introDotPatternStyle: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(circle, color-mix(in srgb, var(--foreground) 62%, transparent) 1.35px, transparent 1.85px)',
    backgroundPosition: 'center',
    backgroundSize: '16px 16px',
    maskImage:
      'radial-gradient(ellipse 90% 90% at 50% 52%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 42%, rgba(0, 0, 0, 0.35) 72%, transparent 100%)',
    WebkitMaskImage:
      'radial-gradient(ellipse 90% 90% at 50% 52%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 42%, rgba(0, 0, 0, 0.35) 72%, transparent 100%)',
  }

  return (
    <section className={cn('w-full min-w-0 py-16 md:py-24', 'container')}>
      <div
        className={cn(
          'grid items-center gap-10',
          hasImage ? 'lg:grid-cols-[minmax(0,1fr)_auto]' : 'max-w-3xl',
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
          <div className="relative isolate mx-auto w-full max-w-sm overflow-visible lg:mx-0 lg:w-[42vw] lg:max-w-[calc(24rem+15vw)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-35"
              style={introDotPatternStyle}
            />
            <Media
              className="w-full"
              resource={image as MediaType}
              imgClassName="w-full h-auto max-h-[500px] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}
