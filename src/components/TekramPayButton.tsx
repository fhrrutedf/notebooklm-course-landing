'use client'

import React, { useState } from 'react'
import { Lock, Sparkles, CreditCard, ArrowLeft } from 'lucide-react'
import { openTekramCheckout, DEFAULT_COURSE_PRICE, COURSE_TITLE } from '@/lib/tekram'
import { track } from '@vercel/analytics'

interface TekramPayButtonProps {
  amount?: number
  title?: string
  affiliateRef?: string
  source?: string
  className?: string
  showBadges?: boolean
  label?: string
}

export function TekramPayButton({
  amount = DEFAULT_COURSE_PRICE,
  title = COURSE_TITLE,
  affiliateRef = '',
  source = 'landing_hero',
  className = '',
  showBadges = true,
  label,
}: TekramPayButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = () => {
    setIsLoading(true)

    // Track analytics event
    try {
      track('tekram_checkout_click', {
        amount,
        source,
        affiliate_ref: affiliateRef || 'direct',
      })

      if (typeof window !== 'undefined') {
        if (typeof (window as any).gtag === 'function') {
          ;(window as any).gtag('event', 'begin_checkout', {
            currency: 'USD',
            value: amount,
            item_name: title,
            button_location: source,
          })
        }
        if (typeof (window as any).fbq === 'function') {
          ;(window as any).fbq('track', 'InitiateCheckout', {
            value: amount,
            currency: 'USD',
            content_name: title,
          })
        }
      }
    } catch (e) {
      console.warn('Analytics tracking error:', e)
    }

    // Call Tekram Pay
    try {
      openTekramCheckout({
        amount,
        desc: title,
        affiliateRef,
        onCancel: () => {
          setIsLoading(false)
        },
      })
    } catch (err) {
      console.error('Checkout error:', err)
      setIsLoading(false)
    }

    // Reset loading after timeout as safety
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className={`group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-98 disabled:opacity-75 disabled:pointer-events-none ${className}`}
        style={{
          backgroundColor: '#E3342F',
          backgroundImage: 'linear-gradient(135deg, #E3342F 0%, #B92723 100%)',
        }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>جاري تجهيز الدفع...</span>
          </span>
        ) : (
          <>
            <Lock className="h-4 w-4 opacity-90" />
            <span>{label || `ادفع الآن أونلاين (${amount}$)`}</span>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </>
        )}
      </button>

      {showBadges && (
        <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] font-bold text-[#666666] flex-wrap">
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            ✓ دفع آمن وفوري
          </span>
          <span className="text-[#888888]">يدعم:</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 font-semibold border border-slate-200">شام كاش</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 font-semibold border border-slate-200">مدى</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 font-semibold border border-slate-200">فيزا / ماستركارد</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 font-semibold border border-slate-200">بايبال</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 font-semibold border border-slate-200">تكرام باي</span>
        </div>
      )}
    </div>
  )
}
