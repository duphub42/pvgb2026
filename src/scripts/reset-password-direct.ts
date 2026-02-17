/**
 * Setzt Passwort für einen User direkt in der SQLite-DB (gleicher Hash wie Payload).
 * Kein Payload-Start nötig – nutzt nur Node crypto + sqlite3.
 * Wenn die App lokal mit SQLite läuft, ist das die zuverlässige Methode.
 *
 * Aufruf: npm run reset-password-direct -- mail@philippbacher.com
 *         npm run reset-password-direct -- demo-author@example.com NeuesPasswort123!
 */

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')
dotenv.config({ path: path.join(projectRoot, '.env') })
dotenv.config({ path: path.join(projectRoot, '.env.local') })

const defaultPassword = 'ChangeMeAfterImport1!'

function getDbPath(): string {
  const url = process.env.SQLITE_URL
  if (url?.startsWith('file:')) {
    const p = url.slice(5).replace(/^\/(\w:)/, '$1')
    return path.isAbsolute(p) ? p : path.join(projectRoot, p)
  }
  return path.join(projectRoot, 'payload.db')
}

async function generatePayloadHash(password: string): Promise<{ hash: string; salt: string }> {
  const saltBuffer = await new Promise<Buffer>((resolve, reject) =>
    crypto.randomBytes(32, (err, buf) => (err ? reject(err) : resolve(buf)))
  )
  const salt = saltBuffer.toString('hex')
  const hashRaw = await new Promise<Buffer>((resolve, reject) =>
    crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (err, buf) =>
      err ? reject(err) : resolve(buf)
    )
  )
  const hash = hashRaw.toString('hex')
  return { hash, salt }
}

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('E-Mail fehlt. Aufruf: npm run reset-password-direct -- <email> [neues-passwort]')
    console.error('  User in DB: demo-author@example.com, mail@philippbacher.com')
    process.exit(1)
  }

  const newPassword = process.argv[3] || defaultPassword
  if (newPassword.length < 8) {
    console.error('Passwort muss mindestens 8 Zeichen haben.')
    process.exit(1)
  }

  const dbPath = getDbPath()
  if (!fs.existsSync(dbPath)) {
    console.error('DB nicht gefunden:', dbPath)
    process.exit(1)
  }

  const { hash, salt } = await generatePayloadHash(newPassword)
  const { execSync } = await import('node:child_process')
  // SQLite escape: single quotes in values verdoppeln
  const emailEsc = email.replace(/'/g, "''")
  const hashEsc = hash.replace(/'/g, "''")
  const saltEsc = salt.replace(/'/g, "''")
  const sql = `UPDATE users SET hash = '${hashEsc}', salt = '${saltEsc}', login_attempts = 0, lock_until = NULL WHERE email = '${emailEsc}';`
  execSync(`sqlite3 "${dbPath}" "${sql}"`, { stdio: 'inherit' })

  console.log('Passwort für', email, 'wurde direkt in der DB gesetzt (Hash wie Payload).')
  if (newPassword === defaultPassword) {
    console.log('Login mit Passwort: ChangeMeAfterImport1!')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
