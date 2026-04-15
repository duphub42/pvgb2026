'use client'

import type { BannerBlock as BannerBlockProps } from 'src/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { BlockContainer } from '@/components/BlockContainer'

type BannerBlockComponentProps = BannerBlockProps & {
  className?: string
  index?: number
}

export const BannerBlock: React.FC<BannerBlockComponentProps> = (props) => {
  const { className, content, style, index = 0, ...styleProps } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index} className={className}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info',
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </BlockContainer>
  )
}
