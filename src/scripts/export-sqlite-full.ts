/**
 * Vollständiger Export aus lokaler SQLite (payload.db)
 * Nutzt direkte SQLite-Queries
 */
import './load-env'
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

const dbPath = path.join(root, 'payload.db')
if (!fs.existsSync(dbPath)) {
  console.error('❌ payload.db nicht gefunden')
  process.exit(1)
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const exportDir = path.join(root, 'data', `sqlite-export-${timestamp}`)
fs.mkdirSync(exportDir, { recursive: true })

const db = new Database(dbPath)

// Alle Tabellen holen
const tables = db
  .prepare(
    `
  SELECT name FROM sqlite_master 
  WHERE type='table' AND name NOT LIKE 'sqlite_%'
  ORDER BY name
`,
  )
  .all() as { name: string }[]

console.log(`🔌 Lade SQLite: ${dbPath}`)
console.log(`💾 Export wird gespeichert in: data/sqlite-export-${timestamp}/\n`)

const exportData: Record<string, Array<Record<string, unknown>>> = {}

for (const { name: table } of tables) {
  try {
    const rows = db.prepare(`SELECT * FROM "${table}"`).all() as Array<Record<string, unknown>>
    exportData[table] = rows

    fs.writeFileSync(path.join(exportDir, `${table}.json`), JSON.stringify(rows, null, 2))

    console.log(`✅ ${table}: ${rows.length} Zeilen`)
  } catch (e) {
    console.error(`❌ ${table}: ${(e as Error).message}`)
  }
}

// Gesamt-Export
fs.writeFileSync(path.join(exportDir, '_all-data.json'), JSON.stringify(exportData, null, 2))

// Meta
const meta = {
  exportedAt: new Date().toISOString(),
  database: 'sqlite',
  source: dbPath,
  tables: Object.keys(exportData).map((k) => ({ table: k, count: exportData[k].length })),
  totalRows: Object.values(exportData).reduce((sum, arr) => sum + arr.length, 0),
}
fs.writeFileSync(path.join(exportDir, '_meta.json'), JSON.stringify(meta, null, 2))

db.close()

console.log(`\n📊 Export-Übersicht:`)
console.log(`   Tabellen: ${Object.keys(exportData).length}`)
console.log(`   Gesamtzeilen: ${meta.totalRows}`)
console.log(`\n💾 Gespeichert in: data/sqlite-export-${timestamp}/`)
