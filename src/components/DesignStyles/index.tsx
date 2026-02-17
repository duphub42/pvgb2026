import React from 'react'

import type { DesignDoc } from '@/utilities/designToCss'
import { designToCss } from '@/utilities/designToCss'

export const DesignStyles: React.FC<{ design: DesignDoc }> = ({ design }) => {
  const css = designToCss(design)
  if (!css) return null
  return <style dangerouslySetInnerHTML={{ __html: css }} data-design-inline />
}
