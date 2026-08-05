import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 30000 })
await page.waitForTimeout(1000)
await page.evaluate(() => window.scrollTo(0, 900))
await page.waitForTimeout(800)
await page.screenshot({ path: '/private/tmp/claude-501/-Users-horus-Desktop-pvgb2026-pvgb2026/377d7e78-4954-451a-b30f-32030a413819/scratchpad/gap-check.png' })
await browser.close()
