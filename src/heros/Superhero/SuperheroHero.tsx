'use client'

import React from 'react'
import { StylePreviewHero } from '@/heros/StylePreview/StylePreviewHero'

/**
 * CMS-Typ `superhero`: Popout-Portrait-Layout (delegiert an StylePreviewHero).
 * Eigener Typ vermeidet Verwechslung mit „Philipp Bacher“ / „Style Preview“ / PhilippBacherHeroSimple.
 */
export const SuperheroHero: React.FC<React.ComponentProps<typeof StylePreviewHero>> = (props) => {
  return (
    <StylePreviewHero
      {...props}
      sectionAriaLabel="Superhero"
      dataHeroType="superhero"
    />
  )
}
