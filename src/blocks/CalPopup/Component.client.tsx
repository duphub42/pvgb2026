'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { FC } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ensureCalEmbedReady,
  getCalBookingUrl,
  openCalBookingModal,
} from '@/utilities/webmcp/calEmbed'

type CalPopupBlockProps = {
  headline?: string
  description?: string
  calLink: string
  buttonLabel?: string
}

export const CalPopupBlock: FC<CalPopupBlockProps> = ({
  headline,
  description,
  calLink,
  buttonLabel = 'Termin buchen',
}) => {
  const id = useId()
  const buttonId = `open-cal-${id}`
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isCtaCentered, setIsCtaCentered] = useState(false)

  useEffect(() => {
    void ensureCalEmbedReady(calLink).catch(() => {
      // Fallback on click opens the booking URL directly.
    })
  }, [calLink])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId: number | null = null

    const updateCenteredState = () => {
      rafId = null
      const node = ctaRef.current
      if (!node) return

      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const viewportCenter = viewportHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const centerTolerance = Math.max(72, viewportHeight * 0.14)
      const isVisible = rect.bottom > 0 && rect.top < viewportHeight

      setIsCtaCentered(isVisible && Math.abs(elementCenter - viewportCenter) <= centerTolerance)
    }

    const scheduleUpdate = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(updateCenteredState)
    }

    updateCenteredState()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId != null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleClick = () => {
    void openCalBookingModal(calLink).catch(() => {
      window.open(getCalBookingUrl(calLink), '_blank', 'noopener,noreferrer')
    })
  }

  const shouldTripleDescription = headline?.trim() === 'Projektidee besprechen'
  const renderedDescription = description
    ? shouldTripleDescription
      ? 'In 30 Minuten gewinnen Sie Klarheit über Zielbild und Prioritäten und wissen exakt, welcher nächste Schritt den größten Hebel für Anfragen und Umsatz hat. Sie erhalten eine konkrete, realistische Empfehlung statt allgemeiner Tipps. Wenn es fachlich nicht passt, sage ich es offen.'
      : description
    : undefined

  return (
    <section className="container py-16">
      <div className="relative mx-auto w-full max-w-none overflow-hidden rounded-[calc(var(--style-radius-l)+0.5rem)] border border-border/60 bg-muted/20 px-6 py-7 shadow-[0_18px_56px_-46px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:bg-muted/10 dark:shadow-[0_18px_56px_-46px_rgba(0,0,0,0.65)] md:rounded-[1.5rem] md:px-8 md:py-8 lg:px-10 lg:py-9">
        <div
          className="pointer-events-none absolute -left-[55%] top-1/2 aspect-square w-[170%] -translate-y-1/2 rounded-full border border-foreground/10 bg-foreground/[0.025] dark:border-foreground/15 dark:bg-foreground/[0.035] md:-left-[24%] md:w-[94%]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="min-w-0 max-w-3xl text-left">
            {headline ? (
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                {headline}
              </h2>
            ) : (
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                Termin buchen
              </h2>
            )}
          </div>

          {description ? (
            <div className="mt-4 grid md:grid-cols-4 md:gap-8 lg:gap-10">
              <hr className="h-px w-[85%] border-0 bg-border/60 md:col-span-3" />
            </div>
          ) : null}

          <div className="grid gap-4 pt-3 md:grid-cols-4 md:items-start md:gap-8 lg:gap-10">
            {renderedDescription ? (
              <div className="w-full min-w-0 md:col-span-3">
                <p className="text-base leading-7 text-muted-foreground md:text-lg">
                  {renderedDescription}
                </p>
              </div>
            ) : null}

            <div
              ref={ctaRef}
              className="flex flex-col items-stretch gap-4 transition-transform duration-300 ease-out md:col-span-1"
              style={{
                transform: isCtaCentered ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: 'center',
              }}
            >
              <Button
                id={buttonId}
                type="button"
                onClick={handleClick}
                variant="cta"
                size="cta"
                ctaIcon
                iconA={ChevronRight}
                iconB={ArrowUpRight}
                className="w-full justify-between rounded-[var(--style-radius-l)] px-5"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
