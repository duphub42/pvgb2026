#!/usr/bin/env node
// Auto-fix SQLite database schema - adds all missing columns automatically
// Run: node auto-fix-db.mjs

import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(process.cwd(), 'payload.db');

console.log('[AutoFix] 🔧 Payload SQLite Database Auto-Fix');
console.log(`[AutoFix] Database: ${dbPath}`);

const db = new DatabaseSync(dbPath);

// Helper: Get all tables
function getTables() {
  return db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  ).all().map(r => r.name);
}

// Helper: Get columns for a table
function getColumns(table) {
  try {
    return db.prepare(`PRAGMA table_info(${table})`).all().map(c => c.name);
  } catch {
    return [];
  }
}

// Helper: Add column if missing
function addColumn(table, column, dataType = 'varchar') {
  try {
    db.exec(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${dataType}`);
    console.log(`[AutoFix] ✅ ${table}.${column}`);
    return true;
  } catch (err) {
    if (err.message?.includes('duplicate column')) {
      return 'exists';
    }
    console.error(`[AutoFix] ❌ ${table}.${column}: ${err.message}`);
    return false;
  }
}

// Get all tables
const allTables = getTables();
console.log(`[AutoFix] Found ${allTables.length} tables`);

let added = 0;
let skipped = 0;
let errors = 0;

// ============================================
// FIX 1: Add version_hero_portrait_id to _site_pages_v
// ============================================
if (allTables.includes('_site_pages_v')) {
  const cols = getColumns('_site_pages_v');
  if (!cols.includes('version_hero_portrait_id')) {
    const result = addColumn('_site_pages_v', 'version_hero_portrait_id', 'integer');
    if (result === true) added++;
    else if (result === 'exists') skipped++;
    else errors++;
  }
}

// ============================================
// FIX 2: Add all block_spacing columns to block version tables
// ============================================
const spacingColumns = [
  { name: 'block_spacing_padding', type: 'varchar' },
  { name: 'block_spacing_padding_top', type: 'varchar' },
  { name: 'block_spacing_margin_bottom', type: 'varchar' },
  { name: 'block_container', type: 'varchar' },
  { name: 'block_background', type: 'varchar' },
  { name: 'block_border_enabled', type: 'integer' },
  { name: 'block_border_style', type: 'varchar' },
  { name: 'block_border_radius', type: 'varchar' },
  { name: 'block_overlay_enabled', type: 'integer' },
  { name: 'block_overlay_color', type: 'varchar' },
  { name: 'block_overlay_opacity', type: 'integer' },
  { name: 'block_content_spacing', type: 'varchar' },
  { name: 'block_animation', type: 'varchar' },
];

// Find all block version tables
const blockVersionTables = allTables.filter(t => 
  t.startsWith('_site_pages_v_blocks_') || 
  t.startsWith('_prof_') || 
  t.startsWith('_portfolio_') ||
  t.startsWith('_contact_') ||
  t.startsWith('_radial_') ||
  t.startsWith('_pricing_') ||
  (t.startsWith('_') && t.endsWith('_v'))
);

console.log(`[AutoFix] Checking ${blockVersionTables.length} block version tables...`);

for (const table of blockVersionTables) {
  const existingCols = getColumns(table);
  
  for (const col of spacingColumns) {
    if (!existingCols.includes(col.name)) {
      const result = addColumn(table, col.name, col.type);
      if (result === true) added++;
      else if (result === 'exists') skipped++;
      else errors++;
    }
  }
}

// ============================================
// FIX 3: Add common missing columns to main tables
// ============================================
const commonFixes = [
  // Hero related
  { table: 'site_pages', column: 'hero_portrait_id', type: 'integer' },
  { table: '_site_pages_v', column: 'version_hero_portrait_id', type: 'integer' },
  
  // Block tables that might be missing _path
  { table: '_radial_tl_v', column: '_path', type: 'text' },
  { table: '_radial_tl_items_v', column: '_path', type: 'text' },
  { table: '_pricing_table_v', column: '_path', type: 'text' },
  { table: '_pricing_table_v_plans', column: '_path', type: 'text' },
  { table: '_portfolio_kpis_v', column: '_path', type: 'text' },
  { table: '_portfolio_grid_v', column: '_path', type: 'text' },
  { table: '_contact_cards_v', column: '_path', type: 'text' },
];

console.log(`[AutoFix] Applying ${commonFixes.length} common fixes...`);

for (const fix of commonFixes) {
  if (allTables.includes(fix.table)) {
    const cols = getColumns(fix.table);
    if (!cols.includes(fix.column)) {
      const result = addColumn(fix.table, fix.column, fix.type);
      if (result === true) added++;
      else if (result === 'exists') skipped++;
      else errors++;
    }
  }
}

// ============================================
// FIX 4: Check for any tables with _uuid missing (needed for versions)
// ============================================
const uuidTables = allTables.filter(t => t.startsWith('_') && t.endsWith('_v'));
for (const table of uuidTables) {
  const cols = getColumns(table);
  if (!cols.includes('_uuid')) {
    const result = addColumn(table, '_uuid', 'varchar');
    if (result === true) added++;
    else if (result === 'exists') skipped++;
    else errors++;
  }
}

// ============================================
// Summary
// ============================================
console.log('\n[AutoFix] =========================================');
console.log(`[AutoFix] ✅ Added: ${added}`);
console.log(`[AutoFix] ⏭️  Skipped (exists): ${skipped}`);
console.log(`[AutoFix] ❌ Errors: ${errors}`);
console.log('[AutoFix] =========================================');

if (errors === 0) {
  console.log('[AutoFix] 🎉 Database schema fixed! You can now run: pnpm dev');
} else {
  console.log('[AutoFix] ⚠️  Some errors occurred. Check output above.');
}

db.close();
