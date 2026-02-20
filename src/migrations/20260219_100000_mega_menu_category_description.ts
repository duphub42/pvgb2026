import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds categoryDescription (Kategoriebeschreibung) to mega-menu for the first dropdown column.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      ADD COLUMN IF NOT EXISTS "category_description" text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      DROP COLUMN IF EXISTS "category_description";
  `)
}
