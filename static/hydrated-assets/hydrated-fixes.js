;(() => {
  const language = location.pathname.startsWith('/en') ? 'en' : 'de'
  const portfolioRewrites =
    language === 'en'
      ? new Map([
          ['/portfolio', '/en/portfolio/'],
          ['/portfolio/', '/en/portfolio/'],
          ['/portfolio-webdesign', '/en/portfolio-web-design/'],
          ['/portfolio-webdesign/', '/en/portfolio-web-design/'],
          ['/portfolio-marketing', '/en/portfolio-marketing/'],
          ['/portfolio-marketing/', '/en/portfolio-marketing/'],
          ['/portfolio-marken', '/en/portfolio-branding/'],
          ['/portfolio-marken/', '/en/portfolio-branding/'],
          ['portfolio-marken', '/en/portfolio-branding/'],
          ['/en/portfolio', '/en/portfolio/'],
          ['/en/portfolio-web-design', '/en/portfolio-web-design/'],
          ['/en/portfolio-marketing', '/en/portfolio-marketing/'],
          ['/en/portfolio-branding', '/en/portfolio-branding/'],
        ])
      : new Map([
          ['/portfolio', '/portfolio/'],
          ['/portfolio-webdesign', '/portfolio-webdesign/'],
          ['/portfolio-marketing', '/portfolio-marketing/'],
          ['/portfolio-marken', '/portfolio-marken/'],
          ['portfolio-marken', '/portfolio-marken/'],
        ])

  const fixPortfolioLinks = () => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href')
      const target = portfolioRewrites.get(href)
      if (target) link.setAttribute('href', target)
    })
  }

  fixPortfolioLinks()
  window.addEventListener('load', fixPortfolioLinks)
  const linkObserver = new MutationObserver(fixPortfolioLinks)
  linkObserver.observe(document.documentElement, { childList: true, subtree: true })

  const injectFooterIconFix = () => {
    if (document.querySelector('style[data-pb-footer-icon-fix]')) return

    const style = document.createElement('style')
    style.dataset.pbFooterIconFix = 'true'
    style.textContent =
      '.footer-custom .footer-icon-img{filter:invert(1)}[data-theme="light"] .footer-custom .footer-icon-img{filter:invert(0)}@media (min-width:1024px){.megamenu .logo-link>img.header-b-logo,.site-header .logo-link>img.header-b-logo{display:none!important;opacity:0!important}.megamenu .header-logo-slot--sticky img.header-b-logo,.site-header .header-logo-slot--sticky img.header-b-logo{display:block!important}}.logo-link .header-logo-slot--sticky{opacity:0;pointer-events:none}.site-header[data-sticky="true"] .logo-link[data-logo-morph-ready="true"] .header-logo-slot--sticky,.megamenu[data-sticky="true"] .logo-link[data-logo-morph-ready="true"] .header-logo-slot--sticky{opacity:1}.site-header:not([data-sticky="true"]) .logo-link .header-logo-slot--default,.megamenu:not([data-sticky="true"]) .logo-link .header-logo-slot--default{opacity:1;clip-path:inset(0 0 0 0);filter:none}'
    document.head.appendChild(style)
  }

  injectFooterIconFix()

  const patchEnglishFooterFetch = () => {
    if (language !== 'en' || typeof window.fetch !== 'function' || window.fetch.__pbFooterPatched) {
      return
    }

    const originalFetch = window.fetch.bind(window)
    const patchedFetch = (input, init) => {
      if (typeof input === 'string' && input.startsWith('/api/frontend/footer')) {
        const url = new URL(input, window.location.origin)
        url.searchParams.set('locale', 'en')
        return originalFetch(`${url.pathname}${url.search}`, init)
      }

      if (input instanceof Request && input.url.includes('/api/frontend/footer')) {
        const url = new URL(input.url)
        url.searchParams.set('locale', 'en')
        return originalFetch(new Request(url.toString(), input), init)
      }

      return originalFetch(input, init)
    }

    patchedFetch.__pbFooterPatched = true
    window.fetch = patchedFetch
  }

  patchEnglishFooterFetch()

  const localizeEnglishFooterText = () => {
    if (language !== 'en') return

    const replacements = new Map([
      [
        'Philipp Bacher – Ihr personaler Ansprechpartner für Digital Consulting, Marketing und Web Design.',
        'Philipp Bacher - your personal partner for digital consulting, marketing and web design.',
      ],
      [
        'Philipp Bacher – Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Web Design.',
        'Philipp Bacher - your personal partner for digital consulting, marketing and web design.',
      ],
      [
        'Philipp Bacher – Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing und Webdesign.',
        'Philipp Bacher - your personal partner for digital consulting, marketing and web design.',
      ],
    ])

    document.querySelectorAll('footer, .footer-custom').forEach((footer) => {
      const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        let text = node.nodeValue || ''
        replacements.forEach((replacement, needle) => {
          text = text.replaceAll(needle, replacement)
        })
        if (text !== node.nodeValue) node.nodeValue = text
      }
    })
  }

  const CONSENT_STORAGE_KEY = 'pb_cookie_consent_v1'
  const GA_MEASUREMENT_ID = 'G-Y0D7045XMB'
  const GOOGLE_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gac', '_gcl']

  const consentCopy =
    language === 'en'
      ? {
          title: 'Privacy settings',
          text: 'I use Google Analytics and Google Ads conversion measurement only with your consent to understand visits and improve the website.',
          accept: 'Accept tracking',
          decline: 'Necessary only',
          settings: 'Cookie settings',
          privacy: 'Privacy policy',
          privacyHref: '/en/privacy',
        }
      : {
          title: 'Datenschutz-Einstellungen',
          text: 'Ich nutze Google Analytics und Google Ads Conversion-Messung nur mit Ihrer Zustimmung, um Besuche zu verstehen und die Website zu verbessern.',
          accept: 'Tracking akzeptieren',
          decline: 'Nur notwendige',
          settings: 'Cookie-Einstellungen',
          privacy: 'Datenschutz',
          privacyHref: '/datenschutz',
        }

  function createCookieIcon(className) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('class', className)
    svg.innerHTML =
      '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path>'
    return svg
  }

  function createActionIcon(kind) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('class', 'h-4 w-4')
    svg.innerHTML =
      kind === 'check'
        ? '<path d="M20 6 9 17l-5-5"></path>'
        : '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
    return svg
  }

  function renderCookieConsent() {
    forceCookieSettingsLeft()
    localizeExistingCookieConsent()
    if (document.querySelector('.cookie-consent-panel, .cookie-consent-settings')) return

    const storedChoice = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (storedChoice === 'accepted') runWhenIdle(injectGoogleTag)
    if (storedChoice === 'accepted' || storedChoice === 'declined') {
      const settings = document.createElement('button')
      settings.type = 'button'
      settings.className = 'cookie-consent-settings'
      settings.style.left = 'max(1.5rem, env(safe-area-inset-left))'
      settings.style.right = 'auto'
      settings.setAttribute('aria-label', consentCopy.settings)
      settings.title = consentCopy.settings
      settings.appendChild(createCookieIcon('h-4 w-4'))
      settings.addEventListener('click', () => {
        settings.remove()
        renderCookiePanel()
      })
      document.body.appendChild(settings)
      return
    }

    renderCookiePanel()
  }

  function renderCookiePanel() {
    if (document.querySelector('.cookie-consent-panel')) return

    const panel = document.createElement('section')
    panel.className = 'cookie-consent-panel'
    panel.setAttribute('role', 'dialog')
    panel.setAttribute('aria-modal', 'false')
    panel.setAttribute('aria-label', consentCopy.title)

    const icon = document.createElement('div')
    icon.className = 'cookie-consent-panel__icon'
    icon.setAttribute('aria-hidden', 'true')
    icon.appendChild(createCookieIcon('h-5 w-5'))

    const body = document.createElement('div')
    body.className = 'cookie-consent-panel__body'
    const title = document.createElement('h2')
    title.textContent = consentCopy.title
    const text = document.createElement('p')
    text.textContent = consentCopy.text
    const privacy = document.createElement('a')
    privacy.href = consentCopy.privacyHref
    privacy.textContent = consentCopy.privacy
    body.append(title, text, privacy)

    const actions = document.createElement('div')
    actions.className = 'cookie-consent-panel__actions'

    const decline = document.createElement('button')
    decline.type = 'button'
    decline.className = 'cookie-consent-btn cookie-consent-btn--muted'
    decline.append(createActionIcon('x'), document.createElement('span'))
    decline.lastChild.textContent = consentCopy.decline

    const accept = document.createElement('button')
    accept.type = 'button'
    accept.className = 'cookie-consent-btn cookie-consent-btn--primary'
    accept.append(createActionIcon('check'), document.createElement('span'))
    accept.lastChild.textContent = consentCopy.accept

    const saveChoice = (choice) => {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice)
      panel.remove()
      if (choice === 'accepted') runWhenIdle(injectGoogleTag)
      if (choice === 'declined') revokeGoogleTagConsent()
      renderCookieConsent()
    }

    decline.addEventListener('click', () => saveChoice('declined'))
    accept.addEventListener('click', () => saveChoice('accepted'))

    actions.append(decline, accept)
    panel.append(icon, body, actions)
    document.body.appendChild(panel)
  }

  function forceCookieSettingsLeft() {
    document.querySelectorAll('.cookie-consent-settings').forEach((settings) => {
      settings.style.left = 'max(1.5rem, env(safe-area-inset-left))'
      settings.style.right = 'auto'
    })
  }

  function localizeExistingCookieConsent() {
    if (language !== 'en') return

    const setText = (element, text) => {
      if (element && element.textContent !== text) element.textContent = text
    }

    document.querySelectorAll('.cookie-consent-panel').forEach((panel) => {
      const title = panel.querySelector('.cookie-consent-panel__body h2')
      const text = panel.querySelector('.cookie-consent-panel__body p')
      const privacy = panel.querySelector('.cookie-consent-panel__body a')
      const mutedButton = panel.querySelector('.cookie-consent-btn--muted span')
      const primaryButton = panel.querySelector('.cookie-consent-btn--primary span')

      setText(title, consentCopy.title)
      setText(text, consentCopy.text)
      if (privacy) {
        setText(privacy, consentCopy.privacy)
        privacy.setAttribute('href', consentCopy.privacyHref)
      }
      setText(mutedButton, consentCopy.decline)
      setText(primaryButton, consentCopy.accept)
      panel.setAttribute('aria-label', consentCopy.title)
    })

    document.querySelectorAll('.cookie-consent-settings').forEach((settings) => {
      settings.setAttribute('aria-label', consentCopy.settings)
      settings.setAttribute('title', consentCopy.settings)
    })
  }

  function injectGoogleTag() {
    if (document.querySelector(`script[data-pb-gtag="${GA_MEASUREMENT_ID}"]`)) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.pbGtag = GA_MEASUREMENT_ID
    document.head.appendChild(script)

    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)
  }

  function deleteCookieForDomain(name, domain) {
    const domainPart = domain ? `; domain=${domain}` : ''
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}; SameSite=Lax`
  }

  function revokeGoogleTagConsent() {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_personalization: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        analytics_storage: 'denied',
      })
    }

    const cookieNames = document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) =>
        GOOGLE_COOKIE_PREFIXES.some((prefix) => name === prefix || name.startsWith(`${prefix}_`)),
      )

    const hostname = window.location.hostname
    const domains = [
      undefined,
      hostname,
      hostname.startsWith('www.') ? hostname.replace(/^www\./, '.') : `.${hostname}`,
    ]

    cookieNames.forEach((name) => {
      domains.forEach((domain) => deleteCookieForDomain(name, domain))
    })
  }

  function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1800 })
      return
    }
    window.setTimeout(callback, 450)
  }

  const renderCookieConsentFallback = () => {
    window.setTimeout(() => {
      renderCookieConsent()
      forceCookieSettingsLeft()
      localizeExistingCookieConsent()
      localizeEnglishFooterText()
    }, 1200)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCookieConsentFallback, { once: true })
  } else {
    renderCookieConsentFallback()
  }

  const cookieSettingsObserver = new MutationObserver(() => {
    forceCookieSettingsLeft()
    localizeExistingCookieConsent()
    localizeEnglishFooterText()
  })
  cookieSettingsObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
})()
