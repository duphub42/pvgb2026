'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const CELL_SIZE = 120 // px
const COLORS = ['oklch(0.72 0.2 352.53)', '#A764FF', '#4B94FD', '#FD4B4E', '#FF8743']

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function SubGrid() {
  const [cellColors, setCellColors] = useState<(string | null)[]>([null, null, null, null])
  const leaveTimeouts = useRef<(ReturnType<typeof setTimeout> | null)[]>([null, null, null, null])

  function handleHover(cellIdx: number) {
    const timeout = leaveTimeouts.current[cellIdx]
    if (timeout) {
      clearTimeout(timeout)
      leaveTimeouts.current[cellIdx] = null
    }
    setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? getRandomColor() : c)))
  }

  function handleLeave(cellIdx: number) {
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? null : c)))
      leaveTimeouts.current[cellIdx] = null
    }, 120)
  }

  useEffect(
    () => () => {
      for (const t of leaveTimeouts.current) {
        if (t) clearTimeout(t)
      }
    },
    [],
  )

  return (
    <div
      className="grid grid-cols-2 grid-rows-2"
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
    >
      {[0, 1, 2, 3].map((idx) => (
        <button
          key={idx}
          type="button"
          onMouseEnter={() => handleHover(idx)}
          onMouseLeave={() => handleLeave(idx)}
          style={{ background: cellColors[idx] || 'transparent' }}
          className="h-full w-full border border-border/10 transition-colors duration-150"
        />
      ))}
    </div>
  )
}

function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [grid, setGrid] = useState({ columns: 0, rows: 0 })

  useEffect(() => {
    function updateGrid() {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setGrid({
        columns: Math.max(1, Math.ceil(width / CELL_SIZE)),
        rows: Math.max(1, Math.ceil(height / CELL_SIZE)),
      })
    }

    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  const total = grid.columns * grid.rows

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${grid.rows}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: total }, (_, idx) => (
          <div key={idx} className="pointer-events-auto">
            <SubGrid />
          </div>
        ))}
      </div>
    </div>
  )
}

// Konkreter Typ kommt nach payload generate:types (HeroGridBlock)
type HeroGridBlockProps = any

const transitionVariants = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.4,
      },
    },
  },
}

export const HeroGridBlock: React.FC<HeroGridBlockProps> = (props) => {
  const {
    disableInnerContainer,
    title,
    highlight,
    subtitle,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaUrl,
  } = props ?? {}

  const resolvedHighlight =
    highlight && String(highlight).trim().length > 0 ? String(highlight).trim() : 'Smoothui'

  const defaultTitle = `Build your next project with ${resolvedHighlight}`
  const resolvedTitle =
    title && String(title).trim().length > 0 ? String(title).trim() : defaultTitle

  const resolvedSubtitle =
    subtitle && String(subtitle).trim().length > 0
      ? String(subtitle).trim()
      : 'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.'

  const resolvedPrimaryLabel =
    primaryCtaLabel && String(primaryCtaLabel).trim().length > 0
      ? String(primaryCtaLabel).trim()
      : 'Get Started'

  const resolvedPrimaryUrl =
    primaryCtaUrl && String(primaryCtaUrl).trim().length > 0
      ? String(primaryCtaUrl).trim()
      : '#get-started'

  const resolvedSecondaryLabel =
    secondaryCtaLabel && String(secondaryCtaLabel).trim().length > 0
      ? String(secondaryCtaLabel).trim()
      : 'Learn more'

  const resolvedSecondaryUrl =
    secondaryCtaUrl && String(secondaryCtaUrl).trim().length > 0
      ? String(secondaryCtaUrl).trim()
      : '#learn-more'

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <InteractiveGrid />
      <motion.div
        variants={transitionVariants.container}
        initial="hidden"
        animate="visible"
        className={cn(
          'relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center',
          disableInnerContainer && 'px-0',
        )}
      >
        <motion.div variants={transitionVariants.item}>
          <h1 className="mb-6 text-pretty text-3xl font-bold tracking-tight lg:text-5xl">
            {resolvedTitle.includes(resolvedHighlight) ? (
              <>
                {resolvedTitle.split(resolvedHighlight)[0]}
                <span className="text-primary">{resolvedHighlight}</span>
                {resolvedTitle.split(resolvedHighlight)[1]}
              </>
            ) : (
              resolvedTitle
            )}
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
            {resolvedSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={transitionVariants.item}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <Button
            className="shadow-sm transition-shadow hover:shadow"
            variant="outline"
          >
            {resolvedPrimaryLabel}
          </Button>
          <Button className="group" variant="default" asChild>
            <a href={resolvedSecondaryUrl}>
              {resolvedSecondaryLabel}
              <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

