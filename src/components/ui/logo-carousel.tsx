'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/utilities/ui'

/** Logo mit Bild-URL (Payload Media) – für Hero gleiche Quelle wie Marquee. */
export interface LogoCarouselLogo {
  id: number
  name: string
  imgUrl: string
  alt?: string
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: LogoCarouselLogo[], columnCount: number): LogoCarouselLogo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: LogoCarouselLogo[][] = Array.from({ length: columnCount }, () => [])

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

interface LogoColumnProps {
  logos: LogoCarouselLogo[]
  index: number
  currentTime: number
  className?: string
}

const LogoColumn = React.memo(({ logos, index, currentTime, className }: LogoColumnProps) => {
  const cycleInterval = 2000
  const columnDelay = index * 200
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)
  const currentLogo = logos[currentIndex]

  if (!currentLogo) return null

  return (
    <div className={cn('flex flex-col items-center justify-center py-2', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex h-full min-h-[5rem] w-[30%] min-w-[4rem] max-w-[7rem] items-center justify-center"
        >
          <img
            src={currentLogo.imgUrl}
            alt={currentLogo.alt ?? currentLogo.name}
            className="hero-logo-grayscale h-auto max-h-full w-full object-contain opacity-95"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
})
LogoColumn.displayName = 'LogoColumn'

interface LogoCarouselProps {
  logos: LogoCarouselLogo[]
  columnCount?: number
  className?: string
}

/**
 * Logo Carousel im Stil von [Cult UI](https://www.cult-ui.com/docs/components/logo-carousel):
 * Wechselnde Logos in Spalten mit gestaffelter Animation (motion).
 * Verwendet dieselben Logos wie die Marquee (Payload Media).
 */
export function LogoCarousel({ logos, columnCount = 3, className }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<LogoCarouselLogo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (logos.length === 0) return
    const distributed = distributeLogos(logos, columnCount)
    setLogoSets(distributed)
  }, [logos, columnCount])

  const updateTime = useCallback(() => {
    setCurrentTime((prev) => prev + 100)
  }, [])

  useEffect(() => {
    const id = setInterval(updateTime, 100)
    return () => clearInterval(id)
  }, [updateTime])

  if (logoSets.length === 0) return null

  return (
    <div
      className={cn('grid w-full gap-4', className)}
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          index={index}
          currentTime={currentTime}
          className="min-h-[6rem]"
        />
      ))}
    </div>
  )
}
