type AnyRecord = Record<string, unknown>

function asRecord(value: unknown): AnyRecord | null {
  return typeof value === 'object' && value != null ? (value as AnyRecord) : null
}

function px(n: unknown, fallback: number): number {
  return typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback
}

function colorToHex(color: AnyRecord | null): string | null {
  if (!color) return null
  const r = color.r
  const g = color.g
  const b = color.b
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') return null
  const to255 = (v: number) => Math.min(255, Math.max(0, Math.round(v * 255)))
  return `#${to255(r).toString(16).padStart(2, '0')}${to255(g)
    .toString(16)
    .padStart(2, '0')}${to255(b).toString(16).padStart(2, '0')}`
}

function inferTextClass(style: AnyRecord | null): string {
  if (!style) return 'text-base'
  const size = typeof style.fontSize === 'number' ? style.fontSize : 16
  if (size >= 40) return 'text-5xl font-semibold'
  if (size >= 32) return 'text-4xl font-semibold'
  if (size >= 24) return 'text-2xl font-semibold'
  if (size >= 20) return 'text-xl font-medium'
  if (size <= 13) return 'text-sm'
  return 'text-base'
}

function nodeName(node: AnyRecord, fallback: string): string {
  return typeof node.name === 'string' && node.name.trim() !== '' ? node.name : fallback
}

type ConversionResult = {
  componentCode: string
  extractedStyles: {
    colors: string[]
    spacing: number[]
    textSizes: number[]
  }
}

export function convertFigmaJsonToReact(figmaJson: unknown): ConversionResult {
  const root = asRecord(figmaJson)
  const nodes = asRecord(root?.nodes)
  const firstKey = nodes ? Object.keys(nodes)[0] : null
  const frameWrapper = firstKey ? asRecord(nodes?.[firstKey]) : null
  const frameDoc = asRecord(frameWrapper?.document)
  const frameChildren = Array.isArray(frameDoc?.children) ? (frameDoc?.children as unknown[]) : []

  const colors = new Set<string>()
  const spacing = new Set<number>()
  const textSizes = new Set<number>()

  const body: string[] = []
  body.push('<section className="w-full py-12">')
  body.push('  <div className="mx-auto max-w-6xl px-4">')

  for (const child of frameChildren) {
    const node = asRecord(child)
    if (!node) continue
    const type = typeof node.type === 'string' ? node.type : 'FRAME'

    if (type === 'TEXT') {
      const text = typeof node.characters === 'string' ? node.characters : nodeName(node, 'Text')
      const style = asRecord(node.style)
      const textClass = inferTextClass(style)
      const textSize = typeof style?.fontSize === 'number' ? style.fontSize : null
      if (textSize) textSizes.add(Math.round(textSize))
      body.push(`    <p className="${textClass}">${escapeJsx(text)}</p>`)
      continue
    }

    const childName = nodeName(node, 'Block')
    const absolute = asRecord(node.absoluteBoundingBox)
    const width = px(absolute?.width, 320)
    const height = px(absolute?.height, 120)
    spacing.add(width)
    spacing.add(height)

    const fills = Array.isArray(node.fills) ? (node.fills as unknown[]) : []
    const solid = fills
      .map(asRecord)
      .find((fill) => fill?.type === 'SOLID' && asRecord(fill.color))
    const solidColor = solid ? colorToHex(asRecord(solid.color)) : null
    if (solidColor) colors.add(solidColor)

    const rounded = typeof node.cornerRadius === 'number' && node.cornerRadius >= 999
    const maybeButton =
      /button|cta|primary/i.test(childName) || rounded || (height <= 56 && width <= 320)

    if (maybeButton) {
      body.push(`    <Button className="h-11 px-6">${escapeJsx(childName)}</Button>`)
    } else {
      const bg = solidColor ? ` style={{ backgroundColor: "${solidColor}" }}` : ''
      body.push(
        `    <Card className="mb-4"><CardContent className="p-6"${bg}>${escapeJsx(childName)}</CardContent></Card>`,
      )
    }
  }

  body.push('  </div>')
  body.push('</section>')

  const componentCode = [
    "import React from 'react'",
    "import { Button } from '@/components/ui/button'",
    "import { Card, CardContent } from '@/components/ui/card'",
    '',
    'export function FigmaGeneratedSection() {',
    '  return (',
    ...body.map((line) => `    ${line}`),
    '  )',
    '}',
    '',
    'export default FigmaGeneratedSection',
  ].join('\n')

  return {
    componentCode,
    extractedStyles: {
      colors: [...colors],
      spacing: [...spacing].sort((a, b) => a - b),
      textSizes: [...textSizes].sort((a, b) => a - b),
    },
  }
}

function escapeJsx(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
