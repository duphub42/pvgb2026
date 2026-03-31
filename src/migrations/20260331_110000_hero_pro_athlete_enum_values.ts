import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds `proAthlete` to hero_type enums. Must run in a separate migration from any UPDATE
 * that assigns the new value — PostgreSQL rejects "unsafe use of new value" in the same txn.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`ALTER TYPE "public"."enum_site_pages_hero_type" ADD VALUE IF NOT EXISTS 'proAthlete'`),
  )
  await db.execute(
    sql.raw(`ALTER TYPE "public"."enum__site_pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'proAthlete'`),
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Irreversible: PostgreSQL cannot drop enum values without recreating the type.
}
