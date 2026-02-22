'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useId, useState } from 'react'

/** theme-toggles "Expand": Sonne expandiert zu Mond (toggles.dev/expand, npm theme-toggles) */
const EXPAND_RAYS_PATH =
  'M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z'

function ExpandToggleIcon({ cutoutId }: { cutoutId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
      className="theme-toggle__expand"
      viewBox="0 0 32 32"
    >
      <clipPath id={cutoutId}>
        <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
      </clipPath>
      <g clipPath={`url(#${cutoutId})`}>
        <circle cx="16" cy="16" r="8.4" />
        <path d={EXPAND_RAYS_PATH} />
      </g>
    </svg>
  )
}

export function ThemeSwitcher() {
  const cutoutId = useId().replace(/:/g, '-') + '-expand-cutout'
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && theme === 'dark'
  const resolved = mounted && theme ? theme : 'light'

  const toggle = useCallback(() => {
    const newTheme = resolved === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    /* View Transition deaktiviert: Snapshot würde vor fertig gezeichnetem Vanta-Halo/Gitter
       erstellt und überdeckt den echten Inhalt – Halo/Gitter verschwinden nach dem Wechsel. */
  }, [resolved, setTheme])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          title="Toggle theme"
          aria-label="Toggle theme"
          className={cn(
            'theme-toggle header-tool-toggle header-tool-toggle--theme flex shrink-0 items-center justify-center rounded-md p-0 border-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isDark && 'theme-toggle--toggled',
          )}
          onClick={toggle}
        >
          <ExpandToggleIcon cutoutId={cutoutId} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
      </TooltipContent>
    </Tooltip>
  )
}
