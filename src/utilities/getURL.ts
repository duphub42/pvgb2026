import canUseDOM from './canUseDOM'

function getLocalDevURL() {
  const port = process.env.PORT?.trim() || '3000'
  return `http://localhost:${port}`
}

function isLocalDevelopment() {
  return process.env.NODE_ENV === 'development' && !process.env.VERCEL
}

const DEFAULT_PUBLIC_SITE_URL = 'https://philippbacher.com'

function normalizeSiteURL(rawValue: string | undefined): string | null {
  const value = rawValue?.trim().replace(/\/$/, '')
  return value || null
}

function isInternalDeploymentURL(url: string): boolean {
  try {
    const hostname = new URL(url).hostname
    return hostname === 'localhost' || hostname.endsWith('.vercel.app')
  } catch {
    return true
  }
}

/** Öffentliche Marketing-Domain (vCard, Canonicals). Ignoriert Vercel-/Localhost-URLs aus NEXT_PUBLIC_SERVER_URL. */
export const getPublicSiteURL = (): string => {
  const configured =
    normalizeSiteURL(process.env.NEXT_PUBLIC_PUBLIC_SITE_URL) ??
    normalizeSiteURL(process.env.NEXT_PUBLIC_SERVER_URL)

  if (configured && !isInternalDeploymentURL(configured)) {
    return configured
  }

  return DEFAULT_PUBLIC_SITE_URL
}

/** Server-URL für Payload (CORS, serverURL), API-Aufrufe. Auf Vercel: VERCEL_URL oder NEXT_PUBLIC_SERVER_URL. */
export const getServerSideURL = () => {
  // Lokal: localhost statt NEXT_PUBLIC_SERVER_URL (oft Production/CDN) — verhindert falsche Canonicals/Links im Dev.
  if (isLocalDevelopment()) {
    return getLocalDevURL()
  }
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  // Vercel: VERCEL_URL ist immer gesetzt (Domain ohne Protokoll); Production-Domain optional
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return getLocalDevURL()
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }
  if (isLocalDevelopment()) {
    return getLocalDevURL()
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
