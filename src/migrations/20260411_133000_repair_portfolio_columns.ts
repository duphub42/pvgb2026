import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds missing columns on legacy portfolio dbName tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "portfolio_grid"
      ADD COLUMN IF NOT EXISTS "eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar,
      ADD COLUMN IF NOT EXISTS "layout_variant" varchar DEFAULT 'editorial',
      ADD COLUMN IF NOT EXISTS "block_name" varchar;
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_portfolio_grid_v"
      ADD COLUMN IF NOT EXISTS "eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar,
      ADD COLUMN IF NOT EXISTS "layout_variant" varchar DEFAULT 'editorial',
      ADD COLUMN IF NOT EXISTS "_uuid" varchar,
      ADD COLUMN IF NOT EXISTS "block_name" varchar;
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "portfolio_kpis"
      ADD COLUMN IF NOT EXISTS "eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar,
      ADD COLUMN IF NOT EXISTS "variant" varchar DEFAULT 'glass',
      ADD COLUMN IF NOT EXISTS "block_name" varchar;
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_portfolio_kpis_v"
      ADD COLUMN IF NOT EXISTS "eyebrow" varchar,
      ADD COLUMN IF NOT EXISTS "heading" varchar,
      ADD COLUMN IF NOT EXISTS "intro" varchar,
      ADD COLUMN IF NOT EXISTS "variant" varchar DEFAULT 'glass',
      ADD COLUMN IF NOT EXISTS "_uuid" varchar,
      ADD COLUMN IF NOT EXISTS "block_name" varchar;
  `),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Repair-only migration, no destructive rollback.
}
