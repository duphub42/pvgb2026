'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { CMSLink } from '../../components/Link'
import { BlockContainer } from '@/components/BlockContainer'

type ContentBlockComponentProps = ContentBlockProps & {
  index?: number
}

export const ContentBlock: React.FC<ContentBlockComponentProps> = (props) => {
  const { columns, index = 0, ...styleProps } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index}>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, colIndex) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={colIndex}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </BlockContainer>
  )
}
