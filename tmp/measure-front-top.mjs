import { chromium } from '@playwright/test'

const widths = [320, 360, 375, 390, 430]
const browser = await chromium.launch({ headless: true })
const rows = []

for (const w of widths) {
  const context = await browser.newContext({ viewport: { width: w, height: 780 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(2000)

  const data = await page.evaluate(() => {
    const front = document.querySelector('.hero-stack-float-front')
    const rect = front ? front.getBoundingClientRect() : null
    return {
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
      frontTop: rect ? Number(rect.top.toFixed(2)) : null,
      frontBottom: rect ? Number(rect.bottom.toFixed(2)) : null,
    }
  })
  rows.push(data)
  await context.close()
}

await browser.close()
console.log(JSON.stringify(rows, null, 2))
