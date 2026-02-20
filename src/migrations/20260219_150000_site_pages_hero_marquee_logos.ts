import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Creates site_pages_hero_marquee_logos and version table for hero.marqueeLogos array.
 * Required for Philipp Bacher hero on Vercel Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_pages_hero_marquee_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "alt" varchar
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "alt" varchar
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_site_pages_v_version_hero_marquee_logos" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "site_pages_hero_marquee_logos" CASCADE;`)
}
