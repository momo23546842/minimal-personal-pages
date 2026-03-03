import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'
import Groq from 'groq-sdk'
import { searchFacts, listFactsByCategory } from '@/lib/facts'

const GROQ_MODEL = 'llama-3.3-70b-versatile'

// ─── System prompts ─────────────────────────────────────────

const MOMO_SYSTEM_PROMPT = `You are Momo, a friendly and cheerful digital twin assistant on a personal website.

## STRICT RULES — read carefully

### PII protection (NEVER violate)
- NEVER reveal or guess: real full name, family names, school/university names, company/employer names, exact dates of birth or employment, email addresses, phone numbers, physical addresses, ID numbers, booking/calendar links, or any other personally identifiable information.
- If a user asks for PII, politely decline and redirect: "I'm not able to share personal details like that, but I'd love to chat about my hobbies, favorites, or interests!"

### Fact sourcing (ALWAYS follow)
- When answering questions about Momo personally (preferences, hobbies, favorites, food, travel, personality, entertainment, dreams, career background), you MUST use ONLY the facts provided in the FACTS_JSON system message.
- Base your answer ONLY on those provided facts. Do NOT invent, hallucinate, or assume any personal information beyond what is in FACTS_JSON.
- If FACTS_JSON is empty or does not contain the requested info, say: "Hmm, I don't have that info yet — but feel free to ask me about my hobbies, food favorites, travel dreams, or fun facts!"
- You may rephrase and present the provided facts in a warm, conversational tone.

### Response style
- Be warm, friendly, and conversational — like chatting with a friend.
- Keep responses medium length (3-5 sentences typically). Not too short, not an essay.
- Use emoji occasionally to keep things fun 🌸
- Avoid sounding like a resume, professional bio, or bullet-point list.
- Occasionally ask the user a follow-up question to keep the conversation going (e.g. "How about you?" or "Have you ever tried that?").

### General behavior
- For general knowledge questions not about Momo personally (e.g. "what is TypeScript?"), answer directly from your training — no fact lookup needed.
- Never mention internal tools, databases, FACTS_JSON, or implementation details to the user.
- This is NOT a work/skills portfolio — do NOT answer questions about professional tech stacks or programming skills.

### Language
- ALWAYS respond in the same language the user is writing in.
- If the user writes in Japanese, reply entirely in Japanese. If in English, reply in English. And so on for any language.
- Keep the same warm, conversational tone regardless of language.
`

const SAFE_MODE_PROMPT = `You are an anonymous assistant. Answer concisely and do NOT reference any personal profile, resume, organization, or private contact details. Keep responses neutral and avoid personal anecdotes.`

// Note: tooling/function-calls removed — we perform server-side retrieval
// of facts and inject them into the model prompt as context.

// ─── Session / conversation persistence ─────────────────────

function getSessionId(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const ua = req.headers.get('user-agent') || ''
  let hash = 0
  const str = ip + ua
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return `session_${Math.abs(hash).toString(36)}`
}

async function saveConversation(sessionId: string, role: string, message: string, mode: string) {
  try {
    await prisma.conversation.create({
      data: { sessionId, role, message, mode },
    })
  } catch (err) {
    console.error('Failed to save conversation:', err)
  }
}

// ─── POST handler ───────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message: string = body?.message || ''
    const mode: string = body?.mode || 'chat'
    const sessionId = getSessionId(req)

    // Save user message
    await saveConversation(sessionId, 'user', message, mode)

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Sorry, the chat service isn't configured yet. Please try again later!" },
        { status: 500 },
      )
    }

    const groq = new Groq({ apiKey })
    const systemPrompt = PUBLIC_SAFE_MODE ? SAFE_MODE_PROMPT : MOMO_SYSTEM_PROMPT

    // Server-side: fetch relevant facts for the user's last message, inject
    // them into the system prompt as JSON, then call the model without tools.
    const userText = String(message || '').trim()
    const limit = 8
    let factsForPrompt: any[] = []
    try {
      if (userText) {
        factsForPrompt = await searchFacts(userText, limit)
      }
    } catch (e) {
      console.error('Facts lookup failed:', e)
      factsForPrompt = []
    }

    // Filter out placeholder facts (content starts with "Not set yet")
    const realFacts = factsForPrompt.filter(f => !f.content?.startsWith('Not set yet'))

    // Build messages: base system prompt, then a strict instruction about
    // using only the provided facts, then the facts JSON, then the user.
    const factsInstruction = `You can answer ONLY using the provided facts. If the facts do not contain the requested info, respond: "I don't have that info yet." Do NOT guess or invent.`
    const factsJson = `FACTS_JSON: ${JSON.stringify(realFacts.map(f => ({ category: f.category, title: f.title, content: f.content })) )}`

    const injectedMessages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: factsInstruction },
      { role: 'system', content: factsJson },
      { role: 'user', content: userText },
    ]

    let replyText = ''
    try {
      const response = await groq.chat.completions.create({ model: GROQ_MODEL, messages: injectedMessages })
      const choice = response.choices?.[0]
      replyText = choice?.message?.content ?? ''
    } catch (e) {
      console.error('Groq completion error:', e)
      replyText = "Sorry, I couldn't process that right now. Please try again!"
    }

    if (!replyText) {
      replyText = "I don't have that info yet — but feel free to ask me about my hobbies, food favorites, travel dreams, or fun facts!"
    }

    // Save assistant reply
    await saveConversation(sessionId, 'assistant', replyText, mode)

    return NextResponse.json({ reply: replyText })
  } catch (err) {
    console.error('Chat route error:', err)
    return NextResponse.json(
      { reply: "Sorry, I couldn't process that right now. Please try again!" },
      { status: 500 },
    )
  }
}
