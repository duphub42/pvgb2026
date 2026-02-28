import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Footer: Toggle „Logo auf dunklem Hintergrund“ entfernt.
 * Logo-Kontrast läuft automatisch per data-theme (globals.css).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      DROP COLUMN IF EXISTS "logo_on_dark_background";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      ADD COLUMN IF NOT EXISTS "logo_on_dark_background" boolean DEFAULT false;
  `)
}
