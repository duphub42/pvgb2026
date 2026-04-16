#!/usr/bin/env node
// Add missing block_spacing columns to block tables

import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'payload.db');
console.log(`[Fix] Opening database: ${dbPath}`);

const db = new DatabaseSync(dbPath);

// Tables that should have block_spacing columns
const blockTables = [
  '_site_pages_v_blocks_hero_marketing',
  '_site_pages_v_blocks_hero_with_process',
  '_site_pages_v_blocks_introduction',
  '_site_pages_v_blocks_services_overview',
  '_site_pages_v_blocks_why_work_with_me',
  '_site_pages_v_blocks_cta',
  '_site_pages_v_blocks_content',
  '_site_pages_v_blocks_media_block',
  '_site_pages_v_blocks_archive',
  '_site_pages_v_blocks_form_block',
  '_site_pages_v_blocks_price_calculator',
  '_site_pages_v_blocks_consulting_overview',
  '_site_pages_v_blocks_cal_popup',
  '_site_pages_v_blocks_brand_showcase',
  '_prof_ueber_v',
  '_prof_kern_v',
  '_prof_skills_v',
  '_prof_weg_v',
  '_prof_zahl_v',
  '_prof_tools_v',
  '_prof_lang_zert_v',
  '_prof_cta_v',
  '_pricing_table_v',
  '_portfolio_kpis_v',
  '_portfolio_grid_v',
  '_contact_cards_v',
  '_radial_tl_v',
];

const spacingColumns = [
  'block_spacing_padding',
  'block_spacing_padding_top',
  'block_spacing_margin_bottom',
  'block_container',
  'block_background',
  'block_border_enabled',
  'block_border_style',
  'block_border_radius',
  'block_overlay_enabled',
  'block_overlay_color',
  'block_overlay_opacity',
  'block_content_spacing',
  'block_animation'
];

let addedCount = 0;
let skipCount = 0;
let errorCount = 0;

for (const table of blockTables) {
  // Check if table exists
  const tableExists = db.prepare(
    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`
  ).get(table);

  if (!tableExists) {
    console.log(`[Fix] ⏭️  Table ${table} doesn't exist, skipping`);
    skipCount++;
    continue;
  }

  // Get existing columns
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  const columnNames = columns.map(c => c.name);

  for (const col of spacingColumns) {
    if (!columnNames.includes(col)) {
      try {
        const dataType = col.includes('enabled') || col.includes('opacity') ? 'integer' : 'varchar';
        db.exec(`ALTER TABLE "${table}" ADD COLUMN "${col}" ${dataType}`);
        console.log(`[Fix] ✅ ${table}.${col} added`);
        addedCount++;
      } catch (err) {
        if (err.message?.includes('duplicate column')) {
          console.log(`[Fix] ⏭️  ${table}.${col} already exists`);
          skipCount++;
        } else {
          console.error(`[Fix] ❌ ${table}.${col}: ${err.message}`);
          errorCount++;
        }
      }
    }
  }
}

console.log(`\n[Fix] Done! ${addedCount} added, ${skipCount} skipped, ${errorCount} errors`);
db.close();
