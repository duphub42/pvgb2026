'use client'

import React from 'react'
import { BarChart3, DraftingCompass, Fingerprint } from 'lucide-react'

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
  const forceDarkModeInvertForWebdesignIntro =
    heading?.trim() === 'Webdesign, das aus Besuchern Kunden macht'
  const imageInvertClass = !showLottie
    ? forceDarkModeInvertForWebdesignIntro
      ? 'invert-0 dark:invert'
      : imageDarkModeInvert
        ? 'invert dark:invert-0'
        : undefined
    : undefined
  const normalizedImageOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(Number(imageOpacity)) ? Number(imageOpacity) / 100 : 1),
  )

  const taglineLines =
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []
  const isLeistungenHubIntro = heading?.trim() === 'Ein Hub für alle Leistungen'

  const hubCards = [
    {
      title: 'Design & Website',
      description: 'Webdesign, Printmedien und Präsentationen für einen starken Auftritt.',
      Icon: DraftingCompass,
    },
    {
      title: 'Marketing & Sichtbarkeit',
      description: 'SEO, SEM und Content Creation für Reichweite und Anfragen.',
      Icon: BarChart3,
    },
    {
      title: 'Branding & Identity',
      description: 'CI, Logo-Entwicklung und Markenstrategie für klare Wiedererkennung.',
      Icon: Fingerprint,
    },
  ]

  if (isLeistungenHubIntro && !hasMedia) {
    return (
      <BlockContainer styles={styles} index={index}>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {hubCards.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="h-full rounded-xl border border-border/70 bg-card/90 p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-card-foreground md:text-base">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0 lg:justify-self-end lg:max-w-2xl">
            {heading && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}

            {body && (
              <p className="mb-6 max-w-prose whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
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
        </div>
      </BlockContainer>
    )
  }

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
            <p className="mb-6 max-w-prose whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
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
                  imageInvertClass,
                )}
              />
            </div>
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
