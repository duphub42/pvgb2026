import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds icon support to highlight (Legacy + cards): mega_menu.highlight_icon_id,
 * mega_menu_highlight_cards.icon_id. Same pattern as Unterpunkte (icon or image).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu' AND column_name = 'highlight_icon_id'
      ) THEN
        ALTER TABLE "mega_menu" ADD COLUMN "highlight_icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
      END IF;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'mega_menu_highlight_cards' AND column_name = 'icon_id'
      ) THEN
        ALTER TABLE "mega_menu_highlight_cards" ADD COLUMN "icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu" DROP COLUMN IF EXISTS "highlight_icon_id";`)
  await db.execute(sql`ALTER TABLE "mega_menu_highlight_cards" DROP COLUMN IF EXISTS "icon_id";`)
}
