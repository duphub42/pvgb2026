'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

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
  subItems?: Array<{
    label: string
    url: string
    icon?: MediaRef
    badge?: string | null
    description?: string | null
  }>
  columns?: Array<{
    title?: string | null
    items?: Array<{
      label: string
      url: string
      icon?: MediaRef
      badge?: string | null
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
}

export function MegaMenu({ items, logo, className = '' }: MegaMenuProps) {
  const [openId, setOpenId] = useState<number | string | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hasOpenDropdown = openId !== null
  const isBlurred = scrollY > 0 || hasOpenDropdown
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <header className="relative">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-200 ${className} ${
          isBlurred ? 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        aria-label="Hauptnavigation"
      >
        <div className="container flex items-center justify-between gap-6 py-4">
        {logo}
        <ul className="flex flex-wrap items-center gap-1 md:gap-4">
          {sortedItems.map((item) => {
            const hasDropdown =
              (item.subItems && item.subItems.length > 0) ||
              (item.columns && item.columns.length > 0) ||
              (item.highlight && (item.highlight.title || item.highlight.ctaUrl))

            return (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenId(item.id)}
                onMouseLeave={() => setOpenId(null)}
              >
                <Link
                  href={item.url}
                  className="inline-block px-3 py-2 text-sm font-semibold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md"
                >
                  {item.label}
                </Link>

                {hasDropdown && openId === item.id && (
                  <div className="absolute left-0 top-full mt-1 w-[min(90vw,42rem)] max-h-[80vh] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl p-6 z-50">
                    {/* Spalten */}
                    {item.columns && item.columns.length > 0 && (
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        {item.columns.map((col, idx) => (
                          <div key={idx}>
                            {col.title && (
                              <h5 className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                {col.title}
                              </h5>
                            )}
                            {col.items?.map((sub, j) => (
                              <Link
                                key={j}
                                href={sub.url}
                                className="flex items-center gap-2 py-1.5 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {sub.icon && mediaUrl(sub.icon) && (
                                  <img
                                    src={mediaUrl(sub.icon)}
                                    alt=""
                                    className="h-4 w-4 shrink-0 object-contain"
                                  />
                                )}
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="ml-auto rounded bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SubItems (einfache Liste) */}
                    {item.subItems && item.subItems.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {item.subItems.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.url}
                            className="flex items-center gap-2 py-1.5 text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {sub.icon && mediaUrl(sub.icon) && (
                              <img
                                src={mediaUrl(sub.icon)}
                                alt=""
                                className="h-4 w-4 shrink-0 object-contain"
                              />
                            )}
                            <span>{sub.label}</span>
                            {sub.badge && (
                              <span className="ml-auto rounded bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 text-xs">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Highlight-Block */}
                    {item.highlight && (item.highlight.title || item.highlight.ctaUrl) && (
                      <div className="mt-4 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-4 border border-neutral-100 dark:border-neutral-700">
                        {item.highlight.image && mediaUrl(item.highlight.image) && (
                          <img
                            src={mediaUrl(item.highlight.image)}
                            alt={item.highlight.title ?? ''}
                            className="w-full h-24 object-cover rounded mb-3"
                          />
                        )}
                        {item.highlight.title && (
                          <h4 className="font-bold text-neutral-900 dark:text-white">
                            {item.highlight.title}
                          </h4>
                        )}
                        {item.highlight.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {item.highlight.description}
                          </p>
                        )}
                        {item.highlight.ctaUrl && (
                          <Link
                            href={item.highlight.ctaUrl}
                            className="mt-2 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                          >
                            {item.highlight.ctaLabel || 'Mehr'}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      </nav>
      {/* Spacer so page content is not hidden under fixed nav */}
      <div className="h-14 md:h-16" aria-hidden />
    </header>
  )
}
