import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_marquee_headline to site_pages (and _site_pages_v) for Philipp Bacher hero marquee.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      ADD COLUMN IF NOT EXISTS "hero_marquee_headline" varchar;
  `))
  try {
    await db.execute(sql.raw(`
      ALTER TABLE "public"."_site_pages_v"
        ADD COLUMN IF NOT EXISTS "version_hero_marquee_headline" varchar;
    `))
  } catch {
    // Version table may not exist in some setups
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      DROP COLUMN IF EXISTS "hero_marquee_headline";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v"
      DROP COLUMN IF EXISTS "version_hero_marquee_headline";
  `))
}
