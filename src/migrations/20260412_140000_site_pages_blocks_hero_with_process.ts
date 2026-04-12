import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block "Hero mit Prozess" (heroWithProcess):
 * - Hero copy (eyebrow, heading, text)
 * - Prozessüberschrift + Einleitung
 * - Steps-Array (Nummer, Titel, Untertitel, Text)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_hero_with_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "seo_h1" varchar,
      "hero_eyebrow" varchar,
      "hero_heading" varchar,
      "hero_text" varchar,
      "process_heading" varchar,
      "process_intro" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_order_idx" ON "site_pages_blocks_hero_with_process" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_parent_id_idx" ON "site_pages_blocks_hero_with_process" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_path_idx" ON "site_pages_blocks_hero_with_process" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_hero_with_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_hero_with_process"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "step_number" varchar,
      "title" varchar,
      "subtitle" varchar,
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_steps_order_idx" ON "site_pages_blocks_hero_with_process_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_steps_parent_id_idx" ON "site_pages_blocks_hero_with_process_steps" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_with_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "seo_h1" varchar,
      "hero_eyebrow" varchar,
      "hero_heading" varchar,
      "hero_text" varchar,
      "process_heading" varchar,
      "process_intro" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_order_idx" ON "_site_pages_v_blocks_hero_with_process" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_parent_id_idx" ON "_site_pages_v_blocks_hero_with_process" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_path_idx" ON "_site_pages_v_blocks_hero_with_process" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_hero_with_process"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "step_number" varchar,
      "title" varchar,
      "subtitle" varchar,
      "text" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_steps_order_idx" ON "_site_pages_v_blocks_hero_with_process_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_steps_parent_id_idx" ON "_site_pages_v_blocks_hero_with_process_steps" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_hero_with_process_steps";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_hero_with_process";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_hero_with_process_steps";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_hero_with_process";`))
}
