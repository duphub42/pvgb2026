#!/usr/bin/env node
// Check which columns exist in _site_pages_v

import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'payload.db');
console.log(`[Check] Opening database: ${dbPath}`);

const db = new DatabaseSync(dbPath);

// Get columns from _site_pages_v
const columns = db.prepare(`PRAGMA table_info(_site_pages_v)`).all();
console.log('\n[Check] Columns in _site_pages_v:');
const columnNames = columns.map(c => c.name);

// Check for hero portrait columns
const heroPortraitCols = columnNames.filter(n => n.includes('portrait'));
console.log('\nHero portrait columns:', heroPortraitCols);

// Check all version_hero columns
const heroCols = columnNames.filter(n => n.startsWith('version_hero'));
console.log(`\nAll version_hero columns (${heroCols.length}):`);
heroCols.sort().forEach(c => console.log(`  - ${c}`));

// Is version_hero_portrait_id missing?
if (!columnNames.includes('version_hero_portrait_id')) {
  console.log('\n❌ version_hero_portrait_id IS MISSING!');
  console.log('Need to add it now...');

  try {
    db.exec(`ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_portrait_id" integer REFERENCES "media"("id")`);
    console.log('✅ version_hero_portrait_id added successfully!');
  } catch (err) {
    console.error('❌ Error adding column:', err.message);
  }
} else {
  console.log('\n✅ version_hero_portrait_id exists');
}

db.close();
