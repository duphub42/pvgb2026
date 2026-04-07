'use client'

import React from 'react'
import {
  BriefcaseBusiness,
  ChevronRight,
  CreditCard,
  Headphones,
  LockKeyhole,
  type LucideIcon,
} from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FaqEntry {
  question: string
  answer: string
}

interface FaqCategory {
  value: string
  label: string
  icon: LucideIcon
  faqs: FaqEntry[]
}

const faqCategories: FaqCategory[] = [
  {
    value: 'allgemein',
    label: 'Allgemeine Fragen',
    icon: BriefcaseBusiness,
    faqs: [
      {
        question: 'Für wen ist die Zusammenarbeit geeignet?',
        answer:
          'Für Selbstständige, Gründer, Agenturen und KMU, die ihre Website, ihr Branding und ihr digitales Marketing wirkungsvoll verbinden wollen. Besonders effektiv ist meine Arbeit bei Unternehmen, die Sichtbarkeit, Conversion und professionelle Positionierung gleichzeitig verbessern möchten. Ich helfe dir dabei, aus deinen digitalen Auftritten ein zusammenhängendes Erlebnis zu machen, das mehr Kunden gewinnt und Vertrauen schafft.',
      },
      {
        question: 'Wann kann dein Projekt starten?',
        answer:
          'Ein erster Kickoff ist in der Regel binnen weniger Werktage möglich. Nach einem kurzen Strategiegespräch lege ich Ziele, Prioritäten und einen realistischen Projektstart fest, damit dein Website-Projekt nicht unnötig lange wartet. So kannst du schnell mit einer klaren Richtung starten und die ersten Ergebnisse zeitnah sehen.',
      },
      {
        question: 'Arbeitest du auch mit internen Teams zusammen?',
        answer:
          'Ja, ich arbeite eng mit internen Marketing-, Sales- und IT-Teams zusammen. So stelle ich reibungslose Abstimmung, klare Verantwortlichkeiten und eine Umsetzung sicher, die zur bestehenden Organisation passt. Dieser collaborative Ansatz hilft, interne Ressourcen bestmöglich zu nutzen und bleibt trotzdem effizient und fokussiert.',
      },
      {
        question: 'Kann ich mit einem kleinen Projekt beginnen?',
        answer:
          'Auf jeden Fall. Viele Kunden starten mit einer Landingpage, einem Website-Relaunch oder einer Conversion-Optimierung. Das schafft schnell sichtbare Erfolge und legt eine belastbare Basis für größere Digital-Projekte, ohne dass du dich sofort auf hohe Investitionen festlegen musst.',
      },
      {
        question: 'Was unterscheidet meinen Ansatz von Standard-Agenturpaketen?',
        answer:
          'Mein Fokus liegt auf wirksamer Digitalisierung statt auf Schema-F. Ich kombiniere Strategie, Design und technische Umsetzung, damit deine Website nicht nur gut aussieht, sondern langfristig mehr Leads und Umsatz bringt. Dabei geht es mir darum, konkrete Geschäftsergebnisse zu erzielen und nicht nur hübsche Oberflächen zu liefern.',
      },
    ],
  },
  {
    value: 'leistungen',
    label: 'Leistungen & Prozess',
    icon: LockKeyhole,
    faqs: [
      {
        question: 'Welche Leistungen kann ich kombinieren?',
        answer:
          'Design, SEO, Content, Conversion-Optimierung, Branding und Automatisierung lassen sich modular zusammenstellen. Ich empfehle eine Kombination aus Website-Performance und Sichtbarkeit, die deinen konkreten Geschäftszielen am besten entspricht. So entsteht ein stimmiges digitales Ökosystem, das sowohl Kundenansprache als auch technische Effizienz berücksichtigt.',
      },
      {
        question: 'Wie läuft ein typisches Projekt ab?',
        answer:
          'Ich starte mit Analyse und Zieldefinition, baue dann eine klare Roadmap mit Meilensteinen und Feedback-Schleifen. In der Umsetzungsphase arbeite ich agil, teste früh und sorge dafür, dass der Launch termingerecht und planbar bleibt. So kannst du Ruhe behalten, weil der Prozess strukturiert ist und du jederzeit einschätzen kannst, was als nächstes kommt.',
      },
      {
        question: 'Nutze ich bestehende Systeme wie WordPress, Webflow oder Shopify?',
        answer:
          'Ja, bestehende Systeme werden geprüft und sinnvoll weiterentwickelt. Ob Webflow, Shopify oder individuelle Next.js-Lösungen: Ich sorge dafür, dass Technologie und Marketing zusammenpassen und nichts unnötig neu aufgebaut wird. Das spart Zeit, Kosten und schützt die Investitionen, die du bereits in dein digitales Setup gesteckt hast.',
      },
      {
        question: 'Wer übernimmt Texte, Creatives und technische Umsetzung?',
        answer:
          'Je nach Projekt liefere ich Text, Visuals und Technik komplett aus einer Hand oder arbeite mit internen Ressourcen zusammen. Ziel ist immer ein klarer Scope und ein Prozess, der dich entlastet und Tempo schafft. So erhältst du hochwertige Ergebnisse ohne unnötige Reibungsverluste.',
      },
      {
        question: 'Wie wird sichergestellt, dass das Projekt im Zeitplan bleibt?',
        answer:
          'Jede Phase hat klare Deliverables, Deadlines und Prioritäten. Durch regelmäßige Status-Updates und transparente Kommunikation bleibt der Prozess kontrolliert, auch wenn sich Anforderungen ändern. Auf diese Weise schaffe ich Planungssicherheit und vermeide unnötige Verzögerungen.',
      },
    ],
  },
  {
    value: 'preise',
    label: 'Preise & Abrechnung',
    icon: CreditCard,
    faqs: [
      {
        question: 'Wie setzt sich der Preis zusammen?',
        answer:
          'Der Preis richtet sich nach Umfang, technischer Komplexität und dem Timing. Ich stelle ein klares Angebot mit transparenten Leistungen zusammen, damit du schon vor Projektstart weißt, wo dein Budget investiert wird. So kannst du früh entscheiden, welche Prioritäten für dich am wichtigsten sind und welche Investitionen den besten Return liefern.',
      },
      {
        question: 'Gibt es feste Pakete oder individuelle Angebote?',
        answer:
          'Ich biete sowohl standardisierte Einstiegspakete als auch individuelle Angebote für anspruchsvolle Digitalprojekte. Im Anschluss wähle ich gemeinsam mit dir die Lösung, die wirtschaftlich sinnvoll ist und deine Wachstumsziele unterstützt. Das bedeutet, dass ich dir keine unnötigen Leistungen verkaufe, sondern einen Plan basierend auf deinem Bedarf entwickle.',
      },
      {
        question: 'Wie funktionieren Laufzeiten und Kündigungsfristen?',
        answer:
          'Projektbasierte Leistungen enden mit dem vereinbarten Abschluss. Bei fortlaufender Betreuung gibt es flexible Laufzeiten und transparente Kündigungsfristen, die vorab genau definiert werden. Damit du jederzeit die Kontrolle über den Umfang und die Investition behältst, halte ich alle Bedingungen einfach und verständlich.',
      },
      {
        question: 'Welche externen Kosten können zusätzlich anfallen?',
        answer:
          'Typische Zusatzkosten sind Hosting, Domain, Tools oder Media-Budgets. Diese Kosten werden separat ausgewiesen, damit deine Abrechnung klar und ohne Überraschungen bleibt. Ich achte darauf, dass solche Posten nur dann entstehen, wenn sie wirklich einen Mehrwert für dein Projekt bringen.',
      },
      {
        question: 'Wann wird abgerechnet?',
        answer:
          'Je nach Projekt rechne ich über Anzahlung und Meilensteine oder monatliche Zyklen ab. Die Zahlungsmodalitäten werden vor dem Start transparent im Angebot festgelegt. So hast du volle Kostenkontrolle und kannst dich auf die Umsetzung konzentrieren, ohne versteckte Gebühren befürchten zu müssen.',
      },
    ],
  },
  {
    value: 'support',
    label: 'Support & Betrieb',
    icon: Headphones,
    faqs: [
      {
        question: 'Bietest du auch Betreuung nach dem Launch an?',
        answer:
          'Ja, nach dem Livegang begleite ich dich bei Wartung, Performance-Optimierung und Weiterentwicklung. So bleibt deine Website nicht stehen, sondern wächst mit neuen Anforderungen. Ich helfe dir dabei, das Projekt auch nach dem Start nachhaltig zu stabilisieren und weiterzuentwickeln.',
      },
      {
        question: 'Wie schnell reagiert der Support?',
        answer:
          'Support-Anfragen werden nach Dringlichkeit priorisiert. Kritische Themen erhalten schnelle Reaktionszeiten, während Routine-Anfragen strukturiert über den vereinbarten Kanal bearbeitet werden. Dadurch erhältst du schnelle Hilfe bei echten Problemen und transparente Begleitung bei allen weiteren Anliegen.',
      },
      {
        question: 'Erhalte ich Zugriff auf Reports und Kennzahlen?',
        answer:
          'Ja, du bekommst transparente Auswertungen zu Traffic, Rankings, Conversion und Performance. So lassen sich Maßnahmen datenbasiert überprüfen und weiterentwickeln. Ich stelle sicher, dass du die wichtigsten Kennzahlen verstehst und daraus die richtigen Entscheidungen ableiten kannst.',
      },
      {
        question: 'Übernimmst du auch Schulungen für mein Team?',
        answer:
          'Ja, auf Wunsch gebe ich praxisnahe Schulungen für CMS, Marketing-Prozesse und operative Abläufe. Das Ziel ist, dass dein Team die neuen Systeme sicher nutzt und selbständig weiterarbeiten kann. Dabei passe ich die Inhalte an dein Team an, damit der Wissenstransfer direkt im Alltag anwendbar ist.',
      },
      {
        question: 'Gibt es Hilfe bei dringenden Problemen außerhalb geplanter Aufgaben?',
        answer:
          'Für akute Fälle biete ich priorisierte Unterstützung. So lassen sich Fehler, Ausfälle oder kritische Kampagnenthemen schnell stabilisieren, bevor sie größeren Schaden anrichten. Ich bin dann für dich da, damit dein Projekt auch in schwierigen Momenten handlungsfähig bleibt.',
      },
    ],
  },
]

export function Faq8(): React.JSX.Element {
  const defaultCategory = faqCategories[0]?.value ?? 'allgemein'

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 space-y-4 md:mb-16 lg:mb-24">
          <div className="text-primary text-sm font-medium uppercase">FAQ</div>
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Häufige Fragen für deinen Website-Launch und digitale Wachstumsstrategie
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Klare Antworten zu Leistungen, Projektablauf, Budget und Support. So weißt du sofort, wie ich deine Website, SEO und Conversion nachhaltig verbessern kann.
          </p>
        </div>

        <Tabs
          defaultValue={defaultCategory}
          orientation="vertical"
          className="data-[orientation=horizontal]:flex-col"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <TabsList variant="default" className="h-max w-full flex-col gap-2 bg-transparent p-0">
              {faqCategories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="w-full gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-base data-[state=active]:border-primary/20 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <Icon className="size-4" />
                    <span className="flex-1 text-start">{category.label}</span>
                    <ChevronRight className="size-4 rtl:rotate-180" />
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <div className="lg:col-span-2">
              {faqCategories.map((category) => (
                <TabsContent key={category.value} value={category.value} className="mt-0">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-lg border"
                    defaultValue={`${category.value}-item-1`}
                  >
                    {category.faqs.map((faq, index) => {
                      const itemValue = `${category.value}-item-${index + 1}`

                      return (
                        <AccordionItem key={itemValue} value={itemValue}>
                          <AccordionTrigger className="px-5 text-base hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground px-5 pb-5 text-base">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export default Faq8
