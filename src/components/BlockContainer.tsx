'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import { cn } from '@/utilities/ui'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import {
  spacingMap,
  containerMap,
  backgroundMap,
  borderMap,
  contentSpacingMap,
  normalizeBlockStyles,
} from '@/blocks/BlockStyleSystem'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const animationVariants = {
  default: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
}

// ============================================================================
// STYLE BUILDER
// ============================================================================

function buildContainerClasses(styles: BlockStyles): string {
  const container = styles.blockContainer ?? 'default'
  return containerMap[container] || containerMap.default
}

function buildBackgroundClasses(styles: BlockStyles): string {
  const background = styles.blockBackground ?? 'none'
  return backgroundMap[background] || ''
}

function buildSpacingClasses(styles: BlockStyles): string {
  const spacing = styles.blockSpacing
  if (!spacing) return `${spacingMap.padding.default}`

  const classes: string[] = []

  // Padding
  const padding = spacing.padding ?? 'default'
  classes.push(spacingMap.padding[padding])

  // Padding Top modifier
  if (spacing.paddingTop === 'negative') {
    classes.push('-mt-16 md:-mt-20 lg:-mt-28')
    classes.push('pt-16 md:pt-20 lg:pt-28')
  } else if (spacing.paddingTop === 'xl') {
    classes.push('pt-24 md:pt-32')
  }

  // Margin Bottom
  const marginBottom = spacing.marginBottom ?? 'default'
  classes.push(spacingMap.marginBottom[marginBottom])

  return classes.join(' ')
}

function buildBorderClasses(styles: BlockStyles): string {
  const border = styles.blockBorder
  if (!border?.enabled) return ''

  const classes: string[] = []

  // Border style
  const style = border.style ?? 'default'
  classes.push(borderMap.enabled[style])

  // Border radius
  const radius = border.radius ?? 'default'
  classes.push(borderMap.radius[radius])

  return classes.join(' ')
}

function buildOverlayStyle(styles: BlockStyles): React.CSSProperties | undefined {
  const overlay = styles.blockOverlay
  if (!overlay?.enabled || overlay.opacity == null) return undefined

  const opacityNum = Number(overlay.opacity)
  if (Number.isNaN(opacityNum)) return undefined

  const opacity = Math.min(1, Math.max(0, opacityNum / 100))
  const color =
    overlay.color === 'light' ? 'var(--block-overlay-light)' : 'var(--block-overlay-dark)'

  return {
    position: 'absolute',
    inset: 0,
    backgroundColor: color,
    opacity,
    pointerEvents: 'none',
    borderRadius: 'inherit',
  }
}

// ============================================================================
// BLOCK CONTAINER COMPONENT
// ============================================================================

interface BlockContainerProps {
  children: React.ReactNode
  styles?: BlockStyles | null
  className?: string
  /** Wenn true, wird kein motion.div verwendet (für Server Components) */
  disableAnimation?: boolean
  /** Index für staggered Animation */
  index?: number
  /** Ob der Container eine Section oder Div sein soll */
  as?: 'section' | 'div'
}

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
  initial?: string
  whileInView?: string
  viewport?: {
    once?: boolean
    amount?: number
  }
  variants?: Record<string, unknown>
  transition?: {
    duration?: number
    ease?: number[]
    delay?: number
  }
}

export function BlockContainer({
  children,
  styles,
  className,
  disableAnimation = false,
  index = 0,
  as: Component = 'section',
}: BlockContainerProps) {
  const [MotionDiv, setMotionDiv] = useState<React.ComponentType<MotionDivProps> | null>(null)
  const resolvedStyles = normalizeBlockStyles(styles)

  useEffect(() => {
    if (disableAnimation) return

    let cancelled = false

    // Load framer-motion only when animation is actually enabled for this block.
    import('framer-motion').then((mod) => {
      if (!cancelled) {
        setMotionDiv(() => mod.motion.div as React.ComponentType<MotionDivProps>)
      }
    })

    return () => {
      cancelled = true
    }
  }, [disableAnimation])

  const hasBackground = resolvedStyles.blockBackground && resolvedStyles.blockBackground !== 'none'
  const hasOverlay =
    resolvedStyles.blockOverlay?.enabled && resolvedStyles.blockOverlay.opacity != null
  const animation = resolvedStyles.blockAnimation ?? 'default'

  // Build all classes
  const containerClasses = buildContainerClasses(resolvedStyles)
  const backgroundClasses = buildBackgroundClasses(resolvedStyles)
  const spacingClasses = buildSpacingClasses(resolvedStyles)
  const borderClasses = buildBorderClasses(resolvedStyles)
  const overlayStyle = buildOverlayStyle(resolvedStyles)

  // Combined wrapper classes
  const wrapperClasses = cn(
    // Base
    'relative w-full min-w-0',
    // Background
    backgroundClasses,
    // Spacing
    spacingClasses,
    // Border
    borderClasses,
    // Isolation für z-index
    (hasBackground || hasOverlay) && 'isolate',
    // User custom classes
    className,
  )

  // Content wrapper - handles content spacing
  const contentSpacing = resolvedStyles.blockContentSpacing ?? 'default'
  const contentClasses = cn('relative z-10', containerClasses, contentSpacingMap[contentSpacing])

  const animationVariant = animationVariants[animation] || animationVariants.default

  // If animation disabled, render static
  if (disableAnimation || !MotionDiv) {
    return (
      <Component className={wrapperClasses}>
        {hasOverlay && <div aria-hidden style={overlayStyle} />}
        <div className={contentClasses}>{children}</div>
      </Component>
    )
  }

  // Animated version
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={animationVariant}
      transition={{
        duration: 0.72,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.06,
      }}
      className={wrapperClasses}
    >
      <Component className="contents">
        {hasOverlay && (
          <div aria-hidden className="absolute inset-0 rounded-inherit" style={overlayStyle} />
        )}
        <div className={contentClasses}>{children}</div>
      </Component>
    </MotionDiv>
  )
}

// ============================================================================
// VERWENDUNG IN KOMPONENTEN
// ============================================================================

/**
 * Beispiel-Verwendung in einer Block-Komponente:
 *
 * ```tsx
 * export function MyBlock(props: MyBlockProps) {
 *   const { heading, text, disableInnerContainer, ...styles } = props
 *
 *   return (
 *     <BlockContainer styles={styles} index={index}>
 *       <h2>{heading}</h2>
 *       <p>{text}</p>
 *     </BlockContainer>
 *   )
 * }
 * ```
 */

// ============================================================================
// HELPER HOOK (optional)
// ============================================================================

export function useBlockStyles(props: Record<string, unknown>): BlockStyles {
  return normalizeBlockStyles({
    blockSpacing: props.blockSpacing as BlockStyles['blockSpacing'],
    blockSpacingPadding: props.blockSpacingPadding as BlockStyles['blockSpacingPadding'],
    blockSpacingPaddingTop: props.blockSpacingPaddingTop as BlockStyles['blockSpacingPaddingTop'],
    blockSpacingMarginBottom:
      props.blockSpacingMarginBottom as BlockStyles['blockSpacingMarginBottom'],
    blockContainer: props.blockContainer as BlockStyles['blockContainer'],
    blockBackground: props.blockBackground as BlockStyles['blockBackground'],
    blockBorder: props.blockBorder as BlockStyles['blockBorder'],
    blockBorderEnabled: props.blockBorderEnabled as BlockStyles['blockBorderEnabled'],
    blockBorderStyle: props.blockBorderStyle as BlockStyles['blockBorderStyle'],
    blockBorderRadius: props.blockBorderRadius as BlockStyles['blockBorderRadius'],
    blockOverlay: props.blockOverlay as BlockStyles['blockOverlay'],
    blockOverlayEnabled: props.blockOverlayEnabled as BlockStyles['blockOverlayEnabled'],
    blockOverlayColor: props.blockOverlayColor as BlockStyles['blockOverlayColor'],
    blockOverlayOpacity: props.blockOverlayOpacity as BlockStyles['blockOverlayOpacity'],
    blockContentSpacing: props.blockContentSpacing as BlockStyles['blockContentSpacing'],
    blockAnimation: props.blockAnimation as BlockStyles['blockAnimation'],
  })
}
