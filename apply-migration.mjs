#!/usr/bin/env node
// Simple script to apply SQL migration using node:sqlite (Node.js 22+)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if node:sqlite is available (Node.js 22+)
try {
  const { DatabaseSync } = await import('node:sqlite');
  console.log('[Fix] Using node:sqlite (Node.js 22+)');

  const dbPath = path.resolve(process.cwd(), 'payload.db');
  console.log(`[Fix] Opening database: ${dbPath}`);

  const db = new DatabaseSync(dbPath);

  const sqlFile = path.resolve(process.cwd(), 'drizzle/20260414201000_fix_missing_block_tables.sql');
  console.log(`[Fix] Reading SQL from: ${sqlFile}`);

  const sql = fs.readFileSync(sqlFile, 'utf8');

  // Execute SQL
  console.log('[Fix] Executing SQL...');
  db.exec(sql);

  console.log('[Fix] ✅ Migration applied successfully!');
  db.close();
} catch (err) {
  console.error('[Fix] ❌ Error:', err.message);
  if (err.code === 'ERR_UNKNOWN_BUILTIN_MODULE') {
    console.error('[Fix] node:sqlite not available. Please use Node.js 22+ or install sqlite3 CLI');
    console.error('[Fix] Alternative: rm payload.db && pnpm dev (löscht Daten!)');
  }
  process.exit(1);
}
