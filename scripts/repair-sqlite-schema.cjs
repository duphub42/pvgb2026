#!/usr/bin/env node
/**
 * Repariert das SQLite-Schema ohne Datenverlust
 * Fügt fehlende Payload-System-Tabellen hinzu
 */

const sqlite3 = require('@libsql/sqlite3')
const fs = require('fs')
const path = require('path')

const DB_PATH = './payload.db'

if (!fs.existsSync(DB_PATH)) {
  console.error('❌ payload.db nicht gefunden')
  process.exit(1)
}

console.log('🔧 Repariere SQLite-Schema...\n')

const db = new Database(DB_PATH)

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

const results = []

for (const { name, sql } of REQUIRED_TABLES) {
  try {
    // Prüfe ob Tabelle existiert
    const tableExists = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`)
      .get()

    if (!tableExists) {
      db.exec(sql)
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
    const tableExists = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`)
      .get()

    if (!tableExists) {
      console.log(`⚠️  Tabelle '${table}' existiert nicht`)
      continue
    }

    // Prüfe ob Spalte existiert (durch SELECT versuchen)
    try {
      db.prepare(`SELECT "${column}" FROM "${table}" LIMIT 1`).get()
      console.log(`⏭️  ${table}.${column} existiert`)
    } catch {
      // Spalte fehlt - füge sie hinzu
      db.exec(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`)
      console.log(`✅ ${table}.${column} hinzugefügt`)
    }
  } catch (err) {
    console.log(`❌ ${table}.${column}: ${err.message}`)
  }
}

db.close()

console.log('\n✅ Reparatur abgeschlossen!')
console.log('📝 Starte jetzt: pnpm dev')
