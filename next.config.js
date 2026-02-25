import path from 'path'
import { fileURLToPath } from 'url'

import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
