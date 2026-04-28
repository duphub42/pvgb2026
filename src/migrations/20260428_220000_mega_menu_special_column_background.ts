import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds background image + overlay controls to MegaMenu columns.
 * Used for "Special mit Hintergrundbild" columns in the desktop mega menu.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu_columns"
      ADD COLUMN IF NOT EXISTS "background_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "overlay_opacity" numeric DEFAULT 55;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu_columns"
      DROP COLUMN IF EXISTS "background_image_id",
      DROP COLUMN IF EXISTS "overlay_opacity";
  `)
}
