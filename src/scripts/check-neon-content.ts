/**
 * Prüft per Payload API ob in der Neon-DB Inhalte vorhanden sind.
 * Nutzt dieselbe DB wie die App (DATABASE_URL aus .env).
 * USE_NEON=true setzen, damit payload.config Neon nutzt (z. B. beim lokalen Aufruf).
 *
 * Aufruf: USE_NEON=true npx tsx src/scripts/check-neon-content.ts
 * Ergebnis auch in data/check-neon-content.txt
 */

import './load-env-import'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirnameScript, '../../data/check-neon-content.txt')

const lines: string[] = []
function log(msg: string) {
  lines.push(msg)
  console.log(msg)
}

function writeOut() {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
  log(`\nAusgabe gespeichert: ${outPath}`)
}

async function main() {
  try {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!url) {
      log('FEHLER: DATABASE_URL oder POSTGRES_URL in .env setzen.')
      return
    }
    log('Verbinde mit Neon (Postgres)...')
    log(`NODE_ENV=${process.env.NODE_ENV} USE_NEON=${process.env.USE_NEON}\n`)

    const payload = await getPayload({ config })

    const counts: Record<string, number> = {}
    const collections = ['site-pages', 'media', 'users', 'mega-menu', 'blog-posts', 'categories'] as const
    for (const slug of collections) {
      try {
        const result = await payload.find({
          collection: slug,
          limit: 0,
          depth: 0,
          overrideAccess: true,
        })
        counts[slug] = result.totalDocs
      } catch (err) {
        counts[slug] = -1
        log(`${slug}: Fehler - ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    log('--- Collections (Anzahl Einträge) ---')
    for (const [slug, n] of Object.entries(counts)) {
      const ok = n >= 0 ? `${n}` : 'FEHLER'
      log(`  ${slug}: ${ok}`)
    }

    const globals = ['header', 'footer', 'design', 'theme-settings'] as const
    log('\n--- Globals ---')
    for (const slug of globals) {
      try {
        const g = await payload.findGlobal({ slug, depth: 0, overrideAccess: true })
        const hasData = g && typeof g === 'object' && Object.keys(g).length > 0
        log(`  ${slug}: ${hasData ? 'vorhanden' : 'leer'}`)
      } catch (err) {
        log(`  ${slug}: FEHLER ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    const totalContent = (counts['site-pages'] ?? 0) + (counts['media'] ?? 0) + (counts['mega-menu'] ?? 0)
    if (totalContent === 0) {
      log('\n⚠️  Keine Inhalte in Neon (site-pages, media, mega-menu = 0). Import evtl. fehlgeschlagen oder andere DB.')
    } else {
      log('\n✓ Neon enthält Daten (Import wurde in diese DB geschrieben).')
    }
  } catch (err) {
    log('FEHLER: ' + (err instanceof Error ? err.message : String(err)))
    if (err instanceof Error && err.stack) log(err.stack)
  } finally {
    writeOut()
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
