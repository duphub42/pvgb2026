import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items"
      ADD COLUMN IF NOT EXISTS "icon" varchar DEFAULT 'sparkles';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview_benefit_items"
      ADD COLUMN IF NOT EXISTS "icon" varchar DEFAULT 'sparkles';
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'site_pages_blocks_consulting_overview_benefit_items'
          AND column_name = 'icn'
      ) THEN
        UPDATE "site_pages_blocks_consulting_overview_benefit_items"
        SET "icon" = COALESCE("icon", "icn", 'sparkles')
        WHERE "icon" IS NULL;
      ELSE
        UPDATE "site_pages_blocks_consulting_overview_benefit_items"
        SET "icon" = COALESCE("icon", 'sparkles')
        WHERE "icon" IS NULL;
      END IF;
    END
    $$;
  `),
  )

  await db.execute(
    sql.raw(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = '_site_pages_v_blocks_consulting_overview_benefit_items'
          AND column_name = 'icn'
      ) THEN
        UPDATE "_site_pages_v_blocks_consulting_overview_benefit_items"
        SET "icon" = COALESCE("icon", "icn", 'sparkles')
        WHERE "icon" IS NULL;
      ELSE
        UPDATE "_site_pages_v_blocks_consulting_overview_benefit_items"
        SET "icon" = COALESCE("icon", 'sparkles')
        WHERE "icon" IS NULL;
      END IF;
    END
    $$;
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview_benefit_items"
      DROP COLUMN IF EXISTS "icon";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview_benefit_items"
      DROP COLUMN IF EXISTS "icon";
  `),
  )
}
