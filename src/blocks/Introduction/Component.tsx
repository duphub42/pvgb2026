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
      'radial-gradient(circle at center, color-mix(in srgb, var(--foreground) 62%, transparent) 1.35px, transparent 1.85px)',
    backgroundPosition: 'center',
    backgroundSize: '20px 20px',
    maskImage:
      'radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.88) 42%, rgba(0, 0, 0, 0.3) 65%, rgba(0, 0, 0, 0) 100%)',
    WebkitMaskImage:
      'radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.88) 42%, rgba(0, 0, 0, 0.3) 65%, rgba(0, 0, 0, 0) 100%)',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    opacity: 0.55,
  }

  const introImageBlendStyle: React.CSSProperties = {
    background:
      'radial-gradient(circle farthest-corner at top left, transparent 0%, transparent 50%, color-mix(in srgb, var(--background) 90%, transparent) 65%, color-mix(in srgb, var(--background) 96%, transparent) 80%, var(--background) 100%)',
    opacity: 1,
    pointerEvents: 'none',
  }

  return (
    <section className={cn('w-full min-w-0 py-16 md:py-24', 'container')}>
      <div
        className={cn(
          'grid items-center gap-10',
          hasImage
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(16rem,34vw)] xl:relative xl:grid-cols-1 xl:min-h-[clamp(20rem,32vw,30rem)]'
            : 'max-w-3xl',
        )}
      >
        <div className={cn('min-w-0', hasImage && 'xl:max-w-3xl')}>
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
          <div
            className={cn(
              'relative isolate mx-auto w-full max-w-sm overflow-visible lg:mx-0 lg:max-w-[clamp(18rem,34vw,30rem)]',
              'xl:absolute xl:top-1/2 xl:right-0 xl:mx-0 xl:w-[clamp(18rem,32vw,36rem)] xl:max-w-none xl:-translate-y-1/2 xl:translate-x-[12%]',
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-35"
              style={introDotPatternStyle}
            />
            <div className="relative group">
              <Media
                className="w-full"
                resource={image as MediaType}
                imgClassName="w-full h-auto max-h-[500px] object-contain xl:max-h-[560px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 group-hover:opacity-0"
                style={introImageBlendStyle}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
