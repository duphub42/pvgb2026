import Link from 'next/link'
import React from 'react'
import { ArrowRight, Clock, Shield, Sparkles, Truck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

const iconMap = {
  sparkles: Sparkles,
  shield: Shield,
  truck: Truck,
  clock: Clock,
} as const

type Feature1BlockProps = any

export const Feature1Block: React.FC<Feature1BlockProps> = (props) => {
  const {
    className,
    badge,
    title,
    description,
    items,
    ctaLabel,
    ctaUrl,
  } = props ?? {}

  const resolvedBadge = badge && String(badge).trim() ? badge : 'Why Choose Us'
  const resolvedTitle =
    title && String(title).trim() ? title : 'Experience the Difference'
  const resolvedDescription =
    description && String(description).trim()
      ? description
      : 'Discover why thousands of customers trust us for their shopping needs. We combine quality, convenience, and exceptional service.'

  const features = Array.isArray(items) && items.length > 0 ? items : []
  const resolvedCtaLabel = ctaLabel && String(ctaLabel).trim() ? ctaLabel : 'Start Shopping'
  const resolvedCtaUrl = ctaUrl && String(ctaUrl).trim() ? ctaUrl : '#'

  return (
    <section
      className={cn(
        'container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8',
        className,
      )}
    >
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <Badge
          variant="secondary"
          className="mb-4 rounded-full px-4 py-1 font-medium"
        >
          {resolvedBadge}
        </Badge>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {resolvedTitle}
        </h2>
        <p className="text-pretty text-muted-foreground">{resolvedDescription}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {features.map(
          (
            item: {
              icon?: string
              title?: string
              description?: string
              linkLabel?: string
              linkUrl?: string
            },
            index: number,
          ) => {
            const Icon =
              iconMap[(item?.icon as keyof typeof iconMap) ?? 'sparkles'] ??
              Sparkles
            const linkLabel = item?.linkLabel?.trim() ? item.linkLabel : 'Learn more'
            const linkUrl = item?.linkUrl?.trim() ? item.linkUrl : '#'
            return (
              <article key={item?.title ?? index} className="group">
                <Card className="relative h-full overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="px-6">
                    <Badge
                      variant="secondary"
                      className="mb-4 inline-flex size-12 items-center justify-center"
                    >
                      <Icon className="!size-5" aria-hidden="true" />
                    </Badge>
                    <h3 className="mb-2 text-lg font-semibold">
                      {item?.title ?? ''}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {item?.description ?? ''}
                    </p>

                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto cursor-pointer !p-0 text-sm text-muted-foreground hover:text-foreground"
                      asChild
                    >
                      <Link href={linkUrl}>
                        {linkLabel}
                        <ArrowRight className="ms-1.5 size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            )
          },
        )}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" className="cursor-pointer rounded-lg !px-8" asChild>
          <Link href={resolvedCtaUrl}>
            {resolvedCtaLabel}
            <ArrowRight className="ms-2 size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
