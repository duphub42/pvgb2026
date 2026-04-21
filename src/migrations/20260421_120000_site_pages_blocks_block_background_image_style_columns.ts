import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Ensure block background image style fields exist for all site_pages block tables.
 */
const tables = [
  'site_pages_blocks_hero_marketing',
  'site_pages_blocks_hero_with_process_steps',
  'site_pages_blocks_hero_with_process',
  'site_pages_blocks_introduction',
  'site_pages_blocks_marquee_slider_rows_items',
  'site_pages_blocks_marquee_slider_rows',
  'site_pages_blocks_marquee_slider',
  'site_pages_blocks_consulting_overview_benefit_items',
  'site_pages_blocks_consulting_overview',
  'site_pages_blocks_services_overview_services',
  'site_pages_blocks_services_overview',
  'site_pages_blocks_why_work_with_me_intro_icon_list',
  'site_pages_blocks_why_work_with_me_reasons',
  'site_pages_blocks_why_work_with_me',
  'site_pages_blocks_brand_showcase_palette',
  'site_pages_blocks_brand_showcase_typography',
  'site_pages_blocks_brand_showcase_principles',
  'site_pages_blocks_brand_showcase_usage_examples',
  'site_pages_blocks_brand_showcase',
  'site_pages_blocks_price_calculator',
  'site_pages_blocks_cta_links',
  'site_pages_blocks_cta',
  'site_pages_blocks_cal_popup',
  'site_pages_blocks_content_columns',
  'site_pages_blocks_content',
  'site_pages_blocks_media_block',
  'site_pages_blocks_archive',
  'site_pages_blocks_form_block',
  '_site_pages_v_blocks_hero_marketing',
  '_site_pages_v_blocks_hero_with_process_steps',
  '_site_pages_v_blocks_hero_with_process',
  '_site_pages_v_blocks_introduction',
  '_site_pages_v_blocks_marquee_slider_rows_items',
  '_site_pages_v_blocks_marquee_slider_rows',
  '_site_pages_v_blocks_marquee_slider',
  '_site_pages_v_blocks_consulting_overview_benefit_items',
  '_site_pages_v_blocks_consulting_overview',
  '_site_pages_v_blocks_services_overview_services',
  '_site_pages_v_blocks_services_overview',
  '_site_pages_v_blocks_why_work_with_me_intro_icon_list',
  '_site_pages_v_blocks_why_work_with_me_reasons',
  '_site_pages_v_blocks_why_work_with_me',
  '_site_pages_v_blocks_brand_showcase_palette',
  '_site_pages_v_blocks_brand_showcase_typography',
  '_site_pages_v_blocks_brand_showcase_principles',
  '_site_pages_v_blocks_brand_showcase_usage_examples',
  '_site_pages_v_blocks_brand_showcase',
  '_site_pages_v_blocks_price_calculator',
  '_site_pages_v_blocks_cta_links',
  '_site_pages_v_blocks_cta',
  '_site_pages_v_blocks_cal_popup',
  '_site_pages_v_blocks_content_columns',
  '_site_pages_v_blocks_content',
  '_site_pages_v_blocks_media_block',
  '_site_pages_v_blocks_archive',
  '_site_pages_v_blocks_form_block',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of tables) {
    await db.execute(
      sql.raw(`
        ALTER TABLE IF EXISTS "${table}"
        ADD COLUMN IF NOT EXISTS "block_background_image_id" integer REFERENCES "media"("id");
      `),
    )

    await db.execute(
      sql.raw(`
        ALTER TABLE IF EXISTS "${table}"
        ADD COLUMN IF NOT EXISTS "block_background_image_disable_inversion" boolean DEFAULT false;
      `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of tables) {
    await db.execute(
      sql.raw(`
        ALTER TABLE IF EXISTS "${table}"
        DROP COLUMN IF EXISTS "block_background_image_disable_inversion";
      `),
    )

    await db.execute(
      sql.raw(`
        ALTER TABLE IF EXISTS "${table}"
        DROP COLUMN IF EXISTS "block_background_image_id";
      `),
    )
  }
}
