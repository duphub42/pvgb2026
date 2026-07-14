import type { Metadata } from 'next'

import { TerminBooking } from '@/app/(frontend)/termin/TerminBooking.client'
import { DEFAULT_CAL_LINK } from '@/utilities/webmcp/calEmbed'

export const metadata: Metadata = {
  title: 'Termin buchen',
  description:
    'Buchen Sie einen kostenlosen Kennenlerntermin mit Philipp Bacher – persönlich oder per Video-Call.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TerminPage() {
  return (
    <article className="container page-safe-top pb-16 pt-10 md:pt-14">
      <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Termin buchen
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          Wählen Sie einen passenden Zeitpunkt für ein unverbindliches Kennenlerngespräch. In 30
          Minuten klären wir Ihr Zielbild und den sinnvollsten nächsten Schritt.
        </p>
      </header>

      <div className="mx-auto w-full max-w-4xl">
        <TerminBooking calLink={DEFAULT_CAL_LINK} />
      </div>
    </article>
  )
}
