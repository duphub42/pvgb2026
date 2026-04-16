#!/usr/bin/env tsx
// Fix missing _radial_tl_v table in SQLite
// Usage: pnpm tsx fix-radial-tl-sqlite.ts

// @ts-expect-error better-sqlite3 has no types
import type { Database as DatabaseType } from 'better-sqlite3'
// @ts-expect-error better-sqlite3 has no types
import Database from 'better-sqlite3'
import * as path from 'path'

const dbPath = path.resolve(process.cwd(), 'payload.db')
console.log(`[Fix] Opening database: ${dbPath}`)

const db = new Database(dbPath)

try {
  // Check if table exists
  const checkTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='_radial_tl_v'")
    .get()

  if (checkTable) {
    console.log('[Fix] Table _radial_tl_v already exists')
  } else {
    console.log('[Fix] Creating _radial_tl_v table...')
    db.exec(`
      CREATE TABLE IF NOT EXISTS "_radial_tl_v" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "section_title" varchar,
        "section_text" varchar,
        "_uuid" varchar,
        "block_name" varchar
      )
    `)
    console.log('[Fix] Created _radial_tl_v')
  }

  const checkItemsTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='_radial_tl_items_v'")
    .get()

  if (checkItemsTable) {
    console.log('[Fix] Table _radial_tl_items_v already exists')
  } else {
    console.log('[Fix] Creating _radial_tl_items_v table...')
    db.exec(`
      CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "title" varchar,
        "date" varchar,
        "category" varchar DEFAULT 'Phase',
        "icon" varchar DEFAULT 'Calendar',
        "status" varchar DEFAULT 'pending',
        "energy" integer DEFAULT 50,
        "content" varchar,
        "related_ids" varchar,
        "_uuid" varchar
      )
    `)
    console.log('[Fix] Created _radial_tl_items_v')
  }

  // Also ensure main tables exist
  const checkMainTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='radial_tl'")
    .get()

  if (!checkMainTable) {
    console.log('[Fix] Creating radial_tl table...')
    db.exec(`
      CREATE TABLE IF NOT EXISTS "radial_tl" (
        "_order" integer,
        "_parent_id" integer NOT NULL,
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "section_title" varchar NOT NULL DEFAULT 'Projekt-Timeline',
        "section_text" varchar,
        "_uuid" varchar,
        "block_name" varchar
      )
    `)
    console.log('[Fix] Created radial_tl')
  }

  const checkMainItemsTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='radial_tl_items'")
    .get()

  if (!checkMainItemsTable) {
    console.log('[Fix] Creating radial_tl_items table...')
    db.exec(`
      CREATE TABLE IF NOT EXISTS "radial_tl_items" (
        "_order" integer,
        "_parent_id" integer NOT NULL,
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "title" varchar NOT NULL,
        "date" varchar NOT NULL,
        "category" varchar DEFAULT 'Phase',
        "icon" varchar DEFAULT 'Calendar',
        "status" varchar DEFAULT 'pending',
        "energy" integer DEFAULT 50,
        "content" varchar NOT NULL,
        "related_ids" varchar,
        "_uuid" varchar
      )
    `)
    console.log('[Fix] Created radial_tl_items')
  }

  // Create indices
  console.log('[Fix] Creating indices...')
  db.exec(`CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_idx" ON "_radial_tl_v" ("_parent_id")`)
  db.exec(
    `CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_idx" ON "_radial_tl_items_v" ("_parent_id")`,
  )
  db.exec(`CREATE INDEX IF NOT EXISTS "radial_tl_parent_idx" ON "radial_tl" ("_parent_id")`)
  db.exec(
    `CREATE INDEX IF NOT EXISTS "radial_tl_items_parent_idx" ON "radial_tl_items" ("_parent_id")`,
  )

  console.log('[Fix] ✅ All radial_tl tables fixed successfully!')
} catch (error) {
  console.error('[Fix] ❌ Error:', error)
  process.exit(1)
} finally {
  db.close()
}
