import type { Metadata } from 'next'
import { ServicesGrid, dummyServices } from '@/components/ServicesGrid'

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Meine Leistungen im Überblick',
}

export default async function LeistungenPage() {
  return (
    <main>
      <section className="container py-20">
        <div className="prose prose-lg mx-auto text-center">
          <h1>Leistungen</h1>
          <p>Hier siehst du unsere Leistungsbereiche mit ausführlichen Beschreibungen.</p>
        </div>
      </section>
      <ServicesGrid data={dummyServices} />
    </main>
  )
}
