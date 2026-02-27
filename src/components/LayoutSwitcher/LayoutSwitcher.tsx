'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLayout, type LayoutMode } from '@/providers/Layout'
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
          className="header-tool-toggle header-tool-toggle--theme shrink-0"
          onClick={toggle}
          aria-label={isWide ? 'Standard-Breite' : 'Breite Ansicht'}
          aria-pressed={isWide}
        >
          <svg className="size-5" aria-hidden="true">
            <use href={isWide ? '/icons-sprite.svg#hf-panel-right-open' : '/icons-sprite.svg#hf-layout-grid'} />
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {isWide ? 'Standard-Breite' : 'Breite Ansicht'}
      </TooltipContent>
    </Tooltip>
  )
}
