import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Renames the "pages" collection tables and enums to "site_pages"
 * so the collection slug can be "site-pages" (avoids Payload 3 reserved slug "pages").
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Rename enum types (pages -> site_pages, _pages_v -> _site_pages_v)
  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_pages_hero_links_link_type" RENAME TO "enum_site_pages_hero_links_link_type";
    ALTER TYPE "public"."enum_pages_hero_links_link_appearance" RENAME TO "enum_site_pages_hero_links_link_appearance";
    ALTER TYPE "public"."enum_pages_blocks_cta_links_link_type" RENAME TO "enum_site_pages_blocks_cta_links_link_type";
    ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" RENAME TO "enum_site_pages_blocks_cta_links_link_appearance";
    ALTER TYPE "public"."enum_pages_blocks_content_columns_size" RENAME TO "enum_site_pages_blocks_content_columns_size";
    ALTER TYPE "public"."enum_pages_blocks_content_columns_link_type" RENAME TO "enum_site_pages_blocks_content_columns_link_type";
    ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" RENAME TO "enum_site_pages_blocks_content_columns_link_appearance";
    ALTER TYPE "public"."enum_pages_blocks_archive_populate_by" RENAME TO "enum_site_pages_blocks_archive_populate_by";
    ALTER TYPE "public"."enum_pages_blocks_archive_relation_to" RENAME TO "enum_site_pages_blocks_archive_relation_to";
    ALTER TYPE "public"."enum_pages_hero_type" RENAME TO "enum_site_pages_hero_type";
    ALTER TYPE "public"."enum_pages_status" RENAME TO "enum_site_pages_status";
    ALTER TYPE "public"."enum__pages_v_version_hero_links_link_type" RENAME TO "enum__site_pages_v_version_hero_links_link_type";
    ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" RENAME TO "enum__site_pages_v_version_hero_links_link_appearance";
    ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_type" RENAME TO "enum__site_pages_v_blocks_cta_links_link_type";
    ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" RENAME TO "enum__site_pages_v_blocks_cta_links_link_appearance";
    ALTER TYPE "public"."enum__pages_v_blocks_content_columns_size" RENAME TO "enum__site_pages_v_blocks_content_columns_size";
    ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_type" RENAME TO "enum__site_pages_v_blocks_content_columns_link_type";
    ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" RENAME TO "enum__site_pages_v_blocks_content_columns_link_appearance";
    ALTER TYPE "public"."enum__pages_v_blocks_archive_populate_by" RENAME TO "enum__site_pages_v_blocks_archive_populate_by";
    ALTER TYPE "public"."enum__pages_v_blocks_archive_relation_to" RENAME TO "enum__site_pages_v_blocks_archive_relation_to";
    ALTER TYPE "public"."enum__pages_v_version_hero_type" RENAME TO "enum__site_pages_v_version_hero_type";
    ALTER TYPE "public"."enum__pages_v_version_status" RENAME TO "enum__site_pages_v_version_status";
  `))

  // 2. Rename child/junction tables first, then main tables
  await db.execute(sql.raw(`
    ALTER TABLE "public"."pages_hero_links" RENAME TO "site_pages_hero_links";
    ALTER TABLE "public"."pages_blocks_cta_links" RENAME TO "site_pages_blocks_cta_links";
    ALTER TABLE "public"."pages_blocks_cta" RENAME TO "site_pages_blocks_cta";
    ALTER TABLE "public"."pages_blocks_content_columns" RENAME TO "site_pages_blocks_content_columns";
    ALTER TABLE "public"."pages_blocks_content" RENAME TO "site_pages_blocks_content";
    ALTER TABLE "public"."pages_blocks_media_block" RENAME TO "site_pages_blocks_media_block";
    ALTER TABLE "public"."pages_blocks_archive" RENAME TO "site_pages_blocks_archive";
    ALTER TABLE "public"."pages_blocks_form_block" RENAME TO "site_pages_blocks_form_block";
    ALTER TABLE "public"."pages_rels" RENAME TO "site_pages_rels";
    ALTER TABLE "public"."pages" RENAME TO "site_pages";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "public"."_pages_v_version_hero_links" RENAME TO "_site_pages_v_version_hero_links";
    ALTER TABLE "public"."_pages_v_blocks_cta_links" RENAME TO "_site_pages_v_blocks_cta_links";
    ALTER TABLE "public"."_pages_v_blocks_cta" RENAME TO "_site_pages_v_blocks_cta";
    ALTER TABLE "public"."_pages_v_blocks_content_columns" RENAME TO "_site_pages_v_blocks_content_columns";
    ALTER TABLE "public"."_pages_v_blocks_content" RENAME TO "_site_pages_v_blocks_content";
    ALTER TABLE "public"."_pages_v_blocks_media_block" RENAME TO "_site_pages_v_blocks_media_block";
    ALTER TABLE "public"."_pages_v_blocks_archive" RENAME TO "_site_pages_v_blocks_archive";
    ALTER TABLE "public"."_pages_v_blocks_form_block" RENAME TO "_site_pages_v_blocks_form_block";
    ALTER TABLE "public"."_pages_v_rels" RENAME TO "_site_pages_v_rels";
    ALTER TABLE "public"."_pages_v" RENAME TO "_site_pages_v";
  `))

  // 3. Update column type references (columns using these enums stay valid after type rename)
  // 4. Update foreign key target table names: rels and version tables reference "pages" by name
  //    In Postgres, FK is by table reference; after RENAME the reference is to the new name, so we're good.
  // 5. Rename columns "pages_id" -> "site_pages_id" in all rels tables so Payload (slug "site-pages") finds them
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
    ALTER TABLE "public"."_site_pages_v_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
    ALTER TABLE "public"."redirects_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
    ALTER TABLE "public"."payload_locked_documents_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
    ALTER TABLE "public"."header_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
    ALTER TABLE "public"."footer_rels" RENAME COLUMN "pages_id" TO "site_pages_id";
  `))

  // 6. Update FK constraint names that reference old table name (optional for consistency;
  //    Postgres allows duplicate constraint names across tables). Recreate FKs if needed.
  //    Actually Payload may look for constraint names - leave as-is; only table/column matter.
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
    ALTER TABLE "public"."_site_pages_v_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
    ALTER TABLE "public"."redirects_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
    ALTER TABLE "public"."payload_locked_documents_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
    ALTER TABLE "public"."header_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
    ALTER TABLE "public"."footer_rels" RENAME COLUMN "site_pages_id" TO "pages_id";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages_hero_links" RENAME TO "pages_hero_links";
    ALTER TABLE "public"."site_pages_blocks_cta_links" RENAME TO "pages_blocks_cta_links";
    ALTER TABLE "public"."site_pages_blocks_cta" RENAME TO "pages_blocks_cta";
    ALTER TABLE "public"."site_pages_blocks_content_columns" RENAME TO "pages_blocks_content_columns";
    ALTER TABLE "public"."site_pages_blocks_content" RENAME TO "pages_blocks_content";
    ALTER TABLE "public"."site_pages_blocks_media_block" RENAME TO "pages_blocks_media_block";
    ALTER TABLE "public"."site_pages_blocks_archive" RENAME TO "pages_blocks_archive";
    ALTER TABLE "public"."site_pages_blocks_form_block" RENAME TO "pages_blocks_form_block";
    ALTER TABLE "public"."site_pages_rels" RENAME TO "pages_rels";
    ALTER TABLE "public"."site_pages" RENAME TO "pages";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v_version_hero_links" RENAME TO "_pages_v_version_hero_links";
    ALTER TABLE "public"."_site_pages_v_blocks_cta_links" RENAME TO "_pages_v_blocks_cta_links";
    ALTER TABLE "public"."_site_pages_v_blocks_cta" RENAME TO "_pages_v_blocks_cta";
    ALTER TABLE "public"."_site_pages_v_blocks_content_columns" RENAME TO "_pages_v_blocks_content_columns";
    ALTER TABLE "public"."_site_pages_v_blocks_content" RENAME TO "_pages_v_blocks_content";
    ALTER TABLE "public"."_site_pages_v_blocks_media_block" RENAME TO "_pages_v_blocks_media_block";
    ALTER TABLE "public"."_site_pages_v_blocks_archive" RENAME TO "_pages_v_blocks_archive";
    ALTER TABLE "public"."_site_pages_v_blocks_form_block" RENAME TO "_pages_v_blocks_form_block";
    ALTER TABLE "public"."_site_pages_v_rels" RENAME TO "_pages_v_rels";
    ALTER TABLE "public"."_site_pages_v" RENAME TO "_pages_v";
  `))

  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_site_pages_hero_links_link_type" RENAME TO "enum_pages_hero_links_link_type";
    ALTER TYPE "public"."enum_site_pages_hero_links_link_appearance" RENAME TO "enum_pages_hero_links_link_appearance";
    ALTER TYPE "public"."enum_site_pages_blocks_cta_links_link_type" RENAME TO "enum_pages_blocks_cta_links_link_type";
    ALTER TYPE "public"."enum_site_pages_blocks_cta_links_link_appearance" RENAME TO "enum_pages_blocks_cta_links_link_appearance";
    ALTER TYPE "public"."enum_site_pages_blocks_content_columns_size" RENAME TO "enum_pages_blocks_content_columns_size";
    ALTER TYPE "public"."enum_site_pages_blocks_content_columns_link_type" RENAME TO "enum_pages_blocks_content_columns_link_type";
    ALTER TYPE "public"."enum_site_pages_blocks_content_columns_link_appearance" RENAME TO "enum_pages_blocks_content_columns_link_appearance";
    ALTER TYPE "public"."enum_site_pages_blocks_archive_populate_by" RENAME TO "enum_pages_blocks_archive_populate_by";
    ALTER TYPE "public"."enum_site_pages_blocks_archive_relation_to" RENAME TO "enum_pages_blocks_archive_relation_to";
    ALTER TYPE "public"."enum_site_pages_hero_type" RENAME TO "enum_pages_hero_type";
    ALTER TYPE "public"."enum_site_pages_status" RENAME TO "enum_pages_status";
    ALTER TYPE "public"."enum__site_pages_v_version_hero_links_link_type" RENAME TO "enum__pages_v_version_hero_links_link_type";
    ALTER TYPE "public"."enum__site_pages_v_version_hero_links_link_appearance" RENAME TO "enum__pages_v_version_hero_links_link_appearance";
    ALTER TYPE "public"."enum__site_pages_v_blocks_cta_links_link_type" RENAME TO "enum__pages_v_blocks_cta_links_link_type";
    ALTER TYPE "public"."enum__site_pages_v_blocks_cta_links_link_appearance" RENAME TO "enum__pages_v_blocks_cta_links_link_appearance";
    ALTER TYPE "public"."enum__site_pages_v_blocks_content_columns_size" RENAME TO "enum__pages_v_blocks_content_columns_size";
    ALTER TYPE "public"."enum__site_pages_v_blocks_content_columns_link_type" RENAME TO "enum__pages_v_blocks_content_columns_link_type";
    ALTER TYPE "public"."enum__site_pages_v_blocks_content_columns_link_appearance" RENAME TO "enum__pages_v_blocks_content_columns_link_appearance";
    ALTER TYPE "public"."enum__site_pages_v_blocks_archive_populate_by" RENAME TO "enum__pages_v_blocks_archive_populate_by";
    ALTER TYPE "public"."enum__site_pages_v_blocks_archive_relation_to" RENAME TO "enum__pages_v_blocks_archive_relation_to";
    ALTER TYPE "public"."enum__site_pages_v_version_hero_type" RENAME TO "enum__pages_v_version_hero_type";
    ALTER TYPE "public"."enum__site_pages_v_version_status" RENAME TO "enum__pages_v_version_status";
  `))
}
