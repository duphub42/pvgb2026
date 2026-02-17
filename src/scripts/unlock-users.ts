/**
 * Setzt die Login-Sperre aller User zurück (login_attempts = 0, lock_until = null).
 * Nutzen nach "This user is locked due to too many failed login attempts."
 *
 * Aufruf: npm run unlock-users
 * (Projektroot; nutzt payload.db bzw. SQLITE_URL)
 */

import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')
dotenv.config({ path: path.join(projectRoot, '.env') })
dotenv.config({ path: path.join(projectRoot, '.env.local') })

function getDbPath(): string {
  const url = process.env.SQLITE_URL
  if (url?.startsWith('file:')) {
    const p = url.slice(5).replace(/^\/(\w:)/, '$1')
    return path.isAbsolute(p) ? p : path.join(projectRoot, p)
  }
  return path.join(projectRoot, 'payload.db')
}

async function main() {
  const { execSync } = await import('node:child_process')
  const dbPath = getDbPath()
  const sql = 'UPDATE users SET login_attempts = 0, lock_until = NULL;'
  execSync(`sqlite3 "${dbPath}" "${sql}"`, { stdio: 'inherit' })
  console.log('Alle User entsperrt (login_attempts = 0, lock_until = null).')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
