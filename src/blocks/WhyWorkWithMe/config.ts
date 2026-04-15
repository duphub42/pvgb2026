import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultIntroIconList = [
  {
    icon: 'brain' as const,
    text: 'Ich denke unternehmerisch, nicht in einzelnen Leistungen.',
  },
  {
    icon: 'target' as const,
    text: 'Ich arbeite nicht für Klicks, sondern für echte Ergebnisse.',
  },
  {
    icon: 'search' as const,
    text: 'Ich hinterfrage alles — auch bestehende Strategien.',
  },
  {
    icon: 'zap' as const,
    text: 'Ich erkenne schnell, was wirklich funktioniert und was nur Zeit kostet.',
  },
  {
    icon: 'handshake' as const,
    text: 'Ich übernehme Verantwortung für Resultate, nicht nur für Umsetzung.',
  },
  {
    icon: 'trending-up' as const,
    text: 'Ich baue Systeme, die wachsen, statt ständig neu gestartet zu werden.',
  },
]

const defaultReasons = [
  {
    icon: 'user',
    title: 'Persönlicher Ansprechpartner',
    description:
      'Kein Agentur-Wasserkopf, kein Wischi-Waschi — direkte, fundierte Beratung und Umsetzung.',
  },
  {
    icon: 'zap',
    title: 'Lean & effizient',
    description: 'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.',
  },
  {
    icon: 'trending-up',
    title: 'Performance & Resultate',
    description: 'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
  },
  {
    icon: 'globe',
    title: 'Cross-Channel & international',
    description:
      'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.',
  },
]

export const WhyWorkWithMe: Block = {
  slug: 'whyWorkWithMe',
  interfaceName: 'WhyWorkWithMeBlock',
  labels: {
    singular: 'Warum mit mir',
    plural: 'Warum mit mir',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Warum mit mir',
      admin: {
        description:
          'Hauptüberschrift über dem Kartenraster (optional leer lassen zum Ausblenden).',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
      admin: {
        description: 'Optionaler Text unter der Überschrift.',
      },
    },
    {
      name: 'introIconList',
      type: 'array',
      label: 'Icon-Liste (unter Einleitung)',
      minRows: 0,
      maxRows: 12,
      defaultValue: defaultIntroIconList,
      admin: {
        description:
          'Kompakte Punkte mit Icon direkt unter dem Einleitungstext (linke Spalte). Leer lassen zum Ausblenden.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'brain',
          options: [
            { label: 'Gehirn', value: 'brain' },
            { label: 'Glühbirne', value: 'lightbulb' },
            { label: 'Ziel / Fokus', value: 'target' },
            { label: 'Suche / Analyse', value: 'search' },
            { label: 'Blitz', value: 'zap' },
            { label: 'Handschlag', value: 'handshake' },
            { label: 'User-Check', value: 'user-check' },
            { label: 'Trend steigend', value: 'trending-up' },
            { label: 'Person', value: 'user' },
            { label: 'Globus', value: 'globe' },
            { label: 'Aktentasche', value: 'briefcase' },
            { label: 'Herz', value: 'heart' },
            { label: 'Schild', value: 'shield' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Text',
          admin: {
            description: 'Ein Satz pro Zeile — wird als Listenpunkt mit Icon angezeigt.',
          },
        },
      ],
    },
    {
      name: 'reasons',
      type: 'array',
      label: 'Gründe / Karten',
      minRows: 1,
      maxRows: 8,
      defaultValue: defaultReasons,
      admin: {
        description:
          'Karten mit Icon, Titel und Text — Breite passt sich der Anzahl und dem Viewport an.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'user',
          options: [
            { label: 'Person', value: 'user' },
            { label: 'Blitz', value: 'zap' },
            { label: 'Trend', value: 'trending-up' },
            { label: 'Globus', value: 'globe' },
            { label: 'Ziel', value: 'target' },
            { label: 'Aktentasche', value: 'briefcase' },
            { label: 'Herz', value: 'heart' },
            { label: 'Schild', value: 'shield' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Beschreibung',
        },
      ],
    },
  ],
}
