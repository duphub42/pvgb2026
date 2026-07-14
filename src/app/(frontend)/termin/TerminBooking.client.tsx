'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { DEFAULT_CAL_LINK, getCalBookingUrl, mountCalInlineEmbed } from '@/utilities/webmcp/calEmbed'

type TerminBookingProps = {
  calLink?: string
}

export function TerminBooking({ calLink = DEFAULT_CAL_LINK }: TerminBookingProps) {
  const id = useId()
  const containerId = `cal-inline-${id.replace(/:/g, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    void mountCalInlineEmbed(
      {
        elementOrSelector: container,
        calLink,
      },
      calLink,
    )
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [calLink])

  const fallbackUrl = getCalBookingUrl(calLink)

  return (
    <div className="relative min-h-[640px] w-full overflow-hidden rounded-[calc(var(--style-radius-l)+0.5rem)] border border-border/60 bg-background shadow-sm">
      {status === 'loading' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <p className="text-sm text-muted-foreground">Kalender wird geladen …</p>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/20 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Der Kalender konnte nicht eingebettet werden.
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4"
          >
            Termin direkt auf Cal.eu buchen
          </a>
        </div>
      ) : null}
      <div
        id={containerId}
        ref={containerRef}
        className="min-h-[640px] w-full"
        aria-label="Terminbuchung"
      />
    </div>
  )
}
