import 'dotenv/config'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

import { convertFigmaJsonToReact } from './converter.js'
import { fetchFigmaFrameNode } from './figmaClient.js'

const server = new McpServer({
  name: 'figma-mcp-server',
  version: '1.0.0',
})

server.tool(
  'get_figma_frame',
  {
    fileKey: z.string().min(1),
    nodeId: z.string().min(1),
  },
  async ({ fileKey, nodeId }) => {
    try {
      const data = await fetchFigmaFrameNode(fileKey, nodeId)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return {
        content: [
          {
            type: 'text',
            text: `get_figma_frame failed: ${message}`,
          },
        ],
        isError: true,
      }
    }
  },
)

server.tool(
  'convert_figma_to_react',
  {
    figmaJson: z.union([z.string(), z.record(z.any())]),
  },
  async ({ figmaJson }) => {
    try {
      const parsedJson = typeof figmaJson === 'string' ? JSON.parse(figmaJson) : figmaJson
      const result = convertFigmaJsonToReact(parsedJson)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return {
        content: [
          {
            type: 'text',
            text: `convert_figma_to_react failed: ${message}`,
          },
        ],
        isError: true,
      }
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error)
  process.stderr.write(`Fatal MCP server error: ${message}\n`)
  process.exit(1)
})
