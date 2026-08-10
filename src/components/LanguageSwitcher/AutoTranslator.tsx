'use client'

import { useEffect } from 'react'

import { getLocaleFromPathname } from '@/i18n/routing'
import { useLocale } from '@/providers/Locale/LocaleContext'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string,
        ) => void
      }
    }
    googleTranslateElementInit?: () => void
  }
}

const SCRIPT_ID = 'google-translate-script'
const ELEMENT_ID = 'google_translate_element'
const PROTECTED_TERMS = [
  'Allclean',
  'Allclean.de',
  'Baufinanzierung Halle',
  'Baufinanzierung-Halle.de',
  'BFH',
  'Initiative Saubere Luft',
  'initiative-saubere-luft.de',
  'KIPP Dental',
  'MEDIFISCH',
  'medifisch.de',
  'Musikschule Hörstel',
  'Musikschule Ton & Tönchen',
  'musikschule-hoerstel.de',
  'Philipp Bacher',
  'Soulmating',
  'Soulmating.de',
  'Ton & Tönchen',
  'Ton und Tönchen',
  'Trinkwasser-Verband.de',
  'Trinkwasser Verband',
  'Verband Digitale Innovation',
  'verband-digitale-innovation.de',
  'Zahnarzt Kipp',
  'Zahnarztpraxis Kipp',
  'zahnarztkipp.de',
  'ZHKplus',
  'ZHKplus - Zahnheilkunde Plus',
  'zhkplus.de',
]
const PROTECTED_TERMS_PATTERN = new RegExp(
  `(${[...PROTECTED_TERMS]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'gi',
)

function setGoogleTranslateCookie(locale: string) {
  const value = locale === 'en' ? '/de/en' : '/de/de'
  const expires = 'Fri, 31 Dec 9999 23:59:59 GMT'
  const cookieValue = `googtrans=${value}; expires=${expires}; path=/; SameSite=Lax`

  document.cookie = cookieValue

  const hostname = window.location.hostname
  if (hostname && hostname !== 'localhost') {
    document.cookie = `${cookieValue}; domain=.${hostname.replace(/^www\./, '')}`
  }
}

function getEffectiveLocale(locale: string): string {
  const cookieLocale = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('LOCALE='))
    ?.split('=')[1]

  return cookieLocale === 'en' ? 'en' : locale
}

function scheduleTranslateScriptLoad(): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let idleId: number | null = null
  let cancelled = false

  const loadScript = () => {
    if (cancelled || document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }

  if ('requestIdleCallback' in window) {
    idleId = window.requestIdleCallback(loadScript, { timeout: 1800 })
  } else {
    timeoutId = globalThis.setTimeout(loadScript, 900)
  }

  return () => {
    cancelled = true
    if (idleId != null && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleId)
    }
    if (timeoutId != null) {
      window.clearTimeout(timeoutId)
    }
  }
}

function applyWidgetLocale(locale: string, options?: { force?: boolean }) {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!select) return false

  const value = locale === 'en' ? 'en' : ''
  if (select.value === value && !options?.force) return true

  if (select.value === value && options?.force && value) {
    select.value = ''
    select.dispatchEvent(new Event('change'))
    window.setTimeout(() => {
      select.value = value
      select.dispatchEvent(new Event('change'))
    }, 80)
    return true
  }

  select.value = value
  select.dispatchEvent(new Event('change'))
  return true
}

function shouldRetranslateMutation(mutation: MutationRecord): boolean {
  for (const node of Array.from(mutation.addedNodes)) {
    if (!(node instanceof HTMLElement)) continue
    if (node.closest('.skiptranslate, .google-translate-host')) continue
    if (!node.textContent?.trim()) continue
    return true
  }

  return false
}

function shouldSkipProtectedTermNode(node: Node): boolean {
  const parent = node.parentElement
  if (!parent) return true

  return Boolean(
    parent.closest(
      '.notranslate, .skiptranslate, .google-translate-host, script, style, noscript, textarea, select',
    ),
  )
}

function protectBrandTerms(root: ParentNode = document.body): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldSkipProtectedTermNode(node)) return NodeFilter.FILTER_REJECT
      const text = node.textContent ?? ''
      PROTECTED_TERMS_PATTERN.lastIndex = 0
      return PROTECTED_TERMS_PATTERN.test(text)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
    },
  })

  const textNodes: Text[] = []
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text)
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? ''
    PROTECTED_TERMS_PATTERN.lastIndex = 0

    let lastIndex = 0
    let match: RegExpExecArray | null
    const fragment = document.createDocumentFragment()

    while ((match = PROTECTED_TERMS_PATTERN.exec(text)) != null) {
      if (match.index > lastIndex) {
        fragment.append(document.createTextNode(text.slice(lastIndex, match.index)))
      }

      const span = document.createElement('span')
      span.className = 'notranslate'
      span.setAttribute('translate', 'no')
      span.textContent = match[0]
      fragment.append(span)
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      fragment.append(document.createTextNode(text.slice(lastIndex)))
    }

    textNode.replaceWith(fragment)
  }
}

export function AutoTranslator() {
  const locale = useLocale()
  const pathname = usePathname()
  const pathLocale = getLocaleFromPathname(pathname)

  useEffect(() => {
    if (pathLocale === 'en') {
      protectBrandTerms()
      return
    }

    const effectiveLocale = getEffectiveLocale(locale)

    protectBrandTerms()
    setGoogleTranslateCookie(effectiveLocale)

    if (effectiveLocale === 'de') return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'de',
          includedLanguages: 'de,en',
          autoDisplay: false,
        },
        ELEMENT_ID,
      )
    }

    if (!document.getElementById(SCRIPT_ID)) {
      return scheduleTranslateScriptLoad()
    }

    window.googleTranslateElementInit()
  }, [locale, pathLocale])

  useEffect(() => {
    if (pathLocale === 'en') return

    const effectiveLocale = getEffectiveLocale(locale)

    if (effectiveLocale === 'de') return

    let attempts = 0
    const interval = window.setInterval(() => {
      attempts += 1
      if (applyWidgetLocale(effectiveLocale) || attempts > 20) {
        window.clearInterval(interval)
      }
    }, 250)

    return () => window.clearInterval(interval)
  }, [locale, pathLocale])

  useEffect(() => {
    if (pathLocale === 'en') return

    const effectiveLocale = getEffectiveLocale(locale)

    if (effectiveLocale === 'de') return

    let timeoutId: number | null = null
    let lastAppliedAt = 0

    const observer = new MutationObserver((mutations) => {
      const shouldRetranslate = mutations.some(shouldRetranslateMutation)
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof HTMLElement) {
            protectBrandTerms(node)
          }
        }
      }

      if (!shouldRetranslate) return

      if (timeoutId != null) {
        window.clearTimeout(timeoutId)
      }

      timeoutId = window.setTimeout(() => {
        timeoutId = null
        const now = Date.now()
        if (now - lastAppliedAt < 900) return
        lastAppliedAt = now
        applyWidgetLocale(effectiveLocale, { force: true })
      }, 180)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      if (timeoutId != null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [locale, pathLocale])

  return <div id={ELEMENT_ID} aria-hidden="true" className="google-translate-host" />
}
