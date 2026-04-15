/**
 * Fügt fehlende _uuid Spalte hinzu (für Migration-Fehler)
 */
import './load-env'
import { Client } from 'pg'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('❌ DATABASE_URL fehlt')
  process.exit(1)
}

async function main() {
  const client = new Client({ connectionString: url })
  await client.connect()
  
  try {
    console.log('🔧 Prüfe _site_pages_v_version_hero_stats...')
    
    // Spalte hinzufügen falls nicht existiert
    await client.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' 
          AND table_name = '_site_pages_v_version_hero_stats' 
          AND column_name = '_uuid'
        ) THEN
          ALTER TABLE "_site_pages_v_version_hero_stats" ADD COLUMN "_uuid" varchar;
          RAISE NOTICE 'Spalte _uuid hinzugefügt';
        ELSE
          RAISE NOTICE 'Spalte _uuid existiert bereits';
        END IF;
      END $$;
    `)
    
    console.log('✅ OK - Spalte _uuid existiert jetzt')
    
    // Weitere fehlende Spalten prüfen
    const tables = [
      '_site_pages_v_blocks_pricingTable',
      '_site_pages_v_blocks_pricingTable_plans',
      '_site_pages_v_blocks_pricingTable_plans_features',
    ]
    
    for (const table of tables) {
      const check = await client.query(`
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1
      `, [table])
      
      if (check.rows.length === 0) {
        console.log(`⚠️ Tabelle ${table} fehlt (wird von Migrationen angelegt)`)
      }
    }
    
  } finally {
    await client.end()
  }
}

main().catch(e => {
  console.error('❌ Fehler:', e)
  process.exit(1)
})
