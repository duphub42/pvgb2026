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
    displayMode,
    galleryColumns,
    bentoShowCounter,
    bentoCounterLabel,
    bentoGap,
    bentoRowHeight,
    bentoMobileFlattenSpans,
    rows,
    index = 0,
    ...styleProps
  } = props

  const styles = styleProps as unknown as BlockStyles

  const parsedRows = (rows ?? [])
    .map((row, rowIndex) => {
      const parsedItems = (row?.items ?? [])
        .filter((item) => {
          const hasName = Boolean(item?.name?.trim())
          const hasLogo = typeof item?.logo === 'object' && Boolean(item?.logo)
          return hasName || hasLogo
        })
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
            name: String(item.name ?? '').trim(),
            logo: logoNode,
            logoResource: typeof item.logo === 'object' && item.logo ? (item.logo as MediaType) : null,
            tileSize: item?.tileSize,
            bentoInteractive: item?.bentoInteractive === true,
            detailTitle: String(item?.detailTitle ?? '').trim(),
            detailText: String(item?.detailText ?? '').trim(),
            detailMeta: String(item?.detailMeta ?? '').trim(),
            emphasis: item?.emphasis === 'feature' ? 'feature' : 'normal',
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

  const normalizedDisplayMode =
    displayMode === 'gallery' ? 'gallery' : displayMode === 'bento' ? 'bento' : 'marquee'
  const galleryItems = parsedRows.flatMap((row) => row.items)
  const galleryColumnClasses: Record<string, string> = {
    '3': 'lg:grid-cols-3',
    '4': 'lg:grid-cols-4',
    '5': 'lg:grid-cols-5',
  }
  const desktopColsClass =
    galleryColumnClasses[String(galleryColumns ?? '4')] ?? galleryColumnClasses['4']

  const tileSizeClasses: Record<string, string> = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-1 md:row-span-1',
    wide: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
  }

  const bentoGapClassMap: Record<string, string> = {
    tight: 'gap-1.5 md:gap-2',
    default: 'gap-2 md:gap-3',
    relaxed: 'gap-3 md:gap-4',
  }
  const bentoRowHeightClassMap: Record<string, string> = {
    sm: 'auto-rows-[88px] md:auto-rows-[108px] xl:auto-rows-[136px]',
    md: 'auto-rows-[96px] md:auto-rows-[120px] xl:auto-rows-[150px]',
    lg: 'auto-rows-[108px] md:auto-rows-[136px] xl:auto-rows-[170px]',
  }

  const bentoGapClass = bentoGapClassMap[String(bentoGap ?? 'default')] ?? bentoGapClassMap.default
  const bentoRowHeightClass =
    bentoRowHeightClassMap[String(bentoRowHeight ?? 'md')] ?? bentoRowHeightClassMap.md

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

        {normalizedDisplayMode === 'bento' ? (
          <div className="logo-bento-shell rounded-2xl border border-white/10 bg-zinc-950 p-4 md:p-5">
            {(eyebrow || (bentoShowCounter && (bentoCounterLabel || galleryItems.length > 0))) && (
              <div className="mb-4 flex items-center justify-between">
                {eyebrow ? <span className="logo-bento-kicker">{eyebrow}</span> : <span />}
                {bentoShowCounter ? (
                  <span className="logo-bento-counter">
                    <span>{galleryItems.length}</span>
                    {bentoCounterLabel ? <span> {bentoCounterLabel}</span> : null}
                  </span>
                ) : null}
              </div>
            )}

            <div
              className={`grid grid-cols-2 sm:grid-cols-3 ${desktopColsClass} ${bentoGapClass} ${bentoRowHeightClass} ${bentoMobileFlattenSpans ? 'logo-bento-mobile-flat' : ''}`}
            >
              {galleryItems.map((item, itemIndex) => {
                const tileClass = tileSizeClasses[String(item.tileSize ?? 'md')] ?? tileSizeClasses.md

                return (
                  <article
                    key={`${item.key}-bento-${itemIndex}`}
                    className={`logo-bento-item group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/90 ${tileClass} ${item.emphasis === 'feature' ? 'logo-bento-item-feature' : ''} ${item.bentoInteractive ? 'logo-bento-item-interactive' : ''}`}
                  >
                    <div className="logo-bento-logo-layer absolute inset-0">
                      <div className="flex h-full w-full items-center justify-center p-3 md:p-4">
                        {item.logoResource ? (
                          <Media
                            resource={item.logoResource}
                            className="h-full w-full"
                            imgClassName="logo-bento-image h-full w-full object-contain"
                          />
                        ) : item.name ? (
                          <span className="text-xs font-medium text-zinc-300">{item.name}</span>
                        ) : null}
                      </div>
                    </div>

                    {item.bentoInteractive ? (
                      <div className="logo-bento-detail-layer absolute inset-0">
                        {item.detailTitle ? (
                          <span className="logo-bento-detail-title">{item.detailTitle}</span>
                        ) : null}
                        {item.detailText ? (
                          <p className="logo-bento-detail-text">{item.detailText}</p>
                        ) : null}
                        {item.detailMeta ? (
                          <span className="logo-bento-detail-meta">{item.detailMeta}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        ) : normalizedDisplayMode === 'gallery' ? (
          <div
            className={`grid grid-cols-2 auto-rows-[112px] gap-3 sm:grid-cols-3 md:auto-rows-[136px] md:gap-4 ${desktopColsClass} xl:auto-rows-[168px]`}
          >
            {galleryItems.map((item, itemIndex) => {
              const tileClass = tileSizeClasses[String(item.tileSize ?? 'md')] ?? tileSizeClasses.md

              return (
                <article
                  key={`${item.key}-tile-${itemIndex}`}
                  className={`logo-gallery-item group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-2.5 transition-colors duration-200 md:p-3 xl:p-4 dark:border-white/20 dark:hover:bg-white dark:focus-within:bg-white ${tileClass}`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    {item.logoResource ? (
                      <Media
                        resource={item.logoResource}
                        className="h-full w-full"
                        imgClassName="logo-gallery-image h-full w-full object-contain p-1 md:p-2"
                      />
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">{item.name || 'Logo'}</span>
                    )}
                  </div>
                  {item.name ? (
                    <p className="pointer-events-none absolute inset-x-2 bottom-2 truncate rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {item.name}
                    </p>
                  ) : null}
                </article>
              )
            })}
          </div>
        ) : (
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
        )}
      </section>
    </BlockContainer>
  )
}
