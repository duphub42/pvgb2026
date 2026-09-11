import { redirect } from 'next/navigation'

export const dynamic = 'force-static'

export default function LegacyObsthofWebsitesPage() {
  redirect('/leistungen/webdesign/websites-fuer-obsthoefe')
}
