function isMissingStaticGenerationStoreError(error: unknown): boolean {
  return (
    error instanceof Error &&
    typeof error.message === 'string' &&
    error.message.includes('static generation store missing')
  )
}

export async function revalidatePath(path: string): Promise<void> {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache')
  try {
    nextRevalidatePath(path)
  } catch (error) {
    if (isMissingStaticGenerationStoreError(error)) {
      // This can happen during payload updates outside of a Next.js static generation context.
      return
    }
    throw error
  }
}

export async function revalidateTag(tag: string): Promise<void> {
  const { revalidateTag: nextRevalidateTag } = await import('next/cache')
  try {
    nextRevalidateTag(tag)
  } catch (error) {
    if (isMissingStaticGenerationStoreError(error)) {
      return
    }
    throw error
  }
}
