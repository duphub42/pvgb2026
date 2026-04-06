import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds `leistungenHero` to the site_pages hero_type enum and its version enum.
 * PostgreSQL requires this in a separate migration from any update that assigns the value.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(
      `ALTER TYPE "public"."enum_site_pages_hero_type" ADD VALUE IF NOT EXISTS 'leistungenHero'`,
    ),
  )
  await db.execute(
    sql.raw(
      `ALTER TYPE "public"."enum__site_pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'leistungenHero'`,
    ),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // PostgreSQL cannot remove enum values without recreating the type.
}
