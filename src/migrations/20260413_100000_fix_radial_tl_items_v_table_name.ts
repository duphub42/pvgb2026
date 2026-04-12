import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_radial_tl_v_items'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_radial_tl_items_v'
      ) THEN
        ALTER TABLE "_radial_tl_v_items" RENAME TO "_radial_tl_items_v";
      END IF;
    END $$;
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_radial_tl_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "date" varchar,
      "category" varchar,
      "icon" varchar DEFAULT 'Calendar',
      "status" varchar DEFAULT 'pending',
      "energy" integer DEFAULT 50,
      "content" varchar,
      "related_ids" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_order_idx" ON "_radial_tl_items_v" ("_order");
    CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_id_idx" ON "_radial_tl_items_v" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_radial_tl_items_v'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_radial_tl_v_items'
      ) THEN
        ALTER TABLE "_radial_tl_items_v" RENAME TO "_radial_tl_v_items";
      END IF;
    END $$;
  `),
  )

  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_radial_tl_items_v";`))
}
