export const messages = {
  de: {
    nav: {
      search: 'Suche',
      privacy: 'Datenschutz',
      terms: 'Impressum',
    },
    footer: {
      privacy: 'Datenschutz',
      terms: 'Impressum',
    },
    locale: {
      de: 'DE',
      en: 'EN',
      switchTo: 'Sprache wechseln',
    },
  },
  en: {
    nav: {
      search: 'Search',
      privacy: 'Privacy',
      terms: 'Legal',
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Legal',
    },
    locale: {
      de: 'DE',
      en: 'EN',
      switchTo: 'Switch language',
    },
  },
} as const

export type Messages = (typeof messages)['de']
