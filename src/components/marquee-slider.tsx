import React from 'react'

import { cn } from '@/utilities/ui'

interface MarqueeItem {
  logo: React.ReactNode
  name: string
}

interface MarqueeProps {
  items: MarqueeItem[]
  direction?: 'left' | 'right'
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export const MarqueeSlider = ({
  items,
  direction = 'left',
  speed = 40,
  pauseOnHover = true,
  className,
}: MarqueeProps) => {
  const duration = Number.isFinite(speed) && speed > 0 ? speed : 40

  return (
    <div
      className={cn(
        'group flex overflow-hidden p-2 [--gap:2rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 justify-around gap-[--gap]',
          direction === 'left' ? 'animate-marquee-slider' : 'animate-marquee-slider-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ '--duration': `${duration}s` } as React.CSSProperties}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/10 px-4 py-2 shadow-sm"
          >
            {item.logo}
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{item.name}</span>
          </div>
        ))}

        {items.map((item, idx) => (
          <div
            key={`dup-${idx}`}
            className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/10 px-4 py-2 shadow-sm"
            aria-hidden="true"
          >
            {item.logo}
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
