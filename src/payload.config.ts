import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { config as dotenvConfig } from 'dotenv'
import * as fs from 'fs'
import sharp from 'sharp'
import * as path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { MegaMenu } from './collections/MegaMenu'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { HeroBackgrounds } from './collections/HeroBackgrounds'
import { PriceCalculatorCategories } from './collections/PriceCalculatorCategories'
import { PriceCalculatorItems } from './collections/PriceCalculatorItems'
import { Design } from './globals/Design/config'
import { ThemeSettings } from './globals/ThemeSettings/config'
import { PriceCalculatorGlobal } from './globals/PriceCalculator/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { contactForm } from './endpoints/seed/contact-form'
import { callbackForm } from './endpoints/seed/callback-form'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..')
dotenvConfig({ path: path.join(projectRoot, '.env') })
dotenvConfig({ path: path.join(projectRoot, '.env.local'), override: true })
if (fs.existsSync(path.join(projectRoot, 'env.local'))) {
  dotenvConfig({ path: path.join(projectRoot, 'env.local'), override: false })
}

// Production (z. B. Vercel): Fehlende Env-Variablen sofort melden, damit das Admin nicht weiß bleibt
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  if (!process.env.PAYLOAD_SECRET?.trim() || process.env.PAYLOAD_SECRET === 'YOUR_SECRET_HERE') {
    throw new Error(
      '[Payload] In Production muss PAYLOAD_SECRET gesetzt sein (Vercel: Project → Settings → Environment Variables). Mind. 12 Zeichen, z. B. openssl rand -hex 32',
    )
  }
  if (!process.env.DATABASE_URL?.trim() && !process.env.POSTGRES_URL?.trim()) {
    throw new Error(
      '[Payload] In Production müssen DATABASE_URL oder POSTGRES_URL gesetzt sein (Vercel: Settings → Environment Variables). Ohne DB lädt das Admin nicht.',
    )
  }
} else if (
  !process.env.PAYLOAD_SECRET?.trim() ||
  process.env.PAYLOAD_SECRET === 'YOUR_SECRET_HERE'
) {
  console.warn(
    '[Payload] PAYLOAD_SECRET fehlt oder ist der Platzhalter. In .env oder .env.local setzen: PAYLOAD_SECRET=<mind. 12 Zeichen>',
  )
}

const serverURL = getServerSideURL()

// SQLite: kein DATABASE_URL/POSTGRES_URL, oder lokal mit USE_SQLITE=true (offline, payload.db).
// Postgres/Neon: Production immer; lokal sobald DATABASE_URL/POSTGRES_URL gesetzt ist (gleiche DB wie Vercel → gleicher Hero/Inhalt).
// USE_NEON=true bleibt kompatibel (z. B. dev:neon); ohne USE_NEON reicht DATABASE_URL in .env für Parität mit Vercel.
const hasPostgresUrl = Boolean(process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim())
const isProduction = process.env.NODE_ENV === 'production'
const useSqliteAdapter = !hasPostgresUrl || (!isProduction && process.env.USE_SQLITE === 'true')

export default buildConfig({
  serverURL,
  admin: {
    suppressHydrationWarning: true,
    components: {
      graphics: { Logo: '/components/AdminLogo' },
      beforeLogin: ['/components/BeforeLogin'],
      beforeDashboard: ['/components/BeforeDashboard'],
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
  // Vercel-Adapter: Migrationen (db.execute). Push nur mit PAYLOAD_ALLOW_DRIZZLE_PUSH (s. unten).
  db: !useSqliteAdapter
    ? vercelPostgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
        },
        // Kein Drizzle-Push ohne Opt-in: bei Schema-Drift kann Push Tabellen/Spalten droppen oder Daten gefährden.
        // Sicher: `pnpm run migrate:neon` / `pnpm run push:neon` (nur Migrationen).
        // Opt-in Drizzle: PAYLOAD_ALLOW_DRIZZLE_PUSH=true (z. B. mit `pnpm run push:neon:drizzle` + Bestätigung).
        push:
          process.env.NODE_ENV !== 'production' &&
          process.env.PAYLOAD_ALLOW_DRIZZLE_PUSH === 'true',
      })
    : sqliteAdapter({
        client: {
          url: process.env.SQLITE_URL || 'file:./payload.db',
        },
        push: process.env.PAYLOAD_SKIP_PUSH !== 'true',
      }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    MegaMenu,
    HeroBackgrounds,
    PriceCalculatorCategories,
    PriceCalculatorItems,
  ],
  cors: [serverURL].filter(Boolean),
  // CSRF: erlaubte Origins für Admin-Requests (Cookie wird sonst abgelehnt → 401 auf Vercel).
  // Auf Vercel: NEXT_PUBLIC_SERVER_URL = https://pvgb2026.vercel.app setzen, damit serverURL mit dem Request-Origin übereinstimmt.
  csrf: [
    serverURL,
    'http://localhost:3000',
    ...(process.env.PAYLOAD_CSRF_ORIGINS?.split(',')
      .map((o) => o.trim())
      .filter(Boolean) ?? []),
  ].filter(Boolean),
  plugins: [
    ...plugins,
    // Cloudflare R2 (S3-kompatibel): Kein Vercel Blob-Limit, EWWW zieht über Origin-Proxy.
    // R2_* Env-Variablen in Vercel setzen (siehe .env.example).
    ...(process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET,
            // R2 unterstützt keine ACL bei PutObject/Presigned-URL – weglassen, sonst 500.
            acl: undefined,
            // clientUploads: false = Upload über Server (Vercel-Limit 4,5 MB). true = Presigned-URL vom Client (bekanntes Problem: falscher Content-Type).
            clientUploads: false,
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
  globals: [Header, Footer, Design, ThemeSettings, PriceCalculatorGlobal],
  onInit: async (payload) => {
    const slugs = ['header', 'footer', 'design', 'theme-settings', 'price-calculator'] as const
    for (const slug of slugs) {
      try {
        let hasDoc = false
        try {
          const existing = await payload.findGlobal({ slug, depth: 0 })
          hasDoc = Boolean(
            existing &&
            typeof existing === 'object' &&
            'id' in existing &&
            (existing as { id: unknown }).id != null,
          )
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
        payload.logger?.warn?.(
          `onInit: Global "${slug}" – ${e instanceof Error ? e.message : String(e)}. SQLite: push: true in payload.config.ts setzen, Dev-Server starten (Schema wird angelegt), dann /api/init-globals aufrufen.`,
        )
      }
    }

    try {
      const existingForms = await payload.find({
        collection: 'forms',
        limit: 100,
        depth: 0,
        overrideAccess: true,
      })
      const existingTitles = new Set(
        Array.isArray(existingForms.docs)
          ? existingForms.docs.map((form) =>
              String((form as { title?: string }).title ?? '').toLowerCase(),
            )
          : [],
      )

      if (!existingTitles.has('kontaktformular')) {
        await payload.create({
          collection: 'forms',
          data: contactForm,
          overrideAccess: true,
        })
        payload.logger?.info?.('Formular "Kontaktformular" angelegt.')
      }

      if (!existingTitles.has('rückruf-anfrage')) {
        await payload.create({
          collection: 'forms',
          data: callbackForm,
          overrideAccess: true,
        })
        payload.logger?.info?.('Formular "Rückruf-Anfrage" angelegt.')
      }
    } catch (e) {
      payload.logger?.warn?.(
        `onInit: Forms anlegen fehlgeschlagen – ${e instanceof Error ? e.message : String(e)}`,
      )
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
