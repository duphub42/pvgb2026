import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        expandIcon:
          'group relative text-primary-foreground bg-primary hover:bg-primary/90',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-md px-8 has-[>svg]:px-4',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonIconProps {
  Icon?: React.ElementType
  iconPlacement?: 'left' | 'right'
}

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants>,
    ButtonIconProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      variant,
      asChild = false,
      Icon,
      iconPlacement = 'right',
      children,
      ...props
    },
    ref,
  ) => {
    const iconLeft =
      Icon && iconPlacement === 'left' ? (
        <div className="w-0 translate-x-0 pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-full group-hover:pr-2 group-hover:opacity-100">
          <Icon />
        </div>
      ) : null
    const iconRight =
      Icon && iconPlacement === 'right' ? (
        <div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
          <Icon />
        </div>
      ) : null

    const mergedClassName = cn(buttonVariants({ variant, size, className }))

    if (asChild && Icon != null) {
      const child = React.Children.only(children) as React.ReactElement
      return React.cloneElement(child, {
        ...child.props,
        className: cn(mergedClassName, child.props?.className),
        children: (
          <>
            {iconLeft}
            {child.props?.children}
            {iconRight}
          </>
        ),
      })
    }

    if (asChild) {
      return (
        <Slot ref={ref} className={mergedClassName} data-slot="button" {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        data-slot="button"
        className={mergedClassName}
        {...props}
      >
        {iconLeft}
        {children}
        {iconRight}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
