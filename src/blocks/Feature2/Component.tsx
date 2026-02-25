import React from 'react'
import { Clock, Heart, Users, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

const iconMap = {
  heart: Heart,
  zap: Zap,
  clock: Clock,
  users: Users,
} as const

type Feature2BlockProps = any

export const Feature2Block: React.FC<Feature2BlockProps> = (props) => {
  const { className, disableInnerContainer, title, description, items, image } = props ?? {}

  const resolvedTitle = title && String(title).trim() ? title : 'Why Choose Us'
  const resolvedDescription =
    description && String(description).trim()
      ? description
      : 'We deliver exceptional quality and service that sets us apart. Experience the difference with our dedicated approach.'

  const features = Array.isArray(items) && items.length > 0 ? items : []
  const imageUrl =
    image && typeof image === 'object' && image?.url
      ? getMediaUrl(image.url)
      : 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop'
  const imageAlt =
    image && typeof image === 'object' && image?.alt
      ? String(image.alt)
      : 'Modern living room with pendant light and minimalist furniture'

  return (
    <section
      className={cn(
        'container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8',
        className,
      )}
    >
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10">
            <header className="space-y-4">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {resolvedTitle}
              </h2>
              <p className="text-pretty text-base text-muted-foreground md:text-lg">
                {resolvedDescription}
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              {features.map((item: { icon?: string; title?: string; description?: string }) => {
                const Icon =
                  iconMap[(item?.icon as keyof typeof iconMap) ?? 'heart'] ?? Heart
                return (
                  <div
                    key={item?.title ?? ''}
                    className="group flex flex-col items-start gap-3 rounded-lg"
                  >
                    <Badge
                      variant="secondary"
                      className="inline-flex items-center justify-center rounded-full p-3"
                    >
                      <Icon className="!size-5" aria-hidden="true" />
                    </Badge>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-foreground md:text-lg">
                        {item?.title ?? ''}
                      </h3>
                      <p className="text-balance text-sm text-muted-foreground">
                        {item?.description ?? ''}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-lg bg-muted shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="aspect-[4/3] w-full">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="size-full object-cover grayscale"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
