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

})()
