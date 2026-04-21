import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

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
      END LOOP;
    END$$;
  `))
}
