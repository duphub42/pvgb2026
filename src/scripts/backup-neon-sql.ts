/**
 * SQL-Backup der Neon-Datenbank via pg_dump
 * Nutzt DATABASE_URL aus .env.local
 * 
 * Aufruf: npx tsx src/scripts/backup-neon-sql.ts
 * Output: data/backup-neon-YYYYMMDD-HHMMSS.sql
 */
import './load-env'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('❌ FEHLER: DATABASE_URL oder POSTGRES_URL nicht gesetzt')
  process.exit(1)
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const filename = `backup-neon-${timestamp}.sql`
const outputPath = path.join(root, 'data', filename)

// Verzeichnis erstellen
fs.mkdirSync(path.dirname(outputPath), { recursive: true })

console.log('🔌 Verbinde mit Neon...')
console.log(`💾 Backup wird gespeichert: data/${filename}`)

try {
  // pg_dump mit URI
  execSync(`pg_dump "${url}" > "${outputPath}"`, {
    stdio: 'inherit',
    timeout: 120000, // 2 Minuten Timeout
  })
  
  const stats = fs.statSync(outputPath)
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
  
  console.log(`\n✅ Backup erfolgreich!`)
  console.log(`📁 Datei: data/${filename}`)
  console.log(`📊 Größe: ${sizeMB} MB`)
} catch (e) {
  console.error('\n❌ Backup fehlgeschlagen:', e instanceof Error ? e.message : String(e))
  process.exit(1)
}
