'use client'

import React from 'react'

/** SVG layout coordinates; `width`/`height` props scale rendering only. */
const VIEWBOX_W = 460
const VIEWBOX_H = 560
const DEFAULT_DISPLAY_SCALE = 1.1

interface PopoutPortraitProps {
  imageSrc?: string
  /** Rendered CSS pixel width (viewBox stays VIEWBOX_W). */
  width?: number
  /** Rendered CSS pixel height (viewBox stays VIEWBOX_H). */
  height?: number
}

export default function PopoutPortrait({
  imageSrc = '/assets/philippbacher.png',
  width = Math.round(VIEWBOX_W * DEFAULT_DISPLAY_SCALE),
  height = Math.round(VIEWBOX_H * DEFAULT_DISPLAY_SCALE),
}: PopoutPortraitProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const uid = React.useId().replace(/:/g, '')
  const clipId = `${uid}-clip`
  const decorMaskId = `${uid}-decor-mask`
  const decorOutsideClipId = `${uid}-decor-outside`
  const cx = 225
  const cy = 340
  /** Base radius 175, +10% */
  const r = 175 * 1.1
  const imgW = 300
  const imgH = 500
  /** Horizontally center the image slot on the popout circle */
  const imgX = cx - imgW / 2
  /** Bottom of image slot = bottom of circle; xMidYMax meet pins the figure to that edge */
  const imgY = cy + r - imgH
  const circleTop = cy - r
  const upperFreeY = 0
  const upperFreeH = cy

  /** Concentric arc outside the portrait circle (same center, r + pad). */
  const arcPad = 26
  const rArc = r + arcPad
  const arcDir1 = { x: 375 - cx, y: 510 - cy }
  const arcDir2 = { x: 440 - cx, y: 360 - cy }
  const arcLen1 = Math.hypot(arcDir1.x, arcDir1.y)
  const arcLen2 = Math.hypot(arcDir2.x, arcDir2.y)
  const arcX1 = cx + (rArc * arcDir1.x) / arcLen1
  const arcY1 = cy + (rArc * arcDir1.y) / arcLen1
  const arcX2 = cx + (rArc * arcDir2.x) / arcLen2
  const arcY2 = cy + (rArc * arcDir2.y) / arcLen2
  const arcPathD = `M ${arcX1} ${arcY1} A ${rArc} ${rArc} 0 0 0 ${arcX2} ${arcY2}`

  /** Push floating stat cards outward from the portrait; left ↔ negative left, right ↔ negative right. */
  const cardSpread = 22

  /** Left dot: inside viewBox (cx − r ≥ margin), outside popout circle */
  const decorDotL = { cx: 44, cy: 88 }
  /** Grid: original dot size & spacing; more cells via denser rows/cols */
  const decorGridStep = 16
  const decorGridR = 3.5
  const decorGridCols = 5
  const decorGridRows = 5
  const decorGridOrigin = { x: 338, y: 52 }
  /** Left decor dot: 3× base radius 7 */
  const decorDotLRadius = 7 * 3
  /** Squiggle path centroid (original coords), for vertical alignment */
  const decorSquigglePathCy = 244
  /** Gap between Web Vitals (top 124) and Automatisierung (bottom 42) → center in viewBox Y. */
  const webCardBottomPx = 124 + 150
  const autoCardApproxHPx = 160
  const autoCardTopPx = height - 42 - autoCardApproxHPx
  const gapMidPx = (webCardBottomPx + autoCardTopPx) / 2
  const decorSquiggleTy = (gapMidPx / height) * VIEWBOX_H - decorSquigglePathCy
  /** Extra shift left in CSS px → viewBox units (scales with `width`) */
  const squiggleShiftLeftPx = 20
  const decorSquiggleTx = -148 - (squiggleShiftLeftPx / width) * VIEWBOX_W
  const decorSquiggleScale = 0.72
  const decorSquigglePivot = { x: 137, y: decorSquigglePathCy }
  /** ViewBox minus circle — clip shows only outside popout (squiggle + dot stay visible) */
  const decorOutsideClipD = `M 0 0 L ${VIEWBOX_W} 0 L ${VIEWBOX_W} ${VIEWBOX_H} L 0 ${VIEWBOX_H} Z M ${cx} ${cy} m ${-r},0 a ${r},${r} 0 1 0 ${2 * r},0 a ${r},${r} 0 1 0 ${-2 * r},0`

  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'initial',hypothesisId:'H2',location:'PopoutPortrait.tsx:31',message:'PopoutPortrait v2 mounted',data:{imageSrc,width,height,imgX,imgY,imgW,imgH,circleTop,upperFreeY,upperFreeH},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [imageSrc, width, height, imgX, imgY, imgW, imgH, circleTop, upperFreeY, upperFreeH])
  React.useEffect(() => {
    const el = rootRef.current
    const rect = el?.getBoundingClientRect()
    // #region agent log
    fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'rerun-2',hypothesisId:'H9',location:'PopoutPortrait.tsx:38',message:'PopoutPortrait rendered box geometry',data:{clientWidth:el?.clientWidth??null,clientHeight:el?.clientHeight??null,boundingWidth:rect?.width??null,boundingHeight:rect?.height??null,parentWidth:el?.parentElement?.clientWidth??null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [])
  React.useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'rerun-7',hypothesisId:'H15',location:'PopoutPortrait.tsx:45',message:'PopoutPortrait clip strategy updated to upper-free-plus-circle',data:{imgX,imgY,imgW,imgH,circleTop,upperFreeY,upperFreeH},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [imgX, imgY, imgW, imgH, circleTop, upperFreeY, upperFreeH])
  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: width,
        aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}`,
        flexShrink: 0,
        overflow: 'visible',
        margin: '0 auto',
      }}
    >
      <style>{`
        @keyframes pb-floatA { 0%,100%{translate:0 0} 50%{translate:0 -7px} }
        @keyframes pb-floatB { 0%,100%{translate:0 0} 50%{translate:0 -6px} }
        @keyframes pb-floatC { 0%,100%{translate:0 0} 50%{translate:0 -8px} }
        @keyframes pb-floatD { 0%,100%{translate:0 0} 50%{translate:0 -5px} }
        .pb-cA { animation: pb-floatA 3.2s ease-in-out infinite; }
        .pb-cB { animation: pb-floatB 3.8s ease-in-out infinite 0.8s; }
        .pb-cC { animation: pb-floatC 3.5s ease-in-out infinite 0.4s; }
        .pb-cD { animation: pb-floatD 4.0s ease-in-out infinite 1.1s; }
        .pb-cards-wrap {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .pb-cards-wrap { z-index: 10; }
        }
        @media (max-width: 599px) {
          .pb-card { scale: 0.64; }
          .pb-card.pb-cA { transform-origin: top right; right: 0px !important; }
          .pb-card.pb-cB { transform-origin: top left; left: 0px !important; }
          .pb-card.pb-cC { transform-origin: bottom left; left: 0px !important; }
          .pb-card.pb-cD { transform-origin: top right; right: 0px !important; }
        }
        .pb-card {
          background: var(--card);
          color: var(--card-foreground);
          border-radius: 14px;
          border: 0.5px solid var(--border);
          padding: 10px 14px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.09);
          position: absolute;
          z-index: 2;
          pointer-events: none;
        }
        [data-theme='dark'] .pb-card {
          box-shadow: 0 4px 28px rgba(0, 0, 0, 0.55);
        }
        .pb-card-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--foreground);
          opacity: 0.88;
        }
        [data-theme='dark'] .pb-card-title {
          opacity: 0.95;
        }
        .pb-card-muted {
          font-size: 10px;
          color: var(--muted-foreground);
        }
        .pb-card-value {
          font-size: 17px;
          font-weight: 700;
          color: var(--foreground);
        }
        .pb-card-track {
          height: 4px;
          background: var(--muted);
          border-radius: 2px;
        }
        .pb-pill-danger {
          background: color-mix(in srgb, var(--destructive) 16%, transparent);
          color: var(--destructive);
        }
        .pb-pill-success {
          background: color-mix(in srgb, var(--success) 18%, transparent);
          color: var(--success);
        }
        .pb-sparkline {
          fill: none;
          stroke: hsl(var(--primary));
          stroke-width: 1.5;
        }
        .pb-flow-rect {
          fill: color-mix(in srgb, hsl(var(--primary)) 22%, var(--muted));
        }
        .pb-flow-rect-done {
          fill: color-mix(in srgb, var(--success) 22%, var(--muted));
        }
        .pb-flow-line {
          stroke: var(--border);
        }
        .pb-flow-arrow {
          fill: var(--border);
        }
        .pb-flow-text {
          fill: hsl(var(--primary));
        }
        .pb-flow-text-done {
          fill: var(--success);
        }
        .pb-decor-squiggle {
          fill: none;
          stroke: #1f2b3d;
          stroke-width: 3.25;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        [data-theme='dark'] .pb-decor-squiggle {
          stroke: color-mix(in srgb, var(--foreground) 92%, hsl(var(--primary)) 8%);
        }
      `}</style>

      {/* z-0: decor behind everything; masked to exclude interior of popout circle */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'visible', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask
            id={decorMaskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={VIEWBOX_W} height={VIEWBOX_H} fill="white" />
            <circle cx={cx} cy={cy} r={r} fill="black" />
          </mask>
          <clipPath id={decorOutsideClipId} clipPathUnits="userSpaceOnUse">
            <path fillRule="evenodd" d={decorOutsideClipD} />
          </clipPath>
        </defs>
        <g mask={`url(#${decorMaskId})`}>
          {Array.from({ length: decorGridRows }, (_, row) =>
            Array.from({ length: decorGridCols }, (_, col) => (
              <circle
                key={`d-${row}-${col}`}
                cx={decorGridOrigin.x + col * decorGridStep}
                cy={decorGridOrigin.y + row * decorGridStep}
                r={decorGridR}
                fill="#1f2b3d"
                opacity={Math.max(0.35, 1 - row * 0.14)}
              />
            )),
          ).flat()}

          <path d={arcPathD} stroke="#6a8299" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>

        <g clipPath={`url(#${decorOutsideClipId})`}>
          <circle cx={decorDotL.cx} cy={decorDotL.cy} r={decorDotLRadius} fill="#1f2b3d" />
        </g>
      </svg>

      {/* z-1: purple disk */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'visible', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx={cx} cy={cy} r={r} fill="#34435a" />
      </svg>

      {/* z-2: floating cards (over circle, under portrait); Automatisierung: own layer z-5 after portrait */}
      <div className="pb-cards-wrap">
        <div className="pb-card pb-cA" style={{ top: 104, right: -cardSpread, width: 182 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span className="pb-card-title">Ads Performance</span>
            <Pill variant="danger">↓ CPC</Pill>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <Stat label="ROAS" value="4.8×" />
            <Stat label="Conv." value="6.2%" valueColor="#27ae60" />
            <Stat label="CTR" value="3.9%" />
          </div>
          <svg width="100%" height="18" viewBox="0 0 150 18">
            <polyline className="pb-sparkline" points="0,15 24,11 48,13 72,7 96,9 120,4 150,5" />
          </svg>
        </div>

        <div className="pb-card pb-cB" style={{ top: 124, left: -(cardSpread + 27), width: 170 }}>
          <p className="pb-card-title" style={{ margin: '0 0 7px' }}>
            Web Vitals
          </p>
          <ScoreBar label="Performance" value={92} color="#27ae60" />
          <ScoreBar label="SEO" value={97} color="#5a7088" />
          <ScoreBar label="Accessibility" value={88} color="#f39c12" />
        </div>

        <div className="pb-card pb-cD" style={{ top: 252, right: 7 - cardSpread - 10, width: 130 }}>
          <p className="pb-card-title" style={{ margin: '0 0 6px' }}>
            Funnel
          </p>
          <FunnelRow label="Besucher" value="12.4k" pct={100} color="#34435a" />
          <FunnelRow label="Leads" value="3.1k" pct={62} color="#5a7088" />
          <FunnelRow label="Kunden" value="486" pct={25} color="#27ae60" valueColor="#27ae60" />
        </div>
      </div>

      {/* Squiggle: no outside-circle clip so stroke isn’t cut; z above cards; overflow visible for negative x */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 6, overflow: 'visible', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g
          transform={`translate(${decorSquiggleTx} ${decorSquiggleTy}) translate(${decorSquigglePivot.x} ${decorSquigglePivot.y}) scale(${decorSquiggleScale}) translate(${-decorSquigglePivot.x} ${-decorSquigglePivot.y})`}
        >
          <path
            className="pb-decor-squiggle"
            vectorEffect="nonScalingStroke"
            d="M 92 258 C 102 238, 116 232, 124 248
               C 132 264, 146 256, 154 240
               C 162 224, 176 228, 182 244"
          />
        </g>
      </svg>

      {/* z-3: clipped portrait (over cards) */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'visible', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={imgX} y={upperFreeY} width={imgW} height={upperFreeH} />
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <image
          href={imageSrc}
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMax meet"
          onError={() => {
            // #region agent log
            fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'rerun-1',hypothesisId:'H7',location:'PopoutPortrait.tsx:86',message:'PopoutPortrait body image load failed',data:{imageSrc},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
          }}
        />
      </svg>

      {/* z-5: Automatisierung über dem Portrait (z-3); unter Squiggle (z-6) */}
      <div className="pb-cards-wrap" style={{ zIndex: 5 }}>
        <div className="pb-card pb-cC" style={{ bottom: 42, left: 8 - cardSpread, width: 170 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span className="pb-card-title">Automatisierung</span>
            <Pill variant="success">● Live</Pill>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 7 }}>
            <Stat label="Workflows" value="24" />
            <Stat label="Zeitersparnis" value="38h" valueColor="#5a7088" />
          </div>
          <svg width="100%" height="20" viewBox="0 0 140 20">
            <rect className="pb-flow-rect" x="0" y="5" width="30" height="11" rx="5.5" />
            <text
              className="pb-flow-text"
              x="15"
              y="14"
              textAnchor="middle"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Trigger
            </text>
            <line className="pb-flow-line" x1="30" y1="10.5" x2="44" y2="10.5" strokeWidth="1" />
            <polygon className="pb-flow-arrow" points="44,7.5 48,10.5 44,13.5" />
            <rect className="pb-flow-rect" x="48" y="5" width="30" height="11" rx="5.5" />
            <text
              className="pb-flow-text"
              x="63"
              y="14"
              textAnchor="middle"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Action
            </text>
            <line className="pb-flow-line" x1="78" y1="10.5" x2="92" y2="10.5" strokeWidth="1" />
            <polygon className="pb-flow-arrow" points="92,7.5 96,10.5 92,13.5" />
            <rect className="pb-flow-rect-done" x="96" y="5" width="30" height="11" rx="5.5" />
            <text
              className="pb-flow-text-done"
              x="111"
              y="14"
              textAnchor="middle"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Done
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export { PopoutPortrait }

function Pill({ children, variant }: { children: React.ReactNode; variant: 'danger' | 'success' }) {
  return (
    <span
      className={variant === 'danger' ? 'pb-pill-danger' : 'pb-pill-success'}
      style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20 }}
    >
      {children}
    </span>
  )
}

function Stat({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="pb-card-muted">{label}</div>
      <div className={valueColor ? undefined : 'pb-card-value'} style={valueColor ? { fontSize: 17, fontWeight: 700, color: valueColor } : { fontSize: 17, fontWeight: 700 }}>
        {value}
      </div>
    </div>
  )
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span className="pb-card-muted">{label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color }}>{value}</span>
      </div>
      <div className="pb-card-track">
        <div style={{ width: `${value}%`, height: 4, background: color, borderRadius: 2 }} />
      </div>
    </div>
  )
}

function FunnelRow({
  label,
  value,
  pct,
  color,
  valueColor,
}: {
  label: string
  value: string
  pct: number
  color: string
  valueColor?: string
}) {
  const fg = valueColor ?? 'var(--foreground)'
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span className="pb-card-muted">{label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: fg }}>{value}</span>
      </div>
      <div className="pb-card-track">
        <div style={{ width: `${pct}%`, height: 4, background: color, borderRadius: 2 }} />
      </div>
    </div>
  )
}

