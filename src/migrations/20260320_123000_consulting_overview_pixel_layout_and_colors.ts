import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "pixel_layout_desktop" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "colors_gradient_lavender" varchar DEFAULT '#DED9FF',
      ADD COLUMN IF NOT EXISTS "colors_gradient_lime" varchar DEFAULT '#F3FFD9',
      ADD COLUMN IF NOT EXISTS "colors_intro_blob" varchar DEFAULT '#DED9FF',
      ADD COLUMN IF NOT EXISTS "colors_strategy_badge" varchar DEFAULT '#08D3BB',
      ADD COLUMN IF NOT EXISTS "colors_benefits_badge" varchar DEFAULT '#1090CB',
      ADD COLUMN IF NOT EXISTS "colors_experience_badge" varchar DEFAULT '#9208D3',
      ADD COLUMN IF NOT EXISTS "colors_timeline_stroke" varchar DEFAULT '#999999',
      ADD COLUMN IF NOT EXISTS "colors_divider" varchar DEFAULT '#C7C7C7',
      ADD COLUMN IF NOT EXISTS "colors_headline" varchar DEFAULT '#252525',
      ADD COLUMN IF NOT EXISTS "colors_body" varchar DEFAULT '#545454',
      ADD COLUMN IF NOT EXISTS "colors_muted" varchar DEFAULT '#868686';
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      ADD COLUMN IF NOT EXISTS "pixel_layout_desktop" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "colors_gradient_lavender" varchar DEFAULT '#DED9FF',
      ADD COLUMN IF NOT EXISTS "colors_gradient_lime" varchar DEFAULT '#F3FFD9',
      ADD COLUMN IF NOT EXISTS "colors_intro_blob" varchar DEFAULT '#DED9FF',
      ADD COLUMN IF NOT EXISTS "colors_strategy_badge" varchar DEFAULT '#08D3BB',
      ADD COLUMN IF NOT EXISTS "colors_benefits_badge" varchar DEFAULT '#1090CB',
      ADD COLUMN IF NOT EXISTS "colors_experience_badge" varchar DEFAULT '#9208D3',
      ADD COLUMN IF NOT EXISTS "colors_timeline_stroke" varchar DEFAULT '#999999',
      ADD COLUMN IF NOT EXISTS "colors_divider" varchar DEFAULT '#C7C7C7',
      ADD COLUMN IF NOT EXISTS "colors_headline" varchar DEFAULT '#252525',
      ADD COLUMN IF NOT EXISTS "colors_body" varchar DEFAULT '#545454',
      ADD COLUMN IF NOT EXISTS "colors_muted" varchar DEFAULT '#868686';
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "pixel_layout_desktop",
      DROP COLUMN IF EXISTS "colors_gradient_lavender",
      DROP COLUMN IF EXISTS "colors_gradient_lime",
      DROP COLUMN IF EXISTS "colors_intro_blob",
      DROP COLUMN IF EXISTS "colors_strategy_badge",
      DROP COLUMN IF EXISTS "colors_benefits_badge",
      DROP COLUMN IF EXISTS "colors_experience_badge",
      DROP COLUMN IF EXISTS "colors_timeline_stroke",
      DROP COLUMN IF EXISTS "colors_divider",
      DROP COLUMN IF EXISTS "colors_headline",
      DROP COLUMN IF EXISTS "colors_body",
      DROP COLUMN IF EXISTS "colors_muted";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_consulting_overview"
      DROP COLUMN IF EXISTS "pixel_layout_desktop",
      DROP COLUMN IF EXISTS "colors_gradient_lavender",
      DROP COLUMN IF EXISTS "colors_gradient_lime",
      DROP COLUMN IF EXISTS "colors_intro_blob",
      DROP COLUMN IF EXISTS "colors_strategy_badge",
      DROP COLUMN IF EXISTS "colors_benefits_badge",
      DROP COLUMN IF EXISTS "colors_experience_badge",
      DROP COLUMN IF EXISTS "colors_timeline_stroke",
      DROP COLUMN IF EXISTS "colors_divider",
      DROP COLUMN IF EXISTS "colors_headline",
      DROP COLUMN IF EXISTS "colors_body",
      DROP COLUMN IF EXISTS "colors_muted";
  `))
}

