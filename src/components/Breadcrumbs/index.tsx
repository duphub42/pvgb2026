import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/utilities/ui'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  className?: string
  items: BreadcrumbItem[]
}

function sanitizeItems(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items
    .map((item) => ({
      ...item,
      label: item.label.trim(),
    }))
    .filter((item) => item.label.length > 0)
}

export function Breadcrumbs({ className, items }: BreadcrumbsProps) {
  const sanitizedItems = sanitizeItems(items)

  if (sanitizedItems.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={cn('w-full overflow-x-auto', className)}>
      <ol className="inline-flex min-w-max items-center gap-1 rounded-full border border-border/55 bg-background/65 px-3 py-1.5 font-mono text-[0.72rem] leading-none tracking-[0.02em] text-foreground/70 shadow-[0_10px_28px_-24px_rgba(0,0,0,0.65)] backdrop-blur supports-[backdrop-filter]:bg-background/55 md:text-xs">
        {sanitizedItems.map((item, index) => {
          const isLast = index === sanitizedItems.length - 1
          const key = `${item.href ?? item.label}-${index}`

          return (
            <li key={key} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  aria-hidden
                  className="h-3 w-3 shrink-0 text-foreground/40"
                  strokeWidth={1.8}
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'max-w-[42vw] truncate text-foreground/82 md:max-w-[30vw]',
                    isLast && 'text-foreground',
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  className="max-w-[38vw] truncate transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none md:max-w-[28vw]"
                  href={item.href}
                  title={item.label}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
