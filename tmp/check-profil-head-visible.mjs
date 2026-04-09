import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()

let ok = false
for (let i = 0; i < 10; i++) {
  try {
    await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(2200)
    const found = await page.evaluate(() => Boolean(document.querySelector('.hero-stack-float-front')))
    if (found) {
      ok = true
      break
    }
  } catch {}
  await page.waitForTimeout(900)
}

const metrics = await page.evaluate(() => {
  const front = document.querySelector('.hero-stack-float-front')
  const r = front ? front.getBoundingClientRect() : null
  return {
    hasFront: Boolean(r),
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    frontTop: r ? Number(r.top.toFixed(2)) : null,
    protrudesTop: r ? r.top < 0 : null,
  }
})

await page.screenshot({ path: 'tmp-design-check/mobile-profil-head-visible-check.png', fullPage: false })
console.log(JSON.stringify({ ok, metrics }, null, 2))
await context.close()
await browser.close()
