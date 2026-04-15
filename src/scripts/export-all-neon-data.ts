/**
 * Vollständiger Export aller Neon-Daten als JSON (kann später re-importiert werden)
 * Nutzt direkte SQL-Queries, funktioniert auch bei Schema-Mismatches
 */
import './load-env'
import { Client } from 'pg'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('❌ DATABASE_URL fehlt')
  process.exit(1)
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const exportDir = path.join(root, 'data', `neon-full-export-${timestamp}`)
fs.mkdirSync(exportDir, { recursive: true })

// Wichtige Tabellen für den Content
const contentTables = [
  // Hauptseiten
  'site_pages',
  'site_pages_v',
  '_site_pages_v',
  
  // Navigation
  'mega_menu',
  'mega_menu_sub_items',
  'mega_menu_columns',
  'mega_menu_columns_items',
  
  // Media
  'media',
  
  // Preisrechner
  'price_calc_categories',
  'price_calc_items',
  'price_calculator',
  
  // Globals
  'header',
  'header_nav_items',
  'header_rels',
  'footer',
  'footer_columns',
  'footer_columns_links',
  'footer_social_links',
  'footer_nav_items',
  'design',
  'theme_settings',
  
  // User/Blog
  'users',
  'categories',
  'blog_posts',
  
  // Forms
  'forms',
  'form_submissions',
]

async function main() {
  const client = new Client({ connectionString: url })
  await client.connect()
  
  console.log('🔌 Verbinde mit Neon...')
  console.log(`💾 Export wird gespeichert in: data/neon-full-export-${timestamp}/\n`)
  
  const exportData: Record<string, any[]> = {}
  
  for (const table of contentTables) {
    try {
      // Prüfen ob Tabelle existiert
      const checkRes = await client.query(`
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1
      `, [table])
      
      if (checkRes.rows.length === 0) {
        console.log(`⚠️  ${table}: Tabelle existiert nicht`)
        continue
      }
      
      // Daten exportieren
      const dataRes = await client.query(`SELECT * FROM "${table}"`)
      exportData[table] = dataRes.rows
      
      console.log(`✅ ${table}: ${dataRes.rows.length} Zeilen`)
      
      // Einzelne JSON-Datei pro Tabelle
      fs.writeFileSync(
        path.join(exportDir, `${table}.json`),
        JSON.stringify(dataRes.rows, null, 2)
      )
      
    } catch (e) {
      console.error(`❌ ${table}: ${(e as Error).message}`)
    }
  }
  
  // Gesamt-Export
  fs.writeFileSync(
    path.join(exportDir, '_all-data.json'),
    JSON.stringify(exportData, null, 2)
  )
  
  // Meta-Datei
  const meta = {
    exportedAt: new Date().toISOString(),
    database: 'neon',
    tables: Object.keys(exportData).map(k => ({ table: k, count: exportData[k].length })),
    totalRows: Object.values(exportData).reduce((sum, arr) => sum + arr.length, 0)
  }
  fs.writeFileSync(path.join(exportDir, '_meta.json'), JSON.stringify(meta, null, 2))
  
  await client.end()
  
  console.log(`\n📊 Export-Übersicht:`)
  console.log(`   Tabellen: ${Object.keys(exportData).length}`)
  console.log(`   Gesamtzeilen: ${meta.totalRows}`)
  console.log(`\n💾 Gespeichert in: data/neon-full-export-${timestamp}/`)
}

main().catch(e => {
  console.error('❌ Fehler:', e)
  process.exit(1)
})
