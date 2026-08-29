import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "portfolio_kpis_items"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)

  await db.execute(`
    ALTER TABLE "_portfolio_kpis_v_items"
    ADD COLUMN IF NOT EXISTS "icon" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(`
    ALTER TABLE "portfolio_kpis_items"
    DROP COLUMN IF EXISTS "icon";
  `)

  await db.execute(`
    ALTER TABLE "_portfolio_kpis_v_items"
    DROP COLUMN IF EXISTS "icon";
  `)
}
