import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds useMegaMenu checkbox to header global.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "use_mega_menu" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      DROP COLUMN IF EXISTS "use_mega_menu";
  `)
}
