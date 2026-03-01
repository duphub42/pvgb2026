'use client'

import React, { Suspense, lazy, useEffect, useState } from 'react'

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
  shadcnBlock: lazy(() =>
    import('@/blocks/ShadcnBlock/Component').then((m) => ({ default: m.ShadcnBlockComponent })),
  ),
}

export const SUPPORTED_BLOCK_TYPES = CLIENT_BLOCK_TYPES

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: { enabled?: boolean | null; color?: 'dark' | 'light' | null; opacity?: number | null } | null
}

const BLOCK_FALLBACK = <div className="min-h-[120px]" aria-hidden />

/**
 * Rendert den Block erst nach Client-Mount, damit Server und Client dasselbe HTML erzeugen (Fallback).
 * Verhindert Hydration-Mismatch durch React.lazy: Server könnte den Block auflösen, Client zeigt erst den Fallback.
 */
export function BlockRenderer({
  blockType,
  block,
}: {
  blockType: string
  block: BlockWithStyle
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const Block = blockLoaders[blockType]
  if (!Block) return null

  if (!mounted) return BLOCK_FALLBACK

  return (
    <Suspense fallback={BLOCK_FALLBACK}>
      <Block {...block} disableInnerContainer />
    </Suspense>
  )
}
