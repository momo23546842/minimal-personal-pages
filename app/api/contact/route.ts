import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Save to database (best-effort)
    try {
      await prisma.contactMessage.create({
        data: { name, email, message },
      })
    } catch (dbErr) {
      console.error('DB save failed (table may not exist yet):', dbErr)
      // Continue to send email even if DB fails
    }

    // Send email notification via Resend; require configuration via env vars only
    const resendKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM
    const notifyTo = process.env.RESEND_NOTIFY_TO

    if (!resendKey || !from || !notifyTo) {
      console.error('Email configuration missing')
      return NextResponse.json({ error: 'Email configuration missing' }, { status: 500 })
    }

    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from,
        to: notifyTo,
        subject: `New message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color:#888;font-size:12px">Sent from Momo's portfolio</p>
        `,
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
