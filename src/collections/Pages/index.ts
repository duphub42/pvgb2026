import { hero } from './config' // Import aus config.ts

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    hero, // <-- Hero-Feld
    // ... restliche Felder
  ]
}
