import type { FC } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export type LeistungenHeroProps = {
  headline: string
  subheadline?: string
  description?: string
  badge?: string
  stats?: { value: string; label: string }[]
  links?: any[]
  media?: any
}

export const LeistungenHero: FC<LeistungenHeroProps> = ({
  headline,
  subheadline,
  description,
  badge,
  stats,
  links,
  media,
}) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-neutral-900 text-white py-20 px-4 overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center text-center max-w-3xl">
        {badge && (
          <span className="mb-4 inline-block rounded bg-primary-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
            {badge}
          </span>
        )}
        {headline && (
          <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-heading-gradient hero-heading-gradient--inverse">
            {headline}
          </h1>
        )}
        {subheadline && (
          <h2 className="text-xl md:text-2xl font-medium mb-2 opacity-80">{subheadline}</h2>
        )}
        {description && <p className="mb-6 text-base md:text-lg opacity-80">{description}</p>}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4 mb-6">
            {links.map((item, i) => {
              if (!item || !item.link) return null
              return (
                <li key={`hero-link-${i}`}>
                  <CMSLink {...item.link} />
                </li>
              )
            })}
          </ul>
        )}
        {Array.isArray(stats) && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {stats.map((stat, i) => (
              <div
                key={`hero-stat-${stat.label ?? stat.value ?? i}-${i}`}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-bold text-primary-400">{stat.value}</span>
                <span className="text-xs uppercase tracking-wider opacity-70">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {media && typeof media === 'object' && 'url' in media && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Media fill imgClassName="object-cover opacity-30" priority resource={media} />
        </div>
      )}
    </section>
  )
}
