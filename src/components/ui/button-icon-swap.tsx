"use client"

import * as React from "react"
import { ChevronRight, ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ButtonIconSwap - Icon-Swap Animation für CTA-Buttons
 * 
 * Zeigt ChevronRight per Default, wechselt zu ArrowUpRight bei Hover
 * Verwendet die CSS-Klassen aus globals.part4.css:
 * - .megamenu-special-icon-swap
 * - .megamenu-special-icon-layer
 * - .megamenu-special-icon-layer--a (erstes Icon)
 * - .megamenu-special-icon-layer--b (zweites Icon)
 */
export interface ButtonIconSwapProps {
  /** Erstes Icon (sichtbar bei Default) */
  iconA?: LucideIcon
  /** Zweites Icon (sichtbar bei Hover) */
  iconB?: LucideIcon
  /** Größe der Icons */
  size?: number
  /** Zusätzliche CSS-Klassen */
  className?: string
}

export function ButtonIconSwap({
  iconA: IconA = ChevronRight,
  iconB: IconB = ArrowUpRight,
  size = 16,
  className,
}: ButtonIconSwapProps) {
  return (
    <span
      className={cn(
        "megamenu-special-icon-swap relative inline-flex items-center justify-center overflow-hidden pointer-events-none",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="megamenu-special-icon-layer megamenu-special-icon-layer--a absolute inset-0 flex items-center justify-center">
        <IconA size={size} />
      </span>
      <span className="megamenu-special-icon-layer megamenu-special-icon-layer--b absolute inset-0 flex items-center justify-center">
        <IconB size={size} />
      </span>
    </span>
  )
}
