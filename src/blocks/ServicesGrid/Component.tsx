'use client'

import React from 'react'
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
  Megaphone,
  MousePointerClick,
  PlayCircle,
  Rocket,
  SearchCheck,
  Settings2,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import type { ServicesGridBlock as ServicesGridBlockData } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import { BlockContainer } from '@/components/BlockContainer'
import { ResilientImage } from '@/components/ui/resilient-image'

type ServicesGridProps = ServicesGridBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

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
  megaphone: Megaphone,
  mousepointerclick: MousePointerClick,
  playcircle: PlayCircle,
  rocket: Rocket,
  searchcheck: SearchCheck,
  settings2: Settings2,
  shield: Shield,
  sparkles: Sparkles,
  target: Target,
  trendingup: TrendingUp,
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

const getServiceFallbackIcon = (title?: string | null): LucideIcon => {
  const text = String(title ?? '').toLocaleLowerCase('de-DE')
  if (/webdesign/.test(text)) return DraftingCompass
  if (/print|grafik/.test(text)) return BookOpen
  if (/pr[aä]sentation|keynote/.test(text)) return PlayCircle
  if (/seo|ranking|sichtbarkeit|organic|relaunch/.test(text)) return SearchCheck
  if (/sem|sea|ads|anzeige|werbung|kampagne|paid/.test(text)) return Megaphone
  if (/lead|funnel|conversion|akquise/.test(text)) return Target
  if (/marketing|performance|kpi/.test(text)) return TrendingUp
  if (/content/.test(text)) return Sparkles
  if (/corporate|\bci\b/.test(text)) return IdCard
  if (/logo/.test(text)) return Fingerprint
  if (/markenstrategie|marke/.test(text)) return Users
  if (/automatisierung|workflow/.test(text)) return Zap
  return CircleHelp
}

const normalizeServiceIconUrl = (url?: string | null): string => {
  const src = String(url ?? '').trim()
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://')) return getMediaUrl(src)
  if (src.startsWith('/api/media/') || src.startsWith('/media/')) return getMediaUrl(src)
  if (/^[^/?#]+\.(?:svg|png|jpe?g|webp|gif|avif)(?:[?#].*)?$/i.test(src)) {
    return `/api/media/file/${src}`
  }
  return getMediaUrl(src)
}

const isSvgUrl = (src?: string | null): boolean => /\.svg(?:$|[?#])/i.test(String(src ?? ''))

const isTinyLoadedImage = (img: HTMLImageElement, src?: string | null): boolean => {
  if (isSvgUrl(src)) return img.naturalWidth <= 2 && img.naturalHeight <= 2
  return img.naturalWidth <= 2 && img.naturalHeight <= 2
}

type ServiceCardIconProps = {
  src?: string | null
  alt?: string | null
  title: string
  eager?: boolean
  forceFallback?: boolean
}

function ServiceCardIcon({
  src,
  alt,
  title,
  eager = false,
  forceFallback = false,
}: ServiceCardIconProps): React.JSX.Element {
  const cleanSrc = normalizeServiceIconUrl(src)
  const shouldStartWithImage = Boolean(cleanSrc) && !forceFallback
  const [useImage, setUseImage] = React.useState<boolean>(shouldStartWithImage)
  const imageRef = React.useRef<HTMLImageElement | null>(null)

  React.useEffect(() => {
    setUseImage(shouldStartWithImage)
  }, [shouldStartWithImage])

  React.useEffect(() => {
    const img = imageRef.current
    if (!useImage || !img || !img.complete) return
    if (isTinyLoadedImage(img, cleanSrc)) {
      setUseImage(false)
    }
  }, [cleanSrc, useImage])

  const FallbackIcon = getServiceFallbackIcon(title)

  if (useImage) {
    return (
      <ResilientImage
        ref={imageRef}
        src={cleanSrc}
        alt={String(alt ?? title)}
        className="services-grid-card-icon-img h-full w-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={(event) => {
          if (isTinyLoadedImage(event.currentTarget, cleanSrc)) {
            setUseImage(false)
          }
        }}
        onError={() => {
          setUseImage(false)
        }}
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
      <FallbackIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </div>
  )
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

export const ServicesGridBlock: React.FC<ServicesGridProps> = (props) => {
  const {
    heading,
    intro,
    tagline,
    introIconList,
    introImage,
    introImagePosition = 'left',
    radialBackground: _radialBackground,
    radialBackgroundVariant: _radialBackgroundVariant,
    radialBackgroundStrength: _radialBackgroundStrength,
    categories,
    disableInnerContainer,
    index = 0,
    ...styleProps
  } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles
  const blockStyles: BlockStyles = {
    ...styles,
    // Inhalt wird innen auf den Seitenstandard gesetzt.
    blockContainer: 'none',
    ...(disableInnerContainer
      ? {
          blockBackground: 'none',
          blockOverlay: { enabled: false },
          blockOverlayEnabled: false,
        }
      : null),
  }
  const servicesData = categories ?? []
  const isMarketingCaseTypes =
    typeof heading === 'string' &&
    heading.trim().toLocaleLowerCase('de-DE') === 'case-typen im marketing'
  const introImageSrc = resolveHeroImageSrc(introImage)
  const hasIntroImage = Boolean(introImageSrc)
  const introImageIsSvg = isSvgIntroImage(introImage, introImageSrc)
  const hasIconList = Array.isArray(introIconList) && introIconList.length > 0
  const eagerServiceIconUrls = (servicesData[0]?.services ?? [])
    .slice(0, 3)
    .map((service) => normalizeServiceIconUrl(service?.icon?.url))
    .filter(Boolean)
  const introLayoutClass = introImagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
  const introImagePopoutClass =
    introImagePosition === 'right' ? 'lg:translate-x-20 lg:-translate-y-4' : 'lg:-translate-y-4'
  const taglineLines =
    typeof tagline === 'string' && tagline.trim() ? tagline.split('\n').filter((l) => l.trim()) : []

  return (
    <BlockContainer
      styles={blockStyles}
      index={index}
      className="services-grid-root overflow-visible"
    >
      <div className="relative z-10 w-full services-grid-container overflow-visible">
        {eagerServiceIconUrls.length > 0 ? (
          <div aria-hidden="true" className="sr-only">
            {eagerServiceIconUrls.map((url) => (
              <link key={url} rel="preload" as="image" href={url} />
            ))}
          </div>
        ) : null}
        {(heading || intro || tagline || hasIconList || hasIntroImage) && (
          <div
            className={cn(
              'mx-auto grid items-stretch',
              hasIntroImage ? 'gap-5 lg:gap-6 lg:flex lg:items-stretch' : 'gap-8',
              hasIntroImage && introLayoutClass,
            )}
          >
            <div
              className={cn(
                'min-w-0',
                hasIntroImage ? 'lg:flex-1 lg:max-w-none' : 'w-full max-w-none',
              )}
            >
              {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
              {intro && (
                <p className="mt-4 whitespace-pre-line text-lg text-muted-foreground">{intro}</p>
              )}
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
              className={cn(
                'grid grid-cols-1 gap-6 bg-transparent',
                isMarketingCaseTypes
                  ? 'md:gap-6'
                  : 'md:grid-cols-[auto_1fr] md:items-stretch md:gap-8',
              )}
            >
              <div
                className={cn(
                  isMarketingCaseTypes
                    ? 'flex justify-start'
                    : 'hidden md:flex md:justify-center',
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center text-xs font-bold uppercase tracking-[0.2em] text-primary/80',
                    !isMarketingCaseTypes &&
                      'rotate-180 [writing-mode:vertical-rl] [text-orientation:mixed]',
                  )}
                >
                  {category.categoryLabel}
                </span>
              </div>

              <div className="space-y-6">
                <div className={cn('md:hidden', isMarketingCaseTypes && 'hidden')}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                    {category.categoryLabel}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.services?.map((service, index) => {
                    const href = buildServiceHref(service.link?.slug)
                    const shouldLoadEagerly = catIndex === 0 && index < 3
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
                            <ServiceCardIcon
                              src={service.icon?.url}
                              alt={service.icon?.alt}
                              title={service.title}
                              eager={shouldLoadEagerly}
                              forceFallback={isMarketingCaseTypes}
                            />
                          </div>
                          <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        <p className="line-clamp-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
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
    </BlockContainer>
  )
}
