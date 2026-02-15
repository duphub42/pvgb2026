import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'useMegaMenu',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mega-Menü verwenden',
      admin: {
        description: 'Wenn aktiviert, wird das Mega-Menü (Collection „MegaMenu Items“) angezeigt statt der einfachen Nav-Links.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Wird im Header und Footer angezeigt. Leer = Standard-Payload-Logo.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
