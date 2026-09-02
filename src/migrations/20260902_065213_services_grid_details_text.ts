import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "services_grid_categories_services" ADD COLUMN IF NOT EXISTS "details_text" varchar;
      ALTER TABLE "_services_grid_v_categories_services" ADD COLUMN IF NOT EXISTS "details_text" varchar;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "_services_grid_v_categories_services" DROP COLUMN IF EXISTS "details_text";
      ALTER TABLE "services_grid_categories_services" DROP COLUMN IF EXISTS "details_text";
    `),
  )
}
