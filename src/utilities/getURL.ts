import canUseDOM from './canUseDOM'

function getLocalDevURL() {
  const port = process.env.PORT?.trim() || '3000'
  return `http://localhost:${port}`
}

function isLocalDevelopment() {
  return process.env.NODE_ENV === 'development' && !process.env.VERCEL
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
