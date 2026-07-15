'use client'

import { X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { getCalEmbedUrl } from '@/utilities/webmcp/calEmbed'

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
  const embedUrl = getCalEmbedUrl(calLink)

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
          <iframe
            key={embedUrl}
            src={embedUrl}
            title="Cal.eu Terminbuchung"
            className="min-h-0 w-full flex-1 border-0 bg-background"
            loading="eager"
            allow="camera; microphone; fullscreen"
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
