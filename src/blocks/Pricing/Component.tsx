'use client'

import React from 'react'

import { Pricing } from '@/components/blocks/pricing'

// Konkreter Typ kommt nach payload generate:types (PricingBlock)
type PricingBlockProps = any

export const PricingBlockComponent: React.FC<PricingBlockProps> = (props) => {
  const { title, description, plans } = props ?? {}

  const mappedPlans =
    Array.isArray(plans) && plans.length > 0
      ? plans.map((plan: any) => ({
          name: plan.name ?? '',
          price: String(plan.price ?? '0'),
          yearlyPrice: String(plan.yearlyPrice ?? plan.price ?? '0'),
          period: plan.period ?? 'per month',
          features: Array.isArray(plan.features)
            ? plan.features.map((f: any) => String(f.feature ?? '')).filter(Boolean)
            : [],
          description: plan.description ?? '',
          buttonText: plan.buttonText ?? 'Get started',
          href: plan.href ?? '/contact',
          isPopular: Boolean(plan.isPopular),
        }))
      : undefined

  return (
    <Pricing
      title={title}
      description={description}
      plans={mappedPlans ?? []}
    />
  )
}

