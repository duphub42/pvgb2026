/**
 * Erstellt die fehlenden Preisrechner-Tabellen in Neon
 */
import './load-env'
import { Client } from 'pg'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('❌ DATABASE_URL fehlt')
  process.exit(1)
}

const sql = `
-- price_calc_categories
CREATE TABLE IF NOT EXISTS "price_calc_categories" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar NOT NULL,
  "sort_order" integer DEFAULT 0,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "price_calc_categories_sort_order_idx" ON "price_calc_categories" ("sort_order");

-- price_calc_items
CREATE TABLE IF NOT EXISTS "price_calc_items" (
  "id" serial PRIMARY KEY NOT NULL,
  "category_id" integer NOT NULL REFERENCES "price_calc_categories"("id") ON DELETE CASCADE,
  "title" varchar NOT NULL,
  "description" varchar,
  "sort_order" integer DEFAULT 0,
  "pricing_type" varchar DEFAULT 'once' NOT NULL,
  "once_min" integer,
  "once_max" integer,
  "monthly_min" integer,
  "monthly_max" integer,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "price_calc_items_category_idx" ON "price_calc_items" ("category_id");
CREATE INDEX IF NOT EXISTS "price_calc_items_sort_order_idx" ON "price_calc_items" ("sort_order");

-- price_calculator (global)
CREATE TABLE IF NOT EXISTS "price_calculator" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" varchar,
  "subtitle" varchar,
  "show_prices" boolean DEFAULT true,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- Initialer Eintrag für price_calculator global
INSERT INTO "price_calculator" ("title", "subtitle", "show_prices")
VALUES ('Preisrechner', 'Berechnen Sie Ihr individuelles Angebot', true)
ON CONFLICT DO NOTHING;
`

async function main() {
  const client = new Client({ connectionString: url })
  await client.connect()
  
  console.log('🔧 Erstelle Preisrechner-Tabellen...\n')
  
  try {
    await client.query(sql)
    console.log('✅ Preisrechner-Tabellen erstellt!')
    
    // Prüfen
    const check = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('price_calc_categories', 'price_calc_items', 'price_calculator')
    `)
    
    console.log(`\n📊 ${check.rows.length}/3 Tabellen jetzt vorhanden:`)
    check.rows.forEach(r => console.log(`   ✅ ${r.table_name}`))
    
  } catch (e) {
    console.error('❌ Fehler:', (e as Error).message)
    throw e
  } finally {
    await client.end()
  }
}

main().catch(() => process.exit(1))
