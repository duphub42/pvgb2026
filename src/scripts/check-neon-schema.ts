/**
 * Prüft welche Tabellen in Neon fehlen
 */
import './load-env'
import { Client } from 'pg'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('❌ DATABASE_URL fehlt')
  process.exit(1)
}

// Tabellen die existieren sollten (aus drizzle/meta/_journal.json)
const expectedTables = [
  'site_pages',
  'site_pages_v',
  '_site_pages_v',
  'mega_menu',
  'media',
  'users',
  'price_calc_categories',
  'price_calc_items',
  'header',
  'footer',
  'design',
  'theme_settings',
  'price_calculator',
]

async function main() {
  const client = new Client({ connectionString: url })
  await client.connect()
  
  console.log('📋 Neon Schema-Check\n')
  
  for (const table of expectedTables) {
    const res = await client.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = $1
    `, [table])
    
    const exists = res.rows.length > 0
    console.log(`${exists ? '✅' : '❌'} ${table}`)
  }
  
  // Alle existierenden Tabellen anzeigen
  const allTables = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `)
  
  console.log(`\n📊 Insgesamt ${allTables.rows.length} Tabellen in Neon`)
  
  await client.end()
}

main().catch(console.error)
