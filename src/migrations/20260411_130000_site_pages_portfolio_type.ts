import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds page-level portfolio_type selection to site_pages and its versions table.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "site_pages"
      ADD COLUMN IF NOT EXISTS "portfolio_type" varchar;
    `,
  )

  await db.execute(
    sql`
      ALTER TABLE "_site_pages_v"
      ADD COLUMN IF NOT EXISTS "version_portfolio_type" varchar;
    `,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "_site_pages_v"
      DROP COLUMN IF EXISTS "version_portfolio_type";
    `,
  )

  await db.execute(
    sql`
      ALTER TABLE "site_pages"
      DROP COLUMN IF EXISTS "portfolio_type";
    `,
  )
}
