'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

const ITEMS = [
  'TypeScript',
  'JavaScript',
  'Dart',
  'React',
  'Flutter',
  'Android',
  'HTML5',
  'CSS3',
  'Node.js',
  'Express',
  'Next.js',
  'Prisma',
  'PostgreSQL',
  'Firebase',
  'NGINX',
  'Vercel',
  'Testing Library',
  'Jest',
  'Cypress',
  'Docker',
  'Git',
  'Jira',
  'GitHub',
  'GitLab',
  'Android Studio',
  'SonarQube',
  'Figma',
]

export function TechStackMarquee({ className }: { className?: string }) {
  const allItems = [...ITEMS, ...ITEMS]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
      <div
        className="relative flex gap-3 py-3 px-4 animate-tech-marquee"
        aria-hidden="true"
      >
        {allItems.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

