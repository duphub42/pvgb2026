import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds image_id and badge_color to mega_menu_columns_items (columns[].items[].image, .badgeColor).
 * Fixes: column mega_menu_columns_items.image_id / badge_color does not exist (inspect:neon).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns_items' AND column_name = 'image_id'
      ) THEN
        ALTER TABLE "mega_menu_columns_items" ADD COLUMN "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_columns_items' AND column_name = 'badge_color'
      ) THEN
        ALTER TABLE "mega_menu_columns_items" ADD COLUMN "badge_color" varchar DEFAULT 'success';
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu_columns_items" DROP COLUMN IF EXISTS "image_id";`)
  await db.execute(sql`ALTER TABLE "mega_menu_columns_items" DROP COLUMN IF EXISTS "badge_color";`)
}
