import { Code, Cog, PenTool, Shrub } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

// Konkreter Typ kommt nach payload generate:types (Services4Block)
type Services4BlockProps = any

function getIconComponent(icon?: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  switch (icon) {
    case 'penTool':
      return PenTool
    case 'code':
      return Code
    case 'shrub':
      return Shrub
    case 'cog':
    default:
      return Cog
  }
}

export const Services4Block: React.FC<Services4BlockProps> = (props) => {
  const { title, subtitle, services, disableInnerContainer } = props ?? {}

  const list = Array.isArray(services) ? services : []

  return (
    <section className={cn('py-32', disableInnerContainer && 'py-16')}>
      <div className={cn('container', disableInnerContainer && 'px-6')}>
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
                {subtitle}
              </p>
            )}
          </div>

          {list.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {list.map(
                (
                  service: {
                    icon?: string | null
                    title?: string | null
                    description?: string | null
                    items?: { label?: string | null }[] | null
                  },
                  index: number,
                ) => {
                  const Icon = getIconComponent(service.icon ?? undefined)
                  const bullets = Array.isArray(service.items) ? service.items : []

                  return (
                    <div
                      key={index}
                      className="space-y-6 rounded-lg border border-border p-8 transition-shadow hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-3">
                          <Icon className="h-6 w-6" aria-hidden />
                        </div>
                        {service.title && (
                          <h3 className="text-xl font-semibold">
                            {service.title}
                          </h3>
                        )}
                      </div>
                      {service.description && (
                        <p className="leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                      {bullets.length > 0 && (
                        <div className="space-y-2">
                          {bullets.map((item, itemIndex) => {
                            if (!item?.label) return null
                            return (
                              <div key={itemIndex} className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                                <span className="text-sm font-medium">
                                  {item.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                },
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

