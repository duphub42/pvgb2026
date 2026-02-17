/**
 * Legt die Global-Dokumente (Header, Footer, Design) an, falls sie fehlen.
 * Behebt "Nothing found" im Admin unter Globals.
 *
 * Aufruf: pnpm run seed:globals
 * (Payload-Migrationen bzw. fix:sqlite-schema sollten vorher gelaufen sein.)
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
dotenv.config({ path: path.join(root, '.env') })
dotenv.config({ path: path.join(root, '.env.local') })

async function main() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const payload = await getPayload({ config })

  const slugs = ['header', 'footer', 'design'] as const
  for (const slug of slugs) {
    try {
      const existing = await payload.findGlobal({ slug, depth: 0 }).catch(() => null)
      const hasDoc = existing && typeof existing === 'object' && 'id' in existing && existing.id != null
      if (!hasDoc) {
        await payload.updateGlobal({
          slug,
          data: {},
          overrideAccess: true,
        })
        console.log(`[seed:globals] Global "${slug}" angelegt.`)
      } else {
        console.log(`[seed:globals] Global "${slug}" existiert bereits.`)
      }
    } catch (e) {
      console.error(`[seed:globals] Fehler bei "${slug}":`, e)
      console.error('Hinweis: Zuerst Migrationen ausführen (Postgres: payload migrate; SQLite: pnpm run fix:sqlite-schema).')
      process.exitCode = 1
    }
  }
  process.exit(process.exitCode ?? 0)
}

main()
