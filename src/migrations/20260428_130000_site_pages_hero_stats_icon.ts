import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_pages_hero_stats"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)

  await db.execute(`
    ALTER TABLE "_site_pages_v_version_hero_stats"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "site_pages_hero_stats"
    DROP COLUMN IF EXISTS "icon";
  `)

  await db.execute(`
    ALTER TABLE "_site_pages_v_version_hero_stats"
    DROP COLUMN IF EXISTS "icon";
  `)
}
