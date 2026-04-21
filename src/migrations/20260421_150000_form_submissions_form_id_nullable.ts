import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE IF EXISTS "form_submissions"
      ALTER COLUMN "form_id" DROP NOT NULL;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE IF EXISTS "form_submissions"
      ALTER COLUMN "form_id" SET NOT NULL;
    `),
  )
}
