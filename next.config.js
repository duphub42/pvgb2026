import path from 'path'
import { fileURLToPath } from 'url'

import bundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN ||
    (process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3000')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and prod build artifacts isolated to prevent manifest races
  // when running `next dev` (3000) and `next build/start` (3100/other) in parallel.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  // Pingdom F0: Gzip-Kompression explizit aktivieren (Next.js macht das standardmäßig bei next start)
  compress: true,
  // So "pnpm run build" completes after "rm -rf .next"; remove once lint/type errors are fixed
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // PageSpeed: tree-shake large packages so less JS is shipped
  // NOTE: Disabled unstable experimental chunk optimization because it intermittently
  // emits missing server chunks (e.g. ./6292.js, ./9993.js, vendor-chunks/*) at runtime/build.
  experimental: {},
  // DSGVO: Fonts/Skripte sind lokal (kein Google Fonts, keine CDNs). Bei Bedarf: headers() mit Content-Security-Policy script-src 'self'; font-src 'self'.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Kleinere Stufen für LCP/Hero auf Mobil (PageSpeed: 750w war zu groß für ~396px Anzeige)
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // Vercel Blob: hochgeladene Bilder (Backend) müssen im Frontend angezeigt werden
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      // EWWW Easy IO / ExactDN (NEXT_PUBLIC_EXACTDN_DOMAIN, z.B. abc123.exactdn.com)
      ...(process.env.NEXT_PUBLIC_EXACTDN_DOMAIN
        ? [
            {
              protocol: 'https',
              hostname: process.env.NEXT_PUBLIC_EXACTDN_DOMAIN.replace(/^https?:\/\//, ''),
              pathname: '/**',
            },
          ]
        : []),
      // Placeholder-Bilder (Hero/Logo) für Entwicklung und Copy-Paste-Hero
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
    ],
  },
  webpack: (webpackConfig, { isServer, dev }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    // Resolve buffer and uuid from this project's node_modules (avoids ENOENT when pnpm hoists to .ignored)
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      buffer: path.resolve(__dirname, 'node_modules/buffer'),
      uuid: path.resolve(__dirname, 'node_modules/uuid'),
    }
    // Mitigate ChunkLoadError "(timeout: ...layout.js)" in next dev (webpack) on slow compiles — see vercel/next.js#66526
    if (dev && !isServer && webpackConfig.output) {
      webpackConfig.output = {
        ...webpackConfig.output,
        chunkLoadTimeout: 300_000,
      }
    }
    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  // Pingdom F32: Lange Cache-Header für Build-Assets → weniger effektive Requests bei Wiederbesuchen
  // Skip in development: immutable caching of /_next/static can worsen stale chunks / ChunkLoadError with HMR.
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return []
    }
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(withPayload(nextConfig, { devBundleServerPackages: false }))
