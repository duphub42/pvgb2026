import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_badge to site_pages and version tables for the new Pro Athlete hero.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "site_pages"
      ADD COLUMN IF NOT EXISTS "hero_badge" varchar;
    `,
  )
  await db.execute(
    sql`
      ALTER TABLE "_site_pages_v"
      ADD COLUMN IF NOT EXISTS "version_hero_badge" varchar;
    `,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_badge";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_badge";`)
}
