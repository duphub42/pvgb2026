import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds megaMenuLayout group (sidebarCols, contentCols, featuredCols) to header global.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "mega_menu_layout" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      DROP COLUMN IF EXISTS "mega_menu_layout";
  `)
}
