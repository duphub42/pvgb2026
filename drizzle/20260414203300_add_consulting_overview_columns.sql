-- Add missing columns to site_pages_blocks_consulting_overview and version table

-- Main table
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "strategy_icon" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "benefits_icon" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "benefits_text" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "experience_icon" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "experience_text" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "colors_strategy_text" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "colors_benefits_text" varchar;
ALTER TABLE "site_pages_blocks_consulting_overview" ADD COLUMN "colors_experience_text" varchar;

-- Version table
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "strategy_icon" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "benefits_icon" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "benefits_text" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "experience_icon" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "experience_text" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "colors_strategy_text" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "colors_benefits_text" varchar;
ALTER TABLE "_site_pages_v_blocks_consulting_overview" ADD COLUMN "colors_experience_text" varchar;
