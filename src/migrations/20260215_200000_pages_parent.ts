import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds parent relationship to pages (tree structure).
 * Run with: pnpm payload migrate
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "parent_id" integer REFERENCES "pages"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_parent_id" integer REFERENCES "pages"("id") ON DELETE SET NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "parent_id";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_parent_id";
  `)
}
