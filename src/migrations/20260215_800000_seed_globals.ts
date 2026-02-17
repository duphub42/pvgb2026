import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Legt je einen Initial-Eintrag für die Globals Header, Footer und Design an,
 * falls die Tabelle leer ist. Behebt "Nothing found" im Admin.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "header" ("updated_at", "created_at")
    SELECT NOW(), NOW()
    WHERE NOT EXISTS (SELECT 1 FROM "header" LIMIT 1);
  `)
  await db.execute(sql`
    INSERT INTO "footer" ("updated_at", "created_at")
    SELECT NOW(), NOW()
    WHERE NOT EXISTS (SELECT 1 FROM "footer" LIMIT 1);
  `)
  await db.execute(sql`
    INSERT INTO "design" ("updated_at", "created_at")
    SELECT NOW(), NOW()
    WHERE NOT EXISTS (SELECT 1 FROM "design" LIMIT 1);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  /* Seed-Rückgängig nicht erforderlich; Globals können weiter genutzt werden. */
}
