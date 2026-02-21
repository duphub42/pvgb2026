import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds mega_menu_id to payload_locked_documents_rels for document locking.
 * Neon/Postgres may have been created before Payload expected this column.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "mega_menu_id" integer REFERENCES "mega_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mega_menu_id_idx"
    ON "payload_locked_documents_rels" USING btree ("mega_menu_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_mega_menu_id_idx";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "mega_menu_id";
  `)
}
