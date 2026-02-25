/**
 * Liste der Block-Typen, die im Client (BlockRenderer) per Lazy-Load gerendert werden.
 * Server-Komponenten (z. B. RenderBlocks) importieren diese Datei; sie enthält kein
 * 'use client' und keine dynamischen Imports, damit Set/Array zuverlässig nutzbar sind.
 */
export const CLIENT_BLOCK_TYPES = new Set([
  'content',
  'serpContent',
  'lyraContent',
  'lyraFeature',
  'featuresGrid',
  'featureAdvantages',
  'feature1',
  'feature2',
  'serviceUxUi',
  'services4',
  'featuresScaling',
  'faqSimple',
  'pricing',
  'pricingCards',
  'featuresAiAccordion',
  'heroMarketing',
  'heroGrid',
  'scrollMorphHero',
  'contactSection1',
  'ctaSection3',
  'collabCur',
  'cta',
  'formBlock',
  'mediaBlock',
])
