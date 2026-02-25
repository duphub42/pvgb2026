CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum__collab_cur_v_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__collab_cur_v_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__feat_adv_v_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__feat_adv_v_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__feat_ai_acc_v_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__feat_ai_acc_v_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__feat_ai_acc_v_items_icon" AS ENUM('database', 'fingerprint', 'idCard', 'chart');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_archive_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_archive_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_archive_relation_to" AS ENUM('blog-posts');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_contact_section1_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_contact_section1_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_section3_badge_icon" AS ENUM('rocket', 'zap', 'bookOpen', 'playCircle');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_section3_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_section3_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_section3_primary_button_icon" AS ENUM('none', 'zap', 'rocket', 'arrowRight');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_cta_section3_right_cards_icon" AS ENUM('bookOpen', 'playCircle', 'rocket', 'zap');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_faq_simple_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_faq_simple_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature1_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature1_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature1_items_icon" AS ENUM('sparkles', 'shield', 'truck', 'clock');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature2_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature2_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_feature2_items_icon" AS ENUM('heart', 'zap', 'clock', 'users');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_grid_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_grid_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_grid_items_icon" AS ENUM('zap', 'settings2', 'sparkles');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_scaling_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_scaling_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_features_scaling_features_icon" AS ENUM('mail', 'zap', 'activity', 'draftingCompass');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_form_block_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_form_block_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_hero_grid_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_hero_grid_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_hero_marketing_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_hero_marketing_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_content_button_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_content_button_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_feature_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_lyra_feature_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_media_block_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_media_block_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_pricing_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_pricing_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_pricing_cards_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_pricing_cards_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_pricing_cards_plans_button_icon" AS ENUM('arrow', 'phone');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_scroll_morph_hero_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_scroll_morph_hero_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_serp_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_serp_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_service_ux_ui_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_service_ux_ui_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_services4_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_services4_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_blocks_services4_services_icon" AS ENUM('cog', 'penTool', 'code', 'shrub');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_floating_elements_position" AS ENUM('topLeft', 'topRight', 'midLeft', 'midRight', 'bottomLeft', 'bottomRight');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_halo_overlay_grid_variant" AS ENUM('static', 'wave', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_logo_display_type" AS ENUM('marquee', 'logoCarousel');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_media_type" AS ENUM('halo', 'image', 'video', 'animation');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'philippBacher', 'gridHero');--> statement-breakpoint
CREATE TYPE "public"."enum__site_pages_v_version_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum_collab_cur_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_collab_cur_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_feat_adv_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_feat_adv_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_feat_ai_acc_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_feat_ai_acc_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_feat_ai_acc_items_icon" AS ENUM('database', 'fingerprint', 'idCard', 'chart');--> statement-breakpoint
CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram');--> statement-breakpoint
CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');--> statement-breakpoint
CREATE TYPE "public"."enum_header_mega_menu_card_border_radius" AS ENUM('rounded-none', 'rounded-lg', 'rounded-xl');--> statement-breakpoint
CREATE TYPE "public"."enum_header_mega_menu_card_hover_border" AS ENUM('', 'hover:border-primary/40');--> statement-breakpoint
CREATE TYPE "public"."enum_header_mega_menu_card_hover_shadow" AS ENUM('hover:shadow-none', 'hover:shadow-sm', 'hover:shadow-md');--> statement-breakpoint
CREATE TYPE "public"."enum_header_mega_menu_card_shadow" AS ENUM('shadow-none', 'shadow-sm', 'shadow-md');--> statement-breakpoint
CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_appearance" AS ENUM('link', 'button');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_columns_column_background" AS ENUM('default', 'muted', 'accent');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_columns_items_badge_color" AS ENUM('success', 'muted', 'accent', 'warning', 'error');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_highlight_background" AS ENUM('default', 'paths', 'threads', 'gradient');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_highlight_position" AS ENUM('right', 'below');--> statement-breakpoint
CREATE TYPE "public"."enum_mega_menu_sub_items_badge_color" AS ENUM('success', 'muted', 'accent', 'warning', 'error');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');--> statement-breakpoint
CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_archive_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_archive_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_archive_relation_to" AS ENUM('blog-posts');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_contact_section1_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_contact_section1_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_section3_badge_icon" AS ENUM('rocket', 'zap', 'bookOpen', 'playCircle');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_section3_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_section3_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_section3_primary_button_icon" AS ENUM('none', 'zap', 'rocket', 'arrowRight');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_cta_section3_right_cards_icon" AS ENUM('bookOpen', 'playCircle', 'rocket', 'zap');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_faq_simple_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_faq_simple_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature1_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature1_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature1_items_icon" AS ENUM('sparkles', 'shield', 'truck', 'clock');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature2_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature2_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_feature2_items_icon" AS ENUM('heart', 'zap', 'clock', 'users');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_grid_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_grid_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_grid_items_icon" AS ENUM('zap', 'settings2', 'sparkles');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_scaling_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_scaling_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_features_scaling_features_icon" AS ENUM('mail', 'zap', 'activity', 'draftingCompass');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_form_block_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_form_block_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_hero_grid_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_hero_grid_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_hero_marketing_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_hero_marketing_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_content_button_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_content_button_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_feature_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_lyra_feature_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_media_block_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_media_block_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_pricing_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_pricing_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_pricing_cards_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_pricing_cards_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_pricing_cards_plans_button_icon" AS ENUM('arrow', 'phone');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_scroll_morph_hero_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_scroll_morph_hero_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_serp_content_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_serp_content_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_service_ux_ui_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_service_ux_ui_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_services4_block_background" AS ENUM('none', 'muted', 'accent', 'light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_services4_block_overlay_color" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_blocks_services4_services_icon" AS ENUM('cog', 'penTool', 'code', 'shrub');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_floating_elements_position" AS ENUM('topLeft', 'topRight', 'midLeft', 'midRight', 'bottomLeft', 'bottomRight');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_halo_overlay_grid_variant" AS ENUM('static', 'wave', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_links_link_appearance" AS ENUM('default', 'outline');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_links_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_logo_display_type" AS ENUM('marquee', 'logoCarousel');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_media_type" AS ENUM('halo', 'image', 'video', 'animation');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'philippBacher', 'gridHero');--> statement-breakpoint
CREATE TYPE "public"."enum_site_pages_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum_theme_settings_theme_mode" AS ENUM('light', 'dark');--> statement-breakpoint
CREATE TABLE "_blog_posts_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_hero_image_id" integer,
	"version_content" jsonb,
	"version_meta_title" varchar,
	"version_meta_image_id" integer,
	"version_meta_description" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_generate_slug" boolean DEFAULT true,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);
--> statement-breakpoint
CREATE TABLE "_blog_posts_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"blog_posts_id" integer,
	"categories_id" integer,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "_blog_posts_v_version_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "_collab_cur_v" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__collab_cur_v_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__collab_cur_v_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_feat_adv_v" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__feat_adv_v_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__feat_adv_v_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_label" varchar DEFAULT 'Platform',
	"title" varchar DEFAULT 'Something new!',
	"subtitle" varchar DEFAULT 'Managing a small business today is already tough.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_feat_adv_v_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_feat_ai_acc_v" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__feat_ai_acc_v_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__feat_ai_acc_v_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The foundation for AI',
	"subtitle" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_feat_ai_acc_v_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__feat_ai_acc_v_items_icon" DEFAULT 'database',
	"title" varchar,
	"content" varchar,
	"dark_image_id" integer,
	"light_image_id" integer,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_hero_type" "enum__site_pages_v_version_hero_type" DEFAULT 'lowImpact',
	"version_hero_rich_text" jsonb,
	"version_hero_media_id" integer,
	"version_hero_subheadline" varchar,
	"version_hero_headline" varchar,
	"version_hero_headline_line1" varchar,
	"version_hero_headline_line2" varchar,
	"version_hero_headline_line3" varchar,
	"version_hero_description" varchar,
	"version_hero_media_type" "enum__site_pages_v_version_hero_media_type" DEFAULT 'halo',
	"version_hero_background_image_id" integer,
	"version_hero_background_video_id" integer,
	"version_hero_halo_amplitude_factor" numeric DEFAULT 1.8,
	"version_hero_halo_size" numeric DEFAULT 2.1,
	"version_hero_halo_speed" numeric DEFAULT 1,
	"version_hero_halo_color2" numeric DEFAULT 15918901,
	"version_hero_halo_x_offset" numeric DEFAULT 0.15,
	"version_hero_halo_y_offset" numeric DEFAULT -0.03,
	"version_hero_use_halo_background" boolean DEFAULT true,
	"version_hero_halo_overlay_gradient" numeric DEFAULT 0.68,
	"version_hero_halo_overlay_grid" numeric DEFAULT 0.08,
	"version_hero_halo_overlay_grid_size" numeric DEFAULT 12,
	"version_hero_halo_overlay_grid_variant" "enum__site_pages_v_version_hero_halo_overlay_grid_variant" DEFAULT 'static',
	"version_hero_halo_overlay_grid_custom_code" varchar,
	"version_hero_foreground_image_id" integer,
	"version_hero_overlay_opacity" numeric DEFAULT 0.5,
	"version_hero_floating_mouse_strength" numeric DEFAULT 6.5,
	"version_hero_floating_idle_amplitude" numeric DEFAULT 4,
	"version_hero_marquee_headline" varchar DEFAULT 'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN',
	"version_hero_logo_display_type" "enum__site_pages_v_version_hero_logo_display_type" DEFAULT 'marquee',
	"version_generate_slug" boolean DEFAULT true,
	"version_slug" varchar,
	"version_parent_id" integer,
	"version_published_at" timestamp(3) with time zone,
	"version_meta_title" varchar,
	"version_meta_description" varchar,
	"version_meta_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__site_pages_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_archive_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_archive_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"intro_content" jsonb,
	"populate_by" "enum__site_pages_v_blocks_archive_populate_by" DEFAULT 'collection',
	"relation_to" "enum__site_pages_v_blocks_archive_relation_to" DEFAULT 'blog-posts',
	"limit" numeric DEFAULT 10,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_contact_section1" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_contact_section1_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_contact_section1_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"heading" varchar DEFAULT 'Get in Touch',
	"description" varchar DEFAULT 'Have a question or want to work together? We''d love to hear from you. Send us a message and we''ll respond as soon as possible.',
	"form_title" varchar DEFAULT 'Send us a Message',
	"form_first_name_label" varchar DEFAULT 'First name',
	"form_first_name_placeholder" varchar DEFAULT 'John',
	"form_last_name_label" varchar DEFAULT 'Last name',
	"form_last_name_placeholder" varchar DEFAULT 'Doe',
	"form_email_label" varchar DEFAULT 'Email',
	"form_email_placeholder" varchar DEFAULT 'john@example.com',
	"form_subject_label" varchar DEFAULT 'Subject',
	"form_subject_placeholder" varchar DEFAULT 'How can we help?',
	"form_message_label" varchar DEFAULT 'Message',
	"form_message_placeholder" varchar DEFAULT 'Tell us more about your project...',
	"form_button_text" varchar DEFAULT 'Send Message',
	"form_action_url" varchar,
	"contact_card_title" varchar DEFAULT 'Contact Information',
	"contact_email_label" varchar DEFAULT 'Email',
	"contact_email_value" varchar DEFAULT 'hello@company.com',
	"contact_phone_label" varchar DEFAULT 'Phone',
	"contact_phone_value" varchar DEFAULT '+1 (555) 123-4567',
	"contact_office_label" varchar DEFAULT 'Office',
	"contact_office_value" varchar DEFAULT '123 Business Ave, Suite 100
San Francisco, CA 94105',
	"hours_card_title" varchar DEFAULT 'Business Hours',
	"alt_card_title" varchar DEFAULT 'Prefer to Call?',
	"alt_card_description" varchar DEFAULT 'Speak directly with our team for immediate assistance.',
	"alt_card_button_text" varchar DEFAULT 'Schedule a Call',
	"alt_card_button_url" varchar DEFAULT '#',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_contact_section1_hours_rows" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"value" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"size" "enum__site_pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum__site_pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__site_pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_cta_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_cta_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"rich_text" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__site_pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__site_pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_cta_section3" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_cta_section3_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_cta_section3_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_icon" "enum__site_pages_v_blocks_cta_section3_badge_icon" DEFAULT 'rocket',
	"badge_text" varchar DEFAULT 'Launch Your Success',
	"title" varchar DEFAULT 'Accelerate your digital transformation journey',
	"description" varchar DEFAULT 'Join thousands of innovative companies using our cutting-edge platform to automate workflows, boost team productivity, and deliver exceptional results faster than ever before.',
	"primary_button_icon" "enum__site_pages_v_blocks_cta_section3_primary_button_icon" DEFAULT 'zap',
	"primary_button_label" varchar DEFAULT 'Start Free Trial',
	"primary_button_href" varchar DEFAULT '#',
	"secondary_button_label" varchar DEFAULT 'Watch Demo',
	"secondary_button_href" varchar DEFAULT '#',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_cta_section3_right_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_cta_section3_right_cards_icon" DEFAULT 'bookOpen',
	"title" varchar,
	"description" varchar,
	"href" varchar DEFAULT '#',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_faq_simple" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_faq_simple_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_faq_simple_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'FAQ',
	"heading" varchar DEFAULT 'Common Questions & Answers',
	"description" varchar DEFAULT 'Find out all the essential details about our platform and how it can serve your needs.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_faq_simple_faqs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar,
	"answer" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_feature1" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_feature1_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_feature1_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'Why Choose Us',
	"title" varchar DEFAULT 'Experience the Difference',
	"description" varchar DEFAULT 'Discover why thousands of customers trust us for their shopping needs. We combine quality, convenience, and exceptional service.',
	"cta_label" varchar DEFAULT 'Start Shopping',
	"cta_url" varchar DEFAULT '#',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_feature1_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_feature1_items_icon" DEFAULT 'sparkles',
	"title" varchar,
	"description" varchar,
	"link_label" varchar DEFAULT 'Learn more',
	"link_url" varchar DEFAULT '#',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_feature2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_feature2_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_feature2_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Why Choose Us',
	"description" varchar DEFAULT 'We deliver exceptional quality and service that sets us apart. Experience the difference with our dedicated approach.',
	"image_id" integer,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_feature2_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_feature2_items_icon" DEFAULT 'heart',
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_features_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_features_grid_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_features_grid_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Built to cover your needs',
	"subtitle" varchar DEFAULT 'Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_features_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_features_grid_items_icon" DEFAULT 'zap',
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_features_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_features_scaling_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_features_scaling_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Built for Scaling teams',
	"subtitle" varchar DEFAULT 'Orrupti aut temporibus assumenda atque ab, accusamus sit, molestiae veniam laboriosam pariatur.',
	"dark_image_id" integer,
	"light_image_id" integer,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_features_scaling_features" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_features_scaling_features_icon" DEFAULT 'mail',
	"label" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_form_block_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_form_block_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"form_id" integer,
	"enable_intro" boolean,
	"intro_content" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_hero_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_hero_grid_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_hero_grid_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Build your next project with Smoothui',
	"highlight" varchar DEFAULT 'Smoothui',
	"subtitle" varchar DEFAULT 'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.',
	"primary_cta_label" varchar DEFAULT 'Get Started',
	"primary_cta_url" varchar DEFAULT '#get-started',
	"secondary_cta_label" varchar DEFAULT 'Learn more',
	"secondary_cta_url" varchar DEFAULT '#learn-more',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_hero_marketing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_hero_marketing_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_hero_marketing_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_label" varchar DEFAULT 'Introducing Support for AI Models',
	"title" varchar DEFAULT 'Modern Solutions for Customer Engagement',
	"subtitle" varchar DEFAULT 'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
	"primary_cta_label" varchar DEFAULT 'Start Building',
	"primary_cta_url" varchar DEFAULT '#start',
	"secondary_cta_label" varchar DEFAULT 'Request a demo',
	"secondary_cta_url" varchar DEFAULT '#demo',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_lyra_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_lyra_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_lyra_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The Lyra ecosystem brings together our models, products and platforms.',
	"paragraph_one" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
	"paragraph_two" varchar DEFAULT 'Tailark. It supports an entire ecosystem — from products innovate. Sit minus, quod debitis autem quia aspernatur delectus impedit modi, neque non id ad dignissimos? Saepe deleniti perferendis beatae.',
	"button_label" varchar DEFAULT 'Learn More',
	"button_link_type" "enum__site_pages_v_blocks_lyra_content_button_link_type" DEFAULT 'reference',
	"button_link_new_tab" boolean,
	"button_link_url" varchar,
	"button_link_label" varchar,
	"button_link_appearance" "enum__site_pages_v_blocks_lyra_content_button_link_appearance" DEFAULT 'default',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_lyra_feature" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_lyra_feature_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_lyra_feature_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The Lyra ecosystem brings together our models.',
	"paragraph_one" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.',
	"paragraph_two" varchar DEFAULT 'It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
	"feature_fast_title" varchar DEFAULT 'Faaast',
	"feature_fast_text" varchar DEFAULT 'It supports an entire helping developers and innovate.',
	"feature_powerful_title" varchar DEFAULT 'Powerful',
	"feature_powerful_text" varchar DEFAULT 'It supports an entire helping developers and businesses.',
	"dark_image_id" integer,
	"light_image_id" integer,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_media_block_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_media_block_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"media_id" integer,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_pricing_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_pricing_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Simple, Transparent Pricing',
	"description" varchar DEFAULT 'Choose the plan that works for you.
All plans include access to our platform, lead generation tools, and dedicated support.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_pricing_cards_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_pricing_cards_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'Pricing',
	"title" varchar DEFAULT 'Prices that make sense!',
	"description" varchar DEFAULT 'Managing a small business today is already tough.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing_cards_plans" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"price" varchar,
	"period" varchar DEFAULT 'month',
	"button_text" varchar DEFAULT 'Sign up today',
	"href" varchar DEFAULT '/sign-up',
	"is_highlighted" boolean DEFAULT false,
	"button_icon" "enum__site_pages_v_blocks_pricing_cards_plans_button_icon" DEFAULT 'arrow',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing_cards_plans_features" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing_plans" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"price" varchar,
	"yearly_price" varchar,
	"period" varchar DEFAULT 'per month',
	"description" varchar,
	"button_text" varchar DEFAULT 'Get started',
	"href" varchar DEFAULT '/contact',
	"is_popular" boolean DEFAULT false,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_pricing_plans_features" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"feature" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_scroll_morph_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_scroll_morph_hero_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_scroll_morph_hero_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"intro_headline" varchar DEFAULT 'The future is built on AI.',
	"intro_subline" varchar DEFAULT 'SCROLL TO EXPLORE',
	"active_headline" varchar DEFAULT 'Explore Our Vision',
	"active_text" varchar DEFAULT 'Discover a world where technology meets creativity. Scroll through our curated collection of innovations designed to shape the future.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_serp_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_serp_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_serp_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"eyebrow" varchar DEFAULT 'Free Plan',
	"title" varchar DEFAULT 'A Workflow Revolution',
	"description" varchar DEFAULT 'Transform your team''s productivity with our intuitive platform. Seamlessly integrate tasks, communication, and project tracking in one powerful solution.',
	"section_title" varchar DEFAULT 'Flexibility at Your Fingertips',
	"section_description" varchar DEFAULT 'Whether you''re a startup or an enterprise, our scalable solution grows with you. Customize workflows, integrate with your favorite tools, and automate repetitive tasks.',
	"card_title" varchar DEFAULT 'Revolutionize your workflow',
	"card_subtitle" varchar DEFAULT 'Professional headshot portrait',
	"card_badge" varchar DEFAULT '20+ expert services at your fingertips',
	"stat_primary_label" varchar DEFAULT 'Teams onboarded',
	"stat_primary_value" varchar DEFAULT '500+',
	"stat_secondary_label" varchar DEFAULT 'Average productivity gain',
	"stat_secondary_value" varchar DEFAULT '35%',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_serp_content_bullets" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_service_ux_ui" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_service_ux_ui_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_service_ux_ui_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'UX/UI Design',
	"intro_headline" varchar DEFAULT 'User-Centered Design That Converts',
	"intro_text" varchar DEFAULT 'We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users'' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.',
	"body" jsonb,
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_services4" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"block_background" "enum__site_pages_v_blocks_services4_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum__site_pages_v_blocks_services4_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Services',
	"subtitle" varchar DEFAULT 'We craft digital experiences that captivate and convert, bringing your vision to life.',
	"_uuid" varchar,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_services4_services" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"icon" "enum__site_pages_v_blocks_services4_services_icon" DEFAULT 'cog',
	"title" varchar,
	"description" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_blocks_services4_services_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer,
	"categories_id" integer
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_version_hero_floating_elements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"icon_id" integer,
	"link_url" varchar,
	"link_new_tab" boolean DEFAULT false,
	"position" "enum__site_pages_v_version_hero_floating_elements_position" DEFAULT 'topRight',
	"offset_x" numeric DEFAULT 0,
	"offset_y" numeric DEFAULT 0,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_version_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"link_type" "enum__site_pages_v_version_hero_links_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum__site_pages_v_version_hero_links_link_appearance" DEFAULT 'default',
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_site_pages_v_version_hero_marquee_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"logo_id" integer,
	"alt" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"hero_image_id" integer,
	"content" jsonb,
	"meta_title" varchar,
	"meta_image_id" integer,
	"meta_description" varchar,
	"published_at" timestamp(3) with time zone,
	"generate_slug" boolean DEFAULT true,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_blog_posts_status" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE "blog_posts_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "blog_posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"blog_posts_id" integer,
	"categories_id" integer,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"generate_slug" boolean DEFAULT true,
	"slug" varchar NOT NULL,
	"parent_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories_breadcrumbs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"doc_id" integer,
	"url" varchar,
	"label" varchar
);
--> statement-breakpoint
CREATE TABLE "collab_cur" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_collab_cur_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_collab_cur_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "design" (
	"id" serial PRIMARY KEY NOT NULL,
	"colors_light_success" varchar,
	"colors_light_background" varchar,
	"colors_light_foreground" varchar,
	"colors_light_card" varchar,
	"colors_light_card_foreground" varchar,
	"colors_light_popover" varchar,
	"colors_light_popover_foreground" varchar,
	"colors_light_link" varchar,
	"colors_light_link_hover" varchar,
	"colors_light_border" varchar,
	"colors_light_muted" varchar,
	"colors_light_muted_foreground" varchar,
	"colors_light_destructive" varchar,
	"colors_light_mega_menu_button_bg_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_button_bg" varchar,
	"colors_light_mega_menu_button_fg_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_button_fg" varchar,
	"colors_light_mega_menu_nav_text_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_nav_text" varchar,
	"colors_light_mega_menu_heading_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_heading" varchar,
	"colors_light_mega_menu_item_text_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_item_text" varchar,
	"colors_light_mega_menu_description_use_custom" boolean DEFAULT false,
	"colors_light_mega_menu_description" varchar,
	"colors_dark_success" varchar,
	"colors_dark_background" varchar,
	"colors_dark_foreground" varchar,
	"colors_dark_card" varchar,
	"colors_dark_card_foreground" varchar,
	"colors_dark_popover" varchar,
	"colors_dark_popover_foreground" varchar,
	"colors_dark_link" varchar,
	"colors_dark_link_hover" varchar,
	"colors_dark_border" varchar,
	"colors_dark_muted" varchar,
	"colors_dark_muted_foreground" varchar,
	"colors_dark_destructive" varchar,
	"colors_dark_mega_menu_button_bg_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_button_bg" varchar,
	"colors_dark_mega_menu_button_fg_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_button_fg" varchar,
	"colors_dark_mega_menu_nav_text_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_nav_text" varchar,
	"colors_dark_mega_menu_heading_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_heading" varchar,
	"colors_dark_mega_menu_item_text_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_item_text" varchar,
	"colors_dark_mega_menu_description_use_custom" boolean DEFAULT false,
	"colors_dark_mega_menu_description" varchar,
	"fonts_body" varchar,
	"fonts_heading" varchar,
	"fonts_mono" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "feat_adv" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_feat_adv_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_feat_adv_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_label" varchar DEFAULT 'Platform',
	"title" varchar DEFAULT 'Something new!',
	"subtitle" varchar DEFAULT 'Managing a small business today is already tough.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "feat_adv_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "feat_ai_acc" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_feat_ai_acc_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_feat_ai_acc_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The foundation for AI',
	"subtitle" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "feat_ai_acc_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_feat_ai_acc_items_icon" DEFAULT 'database',
	"title" varchar,
	"content" varchar,
	"dark_image_id" integer,
	"light_image_id" integer
);
--> statement-breakpoint
CREATE TABLE "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"footer_logo_id" integer,
	"footer_logo_alt_text" varchar,
	"mobile_footer_logo_id" integer,
	"footer_description" jsonb,
	"footer_address" varchar,
	"footer_phone" varchar,
	"logo_on_dark_background" boolean DEFAULT false,
	"newsletter_title" varchar,
	"newsletter_icon" varchar,
	"newsletter_icon_upload_id" integer,
	"newsletter_description" jsonb,
	"newsletter_placeholder" varchar DEFAULT 'E-Mail-Adresse',
	"newsletter_button_text" varchar DEFAULT 'Anmelden',
	"copyright_text" varchar,
	"privacy_link" varchar,
	"terms_link" varchar,
	"background_color" varchar,
	"text_color" varchar,
	"link_hover_color" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "footer_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"column_icon" varchar,
	"column_icon_upload_id" integer,
	"column_title" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_columns_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_text" varchar NOT NULL,
	"link_url" varchar NOT NULL,
	"is_external" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "footer_nav_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer
);
--> statement-breakpoint
CREATE TABLE "footer_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" "enum_footer_social_links_platform" NOT NULL,
	"url" varchar NOT NULL,
	"icon_upload_id" integer
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_submissions_submission_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"field" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"submit_button_label" varchar,
	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
	"confirmation_message" jsonb,
	"redirect_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_checkbox" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"default_value" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_country" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_email" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_message" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"message" jsonb,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_number" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_select" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"placeholder" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_select_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_state" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_textarea" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_emails" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email_to" varchar,
	"cc" varchar,
	"bcc" varchar,
	"reply_to" varchar,
	"email_from" varchar,
	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
	"message" jsonb
);
--> statement-breakpoint
CREATE TABLE "header" (
	"id" serial PRIMARY KEY NOT NULL,
	"use_mega_menu" boolean DEFAULT false,
	"mega_menu_layout_sidebar_cols" numeric DEFAULT 3,
	"mega_menu_layout_content_cols" numeric DEFAULT 6,
	"mega_menu_layout_featured_cols" numeric DEFAULT 3,
	"mega_menu_card_border_radius" "enum_header_mega_menu_card_border_radius" DEFAULT 'rounded-lg',
	"mega_menu_card_shadow" "enum_header_mega_menu_card_shadow" DEFAULT 'shadow-sm',
	"mega_menu_card_hover_shadow" "enum_header_mega_menu_card_hover_shadow" DEFAULT 'hover:shadow-md',
	"mega_menu_card_hover_border" "enum_header_mega_menu_card_hover_border" DEFAULT 'hover:border-primary/40',
	"mega_menu_show_whats_app" boolean DEFAULT false,
	"mega_menu_whats_app_label" varchar DEFAULT 'WhatsApp',
	"mega_menu_whats_app_url" varchar,
	"mega_menu_show_callback" boolean DEFAULT false,
	"mega_menu_callback_title" varchar DEFAULT 'Rückruf anfordern',
	"mega_menu_callback_placeholder" varchar DEFAULT 'Ihre Telefonnummer',
	"mega_menu_callback_button_text" varchar DEFAULT 'Anfragen',
	"mega_menu_callback_form_id" integer,
	"mega_menu_callback_phone_field_name" varchar DEFAULT 'phone',
	"mega_menu_show_newsletter" boolean DEFAULT false,
	"mega_menu_newsletter_title" varchar DEFAULT 'Newsletter',
	"mega_menu_newsletter_placeholder" varchar DEFAULT 'E-Mail-Adresse',
	"mega_menu_newsletter_button_text" varchar DEFAULT 'Anmelden',
	"mega_menu_newsletter_form_id" integer,
	"mega_menu_newsletter_email_field_name" varchar DEFAULT 'email',
	"logo_id" integer,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "header_nav_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "header_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"caption" jsonb,
	"folder_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_square_url" varchar,
	"sizes_square_width" numeric,
	"sizes_square_height" numeric,
	"sizes_square_mime_type" varchar,
	"sizes_square_filesize" numeric,
	"sizes_square_filename" varchar,
	"sizes_small_url" varchar,
	"sizes_small_width" numeric,
	"sizes_small_height" numeric,
	"sizes_small_mime_type" varchar,
	"sizes_small_filesize" numeric,
	"sizes_small_filename" varchar,
	"sizes_medium_url" varchar,
	"sizes_medium_width" numeric,
	"sizes_medium_height" numeric,
	"sizes_medium_mime_type" varchar,
	"sizes_medium_filesize" numeric,
	"sizes_medium_filename" varchar,
	"sizes_large_url" varchar,
	"sizes_large_width" numeric,
	"sizes_large_height" numeric,
	"sizes_large_mime_type" varchar,
	"sizes_large_filesize" numeric,
	"sizes_large_filename" varchar,
	"sizes_xlarge_url" varchar,
	"sizes_xlarge_width" numeric,
	"sizes_xlarge_height" numeric,
	"sizes_xlarge_mime_type" varchar,
	"sizes_xlarge_filesize" numeric,
	"sizes_xlarge_filename" varchar,
	"sizes_og_url" varchar,
	"sizes_og_width" numeric,
	"sizes_og_height" numeric,
	"sizes_og_mime_type" varchar,
	"sizes_og_filesize" numeric,
	"sizes_og_filename" varchar
);
--> statement-breakpoint
CREATE TABLE "mega_menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL,
	"order" numeric DEFAULT 0 NOT NULL,
	"icon_id" integer,
	"image_id" integer,
	"appearance" "enum_mega_menu_appearance" DEFAULT 'link',
	"column_widths_col1" numeric,
	"column_widths_col2" numeric,
	"column_widths_col3" numeric,
	"category_description_title" varchar,
	"category_description_description" varchar,
	"highlight_position" "enum_mega_menu_highlight_position" DEFAULT 'right',
	"highlight_background" "enum_mega_menu_highlight_background" DEFAULT 'default',
	"highlight_title" varchar,
	"highlight_description" varchar,
	"highlight_icon_id" integer,
	"highlight_image_id" integer,
	"highlight_cta_label" varchar,
	"highlight_cta_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mega_menu_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"column_width" numeric DEFAULT 4,
	"divider_before" boolean DEFAULT false,
	"column_background" "enum_mega_menu_columns_column_background" DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE "mega_menu_columns_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL,
	"description" varchar,
	"icon_id" integer,
	"image_id" integer,
	"badge" varchar,
	"badge_color" "enum_mega_menu_columns_items_badge_color" DEFAULT 'success'
);
--> statement-breakpoint
CREATE TABLE "mega_menu_highlight_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"icon_id" integer,
	"image_id" integer,
	"cta_label" varchar,
	"cta_url" varchar
);
--> statement-breakpoint
CREATE TABLE "mega_menu_sub_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL,
	"icon_id" integer,
	"image_id" integer,
	"badge" varchar,
	"badge_color" "enum_mega_menu_sub_items_badge_color" DEFAULT 'success',
	"description" varchar,
	"divider_before" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "payload_folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"folder_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_folders_folder_type" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_payload_folders_folder_type",
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"input" jsonb,
	"completed_at" timestamp(3) with time zone,
	"total_tried" numeric DEFAULT 0,
	"has_error" boolean DEFAULT false,
	"error" jsonb,
	"task_slug" "enum_payload_jobs_task_slug",
	"queue" varchar DEFAULT 'default',
	"wait_until" timestamp(3) with time zone,
	"processing" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_jobs_log" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"executed_at" timestamp(3) with time zone NOT NULL,
	"completed_at" timestamp(3) with time zone NOT NULL,
	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
	"task_i_d" varchar NOT NULL,
	"input" jsonb,
	"output" jsonb,
	"state" "enum_payload_jobs_log_state" NOT NULL,
	"error" jsonb
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer,
	"media_id" integer,
	"categories_id" integer,
	"users_id" integer,
	"mega_menu_id" integer,
	"redirects_id" integer,
	"forms_id" integer,
	"form_submissions_id" integer,
	"search_id" integer,
	"payload_folders_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" varchar NOT NULL,
	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
	"to_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "redirects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer
);
--> statement-breakpoint
CREATE TABLE "search" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"priority" numeric,
	"slug" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"relation_to" varchar,
	"category_i_d" varchar,
	"title" varchar
);
--> statement-breakpoint
CREATE TABLE "search_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"blog_posts_id" integer
);
--> statement-breakpoint
CREATE TABLE "site_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"hero_type" "enum_site_pages_hero_type" DEFAULT 'lowImpact',
	"hero_rich_text" jsonb,
	"hero_media_id" integer,
	"hero_subheadline" varchar,
	"hero_headline" varchar,
	"hero_headline_line1" varchar,
	"hero_headline_line2" varchar,
	"hero_headline_line3" varchar,
	"hero_description" varchar,
	"hero_media_type" "enum_site_pages_hero_media_type" DEFAULT 'halo',
	"hero_background_image_id" integer,
	"hero_background_video_id" integer,
	"hero_halo_amplitude_factor" numeric DEFAULT 1.8,
	"hero_halo_size" numeric DEFAULT 2.1,
	"hero_halo_speed" numeric DEFAULT 1,
	"hero_halo_color2" numeric DEFAULT 15918901,
	"hero_halo_x_offset" numeric DEFAULT 0.15,
	"hero_halo_y_offset" numeric DEFAULT -0.03,
	"hero_use_halo_background" boolean DEFAULT true,
	"hero_halo_overlay_gradient" numeric DEFAULT 0.68,
	"hero_halo_overlay_grid" numeric DEFAULT 0.08,
	"hero_halo_overlay_grid_size" numeric DEFAULT 12,
	"hero_halo_overlay_grid_variant" "enum_site_pages_hero_halo_overlay_grid_variant" DEFAULT 'static',
	"hero_halo_overlay_grid_custom_code" varchar,
	"hero_foreground_image_id" integer,
	"hero_overlay_opacity" numeric DEFAULT 0.5,
	"hero_floating_mouse_strength" numeric DEFAULT 6.5,
	"hero_floating_idle_amplitude" numeric DEFAULT 4,
	"hero_marquee_headline" varchar DEFAULT 'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN',
	"hero_logo_display_type" "enum_site_pages_hero_logo_display_type" DEFAULT 'marquee',
	"generate_slug" boolean DEFAULT true,
	"slug" varchar,
	"parent_id" integer,
	"published_at" timestamp(3) with time zone,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_site_pages_status" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_archive" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_archive_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_archive_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"intro_content" jsonb,
	"populate_by" "enum_site_pages_blocks_archive_populate_by" DEFAULT 'collection',
	"relation_to" "enum_site_pages_blocks_archive_relation_to" DEFAULT 'blog-posts',
	"limit" numeric DEFAULT 10,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_contact_section1" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_contact_section1_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_contact_section1_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"heading" varchar DEFAULT 'Get in Touch',
	"description" varchar DEFAULT 'Have a question or want to work together? We''d love to hear from you. Send us a message and we''ll respond as soon as possible.',
	"form_title" varchar DEFAULT 'Send us a Message',
	"form_first_name_label" varchar DEFAULT 'First name',
	"form_first_name_placeholder" varchar DEFAULT 'John',
	"form_last_name_label" varchar DEFAULT 'Last name',
	"form_last_name_placeholder" varchar DEFAULT 'Doe',
	"form_email_label" varchar DEFAULT 'Email',
	"form_email_placeholder" varchar DEFAULT 'john@example.com',
	"form_subject_label" varchar DEFAULT 'Subject',
	"form_subject_placeholder" varchar DEFAULT 'How can we help?',
	"form_message_label" varchar DEFAULT 'Message',
	"form_message_placeholder" varchar DEFAULT 'Tell us more about your project...',
	"form_button_text" varchar DEFAULT 'Send Message',
	"form_action_url" varchar,
	"contact_card_title" varchar DEFAULT 'Contact Information',
	"contact_email_label" varchar DEFAULT 'Email',
	"contact_email_value" varchar DEFAULT 'hello@company.com',
	"contact_phone_label" varchar DEFAULT 'Phone',
	"contact_phone_value" varchar DEFAULT '+1 (555) 123-4567',
	"contact_office_label" varchar DEFAULT 'Office',
	"contact_office_value" varchar DEFAULT '123 Business Ave, Suite 100
San Francisco, CA 94105',
	"hours_card_title" varchar DEFAULT 'Business Hours',
	"alt_card_title" varchar DEFAULT 'Prefer to Call?',
	"alt_card_description" varchar DEFAULT 'Speak directly with our team for immediate assistance.',
	"alt_card_button_text" varchar DEFAULT 'Schedule a Call',
	"alt_card_button_url" varchar DEFAULT '#',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_contact_section1_hours_rows" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar,
	"value" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_content_columns" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"size" "enum_site_pages_blocks_content_columns_size" DEFAULT 'oneThird',
	"rich_text" jsonb,
	"enable_link" boolean,
	"link_type" "enum_site_pages_blocks_content_columns_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_site_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_cta" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_cta_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_cta_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"rich_text" jsonb,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_cta_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_site_pages_blocks_cta_links_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_site_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_cta_section3" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_cta_section3_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_cta_section3_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_icon" "enum_site_pages_blocks_cta_section3_badge_icon" DEFAULT 'rocket',
	"badge_text" varchar DEFAULT 'Launch Your Success',
	"title" varchar DEFAULT 'Accelerate your digital transformation journey',
	"description" varchar DEFAULT 'Join thousands of innovative companies using our cutting-edge platform to automate workflows, boost team productivity, and deliver exceptional results faster than ever before.',
	"primary_button_icon" "enum_site_pages_blocks_cta_section3_primary_button_icon" DEFAULT 'zap',
	"primary_button_label" varchar DEFAULT 'Start Free Trial',
	"primary_button_href" varchar DEFAULT '#',
	"secondary_button_label" varchar DEFAULT 'Watch Demo',
	"secondary_button_href" varchar DEFAULT '#',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_cta_section3_right_cards" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_cta_section3_right_cards_icon" DEFAULT 'bookOpen',
	"title" varchar,
	"description" varchar,
	"href" varchar DEFAULT '#'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_faq_simple" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_faq_simple_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_faq_simple_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'FAQ',
	"heading" varchar DEFAULT 'Common Questions & Answers',
	"description" varchar DEFAULT 'Find out all the essential details about our platform and how it can serve your needs.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_faq_simple_faqs" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"question" varchar,
	"answer" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_feature1" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_feature1_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_feature1_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'Why Choose Us',
	"title" varchar DEFAULT 'Experience the Difference',
	"description" varchar DEFAULT 'Discover why thousands of customers trust us for their shopping needs. We combine quality, convenience, and exceptional service.',
	"cta_label" varchar DEFAULT 'Start Shopping',
	"cta_url" varchar DEFAULT '#',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_feature1_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_feature1_items_icon" DEFAULT 'sparkles',
	"title" varchar,
	"description" varchar,
	"link_label" varchar DEFAULT 'Learn more',
	"link_url" varchar DEFAULT '#'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_feature2" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_feature2_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_feature2_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Why Choose Us',
	"description" varchar DEFAULT 'We deliver exceptional quality and service that sets us apart. Experience the difference with our dedicated approach.',
	"image_id" integer,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_feature2_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_feature2_items_icon" DEFAULT 'heart',
	"title" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_features_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_features_grid_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_features_grid_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Built to cover your needs',
	"subtitle" varchar DEFAULT 'Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_features_grid_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_features_grid_items_icon" DEFAULT 'zap',
	"title" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_features_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_features_scaling_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_features_scaling_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Built for Scaling teams',
	"subtitle" varchar DEFAULT 'Orrupti aut temporibus assumenda atque ab, accusamus sit, molestiae veniam laboriosam pariatur.',
	"dark_image_id" integer,
	"light_image_id" integer,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_features_scaling_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_features_scaling_features_icon" DEFAULT 'mail',
	"label" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_form_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_form_block_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_form_block_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"form_id" integer,
	"enable_intro" boolean,
	"intro_content" jsonb,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_hero_grid" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_hero_grid_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_hero_grid_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Build your next project with Smoothui',
	"highlight" varchar DEFAULT 'Smoothui',
	"subtitle" varchar DEFAULT 'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.',
	"primary_cta_label" varchar DEFAULT 'Get Started',
	"primary_cta_url" varchar DEFAULT '#get-started',
	"secondary_cta_label" varchar DEFAULT 'Learn more',
	"secondary_cta_url" varchar DEFAULT '#learn-more',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_hero_marketing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_hero_marketing_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_hero_marketing_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge_label" varchar DEFAULT 'Introducing Support for AI Models',
	"title" varchar DEFAULT 'Modern Solutions for Customer Engagement',
	"subtitle" varchar DEFAULT 'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
	"primary_cta_label" varchar DEFAULT 'Start Building',
	"primary_cta_url" varchar DEFAULT '#start',
	"secondary_cta_label" varchar DEFAULT 'Request a demo',
	"secondary_cta_url" varchar DEFAULT '#demo',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_lyra_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_lyra_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_lyra_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The Lyra ecosystem brings together our models, products and platforms.',
	"paragraph_one" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
	"paragraph_two" varchar DEFAULT 'Tailark. It supports an entire ecosystem — from products innovate. Sit minus, quod debitis autem quia aspernatur delectus impedit modi, neque non id ad dignissimos? Saepe deleniti perferendis beatae.',
	"button_label" varchar DEFAULT 'Learn More',
	"button_link_type" "enum_site_pages_blocks_lyra_content_button_link_type" DEFAULT 'reference',
	"button_link_new_tab" boolean,
	"button_link_url" varchar,
	"button_link_label" varchar,
	"button_link_appearance" "enum_site_pages_blocks_lyra_content_button_link_appearance" DEFAULT 'default',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_lyra_feature" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_lyra_feature_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_lyra_feature_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'The Lyra ecosystem brings together our models.',
	"paragraph_one" varchar DEFAULT 'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.',
	"paragraph_two" varchar DEFAULT 'It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
	"feature_fast_title" varchar DEFAULT 'Faaast',
	"feature_fast_text" varchar DEFAULT 'It supports an entire helping developers and innovate.',
	"feature_powerful_title" varchar DEFAULT 'Powerful',
	"feature_powerful_text" varchar DEFAULT 'It supports an entire helping developers and businesses.',
	"dark_image_id" integer,
	"light_image_id" integer,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_media_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_media_block_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_media_block_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"media_id" integer,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_pricing_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_pricing_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Simple, Transparent Pricing',
	"description" varchar DEFAULT 'Choose the plan that works for you.
All plans include access to our platform, lead generation tools, and dedicated support.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing_cards" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_pricing_cards_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_pricing_cards_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"badge" varchar DEFAULT 'Pricing',
	"title" varchar DEFAULT 'Prices that make sense!',
	"description" varchar DEFAULT 'Managing a small business today is already tough.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing_cards_plans" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" varchar,
	"price" varchar,
	"period" varchar DEFAULT 'month',
	"button_text" varchar DEFAULT 'Sign up today',
	"href" varchar DEFAULT '/sign-up',
	"is_highlighted" boolean DEFAULT false,
	"button_icon" "enum_site_pages_blocks_pricing_cards_plans_button_icon" DEFAULT 'arrow'
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing_cards_plans_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing_plans" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"price" varchar,
	"yearly_price" varchar,
	"period" varchar DEFAULT 'per month',
	"description" varchar,
	"button_text" varchar DEFAULT 'Get started',
	"href" varchar DEFAULT '/contact',
	"is_popular" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_pricing_plans_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"feature" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_scroll_morph_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_scroll_morph_hero_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_scroll_morph_hero_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"intro_headline" varchar DEFAULT 'The future is built on AI.',
	"intro_subline" varchar DEFAULT 'SCROLL TO EXPLORE',
	"active_headline" varchar DEFAULT 'Explore Our Vision',
	"active_text" varchar DEFAULT 'Discover a world where technology meets creativity. Scroll through our curated collection of innovations designed to shape the future.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_serp_content" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_serp_content_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_serp_content_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"eyebrow" varchar DEFAULT 'Free Plan',
	"title" varchar DEFAULT 'A Workflow Revolution',
	"description" varchar DEFAULT 'Transform your team''s productivity with our intuitive platform. Seamlessly integrate tasks, communication, and project tracking in one powerful solution.',
	"section_title" varchar DEFAULT 'Flexibility at Your Fingertips',
	"section_description" varchar DEFAULT 'Whether you''re a startup or an enterprise, our scalable solution grows with you. Customize workflows, integrate with your favorite tools, and automate repetitive tasks.',
	"card_title" varchar DEFAULT 'Revolutionize your workflow',
	"card_subtitle" varchar DEFAULT 'Professional headshot portrait',
	"card_badge" varchar DEFAULT '20+ expert services at your fingertips',
	"stat_primary_label" varchar DEFAULT 'Teams onboarded',
	"stat_primary_value" varchar DEFAULT '500+',
	"stat_secondary_label" varchar DEFAULT 'Average productivity gain',
	"stat_secondary_value" varchar DEFAULT '35%',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_serp_content_bullets" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_service_ux_ui" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_service_ux_ui_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_service_ux_ui_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'UX/UI Design',
	"intro_headline" varchar DEFAULT 'User-Centered Design That Converts',
	"intro_text" varchar DEFAULT 'We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users'' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.',
	"body" jsonb,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_services4" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_background" "enum_site_pages_blocks_services4_block_background" DEFAULT 'none',
	"block_overlay_enabled" boolean DEFAULT false,
	"block_overlay_color" "enum_site_pages_blocks_services4_block_overlay_color" DEFAULT 'dark',
	"block_overlay_opacity" numeric DEFAULT 30,
	"title" varchar DEFAULT 'Services',
	"subtitle" varchar DEFAULT 'We craft digital experiences that captivate and convert, bringing your vision to life.',
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_services4_services" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_site_pages_blocks_services4_services_icon" DEFAULT 'cog',
	"title" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_blocks_services4_services_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_hero_floating_elements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar,
	"icon_id" integer,
	"link_url" varchar,
	"link_new_tab" boolean DEFAULT false,
	"position" "enum_site_pages_hero_floating_elements_position" DEFAULT 'topRight',
	"offset_x" numeric DEFAULT 0,
	"offset_y" numeric DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "site_pages_hero_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_site_pages_hero_links_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_site_pages_hero_links_link_appearance" DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE "site_pages_hero_marquee_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"logo_id" integer,
	"alt" varchar
);
--> statement-breakpoint
CREATE TABLE "site_pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"site_pages_id" integer,
	"blog_posts_id" integer,
	"categories_id" integer
);
--> statement-breakpoint
CREATE TABLE "theme_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"primary_matches_base" boolean DEFAULT false,
	"primary_color" varchar DEFAULT '#3B82F6' NOT NULL,
	"theme_mode" "enum_theme_settings_theme_mode" DEFAULT 'light',
	"generated_theme" jsonb,
	"css_string" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar
);
--> statement-breakpoint
CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_blog_posts_v_version_populated_authors" ADD CONSTRAINT "_blog_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_collab_cur_v" ADD CONSTRAINT "_collab_cur_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_adv_v" ADD CONSTRAINT "_feat_adv_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_adv_v_items" ADD CONSTRAINT "_feat_adv_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_feat_adv_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_ai_acc_v" ADD CONSTRAINT "_feat_ai_acc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_ai_acc_v_items" ADD CONSTRAINT "_feat_ai_acc_v_items_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_ai_acc_v_items" ADD CONSTRAINT "_feat_ai_acc_v_items_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_feat_ai_acc_v_items" ADD CONSTRAINT "_feat_ai_acc_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_feat_ai_acc_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_parent_id_site_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_hero_background_video_id_media_id_fk" FOREIGN KEY ("version_hero_background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_hero_foreground_image_id_media_id_fk" FOREIGN KEY ("version_hero_foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_parent_id_site_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v" ADD CONSTRAINT "_site_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_archive" ADD CONSTRAINT "_site_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_contact_section1" ADD CONSTRAINT "_site_pages_v_blocks_contact_section1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_contact_section1_hours_rows" ADD CONSTRAINT "_site_pages_v_blocks_contact_section1_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_contact_section1"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_content" ADD CONSTRAINT "_site_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_content_columns" ADD CONSTRAINT "_site_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_cta" ADD CONSTRAINT "_site_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_cta_links" ADD CONSTRAINT "_site_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_cta_section3" ADD CONSTRAINT "_site_pages_v_blocks_cta_section3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_cta_section3_right_cards" ADD CONSTRAINT "_site_pages_v_blocks_cta_section3_right_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_cta_section3"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_faq_simple" ADD CONSTRAINT "_site_pages_v_blocks_faq_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_faq_simple_faqs" ADD CONSTRAINT "_site_pages_v_blocks_faq_simple_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_faq_simple"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_feature1" ADD CONSTRAINT "_site_pages_v_blocks_feature1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_feature1_items" ADD CONSTRAINT "_site_pages_v_blocks_feature1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_feature1"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_feature2" ADD CONSTRAINT "_site_pages_v_blocks_feature2_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_feature2" ADD CONSTRAINT "_site_pages_v_blocks_feature2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_feature2_items" ADD CONSTRAINT "_site_pages_v_blocks_feature2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_feature2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_grid" ADD CONSTRAINT "_site_pages_v_blocks_features_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_grid_items" ADD CONSTRAINT "_site_pages_v_blocks_features_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_features_grid"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_scaling" ADD CONSTRAINT "_site_pages_v_blocks_features_scaling_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_scaling" ADD CONSTRAINT "_site_pages_v_blocks_features_scaling_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_scaling" ADD CONSTRAINT "_site_pages_v_blocks_features_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_features_scaling_features" ADD CONSTRAINT "_site_pages_v_blocks_features_scaling_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_features_scaling"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_form_block" ADD CONSTRAINT "_site_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_form_block" ADD CONSTRAINT "_site_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_hero_grid" ADD CONSTRAINT "_site_pages_v_blocks_hero_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_hero_marketing" ADD CONSTRAINT "_site_pages_v_blocks_hero_marketing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_lyra_content" ADD CONSTRAINT "_site_pages_v_blocks_lyra_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_lyra_feature" ADD CONSTRAINT "_site_pages_v_blocks_lyra_feature_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_lyra_feature" ADD CONSTRAINT "_site_pages_v_blocks_lyra_feature_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_lyra_feature" ADD CONSTRAINT "_site_pages_v_blocks_lyra_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_media_block" ADD CONSTRAINT "_site_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_media_block" ADD CONSTRAINT "_site_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing" ADD CONSTRAINT "_site_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_site_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing_cards_plans" ADD CONSTRAINT "_site_pages_v_blocks_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing_cards_plans_features" ADD CONSTRAINT "_site_pages_v_blocks_pricing_cards_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing_plans" ADD CONSTRAINT "_site_pages_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_pricing_plans_features" ADD CONSTRAINT "_site_pages_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_scroll_morph_hero" ADD CONSTRAINT "_site_pages_v_blocks_scroll_morph_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_serp_content" ADD CONSTRAINT "_site_pages_v_blocks_serp_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_serp_content_bullets" ADD CONSTRAINT "_site_pages_v_blocks_serp_content_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_serp_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_service_ux_ui" ADD CONSTRAINT "_site_pages_v_blocks_service_ux_ui_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_services4" ADD CONSTRAINT "_site_pages_v_blocks_services4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_services4_services" ADD CONSTRAINT "_site_pages_v_blocks_services4_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_services4"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_blocks_services4_services_items" ADD CONSTRAINT "_site_pages_v_blocks_services4_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v_blocks_services4_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_rels" ADD CONSTRAINT "_site_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_rels" ADD CONSTRAINT "_site_pages_v_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_rels" ADD CONSTRAINT "_site_pages_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_rels" ADD CONSTRAINT "_site_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_version_hero_floating_elements" ADD CONSTRAINT "_site_pages_v_version_hero_floating_elements_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_version_hero_floating_elements" ADD CONSTRAINT "_site_pages_v_version_hero_floating_elements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_version_hero_links" ADD CONSTRAINT "_site_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_version_hero_marquee_logos" ADD CONSTRAINT "_site_pages_v_version_hero_marquee_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_site_pages_v_version_hero_marquee_logos" ADD CONSTRAINT "_site_pages_v_version_hero_marquee_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_pages_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_populated_authors" ADD CONSTRAINT "blog_posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collab_cur" ADD CONSTRAINT "collab_cur_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_adv" ADD CONSTRAINT "feat_adv_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_adv_items" ADD CONSTRAINT "feat_adv_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feat_adv"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_ai_acc" ADD CONSTRAINT "feat_ai_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_ai_acc_items" ADD CONSTRAINT "feat_ai_acc_items_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_ai_acc_items" ADD CONSTRAINT "feat_ai_acc_items_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feat_ai_acc_items" ADD CONSTRAINT "feat_ai_acc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feat_ai_acc"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer" ADD CONSTRAINT "footer_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer" ADD CONSTRAINT "footer_mobile_footer_logo_id_media_id_fk" FOREIGN KEY ("mobile_footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer" ADD CONSTRAINT "footer_newsletter_icon_upload_id_media_id_fk" FOREIGN KEY ("newsletter_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_column_icon_upload_id_media_id_fk" FOREIGN KEY ("column_icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_icon_upload_id_media_id_fk" FOREIGN KEY ("icon_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_mega_menu_callback_form_id_forms_id_fk" FOREIGN KEY ("mega_menu_callback_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_mega_menu_newsletter_form_id_forms_id_fk" FOREIGN KEY ("mega_menu_newsletter_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu" ADD CONSTRAINT "mega_menu_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu" ADD CONSTRAINT "mega_menu_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu" ADD CONSTRAINT "mega_menu_highlight_icon_id_media_id_fk" FOREIGN KEY ("highlight_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu" ADD CONSTRAINT "mega_menu_highlight_image_id_media_id_fk" FOREIGN KEY ("highlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_columns" ADD CONSTRAINT "mega_menu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mega_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_columns_items" ADD CONSTRAINT "mega_menu_columns_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_columns_items" ADD CONSTRAINT "mega_menu_columns_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_columns_items" ADD CONSTRAINT "mega_menu_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mega_menu_columns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_highlight_cards" ADD CONSTRAINT "mega_menu_highlight_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_highlight_cards" ADD CONSTRAINT "mega_menu_highlight_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_highlight_cards" ADD CONSTRAINT "mega_menu_highlight_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mega_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_sub_items" ADD CONSTRAINT "mega_menu_sub_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_sub_items" ADD CONSTRAINT "mega_menu_sub_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mega_menu_sub_items" ADD CONSTRAINT "mega_menu_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mega_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mega_menu_fk" FOREIGN KEY ("mega_menu_id") REFERENCES "public"."mega_menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_hero_background_video_id_media_id_fk" FOREIGN KEY ("hero_background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_hero_foreground_image_id_media_id_fk" FOREIGN KEY ("hero_foreground_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_parent_id_site_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages" ADD CONSTRAINT "site_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_archive" ADD CONSTRAINT "site_pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_contact_section1" ADD CONSTRAINT "site_pages_blocks_contact_section1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_contact_section1_hours_rows" ADD CONSTRAINT "site_pages_blocks_contact_section1_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_contact_section1"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_content" ADD CONSTRAINT "site_pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_content_columns" ADD CONSTRAINT "site_pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_cta" ADD CONSTRAINT "site_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_cta_links" ADD CONSTRAINT "site_pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_cta_section3" ADD CONSTRAINT "site_pages_blocks_cta_section3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_cta_section3_right_cards" ADD CONSTRAINT "site_pages_blocks_cta_section3_right_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_cta_section3"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_faq_simple" ADD CONSTRAINT "site_pages_blocks_faq_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_faq_simple_faqs" ADD CONSTRAINT "site_pages_blocks_faq_simple_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_faq_simple"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_feature1" ADD CONSTRAINT "site_pages_blocks_feature1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_feature1_items" ADD CONSTRAINT "site_pages_blocks_feature1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_feature1"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_feature2" ADD CONSTRAINT "site_pages_blocks_feature2_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_feature2" ADD CONSTRAINT "site_pages_blocks_feature2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_feature2_items" ADD CONSTRAINT "site_pages_blocks_feature2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_feature2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_grid" ADD CONSTRAINT "site_pages_blocks_features_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_grid_items" ADD CONSTRAINT "site_pages_blocks_features_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_features_grid"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_scaling" ADD CONSTRAINT "site_pages_blocks_features_scaling_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_scaling" ADD CONSTRAINT "site_pages_blocks_features_scaling_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_scaling" ADD CONSTRAINT "site_pages_blocks_features_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_features_scaling_features" ADD CONSTRAINT "site_pages_blocks_features_scaling_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_features_scaling"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_form_block" ADD CONSTRAINT "site_pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_form_block" ADD CONSTRAINT "site_pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_hero_grid" ADD CONSTRAINT "site_pages_blocks_hero_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_hero_marketing" ADD CONSTRAINT "site_pages_blocks_hero_marketing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_lyra_content" ADD CONSTRAINT "site_pages_blocks_lyra_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_lyra_feature" ADD CONSTRAINT "site_pages_blocks_lyra_feature_dark_image_id_media_id_fk" FOREIGN KEY ("dark_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_lyra_feature" ADD CONSTRAINT "site_pages_blocks_lyra_feature_light_image_id_media_id_fk" FOREIGN KEY ("light_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_lyra_feature" ADD CONSTRAINT "site_pages_blocks_lyra_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_media_block" ADD CONSTRAINT "site_pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_media_block" ADD CONSTRAINT "site_pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing" ADD CONSTRAINT "site_pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing_cards" ADD CONSTRAINT "site_pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing_cards_plans" ADD CONSTRAINT "site_pages_blocks_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing_cards_plans_features" ADD CONSTRAINT "site_pages_blocks_pricing_cards_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing_plans" ADD CONSTRAINT "site_pages_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_pricing_plans_features" ADD CONSTRAINT "site_pages_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_scroll_morph_hero" ADD CONSTRAINT "site_pages_blocks_scroll_morph_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_serp_content" ADD CONSTRAINT "site_pages_blocks_serp_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_serp_content_bullets" ADD CONSTRAINT "site_pages_blocks_serp_content_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_serp_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_service_ux_ui" ADD CONSTRAINT "site_pages_blocks_service_ux_ui_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_services4" ADD CONSTRAINT "site_pages_blocks_services4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_services4_services" ADD CONSTRAINT "site_pages_blocks_services4_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_services4"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_blocks_services4_services_items" ADD CONSTRAINT "site_pages_blocks_services4_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages_blocks_services4_services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_hero_floating_elements" ADD CONSTRAINT "site_pages_hero_floating_elements_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_hero_floating_elements" ADD CONSTRAINT "site_pages_hero_floating_elements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_hero_links" ADD CONSTRAINT "site_pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_hero_marquee_logos" ADD CONSTRAINT "site_pages_hero_marquee_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_hero_marquee_logos" ADD CONSTRAINT "site_pages_hero_marquee_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_rels" ADD CONSTRAINT "site_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_rels" ADD CONSTRAINT "site_pages_rels_site_pages_fk" FOREIGN KEY ("site_pages_id") REFERENCES "public"."site_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_rels" ADD CONSTRAINT "site_pages_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_pages_rels" ADD CONSTRAINT "site_pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_version_hero_image_idx" ON "_blog_posts_v" USING btree ("version_hero_image_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v" USING btree ("version_meta_image_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_autosave_idx" ON "_blog_posts_v" USING btree ("autosave");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_blog_posts_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_categories_id_idx" ON "_blog_posts_v_rels" USING btree ("categories_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_rels_users_id_idx" ON "_blog_posts_v_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_populated_authors_order_idx" ON "_blog_posts_v_version_populated_authors" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_blog_posts_v_version_populated_authors_parent_id_idx" ON "_blog_posts_v_version_populated_authors" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_collab_cur_v_order_idx" ON "_collab_cur_v" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_collab_cur_v_parent_id_idx" ON "_collab_cur_v" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_collab_cur_v_path_idx" ON "_collab_cur_v" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_feat_adv_v_order_idx" ON "_feat_adv_v" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_feat_adv_v_parent_id_idx" ON "_feat_adv_v" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_feat_adv_v_path_idx" ON "_feat_adv_v" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_feat_adv_v_items_order_idx" ON "_feat_adv_v_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_feat_adv_v_items_parent_id_idx" ON "_feat_adv_v_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_order_idx" ON "_feat_ai_acc_v" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_parent_id_idx" ON "_feat_ai_acc_v" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_path_idx" ON "_feat_ai_acc_v" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_items_order_idx" ON "_feat_ai_acc_v_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_items_parent_id_idx" ON "_feat_ai_acc_v_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_items_dark_image_idx" ON "_feat_ai_acc_v_items" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "_feat_ai_acc_v_items_light_image_idx" ON "_feat_ai_acc_v_items" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_parent_idx" ON "_site_pages_v" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_version_hero_media_idx" ON "_site_pages_v" USING btree ("version_hero_media_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_version_hero_background_image_idx" ON "_site_pages_v" USING btree ("version_hero_background_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_version_hero_background_video_idx" ON "_site_pages_v" USING btree ("version_hero_background_video_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_version_hero_foreground_image_idx" ON "_site_pages_v" USING btree ("version_hero_foreground_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_version_slug_idx" ON "_site_pages_v" USING btree ("version_slug");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_version_parent_idx" ON "_site_pages_v" USING btree ("version_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_meta_version_meta_image_idx" ON "_site_pages_v" USING btree ("version_meta_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_version_updated_at_idx" ON "_site_pages_v" USING btree ("version_updated_at");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_version_created_at_idx" ON "_site_pages_v" USING btree ("version_created_at");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_version__status_idx" ON "_site_pages_v" USING btree ("version__status");--> statement-breakpoint
CREATE INDEX "_site_pages_v_created_at_idx" ON "_site_pages_v" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "_site_pages_v_updated_at_idx" ON "_site_pages_v" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "_site_pages_v_latest_idx" ON "_site_pages_v" USING btree ("latest");--> statement-breakpoint
CREATE INDEX "_site_pages_v_autosave_idx" ON "_site_pages_v" USING btree ("autosave");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_archive_order_idx" ON "_site_pages_v_blocks_archive" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_archive_parent_id_idx" ON "_site_pages_v_blocks_archive" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_archive_path_idx" ON "_site_pages_v_blocks_archive" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_contact_section1_order_idx" ON "_site_pages_v_blocks_contact_section1" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_contact_section1_parent_id_idx" ON "_site_pages_v_blocks_contact_section1" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_contact_section1_path_idx" ON "_site_pages_v_blocks_contact_section1" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_contact_section1_hours_rows_order_idx" ON "_site_pages_v_blocks_contact_section1_hours_rows" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_contact_section1_hours_rows_parent_id_idx" ON "_site_pages_v_blocks_contact_section1_hours_rows" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_content_order_idx" ON "_site_pages_v_blocks_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_content_parent_id_idx" ON "_site_pages_v_blocks_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_content_path_idx" ON "_site_pages_v_blocks_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_content_columns_order_idx" ON "_site_pages_v_blocks_content_columns" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_content_columns_parent_id_idx" ON "_site_pages_v_blocks_content_columns" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_order_idx" ON "_site_pages_v_blocks_cta" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_parent_id_idx" ON "_site_pages_v_blocks_cta" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_path_idx" ON "_site_pages_v_blocks_cta" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_links_order_idx" ON "_site_pages_v_blocks_cta_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_links_parent_id_idx" ON "_site_pages_v_blocks_cta_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_section3_order_idx" ON "_site_pages_v_blocks_cta_section3" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_section3_parent_id_idx" ON "_site_pages_v_blocks_cta_section3" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_section3_path_idx" ON "_site_pages_v_blocks_cta_section3" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_section3_right_cards_order_idx" ON "_site_pages_v_blocks_cta_section3_right_cards" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_cta_section3_right_cards_parent_id_idx" ON "_site_pages_v_blocks_cta_section3_right_cards" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_faq_simple_order_idx" ON "_site_pages_v_blocks_faq_simple" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_faq_simple_parent_id_idx" ON "_site_pages_v_blocks_faq_simple" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_faq_simple_path_idx" ON "_site_pages_v_blocks_faq_simple" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_faq_simple_faqs_order_idx" ON "_site_pages_v_blocks_faq_simple_faqs" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_faq_simple_faqs_parent_id_idx" ON "_site_pages_v_blocks_faq_simple_faqs" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature1_order_idx" ON "_site_pages_v_blocks_feature1" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature1_parent_id_idx" ON "_site_pages_v_blocks_feature1" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature1_path_idx" ON "_site_pages_v_blocks_feature1" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature1_items_order_idx" ON "_site_pages_v_blocks_feature1_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature1_items_parent_id_idx" ON "_site_pages_v_blocks_feature1_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_order_idx" ON "_site_pages_v_blocks_feature2" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_parent_id_idx" ON "_site_pages_v_blocks_feature2" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_path_idx" ON "_site_pages_v_blocks_feature2" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_image_idx" ON "_site_pages_v_blocks_feature2" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_items_order_idx" ON "_site_pages_v_blocks_feature2_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_feature2_items_parent_id_idx" ON "_site_pages_v_blocks_feature2_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_grid_order_idx" ON "_site_pages_v_blocks_features_grid" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_grid_parent_id_idx" ON "_site_pages_v_blocks_features_grid" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_grid_path_idx" ON "_site_pages_v_blocks_features_grid" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_grid_items_order_idx" ON "_site_pages_v_blocks_features_grid_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_grid_items_parent_id_idx" ON "_site_pages_v_blocks_features_grid_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_order_idx" ON "_site_pages_v_blocks_features_scaling" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_parent_id_idx" ON "_site_pages_v_blocks_features_scaling" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_path_idx" ON "_site_pages_v_blocks_features_scaling" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_dark_image_idx" ON "_site_pages_v_blocks_features_scaling" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_light_image_idx" ON "_site_pages_v_blocks_features_scaling" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_features_order_idx" ON "_site_pages_v_blocks_features_scaling_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_features_scaling_features_parent_id_idx" ON "_site_pages_v_blocks_features_scaling_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_form_block_order_idx" ON "_site_pages_v_blocks_form_block" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_form_block_parent_id_idx" ON "_site_pages_v_blocks_form_block" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_form_block_path_idx" ON "_site_pages_v_blocks_form_block" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_form_block_form_idx" ON "_site_pages_v_blocks_form_block" USING btree ("form_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_grid_order_idx" ON "_site_pages_v_blocks_hero_grid" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_grid_parent_id_idx" ON "_site_pages_v_blocks_hero_grid" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_grid_path_idx" ON "_site_pages_v_blocks_hero_grid" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_marketing_order_idx" ON "_site_pages_v_blocks_hero_marketing" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_marketing_parent_id_idx" ON "_site_pages_v_blocks_hero_marketing" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_hero_marketing_path_idx" ON "_site_pages_v_blocks_hero_marketing" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_content_order_idx" ON "_site_pages_v_blocks_lyra_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_content_parent_id_idx" ON "_site_pages_v_blocks_lyra_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_content_path_idx" ON "_site_pages_v_blocks_lyra_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_feature_order_idx" ON "_site_pages_v_blocks_lyra_feature" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_feature_parent_id_idx" ON "_site_pages_v_blocks_lyra_feature" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_feature_path_idx" ON "_site_pages_v_blocks_lyra_feature" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_feature_dark_image_idx" ON "_site_pages_v_blocks_lyra_feature" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_lyra_feature_light_image_idx" ON "_site_pages_v_blocks_lyra_feature" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_media_block_order_idx" ON "_site_pages_v_blocks_media_block" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_media_block_parent_id_idx" ON "_site_pages_v_blocks_media_block" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_media_block_path_idx" ON "_site_pages_v_blocks_media_block" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_media_block_media_idx" ON "_site_pages_v_blocks_media_block" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_order_idx" ON "_site_pages_v_blocks_pricing" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_parent_id_idx" ON "_site_pages_v_blocks_pricing" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_path_idx" ON "_site_pages_v_blocks_pricing" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_order_idx" ON "_site_pages_v_blocks_pricing_cards" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_parent_id_idx" ON "_site_pages_v_blocks_pricing_cards" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_path_idx" ON "_site_pages_v_blocks_pricing_cards" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_plans_order_idx" ON "_site_pages_v_blocks_pricing_cards_plans" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_plans_parent_id_idx" ON "_site_pages_v_blocks_pricing_cards_plans" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_plans_features_order_idx" ON "_site_pages_v_blocks_pricing_cards_plans_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_cards_plans_features_parent_id_idx" ON "_site_pages_v_blocks_pricing_cards_plans_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_plans_order_idx" ON "_site_pages_v_blocks_pricing_plans" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_plans_parent_id_idx" ON "_site_pages_v_blocks_pricing_plans" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_plans_features_order_idx" ON "_site_pages_v_blocks_pricing_plans_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_pricing_plans_features_parent_id_idx" ON "_site_pages_v_blocks_pricing_plans_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_scroll_morph_hero_order_idx" ON "_site_pages_v_blocks_scroll_morph_hero" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_scroll_morph_hero_parent_id_idx" ON "_site_pages_v_blocks_scroll_morph_hero" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_scroll_morph_hero_path_idx" ON "_site_pages_v_blocks_scroll_morph_hero" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_serp_content_order_idx" ON "_site_pages_v_blocks_serp_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_serp_content_parent_id_idx" ON "_site_pages_v_blocks_serp_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_serp_content_path_idx" ON "_site_pages_v_blocks_serp_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_serp_content_bullets_order_idx" ON "_site_pages_v_blocks_serp_content_bullets" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_serp_content_bullets_parent_id_idx" ON "_site_pages_v_blocks_serp_content_bullets" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_service_ux_ui_order_idx" ON "_site_pages_v_blocks_service_ux_ui" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_service_ux_ui_parent_id_idx" ON "_site_pages_v_blocks_service_ux_ui" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_service_ux_ui_path_idx" ON "_site_pages_v_blocks_service_ux_ui" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_order_idx" ON "_site_pages_v_blocks_services4" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_parent_id_idx" ON "_site_pages_v_blocks_services4" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_path_idx" ON "_site_pages_v_blocks_services4" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_services_order_idx" ON "_site_pages_v_blocks_services4_services" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_services_parent_id_idx" ON "_site_pages_v_blocks_services4_services" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_services_items_order_idx" ON "_site_pages_v_blocks_services4_services_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_blocks_services4_services_items_parent_id_idx" ON "_site_pages_v_blocks_services4_services_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_order_idx" ON "_site_pages_v_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_parent_idx" ON "_site_pages_v_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_path_idx" ON "_site_pages_v_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_site_pages_id_idx" ON "_site_pages_v_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_blog_posts_id_idx" ON "_site_pages_v_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_rels_categories_id_idx" ON "_site_pages_v_rels" USING btree ("categories_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_floating_elements_order_idx" ON "_site_pages_v_version_hero_floating_elements" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_floating_elements_parent_id_idx" ON "_site_pages_v_version_hero_floating_elements" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_floating_elements_icon_idx" ON "_site_pages_v_version_hero_floating_elements" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_links_order_idx" ON "_site_pages_v_version_hero_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_links_parent_id_idx" ON "_site_pages_v_version_hero_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_marquee_logos_order_idx" ON "_site_pages_v_version_hero_marquee_logos" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_marquee_logos_parent_id_idx" ON "_site_pages_v_version_hero_marquee_logos" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_site_pages_v_version_hero_marquee_logos_logo_idx" ON "_site_pages_v_version_hero_marquee_logos" USING btree ("logo_id");--> statement-breakpoint
CREATE INDEX "blog_posts_hero_image_idx" ON "blog_posts" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "blog_posts_meta_meta_image_idx" ON "blog_posts" USING btree ("meta_image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");--> statement-breakpoint
CREATE INDEX "blog_posts_populated_authors_order_idx" ON "blog_posts_populated_authors" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "blog_posts_populated_authors_parent_id_idx" ON "blog_posts_populated_authors" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_blog_posts_id_idx" ON "blog_posts_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_categories_id_idx" ON "blog_posts_rels" USING btree ("categories_id");--> statement-breakpoint
CREATE INDEX "blog_posts_rels_users_id_idx" ON "blog_posts_rels" USING btree ("users_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");--> statement-breakpoint
CREATE INDEX "collab_cur_order_idx" ON "collab_cur" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "collab_cur_parent_id_idx" ON "collab_cur" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "collab_cur_path_idx" ON "collab_cur" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "feat_adv_order_idx" ON "feat_adv" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "feat_adv_parent_id_idx" ON "feat_adv" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "feat_adv_path_idx" ON "feat_adv" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "feat_adv_items_order_idx" ON "feat_adv_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "feat_adv_items_parent_id_idx" ON "feat_adv_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_order_idx" ON "feat_ai_acc" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_parent_id_idx" ON "feat_ai_acc" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_path_idx" ON "feat_ai_acc" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_items_order_idx" ON "feat_ai_acc_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_items_parent_id_idx" ON "feat_ai_acc_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_items_dark_image_idx" ON "feat_ai_acc_items" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "feat_ai_acc_items_light_image_idx" ON "feat_ai_acc_items" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "footer_footer_logo_idx" ON "footer" USING btree ("footer_logo_id");--> statement-breakpoint
CREATE INDEX "footer_mobile_footer_logo_idx" ON "footer" USING btree ("mobile_footer_logo_id");--> statement-breakpoint
CREATE INDEX "footer_newsletter_icon_upload_idx" ON "footer" USING btree ("newsletter_icon_upload_id");--> statement-breakpoint
CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "footer_columns_column_icon_upload_idx" ON "footer_columns" USING btree ("column_icon_upload_id");--> statement-breakpoint
CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "footer_rels_site_pages_id_idx" ON "footer_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "footer_rels_blog_posts_id_idx" ON "footer_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "footer_social_links_icon_upload_idx" ON "footer_social_links" USING btree ("icon_upload_id");--> statement-breakpoint
CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");--> statement-breakpoint
CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "header_mega_menu_callback_form_idx" ON "header" USING btree ("mega_menu_callback_form_id");--> statement-breakpoint
CREATE INDEX "header_mega_menu_newsletter_form_idx" ON "header" USING btree ("mega_menu_newsletter_form_id");--> statement-breakpoint
CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");--> statement-breakpoint
CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "header_rels_site_pages_id_idx" ON "header_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "header_rels_blog_posts_id_idx" ON "header_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");--> statement-breakpoint
CREATE INDEX "mega_menu_icon_idx" ON "mega_menu" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "mega_menu_image_idx" ON "mega_menu" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_highlight_icon_idx" ON "mega_menu" USING btree ("highlight_icon_id");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_highlight_image_idx" ON "mega_menu" USING btree ("highlight_image_id");--> statement-breakpoint
CREATE INDEX "mega_menu_updated_at_idx" ON "mega_menu" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "mega_menu_created_at_idx" ON "mega_menu" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_order_idx" ON "mega_menu_columns" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_parent_id_idx" ON "mega_menu_columns" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_items_order_idx" ON "mega_menu_columns_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_items_parent_id_idx" ON "mega_menu_columns_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_items_icon_idx" ON "mega_menu_columns_items" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "mega_menu_columns_items_image_idx" ON "mega_menu_columns_items" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_cards_order_idx" ON "mega_menu_highlight_cards" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_cards_parent_id_idx" ON "mega_menu_highlight_cards" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_cards_icon_idx" ON "mega_menu_highlight_cards" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "mega_menu_highlight_cards_image_idx" ON "mega_menu_highlight_cards" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "mega_menu_sub_items_order_idx" ON "mega_menu_sub_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "mega_menu_sub_items_parent_id_idx" ON "mega_menu_sub_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "mega_menu_sub_items_icon_idx" ON "mega_menu_sub_items" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "mega_menu_sub_items_image_idx" ON "mega_menu_sub_items" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");--> statement-breakpoint
CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");--> statement-breakpoint
CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");--> statement-breakpoint
CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");--> statement-breakpoint
CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");--> statement-breakpoint
CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");--> statement-breakpoint
CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");--> statement-breakpoint
CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_site_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_mega_menu_id_idx" ON "payload_locked_documents_rels" USING btree ("mega_menu_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");--> statement-breakpoint
CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");--> statement-breakpoint
CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "redirects_rels_site_pages_id_idx" ON "redirects_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "redirects_rels_blog_posts_id_idx" ON "redirects_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");--> statement-breakpoint
CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "search_rels_blog_posts_id_idx" ON "search_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_hero_media_idx" ON "site_pages" USING btree ("hero_media_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_hero_background_image_idx" ON "site_pages" USING btree ("hero_background_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_hero_background_video_idx" ON "site_pages" USING btree ("hero_background_video_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_hero_foreground_image_idx" ON "site_pages" USING btree ("hero_foreground_image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "site_pages_slug_idx" ON "site_pages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "site_pages_parent_idx" ON "site_pages" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_meta_meta_image_idx" ON "site_pages" USING btree ("meta_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_updated_at_idx" ON "site_pages" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "site_pages_created_at_idx" ON "site_pages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "site_pages__status_idx" ON "site_pages" USING btree ("_status");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_archive_order_idx" ON "site_pages_blocks_archive" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_archive_parent_id_idx" ON "site_pages_blocks_archive" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_archive_path_idx" ON "site_pages_blocks_archive" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_contact_section1_order_idx" ON "site_pages_blocks_contact_section1" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_contact_section1_parent_id_idx" ON "site_pages_blocks_contact_section1" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_contact_section1_path_idx" ON "site_pages_blocks_contact_section1" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_contact_section1_hours_rows_order_idx" ON "site_pages_blocks_contact_section1_hours_rows" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_contact_section1_hours_rows_parent_id_idx" ON "site_pages_blocks_contact_section1_hours_rows" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_content_order_idx" ON "site_pages_blocks_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_content_parent_id_idx" ON "site_pages_blocks_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_content_path_idx" ON "site_pages_blocks_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_content_columns_order_idx" ON "site_pages_blocks_content_columns" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_content_columns_parent_id_idx" ON "site_pages_blocks_content_columns" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_order_idx" ON "site_pages_blocks_cta" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_parent_id_idx" ON "site_pages_blocks_cta" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_path_idx" ON "site_pages_blocks_cta" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_links_order_idx" ON "site_pages_blocks_cta_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_links_parent_id_idx" ON "site_pages_blocks_cta_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_section3_order_idx" ON "site_pages_blocks_cta_section3" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_section3_parent_id_idx" ON "site_pages_blocks_cta_section3" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_section3_path_idx" ON "site_pages_blocks_cta_section3" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_section3_right_cards_order_idx" ON "site_pages_blocks_cta_section3_right_cards" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_cta_section3_right_cards_parent_id_idx" ON "site_pages_blocks_cta_section3_right_cards" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_faq_simple_order_idx" ON "site_pages_blocks_faq_simple" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_faq_simple_parent_id_idx" ON "site_pages_blocks_faq_simple" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_faq_simple_path_idx" ON "site_pages_blocks_faq_simple" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_faq_simple_faqs_order_idx" ON "site_pages_blocks_faq_simple_faqs" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_faq_simple_faqs_parent_id_idx" ON "site_pages_blocks_faq_simple_faqs" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature1_order_idx" ON "site_pages_blocks_feature1" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature1_parent_id_idx" ON "site_pages_blocks_feature1" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature1_path_idx" ON "site_pages_blocks_feature1" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature1_items_order_idx" ON "site_pages_blocks_feature1_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature1_items_parent_id_idx" ON "site_pages_blocks_feature1_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_order_idx" ON "site_pages_blocks_feature2" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_parent_id_idx" ON "site_pages_blocks_feature2" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_path_idx" ON "site_pages_blocks_feature2" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_image_idx" ON "site_pages_blocks_feature2" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_items_order_idx" ON "site_pages_blocks_feature2_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_feature2_items_parent_id_idx" ON "site_pages_blocks_feature2_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_grid_order_idx" ON "site_pages_blocks_features_grid" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_grid_parent_id_idx" ON "site_pages_blocks_features_grid" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_grid_path_idx" ON "site_pages_blocks_features_grid" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_grid_items_order_idx" ON "site_pages_blocks_features_grid_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_grid_items_parent_id_idx" ON "site_pages_blocks_features_grid_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_order_idx" ON "site_pages_blocks_features_scaling" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_parent_id_idx" ON "site_pages_blocks_features_scaling" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_path_idx" ON "site_pages_blocks_features_scaling" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_dark_image_idx" ON "site_pages_blocks_features_scaling" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_light_image_idx" ON "site_pages_blocks_features_scaling" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_features_order_idx" ON "site_pages_blocks_features_scaling_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_features_scaling_features_parent_id_idx" ON "site_pages_blocks_features_scaling_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_form_block_order_idx" ON "site_pages_blocks_form_block" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_form_block_parent_id_idx" ON "site_pages_blocks_form_block" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_form_block_path_idx" ON "site_pages_blocks_form_block" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_form_block_form_idx" ON "site_pages_blocks_form_block" USING btree ("form_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_grid_order_idx" ON "site_pages_blocks_hero_grid" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_grid_parent_id_idx" ON "site_pages_blocks_hero_grid" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_grid_path_idx" ON "site_pages_blocks_hero_grid" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_marketing_order_idx" ON "site_pages_blocks_hero_marketing" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_marketing_parent_id_idx" ON "site_pages_blocks_hero_marketing" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_hero_marketing_path_idx" ON "site_pages_blocks_hero_marketing" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_content_order_idx" ON "site_pages_blocks_lyra_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_content_parent_id_idx" ON "site_pages_blocks_lyra_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_content_path_idx" ON "site_pages_blocks_lyra_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_feature_order_idx" ON "site_pages_blocks_lyra_feature" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_feature_parent_id_idx" ON "site_pages_blocks_lyra_feature" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_feature_path_idx" ON "site_pages_blocks_lyra_feature" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_feature_dark_image_idx" ON "site_pages_blocks_lyra_feature" USING btree ("dark_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_lyra_feature_light_image_idx" ON "site_pages_blocks_lyra_feature" USING btree ("light_image_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_media_block_order_idx" ON "site_pages_blocks_media_block" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_media_block_parent_id_idx" ON "site_pages_blocks_media_block" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_media_block_path_idx" ON "site_pages_blocks_media_block" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_media_block_media_idx" ON "site_pages_blocks_media_block" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_order_idx" ON "site_pages_blocks_pricing" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_parent_id_idx" ON "site_pages_blocks_pricing" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_path_idx" ON "site_pages_blocks_pricing" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_order_idx" ON "site_pages_blocks_pricing_cards" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_parent_id_idx" ON "site_pages_blocks_pricing_cards" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_path_idx" ON "site_pages_blocks_pricing_cards" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_plans_order_idx" ON "site_pages_blocks_pricing_cards_plans" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_plans_parent_id_idx" ON "site_pages_blocks_pricing_cards_plans" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_plans_features_order_idx" ON "site_pages_blocks_pricing_cards_plans_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_cards_plans_features_parent_id_idx" ON "site_pages_blocks_pricing_cards_plans_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_plans_order_idx" ON "site_pages_blocks_pricing_plans" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_plans_parent_id_idx" ON "site_pages_blocks_pricing_plans" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_plans_features_order_idx" ON "site_pages_blocks_pricing_plans_features" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_pricing_plans_features_parent_id_idx" ON "site_pages_blocks_pricing_plans_features" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_scroll_morph_hero_order_idx" ON "site_pages_blocks_scroll_morph_hero" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_scroll_morph_hero_parent_id_idx" ON "site_pages_blocks_scroll_morph_hero" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_scroll_morph_hero_path_idx" ON "site_pages_blocks_scroll_morph_hero" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_serp_content_order_idx" ON "site_pages_blocks_serp_content" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_serp_content_parent_id_idx" ON "site_pages_blocks_serp_content" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_serp_content_path_idx" ON "site_pages_blocks_serp_content" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_serp_content_bullets_order_idx" ON "site_pages_blocks_serp_content_bullets" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_serp_content_bullets_parent_id_idx" ON "site_pages_blocks_serp_content_bullets" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_service_ux_ui_order_idx" ON "site_pages_blocks_service_ux_ui" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_service_ux_ui_parent_id_idx" ON "site_pages_blocks_service_ux_ui" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_service_ux_ui_path_idx" ON "site_pages_blocks_service_ux_ui" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_order_idx" ON "site_pages_blocks_services4" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_parent_id_idx" ON "site_pages_blocks_services4" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_path_idx" ON "site_pages_blocks_services4" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_services_order_idx" ON "site_pages_blocks_services4_services" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_services_parent_id_idx" ON "site_pages_blocks_services4_services" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_services_items_order_idx" ON "site_pages_blocks_services4_services_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_blocks_services4_services_items_parent_id_idx" ON "site_pages_blocks_services4_services_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_floating_elements_order_idx" ON "site_pages_hero_floating_elements" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_hero_floating_elements_parent_id_idx" ON "site_pages_hero_floating_elements" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_floating_elements_icon_idx" ON "site_pages_hero_floating_elements" USING btree ("icon_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_links_order_idx" ON "site_pages_hero_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_hero_links_parent_id_idx" ON "site_pages_hero_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_marquee_logos_order_idx" ON "site_pages_hero_marquee_logos" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_pages_hero_marquee_logos_parent_id_idx" ON "site_pages_hero_marquee_logos" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_hero_marquee_logos_logo_idx" ON "site_pages_hero_marquee_logos" USING btree ("logo_id");--> statement-breakpoint
CREATE INDEX "site_pages_rels_order_idx" ON "site_pages_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "site_pages_rels_parent_idx" ON "site_pages_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "site_pages_rels_path_idx" ON "site_pages_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "site_pages_rels_site_pages_id_idx" ON "site_pages_rels" USING btree ("site_pages_id");--> statement-breakpoint
CREATE INDEX "site_pages_rels_blog_posts_id_idx" ON "site_pages_rels" USING btree ("blog_posts_id");--> statement-breakpoint
CREATE INDEX "site_pages_rels_categories_id_idx" ON "site_pages_rels" USING btree ("categories_id");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");