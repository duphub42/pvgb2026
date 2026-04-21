import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add missing block background image style columns to all public tables that have block_background.
 */
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
            AND column_name = 'block_background'
        LOOP
          IF NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = rec.table_name
              AND column_name = 'block_background_image_id'
          ) THEN
            EXECUTE format(
              'ALTER TABLE %I ADD COLUMN block_background_image_id integer REFERENCES media(id);',
              rec.table_name
            );
          END IF;

          IF NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = rec.table_name
              AND column_name = 'block_background_image_disable_inversion'
          ) THEN
            EXECUTE format(
              'ALTER TABLE %I ADD COLUMN block_background_image_disable_inversion boolean DEFAULT false;',
              rec.table_name
            );
          END IF;
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
            AND column_name = 'block_background'
        LOOP
          EXECUTE format(
            'ALTER TABLE %I DROP COLUMN IF EXISTS block_background_image_disable_inversion;',
            rec.table_name
          );
          EXECUTE format(
            'ALTER TABLE %I DROP COLUMN IF EXISTS block_background_image_id;',
            rec.table_name
          );
        END LOOP;
      END$$;
    `),
  )
}
