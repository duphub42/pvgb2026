import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Converts category_description from single text to group (title + description).
 * Existing text is moved into description.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      ADD COLUMN IF NOT EXISTS "category_description_title" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      ADD COLUMN IF NOT EXISTS "category_description_description" text;
  `)
  await db.execute(sql`
    UPDATE "mega_menu"
    SET "category_description_description" = "category_description"
    WHERE "category_description" IS NOT NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      DROP COLUMN IF EXISTS "category_description";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      ADD COLUMN IF NOT EXISTS "category_description" text;
  `)
  await db.execute(sql`
    UPDATE "mega_menu"
    SET "category_description" = "category_description_description"
    WHERE "category_description_description" IS NOT NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      DROP COLUMN IF EXISTS "category_description_title";
  `)
  await db.execute(sql`
    ALTER TABLE "mega_menu"
      DROP COLUMN IF EXISTS "category_description_description";
  `)
}
