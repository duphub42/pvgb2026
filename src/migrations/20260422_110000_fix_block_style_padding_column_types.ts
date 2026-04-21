import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Convert any legacy block style padding/margin columns from integer to varchar,
 * since these fields store string tokens like 'default'.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$
    DECLARE
      rec record;
    BEGIN
      FOR rec IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name IN ('block_spacing_padding', 'block_spacing_padding_top', 'block_spacing_margin_bottom')
          AND data_type = 'integer'
      LOOP
        EXECUTE format(
          'ALTER TABLE %I ALTER COLUMN %I TYPE varchar USING %I::varchar;',
          rec.table_name,
          rec.column_name,
          rec.column_name
        );
      END LOOP;
    END$$;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DO $$
    DECLARE
      rec record;
    BEGIN
      FOR rec IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name IN ('block_spacing_padding', 'block_spacing_padding_top', 'block_spacing_margin_bottom')
          AND data_type = 'character varying'
      LOOP
        EXECUTE format(
          'ALTER TABLE %I ALTER COLUMN %I TYPE integer USING NULL::integer;',
          rec.table_name,
          rec.column_name
        );
      END LOOP;
    END$$;
  `))
}
