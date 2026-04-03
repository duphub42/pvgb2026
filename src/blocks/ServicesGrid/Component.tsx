'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

import type { ServicesGridBlock as ServicesGridBlockData } from '@/payload-types'
import { Media } from '@/components/Media'

type ServicesGridProps = ServicesGridBlockData & { disableInnerContainer?: boolean }

const normalizeServiceSlug = (slug?: string): string => {
  const raw = slug?.trim() ?? ''
  const normalized = raw.replace(/^\/+|\/+$/g, '')
  return normalized
}

const getRadialStyles = (variant?: string): React.CSSProperties => {
  switch (variant) {
    case 'blue':
      return {
        background: 'radial-gradient(circle at top left, rgba(96, 165, 250, 0.32), transparent 46%)',
      }
    case 'orange':
      return {
        background: 'radial-gradient(circle at top right, rgba(249, 115, 22, 0.28), transparent 44%)',
      }
    default:
      return {
        background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.22), transparent 45%)',
      }
  }
}

export const ServicesGridBlock: React.FC<ServicesGridProps> = ({
  heading,
  intro,
  tagline,
  introIconList,
  introImage,
  introImagePosition = 'left',
  radialBackground,
  radialBackgroundVariant,
  categories,
}) => {
  const servicesData = categories ?? []
  const hasIntroImage = Boolean(introImage)
  const hasIconList = Array.isArray(introIconList) && introIconList.length > 0
  const introText = [intro, tagline].filter(Boolean).join('\n')

  return (
    <section
      aria-label="Leistungen"
      className={cn('relative w-full min-w-0 overflow-visible py-16')}
    >
      {radialBackground ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-70 blur-[80px]"
          style={getRadialStyles(radialBackgroundVariant ?? 'default')}
        />
      ) : null}

      <div className="relative z-10 container">
        {(heading || intro || tagline || hasIconList || hasIntroImage) && (
          <div className="mx-auto grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0 lg:max-w-2xl">
              {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
              {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
              {tagline && <p className="mt-3 text-sm font-medium text-foreground/80">{tagline}</p>}

              {hasIconList ? (
                <ul className="mt-6 space-y-3">
                  {introIconList?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                        {item.icon}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {hasIntroImage ? (
              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl border border-border bg-muted',
                  introImagePosition === 'left' ? 'order-first lg:mr-8' : 'order-last lg:ml-8',
                )}
              >
                <Media resource={introImage as MediaType} imgClassName="h-full w-full object-cover" />
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-16 space-y-16">
          {servicesData.map((category, catIndex) => (
            <div key={catIndex} className="relative overflow-hidden rounded-2xl border border-border bg-background/60 p-6">
              <div className="mb-8 flex items-start gap-4">
                <span className="relative text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="absolute left-0 top-0 flex h-full items-center">
                    <span className="-rotate-90 origin-left text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      {category.categoryLabel}
                    </span>
                  </span>
                </span>
                <div className="h-px flex-1 bg-primary/30" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.services?.map((service, index) => {
                  const slug = normalizeServiceSlug(service.link?.slug)
                  const href = slug ? `/${slug}` : undefined
                  const content = (
                    <div className={cn('group block space-y-4 rounded-xl border p-5 transition hover:-translate-y-1 hover:shadow-xl', service.featured ? 'bg-secondary' : 'bg-white')}>
                      <div className="flex items-start gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          {service.icon?.url ? (
                            <Image
                              src={service.icon.url}
                              alt={service.icon.alt ?? service.title}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                              {service.icon?.alt ?? 'Icon'}
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">{service.description}</p>
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Mehr erfahren <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  )

                  return href ? (
                    <Link key={index} href={href} className="block">
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
