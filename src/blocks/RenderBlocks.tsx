import React, { Fragment } from 'react'

import type { SitePage } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BlockRenderer } from '@/blocks/BlockRenderer'
import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

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

          if (!blockType) return null
          const isArchive = blockType === 'archive'
          const isClientBlock = CLIENT_BLOCK_TYPES.has(blockType)
          if (!isArchive && !isClientBlock) return null

          const bg = b.blockBackground
          const overlay = b.blockOverlay
          const hasBackground = Boolean(bg && bg !== 'none')
          const hasOverlay = Boolean(overlay?.enabled && overlay.opacity != null)

          return (
              <div
                // Erster Block: minimal nach oben ziehen, damit Shape-Divider des Heros ohne sichtbare Lücke
                // an den folgenden Content anschließt (verhindert Subpixel-Gaps beim Scrollen).
                className={index === 0 ? 'mt-[-1px] mb-16' : 'my-16'}
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
                  {isArchive ? (
                    <ArchiveBlock {...b} disableInnerContainer />
                  ) : (
                    <BlockRenderer blockType={blockType} block={b} />
                  )}
                </div>
              </div>
            )
        })}
      </Fragment>
    )
  }

  return null
}
