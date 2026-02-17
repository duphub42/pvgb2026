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
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import { ChevronRight, Menu, MessageCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
    title?: string | null
    description?: string | null
    image?: MediaRef
    ctaLabel?: string | null
    ctaUrl?: string | null
  } | null
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

/* 1:1 aus test2 – ListItem */
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          'group flex flex-col select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent/20 border border-transparent hover:border-accent/10',
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold leading-none group-hover:text-primary transition-colors">
            <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
              {icon}
            </div>
            {title}
          </div>
          <ChevronRight className="h-4 w-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
          {children}
        </p>
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

export function MegaMenu({ items, logo, className = '', columnWidths, megaMenuCta }: MegaMenuProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollYRef = React.useRef(0)
  const scrollReadyRef = React.useRef(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

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
          'megamenu sticky top-0 z-50 w-full border-b transition-all duration-300 ease-out',
          isVisible
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 pointer-events-none invisible',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-border shadow-soft'
            : 'bg-background border-transparent',
          className,
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">{logo}</div>
          <div className="flex items-center gap-4">
          <NavigationMenu
            className="megamenu-nav hidden md:flex md:flex-initial md:ml-auto"
            value={activeMenu ?? ''}
            onValueChange={(value) => setActiveMenu(value || null)}
          >
              <NavigationMenuList className="justify-end">
                {sortedItems.map((item) => {
                  const hasDrop = hasDropdown(item)
                  const value = String(item.id)

                  if (hasDrop) {
                    const listItems =
                      (item.columns ?? []).length > 0
                        ? item.columns!.flatMap((col) => col.items ?? [])
                        : item.subItems ?? []
                    const sidebarTitle = item.columns?.[0]?.title ?? item.label
                    const sidebarDesc =
                      item.columns?.[0]?.title != null
                        ? item.highlight?.description ?? null
                        : item.highlight?.description ?? null

                    return (
                      <NavigationMenuItem key={item.id} value={value}>
                        <NavigationMenuTrigger className="megamenu-top-item">{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-full container">
                            <div className="grid grid-cols-12 min-h-[400px]">
                              {/* Sidebar Column with background */}
                              <div className={cn('megamenu-sidebar bg-muted/40 p-8 border-r', colSpan(sidebarCols))}>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                      {sidebarTitle}
                                    </h4>
                                    {sidebarDesc != null && (
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {sidebarDesc}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Content Columns */}
                              <div className={cn('p-8', colSpan(contentCols))}>
                                <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                                  {listItems.map((sub, idx) => (
                                    <ListItem
                                      key={idx}
                                      title={sub.label}
                                      href={sub.url}
                                      icon={
                                        (sub.icon != null && mediaUrl(sub.icon)) ||
                                        (sub.image != null && mediaUrl(sub.image)) ? (
                                          <img
                                            src={mediaUrl(sub.image ?? sub.icon!)}
                                            alt=""
                                            className="h-4 w-4 object-contain"
                                          />
                                        ) : undefined
                                      }
                                    >
                                      {sub.description ?? ''}
                                    </ListItem>
                                  ))}
                                </ul>
                              </div>

                              {/* Featured Column with Image */}
                              <div className={cn('megamenu-featured p-8 bg-slate-50 border-l flex flex-col justify-between', colSpan(featuredCols))}>
                                <div className="space-y-4">
                                  {item.highlight?.title != null && (
                                    <h4 className="text-sm font-semibold uppercase tracking-wider">
                                      {item.highlight.title}
                                    </h4>
                                  )}
                                  {item.highlight?.image != null &&
                                    mediaUrl(item.highlight.image) && (
                                      <div className="relative aspect-video rounded-xl overflow-hidden group">
                                        <img
                                          src={mediaUrl(item.highlight.image)}
                                          alt={item.highlight.title ?? ''}
                                          className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                      </div>
                                    )}
                                  {item.highlight != null && (
                                    <div className="space-y-2">
                                      {item.highlight.description != null && (
                                        <p className="text-xs text-muted-foreground">
                                          {item.highlight.description}
                                        </p>
                                      )}
                                      {item.highlight.ctaUrl != null && (
                                        <Link
                                          href={item.highlight.ctaUrl}
                                          className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                                        >
                                          {item.highlight.ctaLabel ?? 'Mehr'}{' '}
                                          <ChevronRight className="h-3 w-3" />
                                        </Link>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {megaMenuCta && <MegaMenuCtaStrip cta={megaMenuCta} />}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  return (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuLink asChild>
                        <Link href={item.url} className={cn(navigationMenuTriggerStyle(), 'megamenu-top-item')}>
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="megamenu-sheet w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {sortedItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <Link
                      href={item.url}
                      className="block px-2 py-1 text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                    {hasDropdown(item) && (
                      <ul className="pl-4 space-y-1 border-l border-border">
                        {(item.subItems ?? []).map((sub, i) => (
                          <li key={i}>
                            <Link
                              href={sub.url}
                              className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
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
                                className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
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
      </header>
    </>
  )
}
