import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()

let loaded = false
for (let i = 0; i < 5; i++) {
  try {
    await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
    loaded = true
    break
  } catch {
    await page.waitForTimeout(1200)
  }
}

if (!loaded) {
  console.log(JSON.stringify({ ok: false, reason: 'profil_not_reachable' }, null, 2))
  await context.close()
  await browser.close()
  process.exit(1)
}

await page.waitForTimeout(2400)

const data = await page.evaluate(() => {
  const front = document.querySelector('.hero-stack-float-front')
  const rect = front ? front.getBoundingClientRect() : null
  return {
    ok: true,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    frontTop: rect ? Number(rect.top.toFixed(2)) : null,
    frontBottom: rect ? Number(rect.bottom.toFixed(2)) : null,
    protrudesTop: rect ? rect.top < 0 : null,
  }
})

console.log(JSON.stringify(data, null, 2))
await page.screenshot({ path: 'tmp-design-check/mobile-profil-front-lowered-no-protrude.png', fullPage: false })
await context.close()
await browser.close()
