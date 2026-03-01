/**
 * Liste der Block-Typen, die im Client (BlockRenderer) per Lazy-Load gerendert werden.
 * Nur Standard-Blocks (Hero, Content, Media, Call To Action, Form). Archive wird in RenderBlocks gerendert.
 */
export const CLIENT_BLOCK_TYPES = new Set([
  'content',
  'cta',
  'formBlock',
  'heroMarketing',
  'mediaBlock',
])
