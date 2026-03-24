# Figma MCP Server (Node.js + TypeScript)

Production-ready MCP server for Cursor that:
- Fetches Figma frame/node JSON via Figma API
- Converts Figma JSON to React + Tailwind + shadcn-compatible component output

## Tools

### `get_figma_frame`
- **input**
  - `fileKey: string`
  - `nodeId: string`
- **action**
  - Calls Figma API:
    - `GET https://api.figma.com/v1/files/{fileKey}/nodes?ids={nodeId}`
- **auth**
  - Uses `FIGMA_ACCESS_TOKEN` from environment

### `convert_figma_to_react`
- **input**
  - `figmaJson: string | object`
- **output**
  - JSON with:
    - `componentCode` (React component using Tailwind and shadcn imports)
    - `extractedStyles` (colors, spacing, textSizes)

## 1) Setup

```bash
cd figma-mcp-server
cp .env.example .env
```

Set token in `.env`:

```bash
FIGMA_ACCESS_TOKEN=your_figma_pat_here
```

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Run server:

```bash
npm start
```

## 2) Cursor MCP config

Use this MCP entry in Cursor:

```json
{
  "name": "figma",
  "command": "node",
  "args": ["dist/index.js"]
}
```

If needed with absolute path:

```json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/figma-mcp-server/dist/index.js"]
    }
  }
}
```

## 3) Notes

- Do not commit `.env`.
- `get_figma_frame` returns structured error text if token is missing or request fails.
- Converter includes a clean base structure and is ready to extend for deeper Payload CMS mapping.
