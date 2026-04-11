import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair migration for environments where portfolio dbName tables are missing.
 * Ensures runtime-expected tables for portfolio_grid / portfolio_kpis exist.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "layout_variant" varchar DEFAULT 'editorial',
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_order_idx" ON "portfolio_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_parent_id_idx" ON "portfolio_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_path_idx" ON "portfolio_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_cases" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "discipline" varchar DEFAULT 'webdesign',
      "title" varchar,
      "client" varchar,
      "industry" varchar,
      "summary" varchar,
      "challenge" varchar,
      "approach" varchar,
      "result" varchar,
      "cover_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "cta_label" varchar,
      "cta_href" varchar,
      "featured" boolean DEFAULT false
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_order_idx" ON "portfolio_grid_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_parent_id_idx" ON "portfolio_grid_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_cover_image_idx" ON "portfolio_grid_cases" ("cover_image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_metrics_order_idx" ON "portfolio_grid_cases_metrics" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_metrics_parent_id_idx" ON "portfolio_grid_cases_metrics" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_grid_cases_tags" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_tags_order_idx" ON "portfolio_grid_cases_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_grid_cases_tags_parent_id_idx" ON "portfolio_grid_cases_tags" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "layout_variant" varchar DEFAULT 'editorial',
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_order_idx" ON "_portfolio_grid_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_parent_id_idx" ON "_portfolio_grid_v" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_path_idx" ON "_portfolio_grid_v" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_cases" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "discipline" varchar DEFAULT 'webdesign',
      "title" varchar,
      "client" varchar,
      "industry" varchar,
      "summary" varchar,
      "challenge" varchar,
      "approach" varchar,
      "result" varchar,
      "cover_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "cta_label" varchar,
      "cta_href" varchar,
      "featured" boolean DEFAULT false,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_order_idx" ON "_portfolio_grid_v_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_parent_id_idx" ON "_portfolio_grid_v_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_cover_image_idx" ON "_portfolio_grid_v_cases" ("cover_image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_cases_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_metrics_order_idx" ON "_portfolio_grid_v_cases_metrics" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_metrics_parent_id_idx" ON "_portfolio_grid_v_cases_metrics" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_grid_v_cases_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_grid_v_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_tags_order_idx" ON "_portfolio_grid_v_cases_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_grid_v_cases_tags_parent_id_idx" ON "_portfolio_grid_v_cases_tags" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_kpis" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "variant" varchar DEFAULT 'glass',
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_kpis_order_idx" ON "portfolio_kpis" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_kpis_parent_id_idx" ON "portfolio_kpis" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_kpis_path_idx" ON "portfolio_kpis" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "portfolio_kpis_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "portfolio_kpis"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_kpis_items_order_idx" ON "portfolio_kpis_items" ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_kpis_items_parent_id_idx" ON "portfolio_kpis_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_kpis_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "eyebrow" varchar,
      "heading" varchar,
      "intro" varchar,
      "variant" varchar DEFAULT 'glass',
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_kpis_v_order_idx" ON "_portfolio_kpis_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_kpis_v_parent_id_idx" ON "_portfolio_kpis_v" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_kpis_v_path_idx" ON "_portfolio_kpis_v" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_portfolio_kpis_v_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_portfolio_kpis_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_kpis_v_items_order_idx" ON "_portfolio_kpis_v_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_kpis_v_items_parent_id_idx" ON "_portfolio_kpis_v_items" ("_parent_id");
  `),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Keep data intact on rollback: this migration is repair-only.
}
