import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Renames table mega_menu_column_items → mega_menu_columns_items.
 * Payload expects the plural name (mega_menu_columns_items). The base migration
 * 20260215_300000_mega_menu created it as mega_menu_column_items, so production
 * (e.g. Vercel/Neon) has the old name and later migrations that add columns
 * to mega_menu_columns_items fail with "relation does not exist".
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'mega_menu_column_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns_items'
      ) THEN
        ALTER TABLE "mega_menu_column_items" RENAME TO "mega_menu_columns_items";
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns_items'
      ) THEN
        ALTER TABLE "mega_menu_columns_items" RENAME TO "mega_menu_column_items";
      END IF;
    END $$;
  `)
}
