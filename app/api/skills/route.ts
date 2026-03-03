import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'

export async function GET() {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' }
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}