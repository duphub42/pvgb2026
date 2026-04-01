'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'

import type { ServicesGridBlock as ServicesGridBlockData } from '@/payload-types'

type ServicesGridProps = ServicesGridBlockData & { disableInnerContainer?: boolean }

export const ServicesGridBlock: React.FC<ServicesGridProps> = ({ heading, intro, categories }) => {
  const servicesData = categories ?? []

  return (
    <section
      aria-label="Leistungen"
      className={cn('relative z-10 w-full min-w-0 overflow-visible', 'container', 'py-16')}
    >
      <div className="mx-auto max-w-4xl text-center mb-12">
        {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
        {intro && <p className="mt-4 text-base text-muted-foreground">{intro}</p>}
      </div>

      <div className="space-y-16">
        {servicesData.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                {category.categoryLabel}
              </span>
              <div className="h-[1px] w-12 bg-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {category.services?.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    'group block space-y-4 rounded-xl transition-transform hover:-translate-y-1 hover:shadow-xl p-4',
                    service.featured ? 'bg-secondary lg:col-span-1' : '',
                  )}
                >
                  <Link href={`/${service.link?.slug ?? ''}`} className="flex items-start gap-5">
                    <div className="relative w-12 h-12 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                      {service.icon?.url ? (
                        <Image
                          src={service.icon.url}
                          alt={service.icon.alt ?? service.title}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                          {service.icon?.alt ?? 'Icon'}
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm line-clamp-5">
                        {service.description}
                      </p>
                      <div className="flex items-center text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                        Mehr erfahren <ChevronRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
