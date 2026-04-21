import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add image_dark_mode_invert to introduction block tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "image_dark_mode_invert" boolean DEFAULT true;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "image_dark_mode_invert" boolean DEFAULT true;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      DROP COLUMN IF EXISTS "image_dark_mode_invert";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      DROP COLUMN IF EXISTS "image_dark_mode_invert";
    `),
  )
}
