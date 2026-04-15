/**
 * Add block style columns to all block tables in SQLite
 * This is a one-time migration for the centralized style system
 */

const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(process.cwd(), 'payload.db')

// Columns to add to each block table
const STYLE_COLUMNS = [
  { name: 'block_spacing_padding', type: 'TEXT', default: "'default'" },
  { name: 'block_spacing_padding_top', type: 'TEXT', default: "'default'" },
  { name: 'block_spacing_margin_bottom', type: 'TEXT', default: "'default'" },
  { name: 'block_container', type: 'TEXT', default: "'default'" },
  { name: 'block_background', type: 'TEXT', default: "'none'" },
  { name: 'block_border_enabled', type: 'INTEGER', default: '0' },
  { name: 'block_border_style', type: 'TEXT', default: "'solid'" },
  { name: 'block_border_radius', type: 'TEXT', default: "'medium'" },
  { name: 'block_overlay_enabled', type: 'INTEGER', default: '0' },
  { name: 'block_overlay_color', type: 'TEXT', default: "'dark'" },
  { name: 'block_overlay_opacity', type: 'INTEGER', default: '0' },
  { name: 'block_content_spacing', type: 'TEXT', default: "'default'" },
  { name: 'block_animation', type: 'TEXT', default: "'none'" },
]

// All block tables that need the new columns
const BLOCK_TABLES = [
  'site_pages_blocks_hero_marketing',
  'site_pages_blocks_hero_with_process',
  'site_pages_blocks_introduction',
  'site_pages_blocks_consulting_overview',
  'site_pages_blocks_services_overview',
  'services_grid',
  'site_pages_blocks_why_work_with_me',
  'radial_tl', // radialOrbitalTimeline
  'portfolio_grid',
  'portfolio_kpis',
  'site_pages_blocks_brand_showcase',
  'prof_ueber', // profilUeberMich
  'prof_kern', // profilKernkompetenz
  'prof_skills', // profilKompetenzen
  'prof_weg', // profilWerdegang
  'prof_zahl', // profilZahlenFakten
  'prof_tools', // profilTools
  'prof_lang_zert', // profilLangZert
  'prof_cta', // profilCtaBand
  'site_pages_blocks_price_calculator',
  'pricing_table',
  'site_pages_blocks_cta',
  'site_pages_blocks_cal_popup',
  'contact_cards', // contactInfoCards
  'site_pages_blocks_content',
  'site_pages_blocks_media_block',
  'site_pages_blocks_archive',
  'site_pages_blocks_form_block',
  'site_pages_blocks_html_embed',
  'site_pages_blocks_code',
  'site_pages_blocks_banner',
]

async function main() {
  console.log(`Opening database: ${DB_PATH}`)
  const db = new Database(DB_PATH)

  // Get existing tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  const tableNames = tables.map(t => t.name)

  console.log(`Found ${tableNames.length} tables`)

  let tablesModified = 0
  let columnsAdded = 0

  for (const tableName of BLOCK_TABLES) {
    if (!tableNames.includes(tableName)) {
      console.log(`  ⚠️  Table not found: ${tableName}`)
      continue
    }

    // Get existing columns for this table
    const tableInfo = db.prepare(`PRAGMA table_info(${tableName})`).all()
    const existingColumns = tableInfo.map(col => col.name)

    let tableModified = false

    for (const col of STYLE_COLUMNS) {
      if (existingColumns.includes(col.name)) {
        continue // Column already exists
      }

      try {
        const sql = `ALTER TABLE ${tableName} ADD COLUMN ${col.name} ${col.type} DEFAULT ${col.default}`
        db.exec(sql)
        console.log(`  ✅ Added ${col.name} to ${tableName}`)
        columnsAdded++
        tableModified = true
      } catch (err) {
        console.log(`  ❌ Failed to add ${col.name} to ${tableName}: ${err.message}`)
      }
    }

    if (tableModified) {
      tablesModified++
    } else {
      console.log(`  ⏭️  All columns already exist in ${tableName}`)
    }
  }

  db.close()

  console.log(`\n✅ Migration complete!`)
  console.log(`   Modified ${tablesModified} tables`)
  console.log(`   Added ${columnsAdded} columns`)
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
