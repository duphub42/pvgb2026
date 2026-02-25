declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      /** Neon / Postgres connection string (preferred for Neon). */
      DATABASE_URL?: string
      /** Vercel Postgres connection string (or fallback). */
      POSTGRES_URL?: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
      CRON_SECRET?: string
      BLOB_READ_WRITE_TOKEN?: string
      /** EWWW Easy IO / ExactDN zone (e.g. abc123.exactdn.com). When set, image URLs are rewritten to the CDN. */
      NEXT_PUBLIC_EXACTDN_DOMAIN?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
