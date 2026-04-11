import React from 'react'

import type { SitePage } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CalPopupBlock } from '@/blocks/CalPopup/Component.client'
import { ConsultingOverviewBlock } from '@/blocks/ConsultingOverview/Component'
import { ContactInfoCardsBlock } from '@/blocks/ContactInfoCards/Component'
import { BrandShowcaseBlock } from '@/blocks/BrandShowcase/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroMarketingBlock } from '@/blocks/HeroMarketing/Component'
import { IntroductionBlock } from '@/blocks/Introduction/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProfilBacherLegacyBlock } from '@/blocks/ProfilBacherLegacy/Component'
import { ProfilCtaBandBlock } from '@/blocks/ProfilCtaBand/Component'
import { ProfilKernkompetenzBlock } from '@/blocks/ProfilKernkompetenz/Component'
import { ProfilKompetenzenBlock } from '@/blocks/ProfilKompetenzen/Component'
import { ProfilLangZertBlock } from '@/blocks/ProfilLangZert/Component'
import { ProfilToolsBlock } from '@/blocks/ProfilTools/Component'
import { ProfilUeberMichBlock } from '@/blocks/ProfilUeberMich/Component'
import { ProfilWerdegangBlock } from '@/blocks/ProfilWerdegang/Component'
import { ProfilZahlenFaktenBlock } from '@/blocks/ProfilZahlenFakten/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { ServicesOverviewBlock } from '@/blocks/ServicesOverview/Component'
import { PortfolioCaseGridBlock } from '@/blocks/PortfolioCaseGrid/Component'
import { PortfolioKpiStripBlock } from '@/blocks/PortfolioKpiStrip/Component'
import { ShadcnBlockComponent } from '@/blocks/ShadcnBlock/Component'
import { WhyWorkWithMeBlock } from '@/blocks/WhyWorkWithMe/Component'

import { CLIENT_BLOCK_TYPES } from '@/blocks/clientBlockTypes'

type BlockComponent = React.ComponentType<Record<string, unknown>>

const blockComponents: Record<string, BlockComponent> = {
  consultingOverview: ConsultingOverviewBlock as unknown as BlockComponent,
  contactInfoCards: ContactInfoCardsBlock as unknown as BlockComponent,
  brandShowcase: BrandShowcaseBlock as unknown as BlockComponent,
  content: ContentBlock as unknown as BlockComponent,
  heroMarketing: HeroMarketingBlock as unknown as BlockComponent,
  introduction: IntroductionBlock as unknown as BlockComponent,
  cta: CallToActionBlock as unknown as BlockComponent,
  calPopup: CalPopupBlock as unknown as BlockComponent,
  formBlock: FormBlock as unknown as BlockComponent,
  mediaBlock: MediaBlock as unknown as BlockComponent,
  profilBacher: ProfilBacherLegacyBlock as unknown as BlockComponent,
  profilUeberMich: ProfilUeberMichBlock as unknown as BlockComponent,
  profilKernkompetenz: ProfilKernkompetenzBlock as unknown as BlockComponent,
  profilKompetenzen: ProfilKompetenzenBlock as unknown as BlockComponent,
  profilWerdegang: ProfilWerdegangBlock as unknown as BlockComponent,
  profilZahlenFakten: ProfilZahlenFaktenBlock as unknown as BlockComponent,
  profilTools: ProfilToolsBlock as unknown as BlockComponent,
  profilLangZert: ProfilLangZertBlock as unknown as BlockComponent,
  profilCtaBand: ProfilCtaBandBlock as unknown as BlockComponent,
  servicesOverview: ServicesOverviewBlock as unknown as BlockComponent,
  servicesGrid: ServicesGridBlock as unknown as BlockComponent,
  portfolioCaseGrid: PortfolioCaseGridBlock as unknown as BlockComponent,
  portfolioKpiStrip: PortfolioKpiStripBlock as unknown as BlockComponent,
  shadcnBlock: ShadcnBlockComponent as unknown as BlockComponent,
  whyWorkWithMe: WhyWorkWithMeBlock as unknown as BlockComponent,
}

export const SUPPORTED_BLOCK_TYPES = CLIENT_BLOCK_TYPES

type BlockWithStyle = NonNullable<SitePage['layout']>[number] & {
  blockBackground?: 'none' | 'muted' | 'accent' | 'light' | 'dark' | null
  blockOverlay?: {
    enabled?: boolean | null
    color?: 'dark' | 'light' | null
    opacity?: number | null
  } | null
}

export function BlockRenderer({ blockType, block }: { blockType: string; block: BlockWithStyle }) {
  const Block = blockComponents[blockType]
  if (!Block) return null
  return <Block {...(block as unknown as Record<string, unknown>)} disableInnerContainer />
}
