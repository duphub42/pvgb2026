'use client'

import { cn } from '@/utilities/ui'

export type TrendPoint = {
  label: string
  value: number
}

export type ChannelSegment = {
  label: string
  value: number
  color: string
}

export type MarketingCaseChartData = {
  angle: string
  traffic: TrendPoint[]
  leads: TrendPoint[]
  channels: ChannelSegment[]
}

const CHART_HEIGHT = 88
const VIEW_WIDTH = 320

function buildLinePath(points: TrendPoint[], height: number, width: number): string {
  if (points.length === 0) return ''
  const values = points.map((point) => point.value)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const padding = 8

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width
      const y =
        height - padding - ((point.value - min) / range) * (height - padding * 2)
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function buildAreaPath(points: TrendPoint[], height: number, width: number): string {
  const line = buildLinePath(points, height, width)
  if (!line) return ''
  return `${line} L ${width} ${height} L 0 ${height} Z`
}

type TrendLineChartProps = {
  title: string
  points: TrendPoint[]
  accent?: string
  compact?: boolean
  className?: string
}

export function TrendLineChart({
  title,
  points,
  accent = 'hsl(var(--primary))',
  compact = false,
  className,
}: TrendLineChartProps) {
  const height = compact ? 72 : CHART_HEIGHT
  const linePath = buildLinePath(points, height, VIEW_WIDTH)
  const areaPath = buildAreaPath(points, height, VIEW_WIDTH)
  const lastPoint = points[points.length - 1]

  return (
    <div className={cn('rounded-xl border border-border/60 bg-background/50 p-3', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </p>
        {lastPoint ? (
          <p className="text-xs font-semibold tabular-nums text-foreground/90">
            {lastPoint.label}: {lastPoint.value.toLocaleString('de-DE')}
          </p>
        ) : null}
      </div>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`${title} Entwicklung`}
      >
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            x2={VIEW_WIDTH}
            y1={height * ratio}
            y2={height * ratio}
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}
        {areaPath ? (
          <path d={areaPath} fill={accent} fillOpacity={0.14} stroke="none" />
        ) : null}
        {linePath ? (
          <path
            d={linePath}
            fill="none"
            stroke={accent}
            strokeWidth={compact ? 2.25 : 2.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {points.map((point, index) => {
          const x =
            points.length === 1 ? VIEW_WIDTH / 2 : (index / (points.length - 1)) * VIEW_WIDTH
          const values = points.map((entry) => entry.value)
          const max = Math.max(...values, 1)
          const min = Math.min(...values, 0)
          const range = max - min || 1
          const padding = 8
          const y = height - padding - ((point.value - min) / range) * (height - padding * 2)

          return (
            <circle
              key={`${point.label}-${index}`}
              cx={x}
              cy={y}
              r={compact ? 2.5 : 3.25}
              fill={accent}
              stroke="hsl(var(--background))"
              strokeWidth={1.5}
            />
          )
        })}
      </svg>
      <div className="mt-1 flex justify-between gap-1 text-[10px] text-muted-foreground">
        {points.map((point) => (
          <span key={point.label} className="truncate">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  )
}

type ChannelMixBarProps = {
  segments: ChannelSegment[]
  compact?: boolean
  className?: string
}

export function ChannelMixBar({ segments, compact = false, className }: ChannelMixBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1

  return (
    <div className={cn('rounded-xl border border-border/60 bg-background/50 p-3', className)}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Kanal-Mix (Peak)
      </p>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted/60">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="h-full transition-all"
            style={{
              width: `${(segment.value / total) * 100}%`,
              backgroundColor: segment.color,
            }}
            title={`${segment.label}: ${Math.round((segment.value / total) * 100)}%`}
          />
        ))}
      </div>
      <div className={cn('mt-2 flex flex-wrap gap-x-3 gap-y-1', compact && 'gap-x-2')}>
        {segments.map((segment) => (
          <span
            key={segment.label}
            className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: segment.color }}
              aria-hidden
            />
            {segment.label}{' '}
            <span className="font-medium text-foreground/80">
              {Math.round((segment.value / total) * 100)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

type PortfolioCaseChartPanelProps = {
  data: MarketingCaseChartData
  compact?: boolean
  className?: string
}

export function PortfolioCaseChartPanel({
  data,
  compact = false,
  className,
}: PortfolioCaseChartPanelProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-background to-amber-500/[0.06]',
        className,
      )}
    >
      <div className="border-b border-border/50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
          Performance-Verlauf
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{data.angle}</p>
      </div>
      <div className={cn('grid gap-3 p-3', compact ? 'grid-cols-1' : 'md:grid-cols-2')}>
        <TrendLineChart
          title="Organischer Traffic / Tag"
          points={data.traffic}
          accent="hsl(160 84% 39%)"
          compact={compact}
        />
        <TrendLineChart
          title="Leads / Buchungen"
          points={data.leads}
          accent="hsl(38 92% 50%)"
          compact={compact}
        />
      </div>
      <div className="px-3 pb-3">
        <ChannelMixBar segments={data.channels} compact={compact} />
      </div>
    </div>
  )
}

type PortfolioMarketingCardVisualProps = {
  data: MarketingCaseChartData
  metrics?: Array<{ value?: string | null; label?: string | null }>
}

export function PortfolioMarketingCardVisual({ data, metrics }: PortfolioMarketingCardVisualProps) {
  const topMetrics = (metrics ?? []).filter((m) => m?.value?.trim() && m?.label?.trim()).slice(0, 2)

  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-500/15 bg-gradient-to-br from-emerald-950/5 via-background to-amber-500/5 px-3 pb-3 pt-3 dark:from-emerald-400/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.35) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
          KPI-Entwicklung
        </p>
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} 96`}
          className="mt-2 h-[96px] w-full"
          role="img"
          aria-label="Traffic- und Lead-Entwicklung"
        >
          {(() => {
            const trafficPath = buildLinePath(data.traffic, 96, VIEW_WIDTH)
            const leadsPath = buildLinePath(data.leads, 96, VIEW_WIDTH)
            const trafficArea = buildAreaPath(data.traffic, 96, VIEW_WIDTH)
            return (
              <>
                {trafficArea ? (
                  <path d={trafficArea} fill="hsl(160 84% 39%)" fillOpacity={0.12} />
                ) : null}
                {trafficPath ? (
                  <path
                    d={trafficPath}
                    fill="none"
                    stroke="hsl(160 84% 39%)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                ) : null}
                {leadsPath ? (
                  <path
                    d={leadsPath}
                    fill="none"
                    stroke="hsl(38 92% 50%)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                  />
                ) : null}
              </>
            )
          })()}
        </svg>
        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted/50">
          {data.channels.map((segment) => {
            const total = data.channels.reduce((sum, entry) => sum + entry.value, 0) || 1
            return (
              <div
                key={segment.label}
                style={{
                  width: `${(segment.value / total) * 100}%`,
                  backgroundColor: segment.color,
                }}
              />
            )
          })}
        </div>
        {topMetrics.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {topMetrics.map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="rounded-lg border border-border/60 bg-background/80 px-2.5 py-2"
              >
                <p className="text-sm font-semibold leading-none">{metric.value}</p>
                <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
