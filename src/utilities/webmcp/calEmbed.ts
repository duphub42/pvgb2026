export type CalDomain = 'cal.com' | 'cal.eu'

export type CalModalOptions = {
  calLink: string
  calOrigin?: string
  config?: {
    layout?: 'month_view' | 'week_view' | 'column_view'
    theme?: 'light' | 'dark' | 'auto'
  }
}

export type CalInlineOptions = {
  elementOrSelector: string | HTMLElement
  calLink: string
  calOrigin?: string
  config?: {
    layout?: 'month_view' | 'week_view' | 'column_view'
    theme?: 'light' | 'dark' | 'auto'
  }
}

type CalInitOptions = {
  origin?: string
}

type CalApi = ((
  action: 'init' | 'modal' | 'inline' | 'ui' | 'preload' | 'prerender' | 'closeModal',
  arg?: string | CalModalOptions | CalInlineOptions | CalInitOptions | Record<string, unknown>,
  options?: CalModalOptions | CalInlineOptions | CalInitOptions | Record<string, unknown>,
) => void) & {
  loaded?: boolean
  q?: unknown[][]
  ns?: Record<string, unknown>
  ui?: unknown
}

type WindowWithCal = Window & { Cal?: CalApi }

export const DEFAULT_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim() || 'philippbacher/30min'

const DEFAULT_CAL_DOMAIN: CalDomain =
  process.env.NEXT_PUBLIC_CAL_DOMAIN?.trim() === 'cal.com' ? 'cal.com' : 'cal.eu'

export function getCalDomain(calLink: string): CalDomain {
  if (calLink.startsWith('http')) {
    if (calLink.includes('cal.eu')) return 'cal.eu'
    if (calLink.includes('cal.com')) return 'cal.com'
    return DEFAULT_CAL_DOMAIN
  }

  if (calLink.startsWith('eu:')) return 'cal.eu'
  if (calLink.startsWith('com:')) return 'cal.com'
  return DEFAULT_CAL_DOMAIN
}

export function getCalOrigin(calDomain: CalDomain = DEFAULT_CAL_DOMAIN): string {
  // Embed iframe host (app.*) — booking UI lives there for embeds.
  return calDomain === 'cal.eu' ? 'https://app.cal.eu' : 'https://app.cal.com'
}

export function getCalEmbedScriptUrl(calDomain: CalDomain = DEFAULT_CAL_DOMAIN): string {
  return calDomain === 'cal.eu'
    ? 'https://app.cal.eu/embed/embed.js'
    : 'https://app.cal.com/embed/embed.js'
}

export function getCalBookingUrl(calLink = DEFAULT_CAL_LINK): string {
  const calDomain = getCalDomain(calLink)
  const cleanedCalLink = normalizeCalLink(calLink)
  return `https://www.${calDomain}/${cleanedCalLink}`
}

export function getCalEmbedUrl(calLink = DEFAULT_CAL_LINK): string {
  const cleanedCalLink = normalizeCalLink(calLink)
  const calDomain = getCalDomain(calLink)
  // Public booking host (www) for reliable iframe embeds; app.* is for the embed script.
  const bookingOrigin = calDomain === 'cal.eu' ? 'https://www.cal.eu' : 'https://app.cal.com'
  const params = new URLSearchParams({
    embed: '',
    layout: 'month_view',
  })
  return `${bookingOrigin}/${cleanedCalLink}/embed?${params.toString()}`
}

export const CAL_BOOKING_OPEN_EVENT = 'pvgb:open-cal-booking'

export type CalBookingOpenDetail = {
  calLink?: string
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

  if (calLink.startsWith('eu:')) return calLink.replace(/^eu:/, '')
  if (calLink.startsWith('com:')) return calLink.replace(/^com:/, '')

  return calLink
}

function getCal(): CalApi | null {
  if (typeof window === 'undefined') return null
  return (window as WindowWithCal).Cal ?? null
}

/**
 * Installs the official Cal stub and loads embed.js for the given domain.
 * Mirrors Cal's documented snippet so `init` / `modal` queue until the script is ready.
 */
function ensureCalSnippet(calDomain: CalDomain): void {
  if (typeof window === 'undefined') return

  const win = window as WindowWithCal
  const scriptUrl = getCalEmbedScriptUrl(calDomain)

  if (!win.Cal) {
    const stub = function Cal(...args: unknown[]) {
      const cal = win.Cal as CalApi
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        const script = document.createElement('script')
        script.src = scriptUrl
        script.async = true
        document.head.appendChild(script)
        cal.loaded = true
      }

      if (args[0] === 'init') {
        const api = function (...apiArgs: unknown[]) {
          ;(api.q = api.q || []).push(apiArgs)
        } as CalApi
        api.q = api.q || []
        const namespace = args[1]
        if (typeof namespace === 'string') {
          cal.ns = cal.ns || {}
          cal.ns[namespace] = api
          ;(cal.q = cal.q || []).push(args)
        } else {
          ;(cal.q = cal.q || []).push(args)
        }
        return
      }

      ;(cal.q = cal.q || []).push(args)
    } as CalApi

    stub.q = []
    stub.ns = {}
    win.Cal = stub
  } else if (!win.Cal.loaded) {
    // Cal stub exists (e.g. from a previous call for another domain) — still ensure script.
    const existing = document.querySelector(`script[src="${scriptUrl}"]`)
    if (!existing) {
      const script = document.createElement('script')
      script.src = scriptUrl
      script.async = true
      document.head.appendChild(script)
    }
    win.Cal.loaded = true
    win.Cal.q = win.Cal.q || []
    win.Cal.ns = win.Cal.ns || {}
  }
}

function waitForCalScript(calDomain: CalDomain): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Cal embed requires a browser context.'))
  }

  ensureCalSnippet(calDomain)

  return new Promise((resolve, reject) => {
    const scriptUrl = getCalEmbedScriptUrl(calDomain)
    const existing = document.querySelector(
      `script[src="${scriptUrl}"]`,
    ) as HTMLScriptElement | null

    const finish = () => {
      // Give the embed a tick to replace/upgrade the stub API.
      window.setTimeout(() => resolve(), 0)
    }

    if (existing?.dataset.calLoaded === 'true') {
      finish()
      return
    }

    if (existing) {
      existing.addEventListener(
        'load',
        () => {
          existing.dataset.calLoaded = 'true'
          finish()
        },
        { once: true },
      )
      existing.addEventListener(
        'error',
        () => reject(new Error('Cal embed script failed to load.')),
        { once: true },
      )
      return
    }

    // ensureCalSnippet should have appended the script; poll briefly if not found yet.
    window.setTimeout(() => {
      const script = document.querySelector(
        `script[src="${scriptUrl}"]`,
      ) as HTMLScriptElement | null
      if (!script) {
        reject(new Error('Cal embed script was not injected.'))
        return
      }
      script.addEventListener(
        'load',
        () => {
          script.dataset.calLoaded = 'true'
          finish()
        },
        { once: true },
      )
      script.addEventListener(
        'error',
        () => reject(new Error('Cal embed script failed to load.')),
        { once: true },
      )
    }, 0)
  })
}

async function initCalEmbed(calLink = DEFAULT_CAL_LINK): Promise<{
  calDomain: CalDomain
  cleanedCalLink: string
  calOrigin: string
}> {
  const calDomain = getCalDomain(calLink)
  const cleanedCalLink = normalizeCalLink(calLink)
  const calOrigin = getCalOrigin(calDomain)

  await waitForCalScript(calDomain)

  const cal = getCal()
  if (typeof cal !== 'function') {
    throw new Error('Cal embed API is unavailable.')
  }

  cal('init', { origin: calOrigin })

  return { calDomain, cleanedCalLink, calOrigin }
}

export async function ensureCalEmbedReady(calLink = DEFAULT_CAL_LINK): Promise<CalDomain> {
  const { calDomain } = await initCalEmbed(calLink)
  return calDomain
}

export async function mountCalInlineEmbed(
  options: CalInlineOptions,
  calLink = DEFAULT_CAL_LINK,
): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('Cal inline embed requires a browser context.')
  }

  const { cleanedCalLink, calOrigin } = await initCalEmbed(calLink)
  const cal = getCal()
  if (typeof cal !== 'function') {
    throw new Error('Cal embed API is unavailable.')
  }

  cal('inline', {
    ...options,
    calLink: cleanedCalLink,
    calOrigin,
    config: {
      layout: 'month_view',
      ...options.config,
    },
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

  // Prefer the in-page dialog host (stable popup, no new tab). Never preload embed.js.
  window.dispatchEvent(
    new CustomEvent<CalBookingOpenDetail>(CAL_BOOKING_OPEN_EVENT, {
      detail: { calLink },
    }),
  )

  return { status: 'opened', calLink: cleanedCalLink, calDomain }
}
