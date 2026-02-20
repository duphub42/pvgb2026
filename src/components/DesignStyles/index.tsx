import React from 'react'

import type { DesignDoc } from '@/utilities/designToCss'
import { designToCss } from '@/utilities/designToCss'

/** Fallback wenn Design-Global leer ist – verhindert transparente Header/Dropdowns/Tooltips */
const DESIGN_FALLBACK_CSS = `/* Design-Fallback (keine Farben im Admin gesetzt) */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --popover: #ffffff;
  --popover-foreground: #171717;
  --card: #f5f5f5;
  --card-foreground: #171717;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
}
[data-theme='dark'] {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --popover: #0d0d0d;
  --popover-foreground: #fafafa;
  --card: #171717;
  --card-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --border: #262626;
}`

export const DesignStyles: React.FC<{ design: DesignDoc }> = ({ design }) => {
  const css = designToCss(design)
  const finalCss = css ? css : DESIGN_FALLBACK_CSS
  return <style dangerouslySetInnerHTML={{ __html: finalCss }} data-design-inline />
}
