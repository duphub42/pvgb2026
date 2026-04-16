'use client'

import React from 'react'

/** SVG layout coordinates; `width`/`height` props scale rendering only. */
const VIEWBOX_W = 600 // war 460
const VIEWBOX_H = 720 // war 560
const DEFAULT_DISPLAY_SCALE = 3.5

interface PopoutPortraitProps {
  imageSrc?: string
  /** Rendered CSS pixel width (viewBox stays VIEWBOX_W). */
  width?: number
  /** Rendered CSS pixel height (viewBox stays VIEWBOX_H). */
  height?: number
  /**
   * Size from available height (width follows aspect ratio).
   * Parent chain should give a definite height (e.g. grid row + h-full flex).
   */
  fillRowHeight?: boolean
}

export default function PopoutPortrait({
  imageSrc = '/media/philippbacher.png',
  width = Math.round(VIEWBOX_W * DEFAULT_DISPLAY_SCALE * 2.5),
  height = Math.round(VIEWBOX_H * DEFAULT_DISPLAY_SCALE * 2.5),
  fillRowHeight = false,
}: PopoutPortraitProps) {
  const [isSingleCol, setIsSingleCol] = React.useState(false)

  // Suppress hydration warning for dynamic styles
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const update = () => setIsSingleCol(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  const uid = React.useId().replace(/:/g, '')
  const decorMaskId = `${uid}-decor-mask`
  const decorOutsideClipId = `${uid}-decor-outside`
  const diskGradId = `${uid}-disk-grad`
  const diskGroundShadowGradId = `${uid}-disk-ground-shadow-grad`
  const diskGroundShadowGradDarkId = `${uid}-disk-ground-shadow-grad-dark`
  const diskGroundShadowBlurId = `${uid}-disk-ground-shadow-blur`
  const diskRimGradId = `${uid}-disk-rim-grad`
  const cx = 293 // war 225 (225/460*600)
  const cy = 437 // war 340 (340/560*720)
  /** Base radius 228, +10% */
  const r = 228 * 1.1 // war 175 (175/460*600=228)
  /** Bodenschatten: klar unter dem Kreis, nicht am Rand (viewBox-Einheiten). */
  const diskShadowGap = 14.5
  const diskShadowRx = r * 1.52
  const diskShadowRy = r * 0.21
  const diskShadowCy = cy + r + diskShadowGap + diskShadowRy
  const imgW = 548 // war 420 (420/460*600)
  const imgH = 694 // war 540 (540/560*720)
  /** Horizontally center the image slot on the popout circle */
  const imgX = cx - imgW / 2
  /** Bottom of image slot = bottom of circle; xMidYMax meet pins the figure to that edge */
  const imgY = cy + r - imgH

  /** Concentric arc outside the portrait circle (same center, r + pad). */
  const arcPad = 26
  const rArc = r + arcPad
  const arcDir1 = { x: 489 - cx, y: 656 - cy } // war 375, 510
  const arcDir2 = { x: 574 - cx, y: 463 - cy } // war 440, 360
  const arcLen1 = Math.hypot(arcDir1.x, arcDir1.y)
  const arcLen2 = Math.hypot(arcDir2.x, arcDir2.y)
  const arcX1 = cx + (rArc * arcDir1.x) / arcLen1
  const arcY1 = cy + (rArc * arcDir1.y) / arcLen1
  const arcX2 = cx + (rArc * arcDir2.x) / arcLen2
  const arcY2 = cy + (rArc * arcDir2.y) / arcLen2
  const arcPathD = `M ${arcX1} ${arcY1} A ${rArc} ${rArc} 0 0 0 ${arcX2} ${arcY2}`

  /** Push floating stat cards outward from the portrait; left ↔ negative left, right ↔ negative right. */
  const cardSpread = 22

  /** Left dot: inside viewBox, outside popout circle; pulled closer in single-column view */
  const decorDotL = isSingleCol ? { cx: 121, cy: 201 } : { cx: 57, cy: 113 } // skaliert für 600×720
  /** Grid: original dot size & spacing; more cells via denser rows/cols */
  const decorGridStep = 16
  const decorGridR = 3.5
  const decorGridCols = 5
  const decorGridRows = 5
  const decorGridOrigin = isSingleCol ? { x: 416, y: 114 } : { x: 441, y: 67 } // skaliert für 600×720
  /** Left decor dot: 3× base radius 7 */
  const decorDotLRadius = 7 * 3
  /** Squiggle path centroid (original coords), for vertical alignment */
  const decorSquigglePathCy = 314 // war 244 (244/560*720)
  /** Gap between Web Vitals (top 124) and Automatisierung (bottom 42) → center in viewBox Y. */
  const webCardBottomPx = 124 + 150
  const autoCardApproxHPx = 160
  const autoCardTopPx = height - 42 - autoCardApproxHPx
  const gapMidPx = (webCardBottomPx + autoCardTopPx) / 2
  /** Nach oben in CSS px → viewBox-Y (skaliert mit `height` wie das SVG gerendert wird) */
  const squiggleShiftUpPx = 30
  const decorSquiggleTy =
    (gapMidPx / height) * VIEWBOX_H - decorSquigglePathCy - (squiggleShiftUpPx / height) * VIEWBOX_H
  /** Extra shift left in CSS px → viewBox units (scales with `width`) */
  const squiggleShiftLeftPx = 20
  const decorSquiggleTxBase = -148 - (squiggleShiftLeftPx / width) * VIEWBOX_W
  const decorSquiggleTx = isSingleCol ? decorSquiggleTxBase + 16 : decorSquiggleTxBase
  const decorSquiggleScale = 0.72
  const decorSquigglePivot = { x: 179, y: decorSquigglePathCy } // war 137 (137/460*600)
  /** ViewBox minus circle — clip shows only outside popout (squiggle + dot stay visible) */
  const decorOutsideClipD = `M 0 0 L ${VIEWBOX_W} 0 L ${VIEWBOX_W} ${VIEWBOX_H} L 0 ${VIEWBOX_H} Z M ${cx} ${cy} m ${-r},0 a ${r},${r} 0 1 0 ${2 * r},0 a ${r},${r} 0 1 0 ${-2 * r},0`

  return (
    <div
      className="pb-popout-root"
      {...(fillRowHeight ? { 'data-pb-fill-row': '' } : {})}
      style={{
        position: 'relative',
        height: '100%',
        aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}`,
        flexShrink: 0,
        overflow: 'visible',
        margin: '0 auto',
      }}
    >
      <style>{`
        .pb-popout-root[data-pb-fill-row] {
          width: 100%;
          height: 100%;
        }
        @media (min-width: 768px) {
          .pb-popout-root[data-pb-fill-row] {
            width: auto;
            height: 100%;
            max-width: none;
            max-height: none;
            flex: 1 1 auto;
          }
        }
        .pb-disk-dark {
          display: none;
        }
        [data-theme='dark'] .pb-popout-root .pb-disk-light {
          display: none;
        }
        [data-theme='dark'] .pb-popout-root .pb-disk-dark {
          display: block;
        }
        /* @keyframes pb-floatA { 0%,100%{translate:0 0} 50%{translate:0 -7px} }
        @keyframes pb-floatB { 0%,100%{translate:0 0} 50%{translate:0 -6px} }
        @keyframes pb-floatC { 0%,100%{translate:0 0} 50%{translate:0 -8px} }
        @keyframes pb-floatD { 0%,100%{translate:0 0} 50%{translate:0 -5px} }
        .pb-cA { /* animation: pb-floatA 3.2s ease-in-out infinite; */ }
        .pb-cB { /* animation: pb-floatB 3.8s ease-in-out infinite 0.8s; */ }
        .pb-cC { /* animation: pb-floatC 3.5s ease-in-out infinite 0.4s; */ }
        .pb-cD { /* animation: pb-floatD 4.0s ease-in-out infinite 1.1s; */ }
        /*
         * Web Vitals (pb-cB): top 124px, feste Innenhöhe im JSX — Außen­höhe für Mindestabstand
         * zur Automatisierungskarte (pb-cC). Bei Layout-Änderungen an pb-cB anpassen.
         */
        .pb-popout-root {
          --pb-webvitals-top: 0px;
          --pb-webvitals-card-outer-h: 0px;
          --pb-webvitals-automatisierung-gap: 0px;
          --pb-automatisierung-min-top: 0px;
          --pb-cA-ipad-up: 0px;
          --pb-cA-desktop-up: 0px;
        }
        /* iPad / Tablet: Ads Performance zusätzlich ~100px nach oben (schließt 1024px-Breite z. B. iPad Pro Portrait ein) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .pb-popout-root {
            --pb-cA-ipad-up: 100px;
          }
        }
        /* Desktop (ab 1025px): weitere ~100px nach oben — getrennt von iPad, damit 1024px nicht doppelt zählt */
        @media (min-width: 1025px) {
          .pb-popout-root {
            --pb-cA-desktop-up: 0px;
          }
        }
        .pb-cards-wrap {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }
        /* Funnel + Automatisierung über Portrait; Squiggle liegt im Hintergrund (z-1) */
        .pb-popout-root > .pb-cards-wrap.pb-cards-wrap--layer-front {
          z-index: 5;
        }
        /* Ads Performance (pb-cA): genug Abstand nach unten, damit die Karte nicht unter/in den fixen Header rutscht */
        @media (min-width: 768px) {
          .pb-popout-root {
            --pb-cA-top: 0px;
          }
        }
        @media (min-width: 1024px) {
          .pb-popout-root {
            --pb-cA-top: 0px;
          }
        }
        /* Unter 800px: Karten vor Portrait (z-3). Unter 768px extra hoch (14), über Squiggle (6) + äußere Überlagerungen */
        @media (max-width: 799px) {
          .pb-popout-root .pb-cards-wrap {
            z-index: 1 !important;
          }
        }
        @media (max-width: 767px) {
          .pb-popout-root .pb-cards-wrap {
            z-index: 1 !important;
          }
        }
        @media (max-width: 767px) {
          .pb-popout-root {
            min-width: 320px;
            width: auto !important;
            margin-left: auto;
            margin-right: -5vw;
          }
        }
        @media (max-width: 599px) {
          .pb-card { /* scale: 0.64; */ }
          .pb-card.pb-cA { transform-origin: top right; right: 0px !important; }
          .pb-card.pb-cB { transform-origin: top left; left: 0px !important; }
          .pb-card.pb-cC {
            transform-origin: top left;
            left: 0px !important;
            bottom: auto !important;
            top: max(350px, var(--pb-automatisierung-min-top)) !important;  // war 272
          }
          .pb-card.pb-cD { transform-origin: top right; right: 0px !important; }
        }
        /* Schmale Tablet-Breite (592–704px): Automatisierung von unten lösen */
        @media (min-width: 37rem) and (max-width: 44rem) {
          .pb-popout-root .pb-card.pb-cC {
            bottom: auto !important;
            top: max(350px, var(--pb-automatisierung-min-top)) !important;  // war 272
            transform-origin: top left;
          }
        }
        /*
         * 705–767px: o. g. Regel endet bei 44rem (704px) — sonst bleibt pb-cC bei bottom:42 und
         * verschwindet hinter hero-mobile-glass — Mindestabstand Web Vitals + Puffer (s. --pb-*).
         */
        @media (min-width: 44.0625rem) and (max-width: 767px) {
          .pb-popout-root .pb-card.pb-cC {
            bottom: auto !important;
            top: max(350px, var(--pb-automatisierung-min-top)) !important;  // war 272
            transform-origin: top left;
          }
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
          stroke: #24254a;
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
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask id={decorMaskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
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
                fill="#24254a"
                opacity={Math.max(0.35, 1 - row * 0.14)}
              />
            )),
          ).flat()}

          <path d={arcPathD} stroke="#8284b8" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>

        <g clipPath={`url(#${decorOutsideClipId})`}>
          <circle cx={decorDotL.cx} cy={decorDotL.cy} r={decorDotLRadius} fill="#24254a" />
        </g>
      </svg>

      {/* z-1: Bodenschatten (Ellipse unter dem Kreis) + indigo Kreis mit Verlauf */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id={diskGradId} cx="38%" cy="32%" r="68%" fx="35%" fy="28%">
            <stop offset="0%" stopColor="#55568f" />
            <stop offset="45%" stopColor="#3f4078" />
            <stop offset="100%" stopColor="#262752" />
          </radialGradient>
          <radialGradient
            id={diskGroundShadowGradId}
            gradientUnits="objectBoundingBox"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#080812" stopOpacity="0.52" />
            <stop offset="45%" stopColor="#10101c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#10101c" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={diskGroundShadowGradDarkId}
            gradientUnits="objectBoundingBox"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#c8cae8" stopOpacity="0.14" />
            <stop offset="40%" stopColor="#a8abce" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#a8abce" stopOpacity="0" />
          </radialGradient>
          <filter
            id={diskGroundShadowBlurId}
            x={cx - diskShadowRx - 56}
            y={cy + r + diskShadowGap - 12}
            width={2 * diskShadowRx + 112}
            height={2 * diskShadowRy + 88}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>
          <linearGradient
            id={diskRimGradId}
            gradientUnits="userSpaceOnUse"
            x1={cx - r * 0.55}
            y1={cy - r * 0.9}
            x2={cx + r * 0.65}
            y2={cy + r * 0.75}
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.58" />
            <stop offset="20%" stopColor="#eef0ff" stopOpacity="0.32" />
            <stop offset="48%" stopColor="#c8cce8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#262752" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="pb-disk-light">
          <ellipse
            cx={cx}
            cy={diskShadowCy}
            rx={diskShadowRx}
            ry={diskShadowRy}
            fill={`url(#${diskGroundShadowGradId})`}
            filter={`url(#${diskGroundShadowBlurId})`}
          />
        </g>
        <g className="pb-disk-dark">
          <ellipse
            cx={cx}
            cy={diskShadowCy}
            rx={diskShadowRx}
            ry={diskShadowRy}
            fill={`url(#${diskGroundShadowGradDarkId})`}
            filter={`url(#${diskGroundShadowBlurId})`}
          />
        </g>
        <g className="pb-disk-core">
          <circle cx={cx} cy={cy} r={r} fill={`url(#${diskGradId})`} />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`url(#${diskRimGradId})`}
            strokeWidth={2.65}
            vectorEffect="nonScalingStroke"
          />
        </g>
      </svg>

      {/* z-2: Squiggle im Hintergrund — über Kreisfläche sichtbar, unter Karten und Portrait */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g
          transform={`translate(${decorSquiggleTx} ${decorSquiggleTy}) translate(${decorSquigglePivot.x} ${decorSquigglePivot.y}) scale(${decorSquiggleScale}) translate(${-decorSquigglePivot.x} ${-decorSquigglePivot.y})`}
        >
          <path
            className="pb-decor-squiggle"
            vectorEffect="nonScalingStroke"
            d="M 120 332 C 133 306, 151 298, 162 319
               C 172 340, 190 329, 201 309
               C 211 288, 230 293, 237 314"
          />
        </g>
      </svg>

      {/* z-3: floating cards (über Kreis, unter Portrait); Automatisierung: eigene Layer z-5 */}
      <div className="pb-cards-wrap">
        <div
          className="pb-card pb-cA"
          style={{
            top: 'calc(var(--pb-cA-top, 159px) - 30px - var(--pb-cA-ipad-up, 0px) - var(--pb-cA-desktop-up, 0px))', // 124→159
            right: -(cardSpread + 30),
            width: 182,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
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

        {/* top/Höhe mit --pb-webvitals-top / --pb-webvitals-card-outer-h in <style> (Abstand zu pb-cC) abstimmen */}
        <div className="pb-card pb-cB" style={{ top: 159, left: -(cardSpread + 27), width: 170 }}>
          {' '}
          {/* top war 124 */}
          <p className="pb-card-title" style={{ margin: '0 0 7px' }}>
            Web Vitals
          </p>
          <ScoreBar label="Performance" value={92} color="#27ae60" />
          <ScoreBar label="SEO" value={97} color="#5f61a0" />
          <ScoreBar label="Accessibility" value={88} color="#f39c12" />
        </div>
      </div>

      {/* z-4: Portrait ohne SVG-clipPath, damit das Motiv vollständig sichtbar bleibt (xMidYMax meet im Slot) */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={`${uid}-portrait-fade-grad`}
            x1="0"
            y1={imgY}
            x2="0"
            y2={imgY + imgH}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="85%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id={`${uid}-portrait-fade-mask`}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <rect
              x={imgX}
              y={imgY}
              width={imgW}
              height={imgH}
              fill={`url(#${uid}-portrait-fade-grad)`}
            />
          </mask>
        </defs>
        <image
          href={imageSrc}
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          preserveAspectRatio="xMidYMax meet"
          mask={`url(#${uid}-portrait-fade-mask)`}
          onError={(e) => {
            console.error('[PopoutPortrait] Image failed to load:', imageSrc, e)
            // Optional: Set fallback image or handle gracefully
          }}
        />
      </svg>

      {/* Karten über Portrait; Mobile z-index siehe max-width 767px */}
      <div className="pb-cards-wrap pb-cards-wrap--layer-front">
        <div className="pb-card pb-cD" style={{ top: 362, right: 7 - cardSpread - 20, width: 130 }}>
          {' '}
          {/* top war 282 */}
          <p className="pb-card-title" style={{ margin: '0 0 6px' }}>
            Funnel
          </p>
          <FunnelRow label="Besucher" value="12.4k" pct={100} color="#3f4078" />
          <FunnelRow label="Leads" value="3.1k" pct={62} color="#5f61a0" />
          <FunnelRow label="Kunden" value="486" pct={25} color="#27ae60" valueColor="#27ae60" />
        </div>
        <div className="pb-card pb-cC" style={{ bottom: 54, left: 8 - cardSpread, width: 170 }}>
          {' '}
          {/* bottom war 42 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span className="pb-card-title">Automatisierung</span>
            <Pill variant="success">● Live</Pill>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 7 }}>
            <Stat label="Workflows" value="24" />
            <Stat label="Zeitersparnis" value="38h" valueColor="#5f61a0" />
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
      <div
        className={valueColor ? undefined : 'pb-card-value'}
        style={
          valueColor
            ? { fontSize: 17, fontWeight: 700, color: valueColor }
            : { fontSize: 17, fontWeight: 700 }
        }
      >
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
