'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'

import type { ServicesGridBlock as ServicesGridBlockData } from '@/payload-types'

type ServicesGridProps = ServicesGridBlockData & { disableInnerContainer?: boolean }

const normalizeServiceSlug = (slug?: string | null): string => {
  const raw = slug?.trim() ?? ''
  const normalized = raw.replace(/^\/+|\/+$/g, '')
  return normalized
}

const normalizeIconInput = (raw?: string | null): string =>
  String(raw ?? '').trim().replace(/^lucide[-_: ]*/i, '')

const toPascalCase = (value: string): string =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const getIconFromName = (name?: string | null): LucideIcon => {
  const raw = normalizeIconInput(name)
  if (!raw) return LucideIcons.CircleHelp

  const normalizedTokenized = raw.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  const lower = normalizedTokenized.toLowerCase()
  const kebab = lower.replace(/[_\s]+/g, '-')
  const pascalFromRaw = toPascalCase(normalizedTokenized)
  const pascalFromKebab = toPascalCase(kebab)
  const compact = kebab.replace(/-/g, '')
  const candidates = [
    raw,
    normalizedTokenized,
    lower,
    kebab,
    pascalFromRaw,
    pascalFromKebab,
    compact,
  ]

  const iconSource = LucideIcons as Record<string, unknown>

  for (const key of candidates) {
    const maybeIcon = iconSource[key]
    if (typeof maybeIcon === 'function' || typeof maybeIcon === 'object') {
      return maybeIcon as LucideIcon
    }
  }

  return LucideIcons.CircleHelp
}

const getRadialStyles = (variant?: string): React.CSSProperties => {
  switch (variant) {
    case 'blue':
      return {
        background:
          'radial-gradient(68% 54% at 14% 16%, hsl(var(--foreground) / 0.26) 0%, hsl(var(--foreground) / 0.16) 38%, transparent 78%), radial-gradient(92% 82% at 84% 84%, hsl(var(--foreground) / 0.12) 0%, transparent 76%)',
      }
    case 'orange':
      return {
        background:
          'radial-gradient(68% 54% at 86% 16%, hsl(var(--foreground) / 0.26) 0%, hsl(var(--foreground) / 0.16) 38%, transparent 78%), radial-gradient(92% 82% at 16% 84%, hsl(var(--foreground) / 0.12) 0%, transparent 76%)',
      }
    default:
      return {
        background:
          'radial-gradient(72% 56% at 50% 14%, hsl(var(--foreground) / 0.24) 0%, hsl(var(--foreground) / 0.14) 40%, transparent 80%), radial-gradient(90% 82% at 50% 86%, hsl(var(--foreground) / 0.12) 0%, transparent 76%)',
      }
  }
}

const getIntroImageAspectRatio = (resource: MediaType | null | undefined): string => {
  const width = Number(resource?.width)
  const height = Number(resource?.height)

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return '4 / 3'
  }

  const ratio = Math.min(1.8, Math.max(0.75, width / height))
  return `${ratio.toFixed(3)} / 1`
}

const isSvgIntroImage = (
  media: ServicesGridBlockData['introImage'],
  src: string | null,
): boolean => {
  if (typeof media === 'object' && media && 'mimeType' in media) {
    const mimeType = String(media.mimeType ?? '').toLowerCase()
    if (mimeType.includes('svg')) return true
  }

  if (typeof src === 'string' && /\.svg(?:$|\?)/i.test(src)) return true
  return false
}

export const ServicesGridBlock: React.FC<ServicesGridProps> = ({
  heading,
  intro,
  tagline,
  introIconList,
  introImage,
  introImagePosition = 'left',
  radialBackground,
  radialBackgroundVariant,
  categories,
}) => {
  const servicesData = categories ?? []
  const introImageSrc = resolveHeroImageSrc(introImage)
  const hasIntroImage = Boolean(introImageSrc)
  const introImageIsSvg = isSvgIntroImage(introImage, introImageSrc)
  const hasIconList = Array.isArray(introIconList) && introIconList.length > 0
  const introLayoutClass =
    introImagePosition === 'left'
      ? 'lg:grid-cols-[auto_minmax(0,1fr)]'
      : 'lg:grid-cols-[minmax(0,1fr)_auto]'
  const taglineLines =
    typeof tagline === 'string' && tagline.trim()
      ? tagline.split('\n').filter((l) => l.trim())
      : []

  return (
    <section
      aria-label="Leistungen"
      className={cn('relative w-full min-w-0 overflow-visible py-16')}
    >
      {radialBackground ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-24 -inset-y-20 z-0 opacity-95 blur-[42px]"
            style={getRadialStyles(radialBackgroundVariant ?? 'default')}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-55"
            style={{
              background:
                'radial-gradient(110% 78% at 50% 18%, hsl(var(--foreground) / 0.12), transparent 74%)',
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 container">
        {(heading || intro || tagline || hasIconList || hasIntroImage) && (
          <div className={cn('mx-auto grid items-start gap-8', hasIntroImage && introLayoutClass)}>
            <div className="min-w-0 lg:max-w-2xl">
              {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
              {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
              {taglineLines.length > 0 && (
                <div className="mt-4 border-l-2 border-primary pl-4">
                  {taglineLines.map((line, i) => (
                    <p
                      key={i}
                      className={cn(
                        'text-sm font-medium leading-relaxed text-foreground/80 md:text-base',
                        i < taglineLines.length - 1 && 'mb-1',
                      )}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {hasIconList ? (
                <ul className="mt-6 space-y-3">
                  {introIconList?.map((item, idx) => {
                    const Icon = getIconFromName(item.icon)
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/40 text-primary"
                          aria-hidden
                        >
                          <Icon className="size-[1.125rem]" strokeWidth={2} />
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {item.text}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>

            {hasIntroImage ? (
              <div
                className="relative w-full max-w-[min(34rem,92vw)] shrink-0 overflow-hidden"
                style={{ aspectRatio: getIntroImageAspectRatio(introImage as MediaType) }}
              >
                <img
                  src={introImageSrc || ''}
                  alt={
                    typeof introImage === 'object' && introImage && 'alt' in introImage
                      ? String(introImage.alt || heading || 'Einleitungsbild')
                      : String(heading || 'Einleitungsbild')
                  }
                  className={cn(
                    'services-grid-intro-image h-full w-full object-contain',
                    introImageIsSvg && 'services-grid-intro-image--svg',
                  )}
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-16 space-y-16">
          {servicesData.map((category, catIndex) => (
            <div
              key={catIndex}
              className="grid grid-cols-1 gap-6 bg-transparent md:grid-cols-[auto_1fr] md:items-stretch md:gap-8"
            >
              <div className="hidden md:flex md:justify-center">
                <span className="inline-flex rotate-180 items-center justify-center text-xs font-bold uppercase tracking-[0.2em] text-primary/80 [writing-mode:vertical-rl] [text-orientation:mixed]">
                  {category.categoryLabel}
                </span>
              </div>

              <div className="space-y-6">
                <div className="md:hidden">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                    {category.categoryLabel}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.services?.map((service, index) => {
                    const slug = normalizeServiceSlug(service.link?.slug)
                    const href = slug ? `/${slug}` : undefined
                    const content = (
                      <div
                        className={cn(
                          'group block space-y-4 rounded-xl border p-5 shadow-sm backdrop-blur-[1px] transition hover:-translate-y-1 hover:shadow-xl',
                          service.featured
                            ? 'border-primary/35 bg-primary/14 text-foreground'
                            : 'border-border/80 bg-card/92 text-card-foreground',
                        )}
                      >
                        <div className="flex items-end gap-3">
                          <div className="services-grid-card-icon-wrap relative h-12 w-12 shrink-0 self-end overflow-hidden">
                            {service.icon?.url ? (
                              <Image
                                src={service.icon.url}
                                alt={service.icon.alt ?? service.title}
                                fill
                                className="services-grid-card-icon-img object-contain"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                {service.icon?.alt ?? 'Icon'}
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Mehr erfahren <LucideIcons.ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    )

                    return href ? (
                      <Link key={index} href={href} className="block">
                        {content}
                      </Link>
                    ) : (
                      <div key={index}>{content}</div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
