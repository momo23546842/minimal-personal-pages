import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_SAFE_MODE } from '@/lib/safeMode'
import {
  sendBookingConfirmationToGuest,
  sendBookingNotificationToOwner,
} from '../../../lib/email'

export async function POST(req: NextRequest) {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  try {
    const body = await req.json().catch(() => ({})) as any
    const to = body?.to

    const resendKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.RESEND_NOTIFY_TO
    if (!resendKey || !notifyTo) {
      console.error('Email configuration missing for test-email')
      return NextResponse.json({ error: 'Email configuration missing' }, { status: 500 })
    }

    const sample = {
      guestName: body?.guestName ?? 'Test Guest',
      guestEmail: to ?? notifyTo,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      timezone: 'Australia/Sydney',
      meetingLink: body?.meetingLink,
      googleEventId: body?.googleEventId,
      bookingId: body?.bookingId,
    }

    const guest = await sendBookingConfirmationToGuest(sample)
    const owner = await sendBookingNotificationToOwner(sample)

    return NextResponse.json({ guest, owner })
  } catch (err: any) {
    console.error('test-email error', err)
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}

export async function GET() {
  if (PUBLIC_SAFE_MODE) return NextResponse.json({ error: 'Not available' }, { status: 404 })
  return NextResponse.json({ ok: true, message: 'POST to this endpoint to send test emails' })
}
