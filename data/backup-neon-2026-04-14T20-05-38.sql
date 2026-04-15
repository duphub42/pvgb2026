-- Neon Backup
-- Erstellt: 2026-04-14T20:05:38.915Z

CREATE TABLE IF NOT EXISTS "_blog_posts_v" (
  "id" integer NOT NULL,
  "parent_id" integer,
  "version_title" character varying,
  "version_hero_image_id" integer,
  "version_content" jsonb,
  "version_meta_title" character varying,
  "version_meta_image_id" integer,
  "version_meta_description" character varying,
  "version_published_at" timestamp with time zone,
  "version_generate_slug" boolean,
  "version_slug" character varying,
  "version_updated_at" timestamp with time zone,
  "version_created_at" timestamp with time zone,
  "version__status" USER-DEFINED,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_blog_posts_v_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "blog_posts_id" integer,
  "categories_id" integer,
  "users_id" integer
);

CREATE TABLE IF NOT EXISTS "_blog_posts_v_version_populated_authors" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" integer NOT NULL,
  "_uuid" character varying,
  "name" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v" (
  "id" integer NOT NULL,
  "parent_id" integer,
  "version_title" character varying,
  "version_hero_type" USER-DEFINED,
  "version_hero_rich_text" jsonb,
  "version_hero_media_id" integer,
  "version_meta_title" character varying,
  "version_meta_image_id" integer,
  "version_meta_description" character varying,
  "version_published_at" timestamp with time zone,
  "version_generate_slug" boolean,
  "version_slug" character varying,
  "version_updated_at" timestamp with time zone,
  "version_created_at" timestamp with time zone,
  "version__status" USER-DEFINED,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "latest" boolean,
  "autosave" boolean,
  "version_hero_subheadline" character varying,
  "version_hero_headline" character varying,
  "version_hero_description" text,
  "version_hero_media_type" character varying,
  "version_hero_background_image_id" integer,
  "version_hero_background_video_id" integer,
  "version_hero_foreground_image_id" integer,
  "version_hero_overlay_opacity" double precision,
  "version_parent_id" integer,
  "version_hero_headline_line1" character varying,
  "version_hero_headline_line2" character varying,
  "version_hero_headline_line3" character varying,
  "version_hero_logo_display_type" character varying,
  "version_hero_floating_mouse_strength" double precision,
  "version_hero_floating_idle_amplitude" double precision,
  "version_hero_halo_amplitude_factor" double precision,
  "version_hero_halo_size" double precision,
  "version_hero_halo_speed" double precision,
  "version_hero_halo_color2" integer,
  "version_hero_halo_x_offset" double precision,
  "version_hero_halo_y_offset" double precision,
  "version_hero_halo_overlay_gradient" double precision,
  "version_hero_halo_overlay_grid" double precision,
  "version_hero_halo_overlay_grid_size" integer,
  "version_hero_use_halo_background" boolean,
  "version_hero_halo_overlay_grid_variant" character varying,
  "version_hero_halo_overlay_grid_custom_code" text,
  "version_hero_marquee_headline" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_archive" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" integer NOT NULL,
  "intro_content" jsonb,
  "populate_by" USER-DEFINED,
  "relation_to" USER-DEFINED,
  "limit" numeric,
  "_uuid" character varying,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" integer NOT NULL,
  "_uuid" character varying,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content_columns" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" integer NOT NULL,
  "size" USER-DEFINED,
  "rich_text" jsonb,
  "enable_link" boolean,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED,
  "_uuid" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" integer NOT NULL,
  "rich_text" jsonb,
  "_uuid" character varying,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" integer NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED,
  "_uuid" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_form_block" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" integer NOT NULL,
  "form_id" integer,
  "enable_intro" boolean,
  "intro_content" jsonb,
  "_uuid" character varying,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_media_block" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" integer NOT NULL,
  "media_id" integer,
  "_uuid" character varying,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer,
  "categories_id" integer
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_floating_elements" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "label" character varying,
  "icon_id" integer,
  "link_url" character varying,
  "link_new_tab" boolean,
  "position" character varying,
  "offset_x" double precision,
  "offset_y" double precision,
  "_uuid" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" integer NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED,
  "_uuid" character varying
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "logo_id" integer,
  "alt" character varying
);

CREATE TABLE IF NOT EXISTS "blog_posts" (
  "id" integer NOT NULL,
  "title" character varying,
  "hero_image_id" integer,
  "content" jsonb,
  "meta_title" character varying,
  "meta_image_id" integer,
  "meta_description" character varying,
  "published_at" timestamp with time zone,
  "generate_slug" boolean,
  "slug" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "_status" USER-DEFINED
);

CREATE TABLE IF NOT EXISTS "blog_posts_populated_authors" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying
);

CREATE TABLE IF NOT EXISTS "blog_posts_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "blog_posts_id" integer,
  "categories_id" integer,
  "users_id" integer
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" integer NOT NULL,
  "title" character varying NOT NULL,
  "generate_slug" boolean,
  "slug" character varying NOT NULL,
  "parent_id" integer,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories_breadcrumbs" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "doc_id" integer,
  "url" character varying,
  "label" character varying
);

CREATE TABLE IF NOT EXISTS "design" (
  "id" integer NOT NULL,
  "updated_at" timestamp with time zone,
  "created_at" timestamp with time zone,
  "colors_light_success" character varying,
  "colors_light_background" character varying,
  "colors_light_foreground" character varying,
  "colors_light_card" character varying,
  "colors_light_card_foreground" character varying,
  "colors_light_popover" character varying,
  "colors_light_popover_foreground" character varying,
  "colors_light_link" character varying,
  "colors_light_link_hover" character varying,
  "colors_light_border" character varying,
  "colors_light_muted" character varying,
  "colors_light_muted_foreground" character varying,
  "colors_light_destructive" character varying,
  "colors_light_mega_menu_button_bg_use_custom" boolean,
  "colors_light_mega_menu_button_bg" character varying,
  "colors_light_mega_menu_button_fg_use_custom" boolean,
  "colors_light_mega_menu_button_fg" character varying,
  "colors_light_mega_menu_nav_text_use_custom" boolean,
  "colors_light_mega_menu_nav_text" character varying,
  "colors_light_mega_menu_heading_use_custom" boolean,
  "colors_light_mega_menu_heading" character varying,
  "colors_light_mega_menu_item_text_use_custom" boolean,
  "colors_light_mega_menu_item_text" character varying,
  "colors_light_mega_menu_description_use_custom" boolean,
  "colors_light_mega_menu_description" character varying,
  "colors_dark_success" character varying,
  "colors_dark_background" character varying,
  "colors_dark_foreground" character varying,
  "colors_dark_card" character varying,
  "colors_dark_card_foreground" character varying,
  "colors_dark_popover" character varying,
  "colors_dark_popover_foreground" character varying,
  "colors_dark_link" character varying,
  "colors_dark_link_hover" character varying,
  "colors_dark_border" character varying,
  "colors_dark_muted" character varying,
  "colors_dark_muted_foreground" character varying,
  "colors_dark_destructive" character varying,
  "colors_dark_mega_menu_button_bg_use_custom" boolean,
  "colors_dark_mega_menu_button_bg" character varying,
  "colors_dark_mega_menu_button_fg_use_custom" boolean,
  "colors_dark_mega_menu_button_fg" character varying,
  "colors_dark_mega_menu_nav_text_use_custom" boolean,
  "colors_dark_mega_menu_nav_text" character varying,
  "colors_dark_mega_menu_heading_use_custom" boolean,
  "colors_dark_mega_menu_heading" character varying,
  "colors_dark_mega_menu_item_text_use_custom" boolean,
  "colors_dark_mega_menu_item_text" character varying,
  "colors_dark_mega_menu_description_use_custom" boolean,
  "colors_dark_mega_menu_description" character varying,
  "fonts_body" character varying,
  "fonts_heading" character varying,
  "fonts_mono" character varying
);

CREATE TABLE IF NOT EXISTS "footer" (
  "id" integer NOT NULL,
  "updated_at" timestamp with time zone,
  "created_at" timestamp with time zone,
  "footer_logo_id" integer,
  "footer_logo_alt_text" character varying,
  "newsletter_title" character varying,
  "newsletter_description" jsonb,
  "newsletter_placeholder" character varying,
  "newsletter_button_text" character varying,
  "columns" jsonb,
  "social_links" jsonb,
  "copyright_text" character varying,
  "privacy_link" character varying,
  "terms_link" character varying,
  "background_color" character varying,
  "text_color" character varying,
  "link_hover_color" character varying,
  "logo_on_dark_background" boolean
);

CREATE TABLE IF NOT EXISTS "footer_columns" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "column_title" character varying
);

CREATE TABLE IF NOT EXISTS "footer_columns_links" (
  "_order" integer NOT NULL,
  "_parent_id" character varying NOT NULL,
  "id" character varying NOT NULL,
  "link_text" character varying,
  "link_url" character varying,
  "is_external" boolean
);

CREATE TABLE IF NOT EXISTS "footer_nav_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS "footer_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer
);

CREATE TABLE IF NOT EXISTS "footer_social_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "platform" character varying,
  "url" character varying,
  "icon_upload_id" integer
);

CREATE TABLE IF NOT EXISTS "form_submissions" (
  "id" integer NOT NULL,
  "form_id" integer NOT NULL,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "field" character varying NOT NULL,
  "value" character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms" (
  "id" integer NOT NULL,
  "title" character varying NOT NULL,
  "submit_button_label" character varying,
  "confirmation_type" USER-DEFINED,
  "confirmation_message" jsonb,
  "redirect_url" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "required" boolean,
  "default_value" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "message" jsonb,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "default_value" numeric,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "default_value" character varying,
  "placeholder" character varying,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  "_order" integer NOT NULL,
  "_parent_id" character varying NOT NULL,
  "id" character varying NOT NULL,
  "label" character varying NOT NULL,
  "value" character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "default_value" character varying,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "label" character varying,
  "width" numeric,
  "default_value" character varying,
  "required" boolean,
  "block_name" character varying
);

CREATE TABLE IF NOT EXISTS "forms_emails" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "email_to" character varying,
  "cc" character varying,
  "bcc" character varying,
  "reply_to" character varying,
  "email_from" character varying,
  "subject" character varying NOT NULL,
  "message" jsonb
);

CREATE TABLE IF NOT EXISTS "header" (
  "id" integer NOT NULL,
  "updated_at" timestamp with time zone,
  "created_at" timestamp with time zone,
  "logo_id" integer,
  "use_mega_menu" boolean,
  "mega_menu_layout" jsonb,
  "mega_menu_layout_sidebar_cols" integer,
  "mega_menu_layout_content_cols" integer,
  "mega_menu_layout_featured_cols" integer,
  "mega_menu_card_border_radius" character varying,
  "mega_menu_card_shadow" character varying,
  "mega_menu_card_hover_shadow" character varying,
  "mega_menu_card_hover_border" character varying,
  "mega_menu_show_whats_app" boolean,
  "mega_menu_whats_app_label" character varying,
  "mega_menu_whats_app_url" character varying,
  "mega_menu_show_callback" boolean,
  "mega_menu_callback_title" character varying,
  "mega_menu_callback_placeholder" character varying,
  "mega_menu_callback_button_text" character varying,
  "mega_menu_callback_form_id" integer,
  "mega_menu_callback_phone_field_name" character varying,
  "mega_menu_show_newsletter" boolean,
  "mega_menu_newsletter_title" character varying,
  "mega_menu_newsletter_placeholder" character varying,
  "mega_menu_newsletter_button_text" character varying,
  "mega_menu_newsletter_form_id" integer,
  "mega_menu_newsletter_email_field_name" character varying
);

CREATE TABLE IF NOT EXISTS "header_nav_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS "header_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
  "id" integer NOT NULL,
  "alt" character varying,
  "caption" jsonb,
  "folder_id" integer,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "url" character varying,
  "thumbnail_u_r_l" character varying,
  "filename" character varying,
  "mime_type" character varying,
  "filesize" numeric,
  "width" numeric,
  "height" numeric,
  "focal_x" numeric,
  "focal_y" numeric,
  "sizes_thumbnail_url" character varying,
  "sizes_thumbnail_width" numeric,
  "sizes_thumbnail_height" numeric,
  "sizes_thumbnail_mime_type" character varying,
  "sizes_thumbnail_filesize" numeric,
  "sizes_thumbnail_filename" character varying,
  "sizes_square_url" character varying,
  "sizes_square_width" numeric,
  "sizes_square_height" numeric,
  "sizes_square_mime_type" character varying,
  "sizes_square_filesize" numeric,
  "sizes_square_filename" character varying,
  "sizes_small_url" character varying,
  "sizes_small_width" numeric,
  "sizes_small_height" numeric,
  "sizes_small_mime_type" character varying,
  "sizes_small_filesize" numeric,
  "sizes_small_filename" character varying,
  "sizes_medium_url" character varying,
  "sizes_medium_width" numeric,
  "sizes_medium_height" numeric,
  "sizes_medium_mime_type" character varying,
  "sizes_medium_filesize" numeric,
  "sizes_medium_filename" character varying,
  "sizes_large_url" character varying,
  "sizes_large_width" numeric,
  "sizes_large_height" numeric,
  "sizes_large_mime_type" character varying,
  "sizes_large_filesize" numeric,
  "sizes_large_filename" character varying,
  "sizes_xlarge_url" character varying,
  "sizes_xlarge_width" numeric,
  "sizes_xlarge_height" numeric,
  "sizes_xlarge_mime_type" character varying,
  "sizes_xlarge_filesize" numeric,
  "sizes_xlarge_filename" character varying,
  "sizes_og_url" character varying,
  "sizes_og_width" numeric,
  "sizes_og_height" numeric,
  "sizes_og_mime_type" character varying,
  "sizes_og_filesize" numeric,
  "sizes_og_filename" character varying
);

CREATE TABLE IF NOT EXISTS "mega_menu" (
  "id" integer NOT NULL,
  "label" character varying NOT NULL,
  "url" character varying NOT NULL,
  "order" integer NOT NULL,
  "highlight_title" character varying,
  "highlight_description" text,
  "highlight_image_id" integer,
  "highlight_cta_label" character varying,
  "highlight_cta_url" character varying,
  "updated_at" timestamp with time zone,
  "created_at" timestamp with time zone,
  "category_description_title" character varying,
  "category_description_description" text,
  "icon_id" integer,
  "image_id" integer,
  "appearance" character varying,
  "column_widths_col1" integer,
  "column_widths_col2" integer,
  "column_widths_col3" integer,
  "highlight_position" character varying,
  "highlight_background" character varying
);

CREATE TABLE IF NOT EXISTS "mega_menu_columns" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "title" character varying,
  "column_width" integer,
  "divider_before" boolean,
  "column_background" character varying
);

CREATE TABLE IF NOT EXISTS "mega_menu_columns_items" (
  "_order" integer NOT NULL,
  "_parent_id" character varying NOT NULL,
  "id" character varying NOT NULL,
  "label" character varying NOT NULL,
  "url" character varying NOT NULL,
  "icon_id" integer,
  "badge" character varying,
  "description" text,
  "image_id" integer,
  "badge_color" character varying
);

CREATE TABLE IF NOT EXISTS "mega_menu_highlight_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" integer NOT NULL,
  "title" character varying,
  "description" text,
  "image_id" integer,
  "cta_label" character varying,
  "cta_url" character varying
);

CREATE TABLE IF NOT EXISTS "mega_menu_sub_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "label" character varying NOT NULL,
  "url" character varying NOT NULL,
  "icon_id" integer,
  "badge" character varying,
  "description" text,
  "image_id" integer,
  "badge_color" character varying,
  "divider_before" boolean
);

CREATE TABLE IF NOT EXISTS "payload_folders" (
  "id" integer NOT NULL,
  "name" character varying NOT NULL,
  "folder_id" integer,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_folders_folder_type" (
  "order" integer NOT NULL,
  "parent_id" integer NOT NULL,
  "value" USER-DEFINED,
  "id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_jobs" (
  "id" integer NOT NULL,
  "input" jsonb,
  "completed_at" timestamp with time zone,
  "total_tried" numeric,
  "has_error" boolean,
  "error" jsonb,
  "task_slug" USER-DEFINED,
  "queue" character varying,
  "wait_until" timestamp with time zone,
  "processing" boolean,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "executed_at" timestamp with time zone NOT NULL,
  "completed_at" timestamp with time zone NOT NULL,
  "task_slug" USER-DEFINED NOT NULL,
  "task_i_d" character varying NOT NULL,
  "input" jsonb,
  "output" jsonb,
  "state" USER-DEFINED NOT NULL,
  "error" jsonb
);

CREATE TABLE IF NOT EXISTS "payload_kv" (
  "id" integer NOT NULL,
  "key" character varying NOT NULL,
  "data" jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  "id" integer NOT NULL,
  "global_slug" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer,
  "media_id" integer,
  "categories_id" integer,
  "users_id" integer,
  "redirects_id" integer,
  "forms_id" integer,
  "form_submissions_id" integer,
  "search_id" integer,
  "payload_folders_id" integer,
  "mega_menu_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
  "id" integer NOT NULL,
  "name" character varying,
  "batch" numeric,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
  "id" integer NOT NULL,
  "key" character varying,
  "value" jsonb,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "users_id" integer
);

CREATE TABLE IF NOT EXISTS "redirects" (
  "id" integer NOT NULL,
  "from" character varying NOT NULL,
  "to_type" USER-DEFINED,
  "to_url" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "redirects_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer
);

CREATE TABLE IF NOT EXISTS "search" (
  "id" integer NOT NULL,
  "title" character varying,
  "priority" numeric,
  "slug" character varying,
  "meta_title" character varying,
  "meta_description" character varying,
  "meta_image_id" integer,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "search_categories" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "relation_to" character varying,
  "category_i_d" character varying,
  "title" character varying
);

CREATE TABLE IF NOT EXISTS "search_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "blog_posts_id" integer
);

CREATE TABLE IF NOT EXISTS "site_pages" (
  "id" integer NOT NULL,
  "title" character varying,
  "hero_type" USER-DEFINED,
  "hero_rich_text" jsonb,
  "hero_media_id" integer,
  "meta_title" character varying,
  "meta_image_id" integer,
  "meta_description" character varying,
  "published_at" timestamp with time zone,
  "generate_slug" boolean,
  "slug" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "_status" USER-DEFINED,
  "hero_subheadline" character varying,
  "hero_headline" character varying,
  "hero_description" text,
  "hero_media_type" character varying,
  "hero_background_image_id" integer,
  "hero_background_video_id" integer,
  "hero_foreground_image_id" integer,
  "hero_overlay_opacity" double precision,
  "parent_id" integer,
  "hero_headline_line1" character varying,
  "hero_headline_line2" character varying,
  "hero_headline_line3" character varying,
  "hero_logo_display_type" character varying,
  "hero_floating_mouse_strength" double precision,
  "hero_floating_idle_amplitude" double precision,
  "hero_halo_amplitude_factor" double precision,
  "hero_halo_size" double precision,
  "hero_halo_speed" double precision,
  "hero_halo_color2" integer,
  "hero_halo_x_offset" double precision,
  "hero_halo_y_offset" double precision,
  "hero_halo_overlay_gradient" double precision,
  "hero_halo_overlay_grid" double precision,
  "hero_halo_overlay_grid_size" integer,
  "hero_use_halo_background" boolean,
  "hero_halo_overlay_grid_variant" character varying,
  "hero_halo_overlay_grid_custom_code" text,
  "hero_marquee_headline" character varying
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_archive" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "intro_content" jsonb,
  "populate_by" USER-DEFINED,
  "relation_to" USER-DEFINED,
  "limit" numeric,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_content" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_content_columns" (
  "_order" integer NOT NULL,
  "_parent_id" character varying NOT NULL,
  "id" character varying NOT NULL,
  "size" USER-DEFINED,
  "rich_text" jsonb,
  "enable_link" boolean,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_cta" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "rich_text" jsonb,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_cta_links" (
  "_order" integer NOT NULL,
  "_parent_id" character varying NOT NULL,
  "id" character varying NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_form_block" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "form_id" integer,
  "enable_intro" boolean,
  "intro_content" jsonb,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "site_pages_blocks_media_block" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" character varying NOT NULL,
  "media_id" integer,
  "block_name" character varying,
  "block_background" character varying,
  "block_overlay_enabled" boolean,
  "block_overlay_color" character varying,
  "block_overlay_opacity" integer
);

CREATE TABLE IF NOT EXISTS "site_pages_hero_floating_elements" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "label" character varying,
  "icon_id" integer,
  "link_url" character varying,
  "link_new_tab" boolean,
  "position" character varying,
  "offset_x" double precision,
  "offset_y" double precision,
  "_uuid" character varying
);

CREATE TABLE IF NOT EXISTS "site_pages_hero_links" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "link_type" USER-DEFINED,
  "link_new_tab" boolean,
  "link_url" character varying,
  "link_label" character varying,
  "link_appearance" USER-DEFINED
);

CREATE TABLE IF NOT EXISTS "site_pages_hero_marquee_logos" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "logo_id" integer,
  "alt" character varying
);

CREATE TABLE IF NOT EXISTS "site_pages_rels" (
  "id" integer NOT NULL,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" character varying NOT NULL,
  "site_pages_id" integer,
  "blog_posts_id" integer,
  "categories_id" integer
);

CREATE TABLE IF NOT EXISTS "theme_settings" (
  "id" integer NOT NULL,
  "primary_matches_base" boolean,
  "primary_color" character varying NOT NULL,
  "theme_mode" character varying,
  "generated_theme" jsonb,
  "css_string" text,
  "updated_at" timestamp with time zone,
  "created_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" integer NOT NULL,
  "name" character varying,
  "updated_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "email" character varying NOT NULL,
  "reset_password_token" character varying,
  "reset_password_expiration" timestamp with time zone,
  "salt" character varying,
  "hash" character varying,
  "login_attempts" numeric,
  "lock_until" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "users_sessions" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" character varying NOT NULL,
  "created_at" timestamp with time zone,
  "expires_at" timestamp with time zone NOT NULL
);

