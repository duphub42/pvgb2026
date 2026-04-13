import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "layout_mode" varchar DEFAULT 'standard';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "layout_mode" varchar DEFAULT 'standard';
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "layout_mode";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "layout_mode";
  `),
  )
}
