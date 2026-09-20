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
}

const DEFAULT_PRICING: GeoPricingInfo = {
  country: 'DEFAULT',
  isSaudi: false,
  isSyria: false,
  isLoading: true,
  currentPrice: `${DEFAULT_COURSE_PRICE}$`,
  originalPrice: `${DEFAULT_REGULAR_PRICE}$`,
  approxUsdNote: '',
  topBannerPrice: `${DEFAULT_COURSE_PRICE}$`,
  checkoutAmount: DEFAULT_COURSE_PRICE,
  buttonLabel: `ادفع أونلاين الآن (${DEFAULT_COURSE_PRICE}$) — تفعيل فوري`,
  mobileButtonLabel: `ادفع أونلاين ${DEFAULT_COURSE_PRICE}$ (تفعيل فوري)`,
  currencySymbol: '$',
}

const SAUDI_PRICING: GeoPricingInfo = {
  country: 'SA',
  isSaudi: true,
  isSyria: false,
  isLoading: false,
  currentPrice: `${SAUDI_COURSE_PRICE_SAR} ر.س`,
  originalPrice: `${SAUDI_REGULAR_PRICE_SAR} ر.س`,
  approxUsdNote: `(ما يعادل تقريباً ${SAUDI_COURSE_PRICE_USD}$)`,
  topBannerPrice: `${SAUDI_COURSE_PRICE_SAR} ر.س`,
  checkoutAmount: SAUDI_COURSE_PRICE_USD,
  buttonLabel: `ادفع أونلاين الآن (${SAUDI_COURSE_PRICE_SAR} ر.س / ${SAUDI_COURSE_PRICE_USD}$) — تفعيل فوري`,
  mobileButtonLabel: `ادفع أونلاين ${SAUDI_COURSE_PRICE_SAR} ر.س (تفعيل فوري)`,
  currencySymbol: 'ر.س',
}

export function useGeoPricing(): GeoPricingInfo {
  const [pricing, setPricing] = useState<GeoPricingInfo>(DEFAULT_PRICING)

  useEffect(() => {
    // 1. التحقق من وجود المعامل في الرابط للاختبار (مثال: ?country=SA أو ?geo=SA)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const forcedCountry = (params.get('country') || params.get('geo'))?.toUpperCase()

      if (forcedCountry === 'SA' || forcedCountry === 'KSA' || forcedCountry === 'SAUDI') {
        setPricing(SAUDI_PRICING)
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
      const cached = sessionStorage.getItem('geo_pricing_country')
      if (cached) {
        if (cached === 'SA') {
          setPricing(SAUDI_PRICING)
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
          const detectedCountry = data?.country?.toUpperCase() || ''
          const isSaudi = data?.isSaudi === true || detectedCountry === 'SA'

          if (isSaudi) {
            sessionStorage.setItem('geo_pricing_country', 'SA')
            setPricing(SAUDI_PRICING)
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
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            if (timeZone && (timeZone.includes('Riyadh') || timeZone.includes('Saudi'))) {
              sessionStorage.setItem('geo_pricing_country', 'SA')
              setPricing(SAUDI_PRICING)
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
    }
  }, [])

  return pricing
}
