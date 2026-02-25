'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

const CELL_SIZE = 120
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

type GridHeroProps = {
  headline?: string | null
  description?: string | null
} & Record<string, any>

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

export const GridHero: React.FC<GridHeroProps> = ({ headline, description }) => {
  const title =
    headline && headline.trim().length > 0
      ? headline
      : 'Build your next project with Smoothui'
  const desc =
    description && description.trim().length > 0
      ? description
      : 'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.'

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <InteractiveGrid />
      <motion.div
        variants={transitionVariants.container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.div variants={transitionVariants.item}>
          <h1 className="mb-6 text-pretty text-3xl font-bold tracking-tight lg:text-5xl">
            {title.split('Smoothui')[0] || title}{' '}
            {title.includes('Smoothui') && (
              <span className="text-primary">
                Smoothui
              </span>
            )}
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
            {desc}
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
            Get Started
          </Button>
          <Button className="group" variant="default">
            Learn more
            <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

