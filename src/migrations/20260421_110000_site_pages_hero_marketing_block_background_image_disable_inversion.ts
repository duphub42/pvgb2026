import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add missing block_background_image_disable_inversion to heroMarketing block tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_hero_marketing"
      ADD COLUMN IF NOT EXISTS "block_background_image_disable_inversion" boolean DEFAULT false;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_hero_marketing"
      ADD COLUMN IF NOT EXISTS "block_background_image_disable_inversion" boolean DEFAULT false;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_hero_marketing"
      DROP COLUMN IF EXISTS "block_background_image_disable_inversion";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_hero_marketing"
      DROP COLUMN IF EXISTS "block_background_image_disable_inversion";
    `),
  )
}
