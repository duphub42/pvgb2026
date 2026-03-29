import { revalidatePath } from 'next/cache'

/**
 * Nach Änderungen am Preisrechner (Kategorien, Leistungen, Global) ISR-Caches anstoßen.
 */
export function revalidatePriceCalculatorData(): void {
  try {
    revalidatePath('/preise')
    revalidatePath('/')
  } catch {
    // Außerhalb von Next (z. B. Payload CLI) ignorieren
  }
}
