'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { FORM_SPAM_META_FIELDS, buildFormSpamMetaSubmissionData } from '@/utilities/formSpamProtection'

const CONTACT_FAQS = [
  {
    question: 'Welche Leistungen bieten Sie rund um Webseiten an?',
    answer:
      'Ich biete ganzheitliche Leistungen für professionelle Webseiten: von Strategie und Konzeption über modernes Webdesign bis zur technischen Umsetzung. Dazu gehören auch Suchmaschinenoptimierung (SEO), Ladezeit-Optimierung, Conversion-orientierte Struktur und laufende Website-Betreuung. So entsteht ein Webauftritt, der nicht nur gut aussieht, sondern auch messbar Ergebnisse liefert.',
  },
  {
    question: 'Arbeiten Sie mit bestehenden Webseiten oder nur mit neuen Projekten?',
    answer:
      'Beides ist möglich. Ich unterstütze sowohl bei einem kompletten Website-Relaunch als auch bei der gezielten Optimierung bestehender Seiten. Häufige Themen sind bessere Sichtbarkeit bei Google, ein moderneres Design, schnellere Ladezeiten und eine klarere Nutzerführung für mehr Anfragen.',
  },
  {
    question: 'Für wen sind Ihre Leistungen geeignet?',
    answer:
      'Meine Leistungen richten sich vor allem an Selbstständige, Dienstleister, kleine und mittelständische Unternehmen, die eine hochwertige Website erstellen oder verbessern möchten. Wenn Sie online professioneller auftreten, besser gefunden werden und mehr qualifizierte Leads gewinnen möchten, sind Sie bei mir richtig. Die Zusammenarbeit ist praxisnah, transparent und auf Ihre Ziele ausgerichtet.',
  },
  {
    question: 'Wie läuft ein typisches Projekt ab?',
    answer:
      'Ein Projekt startet mit einem unverbindlichen Erstgespräch, in dem wir Ziele, Zielgruppe und Anforderungen klären. Danach folgen Analyse, Struktur, Design und technische Umsetzung mit regelmäßigen Abstimmungen. Zum Abschluss erhalten Sie eine saubere Übergabe inklusive Einweisung sowie auf Wunsch langfristige Wartung, Support und SEO-Weiterentwicklung.',
  },
  {
    question: 'Wie schnell kann ein Projekt starten?',
    answer:
      'Kleinere Optimierungen an Ihrer Webseite können oft kurzfristig beginnen. Für größere Website-Projekte oder Relaunches definieren wir gemeinsam einen realistischen Zeitplan mit klaren Meilensteinen. So haben Sie von Anfang an Planungssicherheit bei Budget, Umfang und Go-live-Termin.',
  },
  {
    question: 'Bieten Sie auch SEO und Performance-Optimierung an?',
    answer:
      'Ja, SEO und Performance sind ein zentraler Bestandteil meiner Arbeit. Ich optimiere unter anderem Seitenstruktur, Meta-Daten, interne Verlinkung, Core Web Vitals und mobile Nutzerfreundlichkeit. Das Ziel ist eine schnell ladende, technisch saubere Website, die bei Google besser rankt und Besucher effizient zu Kunden macht.',
  },
  {
    question: 'Kann ich Inhalte später selbst pflegen?',
    answer:
      'Ja, Ihre Website wird so aufgebaut, dass Sie Inhalte selbstständig und ohne Programmierkenntnisse pflegen können. Texte, Bilder, Leistungen, Referenzen oder Blogbeiträge lassen sich im CMS einfach aktualisieren. Das spart langfristig Zeit und Kosten, weil Sie auf Änderungen schnell reagieren können.',
  },
  {
    question: 'Unterstützen Sie auch bei Hosting und Domain?',
    answer:
      'Gern unterstütze ich Sie bei Domain, Hosting, E-Mail-Setup und technischer Grundkonfiguration. Ich achte auf zuverlässige Infrastruktur, Sicherheit, Backups und sinnvolle Performance-Einstellungen. Dadurch läuft Ihre Website stabil, schnell und wartungsfreundlich im Alltag.',
  },
  {
    question: 'Was kostet eine neue Website oder ein Relaunch?',
    answer:
      'Die Kosten für eine neue Website hängen vom Funktionsumfang, Designanspruch, Inhaltsmenge und gewünschten Integrationen ab. Nach einem Erstgespräch erhalten Sie eine transparente Einschätzung mit klaren Leistungsbausteinen. So wissen Sie genau, welche Investition für Webdesign, Umsetzung, SEO und Betreuung einzuplanen ist.',
  },
  {
    question: 'Wie kann ich eine Anfrage stellen?',
    answer:
      'Nutzen Sie einfach das Kontaktformular auf dieser Seite und beschreiben Sie kurz Ihr Projektziel. Je mehr Infos Sie zu aktueller Website, Leistungen und gewünschtem Zeitrahmen angeben, desto konkreter kann ich antworten. Sie erhalten zeitnah eine Rückmeldung mit ersten Empfehlungen und sinnvollen nächsten Schritten.',
  },
] as const

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [honeypotValue, setHoneypotValue] = useState('')
  const [formStartedAt] = useState<number>(() => Date.now())
  const router = useRouter()
  const pathname = usePathname()
  const isContactPage = /(^|\/)(kontakt|contact)(\/|$)/.test((pathname || '').toLowerCase())

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      if (honeypotValue.trim().length > 0) {
        setHasSubmitted(true)
        return
      }

      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data as unknown as Record<string, unknown>)
          .map(([name, value]) => ({
            field: name,
            value,
          }))
          .concat(
            buildFormSpamMetaSubmissionData({
              honeypotValue,
              startedAt: formStartedAt,
            }),
          )

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, honeypotValue, formStartedAt],
  )

  const formContent = (
    <>
      {isContactPage && (
        <h2 id="kontaktformular" className="mb-4 text-2xl font-semibold lg:text-3xl">
          Kontaktformular
        </h2>
      )}
      {!isContactPage && enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="rounded-[0.8rem] border border-border p-4 lg:p-6">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                name={FORM_SPAM_META_FIELDS.honeypot}
                value={honeypotValue}
                onChange={(event) => setHoneypotValue(event.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
              />
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </>
  )

  if (!isContactPage) {
    return <div className="container lg:max-w-[48rem]">{formContent}</div>
  }

  return (
    <div className="container lg:max-w-[80rem]">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>{formContent}</div>
        <aside className="rounded-[0.8rem] border border-border bg-card p-4 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-3 text-2xl font-semibold lg:text-3xl">Häufige Fragen</h2>
          <p className="mt-3 text-sm text-muted-foreground lg:text-base">
            Antworten rund um Webdesign, Website-Erstellung, SEO, Relaunch, Betreuung und den
            Ablauf einer erfolgreichen Zusammenarbeit.
          </p>

          <Accordion type="single" collapsible className="mt-6">
            {CONTACT_FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>
      </div>
    </div>
  )
}
