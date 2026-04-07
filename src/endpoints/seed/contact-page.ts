import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'site-pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'contactInfoCards',
        cards: [
          {
            icon: 'map-pin',
            title: 'Adresse',
            lines: 'Philipp Bacher\nMünchen & Remote',
          },
          {
            icon: 'phone',
            title: 'Kontaktdaten',
            lines: 'Telefon: +49 3459 6393323\nE-Mail: mail@philippbacher.com',
          },
          {
            icon: 'clock-3',
            title: 'Office Hours',
            lines: 'Mo-Fr: 09:00-18:00 Uhr\nSowie nach Terminvereinbarung',
          },
        ],
        ctaLabel: 'Termin anfragen',
        ctaHref: '#kontaktformular',
      },
      {
        blockType: 'formBlock',
        enableIntro: true,
        form: contactForm,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Kontaktformular',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ],
    title: 'Kontakt',
  }
}
