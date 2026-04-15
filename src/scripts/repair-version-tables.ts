/**
 * Erstellt SQL-Datei zum Reparieren fehlender Versionstabellen
 * Ausgabe: drizzle/repair_missing_version_tables.sql
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { sql } from '@payloadcms/db-vercel-postgres'
import fs from 'fs'

const VERSION_TABLE_MAPPINGS: Record<string, string> = {
  _site_pages_v_version_hero_stats: 'site_pages_hero_stats',
  _site_pages_v_version_hero_marquee_logos: 'site_pages_hero_marquee_logos',
  _site_pages_v_version_hero_links: 'site_pages_hero_links',
  _site_pages_v_version_hero_floating_elements: 'site_pages_hero_floating_elements',
  _site_pages_v_blocks_hero_marketing: 'site_pages_blocks_hero_marketing',
  _site_pages_v_blocks_cta: 'site_pages_blocks_cta',
  _site_pages_v_blocks_cta_links: 'site_pages_blocks_cta_links',
  _site_pages_v_blocks_content: 'site_pages_blocks_content',
  _site_pages_v_blocks_content_columns: 'site_pages_blocks_content_columns',
  _site_pages_v_blocks_media_block: 'site_pages_blocks_media_block',
  _site_pages_v_blocks_archive: 'site_pages_blocks_archive',
  _site_pages_v_blocks_form_block: 'site_pages_blocks_form_block',
  _services_grid_v: 'services_grid',
  _services_grid_v_categories: 'services_grid_categories',
  _services_grid_v_categories_services: 'services_grid_categories_services',
}

async function main() {
  console.log('🔍 Prüfe fehlende Versionstabellen...\n')

  const payload = await getPayload({ config })

  // Hole alle existierenden Tabellen
  const result = await payload.db.execute({
    raw: `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `,
  })

  const existingTables = new Set(result.rows?.map((r: any) => r.table_name) || [])

  console.log(`📊 ${existingTables.size} Tabellen gefunden\n`)

  const missingTables: string[] = []
  const existingVersionTables: string[] = []

  for (const table of Object.keys(VERSION_TABLE_MAPPINGS)) {
    if (existingTables.has(table)) {
      existingVersionTables.push(table)
    } else {
      missingTables.push(table)
    }
  }

  console.log(`✅ ${existingVersionTables.length} Versionstabellen existieren`)
  console.log(`❌ ${missingTables.length} Versionstabellen fehlen:\n`)
  missingTables.forEach((t) => console.log(`   - ${t}`))

  if (missingTables.length === 0) {
    console.log('\n🎉 Alle Versionstabellen sind vorhanden!')
    return
  }

  // Generiere SQL
  console.log('\n\n📋 Generiere SQL...\n')

  let sqlOutput = `-- Repair SQL for missing version tables on main_old branch\n-- Generated: ${new Date().toISOString()}\n\n`

  for (const table of missingTables) {
    const mainTable = VERSION_TABLE_MAPPINGS[table]

    if (existingTables.has(mainTable)) {
      // Hole Struktur der Haupttabelle
      const cols = await payload.db.execute({
        raw: `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = '${mainTable}'
        ORDER BY ordinal_position
      `,
      })

      const columns = (cols.rows || [])
        .map((c: any) => {
          let def = `"${c.column_name}" ${c.data_type}`
          if (c.column_default) def += ` DEFAULT ${c.column_default}`
          if (c.is_nullable === 'NO' && !c.column_default) def += ` NOT NULL`
          return def
        })
        .join(',\n  ')

      sqlOutput += `CREATE TABLE "${table}" (\n  ${columns}\n);\n\n`
    } else {
      sqlOutput += `-- ${table}: Main table ${mainTable} also missing\n\n`
    }
  }

  // Speichere SQL
  const sqlFile = '/Users/horus/Desktop/pvgb2026/pvgb2026/drizzle/repair_missing_version_tables.sql'
  fs.writeFileSync(sqlFile, sqlOutput)

  console.log(`✅ SQL-Datei erstellt: ${sqlFile}`)
  console.log(`\n📁 Enthält ${missingTables.length} CREATE TABLE Statements`)
  console.log('\n📝 Nächster Schritt:')
  console.log('   1. Öffne Neon Dashboard → SQL Editor')
  console.log('   2. Kopiere Inhalt der SQL-Datei')
  console.log('   3. Führe SQL aus')
  console.log('   4. Dann: pnpm migrate:neon')
}

main().catch(console.error)
