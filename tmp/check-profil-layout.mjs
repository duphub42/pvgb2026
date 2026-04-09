import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()
await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
await page.waitForTimeout(2200)

const metrics = await page.evaluate(() => {
  const front = document.querySelector('.hero-stack-float-front')
  const frontRect = front ? front.getBoundingClientRect() : null
  const heading = document.querySelector('h1')
  const headingRect = heading ? heading.getBoundingClientRect() : null

  return {
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    frontTop: frontRect ? Number(frontRect.top.toFixed(2)) : null,
    frontBottom: frontRect ? Number(frontRect.bottom.toFixed(2)) : null,
    headingTop: headingRect ? Number(headingRect.top.toFixed(2)) : null,
    headingBottom: headingRect ? Number(headingRect.bottom.toFixed(2)) : null,
    gapFrontToHeading: frontRect && headingRect ? Number((headingRect.top - frontRect.bottom).toFixed(2)) : null,
  }
})

console.log(JSON.stringify(metrics, null, 2))
await page.screenshot({ path: 'tmp-design-check/mobile-profil-lowered-stack-check.png', fullPage: false })
await context.close()
await browser.close()
