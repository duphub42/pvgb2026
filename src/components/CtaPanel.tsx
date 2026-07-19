import React from 'react'

import { cn } from '@/utilities/ui'

type CtaPanelProps = {
  children: React.ReactNode
  className?: string
  cardClassName?: string
  backgroundClassName?: string
}

export function CtaPanel({
  children,
  className,
  cardClassName,
  backgroundClassName,
}: CtaPanelProps) {
  return (
    <div className={cn('cta-panel-shell relative isolate mx-auto w-full max-w-none', className)}>
      <div
        className={cn(
          'cta-panel-abstract-background pointer-events-none absolute -inset-x-12 -inset-y-16 z-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_0%,black_38%,rgba(0,0,0,0.58)_58%,transparent_80%)] dark:opacity-65 md:-inset-x-24 md:-inset-y-20',
          backgroundClassName,
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,color-mix(in_srgb,var(--foreground)_11%,transparent)_34%,transparent_64%),linear-gradient(35deg,transparent_14%,color-mix(in_srgb,var(--primary)_20%,transparent)_48%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--foreground)_18%,transparent)_0_7px,transparent_7px_26px)] opacity-60" />
      </div>

      <div
        className={cn(
          'cta-panel-card relative z-10 overflow-hidden rounded-[calc(var(--style-radius-l)+0.5rem)] border border-border/60 bg-primary/[0.045] px-6 py-7 shadow-[0_18px_56px_-46px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:bg-primary/[0.08] dark:shadow-[0_18px_56px_-46px_rgba(0,0,0,0.65)] md:rounded-[1.5rem] md:px-8 md:py-8 lg:px-10 lg:py-9',
          cardClassName,
        )}
      >
        <div
          className="pointer-events-none absolute -left-[55%] top-1/2 aspect-square w-[170%] -translate-y-1/2 rounded-full border border-foreground/10 bg-foreground/[0.025] dark:border-foreground/15 dark:bg-foreground/[0.035] md:-left-[24%] md:w-[94%]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-px left-px z-[1] w-[calc(100%-2px)] rounded-[inherit] bg-background md:w-[78%] md:[mask-image:linear-gradient(to_right,black_0%,black_82%,transparent_100%)]"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  )
}
