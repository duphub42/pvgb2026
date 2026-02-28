'use client'

import React, { Suspense, lazy } from 'react'

import type { SitePage } from '@/payload-types'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

/** Lazy-Load pro Block-Typ. ArchiveBlock wird in RenderBlocks direkt gerendert (Server). */
const blockLoaders: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown> & { disableInnerContainer?: boolean }>>
> = {
  content: lazy(() => import('@/blocks/Content/Component').then((m) => ({ default: m.ContentBlock }))),
  heroMarketing: lazy(() =>
    import('@/blocks/HeroMarketing/Component').then((m) => ({ default: m.HeroMarketingBlock })),
  ),
  cta: lazy(() => import('@/blocks/CallToAction/Component').then((m) => ({ default: m.CallToActionBlock }))),
  formBlock: lazy(() => import('@/blocks/Form/Component').then((m) => ({ default: m.FormBlock }))),
  mediaBlock: lazy(() => import('@/blocks/MediaBlock/Component').then((m) => ({ default: m.MediaBlock }))),
}

export const SUPPORTED_BLOCK_TYPES = CLIENT_BLOCK_TYPES

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: { enabled?: boolean | null; color?: 'dark' | 'light' | null; opacity?: number | null } | null
}

export function BlockRenderer({
  blockType,
  block,
}: {
  blockType: string
  block: BlockWithStyle
}) {
  const Block = blockLoaders[blockType]
  if (!Block) return null
  return (
    <Suspense fallback={<div className="min-h-[120px]" aria-hidden />}>
      <Block {...block} disableInnerContainer />
    </Suspense>
  )
}
