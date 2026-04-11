import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds portfolio-specific blocks for site_pages:
 * - portfolioCaseGrid
 * - portfolioKpiStrip
 * - brandShowcase
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_case_grid" (
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
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_order_idx" ON "site_pages_blocks_portfolio_case_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_parent_id_idx" ON "site_pages_blocks_portfolio_case_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_path_idx" ON "site_pages_blocks_portfolio_case_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_portfolio_case_grid"("id") ON DELETE CASCADE,
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
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_order_idx" ON "site_pages_blocks_portfolio_case_grid_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_parent_id_idx" ON "site_pages_blocks_portfolio_case_grid_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_cover_image_idx" ON "site_pages_blocks_portfolio_case_grid_cases" ("cover_image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_portfolio_case_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_metrics_order_idx" ON "site_pages_blocks_portfolio_case_grid_cases_metrics" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_metrics_parent_id_idx" ON "site_pages_blocks_portfolio_case_grid_cases_metrics" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_tags" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_portfolio_case_grid_cases"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_tags_order_idx" ON "site_pages_blocks_portfolio_case_grid_cases_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_case_grid_cases_tags_parent_id_idx" ON "site_pages_blocks_portfolio_case_grid_cases_tags" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid" (
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
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_order_idx" ON "_site_pages_v_blocks_portfolio_case_grid" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_parent_id_idx" ON "_site_pages_v_blocks_portfolio_case_grid" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_path_idx" ON "_site_pages_v_blocks_portfolio_case_grid" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolio_case_grid"("id") ON DELETE CASCADE,
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
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_order_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_parent_id_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_cover_image_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases" ("cover_image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolio_case_grid_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_metrics_order_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases_metrics" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_metrics_parent_id_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases_metrics" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolio_case_grid_cases"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_tags_order_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_tags_parent_id_idx" ON "_site_pages_v_blocks_portfolio_case_grid_cases_tags" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip" (
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
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_order_idx" ON "site_pages_blocks_portfolio_kpi_strip" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_parent_id_idx" ON "site_pages_blocks_portfolio_kpi_strip" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_path_idx" ON "site_pages_blocks_portfolio_kpi_strip" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_portfolio_kpi_strip"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_items_order_idx" ON "site_pages_blocks_portfolio_kpi_strip_items" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_kpi_strip_items_parent_id_idx" ON "site_pages_blocks_portfolio_kpi_strip_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip" (
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
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_order_idx" ON "_site_pages_v_blocks_portfolio_kpi_strip" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_parent_id_idx" ON "_site_pages_v_blocks_portfolio_kpi_strip" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_path_idx" ON "_site_pages_v_blocks_portfolio_kpi_strip" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_portfolio_kpi_strip"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar,
      "context" varchar,
      "trend" varchar DEFAULT 'up',
      "delta" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_items_order_idx" ON "_site_pages_v_blocks_portfolio_kpi_strip_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_items_parent_id_idx" ON "_site_pages_v_blocks_portfolio_kpi_strip_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_brand_showcase" (
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
      "brand_story" varchar,
      "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "wordmark_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_order_idx" ON "site_pages_blocks_brand_showcase" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_parent_id_idx" ON "site_pages_blocks_brand_showcase" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_path_idx" ON "site_pages_blocks_brand_showcase" ("_path");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_logo_idx" ON "site_pages_blocks_brand_showcase" ("logo_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_wordmark_idx" ON "site_pages_blocks_brand_showcase" ("wordmark_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_brand_showcase_palette" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "hex" varchar,
      "usage" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_palette_order_idx" ON "site_pages_blocks_brand_showcase_palette" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_palette_parent_id_idx" ON "site_pages_blocks_brand_showcase_palette" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_brand_showcase_typography" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "role" varchar,
      "family" varchar,
      "sample" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_typography_order_idx" ON "site_pages_blocks_brand_showcase_typography" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_typography_parent_id_idx" ON "site_pages_blocks_brand_showcase_typography" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_brand_showcase_principles" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_principles_order_idx" ON "site_pages_blocks_brand_showcase_principles" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_principles_parent_id_idx" ON "site_pages_blocks_brand_showcase_principles" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_brand_showcase_usage_examples" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "caption" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_usage_examples_order_idx" ON "site_pages_blocks_brand_showcase_usage_examples" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_usage_examples_parent_id_idx" ON "site_pages_blocks_brand_showcase_usage_examples" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_brand_showcase_usage_examples_image_idx" ON "site_pages_blocks_brand_showcase_usage_examples" ("image_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_brand_showcase" (
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
      "brand_story" varchar,
      "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "wordmark_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_order_idx" ON "_site_pages_v_blocks_brand_showcase" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_parent_id_idx" ON "_site_pages_v_blocks_brand_showcase" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_path_idx" ON "_site_pages_v_blocks_brand_showcase" ("_path");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_logo_idx" ON "_site_pages_v_blocks_brand_showcase" ("logo_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_wordmark_idx" ON "_site_pages_v_blocks_brand_showcase" ("wordmark_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_palette" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "name" varchar,
      "hex" varchar,
      "usage" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_palette_order_idx" ON "_site_pages_v_blocks_brand_showcase_palette" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_palette_parent_id_idx" ON "_site_pages_v_blocks_brand_showcase_palette" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_typography" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "role" varchar,
      "family" varchar,
      "sample" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_typography_order_idx" ON "_site_pages_v_blocks_brand_showcase_typography" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_typography_parent_id_idx" ON "_site_pages_v_blocks_brand_showcase_typography" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_principles" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_principles_order_idx" ON "_site_pages_v_blocks_brand_showcase_principles" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_principles_parent_id_idx" ON "_site_pages_v_blocks_brand_showcase_principles" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_usage_examples" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_brand_showcase"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "caption" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_usage_examples_order_idx" ON "_site_pages_v_blocks_brand_showcase_usage_examples" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_usage_examples_parent_id_idx" ON "_site_pages_v_blocks_brand_showcase_usage_examples" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_brand_showcase_usage_examples_image_idx" ON "_site_pages_v_blocks_brand_showcase_usage_examples" ("image_id");
  `),
  )

  // Rename portfolio block tables to match dbName-based runtime names
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid" RENAME TO "portfolio_grid";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid_cases'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid_cases'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid_cases" RENAME TO "portfolio_grid_cases";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid_cases_metrics'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid_cases_metrics'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid_cases_metrics" RENAME TO "portfolio_grid_cases_metrics";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_case_grid_cases_tags'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_grid_cases_tags'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_case_grid_cases_tags" RENAME TO "portfolio_grid_cases_tags";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_case_grid'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_case_grid" RENAME TO "_portfolio_grid_v";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_case_grid_cases'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_cases'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_case_grid_cases" RENAME TO "_portfolio_grid_v_cases";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_case_grid_cases_metrics'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_cases_metrics'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_case_grid_cases_metrics" RENAME TO "_portfolio_grid_v_cases_metrics";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_case_grid_cases_tags'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_grid_v_cases_tags'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_case_grid_cases_tags" RENAME TO "_portfolio_grid_v_cases_tags";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_kpi_strip'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_kpis'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_kpi_strip" RENAME TO "portfolio_kpis";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'site_pages_blocks_portfolio_kpi_strip_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'portfolio_kpis_items'
      ) THEN
        ALTER TABLE "site_pages_blocks_portfolio_kpi_strip_items" RENAME TO "portfolio_kpis_items";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_kpi_strip'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_kpis_v'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_kpi_strip" RENAME TO "_portfolio_kpis_v";
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_site_pages_v_blocks_portfolio_kpi_strip_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_portfolio_kpis_v_items'
      ) THEN
        ALTER TABLE "_site_pages_v_blocks_portfolio_kpi_strip_items" RENAME TO "_portfolio_kpis_v_items";
      END IF;
    END $$;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_brand_showcase_usage_examples";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_brand_showcase_principles";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_brand_showcase_typography";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_brand_showcase_palette";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_brand_showcase";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_brand_showcase_usage_examples";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_brand_showcase_principles";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_brand_showcase_typography";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_brand_showcase_palette";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_brand_showcase";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_kpis_v_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_kpis_v";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_kpis_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_kpis";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_kpi_strip_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_kpi_strip";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_kpi_strip_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_kpi_strip";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v_cases_tags";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v_cases_metrics";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v_cases";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_portfolio_grid_v";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid_cases_tags";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid_cases_metrics";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid_cases";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "portfolio_grid";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_tags";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases_metrics";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_case_grid_cases";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_case_grid";`))

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_case_grid_cases_tags";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_case_grid_cases_metrics";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_case_grid_cases";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_portfolio_case_grid";`))
}
