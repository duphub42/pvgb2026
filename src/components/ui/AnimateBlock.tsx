import type { ReactNode, CSSProperties, HTMLAttributes } from 'react'

interface AnimateBlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variants?: unknown
  initial?: string
  whileInView?: string
  viewport?: unknown
  transition?: unknown
}

export function AnimateBlock({
  children,
  className,
  style,
  variants,
  initial = 'hidden',
  whileInView = 'visible',
  viewport,
  transition,
  ...rest
}: AnimateBlockProps) {
  void variants
  void initial
  void whileInView
  void viewport
  void transition

  return (
    <div className={className} style={style} {...rest}>
      {children}
    </div>
  )
}
