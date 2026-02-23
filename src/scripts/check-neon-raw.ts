/**
 * Prüft direkt per SQL, ob in der Neon-DB Daten in den Payload-Tabellen liegen.
 * Kein Payload – nur pg + dotenv. Ergebnis in data/check-neon-content.txt
 *
 * Aufruf: npx tsx src/scripts/check-neon-raw.ts
 */

import './load-env'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Pool } from 'pg'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirnameScript, '../../data/check-neon-content.txt')

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!connectionString) {
  console.error('DATABASE_URL oder POSTGRES_URL in .env setzen.')
  process.exit(1)
}

const lines: string[] = []
function log(msg: string) {
  lines.push(msg)
  console.log(msg)
}

async function main() {
  const pool = new Pool({ connectionString })
  try {
    log('Neon (Postgres) – direkte Tabellen-Abfrage\n')

    const tables = [
      'site_pages',
      'media',
      'users',
      'mega_menu',
      'blog_posts',
      'header',
      'footer',
      'design',
      'theme_settings',
    ]
    log('--- Zeilen pro Tabelle ---')
    for (const table of tables) {
      try {
        const r = await pool.query(
          `SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1`,
          [table],
        )
        const exists = Number(r.rows[0]?.n ?? 0) > 0
        if (!exists) {
          log(`  ${table}: Tabelle nicht vorhanden`)
          continue
        }
        const countResult = await pool.query(`SELECT COUNT(*) AS n FROM "${table}"`)
        const n = Number(countResult.rows[0]?.n ?? 0)
        log(`  ${table}: ${n}`)
      } catch (err) {
        log(`  ${table}: Fehler – ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    const pageCount = await pool.query('SELECT COUNT(*) AS n FROM site_pages')
    const mediaCount = await pool.query('SELECT COUNT(*) AS n FROM media')
    const megaCount = await pool.query('SELECT COUNT(*) AS n FROM mega_menu')
    const total =
      Number(pageCount.rows[0]?.n ?? 0) +
      Number(mediaCount.rows[0]?.n ?? 0) +
      Number(megaCount.rows[0]?.n ?? 0)

    if (total === 0) {
      log('\n⚠️  Keine Inhalte in Neon (site_pages, media, mega_menu = 0).')
      log('    Import evtl. in andere DB gelaufen oder fehlgeschlagen.')
    } else {
      log('\n✓ Neon enthält Daten.')
    }
  } finally {
    await pool.end()
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
  log(`\nAusgabe: ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
