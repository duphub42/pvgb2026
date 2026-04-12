import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Block "Radial Orbital Timeline" (radialOrbitalTimeline).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "radial_tl" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "section_title" varchar,
      "section_text" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "radial_tl_order_idx" ON "radial_tl" ("_order");
    CREATE INDEX IF NOT EXISTS "radial_tl_parent_id_idx" ON "radial_tl" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "radial_tl_path_idx" ON "radial_tl" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "radial_tl_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "radial_tl"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "date" varchar,
      "category" varchar,
      "icon" varchar DEFAULT 'Calendar',
      "status" varchar DEFAULT 'pending',
      "energy" integer DEFAULT 50,
      "content" varchar,
      "related_ids" varchar
    );
    CREATE INDEX IF NOT EXISTS "radial_tl_items_order_idx" ON "radial_tl_items" ("_order");
    CREATE INDEX IF NOT EXISTS "radial_tl_items_parent_id_idx" ON "radial_tl_items" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_radial_tl_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "section_title" varchar,
      "section_text" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_radial_tl_v_order_idx" ON "_radial_tl_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_id_idx" ON "_radial_tl_v" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_radial_tl_v_path_idx" ON "_radial_tl_v" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_radial_tl_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "date" varchar,
      "category" varchar,
      "icon" varchar DEFAULT 'Calendar',
      "status" varchar DEFAULT 'pending',
      "energy" integer DEFAULT 50,
      "content" varchar,
      "related_ids" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_order_idx" ON "_radial_tl_items_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_id_idx" ON "_radial_tl_items_v" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_radial_tl_items_v";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_radial_tl_v";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "radial_tl_items";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "radial_tl";`))
}
