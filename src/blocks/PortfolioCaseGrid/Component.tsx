import Link from 'next/link'
import {
  ArrowUpRight,
  Layers3,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type {
  Media as MediaType,
  PortfolioCaseGridBlock as PortfolioCaseGridBlockData,
} from '@/payload-types'
import { cn } from '@/utilities/ui'

type PortfolioCaseGridProps = PortfolioCaseGridBlockData & { disableInnerContainer?: boolean }

type Discipline = 'webdesign' | 'marketing' | 'branding' | 'mixed'

const disciplineMeta: Record<
  Discipline,
  {
    label: string
    icon: LucideIcon
  }
> = {
  webdesign: {
    label: 'Webdesign',
    icon: MonitorSmartphone,
  },
  marketing: {
    label: 'Marketing',
    icon: Megaphone,
  },
  branding: {
    label: 'Branding',
    icon: Palette,
  },
  mixed: {
    label: 'Interdisziplinaer',
    icon: Layers3,
  },
}

const normalizeHref = (raw?: string | null): string | null => {
  const value = String(raw ?? '').trim()
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.startsWith('/')) return value
  return `/${value.replace(/^\/+/, '')}`
}

const isExternalHref = (href: string): boolean =>
  href.startsWith('http://') || href.startsWith('https://')

export const PortfolioCaseGridBlock: React.FC<PortfolioCaseGridProps> = ({
  eyebrow,
  heading,
  intro,
  layoutVariant = 'editorial',
  cases,
}) => {
  const rows = (cases ?? []).filter((item) => Boolean(item?.title && item?.summary))

  if (!rows.length) return null

  const sectionToneClass =
    layoutVariant === 'data'
      ? 'from-[rgb(var(--color-slate-950))/95] via-[rgb(var(--color-slate-900))/90] to-[rgb(var(--color-slate-950))/95] text-[rgb(var(--hero-process-text))]'
      : layoutVariant === 'visual'
        ? 'from-white via-[rgb(239,246,255)]/65 to-[rgb(255,251,235)]/60 text-[rgb(var(--color-slate-950))]'
        : 'from-[rgb(var(--color-slate-50))] via-white to-[rgb(var(--color-zinc-50))] text-[rgb(var(--color-slate-950))]'

  return (
    <section className="w-full py-16 md:py-20">
      <div
        className={cn(
          'container relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br px-6 py-8 shadow-[0_20px_70px_-40px_rgba(var(--color-slate-950),0.28)] md:px-10 md:py-12',
          sectionToneClass,
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          {eyebrow ? (
            <Badge
              variant="secondary"
              className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              <Sparkles className="size-3.5" />
              {eyebrow}
            </Badge>
          ) : null}
          {heading ? (
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{heading}</h2>
          ) : null}
          {intro ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-85 md:text-base">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="relative z-10 mt-8 grid gap-5 lg:grid-cols-2">
          {rows.map((item, index) => {
            const key = typeof item.id === 'string' && item.id ? item.id : `${item.title}-${index}`
            const discipline = (item.discipline ?? 'webdesign') as Discipline
            const meta = disciplineMeta[discipline] ?? disciplineMeta.webdesign
            const DisciplineIcon = meta.icon
            const href = normalizeHref(item.cta?.href)
            const ctaLabel = item.cta?.label?.trim() || 'Case ansehen'
            const tags = (item.tags ?? []).filter((tag) => tag?.label?.trim())
            const metrics = (item.metrics ?? []).filter(
              (metric) => metric?.value?.trim() && metric?.label?.trim(),
            )

            return (
              <article
                key={key}
                className={cn(
                  'group flex min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/80 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_20px_50px_-36px_rgba(var(--color-slate-950),0.55)]',
                  layoutVariant === 'data' && 'border-white/15 bg-white/5',
                  item.featured && 'lg:col-span-2',
                )}
              >
                {typeof item.coverImage === 'object' && item.coverImage ? (
                  <div className="relative h-44 w-full overflow-hidden md:h-56">
                    <Media
                      resource={item.coverImage as MediaType}
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-slate-950))]/45 via-transparent to-transparent" />
                  </div>
                ) : null}

                <div className="flex h-full flex-col px-5 pb-5 pt-5 md:px-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={item.featured ? 'primary' : 'secondary'}
                      className="gap-1.5 px-2.5 py-1 text-xs font-semibold"
                    >
                      <DisciplineIcon className="size-3.5" />
                      {meta.label}
                    </Badge>
                    {item.client ? (
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/90">
                        {item.client}
                      </span>
                    ) : null}
                    {item.industry ? (
                      <span className="text-xs text-muted-foreground/80">{item.industry}</span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-semibold leading-snug md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.summary}
                  </p>

                  {(item.challenge || item.approach || item.result) && (
                    <dl className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                      {item.challenge ? (
                        <div>
                          <dt className="font-semibold text-foreground/85">Challenge</dt>
                          <dd className="mt-1 leading-relaxed text-muted-foreground">
                            {item.challenge}
                          </dd>
                        </div>
                      ) : null}
                      {item.approach ? (
                        <div>
                          <dt className="font-semibold text-foreground/85">Vorgehen</dt>
                          <dd className="mt-1 leading-relaxed text-muted-foreground">
                            {item.approach}
                          </dd>
                        </div>
                      ) : null}
                      {item.result ? (
                        <div>
                          <dt className="font-semibold text-foreground/85">Ergebnis</dt>
                          <dd className="mt-1 leading-relaxed text-muted-foreground">
                            {item.result}
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  )}

                  {metrics.length > 0 ? (
                    <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                      {metrics.map((metric, metricIndex) => (
                        <div
                          key={
                            typeof metric.id === 'string' && metric.id
                              ? metric.id
                              : `${key}-metric-${metricIndex}`
                          }
                          className="rounded-lg border border-border/70 bg-background/70 px-3 py-2"
                        >
                          <p className="text-base font-semibold">{metric.value}</p>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {tags.map((tag, tagIndex) => (
                      <Badge
                        variant="secondary"
                        key={
                          typeof tag.id === 'string' && tag.id ? tag.id : `${key}-tag-${tagIndex}`
                        }
                        className="px-2.5 py-1 text-xs font-medium"
                      >
                        {tag.label}
                      </Badge>
                    ))}
                  </div>

                  {href ? (
                    <div className="mt-6">
                      {isExternalHref(href) ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          {ctaLabel}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          {ctaLabel}
                          <ArrowUpRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
