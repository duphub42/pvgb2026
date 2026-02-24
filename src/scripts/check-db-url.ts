/**
 * Zeigt, welche DATABASE_URL die Skripte verwenden (Host/DB nur – kein Passwort).
 * So kannst du prüfen, ob lokal dieselbe DB wie auf Vercel genutzt wird.
 *
 * Aufruf: npx tsx src/scripts/check-db-url.ts
 */

import './load-env'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL

if (!url) {
  console.log('DATABASE_URL und POSTGRES_URL sind nicht gesetzt.')
  console.log('→ Import/Neon-Skripte würden SQLite nutzen (payload.db).')
  process.exit(0)
}

try {
  const parsed = new URL(url.replace(/^postgresql:\/\//, 'https://'))
  const host = parsed.hostname
  const db = parsed.pathname.replace(/^\//, '') || '(default)'
  const hasPassword = parsed.password !== '' || (url.includes('@') && url.split('@')[0].includes(':'))
  console.log('Aktuell aus .env / .env.local:')
  console.log('  Host:', host)
  console.log('  DB:  ', db)
  console.log('  Passwort gesetzt:', hasPassword ? 'ja' : 'nein')
  console.log('')
  console.log('Vergleiche in Vercel: Settings → Environment Variables → DATABASE_URL')
  console.log('→ Host und DB müssen exakt übereinstimmen, sonst schreibt der Import in eine andere DB als Vercel liest.')
} catch {
  console.log('DATABASE_URL konnte nicht geparst werden (Format prüfen).')
}
