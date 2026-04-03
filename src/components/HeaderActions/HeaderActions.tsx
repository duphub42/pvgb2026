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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import { MessageCircle, Phone, PhoneCall } from 'lucide-react'
import Link from 'next/link'
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

type FormOption = {
  label: string
  value: string
}

type FormField = {
  blockType:
    | 'text'
    | 'email'
    | 'number'
    | 'textarea'
    | 'select'
    | 'country'
    | 'state'
    | 'checkbox'
    | 'message'
  name: string
  label?: string | null
  required?: boolean | null
  defaultValue?: string | number | boolean | null
  placeholder?: string | null
  options?: FormOption[] | null
  message?: {
    root?: {
      children?: Array<{ type?: string; text?: string }>
    }
  } | null
}

type FormCheckboxField = {
  blockType: 'checkbox'
  name: string
  label?: string | null
  required?: boolean | null
  defaultValue?: boolean | null
}

const DEFAULT_WHATSAPP_PHONE_E164 = '4915780280163'
const DEFAULT_WHATSAPP_URL = `https://wa.me/${DEFAULT_WHATSAPP_PHONE_E164}`
const CONTACT_PHONE_DISPLAY = '+49 3459 6393323'
const CALLBACK_FORM_CANDIDATE_TITLES = ['rueckruf', 'ruckruf', 'rückruf']
const PRIVACY_TOKEN_REGEX = /datenschutzbetimmungen|datenschutzbestimmungen/i

function normalizePhoneFromWhatsApp(url?: string): string | null {
  if (!url) return null
  const match = url.match(/wa\.me\/(\d+)/)
  return match?.[1] ?? null
}

function HeaderContactModal({ cta }: { cta?: HeaderContactCta }) {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [resolvedCallbackFormId, setResolvedCallbackFormId] = React.useState<number | null>(null)
  const [callbackFormFields, setCallbackFormFields] = React.useState<FormField[]>([])
  const [formValues, setFormValues] = React.useState<Record<string, string | number | boolean>>({})

  const callbackConfig = React.useMemo(() => {
    if (cta?.callback) return cta.callback
    if (resolvedCallbackFormId == null) return undefined
    return {
      title: 'Rückruf anfordern',
      buttonText: 'Anfragen',
      formId: resolvedCallbackFormId,
    }
  }, [cta?.callback, resolvedCallbackFormId])

  const resolvedWhatsApp = React.useMemo(
    () => ({
      label: cta?.whatsapp?.label ?? 'WhatsApp',
      url: DEFAULT_WHATSAPP_URL,
    }),
    [cta?.whatsapp?.label],
  )

  React.useEffect(() => {
    if (!open || cta?.callback || resolvedCallbackFormId != null) return

    let isCancelled = false
    const resolveCallbackForm = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/forms?depth=0&limit=100`)
        if (!res.ok) return
        const json = (await res.json()) as { docs?: Array<{ id?: number; title?: string | null }> }
        const docs = Array.isArray(json?.docs) ? json.docs : []
        const candidate = docs.find((doc) => {
          const title = (doc?.title ?? '').toLocaleLowerCase('de-DE')
          return CALLBACK_FORM_CANDIDATE_TITLES.some((needle) => title.includes(needle))
        })
        if (!isCancelled && typeof candidate?.id === 'number') {
          setResolvedCallbackFormId(candidate.id)
        }
      } catch {
        // Silent fallback: Modal bleibt nutzbar, auch wenn Formular-Resolve fehlschlägt.
      }
    }

    void resolveCallbackForm()
    return () => {
      isCancelled = true
    }
  }, [open, cta?.callback, resolvedCallbackFormId])

  const callbackFormId = callbackConfig?.formId ?? null

  React.useEffect(() => {
    if (!open || callbackFormId == null) return

    let isCancelled = false
    const loadFormFields = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/forms/${callbackFormId}?depth=0`)
        if (!res.ok) return
        const form = (await res.json()) as {
          fields?: Array<{
            blockType?: string
            name?: string
            label?: string | null
            required?: boolean | null
            defaultValue?: string | number | boolean | null
            placeholder?: string | null
            options?: Array<{ label?: string; value?: string }>
            message?: {
              root?: { children?: Array<{ type?: string; text?: string }> }
            } | null
          }>
        }
        const supportedFields = (Array.isArray(form.fields) ? form.fields : [])
          .filter((field) => {
            const bt = field?.blockType
            return (
              bt === 'text' ||
              bt === 'email' ||
              bt === 'number' ||
              bt === 'textarea' ||
              bt === 'select' ||
              bt === 'country' ||
              bt === 'state' ||
              bt === 'checkbox' ||
              bt === 'message'
            )
          })
          .filter((field) => field?.blockType === 'message' || typeof field?.name === 'string')
          .map((field) => ({
            blockType: field.blockType as FormField['blockType'],
            name: String(field.name ?? `message-${Math.random().toString(36).slice(2)}`),
            label: field.label,
            required: field.required ?? false,
            defaultValue: field.defaultValue ?? (field.blockType === 'checkbox' ? false : ''),
            placeholder: field.placeholder ?? null,
            options: Array.isArray(field.options)
              ? field.options
                  .filter((opt) => typeof opt?.value === 'string')
                  .map((opt) => ({
                    label: opt?.label ?? String(opt?.value),
                    value: String(opt?.value),
                  }))
              : null,
            message: field.message ?? null,
          }))

        if (!isCancelled) {
          setCallbackFormFields(supportedFields)
          setFormValues((prev) => {
            const next: Record<string, string | number | boolean> = {}
            for (const field of supportedFields) {
              if (field.blockType === 'message') continue
              if (field.blockType === 'checkbox') {
                next[field.name] =
                  (prev[field.name] as boolean | undefined) ?? Boolean(field.defaultValue)
              } else {
                next[field.name] =
                  prev[field.name] ??
                  (typeof field.defaultValue === 'number'
                    ? field.defaultValue
                    : typeof field.defaultValue === 'string'
                      ? field.defaultValue
                      : '')
              }
            }
            return next
          })
        }
      } catch {
        if (!isCancelled) {
          setCallbackFormFields([])
          setFormValues({})
        }
      }
    }

    void loadFormFields()
    return () => {
      isCancelled = true
    }
  }, [open, callbackFormId])

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!callbackConfig) return
    setStatus('loading')
    try {
      const submissionData = callbackFormFields
        .filter((field) => field.blockType !== 'message')
        .map((field) => ({
          field: field.name,
          value: formValues[field.name] ?? (field.blockType === 'checkbox' ? false : ''),
        }))

      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: callbackConfig.formId,
          submissionData,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFormValues((prev) => {
          const next = { ...prev }
          for (const field of callbackFormFields) {
            if (field.blockType === 'message') continue
            if (field.blockType === 'checkbox') {
              next[field.name] = Boolean(field.defaultValue)
            } else {
              next[field.name] =
                typeof field.defaultValue === 'number'
                  ? field.defaultValue
                  : typeof field.defaultValue === 'string'
                    ? field.defaultValue
                    : ''
            }
          }
          return next
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <span className="inline-flex shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="header-tool-toggle header-icon-btn text-current"
                aria-label="Kontakt öffnen"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </Button>
            </span>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6}>
          Kontakt öffnen
        </TooltipContent>
      </Tooltip>
      <SheetContent
        side="right"
        overlayClassName="bg-background/20 backdrop-blur-md"
        className="megamenu-sheet flex h-[100dvh] max-h-[100dvh] w-[340px] max-w-[340px] flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-l border-border shadow-2xl pt-10 pb-6 supports-[height:100svh]:h-[100svh] sm:w-[420px] sm:max-w-[420px] [@media(max-height:48rem)]:w-[780px] [@media(max-height:48rem)]:max-w-[780px]"
      >
        <SheetHeader className="space-y-2">
          <SheetTitle className="text-2xl md:text-3xl font-medium tracking-tighter leading-tight text-foreground">
            Kontakt
          </SheetTitle>
          <SheetDescription className="text-base leading-relaxed">
            Schön, dass Sie hier sind. Wenn Sie Fragen haben oder ein Projekt besprechen möchten,
            können Sie mich jederzeit direkt kontaktieren. Hinterlassen Sie gern Ihre Nummer für
            einen Rückruf oder schreiben Sie mir bequem per WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-12 min-h-0 space-y-12">
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-base font-semibold">
              <Phone className="h-4 w-4 text-muted-foreground" aria-hidden />
              Kontaktdaten
            </h4>
            <p className="text-base text-muted-foreground">Telefon: {CONTACT_PHONE_DISPLAY}</p>
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-1 gap-8 [@media(max-height:48rem)]:grid-cols-2 [@media(max-height:48rem)]:gap-10">
            {callbackConfig ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-base font-semibold">
                    <PhoneCall className="h-4 w-4 text-muted-foreground" aria-hidden />
                    {callbackConfig.title}
                  </h4>
                  <p className="text-base text-muted-foreground">
                    Hinterlassen Sie Ihre Telefonnummer und ich melde mich zeitnah persönlich bei
                    Ihnen.
                  </p>
                </div>
                <form onSubmit={submitCallback} className="flex flex-col gap-2">
                  {callbackFormFields.map((field, idx) => {
                    if (field.blockType === 'message') {
                      const text = field.message?.root?.children
                        ?.map((child) => child?.text ?? '')
                        .join(' ')
                        .trim()
                      if (!text) return null
                      return (
                        <p key={`${field.name}-${idx}`} className="text-base text-muted-foreground">
                          {text}
                        </p>
                      )
                    }

                    if (field.blockType === 'checkbox') {
                      const checkboxField = field as FormCheckboxField
                      const label =
                        checkboxField.label || 'Ich stimme den Datenschutzbestimmungen zu.'
                      const parts = label.split(PRIVACY_TOKEN_REGEX)
                      const hasPrivacyToken = parts.length > 1
                      return (
                        <label
                          key={field.name}
                          className="mt-1 grid grid-cols-[0.875rem_1fr] items-start gap-2 text-xs leading-5 text-muted-foreground"
                        >
                          <input
                            type="checkbox"
                            name={field.name}
                            checked={Boolean(formValues[field.name])}
                            onChange={(e) =>
                              setFormValues((prev) => ({
                                ...prev,
                                [field.name]: e.target.checked,
                              }))
                            }
                            required={Boolean(field.required)}
                            className="mt-1 h-3.5 w-3.5 rounded border-input accent-primary"
                          />
                          <span>
                            {hasPrivacyToken ? (
                              <>
                                {parts[0]}
                                <Link
                                  href="/datenschutz"
                                  className="underline underline-offset-2 hover:no-underline"
                                >
                                  Datenschutzbestimmungen
                                </Link>
                                {parts[1]}
                              </>
                            ) : (
                              label
                            )}
                          </span>
                        </label>
                      )
                    }

                    if (field.blockType === 'textarea') {
                      return (
                        <textarea
                          key={field.name}
                          name={field.name}
                          value={String(formValues[field.name] ?? '')}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              [field.name]: e.target.value,
                            }))
                          }
                          placeholder={field.placeholder ?? field.label ?? ''}
                          required={Boolean(field.required)}
                          className="min-h-[92px] w-full rounded-md border border-input bg-background px-3 py-2 text-base"
                        />
                      )
                    }

                    if (
                      (field.blockType === 'select' ||
                        field.blockType === 'country' ||
                        field.blockType === 'state') &&
                      field.options?.length
                    ) {
                      return (
                        <select
                          key={field.name}
                          name={field.name}
                          value={String(formValues[field.name] ?? '')}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              [field.name]: e.target.value,
                            }))
                          }
                          required={Boolean(field.required)}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-base"
                        >
                          <option value="">
                            {field.placeholder ?? field.label ?? 'Bitte wählen'}
                          </option>
                          {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )
                    }

                    return (
                      <input
                        key={field.name}
                        type={
                          field.blockType === 'email'
                            ? 'email'
                            : field.blockType === 'number'
                              ? 'number'
                              : 'text'
                        }
                        name={field.name}
                        value={String(formValues[field.name] ?? '')}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            [field.name]:
                              field.blockType === 'number'
                                ? Number(e.target.value)
                                : e.target.value,
                          }))
                        }
                        placeholder={field.placeholder ?? field.label ?? ''}
                        required={Boolean(field.required)}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-base"
                      />
                    )
                  })}
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-10 w-full rounded-lg px-4 text-sm font-medium"
                  >
                    {status === 'loading'
                      ? '...'
                      : status === 'success'
                        ? 'Gesendet'
                        : callbackConfig.buttonText}
                  </Button>
                </form>
                {status === 'error' && (
                  <p className="text-xs text-destructive">
                    Fehler beim Senden. Bitte spaeter erneut versuchen.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-base text-muted-foreground">
                Rückruf-Formular ist aktuell nicht konfiguriert.
              </p>
            )}

            <div
              className="hidden w-px self-stretch bg-border [@media(max-height:48rem)]:block"
              aria-hidden
            />
            <hr className="border-border [@media(max-height:48rem)]:hidden" />

            {resolvedWhatsApp.url ? (
              <div className="space-y-3 [@media(max-height:48rem)]:col-start-2 [@media(max-height:48rem)]:row-start-1">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-base font-semibold">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
                    Direkt per WhatsApp
                  </h4>
                  <p className="text-base text-muted-foreground">
                    Für kurze Rückfragen können Sie mich schnell und unkompliziert per WhatsApp
                    erreichen.
                  </p>
                </div>
                <a
                  href={resolvedWhatsApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A]"
                  aria-label={resolvedWhatsApp.label}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {resolvedWhatsApp.label}
                </a>
              </div>
            ) : (
              <p className="text-base text-muted-foreground [@media(max-height:48rem)]:col-start-2 [@media(max-height:48rem)]:row-start-1">
                WhatsApp-Kontakt ist aktuell nicht konfiguriert.
              </p>
            )}
          </div>
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
