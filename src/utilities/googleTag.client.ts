'use client'

export const CONSENT_STORAGE_KEY = 'pb_cookie_consent_v1'
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Y0D7045XMB'
const GA_COOKIE_PREFIXES = ['_ga', '_gid', '_gat']

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function injectGoogleTag() {
  if (typeof window === 'undefined') return
  if (document.querySelector(`script[data-pb-gtag="${GA_MEASUREMENT_ID}"]`)) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }

  window.gtag('consent', 'update', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.dataset.pbGtag = GA_MEASUREMENT_ID
  document.head.appendChild(script)
}

function deleteCookieForDomain(name: string, domain?: string) {
  const domainPart = domain ? `; domain=${domain}` : ''
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}; SameSite=Lax`
}

function deleteGoogleAnalyticsCookies() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) =>
      GA_COOKIE_PREFIXES.some((prefix) => name === prefix || name.startsWith(`${prefix}_`)),
    )

  const hostname = window.location.hostname
  const domains = [
    undefined,
    hostname,
    hostname.startsWith('www.') ? hostname.replace(/^www\./, '.') : `.${hostname}`,
  ]

  for (const name of cookieNames) {
    for (const domain of domains) deleteCookieForDomain(name, domain)
  }
}

export function revokeGoogleTagConsent() {
  if (typeof window === 'undefined') return

  window.gtag?.('consent', 'update', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
  })

  deleteGoogleAnalyticsCookies()
}

export function runWhenIdle(callback: () => void) {
  if (typeof window === 'undefined') return
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 1800 })
    return
  }
  globalThis.setTimeout(callback, 450)
}
