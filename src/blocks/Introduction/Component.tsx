'use client'

import React from 'react'

import type {
  IntroductionBlock as IntroductionBlockData,
  Media as MediaType,
} from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { BlockContainer } from '@/components/BlockContainer'

type IntroductionProps = IntroductionBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

export const IntroductionBlock: React.FC<IntroductionProps> = (props) => {
  const {
    disableInnerContainer: _disableInnerContainer,
    heading,
    body,
    tagline,
    image,
    useLottie,
    lottieLight,
    lottieDark,
    imageDarkModeInvert = true,
    imageOpacity,
    index = 0,
    ...styleProps
  } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles
  const hasImage = image != null && typeof image === 'object'
  const showLottie = useLottie && (lottieLight || lottieDark)
  const hasMedia = hasImage || showLottie
  const normalizedImageOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(Number(imageOpacity)) ? Number(imageOpacity) / 100 : 1),
  )

  const taglineLines =
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []

  return (
    <BlockContainer styles={styles} index={index}>
      <div
        className={cn(
          'grid items-center gap-10',
          hasMedia
            ? 'lg:grid-cols-[minmax(0,1fr)_minmax(18rem,34rem)] xl:min-h-[clamp(20rem,32vw,30rem)]'
            : 'max-w-3xl',
          hasMedia && 'sm:px-0 px-0',
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

        {hasMedia && (
          <div
            className={cn(
              'relative isolate w-full',
              'sm:mx-0 sm:max-w-none',
              'mx-auto max-w-sm lg:mx-0 lg:max-w-[34rem] lg:justify-self-end',
              'xl:mx-0 xl:w-[38rem] xl:max-w-none',
            )}
          >
            <div style={!showLottie ? { opacity: normalizedImageOpacity } : undefined}>
              <Media
                className="w-full"
                resource={showLottie ? undefined : (image as MediaType)}
                themeResource={showLottie ? { light: lottieLight, dark: lottieDark } : undefined}
                imgClassName={cn(
                  'w-full h-auto max-h-[750px] object-contain xl:max-h-[840px]',
                  // Base asset is optimized for dark mode.
                  // When enabled, switch to an inverted variant in light mode.
                  !showLottie && imageDarkModeInvert && 'invert dark:invert-0',
                )}
              />
            </div>
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
