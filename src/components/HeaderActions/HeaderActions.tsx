'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { SearchCommand } from '@/components/SearchCommand/SearchCommand'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import { MessageCircle } from 'lucide-react'
import React from 'react'

type HeaderContactCta = {
  whatsapp?: {
    label: string
    url: string
  }
  callback?: {
    title: string
    placeholder: string
    buttonText: string
    formId: number
    phoneFieldName: string
  }
}

function normalizePhoneFromWhatsApp(url?: string): string | null {
  if (!url) return null
  const match = url.match(/wa\.me\/(\d+)/)
  return match?.[1] ?? null
}

function HeaderContactModal({ cta }: { cta?: HeaderContactCta }) {
  const [open, setOpen] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cta?.callback || !phone.trim()) return
    setStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: cta.callback.formId,
          submissionData: [{ field: cta.callback.phoneFieldName, value: phone.trim() }],
        }),
      })
      if (res.ok) {
        setStatus('success')
        setPhone('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const phoneFromWhatsApp = normalizePhoneFromWhatsApp(cta?.whatsapp?.url)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className="inline-flex shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="header-tool-toggle header-tool-toggle--theme shrink-0"
            aria-label="Kontakt öffnen"
          >
            <svg className="size-5" aria-hidden="true">
              <use href="/icons-sprite.svg#hf-phone" />
            </svg>
          </Button>
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        overlayClassName="bg-background/20 backdrop-blur-md"
        className="w-[340px] sm:w-[420px]"
      >
        <SheetHeader>
          <SheetTitle>Kontakt</SheetTitle>
          <SheetDescription>
            Kontaktdaten und Rueckrufservice.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Kontaktdaten</h4>
            {phoneFromWhatsApp ? (
              <p className="text-sm text-muted-foreground">
                Telefon: +{phoneFromWhatsApp}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Telefonische Kontaktaufnahme ueber Rueckruf oder WhatsApp.
              </p>
            )}
          </div>

          {cta?.callback ? (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">{cta.callback.title}</h4>
              <form onSubmit={submitCallback} className="flex flex-col gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={cta.callback.placeholder}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
                <Button type="submit" size="sm" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? '...'
                    : status === 'success'
                      ? 'Gesendet'
                      : cta.callback.buttonText}
                </Button>
              </form>
              {status === 'error' && (
                <p className="text-xs text-destructive">
                  Fehler beim Senden. Bitte spaeter erneut versuchen.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Rueckruf-Formular ist aktuell nicht konfiguriert.
            </p>
          )}

          {cta?.whatsapp?.url ? (
            <a
              href={cta.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A]"
              aria-label={cta.whatsapp.label}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {cta.whatsapp.label}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              WhatsApp-Kontakt ist aktuell nicht konfiguriert.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function HeaderActions({
  className,
  contactCta,
}: {
  className?: string
  contactCta?: HeaderContactCta
}) {
  return (
    <div className={cn('relative z-20 flex items-center gap-0.5', className)}>
      <AnimatedThemeToggle />
      <HeaderContactModal cta={contactCta} />
      <SearchCommand />
    </div>
  )
}
