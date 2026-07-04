'use client'

import { useEffect, useId, useState } from 'react'
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
      ? 'In 30 Minuten gewinnen Sie Klarheit über Zielbild und Prioritäten und wissen exakt, welcher nächste Schritt den größten Hebel für Anfragen und Umsatz hat. Sie erhalten eine konkrete, realistische Empfehlung statt allgemeiner Tipps. Wenn es fachlich nicht passt, sagen wir es offen.'
      : description
    : undefined

  return (
    <section className="container py-16">
      <div className="mx-auto w-full max-w-none rounded-[1.5rem] border border-border/70 bg-background/95 px-6 py-7 shadow-sm backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-9">
        <div className="flex flex-col gap-1.5">
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

          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            {description ? <hr className="h-px min-w-8 flex-1 border-0 bg-border/60" /> : null}

            <div className="shrink-0">
              <Button
                id={buttonId}
                type="button"
                onClick={handleClick}
                variant="cta"
                size="cta"
                ctaIcon
                iconA={ChevronRight}
                iconB={ArrowUpRight}
                className="justify-between px-5"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>

          {renderedDescription ? (
            <div className="w-full min-w-0">
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                {renderedDescription}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
