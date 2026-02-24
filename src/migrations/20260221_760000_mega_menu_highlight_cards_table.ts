import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds mega_menu_highlight_cards table for highlight.cards array on mega_menu.
 * Mirrors the SQLite schema from fix-sqlite-schema for Postgres/Neon.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'mega_menu_highlight_cards'
      ) THEN
        CREATE TABLE "mega_menu_highlight_cards" (
          "_order" integer NOT NULL,
          "_parent_id" integer NOT NULL,
          "id" serial PRIMARY KEY NOT NULL,
          "title" varchar,
          "description" text,
          "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
          "cta_label" varchar,
          "cta_url" varchar
        );
        ALTER TABLE "mega_menu_highlight_cards"
          ADD CONSTRAINT "mega_menu_highlight_cards_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "mega_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`ALTER TABLE "mega_menu_highlight_cards" DROP CONSTRAINT IF EXISTS "mega_menu_highlight_cards_parent_id_fk";`,
  )
  await db.execute(sql`DROP TABLE IF EXISTS "mega_menu_highlight_cards";`)
}

