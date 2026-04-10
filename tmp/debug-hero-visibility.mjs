import { chromium, devices } from '@playwright/test'

const pages = ['/profil', '/leistungen']
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()

const out = []
for (const p of pages) {
  const entry = { page: p, errors: [], failed: [], hasFront: null, heroType: null }

  const onConsole = (msg) => {
    if (msg.type() === 'error') {
      entry.errors.push({ type: 'console', text: msg.text(), location: msg.location() })
    }
  }
  const onPageError = (err) => entry.errors.push({ type: 'pageerror', text: err.message, stack: err.stack })
  const onFailed = (req) => entry.failed.push({ url: req.url(), method: req.method(), failure: req.failure()?.errorText || '' })

  page.on('console', onConsole)
  page.on('pageerror', onPageError)
  page.on('requestfailed', onFailed)

  try {
    await page.goto('http://127.0.0.1:3000' + p, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(2200)
    const data = await page.evaluate(() => {
      const front = document.querySelector('.hero-stack-float-front')
      const hero = document.querySelector('section[data-hero-type]')
      return {
        hasFront: Boolean(front),
        heroType: hero ? hero.getAttribute('data-hero-type') : null,
      }
    })
    entry.hasFront = data.hasFront
    entry.heroType = data.heroType
  } catch (e) {
    entry.errors.push({ type: 'goto', text: String(e) })
  }

  page.off('console', onConsole)
  page.off('pageerror', onPageError)
  page.off('requestfailed', onFailed)
  out.push(entry)
}

await page.screenshot({ path: 'tmp-design-check/mobile-debug-current.png', fullPage: false })
await context.close()
await browser.close()
console.log(JSON.stringify(out, null, 2))
