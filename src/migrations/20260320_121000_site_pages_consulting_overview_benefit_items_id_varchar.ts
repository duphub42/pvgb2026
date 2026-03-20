import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Payload expects non-versioned array item IDs as strings (UUID-like).
 * The previous migration created this column as `serial` (integer) which
 * causes datatype mismatch when Payload inserts string IDs.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items"
      ALTER COLUMN "id" TYPE varchar
      USING "id"::text;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Intentionally no-op. Reverting would require guessing how to cast
  // UUID-like strings back to integers (not possible reliably).
  await db.execute(sql.raw(`SELECT 1;`))
}

