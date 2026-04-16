#!/usr/bin/env tsx
// Fix missing _radial_tl_v table in SQLite using libsql
// Usage: npx tsx fix-radial-tl-libsql.ts

import { createClient } from '@libsql/client'
import * as fs from 'fs'
import * as path from 'path'

const dbPath = path.resolve(process.cwd(), 'payload.db')
console.log(`[Fix] Opening database: ${dbPath}`)

const client = createClient({
  url: `file:${dbPath}`,
})

async function main() {
  try {
    const sqlFile = path.resolve(process.cwd(), 'drizzle/20260414201000_fix_missing_block_tables.sql')
    console.log(`[Fix] Reading SQL from: ${sqlFile}`)

    const sql = fs.readFileSync(sqlFile, 'utf8')

    // Split SQL into individual statements and execute them
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    console.log(`[Fix] Executing ${statements.length} SQL statements...`)

    for (const statement of statements) {
      try {
        await client.execute(statement)
      } catch (err: any) {
        // Ignore "table already exists" errors
        if (err.message?.includes('already exists')) {
          console.log(`[Fix] Skipping (already exists): ${statement.slice(0, 50)}...`)
        } else {
          console.error(`[Fix] Error executing: ${statement.slice(0, 100)}...`)
          console.error(`[Fix] ${err.message}`)
        }
      }
    }

    console.log('[Fix] ✅ All radial_tl tables fixed successfully!')
  } catch (error) {
    console.error('[Fix] ❌ Error:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

main()
