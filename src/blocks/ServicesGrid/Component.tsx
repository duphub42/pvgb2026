'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Clock3,
  Database,
  DraftingCompass,
  Fingerprint,
  Heart,
  IdCard,
  Mail,
  PlayCircle,
  Settings2,
  Shield,
  Sparkles,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'

import type { ServicesGridBlock as ServicesGridBlockData } from '@/payload-types'

type ServicesGridProps = ServicesGridBlockData & { disableInnerContainer?: boolean }
type RadialStrength = 'subtle' | 'medium' | 'strong'

const normalizeServiceSlug = (slug?: string | null): string => {
  const raw = slug?.trim() ?? ''
  return raw.replace(/^\/+|\/+$/g, '')
}

const buildServiceHref = (slug?: string | null): string | undefined => {
  const normalized = normalizeServiceSlug(slug)
  if (!normalized) return undefined
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) return normalized
  if (normalized.startsWith('/')) return normalized
  if (normalized.includes('/')) return `/${normalized}`
  return `/leistungen/${normalized}`
}

const normalizeIconInput = (raw?: string | null): string =>
  String(raw ?? '')
    .trim()
    .replace(/^lucide[-_: ]*/i, '')

const INTRO_ICON_MAP: Record<string, LucideIcon> = {
  activity: Activity,
  barchart: BarChart3,
  barchart3: BarChart3,
  bookopen: BookOpen,
  chart: BarChart3,
  clock: Clock3,
  clock3: Clock3,
  database: Database,
  draftingcompass: DraftingCompass,
  fingerprint: Fingerprint,
  heart: Heart,
  idcard: IdCard,
  mail: Mail,
  playcircle: PlayCircle,
  settings2: Settings2,
  shield: Shield,
  sparkles: Sparkles,
  truck: Truck,
  users: Users,
  zap: Zap,
}

const getIconFromName = (name?: string | null): LucideIcon => {
  const raw = normalizeIconInput(name).replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  if (!raw) return CircleHelp
  const compactKey = raw.toLowerCase().replace(/[^a-z0-9]+/g, '')
  return INTRO_ICON_MAP[compactKey] ?? CircleHelp
}

const strengthMultiplier: Record<RadialStrength, number> = {
  subtle: 0.78,
  medium: 1,
  strong: 1.28,
}

const getStrengthClassNames = (strength: RadialStrength) => {
  switch (strength) {
    case 'subtle':
      return {
        glowOpacity: 'opacity-70',
        glowBlur: 'blur-[60px]',
        baseOpacity: 'opacity-35',
      }
    case 'strong':
      return {
        glowOpacity: 'opacity-100',
        glowBlur: 'blur-[34px]',
        baseOpacity: 'opacity-72',
      }
    default:
      return {
        glowOpacity: 'opacity-95',
        glowBlur: 'blur-[42px]',
        baseOpacity: 'opacity-55',
      }
  }
}

const p = (base: number, mult: number): string =>
  `${Math.max(0, Math.min(95, base * mult)).toFixed(1)}%`

const getRadialStyles = (
  variant: string | undefined,
  strength: RadialStrength,
): React.CSSProperties => {
  const m = strengthMultiplier[strength] ?? 1

  switch (variant) {
    case 'blue':
      return {
        background: `radial-gradient(68% 54% at 14% 16%, color-mix(in srgb, var(--theme-elevation-1000) ${p(26, m)}, transparent) 0%, color-mix(in srgb, var(--theme-elevation-900) ${p(16, m)}, transparent) 38%, transparent 78%), radial-gradient(92% 82% at 84% 84%, color-mix(in srgb, var(--theme-elevation-900) ${p(12, m)}, transparent) 0%, transparent 76%)`,
      }
    case 'orange':
      return {
        background: `radial-gradient(68% 54% at 86% 16%, color-mix(in srgb, var(--theme-elevation-1000) ${p(26, m)}, transparent) 0%, color-mix(in srgb, var(--theme-elevation-900) ${p(16, m)}, transparent) 38%, transparent 78%), radial-gradient(92% 82% at 16% 84%, color-mix(in srgb, var(--theme-elevation-900) ${p(12, m)}, transparent) 0%, transparent 76%)`,
      }
    default:
      return {
        background: `radial-gradient(72% 56% at 50% 14%, color-mix(in srgb, var(--theme-elevation-1000) ${p(24, m)}, transparent) 0%, color-mix(in srgb, var(--theme-elevation-900) ${p(14, m)}, transparent) 40%, transparent 80%), radial-gradient(90% 82% at 50% 86%, color-mix(in srgb, var(--theme-elevation-900) ${p(12, m)}, transparent) 0%, transparent 76%)`,
      }
  }
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
  radialBackgroundStrength,
  categories,
}) => {
  const servicesData = categories ?? []
  const introImageSrc = resolveHeroImageSrc(introImage)
  const hasIntroImage = Boolean(introImageSrc)
  const introImageIsSvg = isSvgIntroImage(introImage, introImageSrc)
  const hasIconList = Array.isArray(introIconList) && introIconList.length > 0
  const effectiveStrength: RadialStrength =
    radialBackgroundStrength === 'subtle' || radialBackgroundStrength === 'strong'
      ? radialBackgroundStrength
      : 'medium'
  const radialClasses = getStrengthClassNames(effectiveStrength)
  const introLayoutClass = introImagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
  const introImagePopoutClass =
    introImagePosition === 'right' ? 'lg:translate-x-20 lg:-translate-y-4' : 'lg:-translate-y-4'
  const taglineLines =
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []

  return (
    <section
      aria-label="Leistungen"
      className={cn(
        'relative w-full min-w-0 overflow-x-clip overflow-y-visible py-16 lg:pt-24',
        effectiveStrength === 'subtle' && 'services-grid-radial-subtle',
      )}
    >
      {radialBackground ? (
        <>
          <div
            aria-hidden
            className={cn(
              'services-grid-radial-glow pointer-events-none absolute -inset-x-24 -inset-y-20 z-0',
              radialClasses.glowOpacity,
              radialClasses.glowBlur,
            )}
            style={getRadialStyles(radialBackgroundVariant ?? 'default', effectiveStrength)}
          />
          <div
            aria-hidden
            className={cn(
              'services-grid-radial-base pointer-events-none absolute inset-0 z-0',
              radialClasses.baseOpacity,
            )}
            style={{
              background: `radial-gradient(110% 78% at 50% 18%, color-mix(in srgb, var(--theme-elevation-1000) ${p(12, strengthMultiplier[effectiveStrength])}, transparent) 0%, transparent 74%)`,
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 container">
        {(heading || intro || tagline || hasIconList || hasIntroImage) && (
          <div
            className={cn(
              'mx-auto grid items-stretch',
              hasIntroImage ? 'gap-5 lg:gap-6 lg:flex lg:items-stretch' : 'gap-8',
              hasIntroImage && introLayoutClass,
            )}
          >
            <div className={cn('min-w-0 lg:max-w-3xl', hasIntroImage && 'lg:flex-1 lg:max-w-none')}>
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
                className={cn(
                  'relative flex w-full max-w-none shrink-0 items-center justify-center overflow-visible min-h-0 transition-transform duration-500 ease-out lg:w-[36rem] lg:min-w-[36rem] lg:max-w-[36rem]',
                  introImagePopoutClass,
                )}
              >
                <div aria-hidden className="services-grid-intro-grid absolute inset-0 z-0" />
                <img
                  src={introImageSrc || ''}
                  alt={
                    typeof introImage === 'object' && introImage && 'alt' in introImage
                      ? String(introImage.alt || heading || 'Einleitungsbild')
                      : String(heading || 'Einleitungsbild')
                  }
                  className={cn(
                    'services-grid-intro-image relative z-10 block h-auto w-full object-contain object-center',
                    introImageIsSvg && 'services-grid-intro-image--svg',
                  )}
                  style={{ objectPosition: '50% 50%' }}
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
                    const href = buildServiceHref(service.link?.slug)
                    const content = (
                      <div
                        className={cn(
                          'services-grid-card group block space-y-4 rounded-xl border p-5 shadow-sm backdrop-blur-[1px] transition hover:-translate-y-1 hover:shadow-xl',
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
                          Mehr erfahren <ChevronRight className="h-3 w-3" />
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
