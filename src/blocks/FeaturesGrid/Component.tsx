import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React, { ReactNode } from 'react'

// Konkreter Typ kommt nach payload generate:types (FeaturesGridBlock)
type FeaturesGridBlockProps = any

function getIconComponent(icon?: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  switch (icon) {
    case 'settings2':
      return Settings2
    case 'sparkles':
      return Sparkles
    case 'zap':
    default:
      return Zap
  }
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
)

export const FeaturesGridBlock: React.FC<FeaturesGridBlockProps> = (props) => {
  const { title, subtitle, items, disableInnerContainer } = props

  const list = Array.isArray(items) ? items : []

  return (
    <section className={cn('py-16 md:py-32', disableInnerContainer && 'py-8')}>
      <div
        className={cn(
          '@container mx-auto max-w-5xl px-6',
          disableInnerContainer && 'px-0',
        )}
      >
        <div className="text-center">
          {title && (
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {list.length > 0 && (
          <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
            {list.map(
              (
                item: {
                  icon?: string | null
                  title?: string | null
                  description?: string | null
                },
                idx: number,
              ) => {
                const Icon = getIconComponent(item.icon ?? undefined)
                return (
                  <Card key={idx} className="group border-0 shadow-none">
                    <CardHeader className="pb-3">
                      <CardDecorator>
                        <Icon className="size-6" aria-hidden />
                      </CardDecorator>

                      {item.title && (
                        <h3 className="mt-6 font-medium">
                          {item.title}
                        </h3>
                      )}
                    </CardHeader>

                    {item.description && (
                      <CardContent>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                )
              },
            )}
          </div>
        )}
      </div>
    </section>
  )
}

