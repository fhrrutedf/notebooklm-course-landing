'use client'

import { useState, useEffect } from 'react'
import {
  DEFAULT_COURSE_PRICE,
  DEFAULT_REGULAR_PRICE,
  SAUDI_COURSE_PRICE_SAR,
  SAUDI_REGULAR_PRICE_SAR,
  SAUDI_COURSE_PRICE_USD,
} from '@/lib/tekram'

export interface GeoPricingInfo {
  country: string
  isSaudi: boolean
  isGulf: boolean
  isSyria: boolean
  isLoading: boolean
  // النصوص المعروضة
  currentPrice: string
  originalPrice: string
  approxUsdNote: string
  topBannerPrice: string
  // قيم الدفع
  checkoutAmount: number
  buttonLabel: string
  mobileButtonLabel: string
  currencySymbol: string
  hideShamCash: boolean
}

const GULF_CODES = new Set(['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'KSA', 'UAE', 'GULF', 'GCC'])

export const DEFAULT_PRICING: GeoPricingInfo = {
  country: 'DEFAULT',
  isSaudi: false,
  isGulf: false,
  isSyria: false,
  isLoading: true,
  currentPrice: `${DEFAULT_COURSE_PRICE}$`,
  originalPrice: `${DEFAULT_REGULAR_PRICE}$`,
  approxUsdNote: '',
  topBannerPrice: `${DEFAULT_COURSE_PRICE}$`,
  checkoutAmount: DEFAULT_COURSE_PRICE,
  buttonLabel: `ابدأ التسجيل (${DEFAULT_COURSE_PRICE}$)`,
  mobileButtonLabel: `ابدأ التسجيل (${DEFAULT_COURSE_PRICE}$)`,
  currencySymbol: '$',
  hideShamCash: false,
}

export const GULF_PRICING: GeoPricingInfo = {
  country: 'GCC',
  isSaudi: true,
  isGulf: true,
  isSyria: false,
  isLoading: false,
  currentPrice: `${SAUDI_COURSE_PRICE_SAR} ر.س`,
  originalPrice: `${SAUDI_REGULAR_PRICE_SAR} ر.س`,
  approxUsdNote: `(ما يعادل تقريباً ${SAUDI_COURSE_PRICE_USD}$)`,
  topBannerPrice: `${SAUDI_COURSE_PRICE_SAR} ر.س`,
  checkoutAmount: SAUDI_COURSE_PRICE_USD,
  buttonLabel: `ابدأ التسجيل (${SAUDI_COURSE_PRICE_SAR} ر.س)`,
  mobileButtonLabel: `ابدأ التسجيل (${SAUDI_COURSE_PRICE_SAR} ر.س)`,
  currencySymbol: 'ر.س',
  hideShamCash: true,
}

export function useGeoPricing(): GeoPricingInfo {
  const [pricing, setPricing] = useState<GeoPricingInfo>(DEFAULT_PRICING)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. التحقق من وجود المعامل في الرابط للاختبار (مثال: ?country=SA أو ?country=AE أو ?geo=gulf)
    const params = new URLSearchParams(window.location.search)
    const forcedCountry = (params.get('country') || params.get('geo'))?.toUpperCase()

    if (forcedCountry && GULF_CODES.has(forcedCountry)) {
      setPricing({
        ...GULF_PRICING,
        country: forcedCountry,
      })
      return
    }

    if (forcedCountry && forcedCountry !== 'DEFAULT') {
      setPricing({
        ...DEFAULT_PRICING,
        country: forcedCountry,
        isLoading: false,
      })
      return
    }

    // 2. التحقق من الكاش في sessionStorage لتسريع العرض وتجنب الوميض
    const cached = sessionStorage.getItem('geo_pricing_country')?.toUpperCase()
    if (cached) {
      if (GULF_CODES.has(cached)) {
        setPricing({
          ...GULF_PRICING,
          country: cached,
        })
        return
      } else {
        setPricing({
          ...DEFAULT_PRICING,
          country: cached,
          isLoading: false,
        })
        return
      }
    }

    // 3. جلب الدولة من مسار geo-pricing
    fetch('/api/geo-pricing')
      .then((res) => res.json())
      .then((data) => {
        const detectedCountry = (data?.country || '').toUpperCase()
        const isGulf = data?.isGulf === true || data?.isSaudi === true || GULF_CODES.has(detectedCountry)

        if (isGulf) {
          sessionStorage.setItem('geo_pricing_country', detectedCountry || 'GCC')
          setPricing({
            ...GULF_PRICING,
            country: detectedCountry || 'GCC',
            isSaudi: detectedCountry === 'SA' || detectedCountry === 'KSA',
          })
        } else {
          sessionStorage.setItem('geo_pricing_country', detectedCountry || 'OTHER')
          setPricing({
            ...DEFAULT_PRICING,
            country: detectedCountry || 'OTHER',
            isSyria: data?.isSyria === true || detectedCountry === 'SY',
            isLoading: false,
          })
        }
      })
      .catch(() => {
        // في حال فشل الاتصال، فحص المنطقة الزمنية كحل احتياطي ذكي
        try {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
          if (
            timeZone.includes('Riyadh') ||
            timeZone.includes('Saudi') ||
            timeZone.includes('Dubai') ||
            timeZone.includes('Qatar') ||
            timeZone.includes('Kuwait') ||
            timeZone.includes('Bahrain') ||
            timeZone.includes('Muscat')
          ) {
            sessionStorage.setItem('geo_pricing_country', 'GCC')
            setPricing(GULF_PRICING)
            return
          }
        } catch {
          // Ignore
        }
        setPricing({
          ...DEFAULT_PRICING,
          isLoading: false,
        })
      })
  }, [])

  return pricing
}
