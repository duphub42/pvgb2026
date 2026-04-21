'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/utilities/ui'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import {
  spacingMap,
  containerMap,
  backgroundMap,
  borderMap,
  contentSpacingMap,
} from '@/blocks/BlockStyleSystem'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const animationVariants: Record<string, Variants> = {
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
  const color = overlay.color === 'light' ? 'var(--color-base-0)' : 'var(--color-base-1000)'

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

export function BlockContainer({
  children,
  styles,
  className,
  disableAnimation = false,
  index = 0,
  as: Component = 'section',
}: BlockContainerProps) {
  const hasBackground = styles?.blockBackground && styles.blockBackground !== 'none'
  const hasOverlay = styles?.blockOverlay?.enabled && styles.blockOverlay.opacity != null
  const animation = styles?.blockAnimation ?? 'default'

  // Build all classes
  const containerClasses = buildContainerClasses(styles ?? {})
  const backgroundClasses = buildBackgroundClasses(styles ?? {})
  const spacingClasses = buildSpacingClasses(styles ?? {})
  const borderClasses = buildBorderClasses(styles ?? {})
  const overlayStyle = buildOverlayStyle(styles ?? {})

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
  const contentSpacing = styles?.blockContentSpacing ?? 'default'
  const contentClasses = cn('relative z-10', containerClasses, contentSpacingMap[contentSpacing])

  const animationVariant = animationVariants[animation] || animationVariants.default

  // If animation disabled, render static
  if (disableAnimation) {
    return (
      <Component className={wrapperClasses}>
        {hasOverlay && <div aria-hidden style={overlayStyle} />}
        <div className={contentClasses}>{children}</div>
      </Component>
    )
  }

  // Animated version
  return (
    <motion.div
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
    </motion.div>
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
  return {
    blockSpacing: props.blockSpacing as BlockStyles['blockSpacing'],
    blockContainer: props.blockContainer as BlockStyles['blockContainer'],
    blockBackground: props.blockBackground as BlockStyles['blockBackground'],
    blockBorder: props.blockBorder as BlockStyles['blockBorder'],
    blockOverlay: props.blockOverlay as BlockStyles['blockOverlay'],
    blockContentSpacing: props.blockContentSpacing as BlockStyles['blockContentSpacing'],
    blockAnimation: props.blockAnimation as BlockStyles['blockAnimation'],
  }
}
