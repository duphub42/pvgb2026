/**
 * Läuft einmal beim Start des Next.js-Servers (vor dem ersten Request).
 * Entfernt bei SQLite den Index footer_footer_logo_idx, falls vorhanden,
 * damit Payload-Push ihn neu anlegen kann (vermeidet „index already exists“).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) return

  const { execSync } = await import('node:child_process')
  const fs = await import('node:fs')
  const path = await import('node:path')

  const projectRoot = process.cwd()
  const url = process.env.SQLITE_URL || 'file:./payload.db'
  const dbPath = url.startsWith('file:')
    ? path.resolve(projectRoot, url.slice(5).replace(/^\/(\w:)/, '$1'))
    : path.join(projectRoot, 'payload.db')

  if (!fs.existsSync(dbPath)) return

  try {
    execSync(`sqlite3 "${dbPath}" "DROP INDEX IF EXISTS footer_footer_logo_idx;"`, {
      stdio: 'ignore',
    })
  } catch {
    // sqlite3-CLI fehlt oder Fehler – ignorieren, Payload-Start nicht blockieren
  }
}
