import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  Cloud,
  Database,
  Filter,
  MailCheck,
  Server,
  Settings2,
  Webhook,
  Workflow,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const platforms = [
  {
    name: 'n8n',
    logo: '/automation/n8n.svg',
    text: 'Flexible Workflows, API-Verbindungen und komplexe Prozessketten, wahlweise selbst gehostet oder cloudbasiert.',
  },
  {
    name: 'Make',
    logo: '/automation/make.svg',
    text: 'Visuelle Automatisierungen für Marketing, Sales, CRM, Datenpflege und wiederkehrende operative Aufgaben.',
  },
  {
    name: 'IFTTT',
    logo: '/automation/ifttt.svg',
    text: 'Einfache Trigger-Automationen für Benachrichtigungen, Tools, einfache Datenflüsse und persönliche Produktivität.',
  },
]

const hostingOptions = [
  {
    icon: Server,
    title: 'Self-hosted n8n',
    text: 'Mehr Kontrolle über Daten, Infrastruktur, Zugänge und sensible Geschäftsprozesse.',
  },
  {
    icon: Cloud,
    title: 'Cloud-basiert',
    text: 'Schneller Start mit Make, IFTTT oder n8n Cloud, wenn Wartung und Betrieb schlank bleiben sollen.',
  },
  {
    icon: Workflow,
    title: 'End-to-End Workflows',
    text: 'Von Lead-Eingang über CRM, E-Mail, Aufgaben, Reporting und KI-Schritte bis zur Übergabe ans Team.',
  },
]

const funnelFlow = [
  {
    icon: Zap,
    title: 'Lead-Quelle',
    text: 'Website-Formular, Ads-Landingpage, Calendly, Newsletter oder manueller Vertriebskontakt.',
  },
  {
    icon: Filter,
    title: 'Qualifizierung',
    text: 'Felder prüfen, Dubletten erkennen, Lead-Score setzen und Zuständigkeit ableiten.',
  },
  {
    icon: Webhook,
    title: 'CRM-Webhook',
    text: 'Saubere Übergabe an Salesforce, HubSpot, Zoho oder Pipedrive mit Fehlerhandling.',
  },
  {
    icon: Database,
    title: 'CRM-Datensatz',
    text: 'Kontakt, Unternehmen, Deal, Pipeline-Status und Quelle werden konsistent angelegt.',
  },
  {
    icon: Settings2,
    title: 'CRM-Automation',
    text: 'Interne Regeln, Tasks, Sequenzen, E-Mail-Strecken und Benachrichtigungen optimieren.',
  },
  {
    icon: MailCheck,
    title: 'Follow-up',
    text: 'Team-Info, Angebotsprozess, Reminder, Reporting oder externe Tool-Verknüpfung auslösen.',
  },
]

const crmTools = ['Salesforce', 'HubSpot', 'Zoho', 'Pipedrive']

export function AutomationPlatformsShowcase() {
  return (
    <section className="w-full overflow-visible py-10 md:py-14 xl:py-18">
      <div className="mx-auto w-full max-w-[86rem] overflow-visible px-4 md:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-card px-5 py-8 shadow-[0_22px_60px_-50px_rgba(0,0,0,0.62)] md:px-8 md:py-10 xl:px-10">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(0,0,0,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.04),transparent_54%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_54%)]"
            aria-hidden="true"
          />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start xl:gap-10">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Zap className="h-4 w-4" aria-hidden="true" />
                Automatisierungsplattformen
              </p>
              <h2 className="mt-4 text-balance type-heading-xl text-foreground md:text-5xl">
                Workflows mit n8n, Make und IFTTT.
              </h2>
              <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                Ich entwickle Automatisierungen für wiederkehrende Abläufe, Datenübergaben,
                Benachrichtigungen, CRM-Prozesse und KI-gestützte Schritte. Je nach Anforderung
                läuft das Setup selbst gehostet mit n8n oder cloudbasiert mit n8n Cloud, Make oder
                IFTTT.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3 xl:pt-2">
              {platforms.map((platform) => (
                <article
                  key={platform.name}
                  className="flex min-w-0 flex-col rounded-2xl border border-border/70 bg-background p-4 shadow-sm"
                >
                  <div>
                    <div className="flex h-12 items-center">
                      <Image
                        src={platform.logo}
                        alt={`${platform.name} Logo`}
                        width={132}
                        height={42}
                        className="h-auto max-h-10 w-auto max-w-[8.25rem] object-contain dark:invert"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{platform.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{platform.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {hostingOptions.map((option) => {
              const Icon = option.icon
              return (
                <article
                  key={option.title}
                  className="flex min-w-0 gap-4 rounded-2xl border border-border/70 bg-background/70 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-base font-semibold text-foreground break-words">
                      {option.title}
                    </strong>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                      {option.text}
                    </span>
                  </span>
                </article>
              )
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-border/70 bg-background/78 p-5 md:p-7">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.36fr)] xl:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Beispiel: Sales-Funnel
                </p>
                <h3 className="mt-4 text-balance type-heading-lg text-foreground md:type-heading-xl">
                  Vom Lead zum CRM-Prozess.
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  Ein typischer Funnel muss nicht bei der Formularübertragung aufhören. Leads werden
                  qualifiziert, per Webhook ins CRM geschrieben und dort mit internen Automationen
                  weitergeführt. Externe Tools wie n8n oder Make verbinden die Systeme, während
                  CRM-Regeln direkt in Salesforce, HubSpot, Zoho oder Pipedrive sauber konfiguriert
                  und optimiert werden.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {crmTools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 md:p-5">
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:24px_24px] opacity-70 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
                  aria-hidden="true"
                />

                <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {funnelFlow.map((step, index) => {
                    const Icon = step.icon
                    const showConnector = index < funnelFlow.length - 1

                    return (
                      <div key={step.title} className="relative">
                        {showConnector ? (
                          <div
                            className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 xl:flex"
                            aria-hidden="true"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                            </span>
                          </div>
                        ) : null}

                        <article className="relative h-full rounded-2xl border border-border/70 bg-background p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                Node {index + 1}
                              </span>
                              <strong className="mt-1 block text-base font-semibold text-foreground">
                                {step.title}
                              </strong>
                            </span>
                          </div>
                          <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            {step.text}
                          </p>
                        </article>
                      </div>
                    )
                  })}
                </div>

                <div className="relative mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <div className="flex items-center gap-3">
                      <Webhook className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <strong className="text-sm font-semibold text-foreground">
                        Extern verknüpfen
                      </strong>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      n8n, Make oder IFTTT verbinden Website, E-Mail, Tabellen, Ads, Support,
                      KI-Modelle und interne Systeme über APIs.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background p-4">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <strong className="text-sm font-semibold text-foreground">
                        Intern optimieren
                      </strong>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      CRM-native Workflows bleiben dort, wo sie hingehören: Pipelines, Aufgaben,
                      Sequenzen, Felder, Scoring und Benachrichtigungen im CRM selbst.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="cta" ctaIcon>
              <Link href="/kontakt">Automatisierung besprechen</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/preise">Budget einordnen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
