import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const RadialOrbitalTimeline: Block = {
  slug: 'radialOrbitalTimeline',
  dbName: 'radial_tl',
  interfaceName: 'RadialOrbitalTimelineBlock',
  labels: {
    singular: 'Radial Orbital Timeline',
    plural: 'Radial Orbital Timelines',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Überschrift',
      required: true,
      defaultValue: 'Projekt-Timeline',
    },
    {
      name: 'sectionText',
      type: 'textarea',
      label: 'Einleitung',
      defaultValue: 'Ein visuelles Protokoll der wichtigsten Projektphasen und Meilensteine.',
      admin: {
        description: 'Optionaler Einleitungstext für die Timeline.',
      },
    },
    {
      name: 'timelineItems',
      type: 'array',
      dbName: 'radial_tl_items',
      label: 'Timeline-Einträge',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'date',
          type: 'text',
          label: 'Datum',
          required: true,
          admin: {
            description: 'Z. B. Jan 2024, Q1 2025 oder April 2024.',
          },
        },
        {
          name: 'category',
          type: 'text',
          label: 'Kategorie',
          defaultValue: 'Phase',
        },
        {
          name: 'icon',
          dbName: 'i',
          type: 'select',
          label: 'Icon',
          defaultValue: 'Calendar',
          options: [
            { label: 'Calendar', value: 'Calendar' },
            { label: 'FileText', value: 'FileText' },
            { label: 'Code', value: 'Code' },
            { label: 'User', value: 'User' },
            { label: 'Clock', value: 'Clock' },
          ],
        },
        {
          name: 'status',
          dbName: 's',
          type: 'select',
          label: 'Status',
          defaultValue: 'pending',
          options: [
            { label: 'Abgeschlossen', value: 'completed' },
            { label: 'In Arbeit', value: 'in-progress' },
            { label: 'Ausstehend', value: 'pending' },
          ],
        },
        {
          name: 'energy',
          type: 'number',
          label: 'Energie (%)',
          required: true,
          defaultValue: 50,
          min: 0,
          max: 100,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Beschreibung',
          required: true,
        },
        {
          name: 'relatedIds',
          type: 'text',
          label: 'Verknüpfte IDs',
          admin: {
            description: 'Optional: IDs mit Kommas trennen, z. B. 1,2,3.',
          },
        },
      ],
    },
  ],
}
