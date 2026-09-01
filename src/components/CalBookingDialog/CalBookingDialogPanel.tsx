'use client'

import { X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { getCalBookingUrl, mountCalInlineEmbed } from '@/utilities/webmcp/calEmbed'

type CalBookingDialogPanelProps = {
  open: boolean
  calLink: string
  onOpenChange: (open: boolean) => void
}

export function CalBookingDialogPanel({
  open,
  calLink,
  onOpenChange,
}: CalBookingDialogPanelProps) {
  const id = useId()
  const containerId = `cal-modal-inline-${id.replace(/:/g, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!open) return

    const container = containerRef.current
    if (!container) return

    let cancelled = false
    setStatus('loading')

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
  }, [open, calLink])

  const fallbackUrl = getCalBookingUrl(calLink)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[min(92dvh,880px)] w-[min(96vw,920px)] max-w-[920px] flex-col gap-0 overflow-hidden border-border/70 bg-background p-0 sm:rounded-2xl"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
          <div className="min-w-0">
            <DialogTitle className="truncate text-base font-semibold tracking-tight">
              Termin buchen
            </DialogTitle>
            <DialogDescription className="sr-only">
              Wählen Sie einen Termin für ein unverbindliches Kennenlerngespräch.
            </DialogDescription>
          </div>
          <DialogClose
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Schließen"
          >
            <X className="size-4" aria-hidden />
          </DialogClose>
        </div>
        {open ? (
          <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-background">
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
            <div id={containerId} ref={containerRef} className="h-full w-full" />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
