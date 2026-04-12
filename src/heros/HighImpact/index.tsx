'use client'
import { motion, useReducedMotion } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useMemo } from 'react'

import type { SitePage } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HighImpactHeroData = {
  links?: SitePage['hero'] extends infer H ? (H extends { links?: infer L } ? L : never) : never
  media?: SitePage['hero'] extends infer H ? (H extends { media?: infer M } ? M : never) : never
  richText?: SitePage['hero'] extends infer H
    ? H extends { richText?: infer R }
      ? R
      : never
    : never
  subheadline?: string | null
  headline?: string | null
  description?: string | null
  marqueeHeadline?: string | null
  marqueeLogos?: SitePage['hero'] extends infer H
    ? H extends { marqueeLogos?: infer M }
      ? M
      : never
    : never
}

export const HighImpactHero: React.FC<HighImpactHeroData> = ({
  links,
  media,
  richText,
  subheadline,
  headline,
  description,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const prefersReducedMotion = useReducedMotion()
  const headlineWords = useMemo(
    () => (headline ? headline.split(/\s+/).filter(Boolean) : []),
    [headline],
  )
  const hasHeadings = Boolean(subheadline || headline || description)

  const headlineDelay = 0.35
  const subheadlineDelay = headlineDelay + headlineWords.length * 0.05 + 0.2
  const ctaDelay = subheadlineDelay + 0.15

  const heroHeadlineVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : headlineDelay,
      },
    },
  }

  const heroWordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 110, damping: 18 } as Transition,
    },
  }

  const contentFadeTransition = (delay: number): Transition => ({
    duration: 0.9,
    delay: prefersReducedMotion ? 0 : delay,
    ease: 'easeOut',
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex min-h-[80vh] items-center justify-center bg-neutral-900 text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Media fill imgClassName="object-cover brightness-[0.88]" priority resource={media} />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(0,0,0,0.45),_rgba(0,0,0,0.15))]" />
        <div
          className="absolute inset-0 hero-premium-overlay pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 mb-8 flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {hasHeadings && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : 'hidden'}
              animate="visible"
              variants={heroHeadlineVariants}
              className="mb-6"
            >
              {subheadline && (
                <motion.p
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={contentFadeTransition(subheadlineDelay)}
                  className="mb-2 text-lg hero-subheading-contrast--inverse"
                >
                  {subheadline}
                </motion.p>
              )}
              {headline && (
                <motion.h1
                  className="text-hero-display hero-heading-gradient hero-heading-gradient--inverse mb-4 hero-headline"
                  variants={heroHeadlineVariants}
                >
                  {headlineWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={heroWordVariants}
                      className="inline-block mr-2 last:mr-0"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              )}
              {description && (
                <motion.p
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={contentFadeTransition(subheadlineDelay + 0.15)}
                  className="text-base hero-content-contrast--inverse"
                >
                  {description}
                </motion.p>
              )}
            </motion.div>
          )}
          {richText && (
            <div className="prose prose-invert mb-6 prose-p:opacity-90">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <motion.ul
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={contentFadeTransition(ctaDelay)}
              className="flex md:justify-center gap-4"
            >
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  )
}
