import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '../..')
const mediaDir = path.join(projectRoot, 'data', 'export', 'media')
const outputPath = path.join(projectRoot, 'public', 'icons-sprite.svg')

const LOGO_EXCLUDE_PATTERNS = ['philippbacher-logo', 'weblogo-philippbacher', 'favicon']

function createSymbolId(filename: string): string {
  const base = filename.replace(/\.svg$/i, '')
  const withoutPrefix = base.replace(/^\d+-/, '')
  return (
    'hf-' +
    withoutPrefix
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  )
}

async function extractSvgContent(source: string): Promise<string> {
  const match = source.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
  if (match && match[1]) return match[1].trim()
  return source.trim()
}

async function generateSprite() {
  try {
    const entries = await fs.readdir(mediaDir, { withFileTypes: true })
    const svgFiles = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.svg'))
      .filter(
        (entry) =>
          !LOGO_EXCLUDE_PATTERNS.some((pattern) =>
            entry.name.toLowerCase().includes(pattern.toLowerCase()),
          ),
      )

    const symbols: string[] = []

    for (const entry of svgFiles) {
      const filePath = path.join(mediaDir, entry.name)
      const raw = await fs.readFile(filePath, 'utf8')
      const inner = await extractSvgContent(raw)
      const id = createSymbolId(entry.name)
      symbols.push(
        [
          `<symbol id="${id}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`,
          inner,
          '</symbol>',
        ].join('\n'),
      )
    }

    const lucideSymbols = [
      // MapPin
      `<symbol id="hf-map-pin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M12 22s7-5.33 7-11a7 7 0 1 0-14 0c0 5.67 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<circle cx="12" cy="11" r="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // Phone
      `<symbol id="hf-phone" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.88 19.88 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // ArrowRight
      `<symbol id="hf-arrow-right" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M13 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // Search
      `<symbol id="hf-search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="m21 21-4.35-4.35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // LayoutGrid
      `<symbol id="hf-layout-grid" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // PanelRightOpen
      `<symbol id="hf-panel-right-open" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M15 4v16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M10 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      // Social icons (simplified brand marks)
      `<symbol id="hf-facebook" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      `<symbol id="hf-instagram" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<circle cx="17" cy="7" r="1" fill="currentColor" />
</symbol>`,
      `<symbol id="hf-linkedin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M4 4h4v16H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<circle cx="6" cy="7" r="1.5" fill="currentColor" />
<path d="M11 10h3a3 3 0 0 1 3 3v7h-4v-6.5a1.5 1.5 0 0 0-3 0V20h-4v-10Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
      `<symbol id="hf-twitter" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M22 5.92a8.94 8.94 0 0 1-2.6.74A4.13 4.13 0 0 0 21.4 4a8.27 8.27 0 0 1-2.7 1.05A4.14 4.14 0 0 0 12 8.18a4.34 4.34 0 0 0 .11.94A11.73 11.73 0 0 1 3.15 4.6a4.11 4.11 0 0 0-.56 2.08 4.16 4.16 0 0 0 1.84 3.44 4.06 4.06 0 0 1-1.88-.54v.06A4.18 4.18 0 0 0 6.1 13a4.09 4.09 0 0 1-1.87.07A4.16 4.16 0 0 0 8 15.54 8.32 8.32 0 0 1 2 17.46 11.73 11.73 0 0 0 8.29 19.3c7.55 0 11.68-6.46 11.68-12.06 0-.18 0-.36-.01-.54A8.6 8.6 0 0 0 22 5.92Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</symbol>`,
    ]

    const sprite = [
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">',
      '<defs>',
      ...symbols,
      ...lucideSymbols,
      '</defs>',
      '</svg>',
      '',
    ].join('\n')

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, sprite, 'utf8')

    // eslint-disable-next-line no-console
    console.log(
      `Generated icon sprite with ${symbols.length} symbols at ${path.relative(
        projectRoot,
        outputPath,
      )}`,
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to generate icon sprite:', error)
    process.exitCode = 1
  }
}

void generateSprite()

