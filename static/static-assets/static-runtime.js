(() => {
  const routeMap = {
    de: {
      home: '/',
      services: '/leistungen/',
      web: '/webdesign/',
      print: '/print/',
      keynotes: '/keynotes/',
      seo: '/seo/',
      sem: '/sem/',
      content: '/content/',
      ci: '/corporate-identity/',
      logo: '/logo/',
      brand: '/markenstrategie/',
      automation: '/automatisierung/',
      portfolioWeb: '/portfolio-webdesign/',
      portfolioMarketing: '/portfolio-marketing/',
      portfolioBrand: '/portfolio-marken/',
      prices: '/preise/',
      profile: '/profil/',
      contact: '/kontakt/',
      legal: '/impressum/',
      privacy: '/datenschutz/',
    },
    en: {
      home: '/en/',
      services: '/en/services/',
      web: '/en/web-design/',
      print: '/en/print/',
      keynotes: '/en/keynotes/',
      seo: '/en/seo/',
      sem: '/en/sem/',
      content: '/en/content/',
      ci: '/en/corporate-identity/',
      logo: '/en/logo/',
      brand: '/en/brand-strategy/',
      automation: '/en/automation/',
      portfolioWeb: '/en/portfolio-web-design/',
      portfolioMarketing: '/en/portfolio-marketing/',
      portfolioBrand: '/en/portfolio-branding/',
      prices: '/en/prices/',
      profile: '/en/profile/',
      contact: '/en/contact/',
      legal: '/en/legal/',
      privacy: '/en/privacy/',
    },
  }

  const copy = {
    de: {
      services: 'Leistungen',
      portfolio: 'Portfolio',
      menu: 'Menü',
      close: 'Schließen',
      search: 'Suche',
      searchPlaceholder: 'Seite suchen...',
      noResults: 'Keine Treffer',
      columns: [
        ['Design', [['Websites', 'Webdesign und Entwicklung', 'web'], ['Print- & Grafikdesign', 'Markenmaterialien und Layouts', 'print'], ['Präsentationen', 'Keynotes und Slides', 'keynotes']]],
        ['Marketing', [['SEO', 'Sichtbarkeit in Suchmaschinen', 'seo'], ['SEM', 'Google Ads und Kampagnen', 'sem'], ['Content-Creation', 'Texte, Bilder und Inhalte', 'content']]],
        ['Branding', [['Corporate Identity', 'Systeme für starke Marken', 'ci'], ['Logo-Entwicklung', 'Zeichen, Wortmarken und Systeme', 'logo'], ['Markenstrategie', 'Positionierung und Botschaft', 'brand']]],
        ['Automation', [['Automatisierung', 'Workflows, Prozesse und KI', 'automation']]],
      ],
      portfolioColumns: [
        ['Referenzen', [['Webdesign-Referenzen', 'Websites und digitale Auftritte', 'portfolioWeb'], ['Marketing-Referenzen', 'Kampagnen und Sichtbarkeit', 'portfolioMarketing'], ['Marken-Referenzen', 'Branding und Identität', 'portfolioBrand']]],
      ],
    },
    en: {
      services: 'Services',
      portfolio: 'Portfolio',
      menu: 'Menu',
      close: 'Close',
      search: 'Search',
      searchPlaceholder: 'Search pages...',
      noResults: 'No results',
      columns: [
        ['Design', [['Web Design', 'Websites and development', 'web'], ['Print & Graphic Design', 'Brand materials and layouts', 'print'], ['Presentations', 'Keynotes and slides', 'keynotes']]],
        ['Marketing', [['SEO', 'Search visibility', 'seo'], ['SEM', 'Google Ads and campaigns', 'sem'], ['Content Creation', 'Copy, visuals and content', 'content']]],
        ['Branding', [['Corporate Identity', 'Systems for strong brands', 'ci'], ['Logo Design', 'Marks, wordmarks and systems', 'logo'], ['Brand Strategy', 'Positioning and messaging', 'brand']]],
        ['Automation', [['Automation', 'Workflows, processes and AI', 'automation']]],
      ],
      portfolioColumns: [
        ['Work', [['Web Design Projects', 'Websites and digital presences', 'portfolioWeb'], ['Marketing Projects', 'Campaigns and visibility', 'portfolioMarketing'], ['Branding Projects', 'Branding and identity', 'portfolioBrand']]],
      ],
    },
  }

  const language = location.pathname.startsWith('/en') ? 'en' : 'de'
  const routes = routeMap[language]
  const t = copy[language]
  const allPages = [
    ['Home', 'home'],
    [t.services, 'services'],
    ['Webdesign', 'web'],
    ['Print', 'print'],
    ['SEO', 'seo'],
    ['SEM', 'sem'],
    ['Content', 'content'],
    ['Branding', 'ci'],
    ['Logo', 'logo'],
    [language === 'en' ? 'Prices' : 'Preise', 'prices'],
    [language === 'en' ? 'Profile' : 'Profil', 'profile'],
    [language === 'en' ? 'Contact' : 'Kontakt', 'contact'],
  ]

  const makeLink = ([label, description, key]) =>
    `<a class="static-megamenu-link" href="${routes[key]}"><strong>${label}</strong><span>${description}</span></a>`

  const renderPanel = (type) => {
    const columns = type === 'portfolio' ? t.portfolioColumns : t.columns
    return `<div class="static-megamenu-inner">${columns
      .map(([title, items]) => `<div class="static-megamenu-column"><p class="static-megamenu-title">${title}</p>${items.map(makeLink).join('')}</div>`)
      .join('')}</div>`
  }

  const ensurePanel = () => {
    let panel = document.querySelector('.static-megamenu-panel')
    if (!panel) {
      panel = document.createElement('div')
      panel.className = 'static-megamenu-panel'
      panel.hidden = true
      panel.addEventListener('mouseleave', closePanel)
      document.body.append(panel)
    }
    return panel
  }

  const closePanel = () => {
    const panel = document.querySelector('.static-megamenu-panel')
    if (panel) panel.hidden = true
    document.querySelector('header')?.removeAttribute('data-menu-open')
    document.querySelectorAll('.megamenu-top-item[aria-expanded="true"]').forEach((button) => {
      button.setAttribute('aria-expanded', 'false')
      button.setAttribute('data-state', 'closed')
    })
  }

  const openPanel = (type, button) => {
    const panel = ensurePanel()
    panel.innerHTML = renderPanel(type)
    panel.hidden = false
    document.querySelector('header')?.setAttribute('data-menu-open', 'true')
    document.querySelectorAll('.megamenu-top-item[aria-expanded]').forEach((item) => {
      item.setAttribute('aria-expanded', item === button ? 'true' : 'false')
      item.setAttribute('data-state', item === button ? 'open' : 'closed')
    })
  }

  const setupMegaMenu = () => {
    document.querySelectorAll('.megamenu-top-item').forEach((item) => {
      const label = item.textContent.trim().toLowerCase()
      const type = label.includes('leistung') || label.includes('service') ? 'services' : label.includes('portfolio') ? 'portfolio' : null
      if (!type) return
      // The exported shell renders these as plain <a href> links (not <button>), since
      // they're also valid standalone overview pages - only intercept the click when
      // it's a button (no navigation target); anchors still get the hover preview.
      if (item.tagName === 'BUTTON') {
        item.addEventListener('click', (event) => {
          event.preventDefault()
          event.stopPropagation()
          openPanel(type, item)
        })
      }
      item.addEventListener('mouseenter', () => openPanel(type, item))
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePanel()
        closeMobile()
        closeSearch()
      }
    })
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.static-megamenu-panel,.megamenu-nav')) closePanel()
    })
  }

  const setupTheme = () => {
    const applyTheme = (theme) => {
      const resolved = theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme
      document.documentElement.dataset.theme = resolved
      localStorage.setItem('pvgb-theme', theme)
      document.querySelectorAll('[aria-label="Hell"]').forEach((button) => button.setAttribute('aria-pressed', String(theme === 'light')))
      document.querySelectorAll('[aria-label="Dunkel"]').forEach((button) => button.setAttribute('aria-pressed', String(theme === 'dark')))
      document.querySelectorAll('[aria-label="System"]').forEach((button) => button.setAttribute('aria-pressed', String(theme === 'system')))
    }
    applyTheme(localStorage.getItem('pvgb-theme') || 'system')
    document.querySelectorAll('.header-tool-toggle--theme').forEach((button) => {
      button.addEventListener('click', () => {
        const current = localStorage.getItem('pvgb-theme') || 'system'
        applyTheme(current === 'dark' ? 'light' : 'dark')
      })
    })
    document.querySelectorAll('[aria-label="Hell"]').forEach((button) => button.addEventListener('click', () => applyTheme('light')))
    document.querySelectorAll('[aria-label="Dunkel"]').forEach((button) => button.addEventListener('click', () => applyTheme('dark')))
    document.querySelectorAll('[aria-label="System"]').forEach((button) => button.addEventListener('click', () => applyTheme('system')))
  }

  const altPath = (targetLang) => {
    const currentRoutes = routeMap[language]
    const targetRoutes = routeMap[targetLang]
    const normalized = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`
    const key = Object.keys(currentRoutes).find((routeKey) => currentRoutes[routeKey] === normalized) || 'home'
    return targetRoutes[key]
  }

  const setupLanguage = () => {
    document.querySelectorAll('.header-language-switcher').forEach((switcher) => {
      const trigger = switcher.querySelector('button')
      const menu = switcher.querySelector('.header-language-switcher__menu')
      trigger?.addEventListener('click', (event) => {
        event.stopPropagation()
        const open = menu?.dataset.open === 'true'
        if (menu) menu.dataset.open = String(!open)
        trigger.setAttribute('aria-expanded', String(!open))
      })
      switcher.querySelectorAll('.header-language-switcher__option').forEach((option) => {
        option.addEventListener('click', () => {
          const targetLang = option.textContent.trim().toLowerCase()
          location.href = altPath(targetLang)
        })
      })
    })
    document.querySelectorAll('select[data-language-switcher]').forEach((select) => {
      select.value = language
      select.addEventListener('change', () => {
        location.href = altPath(select.value)
      })
    })
  }

  const closeMobile = () => {
    const menu = document.querySelector('.static-mobile-menu')
    if (menu) menu.hidden = true
    document.querySelector('.mobile-megamenu-trigger-btn')?.setAttribute('aria-expanded', 'false')
  }

  const setupMobile = () => {
    const button = document.querySelector('.mobile-megamenu-trigger-btn')
    if (!button) return
    const menu = document.createElement('div')
    menu.className = 'static-mobile-menu'
    menu.hidden = true
    menu.innerHTML = `
      <div class="static-mobile-menu__bar"><strong>${t.menu}</strong><button class="static-mobile-menu__close" type="button" aria-label="${t.close}">×</button></div>
      <div class="static-mobile-menu__content">
        <div class="static-mobile-menu__section">${[['Home', 'home'], [t.services, 'services'], [t.portfolio, 'portfolioWeb'], [language === 'en' ? 'Prices' : 'Preise', 'prices'], [language === 'en' ? 'Profile' : 'Profil', 'profile'], [language === 'en' ? 'Contact' : 'Kontakt', 'contact']].map(([label, key]) => `<a href="${routes[key]}">${label}</a>`).join('')}</div>
        ${t.columns.map(([title, items]) => `<div class="static-mobile-menu__section"><div class="static-mobile-menu__section-title">${title}</div>${items.map(([label, , key]) => `<a href="${routes[key]}">${label}</a>`).join('')}</div>`).join('')}
      </div>`
    document.body.append(menu)
    button.addEventListener('click', () => {
      const open = menu.hidden
      menu.hidden = !open
      button.setAttribute('aria-expanded', String(open))
    })
    menu.querySelector('.static-mobile-menu__close')?.addEventListener('click', closeMobile)
  }

  const closeSearch = () => {
    const search = document.querySelector('.static-search')
    if (search) search.hidden = true
  }

  const setupHeaderButtons = () => {
    document.querySelectorAll('[aria-label="Kontakt öffnen"]').forEach((button) => {
      button.addEventListener('click', () => {
        location.href = routes.contact
      })
    })
    document.querySelectorAll('[aria-label="Suchen"]').forEach((button) => {
      button.addEventListener('click', () => {
        let search = document.querySelector('.static-search')
        if (!search) {
          search = document.createElement('div')
          search.className = 'static-search'
          search.hidden = true
          search.innerHTML = `<div class="static-search__inner"><div class="static-search__top"><input type="search" aria-label="${t.search}" placeholder="${t.searchPlaceholder}"><button class="static-search__close" type="button" aria-label="${t.close}">×</button></div><div class="static-search__results"></div></div>`
          document.body.append(search)
          const input = search.querySelector('input')
          const results = search.querySelector('.static-search__results')
          const render = () => {
            const query = input.value.trim().toLowerCase()
            const matches = allPages.filter(([label]) => !query || label.toLowerCase().includes(query)).slice(0, 8)
            results.innerHTML = matches.length ? matches.map(([label, key]) => `<a href="${routes[key]}">${label}</a>`).join('') : `<p>${t.noResults}</p>`
          }
          input.addEventListener('input', render)
          search.querySelector('.static-search__close')?.addEventListener('click', closeSearch)
          render()
        }
        search.hidden = false
        search.querySelector('input')?.focus()
      })
    })
  }

  const fixLinks = () => {
    const rewrites =
      language === 'en'
        ? new Map([
            ['/portfolio', '/en/portfolio/'],
            ['/portfolio/', '/en/portfolio/'],
            ['/portfolio-webdesign', routes.portfolioWeb],
            ['/portfolio-webdesign/', routes.portfolioWeb],
            ['/portfolio-marketing', routes.portfolioMarketing],
            ['/portfolio-marketing/', routes.portfolioMarketing],
            ['/portfolio-marken', routes.portfolioBrand],
            ['/portfolio-marken/', routes.portfolioBrand],
            ['portfolio-marken', routes.portfolioBrand],
          ])
        : new Map([
            ['/portfolio', '/portfolio/'],
            ['/portfolio/', '/portfolio/'],
            ['portfolio-marken', routes.portfolioBrand],
          ])

    document.querySelectorAll('a[href]').forEach((link) => {
      const target = rewrites.get(link.getAttribute('href'))
      if (target) link.setAttribute('href', target)
    })
    document.querySelectorAll('a[href="/"]').forEach((link) => {
      if (language === 'en' && link.closest('header,footer')) link.setAttribute('href', routes.home)
    })
  }

  document.documentElement.classList.add('static-runtime-ready')
  setupMegaMenu()
  setupTheme()
  setupLanguage()
  setupMobile()
  setupHeaderButtons()
  fixLinks()
})()
