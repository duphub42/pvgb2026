import { chromium, devices } from '@playwright/test'

const tries = 6
const browser = await chromium.launch({ headless: true })
const rows = []

for (let i = 1; i <= tries; i++) {
  const context = await browser.newContext({ ...devices['iPhone 14'] })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })

  let found = true
  try {
    await page.locator('.hero-stack-float-front').first().waitFor({ timeout: 7000 })
  } catch {
    found = false
  }

  const data = await page.evaluate(() => {
    const el = document.querySelector('.hero-stack-float-front')
    const rect = el ? el.getBoundingClientRect() : null
    return {
      viewport: window.innerWidth,
      width: rect ? Number(rect.width.toFixed(2)) : null,
      ratio: rect ? Number((rect.width / window.innerWidth).toFixed(4)) : null,
    }
  })

  rows.push({ try: i, found, ...data })
  await context.close()
}

await browser.close()
console.log(JSON.stringify(rows, null, 2))
