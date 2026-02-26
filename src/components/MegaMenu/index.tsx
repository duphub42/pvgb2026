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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import { ChevronRight, Menu, MessageCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { HeaderActions } from '@/components/HeaderActions/HeaderActions'
import { PathsBackground } from '@/components/PathsBackground/PathsBackground'
import { ThreadsBackground } from '@/components/ThreadsBackground/ThreadsBackground'
import { getMediaUrl } from '@/utilities/getMediaUrl'

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
  className?: string
  /** Spaltenbreiten im 12er-Grid (Sidebar | Inhalt | Highlight). Default: 3 | 6 | 3 */
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
    (item.highlight != null &&
      (item.highlight.title != null || item.highlight.ctaUrl != null)) ||
    (item.image != null && mediaUrl(item.image) !== '')
  )
}

/* ListItem: Icon links (quadratisch, 2 Zeilen), daneben Titel + Beschreibung (kleiner, 20% Opacity) */
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          'group flex select-none items-start gap-3 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent/20 border border-transparent hover:border-accent/10',
          className,
        )}
        {...props}
      >
        <div className="megamenu-item-icon flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg p-2.5 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary [&_img]:h-full [&_img]:w-full [&_img]:object-contain">
          {icon}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="text-sm font-semibold leading-tight group-hover:text-primary dark:group-hover:text-foreground transition-colors">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug opacity-20 group-hover:opacity-70 transition-opacity">
            {children}
          </p>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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

function MegaMenuCtaStrip({ cta }: { cta: MegaMenuCta }) {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [callbackStatus, setCallbackStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cta.callback || !phone.trim()) return
    setCallbackStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: cta.callback.formId,
          submissionData: [{ field: cta.callback.phoneFieldName, value: phone.trim() }],
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setCallbackStatus('success')
        setPhone('')
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
    setNewsletterStatus('loading')
    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: cta.newsletter.formId,
          submissionData: [{ field: cta.newsletter.emailFieldName, value: email.trim() }],
        }),
      })
      if (res.ok) {
        setNewsletterStatus('success')
        setEmail('')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  const hasAny = cta.whatsapp || cta.callback || cta.newsletter
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
            <MessageCircle className="h-5 w-5" aria-hidden />
            {cta.whatsapp.label}
          </a>
        </div>
      )}
      {cta.callback && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" aria-hidden />
            {cta.callback.title}
          </span>
          <form onSubmit={submitCallback} className="flex flex-col sm:flex-row gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={cta.callback.placeholder}
              className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
            <Button type="submit" size="sm" disabled={callbackStatus === 'loading'}>
              {callbackStatus === 'loading' ? '…' : callbackStatus === 'success' ? 'Gesendet' : cta.callback.buttonText}
            </Button>
          </form>
          {callbackStatus === 'error' && (
            <p className="text-xs text-destructive">Fehler beim Senden. Bitte später erneut versuchen.</p>
          )}
        </div>
      )}
      {cta.newsletter && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden />
            {cta.newsletter.title}
          </span>
          <form onSubmit={submitNewsletter} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={cta.newsletter.placeholder}
              className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
            <Button type="submit" size="sm" disabled={newsletterStatus === 'loading'}>
              {newsletterStatus === 'loading' ? '…' : newsletterStatus === 'success' ? 'Angemeldet' : cta.newsletter.buttonText}
            </Button>
          </form>
          {newsletterStatus === 'error' && (
            <p className="text-xs text-destructive">Fehler beim Anmelden. Bitte später erneut versuchen.</p>
          )}
        </div>
      )}
    </div>
  )
}

const defaultCardStyle: HighlightCardStyle = {
  borderRadius: 'rounded-lg',
  shadow: 'shadow-sm',
  hoverShadow: 'hover:shadow-md',
  hoverBorder: 'hover:border-primary/40',
}

/** Prüft, ob die aktuelle Route diesem Menü-Item entspricht (Vercel: Underline nur bei aktiver Seite) */
function isItemActive(pathname: string, itemUrl: string): boolean {
  const path = itemUrl.startsWith('http') ? new URL(itemUrl).pathname : itemUrl
  if (pathname === path) return true
  if (path !== '/' && pathname.startsWith(path + '/')) return true
  return false
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
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollYRef = React.useRef(0)
  const scrollReadyRef = React.useRef(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navListWrapRef = useRef<HTMLDivElement>(null)
  const viewportWrapperRef = useRef<HTMLDivElement>(null)
  const prevViewportHeightRef = useRef<number>(0)
  const prevActiveMenuRef = useRef<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number } | null>(null)
  const [mouseEntrySide, setMouseEntrySide] = useState<'left' | 'right'>('left')

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

  const sidebarCols = columnWidths?.sidebar ?? 3
  const contentCols = columnWidths?.content ?? 6
  const featuredCols = columnWidths?.featured ?? 3

  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  useEffect(() => {
    if (typeof window === 'undefined') return
    lastScrollYRef.current = window.scrollY
    const t = setTimeout(() => {
      scrollReadyRef.current = true
    }, 500)
    return () => clearTimeout(t)
  }, [])

  useLayoutEffect(() => {
    const wrap = navListWrapRef.current
    if (!wrap) return
    const active = wrap.querySelector('.megamenu-top-item[data-active="true"]') as HTMLElement | null
    if (!active) {
      setUnderlineStyle(null)
      return
    }
    const wrapRect = wrap.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    setUnderlineStyle({
      left: activeRect.left - wrapRect.left,
      width: activeRect.width,
    })
  }, [pathname])

  useEffect(() => {
    const wrap = navListWrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => {
      const active = wrap.querySelector('.megamenu-top-item[data-active="true"]') as HTMLElement | null
      if (!active) {
        setUnderlineStyle(null)
        return
      }
      const wrapRect = wrap.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      setUnderlineStyle({
        left: activeRect.left - wrapRect.left,
        width: activeRect.width,
      })
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [pathname])

  /* Beim Wechsel zwischen zwei Menüpunkten: Dropdown-Höhe per Slide up/down animieren */
  useEffect(() => {
    const prev = prevActiveMenuRef.current
    prevActiveMenuRef.current = activeMenu ?? null

    const switching = prev != null && prev !== '' && activeMenu != null && activeMenu !== '' && prev !== activeMenu
    if (!switching) {
      if (activeMenu != null && activeMenu !== '') {
        const wrapper = viewportWrapperRef.current
        if (wrapper) prevViewportHeightRef.current = wrapper.offsetHeight
      }
      return
    }

    const wrapper = viewportWrapperRef.current
    if (!wrapper) return

    const viewport = wrapper.firstElementChild as HTMLElement | null
    const oldHeight = prevViewportHeightRef.current || wrapper.offsetHeight
    const duration = 480
    const ease = 'cubic-bezier(0.32, 0.72, 0, 1)' /* smooth slide ease-out */

    /* Wrapper sofort auf alte Höhe fixieren, damit kein Sprung sichtbar ist */
    wrapper.style.minHeight = '0'
    wrapper.style.height = `${oldHeight}px`
    wrapper.style.transition = `height ${duration}ms ${ease}`

    /* Neue Höhe erst nach Layout lesen (Radix/React brauchen einen Tick), dann weich animieren */
    const timeoutId = setTimeout(() => {
      const newHeightPx = viewport
        ? parseFloat(getComputedStyle(viewport).height) || viewport.scrollHeight
        : wrapper.scrollHeight
      const capped = Math.min(newHeightPx, window.innerHeight * 0.85)
      wrapper.style.height = `${capped}px`
      prevViewportHeightRef.current = capped

      const onEnd = () => {
        wrapper.style.transition = ''
        wrapper.style.minHeight = ''
        wrapper.style.height = ''
        wrapper.removeEventListener('transitionend', onEnd)
      }
      wrapper.addEventListener('transitionend', onEnd)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [activeMenu])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      const delta = currentScrollY - lastScrollY
      lastScrollYRef.current = currentScrollY
      setIsScrolled(currentScrollY > 20)
      if (activeMenu != null) {
        setIsVisible(true)
        return
      }
      const nearTop = currentScrollY < 100
      const scrollingDown = delta > 10
      const scrollingUp = delta < -10
      const pastThreshold = currentScrollY > 100
      const mayHide = scrollReadyRef.current
      if (nearTop || scrollingUp) {
        setIsVisible(true)
      } else if (mayHide && scrollingDown && pastThreshold) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeMenu])

  return (
    <>
      {/* Background Blur Overlay – 1:1 test2 */}
      <div
        className={cn(
          'megamenu-overlay fixed inset-0 z-40 bg-background/20 backdrop-blur-md transition-all duration-500 pointer-events-none opacity-0',
          activeMenu != null && 'opacity-100 pointer-events-auto',
        )}
      />

      <header
        className={cn(
          'megamenu sticky top-0 z-50 w-full transition-all duration-300 ease-out',
          'bg-[var(--background)]',
          isVisible
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 pointer-events-none invisible',
          className,
        )}
        data-scrolled={isScrolled ? 'true' : undefined}
      >
        <div className="container flex h-24 flex-col px-4 pt-9 pb-2">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center">{logo}</div>
            <div className="megamenu-nav-wrap flex h-full items-stretch gap-4">
          <NavigationMenu
            className="megamenu-nav hidden md:flex md:h-full md:flex-initial md:ml-auto"
            value={activeMenu ?? ''}
            onValueChange={(value) => {
              const next = value || null
              if (next !== '' && next !== null) {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current)
                  closeTimeoutRef.current = null
                }
                if (viewportWrapperRef.current && next !== activeMenu)
                  prevViewportHeightRef.current = viewportWrapperRef.current.offsetHeight
                setActiveMenu(next)
                return
              }
              /* Schließen um 300ms verzögern, damit Cursor vom Link ins Dropdown kann */
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
              closeTimeoutRef.current = setTimeout(() => {
                setActiveMenu(null)
                closeTimeoutRef.current = null
              }, 300)
            }}
            viewportWrapperRef={viewportWrapperRef}
          >
              <div ref={navListWrapRef} className="megamenu-nav-list-wrap relative flex h-full flex-1 justify-end">
                <NavigationMenuList className="megamenu-nav-list h-full justify-end">
                {sortedItems.map((item) => {
                  const hasDrop = hasDropdown(item)
                  const value = String(item.id)

                  if (hasDrop) {
                    const cols = item.columns ?? []
                    const cw = item.columnWidths
                    const columnSpans = [
                      cw?.col1 != null ? Number(cw.col1) : sidebarCols,
                      cw?.col2 != null ? Number(cw.col2) : contentCols,
                      cw?.col3 != null ? Number(cw.col3) : featuredCols,
                    ]
                    const allItemsFromColumns = cols.flatMap((col) => (col.items ?? []).map((sub) => ({ ...sub, _groupTitle: col.title })))
                    const listItems = allItemsFromColumns.length > 0 ? allItemsFromColumns : (item.subItems ?? []).map((s) => ({ ...s, _groupTitle: null }))
                    const hasGroupTitles = listItems.some((x: { _groupTitle?: string | null }) => x._groupTitle != null && x._groupTitle !== '')

                    // Nur Spalten mit Inhalt anzeigen; Breiten aus Backend (Header → Mega-Menü Spaltenbreiten)
                    const catDesc = item.categoryDescription
                    const hasCol1 =
                      catDesc != null &&
                      (Boolean(catDesc.title && String(catDesc.title).trim()) ||
                        Boolean(catDesc.description && String(catDesc.description).trim()))
                    const hasCol2 = listItems.length > 0
                    const hasHighlightCards =
                      Array.isArray(item.highlight?.cards) && item.highlight.cards.length > 0
                    const hasLegacyHighlight =
                      item.highlight != null &&
                      ((item.highlight.title != null && item.highlight.title !== '') ||
                        (item.highlight.description != null && item.highlight.description !== '') ||
                        (item.highlight.icon != null && mediaUrl(item.highlight.icon)) ||
                        (item.highlight.image != null && mediaUrl(item.highlight.image)) ||
                        (item.highlight.ctaUrl != null && item.highlight.ctaUrl !== ''))
                    const hasCol3 =
                      item.highlight != null && (hasHighlightCards || hasLegacyHighlight)

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

                    const visibleColumns: Array<{ span: number; key: string; content: React.ReactNode }> = []
                    if (hasCol1 && catDesc) {
                      visibleColumns.push({
                        span: columnSpans[0] ?? sidebarCols,
                        key: 'desc',
                        content: (
                          <div className="space-y-3">
                            {catDesc.title != null && String(catDesc.title).trim() !== '' && (
                              <h4 className="text-base font-semibold text-muted-foreground uppercase tracking-wider">
                                {catDesc.title}
                              </h4>
                            )}
                            {catDesc.description != null && String(catDesc.description).trim() !== '' && (
                              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {catDesc.description}
                              </p>
                            )}
                          </div>
                        ),
                      })
                    }
                    if (hasCol2) {
                      visibleColumns.push({
                        span: columnSpans[1] ?? contentCols,
                        key: 'items',
                        content: hasGroupTitles ? (
                          <div className="grid grid-cols-12 gap-6">
                            {cols.map((col, colIdx) =>
                              (col.items?.length ?? 0) > 0 ? (
                                <div key={colIdx} className={cn('space-y-3 min-w-0', colSpan(Math.min(12, Math.max(1, col.columnWidth ?? 4))))}>
                                  {(col.title != null && col.title !== '') && (
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                      {col.title}
                                    </h4>
                                  )}
                                  <ul className={cn('grid gap-y-4', (col.items?.length ?? 0) > 4 ? 'grid-cols-2 gap-x-8' : 'grid-cols-1')}>
                                    {(col.items ?? []).map((sub, idx) => (
                                      <ListItem
                                        key={idx}
                                        title={sub.label}
                                        href={sub.url}
                                        icon={
                                          (sub.icon != null && mediaUrl(sub.icon)) ||
                                          (sub.image != null && mediaUrl(sub.image)) ? (
                                            <img src={mediaUrl(sub.image ?? sub.icon!)} alt="" className="h-4 w-4 object-contain" loading="lazy" decoding="async" />
                                          ) : undefined
                                        }
                                      >
                                        {sub.description ?? ''}
                                      </ListItem>
                                    ))}
                                  </ul>
                                </div>
                              ) : null,
                            )}
                          </div>
                        ) : (
                          <ul className={cn('grid gap-y-4', listItems.length > 4 ? 'grid-cols-2 gap-x-8' : 'grid-cols-1')}>
                            {listItems.map((sub: { label: string; url: string; description?: string | null; icon?: MediaRef; image?: MediaRef }, idx: number) => (
                              <ListItem
                                key={idx}
                                title={sub.label}
                                href={sub.url}
                                icon={
                                  (sub.icon != null && mediaUrl(sub.icon)) ||
                                  (sub.image != null && mediaUrl(sub.image)) ? (
                                    <img src={mediaUrl(sub.image ?? sub.icon!)} alt="" className="h-4 w-4 object-contain" loading="lazy" decoding="async" />
                                  ) : undefined
                                }
                              >
                                {sub.description ?? ''}
                              </ListItem>
                            ))}
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
                        <div className={cn('grid gap-4', highlightPosition === 'below' && 'max-h-[min(50vh,420px)] overflow-y-auto')}>
                          {cardItems.map((card, cardIdx) => {
                            const cardTitle = card.title != null && card.title !== '' ? card.title : null
                            const cardDesc = card.description != null && card.description !== '' ? card.description : null
                            const cardIconUrl = card.icon != null ? mediaUrl(card.icon) : ''
                            const cardImageUrl = card.image != null ? mediaUrl(card.image) : ''
                            const cardCtaUrl = card.ctaUrl != null && card.ctaUrl !== '' ? card.ctaUrl : null
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
                                      highlightPosition === 'below' ? 'aspect-square min-w-[100px] w-[100px] shrink-0 rounded-l-lg' : cn('aspect-video w-full', roundedT),
                                    )}
                                  >
                                    <img
                                      src={cardImageUrl}
                                      alt={cardTitle ?? ''}
                                      className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-[1.02]"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover/card:bg-black/5" />
                                  </div>
                                )}
                                {!cardImageUrl && cardIconUrl && (
                                  <div
                                    className={cn(
                                      'flex shrink-0 items-center justify-center overflow-hidden bg-muted/60 p-2.5 [&_img]:h-full [&_img]:w-full [&_img]:object-contain',
                                      highlightPosition === 'below' ? 'h-full min-w-[100px] w-[100px] rounded-l-lg' : 'megamenu-item-icon h-14 w-14 rounded-lg',
                                    )}
                                  >
                                    <img src={cardIconUrl} alt="" loading="lazy" decoding="async" />
                                  </div>
                                )}
                              </>
                            )
                            const textBlock = (
                              <CardContent className={cn(hasMedia && highlightPosition !== 'below' ? 'pt-4' : hasMedia && highlightPosition === 'below' ? 'py-3 pl-4 pr-4' : 'pt-6')}>
                                <div className="flex flex-col gap-2">
                                  {cardTitle && (
                                    <h4 className="text-sm font-semibold leading-tight">
                                      {cardTitle}
                                    </h4>
                                  )}
                                  {cardDesc && (
                                    <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
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
                            const inner = highlightPosition === 'below' && hasMedia ? (
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
                            const cardEl = (
                              <Card className={cardClassName}>
                                {inner}
                              </Card>
                            )
                            return cardCtaUrl ? (
                              <Link
                                key={cardIdx}
                                href={cardCtaUrl}
                                className="block no-underline text-left text-inherit outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {cardEl}
                              </Link>
                            ) : (
                              <div key={cardIdx}>{cardEl}</div>
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
                        span: columnSpans[2] ?? featuredCols,
                        key: 'highlight',
                        content: (
                          <div className="megamenu-highlight-wipe-wrap overflow-hidden" data-wipe={mouseEntrySide}>
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
                      <NavigationMenuItem key={item.id} value={value}>
                        <NavigationMenuTrigger
                          className="megamenu-top-item"
                          onPointerEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setMouseEntrySide(e.clientX < rect.left + rect.width / 2 ? 'left' : 'right')
                          }}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent key={`${value}-${activeMenu === value ? 'open' : 'closed'}`}>
                          <div
                            className="w-full"
                            onPointerEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setMouseEntrySide(e.clientX < rect.left + rect.width / 2 ? 'left' : 'right')
                            }}
                          >
                            {visibleColumns.length > 0 && (() => {
                              const hasDescColumn = visibleColumns.some((c) => c.key === 'desc')
                              const hasHighlightInRow = visibleColumns.some((c) => c.key === 'highlight')
                              const threeColsInRow = hasDescColumn && hasHighlightInRow
                              const twoColsInRow = visibleColumns.length === 2 && (hasDescColumn || hasHighlightInRow)
                              /* Responsive: Ab xl (1280px) = Highlight neben Inhalt; unter xl = Highlight unter Inhalt, Desc ausgeblendet. */
                              /* Mittlere Spalte (Unterpunkte) bekommt maximale Breite; Seiten-Spalten begrenzt */
                              const flexMiddleGrid =
                                threeColsInRow
                                  ? 'xl:grid-cols-[minmax(10rem,18rem)_1fr_minmax(10rem,18rem)]'
                                  : twoColsInRow && hasDescColumn
                                    ? 'xl:grid-cols-[minmax(10rem,18rem)_1fr]'
                                    : twoColsInRow && hasHighlightInRow
                                      ? 'xl:grid-cols-[1fr_minmax(10rem,18rem)]'
                                      : null
                              return (
                              <div
                                className={cn(
                                  'megamenu-dropdown-content grid grid-cols-12',
                                  flexMiddleGrid,
                                )}
                              >
                                {visibleColumns.map((col, idx) => {
                                  const flexMiddle = threeColsInRow || twoColsInRow
                                  const isItemsCol = col.key === 'items'
                                  const isHighlightCol = col.key === 'highlight'
                                  const getSpan = () => {
                                    if (col.key === 'desc') return flexMiddle ? 'xl:col-auto' : colSpan(col.span)
                                    if (isItemsCol && flexMiddle) return 'col-span-12 xl:col-auto'
                                    if (isItemsCol) return 'col-span-12 xl:col-span-6'
                                    if (isHighlightCol && flexMiddle) return 'col-span-12 xl:col-auto'
                                    if (isHighlightCol) return 'col-span-12 xl:col-span-3'
                                    return colSpan(col.span)
                                  }
                                  return (
                                    <div
                                      key={col.key}
                                      className={cn(
                                        'p-8 flex flex-col min-w-0',
                                        col.key === 'desc' && 'megamenu-sidebar megamenu-col-desc bg-muted/40 hidden xl:flex',
                                        col.key === 'highlight' && 'megamenu-featured',
                                        col.key === 'items' && 'megamenu-col-items',
                                        idx < visibleColumns.length - 1 && 'border-r border-border megamenu-col-divider',
                                        isItemsCol && flexMiddle && 'max-xl:border-r-0',
                                        isHighlightCol && flexMiddle && 'max-xl:border-t max-xl:border-border',
                                        getSpan(),
                                      )}
                                    >
                                      {col.content}
                                    </div>
                                  )
                                })}
                              </div>
                              )
                            })()}
                            {(hasCol3 && item.highlight != null && highlightPosition === 'below' && highlightContent) || megaMenuCta ? (
                              <div className="megamenu-dropdown-content-footer">
                                {hasCol3 && item.highlight != null && highlightPosition === 'below' && highlightContent && (
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
                                      <div className="relative z-10">{highlightContent}</div>
                                    </div>
                                  </div>
                                )}
                                {megaMenuCta && <MegaMenuCtaStrip cta={megaMenuCta} />}
                              </div>
                            ) : null}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  const linkActive = isItemActive(pathname ?? '', item.url)
                  return (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.url}
                          className={cn(navigationMenuTriggerStyle(), 'megamenu-top-item')}
                          data-active={linkActive ? 'true' : undefined}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
                <div
                  className="megamenu-sliding-underline pointer-events-none absolute -bottom-2 left-0 h-0.5"
                  style={{
                    left: underlineStyle?.left ?? 0,
                    width: underlineStyle?.width ?? 0,
                  }}
                  aria-hidden
                />
              </div>
            </NavigationMenu>
            <div className="hidden md:flex items-center gap-0">
              <HeaderActions />
            </div>
            <div className="flex md:hidden shrink-0 items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 min-h-[44px] min-w-[44px] touch-manipulation"
                    aria-label="Menü öffnen"
                  >
                    <Menu className="h-6 w-6" aria-hidden />
                  </Button>
                </SheetTrigger>
            <SheetContent
              side="right"
              className="megamenu-sheet w-[300px] sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {sortedItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <Link
                      href={item.url}
                      className="block px-2 py-1 text-lg font-semibold transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                    {hasDropdown(item) && (
                      <ul className="pl-4 space-y-1 border-l border-border">
                        {(item.subItems ?? []).map((sub, i) => (
                          <li key={i}>
                            <Link
                              href={sub.url}
                              className="block px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                        {(item.columns ?? []).flatMap((col) =>
                          (col.items ?? []).map((sub, j) => (
                            <li key={`${col.title}-${j}`}>
                              <Link
                                href={sub.url}
                                className="block px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          )),
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
              </Sheet>
            </div>
          </div>
          </div>
        </div>
      </header>
    </>
  )
}
