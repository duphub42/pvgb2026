import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migrates philippBacher hero rows to `superhero` and adds floating card short description.
 * Enum value `superhero` is added in migration 20260330_115500 (separate txn — PG requirement).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_pages"
    SET "hero_type" = 'superhero'
    WHERE "hero_type" = 'philippBacher';
  `)
  await db.execute(sql`
    UPDATE "_site_pages_v"
    SET "version_hero_type" = 'superhero'
    WHERE "version_hero_type" = 'philippBacher';
  `)

  await db.execute(sql`
    ALTER TABLE "site_pages_hero_floating_elements"
    ADD COLUMN IF NOT EXISTS "floating_description" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v_version_hero_floating_elements"
    ADD COLUMN IF NOT EXISTS "floating_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_pages"
    SET "hero_type" = 'philippBacher'
    WHERE "hero_type" = 'superhero';
  `)
  await db.execute(sql`
    UPDATE "_site_pages_v"
    SET "version_hero_type" = 'philippBacher'
    WHERE "version_hero_type" = 'superhero';
  `)
  await db.execute(
    sql`ALTER TABLE "site_pages_hero_floating_elements" DROP COLUMN IF EXISTS "floating_description";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v_version_hero_floating_elements" DROP COLUMN IF EXISTS "floating_description";`,
  )
}
