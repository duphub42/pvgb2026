import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "strategy_icon" varchar DEFAULT 'compass',
      ADD COLUMN IF NOT EXISTS "benefits_icon" varchar DEFAULT 'sparkles',
      ADD COLUMN IF NOT EXISTS "experience_icon" varchar DEFAULT 'award';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "strategy_icon" varchar DEFAULT 'compass',
      ADD COLUMN IF NOT EXISTS "benefits_icon" varchar DEFAULT 'sparkles',
      ADD COLUMN IF NOT EXISTS "experience_icon" varchar DEFAULT 'award';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items"
      ADD COLUMN IF NOT EXISTS "icn" varchar DEFAULT 'sparkles';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview_benefit_items"
      ADD COLUMN IF NOT EXISTS "icn" varchar DEFAULT 'sparkles';
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview_benefit_items"
      DROP COLUMN IF EXISTS "icn";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items"
      DROP COLUMN IF EXISTS "icn";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "strategy_icon",
      DROP COLUMN IF EXISTS "benefits_icon",
      DROP COLUMN IF EXISTS "experience_icon";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "strategy_icon",
      DROP COLUMN IF EXISTS "benefits_icon",
      DROP COLUMN IF EXISTS "experience_icon";
  `),
  )
}
