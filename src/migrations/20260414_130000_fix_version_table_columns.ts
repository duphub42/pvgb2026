import { MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Fix missing columns in version table
  const versionColumns = [
    'version_hero_background_glow boolean DEFAULT true',
    'version_hero_subheadline text',
    'version_hero_label text', 
    'version_hero_badge text',
    'version_hero_headline text',
    'version_hero_headline_line1 text',
    'version_hero_headline_line2 text', 
    'version_hero_headline_line3 text',
    'version_hero_description text',
    'version_hero_background_preset_id integer',
    'version_hero_media_type text',
    'version_hero_media_type_mobile text',
    'version_hero_background_image_id integer',
    'version_hero_background_video_id integer',
    'version_hero_foreground_image_id integer',
    'version_hero_surface_pattern text',
    'version_hero_stack_back_image_id integer',
    'version_hero_stack_back_offset_x integer',
    'version_hero_stack_back_offset_y integer',
    'version_hero_stack_mid_image_id integer',
    'version_hero_stack_mid_offset_x integer',
    'version_hero_stack_mid_offset_y integer',
    'version_hero_stack_front_image_id integer',
    'version_hero_stack_front_offset_x integer',
    'version_hero_stack_front_offset_y integer',
    'version_hero_overlay_opacity numeric',
    'version_hero_floating_mouse_strength numeric',
    'version_hero_floating_idle_amplitude numeric',
    'version_hero_marquee_headline text',
    'version_hero_logo_display_type text',
    'version_generate_slug boolean DEFAULT true',
    'version_slug text',
    'version_parent_id integer',
    'version_published_at timestamp',
    'version_portfolio_type text',
    'version_meta_title text',
    'version_meta_description text',
    'version_meta_image_id integer',
    'version_updated_at timestamp',
    'version_created_at timestamp',
    'version__status text'
  ]

  for (const column of versionColumns) {
    await db.execute(`ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS ${column};`)
  }
}

export async function down(): Promise<void> {
  // This is a complex migration, so down function will be minimal
  console.log('Complex migration - manual cleanup may be required')
}
