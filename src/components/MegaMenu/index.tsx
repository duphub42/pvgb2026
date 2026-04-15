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
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import {
  FORM_SPAM_META_FIELDS,
  buildFormSpamMetaSubmissionData,
} from '@/utilities/formSpamProtection'
import {
  ArrowUpRight,
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
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { HeaderActions } from '@/components/HeaderActions/HeaderActions'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { ResilientImage } from '@/components/ui/resilient-image'
import { HeaderGlassPlate } from '@/components/HeaderGlassPlate/HeaderGlassPlate'
import { isNavLinkActive } from '@/utilities/navLinkActive'

const PathsBackground = dynamic(
  () => import('@/components/PathsBackground/PathsBackground').then((mod) => mod.PathsBackground),
  { ssr: false },
)

const ThreadsBackground = dynamic(
  () =>
    import('@/components/ThreadsBackground/ThreadsBackground').then((mod) => mod.ThreadsBackground),
  { ssr: false },
)

const ThemeSwitcher = dynamic(
  () => import('@/components/ThemeSwitcher/ThemeSwitcher').then((mod) => mod.ThemeSwitcher),
  { ssr: false },
)

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

const warmedMediaImageUrls = new Set<string>()
const warmingMediaImagePromises = new Map<string, Promise<void>>()

function isMediaImageWarmed(url: string | null | undefined): boolean {
  return typeof url === 'string' && url.length > 0 && warmedMediaImageUrls.has(url)
}

function markMediaImageWarmed(url: string | null | undefined): void {
  if (!url) return
  warmedMediaImageUrls.add(url)
}

function warmMediaImage(
  url: string,
  options?: { decode?: 'sync' | 'async'; fetchPriority?: 'high' | 'auto' | 'low' },
): Promise<void> {
  if (!url) return Promise.resolve()
  if (warmedMediaImageUrls.has(url)) return Promise.resolve()
  const existingPromise = warmingMediaImagePromises.get(url)
  if (existingPromise) return existingPromise
  if (typeof window === 'undefined') return Promise.resolve()

  const promise = new Promise<void>((resolve) => {
    const img = new window.Image()
    let settled = false

    const settle = (loaded: boolean) => {
      if (settled) return
      settled = true
      if (loaded) warmedMediaImageUrls.add(url)
      img.onload = null
      img.onerror = null
      warmingMediaImagePromises.delete(url)
      resolve()
    }

    img.onload = () => settle(true)
    img.onerror = () => settle(false)

    try {
      img.decoding = options?.decode ?? 'async'
    } catch {
      // Ignore unsupported decoding assignment.
    }
    if (options?.fetchPriority) {
      img.setAttribute('fetchpriority', options.fetchPriority)
    }

    img.src = url

    if (img.complete) {
      settle(img.naturalWidth > 0)
    }
  })

  warmingMediaImagePromises.set(url, promise)
  return promise
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
  const normalize = (value: unknown): string =>
    String(value ?? '')
      .trim()
      .toLowerCase()
      .replace(/^['"]+|['"]+$/g, '')

  const bg = normalize(col.columnBackground)
  if (
    bg === 'accent' ||
    bg.includes('special') ||
    bg.includes('speacial') ||
    bg.includes('spezial')
  ) {
    return true
  }

  const title = normalize(col.title)
  return title.includes('special') || title.includes('speacial') || title.includes('spezial')
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

function normalizePhoneForTel(rawValue: string | null | undefined): string | null {
  if (typeof rawValue !== 'string') return null

  const value = rawValue.trim()
  if (!value) return null

  const digits = value.replace(/\D+/g, '')
  if (!digits) return null

  if (value.startsWith('+')) return `+${digits}`
  if (value.startsWith('00')) return `+${digits.replace(/^00/, '')}`

  return digits
}

const MOBILE_DOCK_EMAIL_ADDRESS = 'hello@philippbacher.com'
const MOBILE_DOCK_EMAIL_HREF = `mailto:${MOBILE_DOCK_EMAIL_ADDRESS}`
const MOBILE_DOCK_WHATSAPP_E164 = '4915780280163'
const MOBILE_DOCK_WHATSAPP_URL = `https://wa.me/${MOBILE_DOCK_WHATSAPP_E164}`
const MOBILE_DOCK_VCARD_URL = '/contact.vcf'
const MOBILE_DOCK_CALENDAR_URL = '/termin'
const MOBILE_MENU_LOGO_ICON_SRC = '/branding/philippbacher-logo-b-10.svg'
const HAM_ICON_ANIMATION_MS = 400
const MOBILE_DOCK_TOOLTIP_AUTOHIDE_MS = 1500
const MOBILE_DOCK_CONFIRM_WINDOW_MS = 2600
const MOBILE_DOCK_PROXIMITY_RADIUS = 132

type MobileMenuSubLink = {
  label: string
  url: string
  groupTitle?: string | null
}

type MobileDockIconMode = 'stroke' | 'brand-fill'
type MobileDockIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

type MobileDockAction = {
  key: string
  href: string
  label: string
  icon: MobileDockIcon
  iconMode?: MobileDockIconMode
  iconScale?: number
  iconOpacity?: number
  isInternal?: boolean
  targetBlank?: boolean
  rel?: string
  download?: boolean
}

type MobileDockTooltipState = {
  label: string
  detail?: string
  variant: 'default' | 'click'
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
    <svg viewBox="0 0 24 24" fill="currentColor" data-brand-icon="whatsapp" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  )
}

function PhoneSolidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
      />
    </svg>
  )
}

function MailSolidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  )
}

function VCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
      />
    </svg>
  )
}

function CalendarSolidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
      />
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

  for (const sub of item.subItems ?? []) {
    links.push({
      label: sub.label,
      url: sub.url,
      groupTitle: null,
    })
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

function normalizeMobileMenuDescription(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length > 0 ? normalized : null
}

function clampMobileMenuDescription(value: string, maxLength = 96): string {
  if (value.length <= maxLength) return value
  const clipped = value
    .slice(0, maxLength)
    .replace(/[.,;:!?\s-]+$/g, '')
    .trim()
  return clipped.length > 0 ? `${clipped}…` : value.slice(0, maxLength).trim()
}

const MOBILE_MENU_DEFAULT_DESCRIPTIONS: Record<string, string> = {
  home: 'Startseite mit Überblick über Leistungen, Projekte und aktuelle Inhalte.',
  preise: 'Pakete, Leistungen und transparente Konditionen im schnellen Vergleich.',
  profil: 'Mehr über mich, meinen Werdegang und meine Arbeitsweise.',
  kontakt: 'Direkt Kontakt aufnehmen per Formular, E-Mail, WhatsApp oder Telefon.',
}

function getDefaultMobileMenuDescription(item: MegaMenuItem): string | null {
  const normalizedLabel = item.label.trim().toLocaleLowerCase('de-DE')
  if (normalizedLabel in MOBILE_MENU_DEFAULT_DESCRIPTIONS) {
    return clampMobileMenuDescription(MOBILE_MENU_DEFAULT_DESCRIPTIONS[normalizedLabel] ?? '')
  }

  const normalizedUrl = item.url.trim().toLocaleLowerCase('de-DE')
  if (normalizedUrl === '/') {
    return clampMobileMenuDescription(MOBILE_MENU_DEFAULT_DESCRIPTIONS.home)
  }
  if (normalizedUrl === '/preise') {
    return clampMobileMenuDescription(MOBILE_MENU_DEFAULT_DESCRIPTIONS.preise)
  }
  if (normalizedUrl === '/profil') {
    return clampMobileMenuDescription(MOBILE_MENU_DEFAULT_DESCRIPTIONS.profil)
  }
  if (normalizedUrl === '/kontakt') {
    return clampMobileMenuDescription(MOBILE_MENU_DEFAULT_DESCRIPTIONS.kontakt)
  }

  return null
}

function getMobileMenuItemDescription(item: MegaMenuItem): string | null {
  const fromCategory = normalizeMobileMenuDescription(item.categoryDescription?.description)
  if (fromCategory) return clampMobileMenuDescription(fromCategory)

  for (const col of item.columns ?? []) {
    for (const sub of col.items ?? []) {
      const fromColumnItem = normalizeMobileMenuDescription(sub.description)
      if (fromColumnItem) return clampMobileMenuDescription(fromColumnItem)
    }
  }

  for (const sub of item.subItems ?? []) {
    const fromSubItem = normalizeMobileMenuDescription(sub.description)
    if (fromSubItem) return clampMobileMenuDescription(fromSubItem)
  }

  const fromHighlight = normalizeMobileMenuDescription(item.highlight?.description)
  if (fromHighlight) return clampMobileMenuDescription(fromHighlight)

  const fallback = getDefaultMobileMenuDescription(item)
  if (fallback) return fallback

  return null
}

function getMobileDockClickTooltipCopy(action: MobileDockAction): {
  label: string
  detail: string
} {
  const detail = 'Erneut tippen'

  switch (action.key) {
    case 'phone':
      return { label: 'Jetzt anrufen', detail }
    case 'email':
      return { label: 'E-Mail schreiben', detail }
    case 'whatsapp':
      return { label: 'WhatsApp öffnen', detail }
    case 'vcard':
      return { label: 'Kontakt speichern', detail }
    case 'calendar':
      return { label: 'Termin buchen', detail }
    default:
      return { label: action.label, detail }
  }
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

type MobileMenuItemIconProps = {
  src?: string | null
  FallbackIcon: LucideIcon
}

function MobileMenuItemIcon({ src, FallbackIcon }: MobileMenuItemIconProps) {
  const normalizedSrc = typeof src === 'string' && src.trim().length > 0 ? src : null
  const [loaded, setLoaded] = React.useState(() =>
    normalizedSrc ? isMediaImageWarmed(normalizedSrc) : false,
  )
  const [hasLoadError, setHasLoadError] = React.useState(false)

  React.useEffect(() => {
    setHasLoadError(false)
    setLoaded(normalizedSrc ? isMediaImageWarmed(normalizedSrc) : false)
  }, [normalizedSrc])

  if (!normalizedSrc) {
    return <FallbackIcon className="mobile-megamenu-item-icon-svg" />
  }

  const showFallback = hasLoadError

  return (
    <>
      <FallbackIcon
        className={cn(
          'mobile-megamenu-item-icon-svg mobile-megamenu-item-icon-fallback',
          showFallback ? 'is-visible' : 'is-hidden',
        )}
      />
      <ResilientImage
        src={normalizedSrc}
        alt=""
        className={cn(
          'mobile-megamenu-item-icon-img',
          loaded && 'is-loaded',
          showFallback && 'is-hidden',
        )}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onLoad={() => {
          markMediaImageWarmed(normalizedSrc)
          setHasLoadError(false)
          setLoaded(true)
        }}
        onError={() => {
          setHasLoadError(true)
          setLoaded(false)
        }}
      />
    </>
  )
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
  /** Telefonnummer aus dem Footer-Global für den Call-CTA im mobilen Dock */
  mobileDockPhone?: string | null
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
            ? 'megamenu-special-link group relative flex select-none items-start gap-3 rounded-md border border-transparent !bg-foreground p-4 leading-none no-underline !text-background shadow-xs outline-none transition-colors duration-200 hover:!bg-foreground/80 active:!bg-foreground/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
            : 'group flex select-none items-start gap-3 rounded-xl p-4 leading-none no-underline outline-none transition-colors duration-300',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'megamenu-item-icon flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg p-2.5 transition-all duration-300 [&_img]:h-full [&_img]:w-full [&_img]:object-contain',
            isButton
              ? 'megamenu-special-link-icon bg-background/15 text-current group-hover:bg-background/25'
              : 'group-hover:text-foreground',
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div
            className={cn(
              'text-sm font-semibold leading-tight transition-colors',
              isButton ? 'text-current' : 'group-hover:text-foreground',
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
        {isButton ? (
          <span className="megamenu-special-icon-swap mt-1" aria-hidden="true">
            <ChevronRight className="megamenu-special-icon-layer megamenu-special-icon-layer--a h-4 w-4" />
            <ArrowUpRight className="megamenu-special-icon-layer megamenu-special-icon-layer--b h-4 w-4" />
          </span>
        ) : (
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-foreground opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        )}
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

function collectMobileMenuIconUrls(items: MegaMenuItem[]): string[] {
  const urls = new Set<string>()

  for (const item of items) {
    const url = mediaUrl(item.icon ?? null)
    if (url) urls.add(url)
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
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-whatsapp)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--brand-whatsapp-hover)] transition-colors"
            aria-label={cta.whatsapp.label}
          >
            <MessageCircle className="h-5 w-5 text-[rgb(var(--hero-process-text))]" aria-hidden />
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
  mobileLogo,
  className = '',
  columnWidths,
  megaMenuCta,
  highlightCardStyle,
  mobileDockPhone,
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
  const [mobileDockPendingActionKey, setMobileDockPendingActionKey] = useState<string | null>(null)
  const [mobileDockTooltip, setMobileDockTooltip] = useState<MobileDockTooltipState | null>(null)
  const [mobileMenuOrigin, setMobileMenuOrigin] = useState<{ right: number; y: number } | null>(
    null,
  )
  const [showMobileItemDescriptions, setShowMobileItemDescriptions] = useState(true)
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuSheetRef = useRef<HTMLDivElement>(null)
  const mobileMenuPrimaryRef = useRef<HTMLDivElement>(null)
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
  const mobileDockLastRippleAtRef = useRef(0)
  const mobileDockConfirmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navListWrapRef = useRef<HTMLDivElement>(null)
  const topNavItemRefs = useRef<Map<string, HTMLElement>>(new Map())
  const viewportWrapperRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mouseEntrySide, setMouseEntrySide] = useState<'left' | 'right'>('left')
  const [selectedTopNavKey, setSelectedTopNavKey] = useState<string | null>(null)
  const [navIndicatorStyle, setNavIndicatorStyle] = useState<{
    x: number
    width: number
    visible: boolean
  }>({
    x: 0,
    width: 0,
    visible: false,
  })

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

  const isTopLevelItemActive = React.useCallback(
    (itemUrl: string): boolean => {
      if (!pathname || typeof itemUrl !== 'string') return false
      const normalized = itemUrl.trim()
      if (!normalized) return false
      if (/^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(normalized)) return false
      return isNavLinkActive(pathname, normalized)
    },
    [pathname],
  )

  const setTopNavItemRef = React.useCallback((key: string, node: HTMLElement | null) => {
    if (node) {
      topNavItemRefs.current.set(key, node)
      return
    }
    topNavItemRefs.current.delete(key)
  }, [])

  const cancelCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  // CSS-first close: Active state steuert in/ausblenden, JS nur Zeitverzögerung zum Verhindern von Peeking.
  const scheduleClose = (delay = 140) => {
    cancelCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimeoutRef.current = null
    }, delay)
  }

  /* Schließen kurz verzögern: Cursor darf vom Link ins Dropdown fahren, ohne dass es sofort zugeht */
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

  const activeTopNavKeyFromPath = useMemo(() => {
    for (const [idx, item] of sortedItems.entries()) {
      if (isTopLevelItemActive(item.url)) {
        return getMegaMenuItemKey(item, idx)
      }
    }
    return null
  }, [isTopLevelItemActive, sortedItems])

  useEffect(() => {
    setSelectedTopNavKey((previous) => {
      if (activeTopNavKeyFromPath) return activeTopNavKeyFromPath
      if (previous && sortedItems.some((item, idx) => getMegaMenuItemKey(item, idx) === previous)) {
        return previous
      }
      return null
    })
  }, [activeTopNavKeyFromPath, sortedItems])

  const updateTopNavIndicator = React.useCallback(() => {
    const navWrap = navListWrapRef.current
    if (!navWrap || !selectedTopNavKey) {
      setNavIndicatorStyle((previous) =>
        previous.visible ? { ...previous, visible: false } : previous,
      )
      return
    }

    const activeNode = topNavItemRefs.current.get(selectedTopNavKey)
    if (!activeNode) {
      setNavIndicatorStyle((previous) =>
        previous.visible ? { ...previous, visible: false } : previous,
      )
      return
    }

    const navWrapRect = navWrap.getBoundingClientRect()
    const activeRect = activeNode.getBoundingClientRect()
    const nextX = Math.max(0, activeRect.left - navWrapRect.left)
    const nextWidth = Math.max(0, activeRect.width)

    setNavIndicatorStyle((previous) => {
      const sameX = Math.abs(previous.x - nextX) < 0.5
      const sameWidth = Math.abs(previous.width - nextWidth) < 0.5
      if (previous.visible && sameX && sameWidth) return previous
      return {
        x: nextX,
        width: nextWidth,
        visible: true,
      }
    })
  }, [selectedTopNavKey])

  React.useLayoutEffect(() => {
    updateTopNavIndicator()
  }, [updateTopNavIndicator])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => updateTopNavIndicator()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [updateTopNavIndicator])
  const mobileMenuItems = useMemo(
    () =>
      sortedItems.map((item, idx) => ({
        key: getMegaMenuItemKey(item, idx),
        item,
        description: getMobileMenuItemDescription(item),
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
  const mobileDockPhoneHref = useMemo(() => {
    const normalizedPhone = normalizePhoneForTel(mobileDockPhone)
    if (normalizedPhone) return `tel:${normalizedPhone}`
    return `tel:+${MOBILE_DOCK_WHATSAPP_E164}`
  }, [mobileDockPhone])
  const mobileDockActions = useMemo<MobileDockAction[]>(
    () => [
      {
        key: 'phone',
        href: mobileDockPhoneHref,
        label: 'Phone',
        icon: PhoneSolidIcon,
        iconMode: 'brand-fill',
        iconScale: 0.93,
        iconOpacity: 0.93,
      },
      {
        key: 'email',
        href: MOBILE_DOCK_EMAIL_HREF,
        label: 'Email',
        icon: MailSolidIcon,
        iconMode: 'brand-fill',
        iconScale: 0.93,
        iconOpacity: 0.93,
      },
      {
        key: 'whatsapp',
        href: MOBILE_DOCK_WHATSAPP_URL,
        label: 'WhatsApp',
        icon: WhatsAppLogoIcon,
        iconMode: 'brand-fill',
        targetBlank: true,
        rel: 'noopener noreferrer',
        iconScale: 0.9,
        iconOpacity: 0.9,
      },
      {
        key: 'vcard',
        href: MOBILE_DOCK_VCARD_URL,
        label: 'vCard',
        icon: VCardIcon,
        iconMode: 'brand-fill',
        download: true,
        iconScale: 0.93,
        iconOpacity: 0.93,
      },
      {
        key: 'calendar',
        href: MOBILE_DOCK_CALENDAR_URL,
        label: 'Calendar',
        icon: CalendarSolidIcon,
        iconMode: 'brand-fill',
        isInternal: true,
        iconScale: 0.93,
        iconOpacity: 0.93,
      },
    ],
    [mobileDockPhoneHref],
  )
  const mobileDockPendingAction = useMemo(
    () => mobileDockActions.find((action) => action.key === mobileDockPendingActionKey) ?? null,
    [mobileDockActions, mobileDockPendingActionKey],
  )
  const isMobileDockTooltipActionable = mobileDockPendingAction != null
  const preloadMediaUrls = useMemo(() => collectPreloadMediaUrls(sortedItems), [sortedItems])
  const mobileMenuIconUrls = useMemo(() => collectMobileMenuIconUrls(sortedItems), [sortedItems])

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

  const clearMobileDockConfirmTimeout = React.useCallback(() => {
    if (mobileDockConfirmTimeoutRef.current) {
      clearTimeout(mobileDockConfirmTimeoutRef.current)
      mobileDockConfirmTimeoutRef.current = null
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
    const now = Date.now()
    if (now - mobileDockLastRippleAtRef.current < 120) return
    mobileDockLastRippleAtRef.current = now

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
    (
      label: string,
      actionEl?: HTMLElement | null,
      options?: {
        autoHideMs?: number
        detail?: string
        variant?: 'default' | 'click'
      },
    ) => {
      clearMobileDockTooltipTimeout()
      let x = 0
      if (actionEl && mobileDockActionsRef.current) {
        const actionRect = actionEl.getBoundingClientRect()
        const dockRect = mobileDockActionsRef.current.getBoundingClientRect()
        const centerX = actionRect.left + actionRect.width / 2 - dockRect.left
        x = Math.max(20, Math.min(dockRect.width - 20, centerX))
      }
      setMobileDockTooltip({
        label,
        detail: options?.detail,
        variant: options?.variant ?? 'default',
        x,
      })
      const autoHideMs = options?.autoHideMs
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

  const armMobileDockActionConfirmation = React.useCallback(
    (actionKey: string) => {
      setMobileDockPendingActionKey(actionKey)
      clearMobileDockConfirmTimeout()
      mobileDockConfirmTimeoutRef.current = setTimeout(() => {
        setMobileDockPendingActionKey((currentKey) =>
          currentKey === actionKey ? null : currentKey,
        )
        mobileDockConfirmTimeoutRef.current = null
      }, MOBILE_DOCK_CONFIRM_WINDOW_MS)
    },
    [clearMobileDockConfirmTimeout],
  )

  const clearMobileDockActionConfirmation = React.useCallback(() => {
    clearMobileDockConfirmTimeout()
    setMobileDockPendingActionKey(null)
  }, [clearMobileDockConfirmTimeout])

  const closeMobileMenuAfterDockAction = React.useCallback((delay = 180) => {
    window.setTimeout(() => {
      setMobileMenuIconActive(false)
      setMobileMenuOpen(false)
    }, delay)
  }, [])

  const executeMobileDockAction = React.useCallback(
    (action: MobileDockAction) => {
      if (typeof window === 'undefined') return

      if (action.isInternal) {
        router.push(action.href)
        return
      }

      if (action.download) {
        const anchor = document.createElement('a')
        anchor.href = action.href
        anchor.download = ''
        if (action.rel) anchor.rel = action.rel
        anchor.target = action.targetBlank ? '_blank' : '_self'
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        return
      }

      if (action.targetBlank) {
        const features = action.rel?.includes('noreferrer') ? 'noopener,noreferrer' : 'noopener'
        window.open(action.href, '_blank', features)
        return
      }

      window.location.assign(action.href)
    },
    [router],
  )

  const handleDockTooltipActionClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!mobileDockPendingAction) return
      event.preventDefault()
      event.stopPropagation()
      triggerMobileDockHaptic(10)
      clearMobileDockActionConfirmation()
      clearMobileDockTooltip()
      executeMobileDockAction(mobileDockPendingAction)
      closeMobileMenuAfterDockAction(120)
    },
    [
      mobileDockPendingAction,
      triggerMobileDockHaptic,
      clearMobileDockActionConfirmation,
      clearMobileDockTooltip,
      executeMobileDockAction,
      closeMobileMenuAfterDockAction,
    ],
  )

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
    (event: React.PointerEvent<HTMLElement>) => {
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
    },
    [
      clearMobileDockLongPressTimeout,
      measureMobileDockMetrics,
      setMobileDockPointer,
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
      if (!event.currentTarget.matches(':focus-visible')) return
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

  const handleDockActionMouseEnter = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.setAttribute('data-active', 'true')
  }, [])

  const handleDockActionMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!event.currentTarget.matches(':focus-visible')) {
        event.currentTarget.removeAttribute('data-active')
      }
      if (!mobileDockPendingActionKey) {
        clearMobileDockTooltip()
      }
    },
    [clearMobileDockTooltip, mobileDockPendingActionKey],
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
      const actionRect = actionEl.getBoundingClientRect()
      spawnMobileDockRipple(
        actionEl,
        actionRect.left + actionRect.width / 2,
        actionRect.top + actionRect.height / 2,
      )

      if (mobileDockPendingActionKey === action.key) {
        clearMobileDockActionConfirmation()
        clearMobileDockTooltip()
        closeMobileMenuAfterDockAction(180)
        return
      }

      event.preventDefault()
      event.stopPropagation()
      actionEl.setAttribute('data-pending', 'true')
      armMobileDockActionConfirmation(action.key)
      const clickTooltip = getMobileDockClickTooltipCopy(action)
      showMobileDockTooltip(clickTooltip.label, actionEl, {
        detail: clickTooltip.detail,
        variant: 'click',
        autoHideMs: MOBILE_DOCK_CONFIRM_WINDOW_MS,
      })
    },
    [
      mobileDockPendingActionKey,
      clearMobileDockActionConfirmation,
      clearMobileDockTooltip,
      closeMobileMenuAfterDockAction,
      armMobileDockActionConfirmation,
      showMobileDockTooltip,
      spawnMobileDockRipple,
    ],
  )

  const handleDockActionKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>, action: MobileDockAction) => {
      if (event.key !== 'Enter' && event.key !== ' ') return

      const actionEl = event.currentTarget
      const rect = actionEl.getBoundingClientRect()
      actionEl.setAttribute('data-pressed', 'true')
      actionEl.setAttribute('data-active', 'true')
      spawnMobileDockRipple(actionEl, rect.left + rect.width / 2, rect.top + rect.height / 2)
      showMobileDockTooltip(action.label, actionEl, {
        autoHideMs: MOBILE_DOCK_TOOLTIP_AUTOHIDE_MS,
      })

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
    clearMobileDockConfirmTimeout()
    clearMobileDockTooltip()
    clearMobileDockPointer()
    setMobileDockPendingActionKey(null)
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
    clearMobileDockConfirmTimeout,
    clearMobileDockLongPressTimeout,
    clearMobileDockPointer,
    clearMobileDockTooltip,
    clearMobileDockRaf,
  ])

  // Lightweight scroll nudge: encourages iOS/Chrome mobile browser UI to collapse on open.
  const collapseMobileBrowserChrome = React.useCallback(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    if (window.scrollY > 1) return

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 1, left: 0, behavior: 'auto' })
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
    })
  }, [])

  // Keep dock + sheet aligned with dynamic viewport changes (URL bar collapse/expand).
  const syncMobileViewportVars = React.useCallback(() => {
    if (typeof window === 'undefined') return
    const sheetEl = mobileMenuSheetRef.current
    if (!sheetEl) return

    const visualViewport = window.visualViewport
    const viewportHeight = Math.round(visualViewport?.height ?? window.innerHeight)
    const viewportOffsetTop = Math.round(visualViewport?.offsetTop ?? 0)
    const rawBottomInset = window.innerHeight - (viewportHeight + viewportOffsetTop)
    const browserBottomInset = Math.max(0, Math.min(140, Math.round(rawBottomInset)))

    sheetEl.style.setProperty('--mobile-viewport-height', `${Math.max(320, viewportHeight)}px`)
    sheetEl.style.setProperty('--mobile-browser-bottom-inset', `${browserBottomInset}px`)
  }, [])

  const syncMobileDescriptionVisibility = React.useCallback(() => {
    if (typeof window === 'undefined' || !mobileMenuOpen) return

    const primaryEl = mobileMenuPrimaryRef.current
    if (!primaryEl) return

    const hasAnyDescriptions = mobileMenuItems.some((entry) => Boolean(entry.description))
    if (!hasAnyDescriptions) {
      primaryEl.setAttribute('data-show-descriptions', 'true')
      setShowMobileItemDescriptions((current) => (current ? current : true))
      return
    }

    // Always evaluate with descriptions visible first.
    primaryEl.setAttribute('data-show-descriptions', 'true')
    const overflowWithDescriptions = primaryEl.scrollHeight > primaryEl.clientHeight + 1
    const shouldShowDescriptions = !overflowWithDescriptions
    primaryEl.setAttribute('data-show-descriptions', shouldShowDescriptions ? 'true' : 'false')
    setShowMobileItemDescriptions((current) =>
      current === shouldShowDescriptions ? current : shouldShowDescriptions,
    )
  }, [mobileMenuItems, mobileMenuOpen])

  const openMobileMenu = React.useCallback(() => {
    collapseMobileBrowserChrome()
    syncMobileMenuOrigin()
    clearMobileMenuCloseTimeout()
    clearMobileMenuOpenIconTimeout()
    setMobileMenuOpen(true)
    setMobileMenuIconActive(false)
    mobileMenuOpenIconTimeoutRef.current = setTimeout(() => {
      setMobileMenuIconActive(true)
      mobileMenuOpenIconTimeoutRef.current = null
    }, 26)
  }, [
    collapseMobileBrowserChrome,
    syncMobileMenuOrigin,
    clearMobileMenuCloseTimeout,
    clearMobileMenuOpenIconTimeout,
  ])

  const closeMobileMenu = React.useCallback(() => {
    clearMobileMenuCloseTimeout()
    clearMobileMenuOpenIconTimeout()
    resetMobileDockState()
    setMobileMenuIconActive(false)
    mobileMenuCloseTimeoutRef.current = setTimeout(() => {
      setMobileMenuOpen(false)
      mobileMenuTriggerRef.current?.focus({ preventScroll: true })
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
      clearMobileDockConfirmTimeout()
      clearMobileDockRaf()
    }
  }, [
    clearMobileMenuCloseTimeout,
    clearMobileMenuOpenIconTimeout,
    clearMobileDockTooltipTimeout,
    clearMobileDockLongPressTimeout,
    clearMobileDockConfirmTimeout,
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
      const sheetEl = mobileMenuSheetRef.current
      if (sheetEl) {
        sheetEl.style.removeProperty('--mobile-viewport-height')
        sheetEl.style.removeProperty('--mobile-browser-bottom-inset')
      }
      return
    }

    const measureDock = () => {
      syncMobileViewportVars()
      measureMobileDockMetrics()
      queueMobileDockMotion()
    }

    const visualViewport = window.visualViewport
    measureDock()
    const rafId = window.requestAnimationFrame(measureDock)
    window.addEventListener('resize', measureDock)
    window.addEventListener('orientationchange', measureDock)
    window.addEventListener('scroll', measureDock, { passive: true })
    visualViewport?.addEventListener('resize', measureDock)
    visualViewport?.addEventListener('scroll', measureDock)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', measureDock)
      window.removeEventListener('orientationchange', measureDock)
      window.removeEventListener('scroll', measureDock)
      visualViewport?.removeEventListener('resize', measureDock)
      visualViewport?.removeEventListener('scroll', measureDock)
    }
  }, [
    mobileMenuOpen,
    measureMobileDockMetrics,
    queueMobileDockMotion,
    resetMobileDockState,
    syncMobileViewportVars,
  ])

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
    if (!mobileMenuOpen) {
      setShowMobileItemDescriptions(true)
      return
    }

    const runMeasurement = () => syncMobileDescriptionVisibility()
    const visualViewport = window.visualViewport

    runMeasurement()
    const rafId = window.requestAnimationFrame(runMeasurement)

    window.addEventListener('resize', runMeasurement)
    window.addEventListener('orientationchange', runMeasurement)
    visualViewport?.addEventListener('resize', runMeasurement)
    visualViewport?.addEventListener('scroll', runMeasurement)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', runMeasurement)
      window.removeEventListener('orientationchange', runMeasurement)
      visualViewport?.removeEventListener('resize', runMeasurement)
      visualViewport?.removeEventListener('scroll', runMeasurement)
    }
  }, [mobileMenuOpen, mobileMenuItems, mobileHasSecondaryOpen, syncMobileDescriptionVisibility])

  useEffect(() => {
    if (typeof window === 'undefined' || mobileMenuIconUrls.length === 0) return
    for (const url of mobileMenuIconUrls) {
      void warmMediaImage(url, { decode: 'async', fetchPriority: 'high' })
    }
  }, [mobileMenuIconUrls])

  useEffect(() => {
    if (typeof window === 'undefined' || preloadMediaUrls.length === 0) return
    for (const url of preloadMediaUrls) {
      void warmMediaImage(url, { decode: 'async', fetchPriority: 'auto' })
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
        ? currentScrollY >= stickyLeaveThresholdPx
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
          'megamenu-overlay fixed inset-0 z-50 bg-background/20 backdrop-blur-md pointer-events-none opacity-0 transition-[opacity] duration-[220ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
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
                onPointerLeave={() => scheduleClose(120)}
              >
                <NavigationMenu
                  className="megamenu-nav hidden lg:flex lg:h-full lg:flex-initial lg:ml-auto"
                  delayDuration={70}
                  skipDelayDuration={100}
                  value={activeMenu ?? ''}
                  onValueChange={(value) => {
                    const next = value || null
                    if (next !== '' && next !== null) {
                      cancelCloseTimeout()
                      setActiveMenu(next)
                      return
                    }

                    scheduleClose(160)
                  }}
                  viewportWrapperRef={viewportWrapperRef}
                >
                  <div
                    ref={navListWrapRef}
                    className="megamenu-nav-list-wrap relative flex h-full flex-1 justify-end"
                  >
                    <span
                      aria-hidden="true"
                      className="megamenu-nav-indicator"
                      data-visible={navIndicatorStyle.visible ? 'true' : 'false'}
                      style={
                        {
                          width: `${navIndicatorStyle.width}px`,
                          transform: `translateX(${navIndicatorStyle.x}px)`,
                        } as React.CSSProperties
                      }
                    />
                    <NavigationMenuList className="megamenu-nav-list h-full justify-end">
                      {sortedItems.map((item, idx) => {
                        const menuItemKey = getMegaMenuItemKey(item, idx)
                        const hasDrop = hasDropdown(item)
                        const value = menuItemKey

                        if (hasDrop) {
                          const isActive = isTopLevelItemActive(item.url)
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
                                  const mediaBlock = (
                                    <>
                                      {cardImageUrl && (
                                        <div
                                          className={cn(
                                            'relative overflow-hidden bg-muted group/highlight',
                                            highlightPosition === 'below'
                                              ? 'aspect-square min-w-[100px] w-[100px] shrink-0 rounded-l-lg'
                                              : cn('aspect-video w-full', roundedT),
                                          )}
                                        >
                                          <img
                                            src={cardImageUrl}
                                            alt={cardTitle ?? ''}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover/highlight:scale-[1.02]"
                                            loading="eager"
                                            decoding="sync"
                                          />
                                          <div className="absolute inset-0 bg-foreground/10 transition-opacity group-hover/highlight:bg-foreground/5" />
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
                                    <div
                                      className={cn(
                                        hasMedia && highlightPosition !== 'below'
                                          ? 'pt-3'
                                          : hasMedia && highlightPosition === 'below'
                                            ? 'py-3 pl-4 pr-4'
                                            : 'pt-3',
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
                                          <Button
                                            asChild
                                            size="sm"
                                            className="megamenu-highlight-cta mt-2 w-fit !bg-foreground !text-background hover:!bg-foreground/80 active:!bg-foreground/80"
                                          >
                                            <Link href={cardCtaUrl} className="no-underline">
                                              <span>{cardCtaLabel}</span>
                                              <span
                                                className="megamenu-special-icon-swap"
                                                aria-hidden="true"
                                              >
                                                <ChevronRight className="megamenu-special-icon-layer megamenu-special-icon-layer--a h-4 w-4" />
                                                <ArrowUpRight className="megamenu-special-icon-layer megamenu-special-icon-layer--b h-4 w-4" />
                                              </span>
                                            </Link>
                                          </Button>
                                        )}
                                      </div>
                                    </div>
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
                                  return <div key={cardKey}>{inner}</div>
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
                                ref={(node) => {
                                  setTopNavItemRef(menuItemKey, node)
                                }}
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  'megamenu-top-item cursor-pointer',
                                  isActive && 'megamenu-top-item--active',
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
                                  setSelectedTopNavKey(menuItemKey)
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
                                ref={(node) => {
                                  setTopNavItemRef(menuItemKey, node)
                                }}
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  'megamenu-top-item cursor-pointer',
                                  isTopLevelItemActive(item.url) && 'megamenu-top-item--active',
                                )}
                                onClick={() => {
                                  setSelectedTopNavKey(menuItemKey)
                                }}
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
                      ref={mobileMenuSheetRef}
                      side="right"
                      onCloseAutoFocus={(event) => {
                        event.preventDefault()
                        mobileMenuTriggerRef.current?.focus({ preventScroll: true })
                      }}
                      overlayClassName="mobile-megamenu-overlay data-[state=open]:!animate-none data-[state=closed]:!animate-none"
                      className="mobile-megamenu-sheet megamenu-sheet h-[100dvh] max-h-[100dvh] w-full max-w-full sm:w-[min(94vw,36rem)] sm:max-w-[36rem] border-l border-border/40 p-0 data-[state=open]:!animate-none data-[state=closed]:!animate-none supports-[height:100svh]:h-[100svh] [&>button]:hidden"
                      style={
                        {
                          '--mobile-mega-item-count': String(Math.max(1, mobileMenuItems.length)),
                          ...(mobileMenuOrigin
                            ? {
                                '--mobile-mega-origin-x': `calc(100% - ${mobileMenuOrigin.right}px)`,
                                '--mobile-mega-origin-y': `${mobileMenuOrigin.y}px`,
                              }
                            : {}),
                        } as React.CSSProperties
                      }
                    >
                      <SheetTitle className="sr-only">Mobilmenü</SheetTitle>
                      <div
                        className="mobile-megamenu-shell flex h-full flex-col"
                        data-secondary-open={mobileHasSecondaryOpen ? 'true' : 'false'}
                      >
                        <div className="mobile-megamenu-utility px-4">
                          <div className="mobile-megamenu-utility-logo flex items-center">
                            {mobileLogo ? (
                              <div className="mobile-megamenu-utility-logo-mask">{mobileLogo}</div>
                            ) : (
                              <ResilientImage
                                src={MOBILE_MENU_LOGO_ICON_SRC}
                                alt="Philipp Bacher Logo"
                                className="mobile-megamenu-utility-logo-icon"
                              />
                            )}
                          </div>
                          <div className="mobile-megamenu-utility-actions">
                            <ThemeSwitcher
                              variant="switch"
                              className="mobile-megamenu-theme-toggle shrink-0"
                            />
                            <button
                              type="button"
                              className="mobile-megamenu-trigger-btn mobile-megamenu-trigger-btn--benchmark inline-flex shrink-0 items-center justify-center rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:shrink-0 h-12 w-12 min-h-[44px] min-w-[44px] touch-manipulation"
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
                        </div>

                        <nav className="mobile-megamenu-scroll min-h-0 flex-1 overflow-hidden px-4">
                          <div
                            className={cn(
                              'mobile-megamenu-columns',
                              mobileHasSecondaryOpen && 'is-secondary-open',
                            )}
                          >
                            <div
                              ref={mobileMenuPrimaryRef}
                              className="mobile-megamenu-primary"
                              data-show-descriptions={showMobileItemDescriptions ? 'true' : 'false'}
                            >
                              <ul className="mobile-megamenu-primary-list">
                                {mobileMenuItems.map((entry, idx) => {
                                  const hasSubmenu = entry.subLinks.length > 0
                                  const isActive = mobileActivePrimary === entry.key
                                  const hasDescription = Boolean(entry.description)
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
                                          data-has-description={hasDescription ? 'true' : undefined}
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
                                            <MobileMenuItemIcon
                                              src={menuIconSrc}
                                              FallbackIcon={FallbackIcon}
                                            />
                                          </span>
                                          <span className="mobile-megamenu-item-copy">
                                            <span className="mobile-megamenu-item-label truncate font-semibold text-foreground text-left">
                                              {entry.item.label}
                                            </span>
                                            {hasDescription ? (
                                              <span className="mobile-megamenu-item-description">
                                                {entry.description}
                                              </span>
                                            ) : null}
                                          </span>
                                          <ChevronRight className="mobile-megamenu-item-arrow h-4 w-4 shrink-0 text-foreground" />
                                        </button>
                                      ) : (
                                        <Link
                                          href={entry.item.url}
                                          className="mobile-megamenu-item-main w-full"
                                          data-has-description={hasDescription ? 'true' : undefined}
                                          aria-label={entry.item.label}
                                          onClick={() => {
                                            setMobileMenuOpen(false)
                                          }}
                                        >
                                          <span
                                            className="mobile-megamenu-item-icon"
                                            aria-hidden="true"
                                          >
                                            <MobileMenuItemIcon
                                              src={menuIconSrc}
                                              FallbackIcon={FallbackIcon}
                                            />
                                          </span>
                                          <span className="mobile-megamenu-item-copy">
                                            <span className="mobile-megamenu-item-label truncate font-semibold text-foreground text-left">
                                              {entry.item.label}
                                            </span>
                                            {hasDescription ? (
                                              <span className="mobile-megamenu-item-description">
                                                {entry.description}
                                              </span>
                                            ) : null}
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
                                    <button
                                      type="button"
                                      className="mobile-megamenu-secondary-back-button"
                                      aria-label="Zurück"
                                      onClick={() => setMobileActivePrimary(null)}
                                    >
                                      <ChevronLeft
                                        className="mobile-megamenu-secondary-back-icon h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                  <div className="mobile-megamenu-secondary-list">
                                    {activeMobileGroups.map((group, groupIdx) => (
                                      <section
                                        key={`mobile-sub-group-${group.title ?? 'default'}-${groupIdx}`}
                                        className={cn(
                                          'mobile-megamenu-sub-group',
                                          group.title
                                            ? 'mobile-megamenu-sub-group--titled'
                                            : 'mobile-megamenu-sub-group--untitled',
                                        )}
                                      >
                                        {group.title ? (
                                          <p className="mobile-megamenu-sub-group-title">
                                            <span className="mobile-megamenu-sub-group-title-label">
                                              {group.title}
                                            </span>
                                          </p>
                                        ) : null}
                                        <ul className="mobile-megamenu-sub-group-links">
                                          {group.links.map((sub, subIdx) => (
                                            <li
                                              key={getMegaMenuSubItemKey(sub, subIdx)}
                                              style={
                                                {
                                                  '--mobile-mega-sub-link-index':
                                                    groupIdx * 8 + subIdx,
                                                } as React.CSSProperties
                                              }
                                            >
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
                            <button
                              type="button"
                              className={cn(
                                'mobile-megamenu-contact-tooltip-pill',
                                mobileDockTooltip && 'is-visible',
                                mobileDockTooltip?.variant === 'click' && 'is-click',
                                isMobileDockTooltipActionable && 'is-actionable',
                              )}
                              aria-hidden={!isMobileDockTooltipActionable}
                              tabIndex={isMobileDockTooltipActionable ? 0 : -1}
                              disabled={!isMobileDockTooltipActionable}
                              onClick={handleDockTooltipActionClick}
                              style={
                                mobileDockTooltip
                                  ? ({
                                      '--mobile-dock-tooltip-x': `${mobileDockTooltip.x}px`,
                                    } as React.CSSProperties)
                                  : undefined
                              }
                            >
                              <span className="mobile-megamenu-contact-tooltip-pill-title">
                                {mobileDockTooltip?.label ?? ''}
                              </span>
                              {mobileDockTooltip?.detail ? (
                                <span className="mobile-megamenu-contact-tooltip-pill-meta">
                                  {mobileDockTooltip.detail}
                                </span>
                              ) : null}
                            </button>
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
                              const iconMode = action.iconMode ?? 'stroke'
                              const iconClassName = 'mobile-megamenu-contact-action-icon'
                              const iconStyle = {
                                '--mobile-dock-icon-scale': String(action.iconScale ?? 1),
                                '--mobile-dock-icon-opacity': String(action.iconOpacity ?? 1),
                              } as React.CSSProperties
                              if (action.isInternal) {
                                return (
                                  <Link
                                    key={action.key}
                                    href={action.href}
                                    ref={(node) => setMobileDockActionRef(action.key, node)}
                                    className="mobile-megamenu-contact-action"
                                    data-action={action.key}
                                    data-pending={
                                      mobileDockPendingActionKey === action.key ? 'true' : undefined
                                    }
                                    aria-label={action.label}
                                    onFocus={(event) => handleDockActionFocus(event, action)}
                                    onBlur={handleDockActionBlur}
                                    onMouseEnter={handleDockActionMouseEnter}
                                    onMouseLeave={handleDockActionMouseLeave}
                                    onPointerDown={handleDockActionPointerDown}
                                    onPointerUp={(event) =>
                                      handleDockActionPointerUp(event, action)
                                    }
                                    onPointerCancel={handleDockActionPointerCancel}
                                    onKeyDown={(event) => handleDockActionKeyDown(event, action)}
                                    onKeyUp={handleDockActionKeyUp}
                                    onClick={(event) => handleDockActionClick(event, action)}
                                  >
                                    <Icon
                                      className={iconClassName}
                                      style={iconStyle}
                                      data-icon-mode={iconMode}
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
                                  data-action={action.key}
                                  data-pending={
                                    mobileDockPendingActionKey === action.key ? 'true' : undefined
                                  }
                                  aria-label={action.label}
                                  onFocus={(event) => handleDockActionFocus(event, action)}
                                  onBlur={handleDockActionBlur}
                                  onMouseEnter={handleDockActionMouseEnter}
                                  onMouseLeave={handleDockActionMouseLeave}
                                  onPointerDown={handleDockActionPointerDown}
                                  onPointerUp={(event) => handleDockActionPointerUp(event, action)}
                                  onPointerCancel={handleDockActionPointerCancel}
                                  onKeyDown={(event) => handleDockActionKeyDown(event, action)}
                                  onKeyUp={handleDockActionKeyUp}
                                  onClick={(event) => handleDockActionClick(event, action)}
                                >
                                  <Icon
                                    className={iconClassName}
                                    style={iconStyle}
                                    data-icon-mode={iconMode}
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
