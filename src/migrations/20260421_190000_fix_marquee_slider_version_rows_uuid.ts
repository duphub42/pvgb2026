import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLES = [
  '_site_pages_v_blocks_marquee_slider_rows',
  '_site_pages_v_blocks_marquee_slider_rows_items',
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(
      sql.raw(`
        DO $$ BEGIN
          IF EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = '${table}'
          )
          AND NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = '_uuid'
          ) THEN
            ALTER TABLE "${table}" ADD COLUMN "_uuid" varchar;
          END IF;
        END $$;
      `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(
      sql.raw(`
        DO $$ BEGIN
          IF EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = '${table}'
          )
          AND EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = '_uuid'
          ) THEN
            ALTER TABLE "${table}" DROP COLUMN "_uuid";
          END IF;
        END $$;
      `),
    )
  }
}
