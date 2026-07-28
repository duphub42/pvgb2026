'use client'

import dynamic from 'next/dynamic'
import { CalBookingDialogHost } from '@/components/CalBookingDialog/CalBookingDialogHost'
import { useEffect } from 'react'

const WebMCPTools = dynamic(
  () => import('@/components/WebMCP/WebMCPTools').then((mod) => mod.WebMCPTools),
  { ssr: false },
)

const DEFERRED_STYLES = [
  '/deferred-css/globals.part3.css',
  '/deferred-css/globals.part4.css',
  '/deferred-css/globals.part5.css',
]

function loadDeferredStyle(href: string) {
  if (document.querySelector(`link[data-deferred-style="${href}"]`)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.deferredStyle = href
  document.head.appendChild(link)
}

/**
 * Thin Cal host mounts immediately (event listener only).
 * WebMCP tools load after hydration so they stay off the LCP path.
 */
export function DeferredSiteTools() {
  useEffect(() => {
    const load = () => {
      DEFERRED_STYLES.forEach(loadDeferredStyle)
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 1800 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = setTimeout(load, 900)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <CalBookingDialogHost />
      <WebMCPTools />
    </>
  )
}
