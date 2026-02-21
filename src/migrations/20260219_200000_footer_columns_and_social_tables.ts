import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Creates footer_columns, footer_columns_links, footer_social_links for Footer global.
 * Initial migration had only footer + footer_nav_items + footer_rels; extended config uses these tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "public"."footer_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "public"."footer"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "column_title" varchar
    );
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "public"."footer_columns_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "public"."footer_columns"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_text" varchar,
      "link_url" varchar,
      "is_external" boolean
    );
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "public"."footer_social_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "public"."footer"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "platform" varchar,
      "url" varchar,
      "icon_upload_id" integer REFERENCES "public"."media"("id") ON DELETE SET NULL
    );
  `))
  await db.execute(sql.raw(`
    CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "public"."footer_columns" ("_order");
    CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "public"."footer_columns" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_columns_links_order_idx" ON "public"."footer_columns_links" ("_order");
    CREATE INDEX IF NOT EXISTS "footer_columns_links_parent_id_idx" ON "public"."footer_columns_links" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "public"."footer_social_links" ("_order");
    CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "public"."footer_social_links" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "public"."footer_columns_links" CASCADE;`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "public"."footer_columns" CASCADE;`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "public"."footer_social_links" CASCADE;`))
}
