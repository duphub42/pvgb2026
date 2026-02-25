import React, { Fragment } from 'react'

import type { SitePage } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SerpContentBlock } from '@/blocks/SerpContent/Component'
import { LyraContentBlock } from '@/blocks/LyraContent/Component'
import { LyraFeatureBlock } from '@/blocks/LyraFeature/Component'
import { FeaturesGridBlock } from '@/blocks/FeaturesGrid/Component'
import { FeatureAdvantagesBlock } from '@/blocks/FeatureAdvantages/Component'
import { Feature1Block } from '@/blocks/Feature1/Component'
import { Feature2Block } from '@/blocks/Feature2/Component'
import { ServiceUxUiBlock } from '@/blocks/ServiceUxUi/Component'
import { Services4Block } from '@/blocks/Services4/Component'
import { FeaturesScalingBlock } from '@/blocks/FeaturesScaling/Component'
import { FeaturesAiAccordionBlock } from '@/blocks/FeaturesAiAccordion/Component'
import { HeroMarketingBlock } from '@/blocks/HeroMarketing/Component'
import { HeroGridBlock } from '@/blocks/HeroGrid/Component'
import { ContactSection1Block } from '@/blocks/ContactSection1/Component'
import { CtaSection3Block } from '@/blocks/CtaSection3/Component'
import { CollaborationCursorsBlock } from '@/blocks/CollaborationCursors/Component'
import { ScrollMorphHeroBlock } from '@/blocks/ScrollMorphHero/Component'
import { FaqSimpleBlock } from '@/blocks/FaqSimple/Component'
import { PricingBlockComponent } from '@/blocks/Pricing/Component'
import { PricingCardsBlock } from '@/blocks/PricingCards/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  serpContent: SerpContentBlock,
  lyraContent: LyraContentBlock,
  lyraFeature: LyraFeatureBlock,
  featuresGrid: FeaturesGridBlock,
  featureAdvantages: FeatureAdvantagesBlock,
  feature1: Feature1Block,
  feature2: Feature2Block,
  serviceUxUi: ServiceUxUiBlock,
  services4: Services4Block,
  featuresScaling: FeaturesScalingBlock,
  faqSimple: FaqSimpleBlock,
  pricing: PricingBlockComponent,
  pricingCards: PricingCardsBlock,
  featuresAiAccordion: FeaturesAiAccordionBlock,
  heroMarketing: HeroMarketingBlock,
  heroGrid: HeroGridBlock,
  scrollMorphHero: ScrollMorphHeroBlock,
  contactSection1: ContactSection1Block,
  ctaSection3: CtaSection3Block,
  collabCur: CollaborationCursorsBlock,
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
