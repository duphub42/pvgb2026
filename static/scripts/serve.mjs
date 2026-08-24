import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

// Most real hosts (incl. Febas/Apache) gzip or brotli text responses by default. This
// preview server didn't, so local Lighthouse runs against it showed transfer sizes far
// worse than production would - compressing here keeps local numbers representative.
const COMPRESSIBLE_TYPES = new Set([
  'text/css; charset=utf-8',
  'text/html; charset=utf-8',
  'text/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml',
])

const dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(dirname, '..', process.env.ROOT_DIR || 'dist')
const port = Number(process.env.PORT || 8088)
const redirects = new Map([
  ['/portfolio', '/portfolio-webdesign/'],
  ['/portfolio/', '/portfolio-webdesign/'],
  ['/en/portfolio', '/en/portfolio-web-design/'],
  ['/en/portfolio/', '/en/portfolio-web-design/'],
])

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function contentType(filePath, body) {
  const knownType = types[path.extname(filePath).toLowerCase()]
  if (knownType) return knownType

  if (body.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return 'image/png'
  if (body.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return 'image/jpeg'
  if (body.subarray(0, 4).toString('ascii') === 'RIFF' && body.subarray(8, 12).toString('ascii') === 'WEBP') {
    return 'image/webp'
  }
  const textStart = body.subarray(0, 160).toString('utf8').trimStart()
  if (textStart.startsWith('<svg') || (textStart.startsWith('<?xml') && textStart.includes('<svg'))) {
    return 'image/svg+xml'
  }

  return 'application/octet-stream'
}

async function resolveFile(urlPath) {
  const requestUrl = new URL(urlPath, `http://localhost:${port}`)

  if (requestUrl.pathname === '/_next/image') {
    const imageUrl = requestUrl.searchParams.get('url')
    if (imageUrl?.startsWith('/')) return resolveFile(imageUrl)
  }

  if (requestUrl.pathname === '/api/frontend/mega-menu') {
    const locale = requestUrl.searchParams.get('locale')
    const menuFile = locale === 'en' ? 'api/frontend/mega-menu.en.json' : 'api/frontend/mega-menu.json'
    const candidate = path.resolve(root, menuFile)
    if (candidate.startsWith(root)) {
      try {
        const stat = await fs.stat(candidate)
        if (stat.isFile()) return candidate
      } catch {}
    }
  }

  if (requestUrl.pathname === '/api/frontend/footer') {
    const locale = requestUrl.searchParams.get('locale')
    const footerFile = locale === 'en' ? 'api/frontend/footer.en.json' : 'api/frontend/footer.json'
    const candidate = path.resolve(root, footerFile)
    if (candidate.startsWith(root)) {
      try {
        const stat = await fs.stat(candidate)
        if (stat.isFile()) return candidate
      } catch {}
    }
  }

  if (requestUrl.pathname === '/api/forms') {
    const candidate = path.resolve(root, 'api/forms/index.json')
    if (candidate.startsWith(root)) {
      try {
        const stat = await fs.stat(candidate)
        if (stat.isFile()) return candidate
      } catch {}
    }
  }

  const formDetailMatch = requestUrl.pathname.match(/^\/api\/forms\/(\d+)$/)
  if (formDetailMatch) {
    const candidate = path.resolve(root, `api/forms/${formDetailMatch[1]}.json`)
    if (candidate.startsWith(root)) {
      try {
        const stat = await fs.stat(candidate)
        if (stat.isFile()) return candidate
      } catch {}
    }
  }

  const cleanPath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '')
  const candidate = path.resolve(root, cleanPath)
  if (!candidate.startsWith(root)) return null

  const attempts = [
    candidate,
    path.join(candidate, 'index.html'),
    `${candidate}.html`,
  ]

  for (const attempt of attempts) {
    try {
      const stat = await fs.stat(attempt)
      if (stat.isFile()) return attempt
    } catch {}
  }

  return null
}

http
  .createServer(async (req, res) => {
    const requestUrl = new URL(req.url || '/', `http://localhost:${port}`)
    const redirectTarget = redirects.get(requestUrl.pathname)
    if (redirectTarget) {
      res.writeHead(301, {
        location: `${redirectTarget}${requestUrl.search}${requestUrl.hash}`,
        'cache-control': 'no-store',
      })
      res.end()
      return
    }

    if (requestUrl.pathname === '/__nextjs_original-stack-frames') {
      res.writeHead(204, { 'cache-control': 'no-store' })
      res.end()
      return
    }

    const filePath = await resolveFile(req.url || '/')
    if (!filePath) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }

    const body = await fs.readFile(filePath)
    const type = contentType(filePath, body)
    const acceptEncoding = req.headers['accept-encoding'] || ''

    if (COMPRESSIBLE_TYPES.has(type) && /\bbr\b/.test(acceptEncoding)) {
      const compressed = zlib.brotliCompressSync(body, {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 6 },
      })
      res.writeHead(200, {
        'content-type': type,
        'content-encoding': 'br',
        vary: 'accept-encoding',
        'cache-control': 'no-store',
      })
      res.end(compressed)
      return
    }
    if (COMPRESSIBLE_TYPES.has(type) && /\bgzip\b/.test(acceptEncoding)) {
      const compressed = zlib.gzipSync(body, { level: 6 })
      res.writeHead(200, {
        'content-type': type,
        'content-encoding': 'gzip',
        vary: 'accept-encoding',
        'cache-control': 'no-store',
      })
      res.end(compressed)
      return
    }

    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' })
    res.end(body)
  })
  .listen(port, () => {
    console.log(`Static preview: http://localhost:${port}`)
  })
