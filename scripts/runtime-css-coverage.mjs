import fs from 'fs'
import postcss from 'postcss'
import { chromium } from '@playwright/test'

const BASE = 'http://127.0.0.1:3000'
const MAX_PAGES = 30
const WAIT_MS = 1400

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)) }

function normalizeUrl(url){
  try {
    const u = new URL(url, BASE)
    if (u.origin !== new URL(BASE).origin) return null
    u.hash = ''
    if (!u.pathname) u.pathname = '/'
    return u.toString().replace(/\/$/, '') || BASE
  } catch { return null }
}

function lineColToOffset(text, line, col){
  let l = 1
  let i = 0
  while (l < line && i < text.length){
    if (text.charCodeAt(i) === 10) l++
    i++
  }
  return i + Math.max(0, (col || 1) - 1)
}

function overlaps(aStart, aEnd, bStart, bEnd){
  return aStart < bEnd && bStart < aEnd
}

async function runInteractions(page){
  const softHover = async (selector) => {
    const el = page.locator(selector).first()
    if (await el.count()) {
      await el.hover({ force: true }).catch(() => {})
      await sleep(180)
    }
  }

  const softClick = async (selector) => {
    const el = page.locator(selector).first()
    if (await el.count()) {
      await el.click({ force: true }).catch(() => {})
      await sleep(280)
    }
  }

  // Header / logo interactions
  await softHover('.site-header')
  await softHover('.megamenu')
  await softHover('.site-header .logo-link')
  await softHover('.megamenu .logo-link')
  await softHover('.logo-link')

  // Trigger desktop megamenu states where present
  await softHover('.megamenu-top-item')
  await softHover('.megamenu-top-item[data-state="open"]')

  // Open/close mobile menu sheet
  await softClick('button[aria-label="Menü öffnen"]')
  await softHover('.megamenu-sheet a')
  await softClick('button[aria-label="Schließen"]')
  await page.keyboard.press('Escape').catch(() => {})

  // Open/close contact sheet
  await softClick('button[aria-label="Kontakt öffnen"]')
  await softHover('.megamenu-sheet a')
  await page.keyboard.press('Escape').catch(() => {})

  // Toggle theme both directions (if toggle exists)
  await softClick('.header-tool-toggle--theme')
  await softClick('.header-tool-toggle--theme')
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext()
const page = await context.newPage()
const cdp = await context.newCDPSession(page)

const styleSheets = new Map()
cdp.on('CSS.styleSheetAdded', evt => {
  const h = evt.header
  styleSheets.set(h.styleSheetId, h)
})

await cdp.send('DOM.enable')
await cdp.send('CSS.enable')
await cdp.send('CSS.startRuleUsageTracking')

const visited = new Set()
const queue = [BASE]

while (queue.length && visited.size < MAX_PAGES){
  const url = queue.shift()
  if (!url || visited.has(url)) continue

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(()=>{})
    await runInteractions(page).catch(() => {})
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await sleep(WAIT_MS)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await sleep(350)
    await page.evaluate(() => window.scrollTo(0, 0))

    visited.add(url)

    const links = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')).filter(Boolean))
    for (const href of links){
      const n = normalizeUrl(href)
      if (!n) continue
      if (n.includes('/admin')) continue
      if (!visited.has(n) && !queue.includes(n)) queue.push(n)
      if (visited.size + queue.length >= MAX_PAGES * 2) break
    }
  } catch {
    visited.add(url)
  }
}

const { ruleUsage } = await cdp.send('CSS.stopRuleUsageTracking')

const allSheetIds = [...styleSheets.keys()]

const sheetTextCache = new Map()
for (const id of allSheetIds){
  try {
    const { text } = await cdp.send('CSS.getStyleSheetText', { styleSheetId: id })
    sheetTextCache.set(id, text)
  } catch {
    // ignore detached sheets
  }
}

const globalsSheetIds = [...sheetTextCache.entries()]
  .filter(([id, text]) => {
    const header = styleSheets.get(id)
    const src = header?.sourceURL || ''
    if (src.includes('globals.css')) return true
    // Next.js dev often serves transformed CSS without sourceURL.
    // Heuristic: detect our known global markers.
    return (
      text.includes('.header-icon-btn') &&
      text.includes('.hero-css-halo .halo') &&
      text.includes('.megamenu')
    )
  })
  .map(([id]) => id)

const bySheet = new Map()
for (const ru of ruleUsage){
  if (!globalsSheetIds.includes(ru.styleSheetId)) continue
  if (!ru.used) continue
  if (!bySheet.has(ru.styleSheetId)) bySheet.set(ru.styleSheetId, [])
  bySheet.get(ru.styleSheetId).push([ru.startOffset, ru.endOffset])
}

const sheetReports = []
for (const sheetId of globalsSheetIds){
  const header = styleSheets.get(sheetId)
  const sourceURL = header?.sourceURL || ''
  const text = sheetTextCache.get(sheetId) || ''
  const usedRanges = bySheet.get(sheetId) || []

  const root = postcss.parse(text)
  const rules = []
  root.walkRules(rule => {
    if (!rule.selector) return
    if (/^(from|to|\d+%)$/.test(rule.selector.trim())) return
    const s = rule.source?.start
    const e = rule.source?.end
    if (!s || !e) return
    const start = lineColToOffset(text, s.line, s.column)
    const end = lineColToOffset(text, e.line, e.column) + 1
    let used = false
    for (const [uStart, uEnd] of usedRanges){
      if (overlaps(start, end, uStart, uEnd)) { used = true; break }
    }
    rules.push({ selector: rule.selector.trim(), line: s.line, used })
  })

  const unique = new Map()
  for (const r of rules){
    const key = `${r.line}::${r.selector}`
    if (!unique.has(key)) unique.set(key, r)
  }
  const all = [...unique.values()]
  const unused = all.filter(r => !r.used)

  sheetReports.push({
    sourceURL,
    totalRules: all.length,
    unusedRules: unused.length,
    usedRules: all.length - unused.length,
    unusedList: unused,
  })
}

await browser.close()

const merged = {
  base: BASE,
  visited: [...visited],
  visitedCount: visited.size,
  sheets: sheetReports,
}

fs.writeFileSync('tmp-css-runtime-coverage.json', JSON.stringify(merged, null, 2))

const lines = []
lines.push(`Visited pages: ${merged.visitedCount}`)
for (const s of merged.sheets){
  lines.push(`\nSheet: ${s.sourceURL || '[inline/unknown]'}`)
  lines.push(`Rules: ${s.totalRules}, used: ${s.usedRules}, unused: ${s.unusedRules}`)
  for (const r of s.unusedList.slice(0, 240)){
    lines.push(`  L${r.line}  ${r.selector}`)
  }
  if (s.unusedList.length > 240){
    lines.push(`  ... +${s.unusedList.length - 240} weitere`)
  }
}

fs.writeFileSync('tmp-css-runtime-coverage.txt', lines.join('\n'))
console.log(lines.slice(0, 80).join('\n'))
