/**
 * Drizzle/Payload-Schema einmalig gegen die lokale SQLite-DB pushen.
 * Aufruf: pnpm run push:sqlite
 *
 * Setzt PAYLOAD_FORCE_DRIZZLE_PUSH, initialisiert Payload – der SQLite-Adapter
 * führt den Schema-Push aus (fehlende Spalten/Tabellen, abhängig von Payload-Version).
 */
import './load-env'

process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'
if (!process.env.NODE_ENV) {
  ;(process.env as Record<string, string | undefined>).NODE_ENV = 'development'
}

import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  if (process.env.USE_NEON === 'true') {
    console.error('push:sqlite: USE_NEON=true gesetzt – für Neon bitte pnpm run push:neon verwenden.')
    process.exit(1)
  }
  if (process.env.NODE_ENV === 'production') {
    console.error('push:sqlite: In production nicht verwenden; Migrationen nutzen.')
    process.exit(1)
  }
  console.log('Schema-Push gegen SQLite (PAYLOAD_FORCE_DRIZZLE_PUSH=true)...')
  await getPayload({ config })
  console.log('Fertig.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
