import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DO $$
    DECLARE
      rec record;
    BEGIN
      FOR rec IN
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'block_name'
      LOOP
        EXECUTE format(
          'ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_decorative_background" varchar DEFAULT ''none'';',
          rec.table_name
        );
      END LOOP;
    END$$;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DO $$
    DECLARE
      rec record;
    BEGIN
      FOR rec IN
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'block_name'
      LOOP
        EXECUTE format(
          'ALTER TABLE %I DROP COLUMN IF EXISTS "block_decorative_background";',
          rec.table_name
        );
      END LOOP;
    END$$;
  `),
  )
}
