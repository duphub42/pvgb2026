import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block „Einleitung“ (introduction): heading, body, tagline, optionales Bild.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_introduction" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "heading" varchar,
      "body" varchar,
      "tagline" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_introduction_order_idx" ON "site_pages_blocks_introduction" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_introduction_parent_id_idx" ON "site_pages_blocks_introduction" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_introduction_path_idx" ON "site_pages_blocks_introduction" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_introduction" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "heading" varchar,
      "body" varchar,
      "tagline" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_introduction_order_idx" ON "_site_pages_v_blocks_introduction" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_introduction_parent_id_idx" ON "_site_pages_v_blocks_introduction" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_introduction_path_idx" ON "_site_pages_v_blocks_introduction" ("_path");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_introduction";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_introduction";`))
}
