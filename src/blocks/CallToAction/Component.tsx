'use client'

import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { BlockContainer } from '@/components/BlockContainer'
import { CtaPanel } from '@/components/CtaPanel'

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
    <BlockContainer
      styles={styles}
      index={index}
      className="!pt-[10.666rem] !pb-[10.666rem] md:!pt-[13.334rem] md:!pb-[13.334rem]"
    >
      <CtaPanel className="cta-block-shell" cardClassName="cta-card">
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
      </CtaPanel>
    </BlockContainer>
  )
}
