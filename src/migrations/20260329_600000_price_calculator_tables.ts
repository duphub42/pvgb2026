import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Preisrechner: Collections price-calc-categories / price-calc-items, Global price-calculator,
 * Layout-Block priceCalculator, Locked-Documents-Spalten.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TYPE "public"."enum_price_calc_items_pricing_type" AS ENUM('once', 'monthly', 'both');
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "price_calc_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "sort_order" integer DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "price_calc_items" (
      "id" serial PRIMARY KEY NOT NULL,
      "category_id" integer NOT NULL REFERENCES "public"."price_calc_categories"("id") ON DELETE CASCADE ON UPDATE no action,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "sort_order" integer DEFAULT 0,
      "pricing_type" "enum_price_calc_items_pricing_type" DEFAULT 'once' NOT NULL,
      "once_min" numeric,
      "once_max" numeric,
      "monthly_min" numeric,
      "monthly_max" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "price_calc_items_category_idx" ON "price_calc_items" ("category_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "price_calculator" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "section_label" varchar DEFAULT 'Preisrechner',
      "heading" varchar DEFAULT 'Was planen Sie?',
      "sub" varchar,
      "offer_button_label" varchar DEFAULT 'Angebot anfragen ↗',
      "offer_link" varchar DEFAULT '/kontakt',
      "empty_breakdown_message" varchar,
      "rates_section_label" varchar DEFAULT 'Stundensatz & Tagessatz',
      "rates_heading" varchar DEFAULT 'Für flexible & laufende Zusammenarbeit',
      "hourly_rate" numeric DEFAULT 120 NOT NULL,
      "day_rate" numeric DEFAULT 890 NOT NULL,
      "week_rate" numeric DEFAULT 3200 NOT NULL,
      "rates_note" varchar
    );
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_price_calculator" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "show_rates_section" boolean DEFAULT true,
      "section_label" varchar,
      "heading" varchar,
      "sub" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_price_calculator_order_idx" ON "site_pages_blocks_price_calculator" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_price_calculator_parent_id_idx" ON "site_pages_blocks_price_calculator" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_price_calculator_path_idx" ON "site_pages_blocks_price_calculator" ("_path");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_price_calculator" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "block_name" varchar,
      "show_rates_section" boolean DEFAULT true,
      "section_label" varchar,
      "heading" varchar,
      "sub" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_order_idx" ON "_site_pages_v_blocks_price_calculator" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_parent_id_idx" ON "_site_pages_v_blocks_price_calculator" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_path_idx" ON "_site_pages_v_blocks_price_calculator" ("_path");
  `))

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "price_calc_categories_id" integer REFERENCES "price_calc_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_price_calc_categories_id_idx"
    ON "payload_locked_documents_rels" USING btree ("price_calc_categories_id");
  `)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "price_calc_items_id" integer REFERENCES "price_calc_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_price_calc_items_id_idx"
    ON "payload_locked_documents_rels" USING btree ("price_calc_items_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_price_calc_items_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "price_calc_items_id";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_price_calc_categories_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "price_calc_categories_id";
  `))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_price_calculator";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_price_calculator";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "price_calculator";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "price_calc_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "price_calc_categories";`))
  await db.execute(sql.raw(`DROP TYPE IF EXISTS "public"."enum_price_calc_items_pricing_type";`))
}
