import React from 'react'

import type {
  IntroductionBlock as IntroductionBlockData,
  Media as MediaType,
} from '@/payload-types'

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
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []

  // Responsive, visually overflowing dot pattern background
  // Dot pattern background visually overflows the image area (now 30% larger)
  const introDotPatternStyle: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(circle at center, color-mix(in srgb, var(--foreground) 62%, transparent) 1.35px, transparent 1.85px)',
    backgroundPosition: 'center',
    backgroundSize: '20px 20px',
    maskImage:
      'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage:
      'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0) 100%)',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    opacity: 0.5,
    pointerEvents: 'none',
  }

  const introImageBlendStyle: React.CSSProperties = {
    background:
      'radial-gradient(circle farthest-corner at top left, transparent 0%, transparent 60%, color-mix(in srgb, var(--background) 95%, transparent) 68%, var(--background) 70%, var(--background) 100%)',
    pointerEvents: 'none',
  }

  // Darkmode: weniger weiß, mehr neutral
  const introImageBlendStyleDark: React.CSSProperties = {
    background:
      'radial-gradient(circle farthest-corner at top left, transparent 0%, transparent 60%, color-mix(in srgb, var(--background) 96%, transparent) 70%, var(--background) 85%, var(--background) 100%)',
    pointerEvents: 'none',
  }

  return (
    <section className={cn('w-full min-w-0 py-16 md:py-24', 'container', 'px-0 sm:px-0')}>
      <div
        className={cn(
          'grid items-center gap-10',
          hasImage
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(18rem,34rem)] xl:min-h-[clamp(20rem,32vw,30rem)]'
            : 'max-w-3xl',
          hasImage && 'sm:px-0 px-0',
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
              'relative isolate w-full overflow-visible group',
              'sm:mx-0 sm:max-w-none',
              'mx-auto max-w-sm lg:mx-0 lg:max-w-[34rem] lg:justify-self-end',
              'xl:mx-0 xl:w-[38rem] xl:max-w-none xl:translate-x-[12%]',
            )}
          >
            {/*
              Dot pattern background visually overflows the image area for a seamless look.
              Responsive negative insets and min/max sizing ensure the pattern extends beyond the image.
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-16 -inset-y-16 md:-inset-x-28 md:-inset-y-28 max-w-none max-h-none -z-10"
              style={introDotPatternStyle}
            />
            <div className="relative">
              <Media
                className="w-full filter transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] grayscale group-hover:grayscale-0"
                resource={image as MediaType}
                imgClassName="w-full h-auto max-h-[750px] object-contain xl:max-h-[840px]"
              />
              {/* Overlay blend now covers the full dot pattern overflow area */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-16 -inset-y-16 md:-inset-x-28 md:-inset-y-28 z-10 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 group-hover:opacity-0 dark:hidden"
                style={introImageBlendStyle}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-16 -inset-y-16 md:-inset-x-28 md:-inset-y-28 z-10 hidden dark:block transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 group-hover:opacity-0"
                style={introImageBlendStyleDark}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
