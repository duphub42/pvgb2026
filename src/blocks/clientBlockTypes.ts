/**
 * Liste der Block-Typen, die im Client (BlockRenderer) per Lazy-Load gerendert werden.
 * Nur Standard-Blocks (Hero, Content, Media, Call To Action, Form). Archive wird in RenderBlocks gerendert.
 */
export const CLIENT_BLOCK_TYPES = new Set([
  'consultingOverview',
  'contactInfoCards',
  'brandShowcase',
  'content',
  'heroWithProcess',
  /** @deprecated Nur Frontend-Kompatibilität für alte Layout-Einträge; im Admin durch die 8 Profil-Blöcke ersetzen. */
  'profilBacher',
  'profilUeberMich',
  'profilKernkompetenz',
  'profilKompetenzen',
  'profilWerdegang',
  'profilZahlenFakten',
  'profilTools',
  'profilLangZert',
  'profilCtaBand',
  'cta',
  'formBlock',
  'introduction',
  'marqueeSlider',
  'mediaBlock',
  'servicesOverview',
  'servicesGrid',
  'portfolioCaseGrid',
  'portfolioKpiStrip',
  'pricingTable',
  'whyWorkWithMe',
  'radialOrbitalTimeline',
  'calPopup',
])
