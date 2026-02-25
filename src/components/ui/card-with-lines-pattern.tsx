import React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/utilities/ui'

interface LinesPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function LinesPatternCard({
  children,
  className,
  patternClassName,
  gradientClassName,
}: LinesPatternCardProps) {
  return (
    <motion.div
      className={cn(
        'w-full overflow-hidden rounded-md border bg-background p-3 border-border',
        className,
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'size-full bg-[length:30px_30px] bg-repeat',
          'bg-lines-pattern-light dark:bg-lines-pattern',
          patternClassName,
        )}
      >
        <div
          className={cn(
            'size-full bg-gradient-to-tr',
            'from-background/90 via-background/40 to-background/10',
            gradientClassName,
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function LinesPatternCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4 text-left md:p-6', className)} {...props} />
}

export function LinesPatternCardDemo() {
  return (
    <LinesPatternCard>
      <LinesPatternCardBody>
        <h3 className="mb-1 text-lg font-bold text-foreground">Diagonal Lines Pattern</h3>
        <p className="text-wrap text-sm text-foreground/60">
          A modern pattern featuring diagonal lines in a repeating grid. Creates a sense of
          movement and depth while maintaining a clean, minimalist aesthetic.
        </p>
      </LinesPatternCardBody>
    </LinesPatternCard>
  )
}

