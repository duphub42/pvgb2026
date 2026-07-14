export type WebMcpJsonSchema = {
  type?: string
  properties?: Record<string, Record<string, unknown>>
  required?: string[]
  enum?: string[]
  [key: string]: unknown
}

export type WebMcpToolDefinition = {
  name: string
  description: string
  inputSchema: WebMcpJsonSchema
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown
}

export type WebMcpToolHandle = {
  name: string
  unregister?: () => void | Promise<void>
}

export type ModelContext = {
  registerTool: (tool: WebMcpToolDefinition) => Promise<WebMcpToolHandle | void> | WebMcpToolHandle | void
  unregisterTool?: (name: string) => Promise<void> | void
  getTools?: () => Promise<WebMcpToolHandle[]>
  executeTool?: (name: string, input: string) => Promise<unknown>
}

export type AgentSubmitEvent = SubmitEvent & {
  agentInvoked?: boolean
  respondWith?: (promise: Promise<unknown>) => void
}

export function getModelContext(): ModelContext | null {
  if (typeof document === 'undefined') return null

  const documentContext = (document as Document & { modelContext?: ModelContext }).modelContext
  if (documentContext) return documentContext

  if (typeof navigator === 'undefined') return null
  return (navigator as Navigator & { modelContext?: ModelContext }).modelContext ?? null
}

export function isWebMcpSupported(): boolean {
  return getModelContext()?.registerTool != null
}

export async function registerWebMcpTool(tool: WebMcpToolDefinition): Promise<(() => void) | undefined> {
  const modelContext = getModelContext()
  if (!modelContext?.registerTool) return undefined

  const handle = await modelContext.registerTool(tool)

  return () => {
    if (typeof handle === 'object' && handle && typeof handle.unregister === 'function') {
      void handle.unregister()
      return
    }

    modelContext.unregisterTool?.(tool.name)
  }
}

export function getWebMcpFormAttributes(options: {
  toolName: string
  toolDescription: string
  autoSubmit?: boolean
}): Record<string, string> {
  const attrs: Record<string, string> = {
    toolname: options.toolName,
    tooldescription: options.toolDescription,
  }

  if (options.autoSubmit) {
    attrs.toolautosubmit = ''
  }

  return attrs
}
