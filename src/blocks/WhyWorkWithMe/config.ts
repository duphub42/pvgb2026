import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultIntroIconList = [
  {
    icon: 'brain' as const,
    text: 'Unternehmerisch statt in Einzelleistungen gedacht: Bei Trinkwasser-Verband.de wurden Website, Lead-Erfassung und Follow-up als ein System geplant.',
  },
  {
    icon: 'zap' as const,
    text: 'Jedes Projekt startet mit einer Ist-Analyse bestehender Kanäle — bei MEDIFISCH.de führte das zur Einstellung von Meta-Werbung ohne messbare Leads.',
  },
  {
    icon: 'search' as const,
    text: 'Bestehende Strategien werden geprüft, bevor neue aufgesetzt werden: Ein Relaunch startet mit einer Analyse der SEO-Rankings und Nutzerpfade – nicht bei null.',
  },
  {
    icon: 'target' as const,
    text: 'Erfolg wird an Anfragen und Abschlüssen gemessen, nicht an Klickzahlen: Monatliches Reporting zeigt die Kennzahlen, die zu echtem Kundenkontakt führen (Formular-Absendungen, Anrufe).',
  },
  {
    icon: 'trending-up' as const,
    text: 'Websites entstehen auf skalierbarer Basis (Next.js, Payload CMS) — neue Seiten, Funktionen oder ein Shop lassen sich später ergänzen. Beispiel: Soulmating.de.',
  },
  {
    icon: 'handshake' as const,
    text: 'Ein Ansprechpartner, keine Weiterleitungsschleifen: Anfragen werden direkt beantwortet, das kostenlose Erstgespräch klärt Umfang und Budget meist in einem Termin.',
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
            description:
              'Format: "Kurzes Argument: Kurzer Beleg." oder "Kurzes Argument — Kurzer Beleg." Der Teil vor dem ersten ": " bzw. " — " wird fett hervorgehoben, der Rest gedämpft dargestellt.',
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
