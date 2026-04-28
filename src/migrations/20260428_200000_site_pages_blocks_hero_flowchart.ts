import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block "Hero: Flowchart" (heroFlowchart):
 * - Hero copy (headline, subline, ctaLabel, ctaHref)
 * - flowNodes-Array (title, description, x, y)
 * - Alle blockStyleFields (sp, spt, smb, ct, bg, bs, br, oc, cs, an + background image)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Main block table (live pages)
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_hero_flowchart" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_spacing_padding" varchar DEFAULT 'default',
      "block_spacing_padding_top" varchar DEFAULT 'default',
      "block_spacing_margin_bottom" varchar DEFAULT 'default',
      "block_container" varchar DEFAULT 'default',
      "block_background" varchar DEFAULT 'none',
      "block_background_image_id" integer REFERENCES "media"("id"),
      "block_background_image_disable_inversion" boolean DEFAULT false,
      "block_border_enabled" boolean DEFAULT false,
      "block_border_style" varchar DEFAULT 'default',
      "block_border_radius" varchar DEFAULT 'default',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" numeric DEFAULT 0,
      "block_content_spacing" varchar DEFAULT 'default',
      "block_animation" varchar DEFAULT 'default',
      "headline" varchar NOT NULL,
      "subline" varchar,
      "cta_label" varchar,
      "cta_href" varchar NOT NULL,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_flowchart_order_idx"
      ON "site_pages_blocks_hero_flowchart" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_flowchart_parent_id_idx"
      ON "site_pages_blocks_hero_flowchart" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_flowchart_path_idx"
      ON "site_pages_blocks_hero_flowchart" ("_path");
  `),
  )

  // Child table: flowNodes (live)
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_hero_flowchart_flow_nodes" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_hero_flowchart"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "x" numeric NOT NULL,
      "y" numeric NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_flowchart_flow_nodes_order_idx"
      ON "site_pages_blocks_hero_flowchart_flow_nodes" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_flowchart_flow_nodes_parent_id_idx"
      ON "site_pages_blocks_hero_flowchart_flow_nodes" ("_parent_id");
  `),
  )

  // Version block table (_v)
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_spacing_padding" varchar DEFAULT 'default',
      "block_spacing_padding_top" varchar DEFAULT 'default',
      "block_spacing_margin_bottom" varchar DEFAULT 'default',
      "block_container" varchar DEFAULT 'default',
      "block_background" varchar DEFAULT 'none',
      "block_background_image_id" integer REFERENCES "media"("id"),
      "block_background_image_disable_inversion" boolean DEFAULT false,
      "block_border_enabled" boolean DEFAULT false,
      "block_border_style" varchar DEFAULT 'default',
      "block_border_radius" varchar DEFAULT 'default',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" numeric DEFAULT 0,
      "block_content_spacing" varchar DEFAULT 'default',
      "block_animation" varchar DEFAULT 'default',
      "headline" varchar,
      "subline" varchar,
      "cta_label" varchar,
      "cta_href" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_order_idx"
      ON "_site_pages_v_blocks_hero_flowchart" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_parent_id_idx"
      ON "_site_pages_v_blocks_hero_flowchart" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_path_idx"
      ON "_site_pages_v_blocks_hero_flowchart" ("_path");
  `),
  )

  // Version child table: flowNodes (_v)
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_flow_nodes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_hero_flowchart"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "description" varchar,
      "x" numeric,
      "y" numeric,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_flow_nodes_order_idx"
      ON "_site_pages_v_blocks_hero_flowchart_flow_nodes" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_flowchart_flow_nodes_parent_id_idx"
      ON "_site_pages_v_blocks_hero_flowchart_flow_nodes" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_hero_flowchart_flow_nodes";`),
  )
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_hero_flowchart";`))
  await db.execute(
    sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_hero_flowchart_flow_nodes";`),
  )
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_hero_flowchart";`))
}
