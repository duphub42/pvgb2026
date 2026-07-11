'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { BlockContainer } from '@/components/BlockContainer'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import { Badge } from '@/components/ui/badge'
import type { PortfolioTeaserBlock as PortfolioTeaserBlockData } from '@/payload-types'

type PortfolioTeaserProps = PortfolioTeaserBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

type Discipline = 'webdesign' | 'marketing' | 'branding'

const disciplineConfig: Record<
  Discipline,
  { label: string; iconSrc: string; accent: string; bgAccent: string }
> = {
  webdesign: {
    label: 'Webdesign',
    iconSrc: '/api/media/file/portfolio-2.svg',
    accent: 'text-muted-foreground',
    bgAccent: 'bg-card border-border',
  },
  marketing: {
    label: 'Marketing',
    iconSrc: '/api/media/file/marketing-portfolio-1.svg',
    accent: 'text-muted-foreground',
    bgAccent: 'bg-card border-border',
  },
  branding: {
    label: 'Branding',
    iconSrc: '/api/media/file/Branding-Portfolio.svg',
    accent: 'text-muted-foreground',
    bgAccent: 'bg-card border-border',
  },
}

type AreaItem = NonNullable<PortfolioTeaserBlockData['areas']>[number]

function DisciplineIcon({ src, className }: { src: string; className?: string }) {
  const maskStyle = {
    WebkitMask: `url(${src}) center / contain no-repeat`,
    mask: `url(${src}) center / contain no-repeat`,
  } as React.CSSProperties

  return (
    <span
      aria-hidden="true"
      className={cn('block shrink-0 bg-current', className)}
      style={maskStyle}
    />
  )
}

// ---------------------------------------------------------------------------
// Editorial variant – large alternating rows
// ---------------------------------------------------------------------------

function EditorialCard({ area, index: cardIndex }: { area: AreaItem; index: number }) {
  const disc = (area.discipline ?? 'webdesign') as Discipline
  const config = disciplineConfig[disc] ?? disciplineConfig.webdesign
  const isEven = cardIndex % 2 === 0
  const href = area.href ?? '#'

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-6 overflow-hidden rounded-2xl border',
        'lg:flex-row lg:items-stretch',
        !isEven && 'lg:flex-row-reverse',
        config.bgAccent,
        'transition-shadow duration-300 hover:shadow-lg',
      )}
    >
      {/* Cover image */}
      {area.coverImage && (
        <div className="relative min-h-[220px] w-full shrink-0 overflow-hidden lg:w-[44%]">
          <Media resource={area.coverImage} imgClassName="h-full w-full object-cover" fill />
        </div>
      )}

      {/* Text content */}
      <div
        className={cn(
          'flex flex-1 flex-col justify-center gap-4 p-6 md:p-8',
          !area.coverImage && 'lg:py-12',
        )}
      >
        {/* Discipline badge */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg border bg-background/60',
              config.accent,
            )}
          >
            <DisciplineIcon src={config.iconSrc} className="h-4 w-4" />
          </span>
          <span className={cn('text-xs font-semibold uppercase tracking-widest', config.accent)}>
            {config.label}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {area.title}
        </h3>

        {area.description && (
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
            {area.description}
          </p>
        )}

        {area.tags && area.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {area.tags.map((tag) => (
              <Badge key={tag.id ?? tag.label} variant="secondary" className="text-xs font-medium">
                {tag.label}
              </Badge>
            ))}
          </div>
        )}

        <Link
          href={href}
          className={cn(
            'mt-2 inline-flex items-center gap-2 text-sm font-semibold',
            config.accent,
            'transition-gap group-hover:gap-3 duration-200',
          )}
        >
          {area.ctaLabel ?? 'Cases ansehen'}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Cards variant – responsive 3-column grid
// ---------------------------------------------------------------------------

function TeaserCard({ area }: { area: AreaItem }) {
  const disc = (area.discipline ?? 'webdesign') as Discipline
  const config = disciplineConfig[disc] ?? disciplineConfig.webdesign
  const href = area.href ?? '#'

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border',
        config.bgAccent,
        'transition-shadow duration-300 ease-out hover:shadow-lg',
      )}
    >
      <div className="flex h-full flex-col transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-0.5">
      {/* Cover image */}
      {area.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Media
            resource={area.coverImage}
            imgClassName="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            fill
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flow-root">
          <span
            className={cn(
              'float-right mb-2 ml-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-background/60',
              config.accent,
            )}
          >
            <DisciplineIcon
              src={config.iconSrc}
              className="h-8 w-8 transition-opacity duration-300 ease-out group-hover:opacity-80"
            />
          </span>
          <span
            className={cn(
              'block text-xs font-semibold uppercase tracking-widest',
              config.accent,
            )}
          >
            {config.label}
          </span>

          <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">{area.title}</h3>
        </div>

        {area.description && (
          <p className="order-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {area.description}
          </p>
        )}

        {area.tags && area.tags.length > 0 && (
          <div className="order-4 flex flex-wrap gap-1 pt-1 sm:order-3">
            {area.tags.slice(0, 5).map((tag) => (
              <Badge
                key={tag.id ?? tag.label}
                variant="secondary"
                className="text-[10px] font-medium"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        )}

        <div
          className={cn(
            'order-3 flex border-t border-border/60 pt-3 sm:order-4 sm:mt-auto',
            config.accent,
          )}
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            {area.ctaLabel ?? 'Cases ansehen'}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const PortfolioTeaserBlock: React.FC<PortfolioTeaserProps> = (props) => {
  const { eyebrow, heading, intro, variant = 'cards', areas, index = 0, ...styleProps } = props

  const styles = styleProps as unknown as BlockStyles

  return (
    <BlockContainer styles={styles} index={index}>
      <div className="w-full space-y-10">
        {/* Header */}
        {(eyebrow || heading || intro) && (
          <div className="max-w-2xl space-y-3">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}

        {/* Area cards */}
        {areas && areas.length > 0 && (
          <>
            {variant === 'editorial' ? (
              <div className="space-y-6">
                {(areas as AreaItem[]).map((area, i) => (
                  <EditorialCard key={area.id ?? i} area={area} index={i} />
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  'grid gap-6',
                  areas.length === 1
                    ? 'grid-cols-1'
                    : areas.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {(areas as AreaItem[]).map((area, i) => (
                  <TeaserCard key={area.id ?? i} area={area} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </BlockContainer>
  )
}
