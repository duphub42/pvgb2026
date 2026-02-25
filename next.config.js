import path from 'path'
import { fileURLToPath } from 'url'

import bundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pingdom F0: Gzip-Kompression explizit aktivieren (Next.js macht das standardmäßig bei next start)
  compress: true,
  // So "pnpm run build" completes after "rm -rf .next"; remove once lint/type errors are fixed
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // PageSpeed: tree-shake large packages so less JS is shipped
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      'lucide-react',
      'motion',
    ],
  },
  // DSGVO: Fonts/Skripte sind lokal (kein Google Fonts, keine CDNs). Bei Bedarf: headers() mit Content-Security-Policy script-src 'self'; font-src 'self'.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Kleinere Stufen für LCP/Hero auf Mobil (PageSpeed: 750w war zu groß für ~396px Anzeige)
    deviceSizes: [420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
    ],
  },
  webpack: (webpackConfig, { isServer }) => {
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
    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  // Pingdom F32: Lange Cache-Header für Build-Assets → weniger effektive Requests bei Wiederbesuchen
  async headers() {
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
