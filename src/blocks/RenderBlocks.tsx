import React, { Fragment } from 'react'

import type { PriceCalculatorBlock, SitePage } from '@/payload-types'
import { blurryFadeIn } from '@/components/ui/animationVariants'

import {
  ArchiveBlockComponent,
  type ArchiveBlockComponentProps,
} from '@/blocks/ArchiveBlock/Component'
import { PriceCalculatorBlockComponent } from '@/blocks/PriceCalculator/Component'
import { BlockRenderer } from '@/blocks/BlockRenderer'
import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'
import { AnimateBlock } from '@/components/ui/AnimateBlock'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockBackgroundImage?: unknown
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null
  blockOverlayEnabled?: boolean | null
  blockOverlayColor?: 'dark' | 'light' | null
  blockOverlayOpacity?: number | null
}

function getBlockBackgroundStyle(
  blockBackground?: string | null,
  backgroundImageUrl?: string | null,
): React.CSSProperties {
  const style: React.CSSProperties = {}

  switch (blockBackground) {
    case 'muted':
      style.background = 'var(--muted)'
      break
    case 'accent':
      style.background = 'var(--accent)'
      break
    case 'light':
      style.background = 'var(--theme-elevation-50)'
      break
    case 'dark':
      style.background = 'var(--theme-elevation-800)'
      style.color = 'var(--theme-elevation-0)'
      break
    default:
      break
  }

  if (backgroundImageUrl) {
    const escapedUrl = backgroundImageUrl.replace(/"/g, '\\"')
    style.backgroundImage = `url("${escapedUrl}")`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
    style.backgroundRepeat = 'no-repeat'
  }

  return style
}

function getBlockOverlayStyle(
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null,
): React.CSSProperties | null {
  if (!blockOverlay || !blockOverlay.enabled || blockOverlay.opacity == null) return null
  const opacityNum = Number(blockOverlay.opacity)
  if (Number.isNaN(opacityNum)) return null
  const opacity = Math.min(1, Math.max(0, opacityNum / 100))
  const color = blockOverlay.color === 'light' ? 'var(--color-base-0)' : 'var(--color-base-1000)'
  return {
    position: 'absolute',
    inset: 0,
    backgroundColor: color,
    opacity,
    pointerEvents: 'none',
  }
}

function getBlockBackgroundImageUrl(blockBackgroundImage: unknown): string | null {
  const src = resolveHeroImageSrc(blockBackgroundImage)
  return typeof src === 'string' && src.trim() ? src : null
}

function getResolvedBlockOverlay(block: BlockWithStyle): {
  enabled?: boolean | null
  color?: 'dark' | 'light' | null
  opacity?: number | null
} | null {
  if (block.blockOverlay && typeof block.blockOverlay === 'object') return block.blockOverlay
  if (!block.blockOverlayEnabled) return null

  return {
    enabled: block.blockOverlayEnabled,
    color: block.blockOverlayColor ?? 'dark',
    opacity: block.blockOverlayOpacity ?? 0,
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
          const isPriceCalculator = blockType === 'priceCalculator'
          const isClientBlock = CLIENT_BLOCK_TYPES.has(blockType)
          const isProfilBlock = blockType.startsWith('profil')
          if (!isArchive && !isClientBlock && !isPriceCalculator) return null

          const bg = b.blockBackground
          const bgImageUrl = getBlockBackgroundImageUrl(b.blockBackgroundImage)
          const overlay = getResolvedBlockOverlay(b)
          const hasBackground = Boolean((bg && bg !== 'none') || bgImageUrl)
          const hasOverlay = Boolean(overlay?.enabled && overlay.opacity != null)

          return (
            <AnimateBlock
              key={
                typeof b.id === 'string' || typeof b.id === 'number'
                  ? String(b.id)
                  : `${blockType}-${index}`
              }
              // Erster Block: mt-[-1px] schließt an den Hero-Shape-Divider an; kein pt-[8vh], damit kein großer Leerraum oberhalb des Contents.
              className={
                index === 0
                  ? isProfilBlock
                    ? 'mt-[-1px] mb-6 md:mb-8'
                    : 'mt-[-1px] mb-16'
                  : isProfilBlock
                    ? 'my-6 md:my-8'
                    : 'my-16'
              }
              variants={blurryFadeIn}
              viewport={{ once: true, amount: 0.14 }}
              transition={{
                duration: 0.72,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.06,
              }}
              style={
                hasBackground
                  ? {
                      ...getBlockBackgroundStyle(bg, bgImageUrl),
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
              <div className={hasBackground || hasOverlay ? 'relative z-10 py-8' : 'bg-white/0'}>
                {isArchive ? (
                  <ArchiveBlockComponent
                    {...(b as ArchiveBlockComponentProps)}
                    disableInnerContainer
                    index={index}
                  />
                ) : isPriceCalculator ? (
                  <PriceCalculatorBlockComponent
                    {...(b as PriceCalculatorBlock)}
                    disableInnerContainer
                    index={index}
                  />
                ) : (
                  <BlockRenderer blockType={blockType} block={b} index={index} />
                )}
              </div>
            </AnimateBlock>
          )
        })}
      </Fragment>
    )
  }

  return null
}
