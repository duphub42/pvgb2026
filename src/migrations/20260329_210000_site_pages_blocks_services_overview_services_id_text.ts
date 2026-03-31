import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Payload expects non-versioned array item IDs and parent references as text.
 * The original migration created this table with `serial` and `varchar` types,
 * which breaks Payload inserts and cross-table referential integrity.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_services_overview_services"
    ALTER COLUMN "id" TYPE text USING "id"::text;
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_services_overview_services"
    ALTER COLUMN "_parent_id" TYPE text USING "_parent_id"::text;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverting this change is intentionally a no-op because the previous
  // integer-based schema may not safely round-trip from string IDs.
  await db.execute(sql.raw(`SELECT 1;`))
}
