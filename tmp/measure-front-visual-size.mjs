import { chromium, devices } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ ...devices['iPhone 14'] })
const page = await context.newPage()
await page.goto('http://127.0.0.1:3000/profil', { waitUntil: 'domcontentloaded', timeout: 45000 })
await page.waitForTimeout(2000)

const data = await page.evaluate(() => {
  const vw = window.innerWidth
  const frontLayer = document.querySelector('.hero-stack-float-front')
  const frontScale = document.querySelector('.hero-stack-front-mobile-scale')
  const frontImg = frontScale?.querySelector('img') || null

  const r1 = frontLayer ? frontLayer.getBoundingClientRect() : null
  const r2 = frontScale ? frontScale.getBoundingClientRect() : null
  const r3 = frontImg ? frontImg.getBoundingClientRect() : null

  return {
    viewport: vw,
    frontLayerWidth: r1 ? Number(r1.width.toFixed(2)) : null,
    frontLayerRatio: r1 ? Number((r1.width / vw).toFixed(4)) : null,
    frontScaledWidth: r2 ? Number(r2.width.toFixed(2)) : null,
    frontScaledRatio: r2 ? Number((r2.width / vw).toFixed(4)) : null,
    frontImageWidth: r3 ? Number(r3.width.toFixed(2)) : null,
    frontImageRatio: r3 ? Number((r3.width / vw).toFixed(4)) : null,
  }
})

console.log(JSON.stringify(data, null, 2))
await page.screenshot({ path: 'tmp-design-check/mobile-profil-front-enlarged-check.png', fullPage: false })
await context.close()
await browser.close()
