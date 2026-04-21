import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(`
      ALTER TABLE "site_pages" 
      ADD COLUMN IF NOT EXISTS "hero_portrait_id" integer;
    `)

  await db.execute(`
      ALTER TABLE "_site_pages_v" 
      ADD COLUMN IF NOT EXISTS "hero_portrait_id" integer;
    `)

  // Add foreign key constraint if not exists
  await db.execute(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'site_pages_hero_portrait_id_fkey' 
          AND table_name = 'site_pages'
        ) THEN
          ALTER TABLE "site_pages" 
          ADD CONSTRAINT "site_pages_hero_portrait_id_fkey" 
          FOREIGN KEY ("hero_portrait_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
        END IF;
      END $$;
    `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove foreign key constraint if exists
  await db.execute(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'site_pages_hero_portrait_id_fkey' 
          AND table_name = 'site_pages'
        ) THEN
          ALTER TABLE "site_pages" 
          DROP CONSTRAINT "site_pages_hero_portrait_id_fkey";
        END IF;
      END $$;
    `)

  // Remove column if exists
  await db.execute(`
      ALTER TABLE "site_pages" 
      DROP COLUMN IF EXISTS "hero_portrait_id";
    `)

  await db.execute(`
      ALTER TABLE "_site_pages_v" 
      DROP COLUMN IF EXISTS "hero_portrait_id";
    `)
}
