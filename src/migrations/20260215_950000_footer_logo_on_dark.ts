import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Footer: Option „Logo auf dunklem Hintergrund“ für Kontrast-Anpassung.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      ADD COLUMN IF NOT EXISTS "logo_on_dark_background" boolean DEFAULT true;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      DROP COLUMN IF EXISTS "logo_on_dark_background";
  `)
}
