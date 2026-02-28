import { postgresAdapter } from '@payloadcms/db-postgres'
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
import { HeroBackgrounds } from './collections/HeroBackgrounds'
import { Design } from './globals/Design/config'
import { ThemeSettings } from './globals/ThemeSettings/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET?.trim() || process.env.PAYLOAD_SECRET === 'YOUR_SECRET_HERE') {
  if (typeof process !== 'undefined') {
    console.warn(
      '[Payload] PAYLOAD_SECRET fehlt oder ist der Platzhalter. Admin kann nicht laden. In .env oder .env.local setzen: PAYLOAD_SECRET=<mind. 12 Zeichen>',
    )
  }
}

export default buildConfig({
  admin: {
    suppressHydrationWarning: true,
    components: {
      graphics: { Logo: '/components/AdminLogo' },
      // beforeLogin: ['@/components/BeforeLogin'],
      // beforeDashboard: ['@/components/BeforeDashboard'],
      // views: {
      //   themeColors: { Component: '@/components/ThemeGeneratorPage', path: '/theme-colors' },
      // },
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
  // Lokal (pnpm run dev): SQLite (payload.db), damit die lokale Seite unverändert läuft.
  // Production/Vercel oder USE_NEON=true: Postgres/Neon (DATABASE_URL). Vercel-Adapter nötig für Migrationen (db.execute).
  db:
    (process.env.DATABASE_URL || process.env.POSTGRES_URL) &&
    (process.env.NODE_ENV === 'production' || process.env.USE_NEON === 'true')
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
          push: process.env.PAYLOAD_SKIP_PUSH !== 'true',
        }),
  collections: [Pages, Posts, Media, Categories, Users, MegaMenu, HeroBackgrounds],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    // Cloudflare R2 (S3-kompatibel): Kein Vercel Blob-Limit, EWWW zieht über Origin-Proxy.
    // R2_* Env-Variablen in Vercel setzen (siehe .env.example).
    ...(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
              },
              region: 'auto',
              endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
  globals: [Header, Footer, Design, ThemeSettings],
  onInit: async (payload) => {
    const slugs = ['header', 'footer', 'design', 'theme-settings'] as const
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
