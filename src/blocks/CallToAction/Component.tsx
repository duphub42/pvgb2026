'use client'

import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { BlockContainer } from '@/components/BlockContainer'

type CallToActionBlockComponentProps = CTABlockProps & {
  index?: number
}

const ctaRichTextClassName = [
  'mb-0 max-w-3xl',
  '[&_h1]:mb-2 [&_h1]:text-balance [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:text-foreground md:[&_h1]:text-3xl',
  '[&_h2]:mb-2 [&_h2]:text-balance [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-foreground md:[&_h2]:text-3xl',
  '[&_h3]:mb-2 [&_h3]:text-balance [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:tracking-tight [&_h3]:text-foreground md:[&_h3]:text-3xl',
  '[&_h4]:mb-2 [&_h4]:text-balance [&_h4]:text-2xl [&_h4]:font-semibold [&_h4]:leading-tight [&_h4]:tracking-tight [&_h4]:text-foreground md:[&_h4]:text-3xl',
  '[&_p]:mb-0 [&_p]:max-w-2xl [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground md:[&_p]:text-base',
].join(' ')

export const CallToActionBlock: React.FC<CallToActionBlockComponentProps> = (props) => {
  const { links, richText, index = 0, ...styleProps } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index}>
      <div className="relative mx-auto w-full max-w-none overflow-hidden rounded-[calc(var(--style-radius-l)+0.5rem)] border border-border/60 bg-muted/20 px-6 py-7 shadow-[0_18px_56px_-46px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:bg-muted/10 dark:shadow-[0_18px_56px_-46px_rgba(0,0,0,0.65)] md:rounded-[1.5rem] md:px-8 md:py-8 lg:px-10 lg:py-9">
        <div
          className="pointer-events-none absolute -left-[55%] top-1/2 aspect-square w-[170%] -translate-y-1/2 rounded-full border border-foreground/10 bg-foreground/[0.025] dark:border-foreground/15 dark:bg-foreground/[0.035] md:-left-[24%] md:w-[94%]"
          aria-hidden="true"
        />
        <div className="relative z-10 grid gap-5 md:grid-cols-4 md:items-center md:gap-8 lg:gap-10">
          <div className="md:col-span-3">
            {richText && (
              <RichText
                className={ctaRichTextClassName}
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 md:col-span-1 md:items-stretch">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  size="cta"
                  className="h-auto min-h-11 w-full min-w-0 justify-between whitespace-normal rounded-[var(--style-radius-l)] px-5 text-left leading-snug"
                  {...link}
                />
              )
            })}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
