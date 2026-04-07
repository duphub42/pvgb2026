import { revalidatePath } from '@/utilities/revalidateCache'

/**
 * Nach Änderungen am Preisrechner (Kategorien, Leistungen, Global) ISR-Caches anstoßen.
 */
export async function revalidatePriceCalculatorData(): Promise<void> {
  try {
    await revalidatePath('/preise')
    await revalidatePath('/')
  } catch {
    // Außerhalb von Next (z. B. Payload CLI) ignorieren
  }
}
