import { NextRequest, NextResponse } from 'next/server'

// Cache country lookups in memory (simple Map, resets on redeploy)
const geoCache = new Map<string, { country: string; timestamp: number }>()
const CACHE_TTL = 3600 * 1000 // 1 hour

export async function GET(request: NextRequest) {
  try {
    // Get user's IP from headers (Vercel/CDN provides these)
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded
      ? forwarded.split(',')[0].trim()
      : request.headers.get('x-real-ip') || ''

    // Local development - default to Syria for testing
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
      return NextResponse.json({ country: 'SY' })
    }

    // Check in-memory cache
    const cached = geoCache.get(ip)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ country: cached.country })
    }

    // Use free ipapi.co API (1000 req/day free tier)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'Accept': 'application/json' },
    })

    if (!response.ok) {
      return NextResponse.json({ country: 'OTHER' })
    }

    const data = await response.json()
    const countryCode = data.country_code || 'OTHER'

    // Cache the result
    geoCache.set(ip, { country: countryCode, timestamp: Date.now() })

    return NextResponse.json({ country: countryCode })
  } catch {
    return NextResponse.json({ country: 'OTHER' })
  }
}
