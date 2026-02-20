'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLayout, type LayoutMode } from '@/providers/Layout'
import { LayoutGrid, PanelRightOpen } from 'lucide-react'
import React from 'react'

export function LayoutSwitcher() {
  const { layout, setLayout } = useLayout()
  const isWide = layout === 'wide'

  const toggle = () => setLayout(isWide ? 'default' : 'wide')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="header-tool-toggle size-[2.75rem]"
          onClick={toggle}
          aria-label={isWide ? 'Standard-Breite' : 'Breite Ansicht'}
          aria-pressed={isWide}
        >
          {isWide ? <PanelRightOpen className="size-5" /> : <LayoutGrid className="size-5" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {isWide ? 'Standard-Breite' : 'Breite Ansicht'}
      </TooltipContent>
    </Tooltip>
  )
}
