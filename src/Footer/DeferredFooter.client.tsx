'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'

import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'
import { getLocaleFromPathname } from '@/i18n/routing'

// Matches the footer's actual rendered height per breakpoint (measured), so
// swapping in the real footer doesn't change the document height underneath
// the reader mid-scroll.
const FOOTER_PLACEHOLDER_CLASS = 'min-h-[74rem] md:min-h-[59rem] lg:min-h-[36rem]'

const FooterClient = dynamic(
  () => import('@/Footer/FooterClient').then((mod) => ({ default: mod.FooterClient })),
  {
    ssr: false,
    loading: () => <div className={FOOTER_PLACEHOLDER_CLASS} aria-hidden="true" />,
  },
)

type DeferredFooterPayload = {
  footer?: Footer | null
  header?: Header | null
}

type DeferredFooterProps = {
  locale: Locale
}

export function DeferredFooter({ locale }: DeferredFooterProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const requestInFlightRef = useRef(false)
  const [payload, setPayload] = useState<DeferredFooterPayload | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [resolvedLocale, setResolvedLocale] = useState<Locale>(locale)

  useEffect(() => {
    const nextLocale = getLocaleFromPathname(window.location.pathname) ?? locale
    setResolvedLocale(nextLocale)
  }, [locale])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '900px 0px' },
    )

    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || payload || requestInFlightRef.current) return

    requestInFlightRef.current = true
    fetch(`/api/frontend/footer?locale=${resolvedLocale}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DeferredFooterPayload | null) => {
        if (data) setPayload(data)
      })
      .catch(() => {
        // Keep the reserved space when the deferred footer cannot be fetched.
      })
      .finally(() => {
        requestInFlightRef.current = false
      })
  }, [payload, resolvedLocale, shouldLoad])

  return (
    <div ref={rootRef} data-deferred-footer-root>
      {payload ? (
        <FooterClient
          footer={payload.footer ?? null}
          header={payload.header ?? null}
          locale={resolvedLocale}
        />
      ) : (
        <div className={FOOTER_PLACEHOLDER_CLASS} aria-hidden="true" />
      )}
    </div>
  )
}
