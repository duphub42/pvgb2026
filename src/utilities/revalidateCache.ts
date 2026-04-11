function isMissingStaticGenerationStoreError(error: unknown): boolean {
  return (
    error instanceof Error &&
    typeof error.message === 'string' &&
    error.message.includes('static generation store missing')
  )
}

function isNextCacheRevalidationError(error: unknown): boolean {
  return (
    error instanceof Error &&
    typeof error.message === 'string' &&
    (error.message.includes('static generation store missing') ||
      error.message.includes('revalidating cache with key'))
  )
}

export async function revalidatePath(path: string): Promise<void> {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache')
  try {
    nextRevalidatePath(path)
  } catch (error) {
    if (isNextCacheRevalidationError(error)) {
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
    if (isNextCacheRevalidationError(error)) {
      return
    }
    throw error
  }
}
