import React from 'react'

import { PricingCards } from '@/components/ui/pricing-cards'
import type { PricingCardPlan } from '@/components/ui/pricing-cards'

type PricingCardsBlockProps = any

function mapPlan(plan: any): PricingCardPlan {
  const features = Array.isArray(plan?.features)
    ? plan.features.map((f: any) => ({
        title: String(f?.title ?? ''),
        description: f?.description ? String(f.description) : undefined,
      }))
    : []
  return {
    name: String(plan?.name ?? ''),
    description: plan?.description ? String(plan.description) : undefined,
    price: String(plan?.price ?? '0'),
    period: plan?.period ? String(plan.period) : undefined,
    features,
    buttonText: String(plan?.buttonText ?? 'Get started'),
    href: String(plan?.href ?? '#'),
    isHighlighted: Boolean(plan?.isHighlighted),
    buttonIcon: plan?.buttonIcon === 'phone' ? 'phone' : 'arrow',
  }
}

export const PricingCardsBlock: React.FC<PricingCardsBlockProps> = (props) => {
  const { badge, title, description, plans } = props ?? {}
  const mappedPlans = Array.isArray(plans) && plans.length > 0 ? plans.map(mapPlan) : undefined
  return (
    <PricingCards
      badge={badge}
      title={title}
      description={description}
      plans={mappedPlans}
    />
  )
}
