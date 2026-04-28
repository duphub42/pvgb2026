import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_show_hero_stats boolean column to site_pages and _site_pages_v.
 * The hero_stats rows table already exists from 20260331_120000_site_pages_hero_stats.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_show_hero_stats" boolean DEFAULT false;
  `)

  await db.execute(`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_show_hero_stats" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_pages"
    DROP COLUMN IF EXISTS "hero_show_hero_stats";
  `)

  await db.execute(`
    ALTER TABLE "_site_pages_v"
    DROP COLUMN IF EXISTS "version_hero_show_hero_stats";
  `)
}
