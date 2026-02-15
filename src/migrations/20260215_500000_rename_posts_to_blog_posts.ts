import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Renames the "posts" collection tables and enums to "blog_posts"
 * so the collection slug can be "blog-posts" (avoids Payload 3 reserved slug "posts").
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Update archive block relation_to enum values (site_pages blocks reference "posts" collection)
  //    Enums were renamed to site_pages in migration 20260215_400000.
  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_site_pages_blocks_archive_relation_to" RENAME VALUE 'posts' TO 'blog-posts';
    ALTER TYPE "public"."enum__site_pages_v_blocks_archive_relation_to" RENAME VALUE 'posts' TO 'blog-posts';
  `))

  // 2. Rename posts enum types
  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_posts_status" RENAME TO "enum_blog_posts_status";
    ALTER TYPE "public"."enum__posts_v_version_status" RENAME TO "enum__blog_posts_v_version_status";
  `))

  // 3. Rename posts tables
  await db.execute(sql.raw(`
    ALTER TABLE "public"."posts_populated_authors" RENAME TO "blog_posts_populated_authors";
    ALTER TABLE "public"."posts_rels" RENAME TO "blog_posts_rels";
    ALTER TABLE "public"."posts" RENAME TO "blog_posts";
    ALTER TABLE "public"."_posts_v_version_populated_authors" RENAME TO "_blog_posts_v_version_populated_authors";
    ALTER TABLE "public"."_posts_v_rels" RENAME TO "_blog_posts_v_rels";
    ALTER TABLE "public"."_posts_v" RENAME TO "_blog_posts_v";
  `))

  // 4. Rename posts_id -> blog_posts_id in all rels tables
  await db.execute(sql.raw(`
    ALTER TABLE "public"."blog_posts_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."_blog_posts_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."site_pages_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."_site_pages_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."redirects_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."search_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."payload_locked_documents_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."header_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
    ALTER TABLE "public"."footer_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."blog_posts_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."_blog_posts_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."site_pages_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."_site_pages_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."redirects_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."search_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."payload_locked_documents_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."header_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
    ALTER TABLE "public"."footer_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "public"."blog_posts_populated_authors" RENAME TO "posts_populated_authors";
    ALTER TABLE "public"."blog_posts_rels" RENAME TO "posts_rels";
    ALTER TABLE "public"."blog_posts" RENAME TO "posts";
    ALTER TABLE "public"."_blog_posts_v_version_populated_authors" RENAME TO "_posts_v_version_populated_authors";
    ALTER TABLE "public"."_blog_posts_v_rels" RENAME TO "_posts_v_rels";
    ALTER TABLE "public"."_blog_posts_v" RENAME TO "_posts_v";
  `))

  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_blog_posts_status" RENAME TO "enum_posts_status";
    ALTER TYPE "public"."enum__blog_posts_v_version_status" RENAME TO "enum__posts_v_version_status";
  `))

  await db.execute(sql.raw(`
    ALTER TYPE "public"."enum_site_pages_blocks_archive_relation_to" RENAME VALUE 'blog-posts' TO 'posts';
    ALTER TYPE "public"."enum__site_pages_v_blocks_archive_relation_to" RENAME VALUE 'blog-posts' TO 'posts';
  `))
}
