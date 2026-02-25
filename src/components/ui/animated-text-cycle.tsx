'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = '',
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState<string | number>('auto')
  const measureRef = useRef<HTMLDivElement | null>(null)

  // Breite des aktuellen Wortes messen
  useEffect(() => {
    if (!measureRef.current) return
    const elements = measureRef.current.children
    if (elements.length > currentIndex) {
      const el = elements[currentIndex] as HTMLElement
      const newWidth = el.getBoundingClientRect().width
      setWidth(newWidth + 10) // kleiner Puffer, um Umbrechen zu vermeiden
    }
  }, [currentIndex])

  // Index zyklisch weiterschalten
  useEffect(() => {
    if (!words.length) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, words.length])

  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      filter: 'blur(8px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  } as const

  return (
    <>
      {/* Unsichtbarer Mess-Container */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{ visibility: 'hidden' }}
      >
        {words.map((word, i) => (
          <span key={i} className={className}>
            {word}
          </span>
        ))}
      </div>

      {/* Sichtbares animiertes Wort */}
      <motion.span
        className="relative inline-block align-baseline"
        animate={{
          width,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 1.2,
        }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ display: 'inline-block' }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}

