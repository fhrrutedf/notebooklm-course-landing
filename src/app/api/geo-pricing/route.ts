import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Try to get the user's country from IP
    // Using multiple fallback approaches

    // Approach 1: Check if there's a country header from CDN/proxy
    const cfCountry = request.headers.get('cf-ipcountry');
    if (cfCountry) {
      return NextResponse.json({
        isSyria: cfCountry.toUpperCase() === 'SY',
        country: cfCountry.toUpperCase(),
      });
    }

    // Approach 2: Check x-vercel-ip-country (Vercel)
    const vercelCountry = request.headers.get('x-vercel-ip-country');
    if (vercelCountry) {
      return NextResponse.json({
        isSyria: vercelCountry.toUpperCase() === 'SY',
        country: vercelCountry.toUpperCase(),
      });
    }

    // Approach 3: Get IP and use free geo API
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0]?.trim() || realIp || '';

    if (ip && ip !== '127.0.0.1' && ip !== '::1') {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/country/`, {
          signal: AbortSignal.timeout(3000),
        });
        if (geoRes.ok) {
          const country = (await geoRes.text()).trim().toUpperCase();
          return NextResponse.json({
            isSyria: country === 'SY',
            country,
          });
        }
      } catch {
        // Geo API failed, fallback
      }
    }

    // Fallback: Default to Syria price (more users are Syrian)
    return NextResponse.json({
      isSyria: true,
      country: 'DEFAULT',
    });
  } catch {
    return NextResponse.json({
      isSyria: true,
      country: 'ERROR',
    });
  }
}
