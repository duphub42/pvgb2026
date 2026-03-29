/**
 * Neon: **nur Payload-Migrationen** aus `src/migrations` (additiv: neue Tabellen/Spalten).
 * Überschreibt keine bestehenden Zeilen; kein Drizzle-Push.
 *
 * Aufruf: pnpm run push:neon
 *
 * Destruktiver Drizzle-Push (nur mit Bestätigung): pnpm run push:neon:drizzle
 */
import './load-env'

import { execFileSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')

function main() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error('DATABASE_URL oder POSTGRES_URL fehlt (z. B. in .env).')
    process.exit(1)
  }

  console.log('Neon: Payload-Migrationen ausführen (additiv, keine Datenüberschreibung durch Drizzle-Push).')

  execFileSync('pnpm', ['exec', 'payload', 'migrate'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      USE_NEON: 'true',
      NODE_OPTIONS: [process.env.NODE_OPTIONS, '--no-deprecation'].filter(Boolean).join(' '),
    },
  })

  console.log('Fertig.')
}

main()
