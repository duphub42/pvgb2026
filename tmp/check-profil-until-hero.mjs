import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()

let success = false
let attempt = 0
let data = null

for (attempt = 1; attempt <= 10; attempt++) {
  try {
    await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(1800)

    const found = await page.evaluate(() => {
      const front = document.querySelector('.hero-stack-float-front')
      return Boolean(front)
    })

    if (found) {
      data = await page.evaluate(() => {
        const front = document.querySelector('.hero-stack-float-front')
        const rect = front ? front.getBoundingClientRect() : null
        const h1 = document.querySelector('h1')
        const h1Rect = h1 ? h1.getBoundingClientRect() : null
        return {
          viewportW: window.innerWidth,
          viewportH: window.innerHeight,
          frontTop: rect ? Number(rect.top.toFixed(2)) : null,
          frontBottom: rect ? Number(rect.bottom.toFixed(2)) : null,
          headingTop: h1Rect ? Number(h1Rect.top.toFixed(2)) : null,
          protrudesTop: rect ? rect.top < 0 : null,
        }
      })
      success = true
      break
    }
  } catch {}

  await page.waitForTimeout(900)
}

await page.screenshot({ path: 'tmp-design-check/mobile-profil-front-lowered-validated.png', fullPage: false })
console.log(JSON.stringify({ success, attempt, data }, null, 2))
await context.close()
await browser.close()
