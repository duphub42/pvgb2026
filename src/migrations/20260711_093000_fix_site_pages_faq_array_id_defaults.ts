import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;

      ALTER TABLE "site_pages_faq_categories"
        ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
      ALTER TABLE "site_pages_faq_categories_faqs"
        ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
      ALTER TABLE "_site_pages_v_version_faq_categories"
        ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
      ALTER TABLE "_site_pages_v_version_faq_categories_faqs"
        ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "site_pages_faq_categories"
        ALTER COLUMN "id" DROP DEFAULT;
      ALTER TABLE "site_pages_faq_categories_faqs"
        ALTER COLUMN "id" DROP DEFAULT;
      ALTER TABLE "_site_pages_v_version_faq_categories"
        ALTER COLUMN "id" DROP DEFAULT;
      ALTER TABLE "_site_pages_v_version_faq_categories_faqs"
        ALTER COLUMN "id" DROP DEFAULT;
    `),
  )
}
