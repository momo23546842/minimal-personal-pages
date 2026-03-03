import 'dotenv/config'
import * as PrismaPkg from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import { PrismaNeon } from '@prisma/adapter-neon'

neonConfig.webSocketConstructor = ws

// Resolve PrismaClient constructor from the package in a robust way
const PrismaClientConstructor: any = (PrismaPkg as any).PrismaClient ?? (PrismaPkg as any).default ?? PrismaPkg

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

function createMockPrisma() {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      // Return a function for model methods that commonly return arrays or objects
      return new Proxy(() => {}, {
        apply() {
          // heuristics: methods named findMany -> [], findFirst/findUnique -> null, create/update/upsert -> null
          const name = String(prop || '')
          if (name.includes('findMany')) return Promise.resolve([])
          if (name.includes('find')) return Promise.resolve(null)
          if (name.includes('create') || name.includes('update') || name.includes('upsert') || name.includes('delete')) return Promise.resolve(null)
          return Promise.resolve(null)
        },
      })
    },
  }
  // Models used by the app (conversation, profile, resume, skill, experience) will be proxied
  return new Proxy({}, handler)
}

let prismaInstance: any
if (!process.env.DATABASE_URL) {
  // No database configured — expose a lightweight mock so runtime code won't throw
  prismaInstance = createMockPrisma()
} else {
  const adapter = new PrismaNeon({ connectionString: `${process.env.DATABASE_URL}` })
  prismaInstance = globalForPrisma.prisma ?? new PrismaClientConstructor({ adapter, log: ['warn', 'error'] })
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance
  }
}

export const prisma = prismaInstance

