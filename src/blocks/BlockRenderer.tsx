import type { ComponentType } from 'react'

import type { SitePage } from '@/payload-types'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

export const SUPPORTED_BLOCK_TYPES = CLIENT_BLOCK_TYPES

type RenderableBlockComponent = ComponentType<Record<string, unknown>>

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null
}

export async function BlockRenderer({
  blockType,
  block,
  index = 0,
}: {
  blockType: string
  block: BlockWithStyle
  index?: number
}) {
  const Block = await getBlockComponent(blockType)
  if (!Block) return null
  return (
    <Block {...(block as unknown as Record<string, unknown>)} disableInnerContainer index={index} />
  )
}

async function getBlockComponent(blockType: string): Promise<RenderableBlockComponent | null> {
  switch (blockType) {
    case 'consultingOverview':
      return (await import('@/blocks/ConsultingOverview/Component'))
        .ConsultingOverviewBlock as unknown as RenderableBlockComponent
    case 'contactInfoCards':
      return (await import('@/blocks/ContactInfoCards/Component'))
        .ContactInfoCardsBlock as unknown as RenderableBlockComponent
    case 'brandShowcase':
      return (await import('@/blocks/BrandShowcase/Component'))
        .BrandShowcaseBlock as unknown as RenderableBlockComponent
    case 'content':
      return (await import('@/blocks/Content/Component')).ContentBlock as unknown as RenderableBlockComponent
    case 'heroFlowchart':
      return (await import('@/blocks/HeroFlowchart/Component'))
        .HeroFlowchartBlock as unknown as RenderableBlockComponent
    case 'heroWithProcess':
      return (await import('@/blocks/HeroWithProcess/Component.client'))
        .HeroWithProcessBlock as unknown as RenderableBlockComponent
    case 'heroMarketing':
      return (await import('@/blocks/HeroMarketing/Component'))
        .HeroMarketingBlock as unknown as RenderableBlockComponent
    case 'introduction':
      return (await import('@/blocks/Introduction/Component'))
        .IntroductionBlock as unknown as RenderableBlockComponent
    case 'marqueeSlider':
      return (await import('@/blocks/MarqueeSlider/Component'))
        .MarqueeSliderBlock as unknown as RenderableBlockComponent
    case 'cta':
      return (await import('@/blocks/CallToAction/Component'))
        .CallToActionBlock as unknown as RenderableBlockComponent
    case 'calPopup':
      return (await import('@/blocks/CalPopup/Component.client'))
        .CalPopupBlock as unknown as RenderableBlockComponent
    case 'formBlock':
      return (await import('@/blocks/Form/Component')).FormBlock as unknown as RenderableBlockComponent
    case 'mediaBlock':
      return (await import('@/blocks/MediaBlock/Component')).MediaBlock as unknown as RenderableBlockComponent
    case 'profilBacher':
      return (await import('@/blocks/ProfilBacherLegacy/Component'))
        .ProfilBacherLegacyBlock as unknown as RenderableBlockComponent
    case 'profilUeberMich':
      return (await import('@/blocks/ProfilUeberMich/Component'))
        .ProfilUeberMichBlock as unknown as RenderableBlockComponent
    case 'profilKernkompetenz':
      return (await import('@/blocks/ProfilKernkompetenz/Component'))
        .ProfilKernkompetenzBlock as unknown as RenderableBlockComponent
    case 'profilKompetenzen':
      return (await import('@/blocks/ProfilKompetenzen/Component'))
        .ProfilKompetenzenBlock as unknown as RenderableBlockComponent
    case 'profilWerdegang':
      return (await import('@/blocks/ProfilWerdegang/Component'))
        .ProfilWerdegangBlock as unknown as RenderableBlockComponent
    case 'profilZahlenFakten':
      return (await import('@/blocks/ProfilZahlenFakten/Component'))
        .ProfilZahlenFaktenBlock as unknown as RenderableBlockComponent
    case 'profilTools':
      return (await import('@/blocks/ProfilTools/Component'))
        .ProfilToolsBlock as unknown as RenderableBlockComponent
    case 'profilLangZert':
      return (await import('@/blocks/ProfilLangZert/Component'))
        .ProfilLangZertBlock as unknown as RenderableBlockComponent
    case 'profilCtaBand':
      return (await import('@/blocks/ProfilCtaBand/Component'))
        .ProfilCtaBandBlock as unknown as RenderableBlockComponent
    case 'servicesOverview':
      return (await import('@/blocks/ServicesOverview/Component'))
        .ServicesOverviewBlock as unknown as RenderableBlockComponent
    case 'servicesGrid':
      return (await import('@/blocks/ServicesGrid/Component'))
        .ServicesGridBlock as unknown as RenderableBlockComponent
    case 'portfolioCaseGrid':
      return (await import('@/blocks/PortfolioCaseGrid/Component'))
        .PortfolioCaseGridBlock as unknown as RenderableBlockComponent
    case 'portfolioKpiStrip':
      return (await import('@/blocks/PortfolioKpiStrip/Component'))
        .PortfolioKpiStripBlock as unknown as RenderableBlockComponent
    case 'portfolioTeaser':
      return (await import('@/blocks/PortfolioTeaser/Component'))
        .PortfolioTeaserBlock as unknown as RenderableBlockComponent
    case 'pricingTable':
      return (await import('@/blocks/PricingTable/Component'))
        .PricingTableBlock as unknown as RenderableBlockComponent
    case 'radialOrbitalTimeline':
      return (await import('@/blocks/RadialOrbitalTimeline/Component'))
        .RadialOrbitalTimelineBlock as unknown as RenderableBlockComponent
    case 'whyWorkWithMe':
      return (await import('@/blocks/WhyWorkWithMe/Component'))
        .WhyWorkWithMeBlock as unknown as RenderableBlockComponent
    default:
      return null
  }
}
