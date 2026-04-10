import type { ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <section className={className}>
      <div>{children}</div>
    </section>
  )
}
