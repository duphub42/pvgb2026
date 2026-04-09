import { chromium, devices } from '@playwright/test'
import fs from 'fs'

const base = 'http://127.0.0.1:3000'
const pages = ['/', '/leistungen', '/profil', '/kontakt']
const outDir = 'tmp-design-check'
fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()

const results = []
for (const p of pages) {
  await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(1800)

  const metrics = await page.evaluate(() => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const front = document.querySelector('.hero-stack-float-front')
    const frontRect = front ? front.getBoundingClientRect() : null

    const proAthleteRoot =
      (front && front.closest('section')) ||
      document.querySelector('section[data-hero-type="proAthlete"]') ||
      document.querySelector('section[aria-label="Hero"]')
    const heroRect = proAthleteRoot ? proAthleteRoot.getBoundingClientRect() : null

    return {
      viewportWidth,
      viewportHeight,
      hasFront: Boolean(frontRect),
      frontWidthPx: frontRect ? Number(frontRect.width.toFixed(2)) : null,
      frontRatioViewport: frontRect
        ? Number((frontRect.width / viewportWidth).toFixed(4))
        : null,
      frontLeftPx: frontRect ? Number(frontRect.left.toFixed(2)) : null,
      frontRightPx: frontRect ? Number(frontRect.right.toFixed(2)) : null,
      heroTopPx: heroRect ? Number(heroRect.top.toFixed(2)) : null,
      heroHeightPx: heroRect ? Number(heroRect.height.toFixed(2)) : null,
    }
  })

  const name = p === '/' ? 'home' : p.slice(1)
  await page.screenshot({ path: outDir + '/mobile-' + name + '-viewport-check.png', fullPage: false })

  results.push({ page: p, ...metrics })
}

await context.close()
await browser.close()

fs.writeFileSync(outDir + '/pro-athlete-hero-metrics.json', JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
