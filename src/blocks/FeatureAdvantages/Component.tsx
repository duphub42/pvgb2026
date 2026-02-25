import React from 'react'
import { Check } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

// Konkreter Typ kommt nach payload generate:types (FeatureAdvantagesBlock)
type FeatureAdvantagesBlockProps = any

export const FeatureAdvantagesBlock: React.FC<FeatureAdvantagesBlockProps> = (props) => {
  const { disableInnerContainer, className, badgeLabel, title, subtitle, items } = props ?? {}

  const resolvedBadge = badgeLabel && String(badgeLabel).trim().length > 0 ? badgeLabel : 'Platform'
  const resolvedTitle = title && String(title).trim().length > 0 ? title : 'Something new!'
  const resolvedSubtitle =
    subtitle && String(subtitle).trim().length > 0
      ? subtitle
      : 'Managing a small business today is already tough.'

  const advantages: Array<{ title?: string; description?: string }> =
    Array.isArray(items) && items.length > 0 ? items : props?.items ?? []

  return (
    <section className={cn('py-20 lg:py-40', className)}>
      <div className={cn('container mx-auto', disableInnerContainer && 'px-6')}>
        <div className="flex flex-col items-start gap-4 py-10 lg:py-20">
          <div>
            <Badge>{resolvedBadge}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-normal tracking-tighter md:text-5xl lg:max-w-xl">
              {resolvedTitle}
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-xl">
              {resolvedSubtitle}
            </p>
          </div>
          {advantages.length > 0 && (
            <div className="flex w-full flex-col gap-10 pt-12">
              <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {advantages.map((item, idx) => (
                  <div key={idx} className="flex w-full flex-row items-start gap-6">
                    <Check className="mt-2 h-4 w-4 text-primary" />
                    <div className="flex flex-col gap-1">
                      {item.title && <p>{item.title}</p>}
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

