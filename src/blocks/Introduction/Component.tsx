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
    index = 0,
    ...styleProps
  } = props as IntroductionBlockData & { imageDarkModeInvert?: boolean | null }
  const imageDarkModeInvert = props.imageDarkModeInvert ?? true

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles
  const hasImage = image != null && typeof image === 'object'

  const taglineLines =
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []

  return (
    <BlockContainer styles={styles} index={index}>
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
              'relative isolate w-full',
              'sm:mx-0 sm:max-w-none',
              'mx-auto max-w-sm lg:mx-0 lg:max-w-[34rem] lg:justify-self-end',
              'xl:mx-0 xl:w-[38rem] xl:max-w-none',
            )}
          >
            <Media
              className="w-full"
              resource={image as MediaType}
              imgClassName={cn(
                'w-full h-auto max-h-[750px] object-contain xl:max-h-[840px]',
                imageDarkModeInvert && 'dark:invert',
              )}
            />
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
