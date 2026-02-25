import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import React from 'react'

// Konkreter Typ wird nach payload generate:types verfügbar (LyraContentBlock).
// Bis dahin any, um den Build nicht zu blockieren.
type LyraContentBlockProps = any

export const LyraContentBlock: React.FC<LyraContentBlockProps> = (props) => {
  const {
    title,
    paragraphOne,
    paragraphTwo,
    buttonLabel,
    button,
    disableInnerContainer,
  } = props

  const linkProps = button?.link

  return (
    <section
      className={cn(
        'py-16 md:py-32',
        disableInnerContainer && 'py-8',
      )}
    >
      <div className={cn('mx-auto max-w-5xl px-6', disableInnerContainer && 'px-0')}>
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          {title && (
            <h2 className="text-4xl font-medium">
              {title}
            </h2>
          )}
          <div className="space-y-6 text-muted-foreground">
            {paragraphOne && <p>{paragraphOne}</p>}
            {paragraphTwo && <p>{paragraphTwo}</p>}
            {linkProps && (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="gap-1 pr-1.5"
              >
                <Link href={linkProps.url || '#'} target={linkProps.newTab ? '_blank' : undefined}>
                  <span>{buttonLabel || 'Learn More'}</span>
                  <ChevronRight className="size-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

