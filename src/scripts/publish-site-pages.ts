/**
 * Setzt alle Seiten (site-pages) in der aktuellen DB auf _status: 'published'.
 * Nützlich, wenn importierte Seiten als Entwürfe angelegt wurden und im Admin leer erscheinen.
 *
 * Aufruf: pnpm run publish-pages  (mit .env / DATABASE_URL für Neon)
 */

import './load-env-import'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.log('Hinweis: Keine DATABASE_URL – nutzt SQLite. Für Neon .env mit DATABASE_URL setzen.')
  }
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'site-pages',
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })
  if (docs.length === 0) {
    console.log('Keine Seiten gefunden.')
    return
  }
  for (const doc of docs) {
    if (doc._status === 'published') continue
    await payload.update({
      collection: 'site-pages',
      id: doc.id,
      data: { _status: 'published' },
      depth: 0,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
    console.log(`  Seite "${doc.title ?? doc.id}" auf veröffentlicht gesetzt.`)
  }
  console.log(`Fertig: ${docs.length} Seite(n) veröffentlicht.`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
