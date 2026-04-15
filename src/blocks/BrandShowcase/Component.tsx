import { CheckCircle2 } from 'lucide-react'

import { Media } from '@/components/Media'
import type {
  BrandShowcaseBlock as BrandShowcaseBlockData,
  Media as MediaType,
} from '@/payload-types'
import { cn } from '@/utilities/ui'

type BrandShowcaseProps = BrandShowcaseBlockData & { disableInnerContainer?: boolean }

const normalizeHex = (raw?: string | null): string => {
  const value = String(raw ?? '').trim()
  if (/^#[0-9a-fA-F]{3}$/.test(value) || /^#[0-9a-fA-F]{6}$/.test(value)) return value
  if (/^[0-9a-fA-F]{3}$/.test(value) || /^[0-9a-fA-F]{6}$/.test(value)) return `#${value}`
  return '#CBD5E1'
}

export const BrandShowcaseBlock: React.FC<BrandShowcaseProps> = ({
  eyebrow,
  heading,
  intro,
  brandStory,
  logo,
  wordmark,
  palette,
  typography,
  principles,
  usageExamples,
}) => {
  const colorRows = (palette ?? []).filter((row) => Boolean(row?.name?.trim() && row?.hex?.trim()))
  const typeRows = (typography ?? []).filter((row) =>
    Boolean(row?.role?.trim() && row?.family?.trim()),
  )
  const principleRows = (principles ?? []).filter((row) =>
    Boolean(row?.title?.trim() && row?.description?.trim()),
  )
  const usageRows = (usageExamples ?? []).filter(
    (row) => typeof row?.image === 'object' && row.image,
  )

  return (
    <section className="w-full py-16 md:py-20">
      <div className="container rounded-3xl border border-border/70 bg-gradient-to-br from-zinc-50 via-white to-stone-50 px-6 py-8 md:px-10 md:py-12">
        <header className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{heading}</h2>
          ) : null}
          {intro ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="mt-8 grid gap-5 xl:grid-cols-12">
          <div className="space-y-5 xl:col-span-5">
            {(typeof logo === 'object' && logo) || (typeof wordmark === 'object' && wordmark) ? (
              <div className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Logosystem
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {typeof logo === 'object' && logo ? (
                    <div className="rounded-xl border border-border/60 bg-muted p-4">
                      <p className="mb-3 text-xs font-medium text-muted-foreground">Primary Logo</p>
                      <Media
                        resource={logo as MediaType}
                        className="h-24 w-full"
                        imgClassName="h-full w-full object-contain"
                      />
                    </div>
                  ) : null}
                  {typeof wordmark === 'object' && wordmark ? (
                    <div className="rounded-xl border border-border/60 bg-muted p-4">
                      <p className="mb-3 text-xs font-medium text-muted-foreground">Wordmark</p>
                      <Media
                        resource={wordmark as MediaType}
                        className="h-24 w-full"
                        imgClassName="h-full w-full object-contain"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {brandStory ? (
              <div className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Narrative
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {brandStory}
                </p>
              </div>
            ) : null}

            {principleRows.length > 0 ? (
              <div className="rounded-2xl border border-border/70 bg-white p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Design-Prinzipien
                </p>
                <ul className="space-y-3">
                  {principleRows.map((principle, index) => (
                    <li
                      key={
                        typeof principle.id === 'string' && principle.id
                          ? principle.id
                          : `principle-${index}`
                      }
                      className="rounded-xl border border-border/60 bg-muted p-3"
                    >
                      <p className="text-sm font-semibold">{principle.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {principle.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="space-y-5 xl:col-span-7">
            {colorRows.length > 0 ? (
              <div className="rounded-2xl border border-border/70 bg-white p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Farbpalette
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {colorRows.map((row, index) => {
                    const key = typeof row.id === 'string' && row.id ? row.id : `palette-${index}`
                    const swatch = normalizeHex(row.hex)

                    return (
                      <article
                        key={key}
                        className="overflow-hidden rounded-xl border border-border/70"
                      >
                        <div className="h-16" style={{ backgroundColor: swatch }} aria-hidden />
                        <div className="space-y-1 bg-card px-3 py-2.5">
                          <p className="text-sm font-semibold">{row.name}</p>
                          <p className="text-xs font-mono text-muted-foreground">
                            {swatch.toUpperCase()}
                          </p>
                          {row.usage ? (
                            <p className="text-xs leading-relaxed text-muted-foreground">
                              {row.usage}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {typeRows.length > 0 ? (
              <div className="rounded-2xl border border-border/70 bg-white p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Typografie
                </p>
                <div className="grid gap-3 lg:grid-cols-2">
                  {typeRows.map((row, index) => (
                    <article
                      key={typeof row.id === 'string' && row.id ? row.id : `type-${index}`}
                      className="rounded-xl border border-border/60 bg-zinc-50 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {row.role}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{row.family}</p>
                      <p
                        className="mt-3 text-2xl leading-tight text-foreground"
                        style={{ fontFamily: row.family }}
                      >
                        {row.sample?.trim() || 'Aa Bb Cc 123'}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {usageRows.length > 0 ? (
          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Anwendungsbeispiele
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usageRows.map((row, index) => (
                <figure
                  key={typeof row.id === 'string' && row.id ? row.id : `usage-${index}`}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-white"
                >
                  <Media
                    resource={row.image as MediaType}
                    className="aspect-[4/3] w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                  {row.caption ? (
                    <figcaption className="flex items-start gap-2 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                      <span className={cn('min-w-0')}>{row.caption}</span>
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
