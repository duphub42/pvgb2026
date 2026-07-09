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

export const CallToActionBlock: React.FC<CallToActionBlockComponentProps> = (props) => {
  const { links, richText, index = 0, ...styleProps } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index}>
      <div className="relative mx-auto w-full max-w-none overflow-hidden rounded-[1.5rem] border border-border/60 bg-muted/20 px-6 py-7 shadow-[0_18px_56px_-46px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:bg-muted/10 dark:shadow-[0_18px_56px_-46px_rgba(0,0,0,0.65)] md:px-8 md:py-8 lg:px-10 lg:py-9">
        <div
          className="pointer-events-none absolute -left-[55%] top-1/2 aspect-square w-[170%] -translate-y-1/2 rounded-full border border-foreground/10 bg-foreground/[0.025] dark:border-foreground/15 dark:bg-foreground/[0.035] md:-left-[24%] md:w-[94%]"
          aria-hidden="true"
        />
        <div className="relative z-10 grid gap-5 md:grid-cols-4 md:items-center md:gap-8 lg:gap-10">
          <div className="md:col-span-3">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>
          <div className="flex flex-col gap-3 md:col-span-1 md:items-stretch">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="cta" className="w-full justify-between px-5" {...link} />
            })}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
