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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { FaqCategory, FaqIconName } from '@/components/ui/faq-8.data'

type Faq8ClientProps = {
  categories: FaqCategory[]
}

const iconMap: Record<FaqIconName, LucideIcon> = {
  BriefcaseBusiness,
  LockKeyhole,
  CreditCard,
  Headphones,
}

export function Faq8Client({ categories }: Faq8ClientProps): React.JSX.Element {
  const defaultCategory = categories[0]?.value ?? 'allgemein'

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 space-y-4 md:mb-16 lg:mb-24">
          <div className="text-primary text-sm font-medium uppercase">FAQ</div>
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Häufige Fragen für deinen Website-Launch und digitale Wachstumsstrategie
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Klare Antworten zu Leistungen, Projektablauf, Budget und Support. So weißt du sofort,
            wie ich deine Website, SEO und Conversion nachhaltig verbessern kann.
          </p>
        </div>

        <Tabs
          defaultValue={defaultCategory}
          orientation="vertical"
          className="data-[orientation=horizontal]:flex-col"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <TabsList variant="default" className="h-max w-full flex-col gap-2 bg-transparent p-0">
              {categories.map((category) => {
                const Icon = iconMap[category.icon]
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
              {categories.map((category) => (
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

