export async function revalidatePath(path: string): Promise<void> {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache')
  nextRevalidatePath(path)
}

export async function revalidateTag(tag: string): Promise<void> {
  const { revalidateTag: nextRevalidateTag } = await import('next/cache')
  nextRevalidateTag(tag)
}
