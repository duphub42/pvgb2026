import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add all potentially missing hero columns that might be referenced in code
  const columns = [
    'hero_background_glow boolean DEFAULT true',
    'hero_subheadline text',
    'hero_label text', 
    'hero_badge text',
    'hero_headline text',
    'hero_headline_line1 text',
    'hero_headline_line2 text', 
    'hero_headline_line3 text',
    'hero_description text',
    'hero_background_preset_id integer',
    'hero_media_type text',
    'hero_media_type_mobile text',
    'hero_background_image_id integer',
    'hero_background_video_id integer',
    'hero_foreground_image_id integer',
    'hero_surface_pattern text',
    'hero_stack_back_image_id integer',
    'hero_stack_back_offset_x integer',
    'hero_stack_back_offset_y integer',
    'hero_stack_mid_image_id integer',
    'hero_stack_mid_offset_x integer',
    'hero_stack_mid_offset_y integer',
    'hero_stack_front_image_id integer',
    'hero_stack_front_offset_x integer',
    'hero_stack_front_offset_y integer',
    'hero_overlay_opacity numeric',
    'hero_floating_mouse_strength numeric',
    'hero_floating_idle_amplitude numeric',
    'hero_marquee_headline text',
    'hero_logo_display_type text',
    'generate_slug boolean DEFAULT true',
    'slug text',
    'parent_id integer',
    'published_at timestamp',
    'portfolio_type text',
    'meta_title text',
    'meta_description text',
    'meta_image_id integer',
    'updated_at timestamp',
    'created_at timestamp',
    '_status text'
  ]

  for (const column of columns) {
    await db.execute(`ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS ${column};`)
  }

  // Also add to version table
  for (const column of columns) {
    await db.execute(`ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS ${column};`)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // This is a complex migration, so down function will be minimal
  console.log('Complex migration - manual cleanup may be required')
}
