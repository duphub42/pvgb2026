import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add missing block_background_image_id to the heroWithProcess block tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_hero_with_process"
      ADD COLUMN IF NOT EXISTS "block_background_image_id" integer REFERENCES "media"("id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE INDEX IF NOT EXISTS "site_pages_blocks_hero_with_process_block_background_image_idx"
      ON "site_pages_blocks_hero_with_process" ("block_background_image_id");
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_hero_with_process"
      ADD COLUMN IF NOT EXISTS "block_background_image_id" integer REFERENCES "media"("id");
    `),
  )

  await db.execute(
    sql.raw(`
      CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_block_background_image_idx"
      ON "_site_pages_v_blocks_hero_with_process" ("block_background_image_id");
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      DROP INDEX IF EXISTS "_site_pages_v_blocks_hero_with_process_block_background_image_idx";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_hero_with_process"
      DROP COLUMN IF EXISTS "block_background_image_id";
    `),
  )

  await db.execute(
    sql.raw(`
      DROP INDEX IF EXISTS "site_pages_blocks_hero_with_process_block_background_image_idx";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_hero_with_process"
      DROP COLUMN IF EXISTS "block_background_image_id";
    `),
  )
}
