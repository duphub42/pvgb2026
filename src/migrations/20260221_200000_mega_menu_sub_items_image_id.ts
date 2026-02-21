import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds image_id, badge_color, divider_before to mega_menu_sub_items (collection has image, badgeColor, dividerBefore).
 * Fixes: column mega_menu_subItems.image_id does not exist when find() runs on mega-menu during import.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_sub_items' AND column_name = 'image_id'
      ) THEN
        ALTER TABLE "mega_menu_sub_items" ADD COLUMN "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_sub_items' AND column_name = 'badge_color'
      ) THEN
        ALTER TABLE "mega_menu_sub_items" ADD COLUMN "badge_color" varchar DEFAULT 'success';
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_sub_items' AND column_name = 'divider_before'
      ) THEN
        ALTER TABLE "mega_menu_sub_items" ADD COLUMN "divider_before" boolean DEFAULT false;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu_sub_items" DROP COLUMN IF EXISTS "image_id";`)
  await db.execute(sql`ALTER TABLE "mega_menu_sub_items" DROP COLUMN IF EXISTS "badge_color";`)
  await db.execute(sql`ALTER TABLE "mega_menu_sub_items" DROP COLUMN IF EXISTS "divider_before";`)
}
