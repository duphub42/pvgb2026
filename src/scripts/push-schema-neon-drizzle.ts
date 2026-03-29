/**
 * GEFÄHRLICH: Drizzle-Schema-Push gegen Neon (kann bei Abweichung zum Code Spalten/Tabellen droppen
 * oder Daten gefährden). Nur nutzen, wenn du weißt, was du tust (z. B. leere Dev-Datenbank).
 *
 * Voraussetzung:
 *   NEON_DESTRUCTIVE_DRIZZLE_PUSH_CONFIRM=yes
 *   optional: PAYLOAD_ALLOW_DRIZZLE_PUSH=true (wird hier gesetzt)
 *
 * Für bestehende Daten: pnpm run migrate:neon oder pnpm run push:neon (nur Migrationen).
 */
import './load-env'

import { execFileSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')

if (process.env.NEON_DESTRUCTIVE_DRIZZLE_PUSH_CONFIRM !== 'yes') {
  console.error(
    'Abgebrochen: Drizzle-Push kann bestehende Daten/Schema gefährden.\n' +
      'Nur Migrationen (sicher, additiv): pnpm run push:neon  oder  pnpm run migrate:neon\n' +
      'Wenn du den Drizzle-Push wirklich willst: NEON_DESTRUCTIVE_DRIZZLE_PUSH_CONFIRM=yes pnpm run push:neon:drizzle',
  )
  process.exit(1)
}

if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  console.error('DATABASE_URL oder POSTGRES_URL fehlt (z. B. in .env).')
  process.exit(1)
}

process.env.USE_NEON = 'true'
process.env.PAYLOAD_ALLOW_DRIZZLE_PUSH = 'true'
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'
process.env.NODE_ENV = 'development'

console.warn(
  '[WARN] Destruktiver Drizzle-Push gegen Neon – nur bei leerer oder replatzierbarer Datenbank sinnvoll.',
)

async function main() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  await getPayload({ config })
  console.log('Payload initialisiert – Drizzle-Push wurde ausgeführt.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
