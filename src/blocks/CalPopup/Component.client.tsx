'use client'

import { useEffect, useId, useState } from 'react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'

type CalPopupBlockProps = {
  headline?: string
  description?: string
  calLink: string
  buttonLabel?: string
}

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

function getCal(): any {
  if (typeof window === 'undefined') return null
  return (window as any).Cal
}

function ensureCalStub(): void {
  if (typeof window === 'undefined') return

  const cal = getCal()
  if (!cal) {
    const stub: any = function (...args: any[]) {
      ;(stub.q = stub.q || []).push(args)
    }
    stub.q = []
    stub.ns = {}
    ;(window as any).Cal = stub
  } else if (typeof cal === 'function') {
    ;(cal as any).q = (cal as any).q || []
    ;(cal as any).ns = (cal as any).ns || {}
  }
}

function isCalStub(cal: any): boolean {
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
  const [calStatus, setCalStatus] = useState<'loading' | 'ready' | 'error'>('loading')

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calDomain])

  const handleClick = () => {
    if (typeof window === 'undefined') return

    ensureCalStub()

    const cal = getCal()
    if (!cal) {
      window.open(`https://${calDomain}/${cleanedCalLink}`, '_blank')
      return
    }

    const options = {
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

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-3xl rounded-[1rem] border border-border bg-background p-8 text-center shadow-sm">
        {headline ? (
          <h2 className="mb-4 text-3xl font-semibold leading-tight">{headline}</h2>
        ) : (
          <h2 className="mb-4 text-3xl font-semibold leading-tight">Termin buchen</h2>
        )}
        {description ? (
          <p className="mb-8 text-base leading-7 text-muted-foreground">{description}</p>
        ) : null}
        <Button
          id={buttonId}
          type="button"
          onClick={handleClick}
          size="lg"
          className="inline-flex px-8"
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}
