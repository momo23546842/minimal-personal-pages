import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'
import { searchFacts, listFactsByCategory } from '@/lib/facts'

// Centralized tools metadata (used by GET handshake, initialize, and tools/list)
const toolsList = [
  {
    name: 'getProfile',
    description: "Returns an anonymous profile summary for the digital twin. Does not expose personal identifying details.",
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'getCareer',
    description: "Returns anonymized career/project entries for the digital twin. No employer or date specifics are included.",
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'getSkills',
    description: "Returns a list of general skills and expertise tags for the digital twin.",
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'searchFacts',
    description: "Search public-safe facts about Momo by keyword. Returns matching facts about hobbies, food, travel, personality, fun Q&A, etc. Only returns public-safe information — never PII.",
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keyword or phrase (e.g. "favorite food", "hobbies", "travel")' },
        limit: { type: 'number', description: 'Max results to return (default 8)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'listFactsByCategory',
    description: "List all public-safe facts in a given category. Categories: hobbies, food, travel, personality, fun, tech.",
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Fact category (hobbies, food, travel, personality, fun, tech)' },
      },
      required: ['category'],
    },
  },
]

export const runtime = 'nodejs'

// GET: simple handshake for tooling / browser checks
export async function GET() {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  const handshake = {
    name: 'momo-ai-mcp',
    version: '1.0.0',
    tools: toolsList,
  }
  return NextResponse.json(handshake)
}

// Tool implementations
type ToolName = 'getProfile' | 'getCareer' | 'getSkills'

async function getProfile() {
  const result = await prisma.profile.findFirst()
  try {
    console.log('getProfile called, result:', JSON.stringify(result))
  } catch (e) {
    console.log('getProfile called, result (non-serializable)')
  }
  return result
}

async function getCareer() {
  const result = await prisma.resume.findMany({ orderBy: { startDate: 'desc' } })
  try {
    console.log('getCareer called, result:', JSON.stringify(result))
  } catch (e) {
    console.log('getCareer called, result (non-serializable)')
  }
  return result
}

async function getSkills() {
  const result = await prisma.skill.findMany({ orderBy: { category: 'asc' } })
  try {
    console.log('getSkills called, result:', JSON.stringify(result))
  } catch (e) {
    console.log('getSkills called, result (non-serializable)')
  }
  return result
}

// POST: JSON-RPC 2.0 MCP support (initialize, tools/list, tools/call)
export async function POST(req: Request) {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  try {
    const raw = await req.text()
    console.log('MCP JSON-RPC raw request:', raw)

    let payload: any = {}
    try {
      payload = raw ? JSON.parse(raw) : {}
    } catch (e) {
      console.warn('MCP JSON-RPC failed to parse JSON:', String(e))
      return NextResponse.json({ error: 'invalid json' }, { status: 400 })
    }

    console.log('MCP JSON-RPC parsed payload:', JSON.stringify(payload))

    const { method, params, id, jsonrpc } = payload || {}

    if (jsonrpc && jsonrpc !== '2.0') {
      console.warn('MCP JSON-RPC unexpected version:', jsonrpc)
    }

    const rpcResponse = (resultBody: any) => NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result: resultBody })

    if (method === 'initialize') {
      const handshake = {
        name: 'momo-ai-mcp',
        version: '1.0.0',
        tools: toolsList,
      }
      console.log('MCP initialize ->', handshake)
      return rpcResponse(handshake)
    }

    if (method === 'tools/list') {
      console.log('MCP tools/list ->', toolsList)
      return rpcResponse({ tools: toolsList })
    }

    if (method === 'tools/call') {
      // Accept either params.message.toolCallList or params.toolCallList or a single toolCall in params
      const toolCallList: any[] = params?.message?.toolCallList || params?.toolCallList || (params ? [params] : [])

      if (!Array.isArray(toolCallList) || toolCallList.length === 0) {
        console.warn('MCP tools/call missing toolCallList')
        return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code: -32602, message: 'invalid params' } }, { status: 400 })
      }

      // Execute each call and gather content entries
      const content: Array<{ type: 'text'; text: string }> = []

      for (const call of toolCallList) {
        const callId = call?.id || call?.toolCallId || 'generated-1'
        const fnName: string | undefined = call?.function?.name || call?.functionName || call?.name || params?.name
        const argsRaw = call?.function?.arguments ?? call?.arguments ?? '{}'
        let args: any = {}
        if (typeof argsRaw === 'string') {
          try {
            args = argsRaw ? JSON.parse(argsRaw) : {}
          } catch (e) {
            args = {}
          }
        } else {
          args = argsRaw
        }

        console.log('MCP tools/call received:', fnName, args)

        if (!fnName) {
          content.push({ type: 'text', text: JSON.stringify({ error: 'missing function name' }) })
          continue
        }

        let toolResult: unknown
        try {
          if (fnName === 'getProfile') toolResult = await getProfile()
          else if (fnName === 'getCareer') toolResult = await getCareer()
          else if (fnName === 'getSkills') toolResult = await getSkills()
          else if (fnName === 'searchFacts') toolResult = await searchFacts(args?.query ?? '', args?.limit ?? 8)
          else if (fnName === 'listFactsByCategory') toolResult = await listFactsByCategory(args?.category ?? '')
          else toolResult = { error: `unknown tool: ${fnName}` }
        } catch (e) {
          console.error('MCP tool execution error', e)
          toolResult = { error: 'tool execution error', details: String(e) }
        }

        const text = typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult)
        content.push({ type: 'text', text })
      }

      const resultPayload = { content }
      console.log('MCP tools/call result payload:', JSON.stringify(resultPayload))
      return rpcResponse(resultPayload)
    }

    console.warn('MCP JSON-RPC unknown method:', method)
    return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code: -32601, message: 'method not found' } }, { status: 404 })
  } catch (err) {
    console.error('MCP JSON-RPC route error', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}

// Note: keep default (node) runtime so Prisma (server-only) can be used.
