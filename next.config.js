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
  // DSGVO: Fonts/Skripte sind lokal (kein Google Fonts, keine CDNs). Bei Bedarf: headers() mit Content-Security-Policy script-src 'self'; font-src 'self'.
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    // Force "buffer" to resolve to this project's node_modules (avoids ENOENT in /Users/horus/node_modules)
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      buffer: path.resolve(__dirname, 'node_modules/buffer'),
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
