import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Creates site_pages_hero_floating_elements and version table for hero.floatingElements array.
 * Required for Philipp Bacher hero with floating elements on Vercel Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_pages_hero_floating_elements" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "link_url" varchar,
      "link_new_tab" boolean DEFAULT false,
      "position" varchar DEFAULT 'topRight',
      "offset_x" double precision DEFAULT 0,
      "offset_y" double precision DEFAULT 0
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_floating_elements" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "link_url" varchar,
      "link_new_tab" boolean DEFAULT false,
      "position" varchar DEFAULT 'topRight',
      "offset_x" double precision DEFAULT 0,
      "offset_y" double precision DEFAULT 0
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_site_pages_v_version_hero_floating_elements" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "site_pages_hero_floating_elements" CASCADE;`)
}
