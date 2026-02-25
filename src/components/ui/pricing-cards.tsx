'use client'

import Link from 'next/link'
import React from 'react'
import { Check, MoveRight, PhoneCall } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/utilities/ui'

export interface PricingCardFeature {
  title: string
  description?: string
}

export interface PricingCardPlan {
  name: string
  description?: string
  price: string
  period?: string
  features: PricingCardFeature[]
  buttonText: string
  href: string
  isHighlighted?: boolean
  buttonIcon?: 'arrow' | 'phone'
}

export interface PricingCardsProps {
  badge?: string
  title?: string
  description?: string
  plans?: PricingCardPlan[]
}

const defaultPlans: PricingCardPlan[] = [
  {
    name: 'Startup',
    description:
      'Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.',
    price: '40',
    period: 'month',
    features: [
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
    ],
    buttonText: 'Sign up today',
    href: '/sign-up',
    isHighlighted: false,
    buttonIcon: 'arrow',
  },
  {
    name: 'Growth',
    description:
      'Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.',
    price: '40',
    period: 'month',
    features: [
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
    ],
    buttonText: 'Sign up today',
    href: '/sign-up',
    isHighlighted: true,
    buttonIcon: 'arrow',
  },
  {
    name: 'Enterprise',
    description:
      'Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.',
    price: '40',
    period: 'month',
    features: [
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
      { title: 'Fast and reliable', description: "We've made it fast and reliable." },
    ],
    buttonText: 'Book a meeting',
    href: '/contact',
    isHighlighted: false,
    buttonIcon: 'phone',
  },
]

export function PricingCards({
  badge = 'Pricing',
  title = 'Prices that make sense!',
  description = 'Managing a small business today is already tough.',
  plans = defaultPlans,
}: PricingCardsProps) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge>{badge}</Badge>
          <div className="flex flex-col gap-2">
            <h2 className="max-w-xl text-center text-3xl font-normal tracking-tighter md:text-5xl">
              {title}
            </h2>
            <p className="max-w-xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 pt-20 text-left lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  'w-full rounded-md',
                  plan.isHighlighted && 'shadow-2xl',
                )}
              >
                <CardHeader>
                  <CardTitle>
                    <span className="flex flex-row items-center gap-4 font-normal">
                      {plan.name}
                    </span>
                  </CardTitle>
                  {plan.description && (
                    <CardDescription>{plan.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-start gap-8">
                    <p className="flex flex-row items-center gap-2 text-xl">
                      <span className="text-4xl">${plan.price}</span>
                      {plan.period && (
                        <span className="text-sm text-muted-foreground">
                          {' '}
                          / {plan.period}
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col justify-start gap-4">
                      {plan.features?.map((feature, idx) => (
                        <div key={idx} className="flex flex-row gap-4">
                          <Check className="mt-2 h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <p>{feature.title}</p>
                            {feature.description && (
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant={plan.isHighlighted ? 'default' : 'outline'}
                      className="gap-4"
                      asChild
                    >
                      <Link href={plan.href || '#'}>
                        {plan.buttonText}
                        {plan.buttonIcon === 'phone' ? (
                          <PhoneCall className="h-4 w-4" />
                        ) : (
                          <MoveRight className="h-4 w-4" />
                        )}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
