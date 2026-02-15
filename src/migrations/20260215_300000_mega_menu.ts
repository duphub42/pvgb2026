import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds mega-menu collection (nav items with subItems, columns, highlight).
 * Run with: pnpm payload migrate
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mega_menu" (
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL,
      "order" integer NOT NULL DEFAULT 0,
      "highlight_title" varchar,
      "highlight_description" text,
      "highlight_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "highlight_cta_label" varchar,
      "highlight_cta_url" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mega_menu_sub_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL,
      "icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "badge" varchar,
      "description" text
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mega_menu_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mega_menu_column_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL,
      "icon_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "badge" varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu_sub_items"
      ADD CONSTRAINT "mega_menu_sub_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "mega_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu_columns"
      ADD CONSTRAINT "mega_menu_columns_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "mega_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu_column_items"
      ADD CONSTRAINT "mega_menu_column_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "mega_menu_columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "mega_menu_column_items" DROP CONSTRAINT IF EXISTS "mega_menu_column_items_parent_id_fk";`)
  await db.execute(sql`ALTER TABLE "mega_menu_columns" DROP CONSTRAINT IF EXISTS "mega_menu_columns_parent_id_fk";`)
  await db.execute(sql`ALTER TABLE "mega_menu_sub_items" DROP CONSTRAINT IF EXISTS "mega_menu_sub_items_parent_id_fk";`)
  await db.execute(sql`DROP TABLE IF EXISTS "mega_menu_column_items";`)
  await db.execute(sql`DROP TABLE IF EXISTS "mega_menu_columns";`)
  await db.execute(sql`DROP TABLE IF EXISTS "mega_menu_sub_items";`)
  await db.execute(sql`DROP TABLE IF EXISTS "mega_menu";`)
}
