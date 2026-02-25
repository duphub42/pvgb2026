'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Check, Star } from 'lucide-react'
import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

interface PricingPlan {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
}

export interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
}

export const Pricing: React.FC<PricingProps> = ({
  plans,
  title = 'Simple, Transparent Pricing',
  description = 'Choose the plan that works for you.\nAll plans include access to our platform, lead generation tools, and dedicated support.',
}) => {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <div className="container py-20">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        <p className="whitespace-pre-line text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="mb-10 flex items-center justify-center gap-3 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setIsMonthly(true)}
          className={cn(
            'rounded-full px-3 py-1 transition-colors',
            isMonthly ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setIsMonthly(false)}
          className={cn(
            'rounded-full px-3 py-1 transition-colors',
            !isMonthly ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          Annual <span className="text-xs text-primary-foreground/80">(Save 20%)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{
              y: plan.isPopular ? -10 : 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
              damping: 24,
            }}
            className={cn(
              'relative flex flex-col rounded-2xl border bg-background p-6 text-center',
              plan.isPopular ? 'border-primary border-2 shadow-lg shadow-primary/20' : 'border-border',
            )}
          >
            {plan.isPopular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                <Star className="mr-1 h-3 w-3 fill-current" />
                Popular
              </div>
            )}

            <p className="text-base font-semibold text-muted-foreground">{plan.name}</p>

            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                ${isMonthly ? plan.price : plan.yearlyPrice}
              </span>
              {plan.period !== 'Next 3 months' && (
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {isMonthly ? 'billed monthly' : 'billed annually'}
            </p>

            <ul className="mt-5 flex flex-col gap-2 text-sm text-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-left">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <hr className="my-4 w-full" />

            <Link
              href={plan.href}
              className={cn(
                buttonVariants({
                  variant: plan.isPopular ? 'default' : 'outline',
                  size: 'lg',
                }),
                'w-full',
              )}
            >
              {plan.buttonText}
            </Link>

            <p className="mt-6 text-xs leading-5 text-muted-foreground">{plan.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const demoPlans: PricingPlan[] = [
  {
    name: 'STARTER',
    price: '50',
    yearlyPrice: '40',
    period: 'per month',
    features: [
      'Up to 10 projects',
      'Basic analytics',
      '48-hour support response time',
      'Limited API access',
      'Community support',
    ],
    description: 'Perfect for individuals and small projects',
    buttonText: 'Start Free Trial',
    href: '/sign-up',
    isPopular: false,
  },
  {
    name: 'PROFESSIONAL',
    price: '99',
    yearlyPrice: '79',
    period: 'per month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      '24-hour support response time',
      'Full API access',
      'Priority support',
      'Team collaboration',
      'Custom integrations',
    ],
    description: 'Ideal for growing teams and businesses',
    buttonText: 'Get Started',
    href: '/sign-up',
    isPopular: true,
  },
  {
    name: 'ENTERPRISE',
    price: '299',
    yearlyPrice: '239',
    period: 'per month',
    features: [
      'Everything in Professional',
      'Custom solutions',
      'Dedicated account manager',
      '1-hour support response time',
      'SSO Authentication',
      'Advanced security',
      'Custom contracts',
      'SLA agreement',
    ],
    description: 'For large organizations with specific needs',
    buttonText: 'Contact Sales',
    href: '/contact',
    isPopular: false,
  },
]

export const PricingBasic: React.FC = () => {
  return (
    <div className="h-[800px] overflow-y-auto rounded-lg border">
      <Pricing plans={demoPlans} />
    </div>
  )
}

