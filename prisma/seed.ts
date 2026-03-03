/**
 * prisma/seed.ts
 *
 * Backfill script for the Digital Twin interview page.
 * Safe to run multiple times — uses upserts / connectOrCreate.
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

// ── Helper: get-or-create a TechStack row by name ────────────
async function tech(name: string) {
  return prisma.techStack.upsert({
    where: { name },
    update: {},
    create: { name },
  })
}

async function main() {
  console.log("🌱  Seeding Digital Twin data …")

  // ─── 1. Profile update (backfill nullable columns) ──────────
  // Update the first profile row (there should be exactly one)
  const existingProfile = await prisma.profile.findFirst()
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        summary:
          "Momo is an anonymous digital twin for demonstrating AI chat and assistant features. Personal details have been removed.",
        focus: "AI tools \u00b7 Web development \u00b7 Education",
        vision: "Provide helpful, neutral guidance on technical topics and learning resources.",
      },
    })
    console.log("  ✔ Profile updated")
  } else {
    console.log("  ⚠ No existing Profile row found — skipping profile backfill")
  }

  // ─── 2. Tech stacks ─────────────────────────────────────────
  const ts = {
    nextjs:     await tech("Next.js"),
    typescript: await tech("TypeScript"),
    vercel:     await tech("Vercel"),
    neon:       await tech("Neon (PostgreSQL)"),
    prisma:     await tech("Prisma"),
    vercelAI:   await tech("Vercel AI SDK"),
    mcp:        await tech("MCP (Model Context Protocol)"),
    v0:         await tech("v0"),
    ngrok:      await tech("ngrok"),
    github:     await tech("GitHub"),
    clickup:    await tech("ClickUp"),
    tailwind:   await tech("Tailwind CSS"),
    react:      await tech("React"),
    lms:        await tech("LMS Administration"),
    canva:      await tech("Canva"),
  }
  console.log("  ✔ TechStack rows upserted")

  // ─── 3. Experiences ──────────────────────────────────────────

  // 3a – Generic experience entries (anonymous)
  const sample1 = await prisma.experience.create({
    data: {
      type: "EMPLOYMENT",
      category: "IT",
      title: "AI & Web Tools Project",
      org: "",
      startDate: new Date(),
      endDate: null,
      description:
        "Contributed to AI-assisted web tooling and prototype development for learning and demo purposes.",
      highlights: [
        "Built demo chat and voice assistant features",
        "Implemented tool integration and prototyping workflows",
      ],
      sortOrder: 1,
    },
  })
  console.log(`  ✔ Experience created: ${sample1.title}`)

  const sample2 = await prisma.experience.create({
    data: {
      type: "EMPLOYMENT",
      category: "EDU",
      title: "Learning Platform Work",
      org: "",
      startDate: new Date(),
      endDate: null,
      description: "Worked on educational tooling and course platform support.",
      highlights: ["Course page design", "Content management"],
      sortOrder: 0,
    },
  })
  console.log(`  ✔ Experience created: ${sample2.title}`)

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
