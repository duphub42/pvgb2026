import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Create PortfolioTeaser block tables.
 * Tables:
 *   - site_pages_blocks_portfolio_teaser         (main block)
 *   - site_pages_blocks_portfolio_teaser_areas   (nested areas array)
 *   - site_pages_blocks_portfolio_teaser_areas_tags (nested tags within areas)
 *   - _site_pages_v_blocks_portfolio_teaser      (draft/version)
 *   - _site_pages_v_blocks_portfolio_teaser_areas
 *   - _site_pages_v_blocks_portfolio_teaser_areas_tags
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      -- -----------------------------------------------------------------------
      -- MAIN TABLES
      -- -----------------------------------------------------------------------

      CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_teaser" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY,
        "block_spacing_padding" varchar DEFAULT 'default',
        "block_spacing_padding_top" varchar DEFAULT 'default',
        "block_spacing_margin_bottom" varchar DEFAULT 'default',
        "block_container" varchar DEFAULT 'default',
        "block_background" varchar DEFAULT 'none',
        "block_background_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
        "block_background_image_disable_inversion" boolean DEFAULT false,
        "block_border_enabled" boolean DEFAULT false,
        "block_border_style" varchar DEFAULT 'default',
        "block_border_radius" varchar DEFAULT 'default',
        "block_overlay_enabled" boolean DEFAULT false,
        "block_overlay_color" varchar DEFAULT 'dark',
        "block_overlay_opacity" numeric DEFAULT 0,
        "block_content_spacing" varchar DEFAULT 'default',
        "block_animation" varchar DEFAULT 'default',
        "eyebrow" varchar DEFAULT 'Leistungsbereiche',
        "heading" varchar DEFAULT 'Webdesign, Marketing & Branding',
        "intro" text,
        "variant" varchar DEFAULT 'cards',
        "block_name" varchar
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_order_idx"
        ON "site_pages_blocks_portfolio_teaser" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_parent_id_idx"
        ON "site_pages_blocks_portfolio_teaser" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_path_idx"
        ON "site_pages_blocks_portfolio_teaser" ("_path");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_bg_image_idx"
        ON "site_pages_blocks_portfolio_teaser" ("block_background_image_id");

      -- Areas array
      CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY,
        "discipline" varchar,
        "title" varchar NOT NULL,
        "description" text,
        "href" varchar,
        "cta_label" varchar DEFAULT 'Cases ansehen',
        "cover_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_order_idx"
        ON "site_pages_blocks_portfolio_teaser_areas" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_parent_id_idx"
        ON "site_pages_blocks_portfolio_teaser_areas" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_cover_image_idx"
        ON "site_pages_blocks_portfolio_teaser_areas" ("cover_image_id");

      -- Tags (nested within areas)
      CREATE TABLE IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_tags" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY,
        "label" varchar NOT NULL
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_tags_order_idx"
        ON "site_pages_blocks_portfolio_teaser_areas_tags" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_portfolio_teaser_areas_tags_parent_id_idx"
        ON "site_pages_blocks_portfolio_teaser_areas_tags" ("_parent_id");

      -- -----------------------------------------------------------------------
      -- VERSION TABLES (drafts)
      -- -----------------------------------------------------------------------

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" serial PRIMARY KEY,
        "block_spacing_padding" varchar DEFAULT 'default',
        "block_spacing_padding_top" varchar DEFAULT 'default',
        "block_spacing_margin_bottom" varchar DEFAULT 'default',
        "block_container" varchar DEFAULT 'default',
        "block_background" varchar DEFAULT 'none',
        "block_background_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
        "block_background_image_disable_inversion" boolean DEFAULT false,
        "block_border_enabled" boolean DEFAULT false,
        "block_border_style" varchar DEFAULT 'default',
        "block_border_radius" varchar DEFAULT 'default',
        "block_overlay_enabled" boolean DEFAULT false,
        "block_overlay_color" varchar DEFAULT 'dark',
        "block_overlay_opacity" numeric DEFAULT 0,
        "block_content_spacing" varchar DEFAULT 'default',
        "block_animation" varchar DEFAULT 'default',
        "eyebrow" varchar DEFAULT 'Leistungsbereiche',
        "heading" varchar DEFAULT 'Webdesign, Marketing & Branding',
        "intro" text,
        "variant" varchar DEFAULT 'cards',
        "_uuid" varchar,
        "block_name" varchar
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_order_idx"
        ON "_site_pages_v_blocks_portfolio_teaser" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_parent_id_idx"
        ON "_site_pages_v_blocks_portfolio_teaser" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_path_idx"
        ON "_site_pages_v_blocks_portfolio_teaser" ("_path");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_bg_image_idx"
        ON "_site_pages_v_blocks_portfolio_teaser" ("block_background_image_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" serial PRIMARY KEY,
        "discipline" varchar,
        "title" varchar,
        "description" text,
        "href" varchar,
        "cta_label" varchar DEFAULT 'Cases ansehen',
        "cover_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_order_idx"
        ON "_site_pages_v_blocks_portfolio_teaser_areas" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_parent_id_idx"
        ON "_site_pages_v_blocks_portfolio_teaser_areas" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_tags" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" serial PRIMARY KEY,
        "label" varchar
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_tags_order_idx"
        ON "_site_pages_v_blocks_portfolio_teaser_areas_tags" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_tags_parent_id_idx"
        ON "_site_pages_v_blocks_portfolio_teaser_areas_tags" ("_parent_id");
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      DROP TABLE IF EXISTS "site_pages_blocks_portfolio_teaser_areas_tags";
      DROP TABLE IF EXISTS "site_pages_blocks_portfolio_teaser_areas";
      DROP TABLE IF EXISTS "site_pages_blocks_portfolio_teaser";
      DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_teaser_areas_tags";
      DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_teaser_areas";
      DROP TABLE IF EXISTS "_site_pages_v_blocks_portfolio_teaser";
    `),
  )
}
