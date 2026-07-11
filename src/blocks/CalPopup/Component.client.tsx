'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { FC } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CalPopupBlockProps = {
  headline?: string
  description?: string
  calLink: string
  buttonLabel?: string
}

type CalModalOptions = {
  calLink: string
  config: {
    layout: 'month_view'
  }
}

type CalFunction = ((action: 'modal', options: CalModalOptions) => void) & {
  q?: unknown[][]
  ns?: Record<string, unknown>
  ui?: unknown
}

type CalObject = {
  modal?: (options: CalModalOptions) => void
  q?: unknown[][]
  ns?: Record<string, unknown>
  ui?: unknown
}

type CalApi = CalFunction | CalObject | null

// Helper: Detect if the link is for cal.eu or cal.com
function getCalDomain(calLink: string): 'cal.com' | 'cal.eu' {
  // Accepts full URL or just path
  if (calLink.startsWith('http')) {
    if (calLink.includes('cal.eu')) return 'cal.eu'
    return 'cal.com'
  }
  // Optionally: allow admins to prefix with cal.eu:
  if (calLink.startsWith('eu:')) return 'cal.eu'
  return 'cal.com'
}

function getCal(): CalApi {
  if (typeof window === 'undefined') return null
  return (window as Window & { Cal?: CalFunction | CalObject }).Cal ?? null
}

function ensureCalStub(): void {
  if (typeof window === 'undefined') return

  const cal = getCal()
  if (!cal) {
    const stub: CalFunction = ((...args: unknown[]) => {
      ;(stub.q = stub.q || []).push(args)
    }) as CalFunction
    stub.q = []
    stub.ns = {}
    ;(window as Window & { Cal?: CalFunction | CalObject }).Cal = stub
  } else if (typeof cal === 'function') {
    cal.q = cal.q || []
    cal.ns = cal.ns || {}
  }
}

function isCalStub(cal: CalApi): boolean {
  return typeof cal === 'function' && Array.isArray(cal.q) && typeof cal.ui === 'undefined'
}

function loadCalEmbedScript(
  onReady: () => void,
  onError: () => void,
  calDomain: 'cal.com' | 'cal.eu',
): void {
  if (typeof window === 'undefined') return

  const scriptId = `cal-embed-script-${calDomain}`
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null
  const handleLoad = () => {
    if (!existing) return

    existing.removeEventListener('load', handleLoad)
    existing.removeEventListener('error', handleError)
    existing.setAttribute('data-cal-loaded', 'true')
    const cal = getCal()
    if (cal && !isCalStub(cal)) {
      onReady()
    } else {
      onError()
    }
  }

  const handleError = () => {
    if (!existing) {
      onError()
      return
    }

    existing.removeEventListener('load', handleLoad)
    existing.removeEventListener('error', handleError)
    onError()
  }

  if (existing) {
    existing.addEventListener('load', handleLoad)
    existing.addEventListener('error', handleError)

    if (existing.getAttribute('data-cal-loaded') === 'true') {
      const cal = getCal()
      if (cal && !isCalStub(cal)) {
        onReady()
      } else {
        onError()
      }
    }
    return
  }

  const script = document.createElement('script')
  script.id = scriptId
  script.src =
    calDomain === 'cal.eu'
      ? 'https://app.cal.eu/embed/embed.js'
      : 'https://app.cal.com/embed/embed.js'
  script.async = true
  script.onload = handleLoad
  script.onerror = handleError

  document.body.appendChild(script)
}

export const CalPopupBlock: FC<CalPopupBlockProps> = ({
  headline,
  description,
  calLink,
  buttonLabel = 'Termin buchen',
}) => {
  const id = useId()
  const buttonId = `open-cal-${id}`
  const [_calStatus, setCalStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isCtaCentered, setIsCtaCentered] = useState(false)

  // Determine domain
  const calDomain = getCalDomain(calLink)
  // Clean calLink for modal (strip protocol/domain if present)
  let cleanedCalLink = calLink
  if (calLink.startsWith('http')) {
    try {
      const url = new URL(calLink)
      cleanedCalLink = url.pathname.replace(/^\//, '')
    } catch {}
  } else if (calLink.startsWith('eu:')) {
    cleanedCalLink = calLink.replace(/^eu:/, '')
  }

  useEffect(() => {
    ensureCalStub()
    loadCalEmbedScript(
      () => {
        setCalStatus('ready')
      },
      () => {
        setCalStatus('error')
      },
      calDomain,
    )
  }, [calDomain])

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
    if (typeof window === 'undefined') return

    ensureCalStub()

    const cal = getCal()
    if (!cal) {
      window.open(`https://${calDomain}/${cleanedCalLink}`, '_blank')
      return
    }

    const options: CalModalOptions = {
      calLink: cleanedCalLink,
      config: {
        layout: 'month_view',
      },
    }

    if (typeof cal === 'function') {
      cal('modal', options)
      return
    }

    if (typeof cal === 'object' && cal !== null && typeof cal.modal === 'function') {
      cal.modal(options)
      return
    }

    window.open(`https://${calDomain}/${cleanedCalLink}`, '_blank')
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
