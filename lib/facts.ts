/**
 * lib/facts.ts
 *
 * Shared helpers for querying the Fact table.
 * Used by both the MCP tool endpoint and the chat route.
 * Only returns rows where safety = "public".
 */

import { prisma } from "@/lib/prisma"

export interface FactRow {
  id: number
  slug: string
  category: string
  title: string
  content: string
  tags: string[]
  safety: string
  updatedAt: Date
}

/**
 * Free-text search across category, title, content, and tags.
 *
 * Strategy:
 * 1. Strip stop-words from the user query to avoid noise.
 * 2. Two-phase retrieval:
 *    a) Category matches — facts whose category matches an inferred topic.
 *    b) Keyword matches  — facts whose title/content/tags match remaining words.
 * 3. Merge, deduplicate, and cap at `limit`.
 */

// ── Stop words to ignore ─────────────────────────────────────
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
  "do", "does", "did", "will", "would", "could", "should", "shall",
  "can", "may", "might", "must",
  "i", "me", "my", "mine", "you", "your", "yours",
  "he", "she", "it", "we", "they", "them", "his", "her", "its", "our", "their",
  "this", "that", "these", "those",
  "of", "in", "on", "at", "to", "for", "with", "by", "from", "about",
  "and", "or", "but", "not", "no", "so", "if", "then",
  "what", "which", "who", "whom", "how", "when", "where", "why",
  "tell", "show", "give", "know", "like", "please", "just", "also",
  "some", "any", "all", "more", "most", "very", "really", "much",
  "have", "has", "had", "get", "got", "let", "make",
  "thing", "things", "something", "anything",
  "momo", "momos", "favorite", "favourite", "fav",
  "before", "after",
])

// ── Category keyword mapping ─────────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  // food
  food: "food",
  cuisine: "food",
  drink: "food",
  drinks: "food",
  snack: "food",
  snacks: "food",
  dessert: "food",
  desserts: "food",
  eat: "food",
  eating: "food",
  cook: "food",
  cooking: "food",
  recipe: "food",
  ramen: "food",
  sushi: "food",
  chocolate: "food",
  lindt: "food",
  korean: "food",
  kimbap: "food",
  chicken: "food",
  pajeon: "food",
  // hobbies
  hobby: "hobbies",
  hobbies: "hobbies",
  interest: "hobbies",
  interests: "hobbies",
  hiking: "hobbies",
  gym: "hobbies",
  training: "hobbies",
  fitness: "hobbies",
  exercise: "hobbies",
  weight: "hobbies",
  // travel
  travel: "travel",
  trip: "travel",
  destination: "travel",
  country: "travel",
  countries: "travel",
  visit: "travel",
  perth: "travel",
  quokka: "travel",
  quokkas: "travel",
  solo: "travel",
  explore: "travel",
  exploring: "travel",
  // personality
  personality: "personality",
  mbti: "personality",
  values: "personality",
  trait: "personality",
  traits: "personality",
  winter: "personality",
  night: "personality",
  owl: "personality",
  season: "personality",
  // entertainment
  entertainment: "entertainment",
  movie: "entertainment",
  movies: "entertainment",
  music: "entertainment",
  musical: "entertainment",
  musicals: "entertainment",
  showman: "entertainment",
  film: "entertainment",
  // dreams
  dream: "dreams",
  dreams: "dreams",
  bucket: "dreams",
  wish: "dreams",
  someday: "dreams",
  balloon: "dreams",
  island: "dreams",
  deserted: "dreams",
  // background
  background: "background",
  australia: "background",
  live: "background",
  based: "background",
  location: "background",
  dietitian: "background",
  japan: "background",
  // career
  career: "career",
  job: "career",
  work: "career",
  study: "career",
  studying: "career",
  nutrition: "career",
  healthcare: "career",
  goal: "career",
  future: "career",
  // fun (alias — maps to entertainment + dreams for broad queries)
  fun: "entertainment",
  color: "personality",
  colour: "personality",
  pet: "personality",
  pets: "personality",
  cat: "personality",
  dog: "personality",
  animal: "personality",
  // Japanese keywords (common queries)
  "食べ物": "food",
  "食事": "food",
  "料理": "food",
  "寿司": "food",
  "チョコ": "food",
  "韓国": "food",
  "キンパ": "food",
  "趣味": "hobbies",
  "ハイキング": "hobbies",
  "筋トレ": "hobbies",
  "旅行": "travel",
  "旅": "travel",
  "一人旅": "travel",
  "パース": "travel",
  "クオッカ": "travel",
  "性格": "personality",
  "冬": "personality",
  "夜型": "personality",
  "映画": "entertainment",
  "ミュージカル": "entertainment",
  "夢": "dreams",
  "バケットリスト": "dreams",
  "気球": "dreams",
  "無人島": "dreams",
  "キャリア": "career",
  "仕事": "career",
  "栄養": "career",
  "管理栄養士": "background",
  "日本": "background",
  "オーストラリア": "background",
  "勉強": "career",
}

/**
 * Infer zero or more fact categories from query text.
 * Checks both single keywords and common multi-word phrases.
 */
function inferCategories(query: string): string[] {
  const lower = query.toLowerCase().replace(/[^\w\s\u3000-\u9FFF\uFF00-\uFFEF]/g, "")
  const words = lower.split(/\s+/)
  const cats = new Set<string>()

  for (const w of words) {
    const mapped = CATEGORY_MAP[w]
    if (mapped) cats.add(mapped)
  }

  // Also check if any CATEGORY_MAP key appears as a substring (for CJK / non-spaced languages)
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (key.length >= 1 && /[^\x00-\x7F]/.test(key) && lower.includes(key)) cats.add(cat)
    else if (key.length >= 2 && lower.includes(key)) cats.add(cat)
  }

  // Multi-word phrase overrides
  if (/favou?rite?\s+food/i.test(lower) || /fav\s+food/i.test(lower)) {
    cats.add("food")
  }
  if (/favou?rite?\s+hobb/i.test(lower)) { cats.add("hobbies") }
  if (/favou?rite?\s+travel/i.test(lower) || /favou?rite?\s+place/i.test(lower)) { cats.add("travel") }
  if (/favou?rite?\s+movie/i.test(lower) || /favou?rite?\s+film/i.test(lower)) { cats.add("entertainment") }
  if (/favou?rite?\s+season/i.test(lower)) { cats.add("personality") }

  // Phrase-based detection
  if (/\bstudying\s+it\b/i.test(lower) || /\bbefore\s+it\b/i.test(lower) || /\binto\s+it\b/i.test(lower)) cats.add("career")
  if (/\bdietitian/i.test(lower) || /\bnutrition/i.test(lower) || /\bhealthcare/i.test(lower)) cats.add("career")
  if (/\bprevious\s+(career|job|work)/i.test(lower) || /\bbefore\b/i.test(lower)) { cats.add("background"); cats.add("career") }
  if (/\bwhere\b.*\b(live|based|from|located)\b/i.test(query) || /\blocation\b/i.test(lower)) cats.add("background")
  if (/\bbucket\s*list/i.test(lower)) cats.add("dreams")
  if (/\bdeserted\s+island/i.test(lower)) cats.add("dreams")

  // Broad self-intro queries → pull from multiple categories
  if (/\b(about\s+(you|yourself|momo)|introduce|who\s+are\s+you|tell\s+me\s+about)\b/i.test(lower)) {
    cats.add("background")
    cats.add("hobbies")
    cats.add("personality")
  }

  // Japanese phrase detection
  if (/好き.*(食|料理|ご飯|たべもの|食べ物)/.test(query) || /食べ物/.test(query)) cats.add("food")
  if (/好き.*(映画|ムービー)/.test(query)) cats.add("entertainment")
  if (/自己紹介|あなた(について|のこと)|どんな人/.test(query)) {
    cats.add("background"); cats.add("hobbies"); cats.add("personality")
  }
  if (/どこ.*(住|すん|出身|拠点)/.test(query)) cats.add("background")

  return [...cats]
}

/**
 * Remove stop-words and punctuation from query, returning only meaningful keywords (≥2 chars).
 */
function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\w\s\u3000-\u9FFF\uFF00-\uFFEF]/g, "")   // strip punctuation but keep CJK
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w))
}

export async function searchFacts(
  query: string,
  limit = 8
): Promise<FactRow[]> {
  const q = query.trim()
  if (!q) return []

  const inferredCats = inferCategories(q)
  const keywords = extractKeywords(q)

  // Also treat each keyword as a potential category name
  for (const kw of keywords) {
    const mapped = CATEGORY_MAP[kw]
    if (mapped && !inferredCats.includes(mapped)) inferredCats.push(mapped)
  }

  const seen = new Set<number>()
  const merged: FactRow[] = []

  // ── Phase 1: category matches (high relevance) ────────────
  if (inferredCats.length > 0) {
    const catConditions = inferredCats.map((cat) => ({
      category: { equals: cat, mode: "insensitive" as const },
    }))
    const catResults = await (prisma as any).fact.findMany({
      where: {
        safety: "public",
        OR: catConditions,
      },
      take: limit,
      orderBy: { updatedAt: "desc" },
    }) as FactRow[]

    for (const r of catResults) {
      if (!seen.has(r.id)) { seen.add(r.id); merged.push(r) }
    }
  }

  // ── Phase 2: keyword matches (broader recall) ─────────────
  if (merged.length < limit && keywords.length > 0) {
    const orConditions = keywords.flatMap((kw) => [
      { title: { contains: kw, mode: "insensitive" as const } },
      { content: { contains: kw, mode: "insensitive" as const } },
      { tags: { has: kw } },
    ])

    const kwResults = await (prisma as any).fact.findMany({
      where: {
        safety: "public",
        OR: orConditions,
      },
      take: limit,
      orderBy: { updatedAt: "desc" },
    }) as FactRow[]

    for (const r of kwResults) {
      if (merged.length >= limit) break
      if (!seen.has(r.id)) { seen.add(r.id); merged.push(r) }
    }
  }

  return merged
}

/**
 * Return all public facts in a given category.
 */
export async function listFactsByCategory(
  category: string
): Promise<FactRow[]> {
  const results = await (prisma as any).fact.findMany({
    where: {
      safety: "public",
      category: { equals: category.trim().toLowerCase(), mode: "insensitive" as const },
    },
    orderBy: { title: "asc" },
  })

  return results as FactRow[]
}
