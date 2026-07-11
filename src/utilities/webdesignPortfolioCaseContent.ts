/** Webdesign-Inhalte für Duplikat-Cases (gleicher Titel, Disziplin webdesign). */
export const WEBDESIGN_PORTFOLIO_CASE_TITLES = [
  'Trinkwasser Verband',
  'Initiative Saubere Luft',
  'Soulmating',
] as const

export type WebdesignPortfolioCaseTitle = (typeof WEBDESIGN_PORTFOLIO_CASE_TITLES)[number]

export type WebdesignPortfolioCaseSeed = {
  discipline: 'webdesign'
  client: string
  industry: string
  summary: string
  year: number
  categories: Array<'relaunch' | 'komplettDesign' | 'seo' | 'uxUi' | 'performance'>
  challenge: string
  approach: string
  result: string
  website: { label: string; href: string }
  coverImageId: number
  featured?: boolean
}

export const WEBDESIGN_PORTFOLIO_CASES: Record<
  WebdesignPortfolioCaseTitle,
  WebdesignPortfolioCaseSeed
> = {
  'Trinkwasser Verband': {
    discipline: 'webdesign',
    client: 'Trinkwasser Verband',
    industry: 'Verbraucherinformation',
    summary:
      'Informationsplattform zur Verbraucheraufklärung über Trinkwasserqualität, Analyseverfahren und bundesweite kostenlose Leitungswasser-Tests.',
    year: 2022,
    categories: ['komplettDesign', 'seo'],
    challenge:
      'Komplexe Themen rund um Trinkwasserqualität, Analyseverfahren und Gesundheitsaspekte verständlich aufbereiten und Verbraucher transparent informieren.',
    approach:
      'Entwicklung einer klar strukturierten Informationsplattform mit Fokus auf verständliche Produktaufklärung, einfache Nutzerführung und vertrauensvolle Verbraucherkommunikation.',
    result:
      'Ein moderner Webauftritt, der Verbraucherinformationen, Produktaufklärung und bundesweite kostenlose Leitungswasser-Tests in einer zugänglichen Plattform vereint.',
    website: { label: 'trinkwasser-verband.de', href: 'https://trinkwasser-verband.de' },
    coverImageId: 1348,
  },
  'Initiative Saubere Luft': {
    discipline: 'webdesign',
    client: 'Luft Verband',
    industry: 'Verbraucherinformation',
    summary:
      'Informationsplattform zur Aufklärung über Luftqualität, Umweltbelastung und gesundheitliche Auswirkungen im Rahmen der Initiative Saubere Luft.',
    year: 2022,
    categories: ['komplettDesign', 'seo'],
    challenge:
      'Eine komplexe Thematik rund um Luftqualität, Umweltbelastung und gesundheitliche Auswirkungen verständlich aufbereiten und öffentlich zugänglich kommunizieren.',
    approach:
      'Entwicklung eines klar strukturierten Informationsauftritts mit Fokus auf Aufklärung, Datenvermittlung und intuitiver Nutzerführung für unterschiedliche Zielgruppen.',
    result:
      'Ein digitaler Auftritt zur Sensibilisierung für Luftqualität und Umweltgesundheit mit klarer Informationsarchitektur und starker Aufklärungswirkung.',
    website: {
      label: 'initiative-saubere-luft.de',
      href: 'https://initiative-saubere-luft.de',
    },
    coverImageId: 1345,
  },
  Soulmating: {
    discipline: 'webdesign',
    client: 'Soulmating',
    industry: 'Kommunikationstraining',
    summary:
      'Digitale Plattform für Buchung und Bewerbung zu non-verbalen Speed-Dating-Kommunikationstrainings mit intuitiver Nutzerführung und klarer Kommunikation des Angebots.',
    year: 2019,
    categories: ['relaunch', 'uxUi'],
    challenge:
      'Die digitale Buchung und Bewerbung für non-verbale Speed-Dating-Kommunikationstrainings einfach, klar und vertrauensvoll gestalten.',
    approach:
      'Entwicklung eines strukturierten Webauftritts mit Fokus auf intuitive Buchungs- und Bewerbungsprozesse sowie verständlicher Darstellung des Trainingsformats.',
    result:
      'Eine Plattform zur einfachen Teilnahme an non-verbalen Speed-Dating-Kommunikationstrainings mit optimierter Nutzerführung und klarer Informationsstruktur.',
    website: { label: 'soulmating.de', href: 'https://soulmating.de' },
    coverImageId: 1347,
  },
}

export function isWebdesignPortfolioCaseTitle(title: unknown): title is WebdesignPortfolioCaseTitle {
  return (
    typeof title === 'string' &&
    (WEBDESIGN_PORTFOLIO_CASE_TITLES as readonly string[]).includes(title)
  )
}

/** Website-/Leistungs-Slider: Webdesign, Branding und Mixed – ohne Marketing-Duplikate. */
export const GENERAL_PORTFOLIO_DISCIPLINES = new Set(['webdesign', 'branding', 'mixed'])

export function getGeneralCaseBlockOptions() {
  return { disciplineFilter: GENERAL_PORTFOLIO_DISCIPLINES }
}
