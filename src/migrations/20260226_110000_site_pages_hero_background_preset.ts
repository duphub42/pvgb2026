import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_background_preset_id to site_pages.
 * This matches the hero.backgroundPreset relationship in the collection schema
 * so that queries in Next.js and the Payload Admin work against Neon/Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      ADD COLUMN IF NOT EXISTS "hero_background_preset_id" integer;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      DROP COLUMN IF EXISTS "hero_background_preset_id";
  `))
}

