'use client'

import React, { Suspense, lazy } from 'react'

import type { SitePage } from '@/payload-types'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

/** Lazy-Load pro Block-Typ. ArchiveBlock wird in RenderBlocks direkt gerendert (Server). Fallback verhindert "Element type is invalid: got undefined". */
function lazyBlock<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default?: T } & Record<string, T | undefined>>,
  name: string,
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const m = await loader()
    const C = (m as { default?: T }).default ?? (m as Record<string, T>)[name]
    if (C == null || (typeof C !== 'function' && typeof C !== 'object'))
      throw new Error(`Block "${name}" export is invalid`)
    return { default: C as T }
  })
}

const blockLoaders: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown> & { disableInnerContainer?: boolean }>>
> = {
  content: lazyBlock(
    () => import('@/blocks/Content/Component'),
    'ContentBlock',
  ),
  heroMarketing: lazyBlock(
    () => import('@/blocks/HeroMarketing/Component'),
    'HeroMarketingBlock',
  ),
  cta: lazyBlock(
    () => import('@/blocks/CallToAction/Component'),
    'CallToActionBlock',
  ),
  formBlock: lazyBlock(
    () => import('@/blocks/Form/Component'),
    'FormBlock',
  ),
  mediaBlock: lazyBlock(
    () => import('@/blocks/MediaBlock/Component'),
    'MediaBlock',
  ),
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
