import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds Shadcn Blocks hero types (hero75, hero215, hero238, hero242, hero243, hero244, hero256)
 * to the site_pages hero type enum so they can be selected in the backend.
 */
const SHADCN_HERO_VALUES = ['hero75', 'hero215', 'hero238', 'hero242', 'hero243', 'hero244', 'hero256'] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const value of SHADCN_HERO_VALUES) {
    await db.execute(sql.raw(`ALTER TYPE "public"."enum_site_pages_hero_type" ADD VALUE IF NOT EXISTS '${value}'`))
    await db.execute(sql.raw(`ALTER TYPE "public"."enum__site_pages_v_version_hero_type" ADD VALUE IF NOT EXISTS '${value}'`))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // PostgreSQL does not support removing enum values; rollback would require recreating the enum.
  // No-op; new values remain in the enum.
}
