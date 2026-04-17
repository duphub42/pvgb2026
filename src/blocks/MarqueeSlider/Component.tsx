import React from 'react'

import type { BlockStyles } from '@/blocks/BlockStyleSystem'
import { BlockContainer } from '@/components/BlockContainer'
import { MarqueeSlider } from '@/components/marquee-slider'
import { Media } from '@/components/Media'
import type { MarqueeSliderBlock as MarqueeSliderBlockData, Media as MediaType } from '@/payload-types'

type MarqueeSliderBlockProps = MarqueeSliderBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

export const MarqueeSliderBlock: React.FC<MarqueeSliderBlockProps> = (props) => {
  const {
    disableInnerContainer: _disableInnerContainer,
    eyebrow,
    heading,
    intro,
    rows,
    index = 0,
    ...styleProps
  } = props

  const styles = styleProps as unknown as BlockStyles

  const parsedRows = (rows ?? [])
    .map((row, rowIndex) => {
      const parsedItems = (row?.items ?? [])
        .filter((item) => Boolean(item?.name?.trim()))
        .map((item, itemIndex) => {
          const logoNode =
            typeof item.logo === 'object' && item.logo
              ? (
                  <Media
                    resource={item.logo as MediaType}
                    className="h-6 w-6 shrink-0"
                    imgClassName="h-full w-full object-contain"
                  />
                )
              : (
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary/65" aria-hidden />
                )

          return {
            key:
              (typeof item.id === 'string' && item.id) ||
              `marquee-item-${rowIndex}-${itemIndex}-${String(item.name).slice(0, 24)}`,
            name: String(item.name).trim(),
            logo: logoNode,
          }
        })

      return {
        key: (typeof row?.id === 'string' && row.id) || `marquee-row-${rowIndex}`,
        direction: (row?.direction === 'right' ? 'right' : 'left') as 'left' | 'right',
        speed: typeof row?.speed === 'number' ? row.speed : 40,
        pauseOnHover: row?.pauseOnHover !== false,
        items: parsedItems,
      }
    })
    .filter((row) => row.items.length > 0)

  if (!parsedRows.length) return null

  return (
    <BlockContainer styles={styles} index={index} className="pb-12 pt-10 md:pb-16 md:pt-14">
      <section className="w-full">
        {(eyebrow || heading || intro) && (
          <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            {eyebrow ? (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">{heading}</h2>
            ) : null}
            {intro ? (
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                {intro}
              </p>
            ) : null}
          </header>
        )}

        <div>
          {parsedRows.map((row, rowIndex) => (
            <MarqueeSlider
              key={row.key}
              items={row.items}
              direction={row.direction}
              speed={row.speed}
              pauseOnHover={row.pauseOnHover}
              className={rowIndex > 0 ? 'mt-6' : undefined}
            />
          ))}
        </div>
      </section>
    </BlockContainer>
  )
}
