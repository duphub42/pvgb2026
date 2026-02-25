import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const CollaborationCursors: Block = {
  slug: 'collabCur',
  interfaceName: 'CollaborationCursorsBlock',
  // Kürzerer Tabellenname, damit Enum-/Tabellennamen unter 63 Zeichen bleiben
  dbName: 'collab_cur',
  labels: {
    singular: 'Collaboration Cursors',
    plural: 'Collaboration Cursors',
  },
  fields: [...blockStyleFields],
}

