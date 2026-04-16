import { cva, type VariantProps } from "class-variance-authority"

/**
 * Button Variants - Zentralisiertes Design-System
 * 
 * Enthält alle Button-Styles der Anwendung:
 * - Standard shadcn Variants: default, outline, secondary, ghost, destructive, link
 * - Spezial-Varianten für das Projekt:
 *   - cta: Haupt-CTA mit invertierten Farben (foreground/background) + Icon-Swap Unterstützung
 *   - inverted: Für dunkle Hintergründe (z.B. ProfilCtaBand)
 *   - whatsapp: WhatsApp Brand-Farbe
 */
export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Standard shadcn Variants
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Spezial-Varianten für das Projekt
        /**
         * CTA-Variante - Der Standard für Haupt-Call-to-Actions
         * Verwendet invertierte Farben (foreground auf background)
 * Unterstützt Icon-Swap Animation via .megamenu-special-icon-swap CSS
         */
        cta: "megamenu-highlight-cta bg-foreground text-background hover:bg-foreground/80 active:bg-foreground/80",
        
        /**
         * Inverted-Variante - Für dunkle Hintergründe (z.B. ProfilCtaBand)
         * Rounded-full für Pill-Form, Schatten für Tiefe
         */
        inverted: "rounded-full bg-background text-foreground shadow-[0_16px_36px_-22px_rgba(255,255,255,0.38)] hover:bg-background/90",
        
        /**
         * WhatsApp-Variante - Brand-Farbe für WhatsApp-CTAs
         */
        whatsapp: "bg-[#25D366] text-white hover:bg-[#20BD5A]",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
        
        /**
         * CTA-Größe - Größere Padding für Haupt-CTAs
         */
        cta: "h-11 gap-2 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
