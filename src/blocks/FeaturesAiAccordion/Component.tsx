'use client'

import { Activity, Database, Fingerprint, IdCard, ChartBarIncreasingIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { Media } from '@/components/Media'

// Einfaches, lokales Accordion (damit kein globales UI-Accordion nötig ist)
type LocalAccordionItem = {
  value: string
  title: React.ReactNode
  content: React.ReactNode
}

function LocalAccordion({
  items,
  value,
  onChange,
}: {
  items: LocalAccordionItem[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const open = item.value === value
        return (
          <div
            key={item.value}
            className="rounded-xl border border-border bg-background/60"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
              onClick={() => onChange(open ? '' : item.value)}
            >
              {item.title}
              <span
                className={cn(
                  'ml-2 h-4 w-4 shrink-0 transform transition-transform duration-200',
                  open ? 'rotate-90' : '',
                )}
              >
                ▸
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// Konkreter Typ kommt nach payload generate:types (FeaturesAiAccordionBlock)
type FeaturesAiAccordionBlockProps = any

function getIconComponent(icon?: string) {
  switch (icon) {
    case 'fingerprint':
      return Fingerprint
    case 'idCard':
      return IdCard
    case 'chart':
      return ChartBarIncreasingIcon
    case 'database':
    default:
      return Database
  }
}

export const FeaturesAiAccordionBlock: React.FC<FeaturesAiAccordionBlockProps> = (props) => {
  const { title, subtitle, items, disableInnerContainer } = props ?? {}

  const list = Array.isArray(items) ? items : []
  const firstId = list[0]?.id ?? 'item-1'
  const [activeValue, setActiveValue] = useState<string>(firstId)

  const activeItem = list.find((i: any) => (i?.id ?? 'item-1') === activeValue) ?? list[0]

  return (
    <section className={cn('py-12 md:py-20 lg:py-32', disableInnerContainer && 'py-12')}>
      <div className="relative -z-10 bg-linear-to-b from-transparent to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))] sm:inset-x-6 sm:rounded-b-3xl dark:block" />
      <div
        className={cn(
          'relative z-10 mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20',
          disableInnerContainer && 'px-0',
        )}
      >
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          {title && (
            <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-12 sm:px-0 md:grid-cols-2 lg:gap-20">
          {/* Accordion-Spalte */}
          <div>
            <LocalAccordion
              value={activeValue}
              onChange={(v) => setActiveValue(v || firstId)}
              items={list.map((item: any) => {
                const id = item?.id ?? 'item-1'
                const Icon = getIconComponent(item?.icon ?? 'database')
                return {
                  value: id,
                  title: (
                    <div className="flex items-center gap-2 text-base">
                      <Icon className="size-4" />
                      {item?.title ?? ''}
                    </div>
                  ),
                  content: item?.content ?? '',
                } satisfies LocalAccordionItem
              })}
            />
          </div>

          {/* Bild-Spalte */}
          <div className="relative flex overflow-hidden rounded-3xl border border-border bg-background p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]" />
            <div className="aspect-[76/59] relative w-[calc(3/4*100%+3rem)] rounded-2xl bg-background">
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeItem?.id ?? 'active-item'}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                  >
                    {/* Dark + Light Images */}
                    {activeItem?.darkImage && (
                      <div className="hidden size-full dark:block">
                        <Media
                          resource={activeItem.darkImage}
                          imgClassName="size-full object-cover object-left-top dark:mix-blend-lighten"
                        />
                      </div>
                    )}
                    {activeItem?.lightImage && (
                      <div className={cn('size-full', activeItem?.darkImage && 'dark:hidden')}>
                        <Media
                          resource={activeItem.lightImage}
                          imgClassName="size-full object-cover object-left-top"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

