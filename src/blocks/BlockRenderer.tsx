'use client'

import React, { Suspense, lazy } from 'react'

import type { SitePage } from '@/payload-types'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

/** Lazy-Load pro Block-Typ: Nur die Blöcke, die auf der Seite vorkommen, werden geladen. Reduziert Script-Größe deutlich.
 *  ArchiveBlock ist ausgenommen – er nutzt getPayload/config (Server) und darf nicht im Client-Bundle landen. */
const blockLoaders: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown> & { disableInnerContainer?: boolean }>>
> = {
  content: lazy(() => import('@/blocks/Content/Component').then((m) => ({ default: m.ContentBlock }))),
  serpContent: lazy(() => import('@/blocks/SerpContent/Component').then((m) => ({ default: m.SerpContentBlock }))),
  lyraContent: lazy(() => import('@/blocks/LyraContent/Component').then((m) => ({ default: m.LyraContentBlock }))),
  lyraFeature: lazy(() => import('@/blocks/LyraFeature/Component').then((m) => ({ default: m.LyraFeatureBlock }))),
  featuresGrid: lazy(() => import('@/blocks/FeaturesGrid/Component').then((m) => ({ default: m.FeaturesGridBlock }))),
  featureAdvantages: lazy(() =>
    import('@/blocks/FeatureAdvantages/Component').then((m) => ({ default: m.FeatureAdvantagesBlock })),
  ),
  feature1: lazy(() => import('@/blocks/Feature1/Component').then((m) => ({ default: m.Feature1Block }))),
  feature2: lazy(() => import('@/blocks/Feature2/Component').then((m) => ({ default: m.Feature2Block }))),
  serviceUxUi: lazy(() => import('@/blocks/ServiceUxUi/Component').then((m) => ({ default: m.ServiceUxUiBlock }))),
  services4: lazy(() => import('@/blocks/Services4/Component').then((m) => ({ default: m.Services4Block }))),
  featuresScaling: lazy(() =>
    import('@/blocks/FeaturesScaling/Component').then((m) => ({ default: m.FeaturesScalingBlock })),
  ),
  faqSimple: lazy(() => import('@/blocks/FaqSimple/Component').then((m) => ({ default: m.FaqSimpleBlock }))),
  pricing: lazy(() => import('@/blocks/Pricing/Component').then((m) => ({ default: m.PricingBlockComponent }))),
  pricingCards: lazy(() => import('@/blocks/PricingCards/Component').then((m) => ({ default: m.PricingCardsBlock }))),
  featuresAiAccordion: lazy(() =>
    import('@/blocks/FeaturesAiAccordion/Component').then((m) => ({ default: m.FeaturesAiAccordionBlock })),
  ),
  heroMarketing: lazy(() =>
    import('@/blocks/HeroMarketing/Component').then((m) => ({ default: m.HeroMarketingBlock })),
  ),
  heroGrid: lazy(() => import('@/blocks/HeroGrid/Component').then((m) => ({ default: m.HeroGridBlock }))),
  scrollMorphHero: lazy(() =>
    import('@/blocks/ScrollMorphHero/Component').then((m) => ({ default: m.ScrollMorphHeroBlock })),
  ),
  contactSection1: lazy(() =>
    import('@/blocks/ContactSection1/Component').then((m) => ({ default: m.ContactSection1Block })),
  ),
  ctaSection3: lazy(() => import('@/blocks/CtaSection3/Component').then((m) => ({ default: m.CtaSection3Block }))),
  collabCur: lazy(() =>
    import('@/blocks/CollaborationCursors/Component').then((m) => ({ default: m.CollaborationCursorsBlock })),
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
