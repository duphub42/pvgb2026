import { cn } from '@/utilities/ui'
import React from 'react'

// Hinweis: Der Typ SerpContentBlock kommt nach einem payload generate:types hinzu.
// Bis dahin nutzen wir any, damit der Build nicht bricht.
type SerpContentBlockProps = any

export const SerpContentBlock: React.FC<SerpContentBlockProps> = (props) => {
  const {
    eyebrow,
    title,
    description,
    sectionTitle,
    sectionDescription,
    bullets,
    cardTitle,
    cardSubtitle,
    cardBadge,
    statPrimaryLabel,
    statPrimaryValue,
    statSecondaryLabel,
    statSecondaryValue,
    disableInnerContainer,
  } = props

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-background',
        disableInnerContainer ? '' : 'py-16 sm:py-20 lg:py-24',
      )}
    >
      <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', disableInnerContainer && 'py-8')}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] lg:items-center">
          {/* Text-Spalte links */}
          <div className="space-y-8">
            <div className="space-y-3">
              {eyebrow && (
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
            </div>

            {description && (
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}

            <div className="space-y-6">
              {(sectionTitle || sectionDescription) && (
                <div className="space-y-3">
                  {sectionTitle && (
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                      {sectionTitle}
                    </h3>
                  )}
                  {sectionDescription && (
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {sectionDescription}
                    </p>
                  )}
                </div>
              )}

              {Array.isArray(bullets) && bullets.length > 0 && (
                <ul className="space-y-3 text-sm text-muted-foreground sm:text-base">
                  {bullets.map(
                    (bullet: { label?: string; description?: string }, idx: number) => {
                      if (!bullet?.label && !bullet?.description) return null
                      return (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <div>
                            {bullet.label && (
                              <span className="font-medium text-foreground">
                                {bullet.label}
                              </span>
                            )}
                            {bullet.description && (
                              <>
                                {bullet.label && ' '}
                                <span>{bullet.description}</span>
                              </>
                            )}
                          </div>
                        </li>
                      )
                    },
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Rechte Spalte / Karte */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm rounded-3xl border border-border/60 bg-muted/40 p-6 shadow-sm backdrop-blur sm:p-7">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-primary/25">
                  <div className="flex h-full w-full items-center justify-center text-xs font-medium text-primary">
                    Portrait
                  </div>
                </div>
                <div className="space-y-1.5">
                  {cardSubtitle && (
                    <p className="text-xs font-medium uppercase tracking-wide text-primary/80">
                      {cardSubtitle}
                    </p>
                  )}
                  {cardTitle && (
                    <p className="text-sm font-semibold text-foreground">
                      {cardTitle}
                    </p>
                  )}
                  {cardBadge && (
                    <p className="text-xs text-muted-foreground">
                      {cardBadge}
                    </p>
                  )}
                </div>
              </div>

              {(statPrimaryLabel ||
                statPrimaryValue ||
                statSecondaryLabel ||
                statSecondaryValue) && (
                <div className="mt-6 grid gap-4 border-t border-border/60 pt-4 text-sm">
                  {(statPrimaryLabel || statPrimaryValue) && (
                    <div className="flex items-baseline justify-between gap-3">
                      {statPrimaryLabel && (
                        <span className="text-muted-foreground">
                          {statPrimaryLabel}
                        </span>
                      )}
                      {statPrimaryValue && (
                        <span className="font-semibold text-foreground">
                          {statPrimaryValue}
                        </span>
                      )}
                    </div>
                  )}
                  {(statSecondaryLabel || statSecondaryValue) && (
                    <div className="flex items-baseline justify-between gap-3">
                      {statSecondaryLabel && (
                        <span className="text-muted-foreground">
                          {statSecondaryLabel}
                        </span>
                      )}
                      {statSecondaryValue && (
                        <span className="font-semibold text-foreground">
                          {statSecondaryValue}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pointer-events-none absolute -inset-x-10 -bottom-10 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-primary/0 to-primary/15 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

