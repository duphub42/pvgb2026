import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(dirname, '..')
const distDir = path.resolve(projectRoot, process.env.OUTPUT_DIR || 'dist')
const routesPath = path.resolve(projectRoot, 'routes.json')
const staticAssetsDir = path.resolve(projectRoot, 'static-assets')
const hydratedAssetsDir = path.resolve(projectRoot, 'hydrated-assets')
const sourceUrl = (process.env.SOURCE_URL || 'http://localhost:3000').replace(/\/+$/, '')
const renderMode = process.env.RENDER_MODE || 'browser'
const stripNextRuntime = process.env.STRIP_NEXT_RUNTIME !== 'false'
const includeStaticRuntime = process.env.INCLUDE_STATIC_RUNTIME !== 'false' && stripNextRuntime
const browserRenderRoutes = new Set(
  (process.env.BROWSER_RENDER_ROUTES ?? '')
    .split(',')
    .map((route) => route.trim())
    .filter(Boolean),
)

const routes = JSON.parse(await fs.readFile(routesPath, 'utf8'))
const queuedAssets = new Set()
const downloadedAssets = new Set()

const ROUTE_ALIASES = [
  { from: '/portfolio', to: '/portfolio-webdesign/', lang: 'de' },
  { from: '/en/portfolio', to: '/en/portfolio-web-design/', lang: 'en' },
]

const LANGUAGE_LINK_REWRITES = {
  en: new Map([
    ['/portfolio', '/en/portfolio/'],
    ['/portfolio/', '/en/portfolio/'],
    ['/portfolio-webdesign', '/en/portfolio-web-design/'],
    ['/portfolio-webdesign/', '/en/portfolio-web-design/'],
    ['/portfolio-marketing', '/en/portfolio-marketing/'],
    ['/portfolio-marketing/', '/en/portfolio-marketing/'],
    ['/portfolio-marken', '/en/portfolio-branding/'],
    ['/portfolio-marken/', '/en/portfolio-branding/'],
    ['portfolio-marken', '/en/portfolio-branding/'],
  ]),
  de: new Map([
    ['/portfolio', '/portfolio/'],
    ['/portfolio/', '/portfolio/'],
    ['portfolio-marken', '/portfolio-marken/'],
  ]),
}

const ASSET_PREFIXES = [
  '/_next/',
  '/api/frontend/mega-menu',
  '/api/frontend/footer',
  '/api/forms',
  '/api/media/file/',
  '/api/media/stream/',
  '/branding/',
  '/media/',
  '/favicon',
  '/icons-sprite.svg',
  '/manifest.json',
  '/website-template-OG.webp',
]

// Maps a synthetic per-width cache path (written into the exported HTML and to disk)
// back to the original `/_next/image?url=...&w=...&q=...` request needed to fetch that
// exact resized/re-encoded variant from the live SOURCE_URL during export.
const nextImageRequestByCachePath = new Map()

function isInternalAsset(url) {
  return ASSET_PREFIXES.some((prefix) => url.startsWith(prefix))
}

function isSkippable(url) {
  return (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#')
  )
}

function normalizeAssetUrl(rawUrl) {
  if (!rawUrl || isSkippable(rawUrl)) return null
  const cleanedRawUrl = decodeHtmlEntities(rawUrl).replace(/["'<>\\]+$/g, '')

  try {
    const url = new URL(cleanedRawUrl, sourceUrl)
    if (url.origin !== sourceUrl) return null
    if (!isInternalAsset(url.pathname)) return null
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '')
    return `${url.pathname}${url.search}`
  } catch {
    return null
  }
}

function routeToFile(route) {
  const cleanRoute = route === '/' ? '' : route.replace(/^\/+|\/+$/g, '')
  return path.join(distDir, cleanRoute, 'index.html')
}

function assetToFile(assetUrl) {
  const url = new URL(assetUrl, sourceUrl)
  let pathname = decodeURIComponent(url.pathname)

  if (pathname === '/api/frontend/mega-menu') {
    const locale = url.searchParams.get('locale')
    pathname = locale ? `/api/frontend/mega-menu.${locale}.json` : '/api/frontend/mega-menu.json'
  }

  if (pathname === '/api/frontend/footer') {
    const locale = url.searchParams.get('locale')
    pathname = locale ? `/api/frontend/footer.${locale}.json` : '/api/frontend/footer.json'
  }

  // HeaderActions' callback-form modal reads these two live at runtime (list + one
  // form's field definitions) to resolve/render the "Rückruf" form without a CMS-side
  // link. There's no Payload backend on static hosting, so both need pre-baked JSON.
  if (pathname === '/api/forms') {
    pathname = '/api/forms/index.json'
  } else if (/^\/api\/forms\/\d+$/.test(pathname)) {
    pathname = `${pathname}.json`
  }

  return path.join(distDir, pathname.replace(/^\/+/, ''))
}

function queueAsset(rawUrl) {
  const normalized = normalizeAssetUrl(rawUrl)
  if (normalized) queuedAssets.add(normalized)
}

function cleanMegaMenuText(value) {
  return value
    .replace(
      /Echtzeit-Daten,\s*nahtlose Verbindungen:\s*Ich verbinde Ihre Tools und automatisier(?:e|en) Prozesse direkt über Webhooks\.?/gi,
      '',
    )
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function cleanMegaMenuPayload(value) {
  if (typeof value === 'string') return cleanMegaMenuText(value)
  if (Array.isArray(value)) return value.map(cleanMegaMenuPayload)
  if (value != null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cleanMegaMenuPayload(child)]),
    )
  }
  return value
}

function collectFromSrcset(srcset) {
  for (const part of srcset.split(',')) {
    const candidate = part.trim().split(/\s+/)[0]
    queueAsset(candidate)
  }
}

function collectAssetUrls(content, options = {}) {
  const includeLoose = options.includeLoose !== false
  const attrPattern = /\b(?:src|href|poster)=["']([^"']+)["']/gi
  for (const match of content.matchAll(attrPattern)) queueAsset(match[1])

  const srcsetPattern = /\b(?:srcset|imagesrcset)=["']([^"']+)["']/gi
  for (const match of content.matchAll(srcsetPattern)) collectFromSrcset(match[1])

  const cssUrlPattern = /url\((?!['"]?data:)(['"]?)([^'")]+)\1\)/gi
  for (const match of content.matchAll(cssUrlPattern)) queueAsset(match[2])

  if (includeLoose) {
    const looseInternalAssetPattern =
      /\/(?:api\/frontend\/mega-menu|api\/media\/file|api\/media\/stream|branding|media)\/[^"'\s<>)]+/gi
    for (const match of content.matchAll(looseInternalAssetPattern)) queueAsset(match[0])
  }
}

function stripSourceOrigin(content) {
  return content.split(sourceUrl).join('')
}

function decodeHtmlEntities(value) {
  return value.split('&amp;').join('&').split('&quot;').join('"')
}

// Turns a resized-image request into a stable, flat cache path, e.g.
// source "/api/media/stream/1212", width 640, quality 62 ->
// "/_next/image-cache/api-media-stream-1212-w640-q62.webp"
function nextImageCachePath(source, width, quality) {
  const sourcePathname = decodeURIComponent(new URL(source, sourceUrl).pathname)
  const ext = path.extname(sourcePathname) || '.webp'
  const base = sourcePathname
    .replace(/^\/+/, '')
    .replace(/\.[^./]+$/, '')
    .replace(/\//g, '-')
  const qualityPart = quality ? `-q${quality}` : ''
  return `/_next/image-cache/${base}-w${width}${qualityPart}${ext}`
}

// The exported HTML normally carries one `/_next/image?url=...&w=W&q=Q` request per
// srcset breakpoint - each already asking the live Next server (available only at
// export time, via SOURCE_URL) to resize to a distinct width W. Collapsing all of them
// down to the raw source (the old behavior) meant every breakpoint shipped the same
// full-resolution file, so mobile downloaded the same bytes as a 1920w desktop image.
// This keeps the per-width fan-out: each request becomes its own cached static file,
// downloaded once via downloadAsset()/nextImageRequestByCachePath.
function rewriteNextImageUrls(content) {
  return content.replace(/\/_next\/image\?([^"'\s,)<>]+)/g, (match, queryString) => {
    try {
      const decodedQuery = decodeHtmlEntities(queryString)
      const params = new URLSearchParams(decodedQuery)
      const source = params.get('url')
      const width = params.get('w')
      if (!source) return match
      if (!width) return source

      const quality = params.get('q')
      const cachePath = nextImageCachePath(source, width, quality)
      nextImageRequestByCachePath.set(cachePath, `/_next/image?${decodedQuery}`)
      return cachePath
    } catch {
      return match
    }
  })
}

function stripNextRuntimeScripts(content) {
  return content
    .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel=["'](?:preload|modulepreload)["'][^>]*as=["']script["'][^>]*>/gi, '')
    .replace(/<link\b[^>]*as=["']script["'][^>]*rel=["'](?:preload|modulepreload)["'][^>]*>/gi, '')
}

function removeDevOnlyRequests(content) {
  return content
    .replace(/<link\b[^>]*href=["']\/_piny\/[^"']+["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*src=["']\/_piny\/[^"']+["'][^>]*>\s*<\/script>/gi, '')
    .replace(/<script\b[^>]*data-nextjs-dev-overlay[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<nextjs-portal\b[^>]*>\s*<\/nextjs-portal>/gi, '')
    .replace(/\/_piny\/piny\.phone\.js/g, '/hydrated-assets/noop.js')
}

function addStaticRuntime(html) {
  const withStyles = html.replace(
    /<\/head>/i,
    '<link rel="stylesheet" href="/static-assets/static-runtime.css"></head>',
  )
  return withStyles.replace(
    /<\/body>/i,
    '<script src="/static-assets/static-runtime.js" defer></script></body>',
  )
}

function addHydratedFixes(html) {
  return html.replace(
    /<\/body>/i,
    '<script src="/hydrated-assets/hydrated-fixes.js" defer></script></body>',
  )
}

function rewriteLocalizedLinks(html, route) {
  const language = route.startsWith('/en') ? 'en' : 'de'
  const rewrites = LANGUAGE_LINK_REWRITES[language]

  return html.replace(/\bhref=(["'])([^"']+)\1/gi, (match, quote, href) => {
    const target = rewrites.get(decodeHtmlEntities(href))
    return target ? `href=${quote}${target}${quote}` : match
  })
}

function transformHtml(html, route) {
  const withoutNextImageProxy = stripNextRuntime ? rewriteNextImageUrls(html) : html
  const withLocalizedLinks = rewriteLocalizedLinks(withoutNextImageProxy, route)
  const withoutDevOnlyRequests = removeDevOnlyRequests(withLocalizedLinks)
  const withoutRuntime = stripNextRuntime
    ? stripNextRuntimeScripts(withoutDevOnlyRequests)
    : withoutDevOnlyRequests
  const withoutOrigin = stripSourceOrigin(withoutRuntime)
  if (includeStaticRuntime) return addStaticRuntime(withoutOrigin)
  if (!stripNextRuntime) return addHydratedFixes(withoutOrigin)
  return withoutOrigin
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, options)
    } catch (error) {
      lastError = error
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 750 * attempt))
      }
    }
  }
  throw lastError
}

async function fetchText(url) {
  const response = await fetchWithRetry(url, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'user-agent': 'pvgb-static-export/1.0',
    },
  })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
  return response.text()
}

function hasLoadingFallback(html) {
  const mentionsFallback =
    html.includes('Seite wird geladen') ||
    html.includes('Loading page') ||
    html.includes('Etwas ist schiefgelaufen') ||
    html.includes('Something went wrong')
  if (!mentionsFallback) return false

  // React's streaming SSR always emits the Suspense fallback text into the initial
  // HTML chunk, even for boundaries that resolve within the very same response - the
  // resolved content streams in later in that same response, together with an inline
  // `$RC(...)` call that swaps the fallback out for it during HTML parsing itself
  // (before hydration, no client JS/data fetch required). Treating every occurrence
  // of the fallback text as "still loading" was a false positive for every one of
  // those already-resolved routes, sending them through the browser-render path
  // below - which captures the DOM *after* hydration and animations have mutated it,
  // and serving that back out re-hydrates incorrectly for real visitors. `$RC(`
  // present means the stream resolved itself; only its absence means genuinely stuck.
  return !html.includes('$RC(')
}

async function renderText(route, page) {
  await page.addInitScript(() => {
    window.__PVGB_STATIC_EXPORT__ = true
  })

  const response = await page.goto(`${sourceUrl}${route}`, {
    waitUntil: 'domcontentloaded',
    timeout: 180000,
  })

  if (!response || !response.ok()) {
    throw new Error(`${response?.status() || 'No response'} ${response?.statusText() || ''}`.trim())
  }

  await page.waitForLoadState('networkidle', { timeout: 2500 }).catch(() => {})
  await page
    .waitForFunction(
      () => {
        const text = document.body?.innerText || ''
        return (
          !text.includes('Seite wird geladen') &&
          !text.includes('Something went wrong') &&
          !text.includes('Etwas ist schiefgelaufen')
        )
      },
      { timeout: 15000 },
    )
    .catch(() => {})
  await page
    .waitForFunction(
      () => {
        const topItems = Array.from(document.querySelectorAll('header a, header button')).map((el) =>
          el.textContent?.trim(),
        )
        return topItems.includes('Leistungen') && topItems.includes('Portfolio')
      },
      { timeout: 5000 },
    )
    .catch(() => {})
  await page.waitForTimeout(400)

  return page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`)
}

async function writeFile(filePath, body) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, body)
}

async function exportRoute(route, page) {
  let html = await fetchText(`${sourceUrl}${route}`)

  // A loading fallback here is usually a cold-cache Suspense state (first hit to a
  // route that fetches Payload data), not a route that's permanently client-only -
  // a couple of plain retries let the server warm up and return the real SSR HTML.
  // This matters because the browser-render fallback below captures the DOM *after*
  // hydration and client animations have already mutated it (inline styles, data-*
  // state attributes) - serving that back out re-hydrates incorrectly for real
  // visitors (React hydration mismatch, full client re-render). Plain SSR HTML
  // doesn't have that problem, so it's always preferred when available.
  for (let attempt = 0; attempt < 2 && hasLoadingFallback(html); attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    html = await fetchText(`${sourceUrl}${route}`)
  }

  if (page && (browserRenderRoutes.has(route) || hasLoadingFallback(html))) {
    try {
      html = await renderText(route, page)
    } catch (error) {
      console.warn(`warn ${route}: browser render failed, using fetched HTML (${error.message})`)
    }
  }
  const transformedHtml = transformHtml(html, route)
  collectAssetUrls(transformedHtml)
  await writeFile(routeToFile(route), transformedHtml)
  console.log(`page ${route}`)
}

async function downloadAsset(assetUrl) {
  if (downloadedAssets.has(assetUrl)) return
  downloadedAssets.add(assetUrl)
  if (assetUrl.startsWith('/_next/image?')) {
    // Only reachable in the hydrated variant (stripNextRuntime skips
    // rewriteNextImageUrls, so raw `/_next/image?url=...` requests survive in the
    // HTML - the lite variant already rewrote these to cache paths before this
    // point). The runtime PHP shim for these requests just serves the original
    // source file directly, since PHP can't run Next's resizer - so the wrapped
    // request itself needs no saved copy, but the source it points to must exist
    // on disk, or the shim 404s (this broke inline SVG <image href> usage, e.g.
    // the hero portrait, which never appears as a bare src/href elsewhere).
    try {
      const source = new URL(assetUrl, sourceUrl).searchParams.get('url')
      if (source) queueAsset(source)
    } catch {}
    return
  }

  const cachedRequestUrl = nextImageRequestByCachePath.get(assetUrl)
  const fetchUrl = cachedRequestUrl || assetUrl
  const response = await fetchWithRetry(`${sourceUrl}${fetchUrl}`, {
    headers: {
      'user-agent': 'pvgb-static-export/1.0',
      // Without an explicit Accept, Next's image optimizer falls back to the source's
      // original format instead of re-encoding to webp. Deliberately webp-only (not
      // avif): the cache filename below is fixed to .webp at rewrite time, before this
      // fetch runs, so the negotiated format must be predictable - offering avif here
      // got it back instead (Next prefers avif when both are accepted), producing a
      // .webp-named file containing AVIF bytes, a Content-Type mismatch once served.
      ...(cachedRequestUrl ? { accept: 'image/webp' } : {}),
    },
  })
  if (!response.ok) {
    if (assetUrl.startsWith('/_next/static/')) {
      const sourcePath = decodeURIComponent(new URL(assetUrl, sourceUrl).pathname).replace(
        /^\/_next\//,
        '.next/',
      )
      const sourceFile = path.join(path.resolve(projectRoot, '..'), sourcePath)
      try {
        const body = await fs.readFile(sourceFile)
        await writeFile(assetToFile(assetUrl), body)
        console.log(`asset ${assetUrl}`)
        return
      } catch {}
    }

    console.warn(`skip ${assetUrl}: ${response.status}`)
    return
  }

  const contentType = response.headers.get('content-type') || ''
  const arrayBuffer = await response.arrayBuffer()
  const assetPathname = new URL(assetUrl, sourceUrl).pathname
  let body = Buffer.from(arrayBuffer)
  if (assetPathname === '/api/frontend/mega-menu' && contentType.includes('application/json')) {
    try {
      body = Buffer.from(JSON.stringify(cleanMegaMenuPayload(JSON.parse(body.toString('utf8')))))
    } catch {}
  }
  const filePath = assetToFile(assetUrl)
  await writeFile(filePath, body)

  if (
    contentType.includes('text/css') ||
    contentType.includes('application/json') ||
    contentType.includes('text/html')
  ) {
    collectAssetUrls(body.toString('utf8'))
  }

  if (contentType.includes('javascript')) {
    collectAssetUrls(body.toString('utf8'), { includeLoose: false })
  }

  // The forms list has no href/src attributes for collectAssetUrls to pick up each
  // form's own detail endpoint (/api/forms/<id>) - queue them explicitly so
  // HeaderActions' client-side form-field lookup (fetch of /api/forms/<id>?depth=0)
  // has a static file to hit instead of 404ing against the live-only Payload route.
  if (assetPathname === '/api/forms' && contentType.includes('application/json')) {
    try {
      const parsed = JSON.parse(body.toString('utf8'))
      for (const doc of Array.isArray(parsed?.docs) ? parsed.docs : []) {
        if (typeof doc?.id === 'number') queueAsset(`/api/forms/${doc.id}?depth=0`)
      }
    } catch {}
  }

  console.log(`asset ${assetUrl}`)
}

async function writeSupportFiles() {
  if (includeStaticRuntime) {
    await fs.cp(staticAssetsDir, path.join(distDir, 'static-assets'), { recursive: true })
  }

  if (!stripNextRuntime) {
    await fs.cp(hydratedAssetsDir, path.join(distDir, 'hydrated-assets'), { recursive: true })
    const nextRoot = path.resolve(projectRoot, '..')
    const nextStaticDirs = ['.next/static']
    if (process.env.INCLUDE_DEV_STATIC === 'true') nextStaticDirs.push('.next-dev/static')

    for (const nextStaticDir of nextStaticDirs) {
      try {
        await fs.cp(path.join(nextRoot, nextStaticDir), path.join(distDir, '_next', 'static'), {
          recursive: true,
        })
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error
      }
    }
  }

  await writeFile(
    path.join(distDir, '.htaccess'),
    [
      'Options -Indexes',
      'DirectoryIndex index.html index.php',
      '',
      '<IfModule mod_rewrite.c>',
      'RewriteEngine On',
      '',
      '# Static replacement for Next image optimizer requests.',
      'RewriteRule ^_next/image$ /_next/image/index.php [L,QSA]',
      '',
      '# Static no-op for Next dev stackframe requests.',
      'RewriteRule ^__nextjs_original-stack-frames$ /hydrated-assets/noop.json [L]',
      '',
      '# Static replacement for the frontend mega menu API.',
      'RewriteCond %{QUERY_STRING} (^|&)locale=en(&|$)',
      'RewriteRule ^api/frontend/mega-menu$ /api/frontend/mega-menu.en.json [L]',
      'RewriteRule ^api/frontend/mega-menu$ /api/frontend/mega-menu.json [L]',
      '',
      '# Static replacement for the frontend footer API.',
      'RewriteCond %{QUERY_STRING} (^|&)locale=en(&|$)',
      'RewriteRule ^api/frontend/footer$ /api/frontend/footer.en.json [L]',
      'RewriteRule ^api/frontend/footer$ /api/frontend/footer.json [L]',
      '',
      '# Static replacement for the forms API (callback-form modal).',
      'RewriteRule ^api/forms$ /api/forms/index.json [L]',
      'RewriteRule ^api/forms/([0-9]+)$ /api/forms/$1.json [L]',
      '',
      '# Backward-compatible portfolio aliases.',
      'RewriteRule ^portfolio/?$ /portfolio-webdesign/ [R=301,L]',
      'RewriteRule ^en/portfolio/?$ /en/portfolio-web-design/ [R=301,L]',
      '',
      'RewriteCond %{REQUEST_FILENAME} !-f',
      'RewriteCond %{REQUEST_FILENAME} !-d',
      'RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f',
      'RewriteRule ^(.+?)/?$ /$1/index.html [L]',
      '</IfModule>',
      '',
    ].join('\n'),
  )

  await writeFile(
    path.join(distDir, 'api', 'contact.php'),
    `<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// TODO: Replace this placeholder with the final Febas mail handling.
echo json_encode(['ok' => false, 'error' => 'Contact form endpoint is not configured yet']);
`,
  )

  await writeFile(
    path.join(distDir, '_next', 'image', 'index.php'),
    `<?php
$rawUrl = $_GET['url'] ?? '';
if (!is_string($rawUrl) || $rawUrl === '' || $rawUrl[0] !== '/') {
  http_response_code(400);
  echo 'Bad image url';
  exit;
}

$path = parse_url($rawUrl, PHP_URL_PATH);
if (!is_string($path) || $path === '' || strpos($path, '..') !== false) {
  http_response_code(400);
  echo 'Bad image path';
  exit;
}

$file = realpath($_SERVER['DOCUMENT_ROOT'] . $path);
$root = realpath($_SERVER['DOCUMENT_ROOT']);
if ($file === false || $root === false || strpos($file, $root) !== 0 || !is_file($file)) {
  http_response_code(404);
  echo 'Image not found';
  exit;
}

$bytes = file_get_contents($file, false, null, 0, 16);
$type = 'application/octet-stream';
$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
$bytesString = (string) $bytes;
if ($ext === 'svg' || strpos(ltrim($bytesString), '<svg') === 0 || strpos($bytesString, '<svg') !== false) {
  $type = 'image/svg+xml';
} elseif (substr($bytesString, 0, 4) === "\\x89PNG") {
  $type = 'image/png';
} elseif (substr($bytesString, 0, 3) === "\\xFF\\xD8\\xFF") {
  $type = 'image/jpeg';
} elseif (substr($bytesString, 0, 4) === 'RIFF' && substr($bytesString, 8, 4) === 'WEBP') {
  $type = 'image/webp';
} elseif ($ext === 'ico') {
  $type = 'image/x-icon';
}

header('Content-Type: ' . $type);
header('Cache-Control: public, max-age=31536000, immutable');
readfile($file);
`,
  )
}

function redirectHtml({ from, to, lang }) {
  const title = lang === 'en' ? 'Redirecting...' : 'Weiterleitung...'
  const label = lang === 'en' ? 'Continue to portfolio' : 'Weiter zum Portfolio'

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<title>${title}</title>
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head>
<body><a href="${to}">${label}</a></body>
</html>
`
}

async function writeRouteAliases() {
  for (const alias of ROUTE_ALIASES) {
    await writeFile(routeToFile(alias.from), redirectHtml(alias))
  }
}

async function main() {
  let browser
  let page

  await fs.rm(distDir, { recursive: true, force: true })
  await fs.mkdir(distDir, { recursive: true })

  try {
    if (renderMode !== 'fetch') {
      browser = await chromium.launch({ headless: true })
      page = await browser.newPage({
        viewport: { width: 1440, height: 1400 },
      })
    }

    for (const route of routes) await exportRoute(route, page)
  } finally {
    await browser?.close()
  }

  queuedAssets.add('/api/frontend/mega-menu')
  queuedAssets.add('/api/frontend/mega-menu?locale=en')
  queuedAssets.add('/api/frontend/footer')
  queuedAssets.add('/api/frontend/footer?locale=en')
  queuedAssets.add('/api/forms?depth=0&limit=100')
  queuedAssets.add('/branding/philippbacher-logo-b-10.svg')
  queuedAssets.add('/favicon.ico')
  queuedAssets.add('/favicon.svg')
  queuedAssets.add('/manifest.json')
  queuedAssets.add('/icons-sprite.svg')
  queuedAssets.add('/website-template-OG.webp')

  while (queuedAssets.size > downloadedAssets.size) {
    const next = [...queuedAssets].find((asset) => !downloadedAssets.has(asset))
    if (!next) break
    await downloadAsset(next)
  }

  await writeRouteAliases()
  await writeSupportFiles()

  console.log('')
  console.log(`Static export complete: ${path.relative(process.cwd(), distDir)}`)
  console.log(`Pages: ${routes.length}`)
  console.log(`Assets: ${downloadedAssets.size}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
