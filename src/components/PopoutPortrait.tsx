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
      className="pb-popout-root relative h-full shrink-0 overflow-visible mx-auto aspect-[600/720]"
      {...(fillRowHeight ? { 'data-pb-fill-row': '' } : {})}
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
        @media (max-width: 767px) {
          .pb-popout-root {
            min-width: 320px;
            width: auto !important;
            margin-left: auto;
            margin-right: -5vw;
          }
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
        className="pointer-events-none absolute inset-0 z-0 overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
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
        className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
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
        className="pointer-events-none absolute inset-0 z-[2] overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
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

      {/* z-4: Portrait ohne SVG-clipPath, damit das Motiv vollständig sichtbar bleibt (xMidYMax meet im Slot) */}
      <svg
        className="pointer-events-none absolute inset-0 z-[4] overflow-visible"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
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
    </div>
  )
}

export { PopoutPortrait }
