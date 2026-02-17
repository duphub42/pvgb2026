import React, { Fragment } from 'react'

import type { SitePage } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null
}

function getBlockBackgroundStyle(blockBackground?: string | null): React.CSSProperties {
  if (!blockBackground || blockBackground === 'none') return {}
  switch (blockBackground) {
    case 'muted':
      return { background: 'var(--muted)' }
    case 'accent':
      return { background: 'var(--accent)' }
    case 'light':
      return { background: 'var(--theme-elevation-50)' }
    case 'dark':
      return { background: 'var(--theme-elevation-800)', color: 'var(--theme-elevation-0)' }
    default:
      return {}
  }
}

function getBlockOverlayStyle(
  blockOverlay?: BlockWithStyle['blockOverlay'],
): React.CSSProperties | null {
  if (!blockOverlay || !blockOverlay.enabled || blockOverlay.opacity == null) return null
  const opacityNum = Number(blockOverlay.opacity)
  if (Number.isNaN(opacityNum)) return null
  const opacity = Math.min(1, Math.max(0, opacityNum / 100))
  const color =
    blockOverlay.color === 'light'
      ? 'var(--color-base-0)'
      : 'var(--color-base-1000)'
  return {
    position: 'absolute',
    inset: 0,
    backgroundColor: color,
    opacity,
    pointerEvents: 'none',
  }
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<SitePage['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          if (!block || typeof block !== 'object') return null
          const b = block as BlockWithStyle
          const { blockType } = b

          if (!blockType || !(blockType in blockComponents)) return null

          const Block = blockComponents[blockType as keyof typeof blockComponents]
          if (!Block) return null

          const bg = b.blockBackground
          const overlay = b.blockOverlay
          const hasBackground = Boolean(bg && bg !== 'none')
          const hasOverlay = Boolean(overlay?.enabled && overlay.opacity != null)

          return (
              <div
                className="my-16"
                key={index}
                style={
                  hasBackground
                    ? {
                        ...getBlockBackgroundStyle(bg),
                        position: 'relative',
                        isolation: 'isolate',
                      }
                    : undefined
                }
              >
                {hasOverlay && (
                  <div
                    aria-hidden
                    className="rounded-[var(--style-radius-m)]"
                    style={getBlockOverlayStyle(overlay) ?? undefined}
                  />
                )}
                <div
                  className={
                    hasBackground || hasOverlay ? 'relative z-10 py-8' : ''
                  }
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              </div>
            )
        })}
      </Fragment>
    )
  }

  return null
}
