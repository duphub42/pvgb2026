'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const resolved = mounted && theme ? theme : 'light'
  const toggle = () => setTheme(resolved === 'light' ? 'dark' : 'light')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="header-tool-toggle size-[2.75rem]"
          onClick={toggle}
          aria-label={resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
        >
          {resolved === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
      </TooltipContent>
    </Tooltip>
  )
}
