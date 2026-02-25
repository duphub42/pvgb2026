import Link from 'next/link'
import React from 'react'
import { ArrowRight, BookOpen, PlayCircle, Rocket, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

const iconMap = {
  rocket: Rocket,
  zap: Zap,
  bookOpen: BookOpen,
  playCircle: PlayCircle,
  arrowRight: ArrowRight,
} as const

type CtaSection3BlockProps = {
  className?: string
  badgeIcon?: string | null
  badgeText?: string | null
  title?: string | null
  description?: string | null
  primaryButtonIcon?: string | null
  primaryButtonLabel?: string | null
  primaryButtonHref?: string | null
  secondaryButtonLabel?: string | null
  secondaryButtonHref?: string | null
  rightCards?: Array<{
    icon?: string | null
    title?: string | null
    description?: string | null
    href?: string | null
  }> | null
}

const defaultCards = [
  {
    icon: 'bookOpen' as const,
    title: 'Documentation',
    description:
      'Complete guides, API references, and best practices to get you started.',
    href: '#',
  },
  {
    icon: 'playCircle' as const,
    title: 'Video Tutorials',
    description:
      'Step-by-step video guides to help you master the platform quickly.',
    href: '#',
  },
]

export const CtaSection3Block: React.FC<CtaSection3BlockProps> = (props) => {
  const {
    className,
    badgeIcon = 'rocket',
    badgeText = 'Launch Your Success',
    title = 'Accelerate your digital transformation journey',
    description = 'Join thousands of innovative companies using our cutting-edge platform to automate workflows, boost team productivity, and deliver exceptional results faster than ever before.',
    primaryButtonIcon = 'zap',
    primaryButtonLabel = 'Start Free Trial',
    primaryButtonHref = '#',
    secondaryButtonLabel = 'Watch Demo',
    secondaryButtonHref = '#',
    rightCards,
  } = props ?? {}

  const BadgeIconComp =
    iconMap[(badgeIcon as keyof typeof iconMap) ?? 'rocket'] ?? Rocket
  const PrimaryIconComp =
    primaryButtonIcon && primaryButtonIcon !== 'none'
      ? (iconMap[(primaryButtonIcon as keyof typeof iconMap) ?? 'zap'] ?? Zap)
      : null

  const cards = Array.isArray(rightCards) && rightCards.length > 0 ? rightCards : defaultCards

  return (
    <section className={cn('py-8 lg:py-16', className)}>
      <div className="container mx-auto px-2 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="bg-card overflow-hidden border py-12">
            <CardContent className="gap-0 px-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <div className="space-y-6">
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground w-fit"
                    >
                      <BadgeIconComp className="me-2 size-3" />
                      {badgeText ?? 'Launch Your Success'}
                    </Badge>

                      <div className="space-y-4">
                      <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                        {title}
                      </h2>
                      <p className="text-muted-foreground lg:text-lg">
                        {description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="cursor-pointer px-8"
                        asChild
                      >
                        <Link href={primaryButtonHref ?? '#'}>
                          {PrimaryIconComp && (
                            <PrimaryIconComp className="me-2 size-4" />
                          )}
                          {primaryButtonLabel ?? 'Start Free Trial'}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="cursor-pointer px-8"
                        asChild
                      >
                        <Link href={secondaryButtonHref ?? '#'}>
                          {secondaryButtonLabel ?? 'Watch Demo'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {cards.map((card, index) => {
                    const CardIcon =
                      iconMap[
                        (card?.icon as keyof typeof iconMap) ?? 'bookOpen'
                      ] ?? BookOpen
                    const href = card?.href?.trim() ? card.href : '#'
                    return (
                      <Link key={card?.title ?? index} href={href}>
                        <Card className="group border-border cursor-pointer gap-2 transition-colors hover:bg-muted/50">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                                  <CardIcon className="text-primary size-5" />
                                </div>
                                <CardTitle className="text-base text-balance">
                                  {card?.title ?? ''}
                                </CardTitle>
                              </div>
                              <ArrowRight className="text-muted-foreground size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm">
                              {card?.description ?? ''}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
