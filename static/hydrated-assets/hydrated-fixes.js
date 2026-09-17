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
  const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

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

  function isConsentChoice(value) {
    return value === 'accepted' || value === 'declined'
  }

  function getCookieValue(name) {
    const prefix = `${encodeURIComponent(name)}=`
    const cookie = document.cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix))

    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null
  }

  function getStoredConsentChoice() {
    try {
      const storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY)
      if (isConsentChoice(storedChoice)) return storedChoice
    } catch {}

    const cookieChoice = getCookieValue(CONSENT_STORAGE_KEY)
    return isConsentChoice(cookieChoice) ? cookieChoice : null
  }

  function setStoredConsentChoice(choice) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    } catch {}

    document.cookie = `${encodeURIComponent(CONSENT_STORAGE_KEY)}=${encodeURIComponent(
      choice,
    )}; Max-Age=${CONSENT_COOKIE_MAX_AGE}; path=/; SameSite=Lax`
  }

  function hasNextRuntime() {
    return Boolean(document.querySelector('script[src*="/_next/static/"]'))
  }

  function hideCookieElement(element) {
    if (!element) return
    element.setAttribute('hidden', '')
    element.setAttribute('aria-hidden', 'true')
    element.style.display = 'none'
  }

  function renderCookieConsent() {
    forceCookieSettingsLeft()
    localizeExistingCookieConsent()

    if (hasNextRuntime()) return

    const storedChoice = getStoredConsentChoice()
    if (storedChoice === 'accepted' || storedChoice === 'declined') {
      document.querySelectorAll('.cookie-consent-panel').forEach(hideCookieElement)
    } else if (wireExistingCookiePanel()) {
      return
    }
    if (document.querySelector('.cookie-consent-panel, .cookie-consent-settings')) return

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
        hideCookieElement(settings)
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

    decline.addEventListener('click', () => saveCookieChoice('declined', panel))
    accept.addEventListener('click', () => saveCookieChoice('accepted', panel))

    actions.append(decline, accept)
    panel.append(icon, body, actions)
    document.body.appendChild(panel)
  }

  function saveCookieChoice(choice, panel) {
    setStoredConsentChoice(choice)
    hideCookieElement(panel)
    if (choice === 'accepted') runWhenIdle(injectGoogleTag)
    if (choice === 'declined') revokeGoogleTagConsent()
    renderCookieConsent()
  }

  function wireExistingCookiePanel() {
    const panel = document.querySelector('.cookie-consent-panel')
    if (!panel) return false

    const decline = panel.querySelector('.cookie-consent-btn--muted')
    const accept = panel.querySelector('.cookie-consent-btn--primary')

    if (decline && decline.dataset.pbCookieWired !== 'true') {
      decline.dataset.pbCookieWired = 'true'
      decline.addEventListener('click', () => saveCookieChoice('declined', panel))
    }

    if (accept && accept.dataset.pbCookieWired !== 'true') {
      accept.dataset.pbCookieWired = 'true'
      accept.addEventListener('click', () => saveCookieChoice('accepted', panel))
    }

    return true
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

  const portfolioShowcaseSources = new Map([
    ['allclean', '/showcase-portfolio/desktop/card-allclean.jpg'],
    ['bfh - baufinanzierung halle', '/showcase-portfolio/desktop/card-baufinanzierung.jpg'],
    ['initiative saubere luft', '/showcase-portfolio/desktop/card-initiative-saubere-luft.jpg'],
    ['kipp dental', '/showcase-portfolio/desktop/card-kipp-dental.jpg'],
    ['medifisch', '/showcase-portfolio/desktop/card-medifisch.jpg'],
    ['moriss obstplantagen', '/showcase-portfolio/desktop/card-moriss.jpg'],
    ['schloss eicks', '/showcase-portfolio/desktop/card-schlosseicks.jpg'],
    ['soulmating', '/showcase-portfolio/desktop/card-soulmating.jpg'],
    ['ton & tönchen', '/showcase-portfolio/desktop/card-musikschule-hoerstel.jpg'],
    ['trinkwasser verband', '/showcase-portfolio/desktop/card-trinkwasser-verband.jpg'],
    ['verband digitale innovation', '/showcase-portfolio/desktop/card-verband-digitale-innovation.jpg'],
    ['zahnarzt kipp', '/showcase-portfolio/desktop/card-zahnarzt.jpg'],
    ['zhkplus - zahnheilkunde plus', '/showcase-portfolio/desktop/card-zhkplus.jpg'],
  ])

  const preferredPortfolioOrder = [
    'schloss eicks',
    'medifisch',
    'allclean',
    'moriss obstplantagen',
    'bfh - baufinanzierung halle',
    'ton & tönchen',
    'verband digitale innovation',
    'zhkplus - zahnheilkunde plus',
    'soulmating',
    'kipp dental',
    'initiative saubere luft',
    'zahnarzt kipp',
    'trinkwasser verband',
  ]
  const portfolioShowcasePlaceholder =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"%3E%3C/svg%3E'
  let portfolioImageObserver

  function isMobilePortfolioViewport() {
    return window.matchMedia('(max-width: 767px)').matches
  }

  function normalizePortfolioTitle(value) {
    return String(value || '')
      .replace(/^(Details öffnen|Open details):\s*/i, '')
      .trim()
      .toLowerCase()
  }

  function rotatePortfolioOrder(order, offset) {
    if (!order.length) return order
    const normalizedOffset = ((offset % order.length) + order.length) % order.length
    return [...order.slice(normalizedOffset), ...order.slice(0, normalizedOffset)]
  }

  function reorderPortfolioShowcaseCards() {
    document.querySelectorAll('[data-portfolio-isometric-grid="true"]').forEach((grid) => {
      if (grid.dataset.pbPortfolioMixed === 'true') return

      const cards = Array.from(grid.querySelectorAll('[data-portfolio-card="true"]'))
      if (cards.length < preferredPortfolioOrder.length) return

      const groups = new Map()
      cards.forEach((card) => {
        const title = normalizePortfolioTitle(card.getAttribute('aria-label'))
        if (!groups.has(title)) groups.set(title, [])
        groups.get(title).push(card)
      })

      const titles = [
        ...preferredPortfolioOrder.filter((title) => groups.has(title)),
        ...Array.from(groups.keys()).filter((title) => !preferredPortfolioOrder.includes(title)),
      ]
      const centerRepeatIndex = 2
      const repeatCount = Math.ceil(cards.length / Math.max(titles.length, 1))
      const nextCards = []

      for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex += 1) {
        const distanceFromCenter = repeatIndex - centerRepeatIndex
        const rotated = rotatePortfolioOrder(titles, Math.abs(distanceFromCenter) * 5)
        const repeatTitles = distanceFromCenter < 0 ? [...rotated].reverse() : rotated

        repeatTitles.forEach((title) => {
          const card = groups.get(title)?.shift()
          if (card) nextCards.push(card)
        })
      }

      groups.forEach((remainingCards) => nextCards.push(...remainingCards))
      nextCards.forEach((card) => grid.appendChild(card))
      grid.dataset.pbPortfolioMixed = 'true'
    })
  }

  function pruneMobilePortfolioShowcaseCards() {
    if (!isMobilePortfolioViewport()) return

    document.querySelectorAll('[data-portfolio-isometric-grid="true"]').forEach((grid) => {
      if (grid.dataset.pbPortfolioMobilePruned === 'true') return

      const cards = Array.from(grid.querySelectorAll('[data-portfolio-card="true"]'))
      cards.slice(26).forEach((card) => card.remove())
      grid.dataset.pbPortfolioMobilePruned = 'true'
    })
  }

  function activatePortfolioShowcaseImage(img) {
    const src = img.dataset.portfolioShowcaseSrc
    if (!src || img.getAttribute('src') === src) return
    img.setAttribute('src', src)
  }

  function queuePortfolioShowcaseImage(img, index) {
    if (isMobilePortfolioViewport() && index > 11) return

    if ('IntersectionObserver' in window) {
      if (!portfolioImageObserver) {
        portfolioImageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              portfolioImageObserver.unobserve(entry.target)
              activatePortfolioShowcaseImage(entry.target)
            })
          },
          { rootMargin: '1400px 5000px' },
        )
      }
      portfolioImageObserver.observe(img)
      return
    }

    if (index < 12) activatePortfolioShowcaseImage(img)
  }

  function forcePortfolioShowcaseImages() {
    if (isMobilePortfolioViewport()) return

    reorderPortfolioShowcaseCards()
    pruneMobilePortfolioShowcaseCards()

    document
      .querySelectorAll('img[data-portfolio-showcase-src], img[src*="/showcase-portfolio/"]')
      .forEach((img, index) => {
        const card = img.closest('[data-portfolio-card="true"]')
        const title = normalizePortfolioTitle(card?.getAttribute('aria-label'))
        const mappedSrc = portfolioShowcaseSources.get(title)
        if (mappedSrc) img.dataset.portfolioShowcaseSrc = mappedSrc
        if (img.getAttribute('src') !== img.dataset.portfolioShowcaseSrc) {
          img.setAttribute('src', portfolioShowcasePlaceholder)
        }

        img.loading = 'lazy'
        img.decoding = 'async'
        activatePortfolioShowcaseImage(img)
      })
  }

  let portfolioShowcaseFixScheduled = false
  function schedulePortfolioShowcaseImages() {
    if (isMobilePortfolioViewport()) return
    if (portfolioShowcaseFixScheduled) return
    portfolioShowcaseFixScheduled = true

    const run = () => {
      window.setTimeout(() => {
        portfolioShowcaseFixScheduled = false
        forcePortfolioShowcaseImages()
      }, 800)
    }

    if (document.readyState === 'complete') {
      run()
      return
    }

    window.addEventListener('load', run, { once: true })
  }

  const runStaticFixes = () => {
    renderCookieConsent()
    forceCookieSettingsLeft()
    localizeExistingCookieConsent()
    localizeEnglishFooterText()
  }

  const renderCookieConsentFallback = () => {
    runStaticFixes()

    window.setTimeout(() => {
      schedulePortfolioShowcaseImages()
      runStaticFixes()
    }, 1200)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCookieConsentFallback, { once: true })
  } else {
    renderCookieConsentFallback()
  }

  const cookieSettingsObserver = new MutationObserver(() => {
    schedulePortfolioShowcaseImages()
    forceCookieSettingsLeft()
    localizeExistingCookieConsent()
    localizeEnglishFooterText()
  })
  cookieSettingsObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
})()
