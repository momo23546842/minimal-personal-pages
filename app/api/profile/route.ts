import { NextResponse } from 'next/server'
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'

export async function GET() {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  try {
    const { prisma } = await import('@/lib/prisma')
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}