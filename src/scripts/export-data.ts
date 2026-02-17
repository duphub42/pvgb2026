/**
 * Export aller Inhalte aus der aktuellen Payload-Datenbank (Production = DATABASE_URL setzen).
 * Schreibt nach data/export/ – danach mit import-data.ts lokal einspielen.
 *
 * Aufruf (Production-Daten exportieren):
 *   npx tsx src/scripts/export-data.ts
 * Dafür .env oder .env.local mit DATABASE_URL und PAYLOAD_SECRET füllen (z. B. aus Vercel kopieren).
 *
 * Oder inline: DATABASE_URL="postgresql://..." PAYLOAD_SECRET="..." npx tsx src/scripts/export-data.ts
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

const GLOBALS = ['header', 'footer'] as const

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      'Für Export aus Production DATABASE_URL (oder POSTGRES_URL) setzen, z.B.:',
    )
    console.error(
      '  DATABASE_URL="postgresql://user:pass@host/db" npx tsx src/scripts/export-data.ts',
    )
    process.exit(1)
  }

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
    const outPath = path.join(exportDir, `${slug}.json`)
    fs.writeFileSync(outPath, JSON.stringify(docs, null, 2), 'utf-8')
    manifest.collections[slug] = docs.length
    if (docs.length > 0) {
      console.log(`  ${slug}: ${docs.length} Einträge → ${outPath}`)
    }
  }

  const globalsData: Record<string, unknown> = {}
  for (const slug of GLOBALS) {
    if (!payload.globals?.config?.find((g) => g.slug === slug)) continue
    const data = await payload.findGlobal({
      slug,
      depth: 0,
    })
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
    'Lokal einspielen: DATABASE_URL und POSTGRES_URL entfernen (SQLite), dann:',
  )
  console.log('  npx tsx src/scripts/import-data.ts')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
