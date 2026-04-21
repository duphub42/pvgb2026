import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add Lottie fields to the introduction block tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "use_lottie" boolean DEFAULT false;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "lottie_light_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "lottie_dark_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "use_lottie" boolean DEFAULT false;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "lottie_light_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      ADD COLUMN IF NOT EXISTS "lottie_dark_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      DROP COLUMN IF EXISTS "lottie_dark_id";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      DROP COLUMN IF EXISTS "lottie_light_id";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "_site_pages_v_blocks_introduction"
      DROP COLUMN IF EXISTS "use_lottie";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      DROP COLUMN IF EXISTS "lottie_dark_id";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      DROP COLUMN IF EXISTS "lottie_light_id";
    `),
  )

  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_introduction"
      DROP COLUMN IF EXISTS "use_lottie";
    `),
  )
}
