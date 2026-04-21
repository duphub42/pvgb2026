import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Create missing marquee slider block tables for Neon.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      CREATE TABLE IF NOT EXISTS "site_pages_blocks_marquee_slider" (
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
        "eyebrow" varchar DEFAULT 'Partner & Tools',
        "heading" varchar DEFAULT 'Unsere Partner',
        "intro" text,
        "block_name" varchar
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_order_idx" ON "site_pages_blocks_marquee_slider" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_parent_id_idx" ON "site_pages_blocks_marquee_slider" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_path_idx" ON "site_pages_blocks_marquee_slider" ("_path");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_block_background_image_idx" ON "site_pages_blocks_marquee_slider" ("block_background_image_id");

      CREATE TABLE IF NOT EXISTS "site_pages_blocks_marquee_slider_rows" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY,
        "direction" varchar DEFAULT 'left',
        "speed" integer DEFAULT 40,
        "pause_on_hover" boolean DEFAULT true
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_order_idx" ON "site_pages_blocks_marquee_slider_rows" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_parent_id_idx" ON "site_pages_blocks_marquee_slider_rows" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_items" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY,
        "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
        "name" varchar
      );

      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_items_order_idx" ON "site_pages_blocks_marquee_slider_rows_items" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_items_parent_id_idx" ON "site_pages_blocks_marquee_slider_rows_items" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_marquee_slider_rows_items_logo_idx" ON "site_pages_blocks_marquee_slider_rows_items" ("logo_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_marquee_slider" (
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
        "eyebrow" varchar DEFAULT 'Partner & Tools',
        "heading" varchar DEFAULT 'Unsere Partner',
        "intro" text,
        "_uuid" varchar,
        "block_name" varchar
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_order_idx" ON "_site_pages_v_blocks_marquee_slider" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_parent_id_idx" ON "_site_pages_v_blocks_marquee_slider" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_path_idx" ON "_site_pages_v_blocks_marquee_slider" ("_path");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_block_background_ima_idx" ON "_site_pages_v_blocks_marquee_slider" ("block_background_image_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" serial PRIMARY KEY,
        "direction" varchar DEFAULT 'left',
        "speed" integer DEFAULT 40,
        "pause_on_hover" boolean DEFAULT true
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_order_idx" ON "_site_pages_v_blocks_marquee_slider_rows" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_parent_id_idx" ON "_site_pages_v_blocks_marquee_slider_rows" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_items" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" serial PRIMARY KEY,
        "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
        "name" varchar
      );

      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_items_order_idx" ON "_site_pages_v_blocks_marquee_slider_rows_items" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_items_parent_id_idx" ON "_site_pages_v_blocks_marquee_slider_rows_items" ("_parent_id");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_marquee_slider_rows_items_logo_idx" ON "_site_pages_v_blocks_marquee_slider_rows_items" ("logo_id");
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      DROP TABLE IF EXISTS "_site_pages_v_blocks_marquee_slider_rows_items";
      DROP TABLE IF EXISTS "_site_pages_v_blocks_marquee_slider_rows";
      DROP TABLE IF EXISTS "_site_pages_v_blocks_marquee_slider";
      DROP TABLE IF EXISTS "site_pages_blocks_marquee_slider_rows_items";
      DROP TABLE IF EXISTS "site_pages_blocks_marquee_slider_rows";
      DROP TABLE IF EXISTS "site_pages_blocks_marquee_slider";
    `),
  )
}
