import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE IF EXISTS "_site_pages_v"
      ADD COLUMN IF NOT EXISTS "version_hero_content_vertical_alignment" text;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE IF EXISTS "_site_pages_v"
      DROP COLUMN IF EXISTS "version_hero_content_vertical_alignment";
    `),
  )
}
