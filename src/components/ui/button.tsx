import * as React from 'react'
import { Slot } from 'radix-ui'
import { ChevronRight, ArrowUpRight, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariants } from './button-variants'

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariants & {
    asChild?: boolean
    /**
     * CTA Icon-Swap aktivieren
     * Zeigt ChevronRight per Default, wechselt zu ArrowUpRight bei Hover
     * Nur wirksam bei variant="cta"
     */
    ctaIcon?: boolean
    /**
     * Benutzerdefinierte Icons für den Swap
     * Standard: ChevronRight → ArrowUpRight
     */
    iconA?: LucideIcon
    iconB?: LucideIcon
  }

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ctaIcon = false,
  iconA: IconA = ChevronRight,
  iconB: IconB = ArrowUpRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  const ctaIconSwap = (
    <span
      className="megamenu-special-icon-swap relative inline-flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ width: 16, height: 16 }}
      aria-hidden="true"
    >
      <span className="megamenu-special-icon-layer megamenu-special-icon-layer--a absolute inset-0 flex items-center justify-center">
        <IconA size={16} />
      </span>
      <span className="megamenu-special-icon-layer megamenu-special-icon-layer--b absolute inset-0 flex items-center justify-center">
        <IconB size={16} />
      </span>
    </span>
  )

  const withCtaIconSwap = (node: React.ReactNode) => (
    <>
      <span>{node}</span>
      {ctaIconSwap}
    </>
  )

  const isSafeAsChildElement =
    asChild && React.isValidElement(children) && children.type !== React.Fragment

  // Bei asChild darf das direkte Slot-Child kein Fragment sein.
  // Deshalb erweitern wir bei asChild das Kind-Element selbst statt das Slot-Child zu wrappen.
  const content =
    ctaIcon && variant === 'cta'
      ? isSafeAsChildElement
        ? React.cloneElement(
            children as React.ReactElement<{ children?: React.ReactNode }>,
            undefined,
            withCtaIconSwap((children as React.ReactElement<{ children?: React.ReactNode }>).props.children),
          )
        : asChild
          ? children
          : withCtaIconSwap(children)
      : children

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {content}
    </Comp>
  )
}

export { Button, buttonVariants }
// Re-export für einfachen Import
export { ButtonIconSwap } from './button-icon-swap'
