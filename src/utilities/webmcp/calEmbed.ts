export type CalDomain = 'cal.com' | 'cal.eu'

export type CalModalOptions = {
  calLink: string
  config: {
    layout: 'month_view'
  }
}

type CalFunction = ((action: 'modal', options: CalModalOptions) => void) & {
  q?: unknown[][]
  ns?: Record<string, unknown>
  ui?: unknown
}

type CalObject = {
  modal?: (options: CalModalOptions) => void
  q?: unknown[][]
  ns?: Record<string, unknown>
  ui?: unknown
}

type CalApi = CalFunction | CalObject | null

export const DEFAULT_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() || 'philippbacher/30min'

export function getCalDomain(calLink: string): CalDomain {
  if (calLink.startsWith('http')) {
    if (calLink.includes('cal.eu')) return 'cal.eu'
    return 'cal.com'
  }

  if (calLink.startsWith('eu:')) return 'cal.eu'
  return 'cal.com'
}

export function normalizeCalLink(calLink: string): string {
  if (calLink.startsWith('http')) {
    try {
      const url = new URL(calLink)
      return url.pathname.replace(/^\//, '')
    } catch {
      return calLink
    }
  }

  if (calLink.startsWith('eu:')) {
    return calLink.replace(/^eu:/, '')
  }

  return calLink
}

function getCal(): CalApi {
  if (typeof window === 'undefined') return null
  return (window as Window & { Cal?: CalFunction | CalObject }).Cal ?? null
}

function ensureCalStub(): void {
  if (typeof window === 'undefined') return

  const cal = getCal()
  if (!cal) {
    const stub: CalFunction = ((...args: unknown[]) => {
      ;(stub.q = stub.q || []).push(args)
    }) as CalFunction
    stub.q = []
    stub.ns = {}
    ;(window as Window & { Cal?: CalFunction | CalObject }).Cal = stub
    return
  }

  if (typeof cal === 'function') {
    cal.q = cal.q || []
    cal.ns = cal.ns || {}
  }
}

function isCalStub(cal: CalApi): boolean {
  return typeof cal === 'function' && Array.isArray(cal.q) && typeof cal.ui === 'undefined'
}

function loadCalEmbedScript(calDomain: CalDomain): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Cal embed requires a browser context.'))
  }

  return new Promise((resolve, reject) => {
    const scriptId = `cal-embed-script-${calDomain}`
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null

    const handleReady = () => {
      const cal = getCal()
      if (cal && !isCalStub(cal)) {
        resolve()
      } else {
        reject(new Error('Cal embed failed to initialize.'))
      }
    }

    if (existing) {
      if (existing.getAttribute('data-cal-loaded') === 'true') {
        handleReady()
        return
      }

      existing.addEventListener('load', handleReady, { once: true })
      existing.addEventListener('error', () => reject(new Error('Cal embed script failed to load.')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src =
      calDomain === 'cal.eu'
        ? 'https://app.cal.eu/embed/embed.js'
        : 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => {
      script.setAttribute('data-cal-loaded', 'true')
      handleReady()
    }
    script.onerror = () => reject(new Error('Cal embed script failed to load.'))

    document.body.appendChild(script)
  })
}

export async function openCalBookingModal(calLink = DEFAULT_CAL_LINK): Promise<{
  status: 'opened' | 'fallback'
  calLink: string
  calDomain: CalDomain
}> {
  if (typeof window === 'undefined') {
    throw new Error('Cal booking requires a browser context.')
  }

  const calDomain = getCalDomain(calLink)
  const cleanedCalLink = normalizeCalLink(calLink)
  const options: CalModalOptions = {
    calLink: cleanedCalLink,
    config: {
      layout: 'month_view',
    },
  }

  ensureCalStub()

  try {
    await loadCalEmbedScript(calDomain)
  } catch {
    window.open(`https://${calDomain}/${cleanedCalLink}`, '_blank', 'noopener,noreferrer')
    return { status: 'fallback', calLink: cleanedCalLink, calDomain }
  }

  const cal = getCal()
  if (typeof cal === 'function') {
    cal('modal', options)
    return { status: 'opened', calLink: cleanedCalLink, calDomain }
  }

  if (typeof cal === 'object' && cal !== null && typeof cal.modal === 'function') {
    cal.modal(options)
    return { status: 'opened', calLink: cleanedCalLink, calDomain }
  }

  window.open(`https://${calDomain}/${cleanedCalLink}`, '_blank', 'noopener,noreferrer')
  return { status: 'fallback', calLink: cleanedCalLink, calDomain }
}
