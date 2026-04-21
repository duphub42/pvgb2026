/**
 * SQL-Backup der Neon-Datenbank via Node.js PostgreSQL client
 * Nutzt DATABASE_URL aus .env.local
 *
 * Aufruf: npx tsx src/scripts/backup-neon-simple.ts
 * Output: data/backup-neon-YYYYMMDD-HHMMSS.sql
 */
import './load-env'
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

fs.mkdirSync(path.dirname(outputPath), { recursive: true })

console.log('🔌 Verbinde mit Neon...')
console.log(`💾 Backup wird gespeichert: data/${filename}`)

async function main() {
  // Dynamic import für pg
  const { default: pg } = await import('pg')
  const { Client } = pg

  const client = new Client({ connectionString: url })
  await client.connect()

  try {
    // Alle Tabellen holen
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `)

    const tables = tablesRes.rows.map((r) => r.table_name)
    console.log(`📋 ${tables.length} Tabellen gefunden`)

    let sql = `-- Neon Backup\n-- Erstellt: ${new Date().toISOString()}\n\n`

    // Schema-Only Backup (CREATE TABLE statements)
    for (const table of tables) {
      try {
        await client.query(
          `
          SELECT 'CREATE TABLE IF NOT EXISTS "' || tablename || '" (...);' as create_stmt
          FROM pg_tables 
          WHERE tablename = $1
        `,
          [table],
        )

        // Einfache Tabellendefinition
        const colsRes = await client.query(
          `
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_name = $1
          ORDER BY ordinal_position
        `,
          [table],
        )

        if (colsRes.rows.length > 0) {
          const cols = colsRes.rows
            .map(
              (c) =>
                `  "${c.column_name}" ${c.data_type}${c.is_nullable === 'NO' ? ' NOT NULL' : ''}`,
            )
            .join(',\n')
          sql += `CREATE TABLE IF NOT EXISTS "${table}" (\n${cols}\n);\n\n`
        }

        // Daten exportieren (als INSERT statements)
        const dataRes = await client.query(`SELECT * FROM "${table}"`)
        if (dataRes.rows.length > 0) {
          sql += `-- ${dataRes.rows.length} Zeilen in ${table}\n`
          for (const row of dataRes.rows) {
            const columns = Object.keys(row)
              .map((k) => `"${k}"`)
              .join(', ')
            const values = Object.values(row)
              .map((v) => {
                if (v === null) return 'NULL'
                if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`
                if (typeof v === 'boolean') return v
                if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`
                return v
              })
              .join(', ')
            sql += `INSERT INTO "${table}" (${columns}) VALUES (${values});\n`
          }
          sql += '\n'
        }
      } catch (e) {
        console.warn(`⚠️ Tabelle ${table} übersprungen:`, (e as Error).message)
      }
    }

    fs.writeFileSync(outputPath, sql)

    const stats = fs.statSync(outputPath)
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2)

    console.log(`\n✅ Backup erfolgreich!`)
    console.log(`📁 Datei: data/${filename}`)
    console.log(`📊 Größe: ${sizeMB} MB`)
    console.log(`📋 Tabellen: ${tables.length}`)
  } finally {
    await client.end()
  }
}

main().catch((e) => {
  console.error('❌ Fehler:', e)
  process.exit(1)
})
