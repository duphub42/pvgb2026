import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair block tables that have a block_name but are missing current block style columns.
 * This includes legacy version block tables like _site_pages_v_blocks_why_work_with_me.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
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
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = rec.table_name
            AND column_name = 'block_background'
        ) THEN
          EXECUTE format('ALTER TABLE %I ADD COLUMN block_background varchar DEFAULT ''none'';', rec.table_name);
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = rec.table_name
            AND column_name = 'block_background_image_id'
        ) THEN
          EXECUTE format('ALTER TABLE %I ADD COLUMN block_background_image_id integer REFERENCES media(id);', rec.table_name);
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = rec.table_name
            AND column_name = 'block_background_image_disable_inversion'
        ) THEN
          EXECUTE format('ALTER TABLE %I ADD COLUMN block_background_image_disable_inversion boolean DEFAULT false;', rec.table_name);
        END IF;

        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_spacing_padding" varchar DEFAULT ''default'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_spacing_padding_top" varchar DEFAULT ''default'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_spacing_margin_bottom" varchar DEFAULT ''default'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_container" varchar DEFAULT ''default'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_border_enabled" boolean DEFAULT false;', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_border_style" varchar DEFAULT ''solid'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_border_radius" varchar DEFAULT ''medium'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_overlay_enabled" boolean DEFAULT false;', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_overlay_color" varchar DEFAULT ''dark'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_overlay_opacity" integer DEFAULT 0;', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_content_spacing" varchar DEFAULT ''default'';', rec.table_name);
        EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS "block_animation" varchar DEFAULT ''none'';', rec.table_name);
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
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'block_name'
      LOOP
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_animation";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_content_spacing";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_overlay_opacity";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_overlay_color";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_overlay_enabled";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_border_radius";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_border_style";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_border_enabled";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_container";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_spacing_margin_bottom";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_spacing_padding_top";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS "block_spacing_padding";', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS block_background_image_disable_inversion;', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS block_background_image_id;', rec.table_name);
        EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS block_background;', rec.table_name);
      END LOOP;
    END$$;
  `))
}
