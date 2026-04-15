/**
 * Export SQLite Daten direkt ohne Payload
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'

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

console.log(`🔌 Lade SQLite: ${dbPath}`)
console.log(`💾 Export nach: data/sqlite-export-${timestamp}/\n`)

const db = new sqlite3.Database(dbPath)

function queryAll(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

async function main() {
  // Tabellen holen
  const tables = await queryAll(db, `
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `)
  
  const exportData = {}
  
  for (const { name: table } of tables) {
    try {
      const rows = await queryAll(db, `SELECT * FROM "${table}"`)
      exportData[table] = rows
      
      fs.writeFileSync(
        path.join(exportDir, `${table}.json`),
        JSON.stringify(rows, null, 2)
      )
      
      console.log(`✅ ${table}: ${rows.length} Zeilen`)
    } catch (e) {
      console.error(`❌ ${table}: ${e.message}`)
    }
  }
  
  // Gesamt-Export
  fs.writeFileSync(
    path.join(exportDir, '_all-data.json'),
    JSON.stringify(exportData, null, 2)
  )
  
  // Meta
  const meta = {
    exportedAt: new Date().toISOString(),
    database: 'sqlite',
    tables: Object.keys(exportData).map(k => ({ table: k, count: exportData[k].length })),
    totalRows: Object.values(exportData).reduce((sum, arr) => sum + arr.length, 0)
  }
  fs.writeFileSync(path.join(exportDir, '_meta.json'), JSON.stringify(meta, null, 2))
  
  db.close()
  
  console.log(`\n📊 Export fertig:`)
  console.log(`   Tabellen: ${Object.keys(exportData).length}`)
  console.log(`   Zeilen: ${meta.totalRows}`)
  console.log(`   Ordner: data/sqlite-export-${timestamp}/`)
}

main().catch(e => {
  console.error('❌ Fehler:', e)
  process.exit(1)
})
