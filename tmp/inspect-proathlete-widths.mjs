import { chromium } from '@playwright/test'

const widths = [320, 360, 390, 430, 480, 600, 768, 820]
const url = 'http://127.0.0.1:3000/profil'

const browser = await chromium.launch({ headless: true })
const rows = []

for (const w of widths) {
  const context = await browser.newContext({ viewport: { width: w, height: 820 } })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(1700)

  const row = await page.evaluate(() => {
    const front = document.querySelector('.hero-stack-float-front')
    const frontRect = front ? front.getBoundingClientRect() : null
    return {
      viewportWidth: window.innerWidth,
      frontWidthPx: frontRect ? Number(frontRect.width.toFixed(2)) : null,
      ratio: frontRect ? Number((frontRect.width / window.innerWidth).toFixed(4)) : null,
    }
  })

  rows.push(row)
  await context.close()
}

await browser.close()
console.log(JSON.stringify(rows, null, 2))
