'use client'

import Link from 'next/link'

import type { HeroFlowchartBlock as HeroFlowchartBlockData } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const CANVAS_WIDTH = 680
const CANVAS_HEIGHT = 460
const CARD_WIDTH = 224
const CARD_HEIGHT = 112

type FlowNodeRow = NonNullable<HeroFlowchartBlockData['flowNodes']>[number]

type FlowNode = {
  id: string
  title: string
  description: string
  x: number
  y: number
}

const DEFAULT_HEADLINE = 'Klar strukturierte Prozesse.'
const DEFAULT_SUBLINE = 'Visuell. Messbar. Wirkungsvoll.'
const DEFAULT_CTA_LABEL = 'Starten'
const DEFAULT_CTA_HREF = '#kontakt'

const DEFAULT_NODES: FlowNode[] = [
  {
    id: 'default-1',
    title: 'Strategie',
    description: 'Struktur schafft Klarheit',
    x: 24,
    y: 56,
  },
  {
    id: 'default-2',
    title: 'Design',
    description: 'Visuell auf den Punkt',
    x: 232,
    y: 214,
  },
  {
    id: 'default-3',
    title: 'Technik',
    description: 'Performance & Skalierung',
    x: 432,
    y: 44,
  },
  {
    id: 'default-4',
    title: 'Conversion',
    description: 'Messbare Ergebnisse',
    x: 448,
    y: 272,
  },
]

const asText = (value?: string | null): string => {
  return typeof value === 'string' ? value.trim() : ''
}

const asNumber = (value?: number | null): number | null => {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const normalizeNodes = (rows: HeroFlowchartBlockData['flowNodes']): FlowNode[] => {
  if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_NODES

  const normalized = rows
    .map((row, index): FlowNode | null => {
      if (!row) return null

      const title = asText((row as FlowNodeRow).title)
      const description = asText((row as FlowNodeRow).description)
      const x = asNumber((row as FlowNodeRow).x)
      const y = asNumber((row as FlowNodeRow).y)

      if (!title || x == null || y == null) return null

      return {
        id: typeof row.id === 'string' ? row.id : `node-${index + 1}`,
        title,
        description,
        x: clamp(x, 0, CANVAS_WIDTH - CARD_WIDTH),
        y: clamp(y, 0, CANVAS_HEIGHT - CARD_HEIGHT),
      }
    })
    .filter((node): node is FlowNode => Boolean(node))

  return normalized.length >= 3 ? normalized : DEFAULT_NODES
}

const getConnectionPath = (from: FlowNode, to: FlowNode): string => {
  const movingRight = to.x >= from.x

  const startX = from.x + (movingRight ? CARD_WIDTH : 0)
  const startY = from.y + CARD_HEIGHT / 2
  const endX = to.x + (movingRight ? 0 : CARD_WIDTH)
  const endY = to.y + CARD_HEIGHT / 2

  const curveOffset = Math.max(Math.abs(endX - startX) * 0.35, 72)
  const c1x = startX + (movingRight ? curveOffset : -curveOffset)
  const c2x = endX - (movingRight ? curveOffset : -curveOffset)

  return `M ${startX} ${startY} C ${c1x} ${startY}, ${c2x} ${endY}, ${endX} ${endY}`
}

type HeroFlowchartProps = HeroFlowchartBlockData & {
  disableInnerContainer?: boolean | null
}

export function HeroFlowchartBlock({
  disableInnerContainer: _disableInnerContainer,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  flowNodes,
}: HeroFlowchartProps) {
  const resolvedHeadline = asText(headline) || DEFAULT_HEADLINE
  const resolvedSubline = asText(subline) || DEFAULT_SUBLINE
  const resolvedCtaLabel = asText(ctaLabel) || DEFAULT_CTA_LABEL
  const resolvedCtaHref = asText(ctaHref) || DEFAULT_CTA_HREF
  const nodes = normalizeNodes(flowNodes)

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-8 top-1/3 h-64 w-64 rounded-full bg-foreground/5 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_680px] lg:gap-20">
        <div className="max-w-xl space-y-6">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {resolvedHeadline}
          </h2>

          {resolvedSubline ? (
            <p className="max-w-lg text-lg leading-8 text-muted-foreground">
              {resolvedSubline}
            </p>
          ) : null}

          <Button asChild size="lg" className="rounded-xl px-6">
            <Link href={resolvedCtaHref}>{resolvedCtaLabel}</Link>
          </Button>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative h-[460px] w-[680px] overflow-visible">
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
              className="absolute inset-0 h-full w-full pointer-events-none overflow-visible"
            >
              {nodes.map((node, index) => {
                const next = nodes[index + 1]
                if (!next) return null

                return (
                  <path
                    key={`${node.id}-to-${next.id}`}
                    d={getConnectionPath(node, next)}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.14"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>

            {nodes.map((node) => (
              <Card
                key={node.id}
                className={cn(
                  'absolute w-56 border-transparent bg-background/55 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.38)] backdrop-blur-2xl ring-white/10 transition-transform duration-300 hover:-translate-y-1',
                  'dark:bg-background/45',
                )}
                style={{ left: node.x, top: node.y }}
              >
                <CardContent className="space-y-2 px-5 py-4">
                  <p className="text-sm font-medium tracking-tight text-foreground">
                    {node.title}
                  </p>
                  {node.description ? (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {node.description}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
