import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

// Konkreter Typ kommt nach payload generate:types (FeaturesScalingBlock)
type FeaturesScalingBlockProps = any

function getIconComponent(icon?: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  switch (icon) {
    case 'zap':
      return Zap
    case 'activity':
      return Activity
    case 'draftingCompass':
      return DraftingCompass
    case 'mail':
    default:
      return Mail
  }
}

export const FeaturesScalingBlock: React.FC<FeaturesScalingBlockProps> = (props) => {
  const { title, subtitle, features, darkImage, lightImage, disableInnerContainer } = props ?? {}

  const list = Array.isArray(features) ? features : []
  const hasDarkImage = Boolean(darkImage)
  const hasLightImage = Boolean(lightImage)
  const hasAnyImage = hasDarkImage || hasLightImage

  return (
    <section className={cn('py-16 md:py-32', disableInnerContainer && 'py-12')}>
      <div className={cn('mx-auto max-w-6xl px-6', disableInnerContainer && 'px-0')}>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className={cn('md:pr-6 lg:pr-0', disableInnerContainer && 'pr-0')}>
              {title && (
                <h2 className="text-4xl font-semibold lg:text-5xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-6 text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {list.length > 0 && (
              <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                {list.map(
                  (f: { icon?: string | null; label?: string | null }, idx: number) => {
                    if (!f?.label) return null
                    const Icon = getIconComponent(f.icon ?? undefined)
                    return (
                      <li key={idx}>
                        <Icon className="size-5" />
                        {f.label}
                      </li>
                    )
                  },
                )}
              </ul>
            )}
          </div>

          {hasAnyImage && (
            <div className="relative rounded-3xl border border-border/50 p-3 lg:col-span-3">
              <div className="bg-linear-to-b from-zinc-300 to-transparent dark:from-zinc-700 aspect-[76/59] relative rounded-2xl p-px">
                {hasDarkImage && (
                  <div className="hidden overflow-hidden rounded-[15px] dark:block">
                    <Media resource={darkImage} />
                  </div>
                )}
                {hasLightImage && (
                  <div className={cn('rounded-[15px] shadow', hasDarkImage && 'dark:hidden')}>
                    <Media resource={lightImage} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

