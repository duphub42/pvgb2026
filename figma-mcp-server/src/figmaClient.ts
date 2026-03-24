import { z } from 'zod'

const FigmaNodeResponseSchema = z.object({
  name: z.string().optional(),
  lastModified: z.string().optional(),
  nodes: z.record(z.any()),
})

export type FigmaNodeResponse = z.infer<typeof FigmaNodeResponseSchema>

function getToken(): string {
  const token = process.env.FIGMA_ACCESS_TOKEN?.trim()
  if (!token) {
    throw new Error(
      'FIGMA_ACCESS_TOKEN is missing. Set it in .env before calling get_figma_frame.',
    )
  }
  return token
}

export async function fetchFigmaFrameNode(fileKey: string, nodeId: string): Promise<FigmaNodeResponse> {
  const token = getToken()
  const url = new URL(`https://api.figma.com/v1/files/${fileKey}/nodes`)
  url.searchParams.set('ids', nodeId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-Figma-Token': token,
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `Figma API request failed (${response.status} ${response.statusText}): ${body}`,
    )
  }

  const json = (await response.json()) as unknown
  return FigmaNodeResponseSchema.parse(json)
}
