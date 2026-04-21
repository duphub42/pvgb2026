/**
 * Repariert fehlende Versionstabellen - Direkt SQL via Postgres
 * Verwendet DATABASE_URL aus .env.local
 */

import { Client } from 'pg'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

// Lade .env.local
dotenv.config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL nicht gefunden in .env.local')
  process.exit(1)
}

console.log('🔗 Verbinde mit:', DATABASE_URL.replace(/:([^:@]+)@/, ':****@'))

const VERSION_TABLE_MAPPINGS: Record<string, string> = {
  _site_pages_v_version_hero_stats: 'site_pages_hero_stats',
  _site_pages_v_version_hero_marquee_logos: 'site_pages_hero_marquee_logos',
  _site_pages_v_version_hero_links: 'site_pages_hero_links',
  _site_pages_v_version_hero_floating_elements: 'site_pages_hero_floating_elements',
}

async function main() {
  const client = new Client({ connectionString: DATABASE_URL })
  await client.connect()

  console.log('🔍 Prüfe Tabellen...\n')

  // Hole existierende Tabellen
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `)

  const existingTables = new Set(tablesRes.rows.map((r) => r.table_name))
  console.log(`📊 ${existingTables.size} Tabellen gefunden\n`)

  // Finde fehlende Versionstabellen
  const missingTables: string[] = []
  for (const [vTable, mainTable] of Object.entries(VERSION_TABLE_MAPPINGS)) {
    if (!existingTables.has(vTable)) {
      missingTables.push(vTable)
      console.log(`❌ Fehlt: ${vTable} (Haupttabelle: ${mainTable})`)
    }
  }

  if (missingTables.length === 0) {
    console.log('\n✅ Alle Versionstabellen sind vorhanden!')
    await client.end()
    return
  }

  // Generiere SQL
  console.log('\n\n📋 Generiere CREATE TABLE Statements...\n')

  let sqlOutput = `-- Repair SQL for missing version tables\n-- Branch: main_old\n-- Generated: ${new Date().toISOString()}\n\n`

  for (const vTable of missingTables) {
    const mainTable = VERSION_TABLE_MAPPINGS[vTable]

    if (existingTables.has(mainTable)) {
      // Hole Struktur
      const colsRes = await client.query(
        `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `,
        [mainTable],
      )

      const columns = colsRes.rows
        .map(
          (c: {
            column_name: string
            data_type: string
            is_nullable: string
            column_default: string | null
          }) => {
            let def = `"${c.column_name}" ${c.data_type}`
            if (c.column_default) def += ` DEFAULT ${c.column_default}`
            if (c.is_nullable === 'NO' && !c.column_default) def += ` NOT NULL`
            return def
          },
        )
        .join(',\n  ')

      sqlOutput += `CREATE TABLE "${vTable}" (\n  ${columns}\n);\n\n`
      console.log(`✅ Generiert: ${vTable}`)
    } else {
      sqlOutput += `-- ${vTable}: Haupttabelle ${mainTable} fehlt auch\n\n`
      console.log(`⚠️  Übersprungen: ${vTable} (Haupttabelle fehlt)`)
    }
  }

  // Speichere SQL
  const sqlFile = '/Users/horus/Desktop/pvgb2026/pvgb2026/drizzle/repair_missing_version_tables.sql'
  fs.writeFileSync(sqlFile, sqlOutput)

  console.log(`\n✅ SQL-Datei gespeichert: ${sqlFile}`)
  console.log(`\n📝 Nächste Schritte:`)
  console.log('   1. Öffne Neon Dashboard → SQL Editor')
  console.log('   2. Kopiere die SQL-Datei und führe sie aus')
  console.log('   3. Dann: pnpm migrate:neon')

  await client.end()
}

main().catch((err) => {
  console.error('❌ Fehler:', err.message)
  process.exit(1)
})
