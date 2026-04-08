'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import {
  FORM_SPAM_META_FIELDS,
  buildFormSpamMetaSubmissionData,
} from '@/utilities/formSpamProtection'
import {
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  Home,
  Mail,
  MessageCircle,
  Newspaper,
  Phone,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { HeaderActions } from '@/components/HeaderActions/HeaderActions'
import { PathsBackground } from '@/components/PathsBackground/PathsBackground'
import { ThreadsBackground } from '@/components/ThreadsBackground/ThreadsBackground'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher'
import { ResilientImage } from '@/components/ui/resilient-image'
import { HeaderGlassPlate } from '@/components/HeaderGlassPlate/HeaderGlassPlate'

/** Konfiguration für WhatsApp, Rückruf und Newsletter im Mega-Menü (aus Header-Global) */
export type MegaMenuCta = {
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
  newsletter?: {
    title: string
    placeholder: string
    buttonText: string
    formId: number
    emailFieldName: string
  }
}

type MediaRef = { url?: string | null; id?: number } | number | null

function mediaUrl(media: MediaRef): string {
  if (media == null) return ''
  if (typeof media === 'object' && media?.url) return getMediaUrl(media.url) || ''
  return ''
}

function getMegaMenuItemKey(item: MegaMenuItem, index: number): string {
  const safeId = item.id != null ? String(item.id).trim() : ''
  return safeId !== '' ? `mega-menu-item-${safeId}-${index}` : `mega-menu-item-${index}`
}

function getMegaMenuColumnKey(
  col: NonNullable<MegaMenuItem['columns']>[number],
  index: number,
): string {
  const title = col?.title?.trim()
  const width = col?.columnWidth != null ? String(col.columnWidth) : 'auto'
  return title
    ? `mega-menu-col-${title.replace(/\s+/g, '-')}-${width}-${index}`
    : `mega-menu-col-${width}-${index}`
}

function isSpecialMegaMenuColumn(
  col: Pick<NonNullable<MegaMenuItem['columns']>[number], 'title' | 'columnBackground'>,
): boolean {
  const bg = String(col.columnBackground ?? '')
    .trim()
    .toLowerCase()
  if (bg === 'accent') return true

  const title = String(col.title ?? '')
    .trim()
    .toLowerCase()

  return /\b(special|speacial|spezial)\b/.test(title)
}

function getMegaMenuSubItemKey(
  sub: { url?: string | null; label?: string | null },
  index: number,
): string {
  const id = sub.url ?? sub.label
  return id
    ? `mega-menu-subitem-${String(id)
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')}-${index}`
    : `mega-menu-subitem-${index}`
}

function getMegaMenuCardKey(
  card: { ctaUrl?: string | null; title?: string | null; description?: string | null },
  index: number,
): string {
  const id = card.ctaUrl ?? card.title ?? card.description
  return id
    ? `mega-menu-card-${String(id)
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')}-${index}`
    : `mega-menu-card-${index}`
}

function toDomId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const MOBILE_DOCK_PHONE_HREF = 'tel:+49123456789'
const MOBILE_DOCK_EMAIL_HREF = 'mailto:test@mail.com'
const MOBILE_DOCK_WHATSAPP_URL = 'https://wa.me/49123456789'
const MOBILE_DOCK_VCARD_URL = '/contact.vcf'
const MOBILE_DOCK_CALENDAR_URL = 'https://calendly.com/demo'
const MOBILE_MENU_LOGO_ICON_SRC = '/api/media/file/philippbacher-logo-b-16.svg'
const HAM_ICON_ANIMATION_MS = 400
const MOBILE_DOCK_LONG_PRESS_MS = 400
const MOBILE_DOCK_TOOLTIP_AUTOHIDE_MS = 1500
const MOBILE_DOCK_PROXIMITY_RADIUS = 132

type MobileMenuSubLink = {
  label: string
  url: string
  groupTitle?: string | null
}

type MobileDockTone = 'default' | 'booking' | 'accent'
type MobileDockIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

type MobileDockAction = {
  key: string
  href: string
  label: string
  icon: MobileDockIcon
  tone?: MobileDockTone
  iconScale?: number
  isInternal?: boolean
  targetBlank?: boolean
  rel?: string
  download?: boolean
}

type MobileDockTooltipState = {
  label: string
  x: number
}

type MobileDockActionMetric = {
  key: string
  centerX: number
  centerY: number
  el: HTMLElement
}

function WhatsAppLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 4.25a7.75 7.75 0 0 1 6.83 11.43l-.43.75.45 2.6-2.65-.44-.75.43a7.75 7.75 0 1 1-3.45-14.77Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.62 8.88c.11-.28.29-.44.54-.49l.69-.15c.28-.06.56.07.69.32l.4.77c.12.24.08.52-.1.72l-.34.39a4.9 4.9 0 0 0 2.24 2.24l.39-.34a.75.75 0 0 1 .72-.1l.77.4c.25.13.38.41.32.69l-.15.69c-.05.25-.21.43-.49.54-.4.16-.84.2-1.28.09-1.15-.31-2.2-.92-3.11-1.83s-1.52-1.96-1.83-3.11c-.11-.44-.07-.88.09-1.28Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function VCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9.2" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.8 15.3c.7-1.2 1.6-1.8 2.4-1.8s1.7.6 2.4 1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.8 10h4.2M13.8 13.2H18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function collectMobileSubLinks(item: MegaMenuItem, limit = 4): MobileMenuSubLink[] {
  const links: MobileMenuSubLink[] = []

  for (const col of item.columns ?? []) {
    for (const sub of col.items ?? []) {
      links.push({
        label: sub.label,
        url: sub.url,
        groupTitle: col.title ?? null,
      })
    }
  }

  if (links.length === 0) {
    for (const sub of item.subItems ?? []) {
      links.push({
        label: sub.label,
        url: sub.url,
        groupTitle: null,
      })
    }
  }

  const seen = new Set<string>()
  const deduped: MobileMenuSubLink[] = []

  for (const link of links) {
    const label = typeof link.label === 'string' ? link.label.trim() : ''
    const url = typeof link.url === 'string' ? link.url.trim() : ''
    if (!label || !url) continue
    const dedupeKey = `${label}::${url}`
    if (seen.has(dedupeKey)) continue
    seen.add(dedupeKey)
    deduped.push({ ...link, label, url })
    if (deduped.length >= limit) break
  }

  return deduped
}

function getMobileMenuFallbackIcon(item: Pick<MegaMenuItem, 'label' | 'url'>): LucideIcon {
  const haystack = `${item.label} ${item.url}`.toLocaleLowerCase('de-DE')

  if (/(portfolio|projekt|referenz|case)/.test(haystack)) return Briefcase
  if (/(leistung|service|angebot|beratung|consult|technik)/.test(haystack)) return Wrench
  if (/(kontakt|telefon|anruf|call|whatsapp|mail)/.test(haystack)) return Phone
  if (/(termin|buch|booking|kalender)/.test(haystack)) return CalendarDays
  if (/(blog|news|artikel|magazin|presse)/.test(haystack)) return Newspaper
  if (/(über|ueber|about|team|profil|unternehmen)/.test(haystack)) return User
  if (/(start|home|index)/.test(haystack)) return Home
  return Compass
}

type MobileMenuTriggerIconProps = {
  active: boolean
  onToggle?: (nextActive: boolean) => void
  className?: string
}

function MobileMenuTriggerIcon({ active, onToggle, className }: MobileMenuTriggerIconProps) {
  return (
    <svg
      className={cn(
        'mobile-megamenu-trigger-icon ham hamRotate ham7',
        active && 'active',
        className,
      )}
      viewBox="0 0 100 100"
      width="80"
      aria-hidden
      focusable="false"
      onClick={(event) => {
        if (!onToggle) return
        event.stopPropagation()
        onToggle(!active)
      }}
    >
      <path
        className="line top"
        d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
      />
      <path className="line middle" d="m 70,50 h -40" />
      <path
        className="line bottom"
        d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
      />
    </svg>
  )
}

export type MegaMenuItem = {
  id: number | string
  label: string
  url: string
  order: number
  icon?: MediaRef
  image?: MediaRef
  appearance?: 'link' | 'button' | null
  /** Pro Menüpunkt: Breiten der 3 Dropdown-Spalten (1–12). Leer = Header-Global. */
  columnWidths?: { col1?: number; col2?: number; col3?: number } | null
  categoryDescription?: { title?: string | null; description?: string | null } | null
  subItems?: Array<{
    label: string
    url: string
    icon?: MediaRef
    image?: MediaRef
    badge?: string | null
    badgeColor?: string | null
    description?: string | null
    dividerBefore?: boolean
  }>
  columns?: Array<{
    title?: string | null
    /** Breite dieser Unterpunkt-Spalte (1–12). Desktop: Spalten nebeneinander. */
    columnWidth?: number | null
    dividerBefore?: boolean
    columnBackground?: string | null
    items?: Array<{
      label: string
      url: string
      description?: string | null
      icon?: MediaRef
      image?: MediaRef
      badge?: string | null
      badgeColor?: string | null
    }>
  }>
  highlight?: {
    position?: 'right' | 'below' | null
    background?: 'default' | 'paths' | 'threads' | 'gradient' | null
    cards?: Array<{
      title?: string | null
      description?: string | null
      icon?: MediaRef
      image?: MediaRef
      ctaLabel?: string | null
      ctaUrl?: string | null
    }> | null
    title?: string | null
    description?: string | null
    icon?: MediaRef
    image?: MediaRef
    ctaLabel?: string | null
    ctaUrl?: string | null
  } | null
}

/** Vom Backend konfigurierbarer Stil für Highlight-Link-Karten (Blueprint: Card) */
export type HighlightCardStyle = {
  borderRadius?: string
  shadow?: string
  hoverShadow?: string
  hoverBorder?: string
}

type MegaMenuProps = {
  items: MegaMenuItem[]
  logo?: React.ReactNode
  mobileLogo?: React.ReactNode
  className?: string
  /** Spaltenbreiten: Inhalt und Highlight (12er-Grid). `sidebar` wird nicht mehr fürs Layout genutzt. */
  columnWidths?: {
    sidebar?: number
    content?: number
    featured?: number
  }
  /** Optional: WhatsApp, Rückruf, Newsletter aus Header-Global */
  megaMenuCta?: MegaMenuCta
  /** Optional: Stil der Highlight-Karten (aus Header-Global) */
  highlightCardStyle?: HighlightCardStyle
}

function hasDropdown(item: MegaMenuItem): boolean {
  return (
    (item.subItems != null && item.subItems.length > 0) ||
    (item.columns != null && item.columns.length > 0) ||
    (item.highlight != null && (item.highlight.title != null || item.highlight.ctaUrl != null)) ||
    (item.image != null && mediaUrl(item.image) !== '')
  )
}

/* ListItem: Icon links (quadratisch, 2 Zeilen), daneben Titel + Beschreibung (kleiner, 20% Opacity) */
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string
    icon?: React.ReactNode
    animationIndex?: number
    isButton?: boolean
  }
>(({ className, title, children, icon, animationIndex, isButton = false, ...props }, ref) => (
  <li
    className="megamenu-block-item"
    style={
      animationIndex == null
        ? undefined
        : ({ '--megamenu-block-index': animationIndex } as React.CSSProperties)
    }
  >
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          isButton
            ? 'group flex select-none items-start gap-3 rounded-xl border border-transparent bg-[var(--mega-menu-button-bg)] p-4 leading-none no-underline text-[var(--mega-menu-button-fg)] shadow-sm outline-none transition-[filter,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring/50'
            : 'group flex select-none items-start gap-3 rounded-xl p-4 leading-none no-underline outline-none transition-colors duration-300',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'megamenu-item-icon flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg p-2.5 transition-all duration-300 [&_img]:h-full [&_img]:w-full [&_img]:object-contain',
            isButton
              ? 'bg-black/10 text-current group-hover:bg-black/15'
              : 'group-hover:text-primary',
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div
            className={cn(
              'text-sm font-semibold leading-tight transition-colors',
              isButton
                ? 'text-current'
                : 'group-hover:text-primary dark:group-hover:text-foreground',
            )}
          >
            {title}
          </div>
          <p
            className={cn(
              'break-words whitespace-normal text-sm leading-snug transition-opacity',
              isButton
                ? 'text-current/80 opacity-80 group-hover:opacity-100'
                : 'opacity-20 group-hover:opacity-70',
            )}
          >
            {children}
          </p>
        </div>
        <ChevronRight
          className={cn(
            'mt-1 h-4 w-4 shrink-0 transition-all duration-300',
            isButton
              ? 'text-current opacity-80 group-hover:opacity-100'
              : 'text-primary opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100',
          )}
        />
      </Link>
    </NavigationMenuLink>
  </li>
))
ListItem.displayName = 'ListItem'

const COL_SPAN_CLASS: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
}

function colSpan(n: number): string {
  return COL_SPAN_CLASS[Math.min(12, Math.max(1, n))] ?? 'col-span-3'
}

const XL_COL_SPAN_CLASS: Record<number, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  7: 'xl:col-span-7',
  8: 'xl:col-span-8',
  9: 'xl:col-span-9',
  10: 'xl:col-span-10',
  11: 'xl:col-span-11',
  12: 'xl:col-span-12',
}

function xlColSpan(n: number): string {
  return XL_COL_SPAN_CLASS[Math.min(12, Math.max(1, n))] ?? 'xl:col-span-6'
}

const LG_COL_SPAN_CLASS: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
}

function lgColSpan(n: number): string {
  return LG_COL_SPAN_CLASS[Math.min(12, Math.max(1, n))] ?? 'lg:col-span-6'
}

/** Nach programmatischem Panel-Close Inline-Styles entfernen (öffnet wieder sauber mit Radix/CSS-Keyframes). */
function resetMegamenuViewportWrapperMotion(el: HTMLElement | null) {
  if (!el) return
  el.style.animation = ''
  el.style.transition = ''
  el.style.transform = ''
  el.style.opacity = ''
  el.style.height = ''
  el.style.minHeight = ''
  el.style.maxHeight = ''
  el.style.overflow = ''
}

function collectPreloadMediaUrls(items: MegaMenuItem[]): string[] {
  const urls = new Set<string>()
  const add = (media?: MediaRef) => {
    if (!media) return
    const url = mediaUrl(media)
    if (url) urls.add(url)
  }

  for (const item of items) {
    add(item.icon)
    add(item.image)
    for (const sub of item.subItems ?? []) {
      add(sub.icon)
      add(sub.image)
    }
    for (const col of item.columns ?? []) {
      for (const sub of col.items ?? []) {
        add(sub.icon)
        add(sub.image)
      }
    }
    const h = item.highlight
    if (h) {
      add(h.icon)
      add(h.image)
      for (const card of h.cards ?? []) {
        add(card.icon)
        add(card.image)
      }
    }
  }

  return [...urls]
}

function MegaMenuCtaStrip({ cta, hideCallback }: { cta: MegaMenuCta; hideCallback?: boolean }) {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [callbackStatus, setCallbackStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [callbackHoneypotValue, setCallbackHoneypotValue] = useState('')
  const [newsletterHoneypotValue, setNewsletterHoneypotValue] = useState('')
  const [callbackStartedAt, setCallbackStartedAt] = useState<number>(() => Date.now())
  const [newsletterStartedAt, setNewsletterStartedAt] = useState<number>(() => Date.now())

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cta.callback || !phone.trim()) return
    if (callbackHoneypotValue.trim().length > 0) {
      setCallbackStatus('success')
      return
    }
    setCallbackStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: cta.callback.formId,
          submissionData: [
            { field: cta.callback.phoneFieldName, value: phone.trim() },
            ...buildFormSpamMetaSubmissionData({
              honeypotValue: callbackHoneypotValue,
              startedAt: callbackStartedAt,
            }),
          ],
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setCallbackStatus('success')
        setPhone('')
        setCallbackHoneypotValue('')
        setCallbackStartedAt(Date.now())
      } else {
        setCallbackStatus('error')
      }
    } catch {
      setCallbackStatus('error')
    }
  }

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cta.newsletter || !email.trim()) return
    if (newsletterHoneypotValue.trim().length > 0) {
      setNewsletterStatus('success')
      return
    }
    setNewsletterStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: cta.newsletter.formId,
          submissionData: [
            { field: cta.newsletter.emailFieldName, value: email.trim() },
            ...buildFormSpamMetaSubmissionData({
              honeypotValue: newsletterHoneypotValue,
              startedAt: newsletterStartedAt,
            }),
          ],
        }),
      })
      if (res.ok) {
        setNewsletterStatus('success')
        setEmail('')
        setNewsletterHoneypotValue('')
        setNewsletterStartedAt(Date.now())
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const hasAny = cta.whatsapp || (cta.callback && !hideCallback) || cta.newsletter
  if (!hasAny) return null

  return (
    <div className="megamenu-cta-strip border-t border-border bg-muted/30 px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cta.whatsapp && (
        <div className="flex flex-col gap-2">
          <a
            href={cta.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#20BD5A] transition-colors"
            aria-label={cta.whatsapp.label}
          >
            <MessageCircle className="h-5 w-5 text-white" aria-hidden />
            {cta.whatsapp.label}
          </a>
        </div>
      )}
      {cta.callback && !hideCallback && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Phone className="h-4 w-4 text-foreground" aria-hidden />
            {cta.callback.title}
          </span>
          <form onSubmit={submitCallback} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name={FORM_SPAM_META_FIELDS.honeypot}
              value={callbackHoneypotValue}
              onChange={(event) => setCallbackHoneypotValue(event.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={cta.callback.placeholder}
              className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
            <Button type="submit" size="sm" disabled={callbackStatus === 'loading'}>
              {callbackStatus === 'loading'
                ? '…'
                : callbackStatus === 'success'
                  ? 'Gesendet'
                  : cta.callback.buttonText}
            </Button>
          </form>
          {callbackStatus === 'error' && (
            <p className="text-xs text-destructive">
              Fehler beim Senden. Bitte später erneut versuchen.
            </p>
          )}
        </div>
      )}
      {cta.newsletter && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4 text-foreground" aria-hidden />
            {cta.newsletter.title}
          </span>
          <form onSubmit={submitNewsletter} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name={FORM_SPAM_META_FIELDS.honeypot}
              value={newsletterHoneypotValue}
              onChange={(event) => setNewsletterHoneypotValue(event.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={cta.newsletter.placeholder}
              className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
            <Button type="submit" size="sm" disabled={newsletterStatus === 'loading'}>
              {newsletterStatus === 'loading'
                ? '…'
                : newsletterStatus === 'success'
                  ? 'Angemeldet'
                  : cta.newsletter.buttonText}
            </Button>
          </form>
          {newsletterStatus === 'error' && (
            <p className="text-xs text-destructive">
              Fehler beim Anmelden. Bitte später erneut versuchen.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function MegaMenuSidebar({ callback }: { callback: NonNullable<MegaMenuCta['callback']> }) {
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const phoneInputId = React.useId()

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!callback || !phone.trim()) return
    setStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: callback.formId,
          submissionData: [{ field: callback.phoneFieldName, value: phone.trim() }],
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

  return (
    <div className="megamenu-sidebar rounded-[1.75rem] border border-border bg-background/90 p-8 shadow-[0_20px_48px_-28px_rgba(15,23,42,0.35)] dark:shadow-none">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Phone className="h-4 w-4" aria-hidden />
        <span>{callback.title}</span>
      </div>
      <form onSubmit={submitCallback} className="mt-5 flex flex-col gap-3">
        <label htmlFor={phoneInputId} className="sr-only">
          Telefonnummer
        </label>
        <input
          id={phoneInputId}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={callback.placeholder}
          className="min-w-0 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          required
        />
        <Button type="submit" size="sm" disabled={status === 'loading'}>
          {status === 'loading' ? '…' : status === 'success' ? 'Gesendet' : callback.buttonText}
        </Button>
        {status === 'error' && (
          <p className="text-xs text-destructive">
            Fehler beim Senden. Bitte später erneut versuchen.
          </p>
        )}
      </form>
    </div>
  )
}

const defaultCardStyle: HighlightCardStyle = {
  borderRadius: 'rounded-lg',
  shadow: 'shadow-sm',
  hoverShadow: 'hover:shadow-md',
  hoverBorder: 'hover:border-primary/40',
}

export function MegaMenu({
  items,
  logo,
  className = '',
  columnWidths,
  megaMenuCta,
  highlightCardStyle,
}: MegaMenuProps) {
  const cardStyle = highlightCardStyle ?? defaultCardStyle
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [isPastFold, setIsPastFold] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealFromTop, setRevealFromTop] = useState(false)
  const [hideToTop, setHideToTop] = useState(false)
  const lastScrollYRef = React.useRef(0)
  const isPastFoldRef = React.useRef(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuIconActive, setMobileMenuIconActive] = useState(false)
  const [mobileActivePrimary, setMobileActivePrimary] = useState<string | null>(null)
  const [mobileDockTooltip, setMobileDockTooltip] = useState<MobileDockTooltipState | null>(null)
  const [mobileMenuOrigin, setMobileMenuOrigin] = useState<{ right: number; y: number } | null>(
    null,
  )
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileDockActionsRef = useRef<HTMLDivElement>(null)
  const mobileDockActionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const mobileDockMetricsRef = useRef<MobileDockActionMetric[]>([])
  const mobileDockPointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })
  const mobileMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileMenuOpenIconTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileDockTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileDockLongPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileDockLongPressTriggeredKeyRef = useRef<string | null>(null)
  const mobileDockSuppressClickKeyRef = useRef<string | null>(null)
  const mobileDockRafRef = useRef<number | null>(null)
  const viewportWrapperRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mouseEntrySide, setMouseEntrySide] = useState<'left' | 'right'>('left')

  const navigateToTopLevel = React.useCallback(
    (targetUrl: string) => {
      if (!targetUrl) return
      const isExternal = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(targetUrl)
      if (isExternal) {
        window.location.assign(targetUrl)
        return
      }
      router.push(targetUrl)
    },
    [router],
  )

  const cancelCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  // CSS-first close: Active state steuert in/ausblenden, JS nur Zeitverzögerung zum Verhindern von Peeking.
  const scheduleClose = (delay = 220) => {
    cancelCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimeoutRef.current = null
    }, delay)
  }

  /* Schließen verzögern (300ms): Cursor darf langsam vom Link ins Dropdown fahren, ohne dass es zugeht */
  useEffect(() => {
    const wrapper = viewportWrapperRef.current
    if (!wrapper) return
    const onEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
    }
    wrapper.addEventListener('pointerenter', onEnter)
    return () => wrapper.removeEventListener('pointerenter', onEnter)
  }, [])

  const contentCols = columnWidths?.content ?? 6
  const featuredCols = columnWidths?.featured ?? 3
  const sidebarCols = columnWidths?.sidebar ?? 3

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items],
  )
  const mobileMenuItems = useMemo(
    () =>
      sortedItems.map((item, idx) => ({
        key: getMegaMenuItemKey(item, idx),
        item,
        subLinks: collectMobileSubLinks(item, 8),
      })),
    [sortedItems],
  )
  const activeMobileEntry = useMemo(
    () => mobileMenuItems.find((entry) => entry.key === mobileActivePrimary) ?? null,
    [mobileMenuItems, mobileActivePrimary],
  )
  const activeMobileGroups = useMemo(() => {
    if (!activeMobileEntry) return []

    const groups: Array<{ title: string | null; links: MobileMenuSubLink[] }> = []

    for (const subLink of activeMobileEntry.subLinks) {
      const normalizedGroupTitle =
        typeof subLink.groupTitle === 'string' && subLink.groupTitle.trim().length > 0
          ? subLink.groupTitle.trim()
          : null
      const previousGroup = groups[groups.length - 1]

      if (previousGroup && previousGroup.title === normalizedGroupTitle) {
        previousGroup.links.push(subLink)
      } else {
        groups.push({ title: normalizedGroupTitle, links: [subLink] })
      }
    }

    return groups
  }, [activeMobileEntry])
  const mobileSubmenuPanelId = 'mobile-megamenu-secondary-panel'
  const activeMobileTriggerId = activeMobileEntry
    ? `mobile-megamenu-trigger-${toDomId(activeMobileEntry.key)}`
    : undefined
  const mobileHasSecondaryOpen = Boolean(activeMobileEntry && activeMobileEntry.subLinks.length > 0)
  const mobileDockActions = useMemo<MobileDockAction[]>(
    () => [
      {
        key: 'phone',
        href: MOBILE_DOCK_PHONE_HREF,
        label: 'Phone',
        icon: Phone,
        iconScale: 0.92,
      },
      {
        key: 'email',
        href: MOBILE_DOCK_EMAIL_HREF,
        label: 'Email',
        icon: Mail,
        iconScale: 0.92,
      },
      {
        key: 'whatsapp',
        href: MOBILE_DOCK_WHATSAPP_URL,
        label: 'WhatsApp',
        icon: WhatsAppLogoIcon,
        targetBlank: true,
        rel: 'noopener noreferrer',
        tone: 'accent',
        iconScale: 0.9,
      },
      {
        key: 'vcard',
        href: MOBILE_DOCK_VCARD_URL,
        label: 'vCard',
        icon: VCardIcon,
        download: true,
        iconScale: 0.91,
      },
      {
        key: 'calendar',
        href: MOBILE_DOCK_CALENDAR_URL,
        label: 'Calendar',
        icon: CalendarDays,
        targetBlank: true,
        rel: 'noopener noreferrer',
        iconScale: 0.92,
      },
    ],
    [],
  )
  const preloadMediaUrls = useMemo(() => collectPreloadMediaUrls(sortedItems), [sortedItems])

  const clearMobileMenuCloseTimeout = React.useCallback(() => {
    if (mobileMenuCloseTimeoutRef.current) {
      clearTimeout(mobileMenuCloseTimeoutRef.current)
      mobileMenuCloseTimeoutRef.current = null
    }
  }, [])

  const clearMobileMenuOpenIconTimeout = React.useCallback(() => {
    if (mobileMenuOpenIconTimeoutRef.current) {
      clearTimeout(mobileMenuOpenIconTimeoutRef.current)
      mobileMenuOpenIconTimeoutRef.current = null
    }
  }, [])

  const clearMobileDockTooltipTimeout = React.useCallback(() => {
    if (mobileDockTooltipTimeoutRef.current) {
      clearTimeout(mobileDockTooltipTimeoutRef.current)
      mobileDockTooltipTimeoutRef.current = null
    }
  }, [])

  const clearMobileDockLongPressTimeout = React.useCallback(() => {
    if (mobileDockLongPressTimeoutRef.current) {
      clearTimeout(mobileDockLongPressTimeoutRef.current)
      mobileDockLongPressTimeoutRef.current = null
    }
  }, [])

  const clearMobileDockRaf = React.useCallback(() => {
    if (mobileDockRafRef.current != null) {
      window.cancelAnimationFrame(mobileDockRafRef.current)
      mobileDockRafRef.current = null
    }
  }, [])

  const setMobileDockActionRef = React.useCallback((key: string, node: HTMLElement | null) => {
    if (node) {
      mobileDockActionRefs.current.set(key, node)
      return
    }
    mobileDockActionRefs.current.delete(key)
  }, [])

  const measureMobileDockMetrics = React.useCallback(() => {
    const metrics: MobileDockActionMetric[] = []

    for (const action of mobileDockActions) {
      const el = mobileDockActionRefs.current.get(action.key)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      metrics.push({
        key: action.key,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        el,
      })
    }

    mobileDockMetricsRef.current = metrics
  }, [mobileDockActions])

  const applyMobileDockMotion = React.useCallback(() => {
    mobileDockRafRef.current = null
    const containerEl = mobileDockActionsRef.current
    if (!containerEl) return

    const pointer = mobileDockPointerRef.current
    const metrics = mobileDockMetricsRef.current

    if (metrics.length === 0) return

    if (!pointer.active) {
      containerEl.dataset.interacting = 'false'
      for (const metric of metrics) {
        metric.el.style.setProperty('--mobile-dock-scale', '1')
        metric.el.style.setProperty('--mobile-dock-lift', '0px')
        metric.el.style.setProperty('--mobile-dock-z', '1')
      }
      return
    }

    containerEl.dataset.interacting = 'true'

    for (const metric of metrics) {
      const dx = pointer.x - metric.centerX
      const dy = pointer.y - metric.centerY
      const distance = Math.hypot(dx, dy * 1.15)
      const normalized = Math.max(0, 1 - distance / MOBILE_DOCK_PROXIMITY_RADIUS)
      const eased = normalized * normalized * (3 - 2 * normalized)
      const scale = 1 + eased * 0.25
      const lift = -6 * eased
      const z = 1 + Math.round(eased * 24)
      metric.el.style.setProperty('--mobile-dock-scale', scale.toFixed(3))
      metric.el.style.setProperty('--mobile-dock-lift', `${lift.toFixed(2)}px`)
      metric.el.style.setProperty('--mobile-dock-z', String(z))
    }
  }, [])

  const queueMobileDockMotion = React.useCallback(() => {
    if (mobileDockRafRef.current != null) return
    mobileDockRafRef.current = window.requestAnimationFrame(() => {
      applyMobileDockMotion()
    })
  }, [applyMobileDockMotion])

  const setMobileDockPointer = React.useCallback(
    (x: number, y: number) => {
      mobileDockPointerRef.current = { x, y, active: true }
      queueMobileDockMotion()
    },
    [queueMobileDockMotion],
  )

  const clearMobileDockPointer = React.useCallback(() => {
    mobileDockPointerRef.current.active = false
    queueMobileDockMotion()
  }, [queueMobileDockMotion])

  const triggerMobileDockHaptic = React.useCallback((duration = 8) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration)
    }
  }, [])

  const spawnMobileDockRipple = React.useCallback((actionEl: HTMLElement, x: number, y: number) => {
    const rect = actionEl.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.8
    const rippleEl = document.createElement('span')
    rippleEl.className = 'mobile-megamenu-contact-action-ripple'
    rippleEl.style.width = `${size}px`
    rippleEl.style.height = `${size}px`
    rippleEl.style.left = `${x - rect.left - size / 2}px`
    rippleEl.style.top = `${y - rect.top - size / 2}px`
    actionEl.appendChild(rippleEl)
    rippleEl.addEventListener('animationend', () => rippleEl.remove(), { once: true })
  }, [])

  const showMobileDockTooltip = React.useCallback(
    (label: string, actionEl?: HTMLElement | null, autoHideMs?: number) => {
      clearMobileDockTooltipTimeout()
      let x = 0
      if (actionEl && mobileDockActionsRef.current) {
        const actionRect = actionEl.getBoundingClientRect()
        const dockRect = mobileDockActionsRef.current.getBoundingClientRect()
        const centerX = actionRect.left + actionRect.width / 2 - dockRect.left
        x = Math.max(20, Math.min(dockRect.width - 20, centerX))
      }
      setMobileDockTooltip({ label, x })
      if (typeof autoHideMs === 'number' && autoHideMs > 0) {
        mobileDockTooltipTimeoutRef.current = setTimeout(() => {
          setMobileDockTooltip(null)
          mobileDockTooltipTimeoutRef.current = null
        }, autoHideMs)
      }
    },
    [clearMobileDockTooltipTimeout],
  )

  const clearMobileDockTooltip = React.useCallback(() => {
    clearMobileDockTooltipTimeout()
    setMobileDockTooltip(null)
  }, [clearMobileDockTooltipTimeout])

  const handleDockActionsPointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      measureMobileDockMetrics()
      setMobileDockPointer(event.clientX, event.clientY)
    },
    [measureMobileDockMetrics, setMobileDockPointer],
  )

  const handleDockActionsPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setMobileDockPointer(event.clientX, event.clientY)
    },
    [setMobileDockPointer],
  )

  const handleDockActionsPointerLeave = React.useCallback(() => {
    clearMobileDockLongPressTimeout()
    clearMobileDockPointer()
  }, [clearMobileDockLongPressTimeout, clearMobileDockPointer])

  const removeDockPressedState = React.useCallback((actionEl: HTMLElement) => {
    actionEl.removeAttribute('data-pressed')
    window.setTimeout(() => {
      if (!actionEl.matches(':focus-visible, :hover')) {
        actionEl.removeAttribute('data-active')
      }
    }, 220)
  }, [])

  const handleDockActionPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLElement>, action: MobileDockAction) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      const actionEl = event.currentTarget
      actionEl.setAttribute('data-pressed', 'true')
      actionEl.setAttribute('data-active', 'true')
      if (actionEl.setPointerCapture) {
        try {
          actionEl.setPointerCapture(event.pointerId)
        } catch {
          // Ignore pointer capture errors on unsupported platforms.
        }
      }
      measureMobileDockMetrics()
      setMobileDockPointer(event.clientX, event.clientY)
      spawnMobileDockRipple(actionEl, event.clientX, event.clientY)
      triggerMobileDockHaptic(6)
      clearMobileDockLongPressTimeout()
      mobileDockLongPressTriggeredKeyRef.current = null

      mobileDockLongPressTimeoutRef.current = setTimeout(() => {
        mobileDockLongPressTriggeredKeyRef.current = action.key
        mobileDockSuppressClickKeyRef.current = action.key
        actionEl.removeAttribute('data-pressed')
        actionEl.setAttribute('data-active', 'true')
        showMobileDockTooltip(action.label, actionEl, MOBILE_DOCK_TOOLTIP_AUTOHIDE_MS)
        triggerMobileDockHaptic(12)
        window.setTimeout(() => {
          if (mobileDockSuppressClickKeyRef.current === action.key) {
            mobileDockSuppressClickKeyRef.current = null
          }
        }, 650)
      }, MOBILE_DOCK_LONG_PRESS_MS)
    },
    [
      clearMobileDockLongPressTimeout,
      measureMobileDockMetrics,
      setMobileDockPointer,
      showMobileDockTooltip,
      spawnMobileDockRipple,
      triggerMobileDockHaptic,
    ],
  )

  const handleDockActionPointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLElement>, action: MobileDockAction) => {
      clearMobileDockLongPressTimeout()
      if (event.currentTarget.releasePointerCapture) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          // Ignore pointer capture errors on unsupported platforms.
        }
      }
      removeDockPressedState(event.currentTarget)
      clearMobileDockPointer()
      if (mobileDockLongPressTriggeredKeyRef.current === action.key) {
        mobileDockLongPressTriggeredKeyRef.current = null
      }
    },
    [clearMobileDockLongPressTimeout, clearMobileDockPointer, removeDockPressedState],
  )

  const handleDockActionPointerCancel = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      clearMobileDockLongPressTimeout()
      if (event.currentTarget.releasePointerCapture) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          // Ignore pointer capture errors on unsupported platforms.
        }
      }
      removeDockPressedState(event.currentTarget)
      clearMobileDockPointer()
    },
    [clearMobileDockLongPressTimeout, clearMobileDockPointer, removeDockPressedState],
  )

  const handleDockActionFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>, action: MobileDockAction) => {
      event.currentTarget.setAttribute('data-active', 'true')
      showMobileDockTooltip(action.label, event.currentTarget)
    },
    [showMobileDockTooltip],
  )

  const handleDockActionBlur = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      removeDockPressedState(event.currentTarget)
      clearMobileDockTooltip()
    },
    [clearMobileDockTooltip, removeDockPressedState],
  )

  const handleDockActionMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, action: MobileDockAction) => {
      event.currentTarget.setAttribute('data-active', 'true')
      showMobileDockTooltip(action.label, event.currentTarget)
    },
    [showMobileDockTooltip],
  )

  const handleDockActionMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!event.currentTarget.matches(':focus-visible')) {
        event.currentTarget.removeAttribute('data-active')
      }
      clearMobileDockTooltip()
    },
    [clearMobileDockTooltip],
  )

  const handleDockActionClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, action: MobileDockAction) => {
      if (mobileDockSuppressClickKeyRef.current === action.key) {
        event.preventDefault()
        event.stopPropagation()
        mobileDockSuppressClickKeyRef.current = null
        return
      }
      const actionEl = event.currentTarget
      actionEl.setAttribute('data-active', 'true')
      clearMobileDockTooltip()
      // Keep the dock visible a moment so ripple/tap feedback remains perceptible.
      window.setTimeout(() => {
        setMobileMenuIconActive(false)
        setMobileMenuOpen(false)
      }, 170)
    },
    [clearMobileDockTooltip],
  )

  const handleDockActionKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>, action: MobileDockAction) => {
      if (event.key !== 'Enter' && event.key !== ' ') return

      const actionEl = event.currentTarget
      const rect = actionEl.getBoundingClientRect()
      actionEl.setAttribute('data-pressed', 'true')
      actionEl.setAttribute('data-active', 'true')
      spawnMobileDockRipple(actionEl, rect.left + rect.width / 2, rect.top + rect.height / 2)
      showMobileDockTooltip(action.label, actionEl, MOBILE_DOCK_TOOLTIP_AUTOHIDE_MS)

      if (event.key === ' ') {
        event.preventDefault()
        actionEl.click()
      }
    },
    [showMobileDockTooltip, spawnMobileDockRipple],
  )

  const handleDockActionKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      removeDockPressedState(event.currentTarget)
    },
    [removeDockPressedState],
  )

  const syncMobileMenuOrigin = React.useCallback(() => {
    if (typeof window === 'undefined') return
    const triggerEl = mobileMenuTriggerRef.current
    if (!triggerEl) return
    const rect = triggerEl.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMobileMenuOrigin({
      right: Math.max(0, window.innerWidth - centerX),
      y: Math.max(0, centerY),
    })
  }, [])

  const resetMobileDockState = React.useCallback(() => {
    clearMobileDockRaf()
    clearMobileDockLongPressTimeout()
    clearMobileDockTooltip()
    clearMobileDockPointer()
    mobileDockSuppressClickKeyRef.current = null
    mobileDockLongPressTriggeredKeyRef.current = null
    for (const actionEl of mobileDockActionRefs.current.values()) {
      actionEl.removeAttribute('data-pressed')
      actionEl.removeAttribute('data-active')
      actionEl.style.setProperty('--mobile-dock-scale', '1')
      actionEl.style.setProperty('--mobile-dock-lift', '0px')
      actionEl.style.setProperty('--mobile-dock-z', '1')
    }
    const containerEl = mobileDockActionsRef.current
    if (containerEl) {
      containerEl.dataset.interacting = 'false'
    }
  }, [
    clearMobileDockLongPressTimeout,
    clearMobileDockPointer,
    clearMobileDockTooltip,
    clearMobileDockRaf,
  ])

  const openMobileMenu = React.useCallback(() => {
    syncMobileMenuOrigin()
    clearMobileMenuCloseTimeout()
    clearMobileMenuOpenIconTimeout()
    setMobileMenuOpen(true)
    setMobileMenuIconActive(false)
    mobileMenuOpenIconTimeoutRef.current = setTimeout(() => {
      setMobileMenuIconActive(true)
      mobileMenuOpenIconTimeoutRef.current = null
    }, 26)
  }, [syncMobileMenuOrigin, clearMobileMenuCloseTimeout, clearMobileMenuOpenIconTimeout])

  const closeMobileMenu = React.useCallback(() => {
    clearMobileMenuCloseTimeout()
    clearMobileMenuOpenIconTimeout()
    resetMobileDockState()
    setMobileMenuIconActive(false)
    mobileMenuCloseTimeoutRef.current = setTimeout(() => {
      setMobileMenuOpen(false)
      mobileMenuCloseTimeoutRef.current = null
    }, HAM_ICON_ANIMATION_MS)
  }, [clearMobileMenuCloseTimeout, clearMobileMenuOpenIconTimeout, resetMobileDockState])

  const toggleMobileMenu = React.useCallback(() => {
    if (mobileMenuOpen) {
      closeMobileMenu()
      return
    }
    openMobileMenu()
  }, [mobileMenuOpen, closeMobileMenu, openMobileMenu])

  const handleMobileMenuOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        openMobileMenu()
        return
      }
      closeMobileMenu()
    },
    [openMobileMenu, closeMobileMenu],
  )

  const handleMobileMenuIconToggle = React.useCallback(
    (nextActive: boolean) => {
      if (nextActive) {
        openMobileMenu()
        return
      }
      closeMobileMenu()
    },
    [openMobileMenu, closeMobileMenu],
  )

  useEffect(() => {
    clearMobileMenuCloseTimeout()
    clearMobileMenuOpenIconTimeout()
    resetMobileDockState()
    setMobileMenuOpen(false)
    setMobileMenuIconActive(false)
    setMobileActivePrimary(null)
  }, [pathname, clearMobileMenuCloseTimeout, clearMobileMenuOpenIconTimeout, resetMobileDockState])

  useEffect(() => {
    return () => {
      clearMobileMenuCloseTimeout()
      clearMobileMenuOpenIconTimeout()
      clearMobileDockTooltipTimeout()
      clearMobileDockLongPressTimeout()
      clearMobileDockRaf()
    }
  }, [
    clearMobileMenuCloseTimeout,
    clearMobileMenuOpenIconTimeout,
    clearMobileDockTooltipTimeout,
    clearMobileDockLongPressTimeout,
    clearMobileDockRaf,
  ])

  useEffect(() => {
    if (!mobileMenuOpen) return
    setActiveMenu(null)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleResize = () => syncMobileMenuOrigin()
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen, syncMobileMenuOrigin])

  useEffect(() => {
    if (!mobileMenuOpen) {
      resetMobileDockState()
      return
    }

    const measureDock = () => {
      measureMobileDockMetrics()
      queueMobileDockMotion()
    }

    measureDock()
    const rafId = window.requestAnimationFrame(measureDock)
    window.addEventListener('resize', measureDock)
    window.addEventListener('orientationchange', measureDock)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', measureDock)
      window.removeEventListener('orientationchange', measureDock)
    }
  }, [mobileMenuOpen, measureMobileDockMetrics, queueMobileDockMotion, resetMobileDockState])

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileActivePrimary(null)
      return
    }
    if (mobileActivePrimary == null) return
    const activeStillExists = mobileMenuItems.some(
      (entry) => entry.key === mobileActivePrimary && entry.subLinks.length > 0,
    )
    if (!activeStillExists) {
      setMobileActivePrimary(null)
    }
  }, [mobileMenuOpen, mobileMenuItems, mobileActivePrimary])

  useEffect(() => {
    if (typeof window === 'undefined' || preloadMediaUrls.length === 0) return
    const preloaded: HTMLImageElement[] = []

    for (const url of preloadMediaUrls) {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = url
      preloaded.push(img)
    }

    return () => {
      // Prevent stale handlers from hanging around if menu data changes.
      for (const img of preloaded) {
        img.onload = null
        img.onerror = null
      }
    }
  }, [preloadMediaUrls])

  /* Dropdown-Inhalt beim Öffnen/Wechsel wieder nach oben scrollen */
  useEffect(() => {
    if (!activeMenu) return
    const wrapper = viewportWrapperRef.current
    if (!wrapper) return

    wrapper.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeMenu])
  useEffect(() => {
    if (!activeMenu) return
    const wrapper = viewportWrapperRef.current
    if (!wrapper) return

    // Stellt sicher, dass beim Itemwechsel nichts im unteren Bereich hängen bleibt
    wrapper.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeMenu])

  useEffect(() => {
    const stickyEnterThresholdPx = 0
    const stickyLeaveThresholdPx = 0
    const minDeltaForTogglePx = 6

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const prevScrollY = lastScrollYRef.current
      const delta = currentScrollY - prevScrollY
      lastScrollYRef.current = currentScrollY
      const scrollingDown = delta > 0
      const scrollingUp = delta < 0
      const absDelta = Math.abs(delta)
      setIsScrolled(currentScrollY > 20)

      // Sticky activation starts at page top instead of over-the-fold.

      const wasPastFold = isPastFoldRef.current
      const nextPastFold = wasPastFold
        ? currentScrollY > stickyLeaveThresholdPx
        : currentScrollY >= stickyEnterThresholdPx

      if (nextPastFold !== wasPastFold) {
        if (wasPastFold && !nextPastFold) {
          setHideToTop(false)
          setRevealFromTop(false)
          setIsVisible(true)
        }
        isPastFoldRef.current = nextPastFold
        setIsPastFold(nextPastFold)
      }

      setIsVisible((prev) => {
        // Keep visible while dropdown is open.
        if (activeMenu != null) {
          return true
        }
        let next = prev
        const hideAfterPx = 1

        if (!nextPastFold) {
          if (wasPastFold && !nextPastFold) {
            setHideToTop(false)
            setRevealFromTop(false)
          }
          next = true
        } else {
          if (scrollingDown && absDelta >= minDeltaForTogglePx && currentScrollY >= hideAfterPx) {
            next = false
          } else if (scrollingUp && absDelta >= minDeltaForTogglePx) {
            next = true
          }
        }

        if (prev === next) return prev

        setRevealFromTop(prev === false && next === true && nextPastFold && scrollingUp)
        setHideToTop(prev === true && next === false && nextPastFold && scrollingDown)

        return next
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeMenu])

  return (
    <>
      <HeaderGlassPlate
        glassActive={isScrolled}
        hideToTop={hideToTop}
        isVisible={isVisible}
        revealFromTop={revealFromTop}
      />
      {/* Background Blur Overlay – 1:1 test2 */}
      <div
        className={cn(
          'megamenu-overlay fixed inset-0 z-50 bg-background/20 backdrop-blur-md pointer-events-none opacity-0 transition-[opacity] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          activeMenu != null && 'opacity-100 pointer-events-auto',
        )}
      />

      <header
        className={cn('megamenu z-50 w-full', className)}
        data-scrolled={isScrolled ? 'true' : undefined}
        data-sticky={isPastFold ? 'true' : undefined}
        data-menu-open={activeMenu != null ? 'true' : undefined}
      >
        <div
          className={cn(
            'header-slide-layer transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.12,0.95,0.22,1)]',
            'header-glass-border',
            revealFromTop && 'header-reveal-from-top',
            hideToTop && 'header-hide-to-top',
            isVisible || hideToTop
              ? 'translate-y-0 opacity-100 visible'
              : '-translate-y-[115%] opacity-0 pointer-events-none invisible',
          )}
          onAnimationEnd={() => {
            setRevealFromTop(false)
            setHideToTop(false)
          }}
        >
          <div className="container flex h-24 flex-col px-4 pt-9 pb-2">
            <div className="header-main-row flex flex-1 items-stretch justify-between">
              <div className="flex items-center">{logo}</div>
              <div
                className="megamenu-nav-wrap flex h-full items-stretch gap-4"
                onPointerEnter={cancelCloseTimeout}
                onPointerLeave={() => scheduleClose(180)}
              >
                <NavigationMenu
                  className="megamenu-nav hidden lg:flex lg:h-full lg:flex-initial lg:ml-auto"
                  value={activeMenu ?? ''}
                  onValueChange={(value) => {
                    const next = value || null
                    if (next !== '' && next !== null) {
                      cancelCloseTimeout()
                      setActiveMenu(next)
                      return
                    }

                    scheduleClose(300)
                  }}
                  viewportWrapperRef={viewportWrapperRef}
                >
                  <div className="megamenu-nav-list-wrap relative flex h-full flex-1 justify-end">
                    <NavigationMenuList className="megamenu-nav-list h-full justify-end">
                      {sortedItems.map((item, idx) => {
                        const menuItemKey = getMegaMenuItemKey(item, idx)
                        const hasDrop = hasDropdown(item)
                        const value = menuItemKey

                        if (hasDrop) {
                          const cols = item.columns ?? []
                          const cw = item.columnWidths
                          const sidebarSpan = cw?.col1 != null ? Number(cw.col1) : sidebarCols
                          const contentSpan = cw?.col2 != null ? Number(cw.col2) : contentCols
                          const featuredSpan = cw?.col3 != null ? Number(cw.col3) : featuredCols
                          const allItemsFromColumns = cols.flatMap((col) =>
                            (col.items ?? []).map((sub) => ({
                              ...sub,
                              _groupTitle: col.title,
                              _isSpecialColumn: isSpecialMegaMenuColumn(col),
                            })),
                          )
                          const listItems =
                            allItemsFromColumns.length > 0
                              ? allItemsFromColumns
                              : (item.subItems ?? []).map((s) => ({
                                  ...s,
                                  _groupTitle: null,
                                  _isSpecialColumn: false,
                                }))
                          const hasGroupTitles = listItems.some(
                            (x: { _groupTitle?: string | null }) =>
                              x._groupTitle != null && x._groupTitle !== '',
                          )
                          const blockCount = listItems.length
                          const blockInitialDelayMs = 24
                          const blockStaggerMs = 72
                          const highlightStartAfterLastBlockMs = 110
                          const highlightDelayMs =
                            blockCount > 0
                              ? blockInitialDelayMs +
                                (blockCount - 1) * blockStaggerMs +
                                highlightStartAfterLastBlockMs
                              : blockInitialDelayMs + 80
                          const nonEmptyMegaCols = cols.filter((c) => (c.items?.length ?? 0) > 0)
                          const singleMegaColumnGroup = nonEmptyMegaCols.length === 1
                          const columnItemStartIndices: number[] = []
                          let runningBlockIndex = 0
                          for (const col of cols) {
                            columnItemStartIndices.push(runningBlockIndex)
                            runningBlockIndex += col.items?.length ?? 0
                          }

                          // Nur Spalten mit Inhalt anzeigen; Breiten aus Backend (Header → Mega-Menü Spaltenbreiten)
                          const catDesc = item.categoryDescription
                          const showCategoryIntro =
                            catDesc != null &&
                            (Boolean(catDesc.title && String(catDesc.title).trim()) ||
                              Boolean(catDesc.description && String(catDesc.description).trim()))
                          const hasCol2 = listItems.length > 0
                          const hasHighlightCards =
                            Array.isArray(item.highlight?.cards) && item.highlight.cards.length > 0
                          const hasLegacyHighlight =
                            item.highlight != null &&
                            ((item.highlight.title != null && item.highlight.title !== '') ||
                              (item.highlight.description != null &&
                                item.highlight.description !== '') ||
                              (item.highlight.icon != null && mediaUrl(item.highlight.icon)) ||
                              (item.highlight.image != null && mediaUrl(item.highlight.image)) ||
                              (item.highlight.ctaUrl != null && item.highlight.ctaUrl !== ''))
                          const hasCol3 =
                            item.highlight != null && (hasHighlightCards || hasLegacyHighlight)
                          const callbackSidebar = megaMenuCta?.callback ?? null

                          const cardItems: Array<{
                            title?: string | null
                            description?: string | null
                            icon?: MediaRef
                            image?: MediaRef
                            ctaLabel?: string | null
                            ctaUrl?: string | null
                          }> = hasHighlightCards
                            ? item.highlight!.cards!
                            : hasLegacyHighlight && item.highlight
                              ? [
                                  {
                                    title: item.highlight.title,
                                    description: item.highlight.description,
                                    icon: item.highlight.icon,
                                    image: item.highlight.image,
                                    ctaLabel: item.highlight.ctaLabel,
                                    ctaUrl: item.highlight.ctaUrl,
                                  },
                                ]
                              : []

                          const visibleColumns: Array<{
                            span: number
                            key: string
                            content: React.ReactNode
                          }> = []
                          if (callbackSidebar) {
                            visibleColumns.push({
                              span: sidebarSpan,
                              key: 'sidebar',
                              content: <MegaMenuSidebar callback={callbackSidebar} />,
                            })
                          }
                          if (hasCol2) {
                            visibleColumns.push({
                              span: contentSpan,
                              key: 'items',
                              content: hasGroupTitles ? (
                                <div className="grid grid-cols-12 gap-6">
                                  {cols.map((col, colIdx) =>
                                    (col.items?.length ?? 0) > 0 ? (
                                      <div
                                        key={getMegaMenuColumnKey(col, colIdx)}
                                        className={cn(
                                          'space-y-3 min-w-0',
                                          colSpan(
                                            singleMegaColumnGroup
                                              ? 12
                                              : Math.min(12, Math.max(1, col.columnWidth ?? 4)),
                                          ),
                                        )}
                                      >
                                        {col.title != null && col.title !== '' && (
                                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                            {col.title}
                                          </h4>
                                        )}
                                        <ul
                                          className={cn(
                                            'grid gap-y-4',
                                            (col.items?.length ?? 0) > 4
                                              ? 'grid-cols-2 gap-x-8'
                                              : 'grid-cols-1',
                                          )}
                                        >
                                          {(col.items ?? []).map((sub, idx) => {
                                            const rawMedia = sub.image ?? sub.icon ?? null
                                            const iconUrl = rawMedia ? mediaUrl(rawMedia) : ''
                                            const iconSpriteId = null
                                            const listKey = getMegaMenuSubItemKey(sub, idx)
                                            const isSpecialColumn = isSpecialMegaMenuColumn(col)

                                            return (
                                              <ListItem
                                                key={listKey}
                                                title={sub.label}
                                                href={sub.url}
                                                animationIndex={
                                                  (columnItemStartIndices[colIdx] ?? 0) + idx
                                                }
                                                isButton={isSpecialColumn}
                                                icon={
                                                  iconSpriteId ? (
                                                    <svg className="h-4 w-4" aria-hidden="true">
                                                      <use
                                                        href={`/icons-sprite.svg#${iconSpriteId}`}
                                                      />
                                                    </svg>
                                                  ) : iconUrl ? (
                                                    <ResilientImage
                                                      src={iconUrl}
                                                      alt=""
                                                      className="h-4 w-4 object-contain"
                                                      decoding="sync"
                                                    />
                                                  ) : undefined
                                                }
                                              >
                                                {sub.description ?? ''}
                                              </ListItem>
                                            )
                                          })}
                                        </ul>
                                      </div>
                                    ) : null,
                                  )}
                                </div>
                              ) : (
                                <ul
                                  className={cn(
                                    'grid gap-y-4',
                                    listItems.length > 4 ? 'grid-cols-2 gap-x-8' : 'grid-cols-1',
                                  )}
                                >
                                  {listItems.map(
                                    (
                                      sub: {
                                        label: string
                                        url: string
                                        description?: string | null
                                        icon?: MediaRef
                                        image?: MediaRef
                                        _isSpecialColumn?: boolean
                                      },
                                      idx: number,
                                    ) => {
                                      const rawMedia = sub.image ?? sub.icon ?? null
                                      const iconUrl = rawMedia ? mediaUrl(rawMedia) : ''
                                      const iconSpriteId = null
                                      const listKey = getMegaMenuSubItemKey(sub, idx)

                                      return (
                                        <ListItem
                                          key={listKey}
                                          title={sub.label}
                                          href={sub.url}
                                          animationIndex={idx}
                                          isButton={Boolean(sub._isSpecialColumn)}
                                          icon={
                                            iconSpriteId ? (
                                              <svg className="h-4 w-4" aria-hidden="true">
                                                <use href={`/icons-sprite.svg#${iconSpriteId}`} />
                                              </svg>
                                            ) : iconUrl ? (
                                              <ResilientImage
                                                src={iconUrl}
                                                alt=""
                                                className="h-4 w-4 object-contain"
                                                decoding="sync"
                                              />
                                            ) : undefined
                                          }
                                        >
                                          {sub.description ?? ''}
                                        </ListItem>
                                      )
                                    },
                                  )}
                                </ul>
                              ),
                            })
                          }
                          const highlightPosition = item.highlight?.position ?? 'right'
                          const roundedT =
                            cardStyle.borderRadius === 'rounded-xl'
                              ? 'rounded-t-xl'
                              : cardStyle.borderRadius === 'rounded-lg'
                                ? 'rounded-t-lg'
                                : 'rounded-t-none'
                          const highlightContent =
                            hasCol3 && cardItems.length > 0 ? (
                              <div className={cn('grid gap-4', highlightPosition === 'below')}>
                                {cardItems.map((card, cardIdx) => {
                                  const cardTitle =
                                    card.title != null && card.title !== '' ? card.title : null
                                  const cardDesc =
                                    card.description != null && card.description !== ''
                                      ? card.description
                                      : null
                                  const cardKey = getMegaMenuCardKey(card, cardIdx)
                                  const cardIconUrl = card.icon != null ? mediaUrl(card.icon) : ''
                                  const cardIconSpriteId = null
                                  const cardImageUrl =
                                    card.image != null ? mediaUrl(card.image) : ''
                                  const cardCtaUrl =
                                    card.ctaUrl != null && card.ctaUrl !== '' ? card.ctaUrl : null
                                  const cardCtaLabel = card.ctaLabel ?? 'Mehr'
                                  const hasMedia = cardImageUrl || cardIconUrl
                                  const cardClassName = cn(
                                    'group/card border-0 bg-card text-card-foreground transition-all duration-200',
                                    cardStyle.borderRadius,
                                    cardStyle.shadow,
                                    cardStyle.hoverShadow,
                                    cardStyle.hoverBorder,
                                  )
                                  const mediaBlock = (
                                    <>
                                      {cardImageUrl && (
                                        <div
                                          className={cn(
                                            'relative overflow-hidden bg-muted group/card',
                                            highlightPosition === 'below'
                                              ? 'aspect-square min-w-[100px] w-[100px] shrink-0 rounded-l-lg'
                                              : cn('aspect-video w-full', roundedT),
                                          )}
                                        >
                                          <img
                                            src={cardImageUrl}
                                            alt={cardTitle ?? ''}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-[1.02]"
                                            loading="eager"
                                            decoding="sync"
                                          />
                                          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover/card:bg-black/5" />
                                        </div>
                                      )}
                                      {!cardImageUrl && cardIconUrl && (
                                        <div
                                          className={cn(
                                            'flex shrink-0 items-center justify-center overflow-hidden bg-muted/60 p-2.5 [&_img]:h-full [&_img]:w-full [&_img]:object-contain',
                                            highlightPosition === 'below'
                                              ? 'h-full min-w-[100px] w-[100px] rounded-l-lg'
                                              : 'megamenu-item-icon h-14 w-14 rounded-lg',
                                          )}
                                        >
                                          {cardIconSpriteId ? (
                                            <svg className="h-6 w-6" aria-hidden="true">
                                              <use href={`/icons-sprite.svg#${cardIconSpriteId}`} />
                                            </svg>
                                          ) : (
                                            <ResilientImage
                                              src={cardIconUrl}
                                              alt=""
                                              decoding="sync"
                                            />
                                          )}
                                        </div>
                                      )}
                                    </>
                                  )
                                  const textBlock = (
                                    <CardContent
                                      className={cn(
                                        hasMedia && highlightPosition !== 'below'
                                          ? 'pt-4'
                                          : hasMedia && highlightPosition === 'below'
                                            ? 'py-3 pl-4 pr-4'
                                            : 'pt-6',
                                      )}
                                    >
                                      <div className="flex flex-col gap-2">
                                        {cardTitle && (
                                          <h4 className="text-sm font-semibold leading-tight">
                                            {cardTitle}
                                          </h4>
                                        )}
                                        {cardDesc && (
                                          <p className="max-h-48 min-h-0 overflow-y-auto break-words text-sm text-muted-foreground leading-snug">
                                            {cardDesc}
                                          </p>
                                        )}
                                        {cardCtaUrl && (
                                          <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                                            {cardCtaLabel}
                                            <ChevronRight className="h-4 w-4 shrink-0" />
                                          </span>
                                        )}
                                      </div>
                                    </CardContent>
                                  )
                                  const inner =
                                    highlightPosition === 'below' && hasMedia ? (
                                      <div className="flex min-h-[80px] min-w-0 items-stretch">
                                        {mediaBlock}
                                        {textBlock}
                                      </div>
                                    ) : (
                                      <>
                                        {mediaBlock}
                                        {textBlock}
                                      </>
                                    )
                                  const cardEl = <Card className={cardClassName}>{inner}</Card>
                                  return cardCtaUrl ? (
                                    <Link
                                      key={cardKey}
                                      href={cardCtaUrl}
                                      className="block no-underline text-left text-inherit outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                      {cardEl}
                                    </Link>
                                  ) : (
                                    <div key={cardKey}>{cardEl}</div>
                                  )
                                })}
                              </div>
                            ) : null

                          if (hasCol3 && item.highlight != null && highlightPosition === 'right') {
                            const usePathsBg = item.highlight?.background === 'paths'
                            const useThreadsBg = item.highlight?.background === 'threads'
                            const useGradientBg = item.highlight?.background === 'gradient'
                            const useCustomBg = usePathsBg || useThreadsBg || useGradientBg
                            visibleColumns.push({
                              span: featuredSpan,
                              key: 'highlight',
                              content: (
                                <div
                                  className="megamenu-highlight-wipe-wrap overflow-hidden"
                                  data-wipe={mouseEntrySide}
                                >
                                  {useCustomBg ? (
                                    <div
                                      className="relative min-h-[200px]"
                                      style={
                                        useGradientBg
                                          ? {
                                              background:
                                                'radial-gradient(125% 125% at 50% 10%, var(--background) 40%, var(--primary) 100%)',
                                            }
                                          : undefined
                                      }
                                    >
                                      {usePathsBg && (
                                        <PathsBackground
                                          strokeColor="currentColor"
                                          strokeOpacity={0.14}
                                          className="text-muted-foreground/60"
                                        />
                                      )}
                                      {useThreadsBg && (
                                        <ThreadsBackground
                                          strokeColor="currentColor"
                                          strokeOpacity={0.14}
                                          amplitude={3.6}
                                          distance={2}
                                          className="text-muted-foreground/60"
                                        />
                                      )}
                                      <div className="relative z-10">{highlightContent}</div>
                                    </div>
                                  ) : (
                                    highlightContent
                                  )}
                                </div>
                              ),
                            })
                          }

                          return (
                            <NavigationMenuItem key={menuItemKey} value={value}>
                              <NavigationMenuTrigger
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  'megamenu-top-item cursor-pointer',
                                )}
                                onPointerEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect()
                                  setMouseEntrySide(
                                    e.clientX < rect.left + rect.width / 2 ? 'left' : 'right',
                                  )
                                }}
                                onClick={(event) => {
                                  event.preventDefault()
                                  event.stopPropagation()
                                  cancelCloseTimeout()
                                  setActiveMenu(null)
                                  navigateToTopLevel(item.url)
                                }}
                              >
                                {item.label}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <div
                                  className="w-full"
                                  onPointerEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    setMouseEntrySide(
                                      e.clientX < rect.left + rect.width / 2 ? 'left' : 'right',
                                    )
                                  }}
                                >
                                  {((showCategoryIntro && catDesc) || visibleColumns.length > 0) &&
                                    (() => {
                                      const hasHighlightInRow = visibleColumns.some(
                                        (c) => c.key === 'highlight',
                                      )
                                      const twoColsInRow =
                                        visibleColumns.length === 2 && hasHighlightInRow
                                      const totalPF = Math.max(1, contentSpan + featuredSpan)
                                      const xlMainCols = Math.max(
                                        1,
                                        Math.min(11, Math.round((12 * contentSpan) / totalPF)),
                                      )
                                      const xlSideCols = 12 - xlMainCols
                                      const highlightColsFlex = Math.min(3, xlSideCols)
                                      const itemsColsFlex = 12 - highlightColsFlex
                                      return (
                                        <div className="megamenu-dropdown-panel">
                                          {showCategoryIntro && catDesc && (
                                            <div className="megamenu-dropdown-intro px-8 pt-8 pb-4 border-b border-border/60">
                                              {catDesc.title != null &&
                                                String(catDesc.title).trim() !== '' && (
                                                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                                                    {catDesc.title}
                                                  </h2>
                                                )}
                                              {catDesc.description != null &&
                                                String(catDesc.description).trim() !== '' && (
                                                  <p
                                                    className={cn(
                                                      'text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap',
                                                      catDesc.title != null &&
                                                        String(catDesc.title).trim() !== '' &&
                                                        'mt-2',
                                                    )}
                                                  >
                                                    {catDesc.description}
                                                  </p>
                                                )}
                                            </div>
                                          )}
                                          {visibleColumns.length > 0 && (
                                            <div
                                              className="megamenu-dropdown-content grid grid-cols-12"
                                              style={
                                                {
                                                  '--megamenu-block-count': blockCount,
                                                  '--megamenu-highlight-delay': `${highlightDelayMs}ms`,
                                                } as React.CSSProperties
                                              }
                                            >
                                              {visibleColumns.map((col, idx) => {
                                                const flexMiddle = twoColsInRow
                                                const isItemsCol = col.key === 'items'
                                                const isHighlightCol = col.key === 'highlight'
                                                const getSpan = () => {
                                                  /* Nur eine Spalte (z. B. nur Links): volle Dropdown-Breite statt contentCols/6 */
                                                  if (visibleColumns.length === 1)
                                                    return col.key === 'sidebar'
                                                      ? colSpan(col.span)
                                                      : 'col-span-12'
                                                  if (isItemsCol && flexMiddle)
                                                    return cn(
                                                      'col-span-12',
                                                      lgColSpan(itemsColsFlex),
                                                    )
                                                  if (isItemsCol) return colSpan(col.span)
                                                  if (isHighlightCol && flexMiddle)
                                                    return cn(
                                                      'col-span-12',
                                                      lgColSpan(highlightColsFlex),
                                                    )
                                                  if (isHighlightCol) return colSpan(col.span)
                                                  return colSpan(col.span)
                                                }
                                                return (
                                                  <div
                                                    key={col.key}
                                                    style={
                                                      {
                                                        '--megamenu-col-index': idx,
                                                        '--megamenu-fan-offset':
                                                          idx - (visibleColumns.length - 1) / 2,
                                                      } as React.CSSProperties
                                                    }
                                                    className={cn(
                                                      'p-8 flex flex-col min-w-0 megamenu-fan-col',
                                                      col.key === 'highlight' &&
                                                        'megamenu-featured',
                                                      col.key === 'items' && 'megamenu-col-items',
                                                      idx < visibleColumns.length - 1 &&
                                                        'border-r border-border megamenu-col-divider',
                                                      isItemsCol &&
                                                        flexMiddle &&
                                                        'max-lg:border-r-0',
                                                      isHighlightCol &&
                                                        flexMiddle &&
                                                        'max-lg:border-t max-lg:border-border',
                                                      getSpan(),
                                                    )}
                                                  >
                                                    {col.content}
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })()}
                                  {(hasCol3 &&
                                    item.highlight != null &&
                                    highlightPosition === 'below' &&
                                    highlightContent) ||
                                  megaMenuCta ? (
                                    <div
                                      className="megamenu-dropdown-content-footer"
                                      style={
                                        {
                                          '--megamenu-col-count': visibleColumns.length,
                                          '--megamenu-highlight-delay': `${highlightDelayMs}ms`,
                                        } as React.CSSProperties
                                      }
                                    >
                                      {hasCol3 &&
                                        item.highlight != null &&
                                        highlightPosition === 'below' &&
                                        highlightContent && (
                                          <div
                                            className="megamenu-highlight-wipe-wrap megamenu-below-highlight-wrap overflow-hidden"
                                            data-wipe={mouseEntrySide}
                                          >
                                            <div className="megamenu-featured relative border-t border-border p-8">
                                              {item.highlight?.background === 'paths' && (
                                                <PathsBackground
                                                  strokeColor="currentColor"
                                                  strokeOpacity={0.14}
                                                  className="text-muted-foreground/60"
                                                />
                                              )}
                                              {item.highlight?.background === 'threads' && (
                                                <ThreadsBackground
                                                  strokeColor="currentColor"
                                                  strokeOpacity={0.14}
                                                  amplitude={3.6}
                                                  distance={2}
                                                  className="text-muted-foreground/60"
                                                />
                                              )}
                                              <div className="relative z-10">
                                                {highlightContent}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      {megaMenuCta && (
                                        <MegaMenuCtaStrip
                                          cta={megaMenuCta}
                                          hideCallback={Boolean(megaMenuCta.callback)}
                                        />
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          )
                        }

                        return (
                          <NavigationMenuItem key={menuItemKey}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.url}
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  'megamenu-top-item cursor-pointer',
                                )}
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )
                      })}
                    </NavigationMenuList>
                  </div>
                </NavigationMenu>
                <div className="hidden lg:flex items-center gap-0">
                  <HeaderActions
                    contactCta={{
                      whatsapp: megaMenuCta?.whatsapp,
                      callback: megaMenuCta?.callback,
                    }}
                  />
                </div>
                <div className="flex lg:hidden shrink-0 items-center">
                  <Sheet open={mobileMenuOpen} onOpenChange={handleMobileMenuOpenChange}>
                    <button
                      ref={mobileMenuTriggerRef}
                      type="button"
                      className="mobile-megamenu-trigger-btn mobile-megamenu-trigger-btn--benchmark inline-flex shrink-0 items-center justify-center rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 h-12 w-12 min-h-[44px] min-w-[44px] touch-manipulation"
                      aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                      aria-expanded={mobileMenuOpen}
                      data-open={mobileMenuIconActive ? 'true' : 'false'}
                      onClick={toggleMobileMenu}
                    >
                      <MobileMenuTriggerIcon
                        active={mobileMenuIconActive}
                        onToggle={handleMobileMenuIconToggle}
                      />
                    </button>
                    <SheetContent
                      side="right"
                      overlayClassName="mobile-megamenu-overlay data-[state=open]:animate-none data-[state=closed]:animate-none"
                      className="mobile-megamenu-sheet megamenu-sheet h-[100dvh] max-h-[100dvh] w-full max-w-full sm:w-[min(94vw,36rem)] sm:max-w-[36rem] border-l border-border/40 p-0 data-[state=open]:animate-none data-[state=closed]:animate-none supports-[height:100svh]:h-[100svh] [&>button]:hidden"
                      style={
                        mobileMenuOrigin
                          ? ({
                              '--mobile-mega-origin-x': `calc(100% - ${mobileMenuOrigin.right}px)`,
                              '--mobile-mega-origin-y': `${mobileMenuOrigin.y}px`,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      <SheetTitle className="sr-only">Mobilmenü</SheetTitle>
                      <div className="mobile-megamenu-shell flex h-full flex-col">
                        <div className="mobile-megamenu-utility px-4">
                          <div className="mobile-megamenu-utility-logo flex items-center">
                            <ResilientImage
                              src={MOBILE_MENU_LOGO_ICON_SRC}
                              alt="Philipp Bacher Logo"
                              className="mobile-megamenu-utility-logo-icon"
                            />
                          </div>
                          <div className="mobile-megamenu-utility-title">
                            <ThemeSwitcher
                              variant="switch"
                              className="mobile-megamenu-theme-toggle shrink-0"
                            />
                          </div>
                          <button
                            type="button"
                            className="mobile-megamenu-trigger-btn mobile-megamenu-trigger-btn--benchmark mobile-megamenu-trigger-btn--inline inline-flex shrink-0 items-center justify-center rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:shrink-0 h-12 w-12 min-h-[44px] min-w-[44px] touch-manipulation"
                            aria-label="Menü schließen"
                            data-open={mobileMenuIconActive ? 'true' : 'false'}
                            onClick={closeMobileMenu}
                          >
                            <MobileMenuTriggerIcon
                              active={mobileMenuIconActive}
                              onToggle={handleMobileMenuIconToggle}
                            />
                          </button>
                        </div>

                        <nav className="mobile-megamenu-scroll min-h-0 flex-1 overflow-hidden px-4">
                          <div
                            className={cn(
                              'mobile-megamenu-columns',
                              mobileHasSecondaryOpen && 'is-secondary-open',
                            )}
                          >
                            <div className="mobile-megamenu-primary">
                              <ul className="mobile-megamenu-primary-list">
                                {mobileMenuItems.map((entry, idx) => {
                                  const hasSubmenu = entry.subLinks.length > 0
                                  const isActive = mobileActivePrimary === entry.key
                                  const triggerId = `mobile-megamenu-trigger-${toDomId(entry.key)}`
                                  const menuIconSrc = mediaUrl(entry.item.icon ?? null)
                                  const FallbackIcon = getMobileMenuFallbackIcon(entry.item)
                                  return (
                                    <li
                                      key={entry.key}
                                      className="mobile-megamenu-item"
                                      style={
                                        {
                                          '--mobile-mega-item-index': idx,
                                        } as React.CSSProperties
                                      }
                                    >
                                      {hasSubmenu ? (
                                        <button
                                          type="button"
                                          id={triggerId}
                                          className="mobile-megamenu-item-main mobile-megamenu-item-main--has-submenu w-full"
                                          data-active={isActive ? 'true' : undefined}
                                          aria-label={entry.item.label}
                                          aria-expanded={isActive}
                                          aria-controls={mobileSubmenuPanelId}
                                          onClick={() =>
                                            setMobileActivePrimary((current) =>
                                              current === entry.key ? null : entry.key,
                                            )
                                          }
                                        >
                                          <span
                                            className="mobile-megamenu-item-icon"
                                            aria-hidden="true"
                                          >
                                            {menuIconSrc ? (
                                              <ResilientImage
                                                src={menuIconSrc}
                                                alt=""
                                                className="mobile-megamenu-item-icon-img"
                                              />
                                            ) : (
                                              <FallbackIcon className="mobile-megamenu-item-icon-svg" />
                                            )}
                                          </span>
                                          <span className="mobile-megamenu-item-label truncate font-semibold text-foreground text-left">
                                            {entry.item.label}
                                          </span>
                                          <ChevronRight className="mobile-megamenu-item-arrow h-4 w-4 shrink-0 text-primary" />
                                        </button>
                                      ) : (
                                        <Link
                                          href={entry.item.url}
                                          className="mobile-megamenu-item-main w-full"
                                          aria-label={entry.item.label}
                                          onClick={() => {
                                            setMobileMenuOpen(false)
                                          }}
                                        >
                                          <span
                                            className="mobile-megamenu-item-icon"
                                            aria-hidden="true"
                                          >
                                            {menuIconSrc ? (
                                              <ResilientImage
                                                src={menuIconSrc}
                                                alt=""
                                                className="mobile-megamenu-item-icon-img"
                                              />
                                            ) : (
                                              <FallbackIcon className="mobile-megamenu-item-icon-svg" />
                                            )}
                                          </span>
                                          <span className="mobile-megamenu-item-label truncate font-semibold text-foreground text-left">
                                            {entry.item.label}
                                          </span>
                                        </Link>
                                      )}
                                      {idx < mobileMenuItems.length - 1 && (
                                        <hr className="mobile-megamenu-divider" aria-hidden />
                                      )}
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <aside
                              id={mobileSubmenuPanelId}
                              className="mobile-megamenu-secondary"
                              role="region"
                              aria-labelledby={activeMobileTriggerId}
                              aria-hidden={!mobileHasSecondaryOpen}
                            >
                              {activeMobileEntry && (
                                <>
                                  <div className="mobile-megamenu-secondary-head">
                                    <Link
                                      href={activeMobileEntry.item.url}
                                      className="mobile-megamenu-secondary-root"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {activeMobileEntry.item.label}
                                    </Link>
                                    <ChevronLeft
                                      className="mobile-megamenu-secondary-back-icon h-4 w-4"
                                      role="button"
                                      tabIndex={0}
                                      aria-label="Zurück"
                                      onClick={() => setMobileActivePrimary(null)}
                                      onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                          event.preventDefault()
                                          setMobileActivePrimary(null)
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="mobile-megamenu-secondary-list">
                                    {activeMobileGroups.map((group, groupIdx) => (
                                      <section
                                        key={`mobile-sub-group-${group.title ?? 'default'}-${groupIdx}`}
                                        className="mobile-megamenu-sub-group"
                                      >
                                        {group.title ? (
                                          <p className="mobile-megamenu-sub-group-title">
                                            {group.title}
                                          </p>
                                        ) : null}
                                        <ul className="mobile-megamenu-sub-group-links">
                                          {group.links.map((sub, subIdx) => (
                                            <li key={getMegaMenuSubItemKey(sub, subIdx)}>
                                              <Link
                                                href={sub.url}
                                                className="mobile-megamenu-sub-link"
                                                onClick={() => setMobileMenuOpen(false)}
                                              >
                                                <span className="truncate">{sub.label}</span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </section>
                                    ))}
                                  </div>
                                </>
                              )}
                            </aside>
                          </div>
                        </nav>

                        <div className="mobile-megamenu-contact-dock px-4 pt-4">
                          <div
                            className="mobile-megamenu-contact-tooltip"
                            aria-live="polite"
                            aria-atomic="true"
                          >
                            <span
                              className={cn(
                                'mobile-megamenu-contact-tooltip-pill',
                                mobileDockTooltip && 'is-visible',
                              )}
                              style={
                                mobileDockTooltip
                                  ? ({
                                      '--mobile-dock-tooltip-x': `${mobileDockTooltip.x}px`,
                                    } as React.CSSProperties)
                                  : undefined
                              }
                            >
                              {mobileDockTooltip?.label ?? ''}
                            </span>
                          </div>
                          <div
                            ref={mobileDockActionsRef}
                            className="mobile-megamenu-contact-actions"
                            onPointerEnter={handleDockActionsPointerEnter}
                            onPointerMove={handleDockActionsPointerMove}
                            onPointerLeave={handleDockActionsPointerLeave}
                          >
                            {mobileDockActions.map((action) => {
                              const Icon = action.icon
                              const tone = action.tone ?? 'default'
                              const iconStyle = {
                                '--mobile-dock-icon-scale': String(action.iconScale ?? 1),
                              } as React.CSSProperties
                              if (action.isInternal) {
                                return (
                                  <Link
                                    key={action.key}
                                    href={action.href}
                                    ref={(node) => setMobileDockActionRef(action.key, node)}
                                    className="mobile-megamenu-contact-action"
                                    data-tone={tone}
                                    data-action={action.key}
                                    aria-label={action.label}
                                    onFocus={(event) => handleDockActionFocus(event, action)}
                                    onBlur={handleDockActionBlur}
                                    onMouseEnter={(event) => handleDockActionMouseEnter(event, action)}
                                    onMouseLeave={handleDockActionMouseLeave}
                                    onPointerDown={(event) => handleDockActionPointerDown(event, action)}
                                    onPointerUp={(event) => handleDockActionPointerUp(event, action)}
                                    onPointerCancel={handleDockActionPointerCancel}
                                    onKeyDown={(event) => handleDockActionKeyDown(event, action)}
                                    onKeyUp={handleDockActionKeyUp}
                                    onClick={(event) => handleDockActionClick(event, action)}
                                  >
                                    <Icon
                                      className="mobile-megamenu-contact-action-icon"
                                      style={iconStyle}
                                      aria-hidden
                                    />
                                    <span className="sr-only">{action.label}</span>
                                  </Link>
                                )
                              }

                              return (
                                <a
                                  key={action.key}
                                  href={action.href}
                                  target={action.targetBlank ? '_blank' : undefined}
                                  rel={action.rel}
                                  download={action.download ? '' : undefined}
                                  ref={(node) => setMobileDockActionRef(action.key, node)}
                                  className="mobile-megamenu-contact-action"
                                  data-tone={tone}
                                  data-action={action.key}
                                  aria-label={action.label}
                                  onFocus={(event) => handleDockActionFocus(event, action)}
                                  onBlur={handleDockActionBlur}
                                  onMouseEnter={(event) => handleDockActionMouseEnter(event, action)}
                                  onMouseLeave={handleDockActionMouseLeave}
                                  onPointerDown={(event) => handleDockActionPointerDown(event, action)}
                                  onPointerUp={(event) => handleDockActionPointerUp(event, action)}
                                  onPointerCancel={handleDockActionPointerCancel}
                                  onKeyDown={(event) => handleDockActionKeyDown(event, action)}
                                  onKeyUp={handleDockActionKeyUp}
                                  onClick={(event) => handleDockActionClick(event, action)}
                                >
                                  <Icon
                                    className="mobile-megamenu-contact-action-icon"
                                    style={iconStyle}
                                    aria-hidden
                                  />
                                  <span className="sr-only">{action.label}</span>
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
