/**
 * Simuliert die Admin-Abfrage für die Seiten-Liste.
 * Zeigt den genauen Fehler, wenn die Page-Seite nicht lädt (z. B. fehlende Spalte).
 *
 * Aufruf: pnpm run check-pages  (mit .env / DATABASE_URL für Neon)
 */

import './load-env-import'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.log('DATABASE_URL oder POSTGRES_URL in .env setzen (Neon-URL).')
    process.exit(1)
  }
  const payload = await getPayload({ config })
  const run = async (label: string, fn: () => Promise<unknown>) => {
    process.stdout.write(`${label} … `)
    try {
      await fn()
      console.log('OK')
    } catch (err: unknown) {
      console.log('FEHLER')
      console.error(err)
      const cause = err instanceof Error ? err.cause : undefined
      if (cause) console.error('Ursache:', cause)
      throw err
    }
  }

  try {
    await run('find (depth: 0)', () =>
      payload.find({ collection: 'site-pages', limit: 10, depth: 0, overrideAccess: true }),
    )
    await run('find (depth: 2)', () =>
      payload.find({ collection: 'site-pages', limit: 5, depth: 2, overrideAccess: true }),
    )
    await run('create (Draft)', () =>
      payload.create({
        collection: 'site-pages',
        data: {
          title: 'Test-Seite Check',
          slug: 'test-seite-check-' + Date.now(),
          _status: 'draft',
        },
        depth: 0,
        overrideAccess: true,
      }),
    )
    console.log('Alle Prüfungen bestanden.')
  } catch (err: unknown) {
    console.error(err)
    process.exit(1)
  }
}

main()
