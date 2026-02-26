import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds hero_backgrounds_id to payload_locked_documents_rels for document locking.
 * Without this column the admin panel throws when opening Hero Backgrounds.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "hero_backgrounds_id" integer REFERENCES "hero_backgrounds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hero_backgrounds_id_idx"
    ON "payload_locked_documents_rels" USING btree ("hero_backgrounds_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_hero_backgrounds_id_idx";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "hero_backgrounds_id";
  `)
}
