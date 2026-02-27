import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds version_hero_background_preset_id to _site_pages_v (versions table).
 * The main table (site_pages) already has hero_background_preset_id via
 * migration 20260226_110000, but the versions table was missed.
 * Without this column, loading pages with drafts/versions fails.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v"
      ADD COLUMN IF NOT EXISTS "version_hero_background_preset_id" integer;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v"
      DROP COLUMN IF EXISTS "version_hero_background_preset_id";
  `))
}
