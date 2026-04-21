import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Convert legacy integer link_enable_icon_swap columns to boolean.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$
    DECLARE
      row record;
    BEGIN
      FOR row IN
        SELECT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'link_enable_icon_swap'
          AND data_type = 'integer'
      LOOP
        EXECUTE format(
          'ALTER TABLE public.%I ALTER COLUMN link_enable_icon_swap DROP DEFAULT, ALTER COLUMN link_enable_icon_swap TYPE boolean USING link_enable_icon_swap::boolean, ALTER COLUMN link_enable_icon_swap SET DEFAULT false;',
          row.table_name
        );
      END LOOP;
    END$$;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$
    DECLARE
      row record;
    BEGIN
      FOR row IN
        SELECT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'link_enable_icon_swap'
          AND data_type = 'boolean'
      LOOP
        EXECUTE format(
          'ALTER TABLE public.%I ALTER COLUMN link_enable_icon_swap TYPE integer USING link_enable_icon_swap::integer;',
          row.table_name
        );
      END LOOP;
    END$$;
  `))
}
