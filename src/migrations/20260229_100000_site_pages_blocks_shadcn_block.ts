import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds Shadcn Block: site_pages_blocks_shadcn_block und _site_pages_v_blocks_shadcn_block.
 * Ermöglicht Auswahl von Shadcnblocks-Komponenten (Feature 215b, About 15, Hero 238, …) im Seiten-Layout.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_shadcn_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "variant" varchar NOT NULL,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_shadcn_block_order_idx" ON "site_pages_blocks_shadcn_block" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_shadcn_block_parent_id_idx" ON "site_pages_blocks_shadcn_block" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_shadcn_block_path_idx" ON "site_pages_blocks_shadcn_block" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_shadcn_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "variant" varchar NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_shadcn_block_order_idx" ON "_site_pages_v_blocks_shadcn_block" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_shadcn_block_parent_id_idx" ON "_site_pages_v_blocks_shadcn_block" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_shadcn_block_path_idx" ON "_site_pages_v_blocks_shadcn_block" ("_path");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_shadcn_block";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_shadcn_block";`))
}
