'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

export function AnimatedThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const resolved = mounted && theme ? theme : 'light'
  const isDark = resolved === 'dark'

  const toggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
  }, [isDark, setTheme])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggle}
          title="Toggle theme"
          aria-label="Toggle theme"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'icon' }),
            'header-tool-toggle header-tool-toggle--theme px-2.5 touch-manipulation',
            className,
          )}
        >
          <CosmicThemeSwitch isDark={isDark} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
      </TooltipContent>
    </Tooltip>
  )
}

const CosmicThemeSwitch = ({ isDark }: { isDark: boolean }) => {
  const transition = { type: 'spring' as const, stiffness: 380, damping: 28 }
  const mode = isDark ? 'dark' : 'light'
  return (
    <motion.div animate={mode} initial={mode}>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{
            light: { rotate: 0, scale: 1, strokeOpacity: 0.35 },
            dark: { rotate: 35, scale: 0.92, strokeOpacity: 0.08 },
          }}
          transition={transition}
        />

        <motion.g
          variants={{
            light: { opacity: 1, scale: 1, rotate: 0 },
            dark: { opacity: 0, scale: 0.35, rotate: -45 },
          }}
          transition={transition}
          style={{ transformOrigin: '12px 12px' }}
        >
          <motion.circle cx="12" cy="12" r="3.3" fill="currentColor" />
          <motion.path
            d="M12 2.2v2.1M12 19.7v2.1M2.2 12h2.1M19.7 12h2.1M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.path
          d="M17.4 13.5A6.5 6.5 0 1 1 10.5 6.6a5.1 5.1 0 0 0 6.9 6.9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            light: { opacity: 0, scale: 0.55, rotate: 40 },
            dark: { opacity: 1, scale: 1, rotate: 0 },
          }}
          transition={transition}
          style={{ transformOrigin: '12px 12px' }}
        />

        <motion.g
          variants={{
            light: { opacity: 0, scale: 0.6 },
            dark: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.18 }}
          style={{ transformOrigin: '12px 12px' }}
        >
          <circle cx="6.1" cy="7.4" r="1.1" fill="currentColor" />
          <circle cx="17.6" cy="6.2" r="0.95" fill="currentColor" />
          <circle cx="18.2" cy="16.9" r="0.9" fill="currentColor" />
        </motion.g>
      </motion.svg>
    </motion.div>
  )
}
