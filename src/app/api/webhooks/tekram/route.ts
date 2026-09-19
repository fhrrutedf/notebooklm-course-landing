import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    console.log('[Tekram Webhook Received]:', JSON.stringify(payload, null, 2))

    // Payload typically contains order_id, amount, status, seller, buyer info
    // You can process database records, trigger email/telegram notification here

    return NextResponse.json({
      status: 'success',
      received: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Tekram Webhook Error]:', error)
    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Tekram webhook endpoint is active.',
  })
}
