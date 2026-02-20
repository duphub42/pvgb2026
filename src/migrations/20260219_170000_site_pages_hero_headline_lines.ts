import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_headline_line1, hero_headline_line2, hero_headline_line3 to site_pages
 * and version table for Philipp Bacher hero three-line headline.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      ADD COLUMN IF NOT EXISTS "hero_headline_line1" varchar,
      ADD COLUMN IF NOT EXISTS "hero_headline_line2" varchar,
      ADD COLUMN IF NOT EXISTS "hero_headline_line3" varchar;
  `))
  try {
    await db.execute(sql.raw(`
      ALTER TABLE "public"."_site_pages_v"
        ADD COLUMN IF NOT EXISTS "version_hero_headline_line1" varchar,
        ADD COLUMN IF NOT EXISTS "version_hero_headline_line2" varchar,
        ADD COLUMN IF NOT EXISTS "version_hero_headline_line3" varchar;
    `))
  } catch {
    // Version table may not exist in some setups; main table columns are required
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      DROP COLUMN IF EXISTS "hero_headline_line1",
      DROP COLUMN IF EXISTS "hero_headline_line2",
      DROP COLUMN IF EXISTS "hero_headline_line3";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v"
      DROP COLUMN IF EXISTS "version_hero_headline_line1",
      DROP COLUMN IF EXISTS "version_hero_headline_line2",
      DROP COLUMN IF EXISTS "version_hero_headline_line3";
  `))
}
