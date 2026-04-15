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
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </BlockContainer>
  )
}
