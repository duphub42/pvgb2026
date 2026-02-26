import * as migration_20260213_172621_initial from './20260213_172621_initial'
import * as migration_20260215_000000_hero_philipp_bacher from './20260215_000000_hero_philipp_bacher'
import * as migration_20260215_100000_header_logo from './20260215_100000_header_logo'
import * as migration_20260215_200000_pages_parent from './20260215_200000_pages_parent'
import * as migration_20260215_250000_header_use_mega_menu from './20260215_250000_header_use_mega_menu'
import * as migration_20260215_300000_mega_menu from './20260215_300000_mega_menu'
import * as migration_20260215_400000_rename_pages_to_site_pages from './20260215_400000_rename_pages_to_site_pages'
import * as migration_20260215_500000_rename_posts_to_blog_posts from './20260215_500000_rename_posts_to_blog_posts'
import * as migration_20260215_600000_header_mega_menu_layout from './20260215_600000_header_mega_menu_layout'
import * as migration_20260215_700000_design_global from './20260215_700000_design_global'
import * as migration_20260215_800000_seed_globals from './20260215_800000_seed_globals'
import * as migration_20260215_900000_footer_extended from './20260215_900000_footer_extended'
import * as migration_20260215_950000_footer_logo_on_dark from './20260215_950000_footer_logo_on_dark'
import * as migration_20260219_100000_mega_menu_category_description from './20260219_100000_mega_menu_category_description'
import * as migration_20260219_110000_mega_menu_category_description_group from './20260219_110000_mega_menu_category_description_group'
import * as migration_20260219_120000_header_mega_menu_flattened_and_card_style from './20260219_120000_header_mega_menu_flattened_and_card_style'
import * as migration_20260219_130000_site_pages_hero_floating_elements from './20260219_130000_site_pages_hero_floating_elements'
import * as migration_20260219_140000_header_mega_menu_cta_columns from './20260219_140000_header_mega_menu_cta_columns'
import * as migration_20260219_150000_site_pages_hero_marquee_logos from './20260219_150000_site_pages_hero_marquee_logos'
import * as migration_20260219_160000_site_pages_blocks_style_columns from './20260219_160000_site_pages_blocks_style_columns'
import * as migration_20260219_170000_site_pages_hero_headline_lines from './20260219_170000_site_pages_hero_headline_lines'
import * as migration_20260219_180000_site_pages_hero_halo_and_floating from './20260219_180000_site_pages_hero_halo_and_floating'
import * as migration_20260219_190000_site_pages_hero_marquee_headline from './20260219_190000_site_pages_hero_marquee_headline'
import * as migration_20260219_200000_footer_columns_and_social_tables from './20260219_200000_footer_columns_and_social_tables'
import * as migration_20260219_210000_design_flat_and_theme_settings from './20260219_210000_design_flat_and_theme_settings'
import * as migration_20260221_000000_locked_documents_rels_mega_menu from './20260221_000000_locked_documents_rels_mega_menu'
import * as migration_20260221_100000_site_pages_hero_floating_elements_uuid from './20260221_100000_site_pages_hero_floating_elements_uuid'
import * as migration_20260221_200000_mega_menu_sub_items_image_id from './20260221_200000_mega_menu_sub_items_image_id'
import * as migration_20260221_250000_rename_mega_menu_column_items_to_columns_items from './20260221_250000_rename_mega_menu_column_items_to_columns_items'
import * as migration_20260221_300000_mega_menu_columns_items_description from './20260221_300000_mega_menu_columns_items_description'
import * as migration_20260221_400000_mega_menu_columns_items_image_badge from './20260221_400000_mega_menu_columns_items_image_badge'
import * as migration_20260221_500000_mega_menu_columns_width_divider_bg from './20260221_500000_mega_menu_columns_width_divider_bg'
import * as migration_20260221_600000_mega_menu_icon_image_appearance_cols from './20260221_600000_mega_menu_icon_image_appearance_cols'
import * as migration_20260221_700000_mega_menu_highlight_position from './20260221_700000_mega_menu_highlight_position'
import * as migration_20260221_750000_mega_menu_highlight_background from './20260221_750000_mega_menu_highlight_background'
import * as migration_20260221_760000_mega_menu_highlight_cards_table from './20260221_760000_mega_menu_highlight_cards_table'
import * as migration_20260221_800000_site_pages_version_tables_uuid from './20260221_800000_site_pages_version_tables_uuid'
import * as migration_20260221_900000_version_marquee_logos_id_serial from './20260221_900000_version_marquee_logos_id_serial'
import * as migration_20260224_100000_mega_menu_highlight_icon from './20260224_100000_mega_menu_highlight_icon'
import * as migration_20260225_100000_drizzle_missing_blocks from './20260225_100000_drizzle_missing_blocks'
import * as migration_20260225_110000_footer_columns_icon from './20260225_110000_footer_columns_icon'
import * as migration_20260225_120000_footer_missing_columns from './20260225_120000_footer_missing_columns'
import * as migration_20260225_130000_drizzle_missing_block_versions from './20260225_130000_drizzle_missing_block_versions'
import * as migration_20260225_140000_header_favicon from './20260225_140000_header_favicon'
import * as migration_20260226_100000_site_pages_hero_media_type_mobile from './20260226_100000_site_pages_hero_media_type_mobile'
import * as migration_20260226_110000_site_pages_hero_background_preset from './20260226_110000_site_pages_hero_background_preset'
import * as migration_20260226_120000_hero_backgrounds_table from './20260226_120000_hero_backgrounds_table'
import * as migration_20260226_130000_locked_documents_rels_hero_backgrounds from './20260226_130000_locked_documents_rels_hero_backgrounds'

export const migrations = [
  {
    up: migration_20260213_172621_initial.up,
    down: migration_20260213_172621_initial.down,
    name: '20260213_172621_initial',
  },
  {
    up: migration_20260215_000000_hero_philipp_bacher.up,
    down: migration_20260215_000000_hero_philipp_bacher.down,
    name: '20260215_000000_hero_philipp_bacher',
  },
  {
    up: migration_20260215_100000_header_logo.up,
    down: migration_20260215_100000_header_logo.down,
    name: '20260215_100000_header_logo',
  },
  {
    up: migration_20260215_200000_pages_parent.up,
    down: migration_20260215_200000_pages_parent.down,
    name: '20260215_200000_pages_parent',
  },
  {
    up: migration_20260215_250000_header_use_mega_menu.up,
    down: migration_20260215_250000_header_use_mega_menu.down,
    name: '20260215_250000_header_use_mega_menu',
  },
  {
    up: migration_20260215_300000_mega_menu.up,
    down: migration_20260215_300000_mega_menu.down,
    name: '20260215_300000_mega_menu',
  },
  {
    up: migration_20260215_400000_rename_pages_to_site_pages.up,
    down: migration_20260215_400000_rename_pages_to_site_pages.down,
    name: '20260215_400000_rename_pages_to_site_pages',
  },
  {
    up: migration_20260215_500000_rename_posts_to_blog_posts.up,
    down: migration_20260215_500000_rename_posts_to_blog_posts.down,
    name: '20260215_500000_rename_posts_to_blog_posts',
  },
  {
    up: migration_20260215_600000_header_mega_menu_layout.up,
    down: migration_20260215_600000_header_mega_menu_layout.down,
    name: '20260215_600000_header_mega_menu_layout',
  },
  {
    up: migration_20260215_700000_design_global.up,
    down: migration_20260215_700000_design_global.down,
    name: '20260215_700000_design_global',
  },
  {
    up: migration_20260215_800000_seed_globals.up,
    down: migration_20260215_800000_seed_globals.down,
    name: '20260215_800000_seed_globals',
  },
  {
    up: migration_20260215_900000_footer_extended.up,
    down: migration_20260215_900000_footer_extended.down,
    name: '20260215_900000_footer_extended',
  },
  {
    up: migration_20260215_950000_footer_logo_on_dark.up,
    down: migration_20260215_950000_footer_logo_on_dark.down,
    name: '20260215_950000_footer_logo_on_dark',
  },
  {
    up: migration_20260219_100000_mega_menu_category_description.up,
    down: migration_20260219_100000_mega_menu_category_description.down,
    name: '20260219_100000_mega_menu_category_description',
  },
  {
    up: migration_20260219_110000_mega_menu_category_description_group.up,
    down: migration_20260219_110000_mega_menu_category_description_group.down,
    name: '20260219_110000_mega_menu_category_description_group',
  },
  {
    up: migration_20260219_120000_header_mega_menu_flattened_and_card_style.up,
    down: migration_20260219_120000_header_mega_menu_flattened_and_card_style.down,
    name: '20260219_120000_header_mega_menu_flattened_and_card_style',
  },
  {
    up: migration_20260219_130000_site_pages_hero_floating_elements.up,
    down: migration_20260219_130000_site_pages_hero_floating_elements.down,
    name: '20260219_130000_site_pages_hero_floating_elements',
  },
  {
    up: migration_20260219_140000_header_mega_menu_cta_columns.up,
    down: migration_20260219_140000_header_mega_menu_cta_columns.down,
    name: '20260219_140000_header_mega_menu_cta_columns',
  },
  {
    up: migration_20260219_150000_site_pages_hero_marquee_logos.up,
    down: migration_20260219_150000_site_pages_hero_marquee_logos.down,
    name: '20260219_150000_site_pages_hero_marquee_logos',
  },
  {
    up: migration_20260219_160000_site_pages_blocks_style_columns.up,
    down: migration_20260219_160000_site_pages_blocks_style_columns.down,
    name: '20260219_160000_site_pages_blocks_style_columns',
  },
  {
    up: migration_20260219_170000_site_pages_hero_headline_lines.up,
    down: migration_20260219_170000_site_pages_hero_headline_lines.down,
    name: '20260219_170000_site_pages_hero_headline_lines',
  },
  {
    up: migration_20260219_180000_site_pages_hero_halo_and_floating.up,
    down: migration_20260219_180000_site_pages_hero_halo_and_floating.down,
    name: '20260219_180000_site_pages_hero_halo_and_floating',
  },
  {
    up: migration_20260219_190000_site_pages_hero_marquee_headline.up,
    down: migration_20260219_190000_site_pages_hero_marquee_headline.down,
    name: '20260219_190000_site_pages_hero_marquee_headline',
  },
  {
    up: migration_20260219_200000_footer_columns_and_social_tables.up,
    down: migration_20260219_200000_footer_columns_and_social_tables.down,
    name: '20260219_200000_footer_columns_and_social_tables',
  },
  {
    up: migration_20260219_210000_design_flat_and_theme_settings.up,
    down: migration_20260219_210000_design_flat_and_theme_settings.down,
    name: '20260219_210000_design_flat_and_theme_settings',
  },
  {
    up: migration_20260221_000000_locked_documents_rels_mega_menu.up,
    down: migration_20260221_000000_locked_documents_rels_mega_menu.down,
    name: '20260221_000000_locked_documents_rels_mega_menu',
  },
  {
    up: migration_20260221_100000_site_pages_hero_floating_elements_uuid.up,
    down: migration_20260221_100000_site_pages_hero_floating_elements_uuid.down,
    name: '20260221_100000_site_pages_hero_floating_elements_uuid',
  },
  {
    up: migration_20260221_200000_mega_menu_sub_items_image_id.up,
    down: migration_20260221_200000_mega_menu_sub_items_image_id.down,
    name: '20260221_200000_mega_menu_sub_items_image_id',
  },
  {
    up: migration_20260221_250000_rename_mega_menu_column_items_to_columns_items.up,
    down: migration_20260221_250000_rename_mega_menu_column_items_to_columns_items.down,
    name: '20260221_250000_rename_mega_menu_column_items_to_columns_items',
  },
  {
    up: migration_20260221_300000_mega_menu_columns_items_description.up,
    down: migration_20260221_300000_mega_menu_columns_items_description.down,
    name: '20260221_300000_mega_menu_columns_items_description',
  },
  {
    up: migration_20260221_400000_mega_menu_columns_items_image_badge.up,
    down: migration_20260221_400000_mega_menu_columns_items_image_badge.down,
    name: '20260221_400000_mega_menu_columns_items_image_badge',
  },
  {
    up: migration_20260221_500000_mega_menu_columns_width_divider_bg.up,
    down: migration_20260221_500000_mega_menu_columns_width_divider_bg.down,
    name: '20260221_500000_mega_menu_columns_width_divider_bg',
  },
  {
    up: migration_20260221_600000_mega_menu_icon_image_appearance_cols.up,
    down: migration_20260221_600000_mega_menu_icon_image_appearance_cols.down,
    name: '20260221_600000_mega_menu_icon_image_appearance_cols',
  },
  {
    up: migration_20260221_700000_mega_menu_highlight_position.up,
    down: migration_20260221_700000_mega_menu_highlight_position.down,
    name: '20260221_700000_mega_menu_highlight_position',
  },
  {
    up: migration_20260221_750000_mega_menu_highlight_background.up,
    down: migration_20260221_750000_mega_menu_highlight_background.down,
    name: '20260221_750000_mega_menu_highlight_background',
  },
  {
    up: migration_20260221_760000_mega_menu_highlight_cards_table.up,
    down: migration_20260221_760000_mega_menu_highlight_cards_table.down,
    name: '20260221_760000_mega_menu_highlight_cards_table',
  },
  {
    up: migration_20260221_800000_site_pages_version_tables_uuid.up,
    down: migration_20260221_800000_site_pages_version_tables_uuid.down,
    name: '20260221_800000_site_pages_version_tables_uuid',
  },
  {
    up: migration_20260221_900000_version_marquee_logos_id_serial.up,
    down: migration_20260221_900000_version_marquee_logos_id_serial.down,
    name: '20260221_900000_version_marquee_logos_id_serial',
  },
  {
    up: migration_20260224_100000_mega_menu_highlight_icon.up,
    down: migration_20260224_100000_mega_menu_highlight_icon.down,
    name: '20260224_100000_mega_menu_highlight_icon',
  },
  {
    up: migration_20260225_100000_drizzle_missing_blocks.up,
    down: migration_20260225_100000_drizzle_missing_blocks.down,
    name: '20260225_100000_drizzle_missing_blocks',
  },
  {
    up: migration_20260225_110000_footer_columns_icon.up,
    down: migration_20260225_110000_footer_columns_icon.down,
    name: '20260225_110000_footer_columns_icon',
  },
  {
    up: migration_20260225_120000_footer_missing_columns.up,
    down: migration_20260225_120000_footer_missing_columns.down,
    name: '20260225_120000_footer_missing_columns',
  },
  {
    up: migration_20260225_130000_drizzle_missing_block_versions.up,
    down: migration_20260225_130000_drizzle_missing_block_versions.down,
    name: '20260225_130000_drizzle_missing_block_versions',
  },
  {
    up: migration_20260225_140000_header_favicon.up,
    down: migration_20260225_140000_header_favicon.down,
    name: '20260225_140000_header_favicon',
  },
  {
    up: migration_20260226_100000_site_pages_hero_media_type_mobile.up,
    down: migration_20260226_100000_site_pages_hero_media_type_mobile.down,
    name: '20260226_100000_site_pages_hero_media_type_mobile',
  },
  {
    up: migration_20260226_110000_site_pages_hero_background_preset.up,
    down: migration_20260226_110000_site_pages_hero_background_preset.down,
    name: '20260226_110000_site_pages_hero_background_preset',
  },
  {
    up: migration_20260226_120000_hero_backgrounds_table.up,
    down: migration_20260226_120000_hero_backgrounds_table.down,
    name: '20260226_120000_hero_backgrounds_table',
  },
  {
    up: migration_20260226_130000_locked_documents_rels_hero_backgrounds.up,
    down: migration_20260226_130000_locked_documents_rels_hero_backgrounds.down,
    name: '20260226_130000_locked_documents_rels_hero_backgrounds',
  },
]
