/**
 * Export aller Inhalte aus der Payload-Datenbank nach data/export/.
 *
 * – Ohne DATABASE_URL/POSTGRES_URL: Export aus lokaler SQLite (für „Lokal → Neon“).
 * – Mit DATABASE_URL: Export aus der angegebenen DB (z. B. Neon).
 *
 * Aufruf (lokal, SQLite → für späteren Import nach Neon):
 *   DATABASE_URL= POSTGRES_URL= npx tsx src/scripts/export-data.ts
 * Aufruf (aus Neon/Production exportieren):
 *   DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npx tsx src/scripts/export-data.ts
 */

// NODE_ENV=production deaktiviert den Schema-Push (payload.config: push nur wenn !== 'production').
// So verbindet sich das Skript nur lesend mit der DB, ohne Migrations-Abfragen.
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
// Drizzle-Schema-Abfrage beim ersten DB-Connect unterdrücken (non-interactive)
if (typeof process.env.CI === 'undefined') process.env.CI = '1'

import './load-env'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '@payload-config'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')
const exportDir = path.resolve(projectRoot, 'data/export')
/** Payload Media: staticDir aus Media-Collection (public/media). */
const mediaStaticDir = path.join(projectRoot, 'public', 'media')
const mediaExportDir = path.join(exportDir, 'media')
const envPaths = ['.env', '.env.local', 'env.local']

const COLLECTIONS = [
  'media',
  'categories',
  'users',
  'site-pages',
  'blog-posts',
  'mega-menu',
  'redirects',
  'forms',
] as const

const GLOBALS = ['header', 'footer', 'design', 'theme-settings'] as const

const HEADER_SELECT_KEYS = [
  'megaMenuCardBorderRadius',
  'megaMenuCardShadow',
  'megaMenuCardHoverShadow',
  'megaMenuCardHoverBorder',
] as const

function unwrapQuotedString(val: unknown): unknown {
  if (typeof val !== 'string') return val
  const t = val.trim()
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"'))
    return t.slice(1, -1).replace(/^"|"$/g, '')
  return val
}

/** Header-Global: Select-Werte für Roundtrip (Export → Import) normalisieren. */
function normalizeHeaderForExport(data: Record<string, unknown>): Record<string, unknown> {
  const out = { ...data }
  for (const k of HEADER_SELECT_KEYS) {
    if (k in out) out[k] = unwrapQuotedString(out[k])
  }
  return out
}

function toColWidth(val: unknown): number | null {
  if (val == null || val === '') return null
  const n = typeof val === 'string' ? parseInt(val, 10) : Number(val)
  if (!Number.isFinite(n) || n < 1 || n > 12) return null
  return n
}

/** Mega-Menü: Highlight-Position, Spaltenbreiten und columnWidth für Roundtrip normalisieren. */
function normalizeMegaMenuDocForExport(doc: Record<string, unknown>): Record<string, unknown> {
  let out = { ...doc }
  const highlight = doc.highlight
  if (highlight && typeof highlight === 'object' && highlight !== null && 'position' in highlight) {
    const h = highlight as Record<string, unknown>
    out = { ...out, highlight: { ...h, position: unwrapQuotedString(h.position) } }
  }
  const cw = doc.columnWidths
  if (cw && typeof cw === 'object' && cw !== null) {
    const o = cw as Record<string, unknown>
    out = {
      ...out,
      columnWidths: {
        col1: toColWidth(o.col1),
        col2: toColWidth(o.col2),
        col3: toColWidth(o.col3),
      },
    }
  }
  const columns = doc.columns
  if (Array.isArray(columns)) {
    out = {
      ...out,
      columns: columns.map((col) => {
        if (!col || typeof col !== 'object') return col
        const row = { ...(col as Record<string, unknown>) }
        if ('columnWidth' in row) row.columnWidth = toColWidth(row.columnWidth)
        if ('columnBackground' in row) row.columnBackground = unwrapQuotedString(row.columnBackground)
        return row
      }),
    }
  }
  return out
}

async function main() {
  const secret = process.env.PAYLOAD_SECRET?.trim()
  if (!secret || secret.length < 12) {
    console.error('PAYLOAD_SECRET fehlt oder ist zu kurz (min. 12 Zeichen).')
    console.error(
      'Geprüfte Dateien (Projektroot):',
      envPaths.map((p) => path.relative(projectRoot, p)).join(', '),
    )
    console.error(
      'Bitte in .env.local eintragen: PAYLOAD_SECRET=dein-geheimes-secret',
    )
    console.error(
      'Oder inline: PAYLOAD_SECRET="..." npx tsx src/scripts/export-data.ts',
    )
    process.exit(1)
  }

  console.log('Lade Payload (verbinde mit DB)...')
  const payload = await getPayload({ config })

  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  const manifest: { collections: Record<string, number>; globals: string[] } = {
    collections: {},
    globals: [],
  }

  for (const slug of COLLECTIONS) {
    if (!payload.collections[slug]) {
      console.warn(`Collection "${slug}" nicht gefunden, überspringe.`)
      continue
    }
    let docs: unknown[] = []
    try {
      const result = await payload.find({
        collection: slug,
        limit: 2000,
        depth: 0,
      })
      docs = result.docs
    } catch (err: unknown) {
      const code = (err as { cause?: { code?: string }; message?: string })?.cause?.code
      const msg = (err as { message?: string })?.message ?? ''
      if (code === '42P01' || /relation .* does not exist/i.test(msg)) {
        console.warn(
          `  ${slug}: Schema-Unterschied (Tabelle fehlt in DB), exportiere 0 Einträge. Nach Migration erneut exportieren.`,
        )
      } else {
        throw err
      }
    }
    if (slug === 'mega-menu' && Array.isArray(docs)) {
      docs = docs.map((d) => normalizeMegaMenuDocForExport(d as Record<string, unknown>))
    }
    const outPath = path.join(exportDir, `${slug}.json`)
    fs.writeFileSync(outPath, JSON.stringify(docs, null, 2), 'utf-8')
    manifest.collections[slug] = docs.length
    if (docs.length > 0) {
      console.log(`  ${slug}: ${docs.length} Einträge → ${outPath}`)
    }
    if (slug === 'media' && Array.isArray(docs) && docs.length > 0) {
      if (!fs.existsSync(mediaExportDir)) fs.mkdirSync(mediaExportDir, { recursive: true })
      let copied = 0
      for (const d of docs as Record<string, unknown>[]) {
        const id = d.id
        const filename = typeof d.filename === 'string' ? d.filename : null
        if (filename == null || id == null) continue
        const src = path.join(mediaStaticDir, filename)
        const dest = path.join(mediaExportDir, `${id}-${filename}`)
        try {
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest)
            copied += 1
          }
        } catch {
          // ignore single file errors
        }
      }
      if (copied > 0) console.log(`  media: ${copied} Dateien → ${mediaExportDir}`)
    }
  }

  const globalsData: Record<string, unknown> = {}
  for (const slug of GLOBALS) {
    if (!payload.globals?.config?.find((g) => g.slug === slug)) continue
    let data = await payload.findGlobal({
      slug,
      depth: 0,
    })
    if (slug === 'header' && data && typeof data === 'object')
      data = normalizeHeaderForExport(data as Record<string, unknown>)
    globalsData[slug] = data
    manifest.globals.push(slug)
    console.log(`  Global "${slug}" exportiert`)
  }
  fs.writeFileSync(
    path.join(exportDir, 'globals.json'),
    JSON.stringify(globalsData, null, 2),
    'utf-8',
  )

  fs.writeFileSync(
    path.join(exportDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8',
  )

  console.log('\nExport fertig:', exportDir)
  console.log(
    'Neon mit diesen Daten überschreiben: DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npx tsx src/scripts/import-data.ts --replace',
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
