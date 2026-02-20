import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds block_background and block_overlay_* columns to site_pages block tables.
 * Required for block style fields on Vercel Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const alterAdd = (table: string) =>
    db.execute(sql.raw(`
      ALTER TABLE "${table}"
        ADD COLUMN IF NOT EXISTS "block_background" varchar DEFAULT 'none',
        ADD COLUMN IF NOT EXISTS "block_overlay_enabled" boolean DEFAULT false,
        ADD COLUMN IF NOT EXISTS "block_overlay_color" varchar DEFAULT 'dark',
        ADD COLUMN IF NOT EXISTS "block_overlay_opacity" integer DEFAULT 30;
    `))

  await alterAdd('site_pages_blocks_cta')
  await alterAdd('site_pages_blocks_content')
  await alterAdd('site_pages_blocks_media_block')
  await alterAdd('site_pages_blocks_archive')
  await alterAdd('site_pages_blocks_form_block')
  await alterAdd('_site_pages_v_blocks_cta')
  await alterAdd('_site_pages_v_blocks_content')
  await alterAdd('_site_pages_v_blocks_media_block')
  await alterAdd('_site_pages_v_blocks_archive')
  await alterAdd('_site_pages_v_blocks_form_block')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const alterDrop = (table: string) =>
    db.execute(sql.raw(`
      ALTER TABLE "${table}"
        DROP COLUMN IF EXISTS "block_background",
        DROP COLUMN IF EXISTS "block_overlay_enabled",
        DROP COLUMN IF EXISTS "block_overlay_color",
        DROP COLUMN IF EXISTS "block_overlay_opacity";
    `))

  for (const table of [
    'site_pages_blocks_cta',
    'site_pages_blocks_content',
    'site_pages_blocks_media_block',
    'site_pages_blocks_archive',
    'site_pages_blocks_form_block',
    '_site_pages_v_blocks_cta',
    '_site_pages_v_blocks_content',
    '_site_pages_v_blocks_media_block',
    '_site_pages_v_blocks_archive',
    '_site_pages_v_blocks_form_block',
  ]) {
    await alterDrop(table)
  }
}
