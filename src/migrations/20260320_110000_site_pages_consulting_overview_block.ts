import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_consulting_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "headline" varchar,
      "intro_text" varchar,
      "strategy_label" varchar,
      "strategy_sub_label" varchar,
      "strategy_title" varchar,
      "strategy_text" varchar,
      "benefits_label" varchar,
      "benefits_sub_label" varchar,
      "benefits_title" varchar,
      "experience_label" varchar,
      "experience_sub_label" varchar,
      "experience_title" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_consulting_overview_order_idx" ON "site_pages_blocks_consulting_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_consulting_overview_parent_idx" ON "site_pages_blocks_consulting_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_consulting_overview_path_idx" ON "site_pages_blocks_consulting_overview" ("_path");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_consulting_overview_benefit_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_consulting_overview"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_consulting_overview_benefit_items_order_idx" ON "site_pages_blocks_consulting_overview_benefit_items" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_consulting_overview_benefit_items_parent_idx" ON "site_pages_blocks_consulting_overview_benefit_items" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_consulting_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "headline" varchar,
      "intro_text" varchar,
      "strategy_label" varchar,
      "strategy_sub_label" varchar,
      "strategy_title" varchar,
      "strategy_text" varchar,
      "benefits_label" varchar,
      "benefits_sub_label" varchar,
      "benefits_title" varchar,
      "experience_label" varchar,
      "experience_sub_label" varchar,
      "experience_title" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_order_idx" ON "_site_pages_v_blocks_consulting_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_parent_idx" ON "_site_pages_v_blocks_consulting_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_path_idx" ON "_site_pages_v_blocks_consulting_overview" ("_path");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_benefit_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_consulting_overview"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "text" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_benefit_items_order_idx" ON "_site_pages_v_blocks_consulting_overview_benefit_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_consulting_overview_benefit_items_parent_idx" ON "_site_pages_v_blocks_consulting_overview_benefit_items" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_consulting_overview_benefit_items";
    DROP TABLE IF EXISTS "_site_pages_v_blocks_consulting_overview";
    DROP TABLE IF EXISTS "site_pages_blocks_consulting_overview_benefit_items";
    DROP TABLE IF EXISTS "site_pages_blocks_consulting_overview";
  `))
}
