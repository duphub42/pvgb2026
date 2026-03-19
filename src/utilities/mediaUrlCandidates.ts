export function getMediaUrlCandidates(input: string | null | undefined): string[] {
  if (!input) return []

  const unique = new Set<string>()
  const add = (url: string | null | undefined) => {
    if (!url) return
    const normalized = url.trim()
    if (!normalized) return
    unique.add(normalized)
  }

  const splitQuery = (url: string): { path: string; query: string } => {
    const i = url.indexOf('?')
    if (i === -1) return { path: url, query: '' }
    return { path: url.slice(0, i), query: url.slice(i) }
  }

  const stripNumericSuffix = (path: string): string => path.replace(/-(\d+)(\.[a-z0-9]+)$/i, '$2')

  const addApiAndMediaVariants = (rawPath: string, query: string) => {
    const apiMatch = rawPath.match(/^\/api\/media\/file\/(.+)$/)
    const mediaMatch = rawPath.match(/^\/media\/(.+)$/)

    if (apiMatch?.[1]) {
      const filename = apiMatch[1]
      const stripped = stripNumericSuffix(filename)
      add(`/api/media/file/${filename}${query}`)
      add(`/api/media/file/${stripped}${query}`)
      add(`/media/${filename}${query}`)
      add(`/media/${stripped}${query}`)
      return
    }

    if (mediaMatch?.[1]) {
      const filename = mediaMatch[1]
      const stripped = stripNumericSuffix(filename)
      add(`/media/${filename}${query}`)
      add(`/media/${stripped}${query}`)
      add(`/api/media/file/${filename}${query}`)
      add(`/api/media/file/${stripped}${query}`)
      return
    }

    add(`${rawPath}${query}`)
  }

  add(input)

  if (input.startsWith('http://') || input.startsWith('https://')) {
    try {
      const parsed = new URL(input)
      const pathWithQuery = `${parsed.pathname}${parsed.search}`
      addApiAndMediaVariants(parsed.pathname, parsed.search)
      add(pathWithQuery)
    } catch {
      // keep original only
    }
  } else {
    const { path, query } = splitQuery(input)
    addApiAndMediaVariants(path, query)
  }

  return Array.from(unique)
}

