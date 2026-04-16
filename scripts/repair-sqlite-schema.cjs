#!/usr/bin/env node
/**
 * Repariert das SQLite-Schema ohne Datenverlust
 * Fügt fehlende Payload-System-Tabellen hinzu
 */

const { createClient } = require('@libsql/client')
const fs = require('fs')
const path = require('path')

const DB_PATH = './payload.db'

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ payload.db nicht gefunden')
  process.exit(1)
}

console.log('🔧 Repariere SQLite-Schema...\n')

const db = createClient({
  url: `file:${DB_PATH}`,
})

// Liste der fehlenden Tabellen, die Payload intern braucht
const REQUIRED_TABLES = [
  {
    name: 'payload_locked_documents',
    sql: `CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "global_slug" TEXT,
      "updated_at" TEXT,
      "created_at" TEXT
    );`,
  },
  {
    name: 'payload_locked_documents_rels',
    sql: `CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "parent_id" INTEGER NOT NULL,
      "order" INTEGER,
      "path" TEXT,
      "site_pages_id" INTEGER,
      "blog_posts_id" INTEGER,
      "media_id" INTEGER,
      "categories_id" INTEGER,
      "users_id" INTEGER,
      "mega_menu_id" INTEGER,
      "hero_backgrounds_id" INTEGER,
      "price_calc_categories_id" INTEGER,
      "price_calc_items_id" INTEGER,
      "redirects_id" INTEGER,
      "forms_id" INTEGER,
      "form_submissions_id" INTEGER,
      "search_id" INTEGER,
      "payload_folders_id" INTEGER
    );`,
  },
  {
    name: 'payload_versions',
    sql: `CREATE TABLE IF NOT EXISTS "payload_versions" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "parent_id" INTEGER,
      "version_id" INTEGER,
      "version_collection" TEXT,
      "version_global" TEXT,
      "updated_at" TEXT,
      "created_at" TEXT,
      "autosave" INTEGER
    );`,
  },
  {
    name: 'payload_versions_rels',
    sql: `CREATE TABLE IF NOT EXISTS "payload_versions_rels" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "parent_id" INTEGER NOT NULL,
      "order" INTEGER,
      "path" TEXT,
      "site_pages_id" INTEGER,
      "blog_posts_id" INTEGER,
      "media_id" INTEGER,
      "categories_id" INTEGER,
      "users_id" INTEGER,
      "mega_menu_id" INTEGER,
      "hero_backgrounds_id" INTEGER,
      "price_calc_categories_id" INTEGER,
      "price_calc_items_id" INTEGER,
      "redirects_id" INTEGER,
      "forms_id" INTEGER,
      "form_submissions_id" INTEGER,
      "search_id" INTEGER,
      "payload_folders_id" INTEGER
    );`,
  },
  {
    name: 'payload_migrations',
    sql: `CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "batch" INTEGER,
      "updated_at" TEXT,
      "created_at" TEXT
    );`,
  },
  {
    name: 'payload_jobs',
    sql: `CREATE TABLE IF NOT EXISTS "payload_jobs" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "task_slug" TEXT,
      "input" TEXT,
      "output" TEXT,
      "state" TEXT,
      "completed_at" TEXT,
      "has_error" INTEGER,
      "error_message" TEXT,
      "error_stack" TEXT,
      "run_at" TEXT,
      "wait_until" TEXT,
      "processing" INTEGER,
      "updated_at" TEXT,
      "created_at" TEXT
    );`,
  },
]

async function main() {
  const results = []

  for (const { name, sql } of REQUIRED_TABLES) {
    try {
      // Prüfe ob Tabelle existiert
      const rs = await db.execute(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`,
      )
      const tableExists = rs.rows.length > 0

      if (!tableExists) {
        await db.execute(sql)
        results.push(`✅ ${name} erstellt`)
      } else {
        results.push(`⏭️  ${name} existiert bereits`)
      }
    } catch (err) {
      results.push(`❌ ${name}: ${err.message}`)
    }
  }

  console.log(results.join('\n'))

  // Prüfe auf weitere fehlende Spalten in bestehenden Tabellen
  console.log('\n📦 Prüfe fehlende Spalten...')

  const COLUMNS_TO_CHECK = [
    { table: 'header', column: 'logoText', type: 'TEXT' },
    { table: 'footer', column: 'copyright', type: 'TEXT' },
  ]

  for (const { table, column, type } of COLUMNS_TO_CHECK) {
    try {
      const rs = await db.execute(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`,
      )
      const tableExists = rs.rows.length > 0

      if (!tableExists) {
        console.log(`⚠️  Tabelle '${table}' existiert nicht`)
        continue
      }

      // Prüfe ob Spalte existiert (durch SELECT versuchen)
      try {
        await db.execute(`SELECT "${column}" FROM "${table}" LIMIT 1`)
        console.log(`⏭️  ${table}.${column} existiert`)
      } catch {
        // Spalte fehlt - füge sie hinzu
        await db.execute(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`)
        console.log(`✅ ${table}.${column} hinzugefügt`)
      }
    } catch (err) {
      console.log(`❌ ${table}.${column}: ${err.message}`)
    }
  }

  // Block-Style-Spalten für alle Block-Tabellen
  console.log('\n🔧 Prüfe Block-Style-Spalten...')

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

  const BLOCK_TABLES = [
    // Hero & Intro Blocks
    'site_pages_blocks_hero_marketing',
    'site_pages_blocks_hero_with_process',
    'site_pages_blocks_introduction',
    // Service Blocks
    'site_pages_blocks_consulting_overview',
    'site_pages_blocks_services_overview',
    'services_grid',
    'site_pages_blocks_why_work_with_me',
    // Portfolio Blocks
    'radial_tl',
    'portfolio_grid',
    'portfolio_kpis',
    'site_pages_blocks_brand_showcase',
    // Profil Blocks
    'prof_ueber',
    'prof_kern',
    'prof_skills',
    'prof_weg',
    'prof_zahl',
    'prof_tools',
    'prof_lang_zert',
    'prof_cta',
    // CTA & Calculator Blocks
    'site_pages_blocks_price_calculator',
    'pricing_table',
    'site_pages_blocks_cta',
    'site_pages_blocks_cal_popup',
    'contact_cards',
    // Content Blocks
    'site_pages_blocks_content',
    'site_pages_blocks_media_block',
    'site_pages_blocks_archive',
    'site_pages_blocks_form_block',
    'site_pages_blocks_html_embed',
    'site_pages_blocks_code',
    'site_pages_blocks_banner',
  ]

  let tablesModified = 0
  let columnsAdded = 0

  for (const tableName of BLOCK_TABLES) {
    try {
      const rs = await db.execute(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
      )
      const tableExists = rs.rows.length > 0

      if (!tableExists) {
        // Tabelle fehlt komplett - erstelle sie mit allen Spalten
        try {
          await db.execute(`
            CREATE TABLE "${tableName}" (
              "id" INTEGER PRIMARY KEY AUTOINCREMENT,
              "_order" INTEGER,
              "_parent_id" INTEGER,
              "_path" TEXT,
              "_locale" TEXT,
              "block_spacing_padding" TEXT DEFAULT 'default',
              "block_spacing_padding_top" TEXT DEFAULT 'default',
              "block_spacing_margin_bottom" TEXT DEFAULT 'default',
              "block_container" TEXT DEFAULT 'default',
              "block_background" TEXT DEFAULT 'none',
              "block_border_enabled" INTEGER DEFAULT 0,
              "block_border_style" TEXT DEFAULT 'default',
              "block_border_radius" TEXT DEFAULT 'default',
              "block_overlay_enabled" INTEGER DEFAULT 0,
              "block_overlay_color" TEXT DEFAULT 'dark',
              "block_overlay_opacity" INTEGER DEFAULT 0,
              "block_content_spacing" TEXT DEFAULT 'default',
              "block_animation" TEXT DEFAULT 'default'
            )
          `)
          tablesModified++
          console.log(`✅ ${tableName}: Tabelle erstellt mit Style-Spalten`)
        } catch (err) {
          console.log(`❌ ${tableName}: Konnte Tabelle nicht erstellen - ${err.message}`)
        }
        continue
      }

      let tableModified = false

      for (const col of STYLE_COLUMNS) {
        try {
          // Prüfe ob Spalte existiert
          await db.execute(`SELECT "${col.name}" FROM "${tableName}" LIMIT 1`)
        } catch {
          // Spalte fehlt - füge sie hinzu
          try {
            await db.execute(
              `ALTER TABLE "${tableName}" ADD COLUMN "${col.name}" ${col.type} DEFAULT ${col.default}`,
            )
            columnsAdded++
            tableModified = true
            console.log(`  + ${col.name}`)
          } catch (err) {
            // Ignoriere Fehler (Spalte existiert vielleicht schon)
          }
        }
      }

      if (tableModified) {
        tablesModified++
        console.log(`✅ ${tableName}: Spalten hinzugefügt`)
      } else {
        console.log(`⏭️  ${tableName}: alle Spalten vorhanden`)
      }
    } catch (err) {
      console.log(`❌ Fehler bei ${tableName}: ${err.message}`)
    }
  }

  console.log(
    `\n📊 Zusammenfassung: ${tablesModified} Tabellen modifiziert, ${columnsAdded} Spalten hinzugefügt`,
  )

  await db.close()

  console.log('\n✅ Reparatur abgeschlossen!')
  console.log('📝 Starte jetzt: pnpm dev')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
