import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds description to mega_menu_columns_items (columns[].items[].description textarea).
 * Fixes: column mega_menu_columns_items.description does not exist during import.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns_items' AND column_name = 'description'
      ) THEN
        ALTER TABLE "mega_menu_columns_items" ADD COLUMN "description" text;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu_columns_items" DROP COLUMN IF EXISTS "description";`)
}
