import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds column_width, divider_before, column_background to mega_menu_columns (columns[].columnWidth etc.).
 * Fixes: column mega_menu_columns.column_width does not exist during import.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns' AND column_name = 'column_width'
      ) THEN
        ALTER TABLE "mega_menu_columns" ADD COLUMN "column_width" integer DEFAULT 4;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns' AND column_name = 'divider_before'
      ) THEN
        ALTER TABLE "mega_menu_columns" ADD COLUMN "divider_before" boolean DEFAULT false;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns' AND column_name = 'column_background'
      ) THEN
        ALTER TABLE "mega_menu_columns" ADD COLUMN "column_background" varchar DEFAULT 'default';
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu_columns" DROP COLUMN IF EXISTS "column_width";`)
  await db.execute(sql`ALTER TABLE "mega_menu_columns" DROP COLUMN IF EXISTS "divider_before";`)
  await db.execute(sql`ALTER TABLE "mega_menu_columns" DROP COLUMN IF EXISTS "column_background";`)
}
