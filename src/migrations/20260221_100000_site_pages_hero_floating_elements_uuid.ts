import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds _uuid to hero floating_elements tables (Payload expects _uuid on array rows).
 * Fixes: column _site_pages_v_version_hero_floating_elements._uuid does not exist
 * when deleting site-pages versions during import --replace.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_pages_hero_floating_elements"
      ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v_version_hero_floating_elements"
      ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "site_pages_hero_floating_elements" DROP COLUMN IF EXISTS "_uuid";`)
  await db.execute(sql`ALTER TABLE "_site_pages_v_version_hero_floating_elements" DROP COLUMN IF EXISTS "_uuid";`)
}
