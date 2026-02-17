import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { MegaMenu } from './collections/MegaMenu'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Design } from './globals/Design/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    suppressHydrationWarning: true,
    components: {
      graphics: {
        Logo: '/components/AdminLogo',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // Ohne DATABASE_URL/POSTGRES_URL: SQLite (./payload.db) für einfaches lokales Setup
  db:
    process.env.DATABASE_URL || process.env.POSTGRES_URL
      ? vercelPostgresAdapter({
          pool: {
            connectionString:
              process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
          },
          push: process.env.NODE_ENV !== 'production',
        })
      : sqliteAdapter({
          client: {
            url: process.env.SQLITE_URL || 'file:./payload.db',
          },
          // push: true + einmal "pnpm run db:push" ausführen, damit Drizzle alle Tabellen/Spalten
          // (header, footer, design, footer_columns, …) anlegt. Danach normal "pnpm dev".
          push: true,
        }),
  collections: [Pages, Posts, Media, Categories, Users, MegaMenu],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  globals: [Header, Footer, Design],
  onInit: async (payload) => {
    const slugs = ['header', 'footer', 'design'] as const
    for (const slug of slugs) {
      try {
        let hasDoc = false
        try {
          const existing = await payload.findGlobal({ slug, depth: 0 })
          hasDoc = Boolean(existing && typeof existing === 'object' && 'id' in existing && (existing as { id: unknown }).id != null)
        } catch {
          hasDoc = false
        }
        if (!hasDoc) {
          await payload.updateGlobal({
            slug,
            data: {},
            overrideAccess: true,
          })
          payload.logger?.info?.(`Global "${slug}" angelegt (Initial-Eintrag).`)
        }
      } catch (e) {
        payload.logger?.warn?.(`onInit: Global "${slug}" – ${e instanceof Error ? e.message : String(e)}. SQLite: push: true in payload.config.ts setzen, Dev-Server starten (Schema wird angelegt), dann /api/init-globals aufrufen.`)
      }
    }
  },
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
