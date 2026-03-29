import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block „Leistungen Überblick“ (servicesOverview): heading, intro, services-Array.
 * War nur per SQLite-Fix/Drizzle-Push lokal vorhanden – für Neon/Vercel fehlte die Migration.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_services_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_overview_order_idx" ON "site_pages_blocks_services_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_overview_parent_id_idx" ON "site_pages_blocks_services_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_overview_path_idx" ON "site_pages_blocks_services_overview" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_services_overview_services" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_services_overview"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'compass',
      "title" varchar,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_overview_services_order_idx" ON "site_pages_blocks_services_overview_services" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_services_overview_services_parent_id_idx" ON "site_pages_blocks_services_overview_services" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_overview_order_idx" ON "_site_pages_v_blocks_services_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_overview_parent_id_idx" ON "_site_pages_v_blocks_services_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_overview_path_idx" ON "_site_pages_v_blocks_services_overview" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_overview_services" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_services_overview"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'compass',
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_overview_services_order_idx" ON "_site_pages_v_blocks_services_overview_services" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_overview_services_parent_id_idx" ON "_site_pages_v_blocks_services_overview_services" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_services_overview_services";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_services_overview";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_services_overview_services";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_services_overview";`))
}
