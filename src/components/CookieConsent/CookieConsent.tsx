'use client'

import { Check, Cookie, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CONSENT_STORAGE_KEY,
  injectGoogleTag,
  revokeGoogleTagConsent,
  runWhenIdle,
} from '@/utilities/googleTag.client'

type ConsentChoice = 'accepted' | 'declined'
type Locale = 'de' | 'en'

function getLocaleFromPathname(): Locale {
  if (typeof window === 'undefined') return 'de'
  return window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')
    ? 'en'
    : 'de'
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [locale, setLocale] = useState<Locale>('de')

  const copy =
    locale === 'en'
      ? {
          title: 'Privacy settings',
          text: 'I use Google Analytics only with your consent to understand visits and improve the website.',
          accept: 'Accept analytics',
          decline: 'Necessary only',
          settings: 'Cookie settings',
          privacy: 'Privacy policy',
          privacyHref: '/en/privacy',
        }
      : {
          title: 'Datenschutz-Einstellungen',
          text: 'Ich nutze Google Analytics nur mit Ihrer Zustimmung, um Besuche zu verstehen und die Website zu verbessern.',
          accept: 'Analytics akzeptieren',
          decline: 'Nur notwendige',
          settings: 'Cookie-Einstellungen',
          privacy: 'Datenschutz',
          privacyHref: '/datenschutz',
        }

  useEffect(() => {
    setLocale(getLocaleFromPathname())
    const storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null
    if (storedChoice === 'accepted' || storedChoice === 'declined') {
      setChoice(storedChoice)
      setIsOpen(false)
      if (storedChoice === 'accepted') runWhenIdle(injectGoogleTag)
      return
    }
    setIsOpen(true)
  }, [])

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice)
    setChoice(nextChoice)
    setIsOpen(false)
    if (nextChoice === 'accepted') runWhenIdle(injectGoogleTag)
    if (nextChoice === 'declined') revokeGoogleTagConsent()
  }

  return (
    <>
      {isOpen && (
        <section
          aria-label={copy.title}
          className="cookie-consent-panel"
          role="dialog"
          aria-modal="false"
        >
          <div className="cookie-consent-panel__icon" aria-hidden="true">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="cookie-consent-panel__body">
            <h2>{copy.title}</h2>
            <p>{copy.text}</p>
            <a href={copy.privacyHref}>{copy.privacy}</a>
          </div>
          <div className="cookie-consent-panel__actions">
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn--muted"
              onClick={() => saveChoice('declined')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>{copy.decline}</span>
            </button>
            <button
              type="button"
              className="cookie-consent-btn cookie-consent-btn--primary"
              onClick={() => saveChoice('accepted')}
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>{copy.accept}</span>
            </button>
          </div>
        </section>
      )}

      {!isOpen && choice != null && (
        <button
          type="button"
          className="cookie-consent-settings"
          style={{
            left: 'max(1.5rem, env(safe-area-inset-left))',
            right: 'auto',
          }}
          aria-label={copy.settings}
          title={copy.settings}
          onClick={() => setIsOpen(true)}
        >
          <Cookie className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  )
}
