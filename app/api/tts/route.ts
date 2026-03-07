import { NextRequest, NextResponse } from 'next/server'

const ELEVENLABS_BASE = 'https://api.elevenlabs.io/v1/text-to-speech'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 })
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    const voiceId = process.env.ELEVENLABS_VOICE_ID

    if (!apiKey || !voiceId) {
      return NextResponse.json(
        { error: 'ElevenLabs not configured' },
        { status: 500 },
      )
    }

    const res = await fetch(`${ELEVENLABS_BASE}/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.4,
          use_speaker_boost: true,
        },
      }),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('ElevenLabs error:', res.status, errBody)
      return NextResponse.json(
        { error: 'TTS generation failed' },
        { status: res.status },
      )
    }

    // Stream the audio bytes back to the client
    const audioBuffer = await res.arrayBuffer()

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('TTS route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
