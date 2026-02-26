import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_media_type_mobile to site_pages and version_hero_media_type_mobile to _site_pages_v.
 * This matches the hero.mediaTypeMobile field in the collection schema so that
 * queries from Next.js and the Payload Admin for site-pages work on Neon/Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      ADD COLUMN IF NOT EXISTS "hero_media_type_mobile" varchar;
  `))

  try {
    await db.execute(sql.raw(`
      ALTER TABLE "public"."_site_pages_v"
        ADD COLUMN IF NOT EXISTS "version_hero_media_type_mobile" varchar;
    `))
  } catch {
    // Version table may not exist in some setups
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      DROP COLUMN IF EXISTS "hero_media_type_mobile";
  `))

  try {
    await db.execute(sql.raw(`
      ALTER TABLE "public"."_site_pages_v"
        DROP COLUMN IF EXISTS "version_hero_media_type_mobile";
    `))
  } catch {
    // Ignore if version table is missing
  }
}

