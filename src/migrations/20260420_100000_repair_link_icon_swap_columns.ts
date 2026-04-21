import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Ensure icon swap link columns exist wherever link fields are stored.
 *
 * This migration is intentionally idempotent and targets all public tables
 * containing `link_label` so schema drift in Neon/Postgres does not break
 * runtime queries during Next build/prerender.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
DO $$
DECLARE
  row RECORD;
BEGIN
  FOR row IN
    SELECT c.table_name
    FROM information_schema.columns c
    WHERE c.table_schema = 'public'
      AND c.column_name = 'link_label'
  LOOP
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns c2
      WHERE c2.table_schema = 'public'
        AND c2.table_name = row.table_name
        AND c2.column_name = 'link_icon'
    ) THEN
      EXECUTE format('ALTER TABLE public.%I ADD COLUMN link_icon varchar(50)', row.table_name);
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns c2
      WHERE c2.table_schema = 'public'
        AND c2.table_name = row.table_name
        AND c2.column_name = 'link_enable_icon_swap'
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD COLUMN link_enable_icon_swap boolean DEFAULT false',
        row.table_name
      );
    ELSIF EXISTS (
      SELECT 1
      FROM information_schema.columns c2
      WHERE c2.table_schema = 'public'
        AND c2.table_name = row.table_name
        AND c2.column_name = 'link_enable_icon_swap'
        AND c2.data_type = 'integer'
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ALTER COLUMN link_enable_icon_swap TYPE boolean USING link_enable_icon_swap::boolean',
        row.table_name
      );
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns c2
      WHERE c2.table_schema = 'public'
        AND c2.table_name = row.table_name
        AND c2.column_name = 'link_icon_swap_from'
    ) THEN
      EXECUTE format('ALTER TABLE public.%I ADD COLUMN link_icon_swap_from varchar(50)', row.table_name);
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns c2
      WHERE c2.table_schema = 'public'
        AND c2.table_name = row.table_name
        AND c2.column_name = 'link_icon_swap_to'
    ) THEN
      EXECUTE format('ALTER TABLE public.%I ADD COLUMN link_icon_swap_to varchar(50)', row.table_name);
    END IF;
  END LOOP;
END $$;
`))

  console.log('Migration completed: repaired link icon swap columns on link tables')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op: dropping columns would be destructive and unnecessary for this repair.
  void db
  console.log('Migration rollback skipped: repair migration is intentionally non-destructive')
}
