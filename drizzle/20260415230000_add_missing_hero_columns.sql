-- Migration: Add missing hero columns to site_pages tables
-- Fixes: no such column: version_hero_portrait_id
-- Created: 2026-04-15

-- Check and add hero_portrait_id to site_pages if missing
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we ignore errors

-- For site_pages table
ALTER TABLE "site_pages" ADD COLUMN "hero_portrait_id" integer REFERENCES "media"("id");

-- For _site_pages_v table (versions)
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_portrait_id" integer REFERENCES "media"("id");

-- Add other potentially missing hero columns to _site_pages_v
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_background_glow" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_subheadline" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_label" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_badge" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_headline_line1" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_headline_line2" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_headline_line3" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_description" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_background_preset_id" integer REFERENCES "hero_backgrounds"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_media_type" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_media_type_mobile" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_background_image_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_background_video_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_foreground_image_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_surface_pattern" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_back_image_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_back_offset_x" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_back_offset_y" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_mid_image_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_mid_offset_x" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_mid_offset_y" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_front_image_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_front_offset_x" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stack_front_offset_y" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_overlay_opacity" integer;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_floating_mouse_strength" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_floating_idle_amplitude" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_marquee_headline" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_logo_display_type" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_type" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_rich_text" text;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_media_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_headline" varchar;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_marquee_logos" text;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_floating_elements" text;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_stats" text;
ALTER TABLE "_site_pages_v" ADD COLUMN "version_hero_links" text;
