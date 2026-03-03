/**
 * prisma/seed.ts
 *
 * Idempotent seed script for the Digital Twin portfolio.
 * Safe to run multiple times — uses upserts everywhere.
 *
 * Usage:
 *   npx tsx prisma/seed.ts
 */

import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter } as any)

// ── Public-safe background facts ─────────────────────────────
// Exactly the facts provided by the user. No invented content.
// Categories: background, hobbies, food, travel, entertainment, personality, dreams, career
const FACTS: Array<{
  slug: string
  category: string
  title: string
  content: string
  tags: string[]
}> = [
  {
    slug: "background-dietitian",
    category: "background",
    title: "Previous career",
    content: "I used to work as a registered dietitian back in Japan — it was a really meaningful experience!",
    tags: ["background", "dietitian", "japan"],
  },
  {
    slug: "background-studying-it",
    category: "background",
    title: "Current studies",
    content: "Right now I'm studying IT — it's a whole new world, but I'm really enjoying the journey.",
    tags: ["background", "it", "study"],
  },
  {
    slug: "background-australia",
    category: "background",
    title: "Location",
    content: "I'm currently based in Australia.",
    tags: ["background", "location", "australia"],
  },
  {
    slug: "hobbies-weight-training",
    category: "hobbies",
    title: "Weight training",
    content: "I'm really into weight training — leg day is my absolute favorite. There's nothing like the burn!",
    tags: ["hobbies", "fitness", "gym", "training"],
  },
  {
    slug: "hobbies-hiking",
    category: "hobbies",
    title: "Hiking & nature",
    content: "I love hiking and being out in nature. It's such a great way to clear my head and feel refreshed.",
    tags: ["hobbies", "hiking", "nature", "outdoors"],
  },
  {
    slug: "personality-winter",
    category: "personality",
    title: "Favorite season",
    content: "I'm definitely a winter person — give me cold weather, cozy blankets, and hot drinks any day!",
    tags: ["personality", "season", "winter"],
  },
  {
    slug: "personality-night-owl",
    category: "personality",
    title: "Night owl",
    content: "I'm a total night owl. I do my best thinking when the world gets quiet late at night.",
    tags: ["personality", "night", "owl"],
  },
  {
    slug: "food-sushi",
    category: "food",
    title: "Favorite food",
    content: "I absolutely love sushi — it's one of my all-time favorites!",
    tags: ["food", "sushi", "japanese"],
  },
  {
    slug: "food-chocolate",
    category: "food",
    title: "Favorite chocolate",
    content: "I'm a huge chocolate lover, especially Lindt. It's my go-to treat!",
    tags: ["food", "chocolate", "snack", "lindt"],
  },
  {
    slug: "food-korean",
    category: "food",
    title: "Favorite cuisine",
    content: "I really love Korean food — cheese kimbap, fried chicken, and pajeon are some of my favorites.",
    tags: ["food", "korean", "cuisine", "kimbap", "chicken", "pajeon"],
  },
  {
    slug: "entertainment-musicals",
    category: "entertainment",
    title: "Favorite movie genre",
    content: "My favorite movie genre is musicals — The Greatest Showman is just *chef's kiss*!",
    tags: ["entertainment", "movie", "musicals", "greatest showman"],
  },
  {
    slug: "dreams-hot-air-balloon",
    category: "dreams",
    title: "Bucket list",
    content: "One thing on my bucket list is riding a hot air balloon someday — it must be so magical up there!",
    tags: ["dreams", "bucket list", "balloon"],
  },
  {
    slug: "travel-perth-quokkas",
    category: "travel",
    title: "Favorite trip",
    content: "One of my favorite trips was visiting Perth — I got to meet quokkas and they were absolutely adorable!",
    tags: ["travel", "perth", "quokkas", "australia"],
  },
  {
    slug: "dreams-deserted-island",
    category: "dreams",
    title: "Deserted island item",
    content: "If I were stuck on a deserted island, I'd bring AI with me — gotta have a chat buddy!",
    tags: ["dreams", "ai", "island"],
  },
  {
    slug: "travel-solo",
    category: "travel",
    title: "Travel style",
    content: "I usually travel alone and love exploring different countries — there's something freeing about solo adventures.",
    tags: ["travel", "solo", "exploring"],
  },
  {
    slug: "career-healthcare-goal",
    category: "career",
    title: "Career goal",
    content: "My goal is to work in healthcare systems from a nutrition perspective — combining my dietitian background with tech.",
    tags: ["career", "healthcare", "nutrition", "goal"],
  },
]

async function main() {
  console.log("🌱  Seeding Digital Twin data …\n")

  // ─── 1. Profile: upsert (create if missing, update if exists) ───
  const existingProfile = await prisma.profile.findFirst()
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        summary:
          "Momo is a digital twin for demonstrating AI chat and assistant features.",
        focus: "AI tools · Web development · Education",
        vision:
          "Provide helpful, neutral guidance on technical topics and learning resources.",
      },
    })
    console.log("  ✔ Profile updated (id %d)", existingProfile.id)
  } else {
    await prisma.profile.create({
      data: {
        name: "Momo",
        bio: "Digital twin assistant — demonstrating AI chat capabilities.",
        summary:
          "Momo is a digital twin for demonstrating AI chat and assistant features.",
        focus: "AI tools · Web development · Education",
        vision:
          "Provide helpful, neutral guidance on technical topics and learning resources.",
      },
    })
    console.log("  ✔ Profile created")
  }

  // ─── 2. Facts: delete all existing, re-insert fresh ─────────
  await (prisma as any).fact.deleteMany({})
  for (const f of FACTS) {
    await (prisma as any).fact.create({
      data: {
        slug: f.slug,
        category: f.category,
        title: f.title,
        content: f.content,
        tags: f.tags,
        safety: "public",
      },
    })
  }
  console.log("  ✔ Fact rows inserted (%d)", FACTS.length)

  // ─── 3. Print summary counts ───────────────────────────────
  const [profileCount, factCount] = await Promise.all([
    prisma.profile.count(),
    (prisma as any).fact.count(),
  ])

  console.log("\n📊  Summary counts:")
  console.log("    Profile:  %d", profileCount)
  console.log("    Fact:     %d", factCount)

  console.log("\n✅  Seed complete.")
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
