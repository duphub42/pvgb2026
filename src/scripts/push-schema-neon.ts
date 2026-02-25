/**
 * Drizzle-Schema einmalig gegen Neon pushen (erzeugt fehlende Tabellen z. B. für site_pages-Blöcke).
 * Vor dem ersten Import nach Neon ausführen: pnpm run push:neon
 *
 * Setzt USE_NEON=true und PAYLOAD_FORCE_DRIZZLE_PUSH=true, lädt .env (DATABASE_URL),
 * initialisiert Payload – der Vercel-Postgres-Adapter führt dann den Schema-Push aus.
 */
import './load-env'

process.env.USE_NEON = 'true'
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'
process.env.NODE_ENV = 'development'

import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error('DATABASE_URL oder POSTGRES_URL fehlt (z. B. in .env).')
    process.exit(1)
  }
  console.log('Schema-Push gegen Neon (Postgres)...')
  const payload = await getPayload({ config })
  console.log('Payload initialisiert – Schema-Push wurde vom Adapter ausgeführt.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
