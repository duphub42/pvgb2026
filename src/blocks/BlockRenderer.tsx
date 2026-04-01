'use client'

import React, { Suspense, lazy } from 'react'

import type { SitePage } from '@/payload-types'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

type LazyBlockComponent = React.LazyExoticComponent<
  React.ComponentType<Record<string, unknown> & { disableInnerContainer?: boolean }>
>

/** Lazy-Load pro Block-Typ. ArchiveBlock wird in RenderBlocks direkt gerendert (Server). */
const blockLoaders = {
  consultingOverview: lazy(() =>
    import('@/blocks/ConsultingOverview/Component').then((m) => ({
      default: m.ConsultingOverviewBlock,
    })),
  ),
  content: lazy(() =>
    import('@/blocks/Content/Component').then((m) => ({ default: m.ContentBlock })),
  ),
  heroMarketing: lazy(() =>
    import('@/blocks/HeroMarketing/Component').then((m) => ({ default: m.HeroMarketingBlock })),
  ),
  introduction: lazy(() =>
    import('@/blocks/Introduction/Component').then((m) => ({ default: m.IntroductionBlock })),
  ),
  cta: lazy(() =>
    import('@/blocks/CallToAction/Component').then((m) => ({ default: m.CallToActionBlock })),
  ),
  formBlock: lazy(() => import('@/blocks/Form/Component').then((m) => ({ default: m.FormBlock }))),
  mediaBlock: lazy(() =>
    import('@/blocks/MediaBlock/Component').then((m) => ({ default: m.MediaBlock })),
  ),
  profilBacher: lazy(() =>
    import('@/blocks/ProfilBacherLegacy/Component').then((m) => ({
      default: m.ProfilBacherLegacyBlock,
    })),
  ),
  profilUeberMich: lazy(() =>
    import('@/blocks/ProfilUeberMich/Component').then((m) => ({ default: m.ProfilUeberMichBlock })),
  ),
  profilKernkompetenz: lazy(() =>
    import('@/blocks/ProfilKernkompetenz/Component').then((m) => ({
      default: m.ProfilKernkompetenzBlock,
    })),
  ),
  profilKompetenzen: lazy(() =>
    import('@/blocks/ProfilKompetenzen/Component').then((m) => ({
      default: m.ProfilKompetenzenBlock,
    })),
  ),
  profilWerdegang: lazy(() =>
    import('@/blocks/ProfilWerdegang/Component').then((m) => ({ default: m.ProfilWerdegangBlock })),
  ),
  profilZahlenFakten: lazy(() =>
    import('@/blocks/ProfilZahlenFakten/Component').then((m) => ({
      default: m.ProfilZahlenFaktenBlock,
    })),
  ),
  profilTools: lazy(() =>
    import('@/blocks/ProfilTools/Component').then((m) => ({ default: m.ProfilToolsBlock })),
  ),
  profilLangZert: lazy(() =>
    import('@/blocks/ProfilLangZert/Component').then((m) => ({ default: m.ProfilLangZertBlock })),
  ),
  profilCtaBand: lazy(() =>
    import('@/blocks/ProfilCtaBand/Component').then((m) => ({ default: m.ProfilCtaBandBlock })),
  ),
  servicesOverview: lazy(() =>
    import('@/blocks/ServicesOverview/Component').then((m) => ({
      default: m.ServicesOverviewBlock,
    })),
  ),
  servicesGrid: lazy(() =>
    import('@/blocks/ServicesGrid/Component').then((m) => ({ default: m.ServicesGridBlock })),
  ),
  shadcnBlock: lazy(() =>
    import('@/blocks/ShadcnBlock/Component').then((m) => ({ default: m.ShadcnBlockComponent })),
  ),
  whyWorkWithMe: lazy(() =>
    import('@/blocks/WhyWorkWithMe/Component').then((m) => ({ default: m.WhyWorkWithMeBlock })),
  ),
} as unknown as Record<string, LazyBlockComponent>

export const SUPPORTED_BLOCK_TYPES = CLIENT_BLOCK_TYPES

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null
}

const BLOCK_FALLBACK = (
  <div className="min-h-[80px] animate-pulse rounded-md bg-muted/40" aria-hidden />
)

/**
 * Lazy-Block mit Suspense. Kein „erst nach useEffect“-Gate mehr: sonst bleibt der sichtbare Inhalt
 * bis zum Client-Mount leer („Seite passiert nichts“), obwohl die Daten da sind.
 */
export function BlockRenderer({ blockType, block }: { blockType: string; block: BlockWithStyle }) {
  const Block = blockLoaders[blockType]
  if (!Block) return null

  return (
    <Suspense fallback={BLOCK_FALLBACK}>
      <Block {...block} disableInnerContainer />
    </Suspense>
  )
}
