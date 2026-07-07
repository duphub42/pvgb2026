import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS "faq_enabled" boolean DEFAULT false;
      ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS "faq_eyebrow" varchar DEFAULT 'FAQ';
      ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS "faq_title" varchar;
      ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS "faq_description" text;

      ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS "version_faq_enabled" boolean DEFAULT false;
      ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS "version_faq_eyebrow" varchar DEFAULT 'FAQ';
      ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS "version_faq_title" varchar;
      ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS "version_faq_description" text;

      CREATE TABLE IF NOT EXISTS "site_pages_faq_categories" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
        "_uuid" varchar,
        "id" varchar PRIMARY KEY NOT NULL,
        "value" varchar,
        "label" varchar,
        "icon" varchar DEFAULT 'BriefcaseBusiness'
      );
      CREATE INDEX IF NOT EXISTS "site_pages_faq_categories_order_idx"
        ON "site_pages_faq_categories" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_faq_categories_parent_id_idx"
        ON "site_pages_faq_categories" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "site_pages_faq_categories_faqs" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "site_pages_faq_categories"("id") ON DELETE CASCADE,
        "_uuid" varchar,
        "id" varchar PRIMARY KEY NOT NULL,
        "question" varchar,
        "answer" text
      );
      CREATE INDEX IF NOT EXISTS "site_pages_faq_categories_faqs_order_idx"
        ON "site_pages_faq_categories_faqs" ("_order");
      CREATE INDEX IF NOT EXISTS "site_pages_faq_categories_faqs_parent_id_idx"
        ON "site_pages_faq_categories_faqs" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_version_faq_categories" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
        "_uuid" varchar,
        "id" varchar PRIMARY KEY NOT NULL,
        "value" varchar,
        "label" varchar,
        "icon" varchar DEFAULT 'BriefcaseBusiness'
      );
      CREATE INDEX IF NOT EXISTS "_site_pages_v_version_faq_categories_order_idx"
        ON "_site_pages_v_version_faq_categories" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_version_faq_categories_parent_id_idx"
        ON "_site_pages_v_version_faq_categories" ("_parent_id");

      CREATE TABLE IF NOT EXISTS "_site_pages_v_version_faq_categories_faqs" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL REFERENCES "_site_pages_v_version_faq_categories"("id") ON DELETE CASCADE,
        "_uuid" varchar,
        "id" varchar PRIMARY KEY NOT NULL,
        "question" varchar,
        "answer" text
      );
      CREATE INDEX IF NOT EXISTS "_site_pages_v_version_faq_categories_faqs_order_idx"
        ON "_site_pages_v_version_faq_categories_faqs" ("_order");
      CREATE INDEX IF NOT EXISTS "_site_pages_v_version_faq_categories_faqs_parent_id_idx"
        ON "_site_pages_v_version_faq_categories_faqs" ("_parent_id");
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      DROP TABLE IF EXISTS "_site_pages_v_version_faq_categories_faqs" CASCADE;
      DROP TABLE IF EXISTS "_site_pages_v_version_faq_categories" CASCADE;
      DROP TABLE IF EXISTS "site_pages_faq_categories_faqs" CASCADE;
      DROP TABLE IF EXISTS "site_pages_faq_categories" CASCADE;

      ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_faq_description";
      ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_faq_title";
      ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_faq_eyebrow";
      ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_faq_enabled";

      ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "faq_description";
      ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "faq_title";
      ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "faq_eyebrow";
      ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "faq_enabled";
    `),
  )
}
