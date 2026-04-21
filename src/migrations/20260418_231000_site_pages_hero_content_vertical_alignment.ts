import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
      ALTER TABLE "site_pages"
      ADD COLUMN IF NOT EXISTS "hero_content_vertical_alignment" text;
    `)

  await db.execute(`
      ALTER TABLE "_site_pages_v"
      ADD COLUMN IF NOT EXISTS "hero_content_vertical_alignment" text;
    `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
      ALTER TABLE "site_pages"
      DROP COLUMN IF EXISTS "hero_content_vertical_alignment";
    `)

  await db.execute(`
      ALTER TABLE "_site_pages_v"
      DROP COLUMN IF EXISTS "hero_content_vertical_alignment";
    `)
}
