/**
 * Setzt das Passwort eines Users per E-Mail zurück (Payload hasht es).
 * Nutzen bei "email or password incorrect" wenn das Import-Passwort nicht funktioniert.
 * Verwendet immer die lokale SQLite-DB (DATABASE_URL/POSTGRES_URL werden ignoriert).
 *
 * Aufruf: npm run reset-password -- mail@philippbacher.com
 *         npm run reset-password -- demo-author@example.com NeuesPasswort123!
 * Ohne zweites Argument wird "ChangeMeAfterImport1!" gesetzt.
 */

import './load-env-import'

import path from 'path'
import { fileURLToPath } from 'url'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')

const defaultPassword = 'ChangeMeAfterImport1!'

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('E-Mail fehlt. Aufruf: npm run reset-password -- <email> [neues-passwort]')
    console.error('  User in DB: demo-author@example.com, mail@philippbacher.com')
    process.exit(1)
  }

  const newPassword = process.argv[3] || defaultPassword

  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (docs.length === 0) {
    console.error('Kein User mit E-Mail:', email)
    process.exit(1)
  }

  const user = docs[0]
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { password: newPassword },
  })

  console.log('Passwort für', email, 'wurde zurückgesetzt.')
  if (newPassword === defaultPassword) {
    console.log('Login mit Passwort: ChangeMeAfterImport1!')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
