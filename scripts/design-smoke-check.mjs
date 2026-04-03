import { chromium, devices } from '@playwright/test'
import fs from 'fs'

const base = 'http://127.0.0.1:3000'
const pages = ['/', '/leistungen', '/profil', '/kontakt']
const outDir = 'tmp-design-check'
fs.mkdirSync(outDir, { recursive: true })

async function runDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(1200)
    await page.mouse.move(100, 10)
    await page.locator('.site-header .logo-link').first().hover({ force: true }).catch(() => {})
    await page.waitForTimeout(250)
    const name = p === '/' ? 'home' : p.slice(1)
    await page.screenshot({ path: `${outDir}/desktop-${name}.png`, fullPage: true })
  }

  await context.close()
  return errors
}

async function runMobile(browser) {
  const context = await browser.newContext({ ...devices['iPhone 14'] })
  const page = await context.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(1200)
    await page.waitForTimeout(200)
    const name = p === '/' ? 'home' : p.slice(1)
    await page.screenshot({ path: `${outDir}/mobile-${name}.png`, fullPage: true })
  }

  await context.close()
  return errors
}

const browser = await chromium.launch({ headless: true })
const desktopErrors = await runDesktop(browser)
const mobileErrors = await runMobile(browser)
await browser.close()

const allErrors = [...desktopErrors, ...mobileErrors]
fs.writeFileSync(`${outDir}/errors.log`, allErrors.join('\n'))
console.log(`Screenshots: ${pages.length * 2}`)
console.log(`Errors: ${allErrors.length}`)
