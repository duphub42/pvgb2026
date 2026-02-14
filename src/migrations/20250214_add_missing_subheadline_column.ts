import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  try {
    // Prüfe ob die Tabelle existiert
    const tableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = '_pages_v'
      );
    `)

    if (tableExists.rows[0].exists) {
      // Prüfe ob die Spalte bereits existiert
      const columnExists = await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = '_pages_v' 
          AND column_name = 'version_hero_subheadline'
        );
      `)

      if (!columnExists.rows[0].exists) {
        // Füge die fehlende Spalte hinzu
        await db.execute(sql`
          ALTER TABLE "_pages_v" 
          ADD COLUMN "version_hero_subheadline" varchar;
        `)
        payload.logger.info('✅ version_hero_subheadline column added successfully')
      } else {
        payload.logger.info('⏩ version_hero_subheadline column already exists')
      }

      // Prüfe auch andere möglicherweise fehlende Hero-Felder
      const heroFields = [
        'version_hero_headline',
        'version_hero_description',
        'version_hero_media_type',
        'version_hero_background_video',
        'version_hero_overlay_opacity',
        'version_hero_background_image_id',
        'version_hero_foreground_image_id',
        'version_hero_rich_text',
        'version_hero_media_id'
      ]

      for (const field of heroFields) {
        const fieldExists = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = '_pages_v' 
            AND column_name = ${field}
          );
        `)

        if (!fieldExists.rows[0].exists) {
          await db.execute(sql`
            ALTER TABLE "_pages_v" 
            ADD COLUMN ${sql.ident(field)} varchar;
          `)
          payload.logger.info(`✅ ${field} column added successfully`)
        }
      }

      // Aktualisiere auch die Haupt-Pages Tabelle falls nötig
      const mainTableExists = await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'pages'
        );
      `)

      if (mainTableExists.rows[0].exists) {
        const heroSubheadlineInMain = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'pages' 
            AND column_name = 'hero_subheadline'
          );
        `)

        if (!heroSubheadlineInMain.rows[0].exists) {
          await db.execute(sql`
            ALTER TABLE "pages" 
            ADD COLUMN "hero_subheadline" varchar;
          `)
          payload.logger.info('✅ hero_subheadline column added to main pages table')
        }
      }

    } else {
      payload.logger.warn('⚠️ _pages_v table does not exist yet - seeding will create it')
    }

  } catch (error) {
    payload.logger.error('❌ Migration failed:', error)
    throw error
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  try {
    // Entferne die Spalte falls nötig (Rollback)
    await db.execute(sql`
      ALTER TABLE "_pages_v" 
      DROP COLUMN IF EXISTS "version_hero_subheadline";
    `)
    payload.logger.info('✅ version_hero_subheadline column removed successfully')
  } catch (error) {
    payload.logger.error('❌ Rollback failed:', error)
    throw error
  }
}
