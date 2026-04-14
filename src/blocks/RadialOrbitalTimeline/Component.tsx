'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Code, Clock, FileText, type LucideIcon, User } from 'lucide-react'

type TimelineItem = {
  title?: string
  date?: string
  content?: string
  category?: string
  icon?: string
  status?: 'completed' | 'in-progress' | 'pending'
  energy?: number
  relatedIds?: string
}

type Props = {
  sectionTitle?: string
  sectionText?: string
  timelineItems?: TimelineItem[]
  disableInnerContainer?: boolean
}

const ICONS: Record<string, LucideIcon> = {
  Calendar,
  FileText,
  Code,
  User,
  Clock,
}

const statusVariant = (status?: string) => {
  switch (status) {
    case 'completed':
      return 'primary'
    default:
      return 'secondary'
  }
}

const formatRelatedIds = (relatedIds?: string) =>
  relatedIds
    ?.split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .join(', ')

export const RadialOrbitalTimelineBlock: React.FC<Props> = ({
  disableInnerContainer: _disableInnerContainer,
  sectionTitle,
  sectionText,
  timelineItems,
}) => {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const items = (timelineItems ?? []).filter((item): item is TimelineItem =>
    Boolean(item && item.title && item.date && item.content),
  )
  const selectedItem = activeIndex !== null ? items[activeIndex] : null

  if (items.length === 0) {
    return null
  }

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]"
          >
            Timeline
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {sectionTitle?.trim() || 'Projekt-Timeline'}
          </h2>
          {sectionText ? (
            <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
              {sectionText}
            </p>
          ) : null}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[30rem]">
            <div className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full border border-border/50" />
            <motion.div
              className="relative aspect-square w-full rounded-full border border-border/70 bg-muted/10 overflow-hidden"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            >
              {items.map((item, index) => {
                const angle = (index / items.length) * 360
                const Icon = ICONS[item.icon ?? 'Calendar'] ?? Calendar
                const isActive = activeIndex === index

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(9.5rem) rotate(-${angle}deg)`,
                    }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="flex h-14 w-14 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                      whileHover={reducedMotion ? undefined : { y: -2 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                      aria-pressed={isActive}
                    >
                      <div
                        className={`flex h-full w-full items-center justify-center rounded-full ${
                          isActive
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border text-foreground hover:border-primary/80 hover:bg-primary/10'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </motion.button>
                  </div>
                )
              })}
              <motion.div
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-xl border border-border"
                animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          <div className="space-y-4">
            {selectedItem ? (
              <motion.div
                initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Card className="border border-border bg-background/90 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-border/70 bg-muted/70 p-3">
                          {(() => {
                            const Icon = ICONS[selectedItem.icon ?? 'Calendar'] ?? Calendar
                            return <Icon className="h-5 w-5 text-foreground" />
                          })()}
                        </div>
                        <div>
                          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {selectedItem.category || 'Phase'}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-foreground">
                            {selectedItem.title}
                          </h3>
                        </div>
                      </div>
                      <Badge
                        variant={statusVariant(selectedItem.status)}
                        className="text-xs uppercase"
                      >
                        {selectedItem.status ?? 'pending'}
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">{selectedItem.date}</p>
                    <p className="mt-4 text-sm leading-relaxed text-foreground">
                      {selectedItem.content}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                      <span>Energie: {selectedItem.energy ?? 0}%</span>
                      {selectedItem.relatedIds ? (
                        <span>Verknüpfte IDs: {formatRelatedIds(selectedItem.relatedIds)}</span>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="rounded-3xl border border-border bg-background/80 p-10 text-center text-sm text-muted-foreground">
                Klick auf ein Icon, um den Timeline-Eintrag anzuzeigen.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
