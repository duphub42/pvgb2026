#!/usr/bin/env node
// Apply column additions with error handling

import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'payload.db');
console.log(`[Fix] Opening database: ${dbPath}`);

const db = new DatabaseSync(dbPath);

const sqlFile = path.resolve(process.cwd(), 'drizzle/20260415230000_add_missing_hero_columns.sql');
console.log(`[Fix] Reading SQL from: ${sqlFile}`);

const sql = fs.readFileSync(sqlFile, 'utf8');

// Split into individual statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`[Fix] Executing ${statements.length} ALTER TABLE statements...`);

let successCount = 0;
let skipCount = 0;

for (const statement of statements) {
  try {
    db.exec(statement + ';');
    console.log(`[Fix] ✅ ${statement.slice(0, 60)}...`);
    successCount++;
  } catch (err) {
    if (err.message?.includes('duplicate column name') || err.message?.includes('already exists')) {
      console.log(`[Fix] ⏭️  Column already exists, skipping`);
      skipCount++;
    } else {
      console.error(`[Fix] ⚠️  Error: ${err.message}`);
    }
  }
}

console.log(`[Fix] ✅ Done! ${successCount} added, ${skipCount} skipped`);
db.close();
