import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLES = [
  '_services_grid_v',
  '_services_grid_v_categories',
  '_services_grid_v_categories_services',
  'services_grid',
  'services_grid_categories',
  'services_grid_categories_services',
]

async function addUuidToTable(db: MigrateUpArgs['db'], table: string) {
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = '_uuid'
      ) THEN
        ALTER TABLE "${table}" ADD COLUMN "_uuid" varchar;
      END IF;
    END $$;
  `),
  )
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await addUuidToTable(db, table)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(sql.raw(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "_uuid";`))
  }
}
