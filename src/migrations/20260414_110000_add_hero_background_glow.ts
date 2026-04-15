import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages" 
      ADD COLUMN IF NOT EXISTS "hero_background_glow" boolean DEFAULT true;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v" 
      ADD COLUMN IF NOT EXISTS "hero_background_glow" boolean DEFAULT true;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages" 
      DROP COLUMN IF EXISTS "hero_background_glow";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v" 
      DROP COLUMN IF EXISTS "hero_background_glow";
    `),
  )
}
