/**
 * TypeScript Types und Style-Mappings für das Block Style System
 * Die Payload-Config ist in blockStyleFields.ts definiert
 */

// ============================================================================
// TYPEN (basierend auf blockStyleFields.ts)
// ============================================================================

export type BlockSpacing = {
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'xl' | null
  paddingTop?: 'default' | 'negative' | 'xl' | null
  marginBottom?: 'none' | 'sm' | 'default' | 'lg' | null
}

export type BlockContainer = 'default' | 'full' | 'narrow' | 'wide' | 'none'

export type BlockBackground = 'none' | 'muted' | 'accent' | 'light' | 'dark' | 'card' | 'primary'

export type BlockBorder = {
  enabled?: boolean | null
  style?: 'default' | 'accent' | 'subtle' | null
  radius?: 'default' | 'sm' | 'lg' | 'none' | null
}

export type BlockOverlay = {
  enabled?: boolean | null
  color?: 'dark' | 'light' | null
  opacity?: number | null
}

export type BlockContentSpacing = 'compact' | 'default' | 'airy'

export type BlockAnimation = 'default' | 'none' | 'slideUp' | 'blur'

export interface BlockStyles {
  blockSpacing?: BlockSpacing | null
  blockContainer?: BlockContainer | null
  blockBackground?: BlockBackground | null
  blockBorder?: BlockBorder | null
  blockOverlay?: BlockOverlay | null
  blockContentSpacing?: BlockContentSpacing | null
  blockAnimation?: BlockAnimation | null
}

// ============================================================================
// STYLE-MAPPING FÜR CSS
// ============================================================================

export const spacingMap = {
  padding: {
    none: 'py-0',
    sm: 'py-8',
    default: 'py-16 md:py-20',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-40',
  },
  paddingTop: {
    default: '',
    negative: '-mt-20 md:-mt-28 pt-20 md:pt-28',
    xl: 'pt-24 md:pt-32',
  },
  marginBottom: {
    none: 'mb-0',
    sm: 'mb-8',
    default: 'mb-16',
    lg: 'mb-24',
  },
}

export const containerMap: Record<BlockContainer, string> = {
  default: 'container max-w-7xl mx-auto px-6 lg:px-8',
  full: 'w-full px-6 lg:px-8',
  narrow: 'container max-w-4xl mx-auto px-6 lg:px-8',
  wide: 'container max-w-[90rem] mx-auto px-6 lg:px-8',
  none: '',
}

export const backgroundMap: Record<BlockBackground, string> = {
  none: '',
  muted: 'bg-muted',
  accent: 'bg-accent',
  light: 'bg-[var(--theme-elevation-50)]',
  dark: 'bg-[var(--theme-elevation-800)] text-[var(--theme-elevation-0)]',
  card: 'bg-card',
  primary: 'bg-primary/[0.03]',
}

export const borderMap = {
  enabled: {
    default: 'border border-border/70',
    accent: 'border border-primary/30',
    subtle: 'border border-border/40',
  },
  radius: {
    none: 'rounded-none',
    sm: 'rounded-lg',
    default: 'rounded-2xl',
    lg: 'rounded-3xl',
  },
}

export const contentSpacingMap: Record<BlockContentSpacing, string> = {
  compact: 'space-y-3',
  default: 'space-y-6',
  airy: 'space-y-10',
}
