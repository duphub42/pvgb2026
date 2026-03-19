import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Creates missing shared link tables used by ShadcnBlock content.links
 * (dbName: "lnks"), including versions table "_lnks_v".
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "lnks" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean DEFAULT false,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
    CREATE INDEX IF NOT EXISTS "lnks_order_idx" ON "lnks" ("_order");
    CREATE INDEX IF NOT EXISTS "lnks_parent_id_idx" ON "lnks" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_lnks_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean DEFAULT false,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_lnks_v_order_idx" ON "_lnks_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_lnks_v_parent_id_idx" ON "_lnks_v" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "lnks_rels" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "site_pages_id" integer,
      "blog_posts_id" integer,
      "categories_id" integer
    );
    CREATE INDEX IF NOT EXISTS "lnks_rels_order_idx" ON "lnks_rels" ("order");
    CREATE INDEX IF NOT EXISTS "lnks_rels_parent_idx" ON "lnks_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_site_pages_idx" ON "lnks_rels" ("site_pages_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_blog_posts_idx" ON "lnks_rels" ("blog_posts_id");
    CREATE INDEX IF NOT EXISTS "lnks_rels_categories_idx" ON "lnks_rels" ("categories_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_lnks_v_rels" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "site_pages_id" integer,
      "blog_posts_id" integer,
      "categories_id" integer
    );
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_order_idx" ON "_lnks_v_rels" ("order");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_parent_idx" ON "_lnks_v_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_site_pages_idx" ON "_lnks_v_rels" ("site_pages_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_blog_posts_idx" ON "_lnks_v_rels" ("blog_posts_id");
    CREATE INDEX IF NOT EXISTS "_lnks_v_rels_categories_idx" ON "_lnks_v_rels" ("categories_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "_lnks_v_rels";
    DROP TABLE IF EXISTS "lnks_rels";
    DROP TABLE IF EXISTS "_lnks_v";
    DROP TABLE IF EXISTS "lnks";
  `))
}
