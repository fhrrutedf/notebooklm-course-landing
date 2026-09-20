import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 0. Check query parameter override (e.g. ?country=SA)
    const urlCountry = request.nextUrl.searchParams.get('country') || request.nextUrl.searchParams.get('geo');
    if (urlCountry) {
      const code = urlCountry.trim().toUpperCase();
      return NextResponse.json({
        isSaudi: code === 'SA' || code === 'KSA',
        isSyria: code === 'SY',
        country: code,
      });
    }

    // Approach 1: Check Cloudflare country header
    const cfCountry = request.headers.get('cf-ipcountry');
    if (cfCountry) {
      const code = cfCountry.trim().toUpperCase();
      return NextResponse.json({
        isSaudi: code === 'SA',
        isSyria: code === 'SY',
        country: code,
      });
    }

    // Approach 2: Check Vercel country header
    const vercelCountry = request.headers.get('x-vercel-ip-country');
    if (vercelCountry) {
      const code = vercelCountry.trim().toUpperCase();
      return NextResponse.json({
        isSaudi: code === 'SA',
        isSyria: code === 'SY',
        country: code,
      });
    }

    // Approach 3: Get IP and use geo API
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0]?.trim() || realIp || '';

    if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
      try {
        const geoRes = await fetch(`https://api.country.is/${ip}`, {
          signal: AbortSignal.timeout(2500),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const country = (geoData?.country || '').trim().toUpperCase();
          if (country) {
            return NextResponse.json({
              isSaudi: country === 'SA',
              isSyria: country === 'SY',
              country,
            });
          }
        }
      } catch {
        // First API failed, try ipapi fallback
        try {
          const fallbackRes = await fetch(`https://ipapi.co/${ip}/country/`, {
            signal: AbortSignal.timeout(2500),
          });
          if (fallbackRes.ok) {
            const country = (await fallbackRes.text()).trim().toUpperCase();
            return NextResponse.json({
              isSaudi: country === 'SA',
              isSyria: country === 'SY',
              country,
            });
          }
        } catch {
          // Fallback failed
        }
      }
    }

    // Default:
    return NextResponse.json({
      isSaudi: false,
      isSyria: false,
      country: 'DEFAULT',
    });
  } catch {
    return NextResponse.json({
      isSaudi: false,
      isSyria: false,
      country: 'ERROR',
    });
  }
}
