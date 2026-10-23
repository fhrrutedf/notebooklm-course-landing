'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  Lock,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import { openTekramCheckout, DEFAULT_COURSE_PRICE } from '@/lib/tekram'
import { track } from '@vercel/analytics'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  amount?: number
  currencySymbol?: string
  displayPrice?: string
  affiliateRef?: string
  source?: string
  hideShamCash?: boolean
  whatsappLink: string
}

export function RegistrationModal({
  isOpen,
  onClose,
  amount = DEFAULT_COURSE_PRICE,
  currencySymbol = '$',
  displayPrice = '22$',
  affiliateRef = '',
  source = 'registration_modal',
  hideShamCash = false,
  whatsappLink,
}: RegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleProceedToGateway = () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      track('registration_modal_proceed', {
        amount,
        source,
        affiliate_ref: affiliateRef || 'direct',
      })
    } catch (e) {
      console.warn('Analytics tracking error:', e)
    }

    try {
      openTekramCheckout({
        amount,
        desc: 'كورس الذكاء الاصطناعي للمعلمين',
        affiliateRef,
        onCancel: () => {
          setIsLoading(false)
        },
      })
    } catch (err) {
      console.error('Checkout launch error:', err)
      setIsLoading(false)
    }

    // Reset loading state after reasonable timeout if modal was closed or iframe loaded
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 2500)
  }

  const isGulf = currencySymbol === 'ر.س'

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir="rtl"
    >
      <div
        className="relative my-auto w-full max-w-lg rounded-3xl bg-white p-5 sm:p-7 text-right shadow-2xl border border-[#E2E2DF] transition-all"
        style={{
          animation: 'modalSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: '#E2E2DF' }}>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3 py-0.5 text-xs font-black text-[#E31E24]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>خطوات التسجيل والتفعيل الفوري</span>
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-[#141414]">
              التسجيل في كورس الذكاء الاصطناعي للمعلمين
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#444] transition hover:bg-slate-200"
            aria-label="إغلاق النافذة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Price Transparency Breakdown */}
        <div className="mt-4 rounded-2xl bg-[#F8F8F6] p-4 border border-[#E2E2DF]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#666]">سعر الكورس الأساسي:</span>
            <span className="text-2xl font-black text-[#E31E24]">{displayPrice}</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-[#555] space-y-2">
            <div className="font-bold text-[#222] flex items-center gap-1.5">
              <span>💳</span>
              <span>توضيح رسوم بوابة الدفع الإلكترونية:</span>
            </div>
            {isGulf ? (
              <p className="leading-relaxed">
                يتم السداد إلكترونياً بقيمة <strong>{displayPrice}</strong> (أو ما يعادله بالدولار حسب وسيلة الدفع)، وتتولى البوابة التحقق البنكي والتفعيل الفوري.
              </p>
            ) : (
              <ul className="space-y-1.5 pr-2 leading-relaxed">
                <li className="flex items-baseline justify-between gap-2">
                  <span>• بالبطاقات البنكية (فيزا / ماستركارد):</span>
                  <span className="font-bold text-[#141414]">تظهر في البوابة 23.50$ (~1.50$ رسوم معالجة)</span>
                </li>
                {!hideShamCash && (
                  <li className="flex items-baseline justify-between gap-2">
                    <span>• عبر شام كاش:</span>
                    <span className="font-bold text-[#141414]">تظهر في البوابة 22.45$ (~0.45$ رسوم معالجة)</span>
                  </li>
                )}
              </ul>
            )}
            <p className="text-[11px] text-[#777] italic">
              * رسوم المعالجة تفرضها وتطبقها بوابة الدفع تلقائياً عند اختيار وسيلة السداد.
            </p>
          </div>
        </div>

        {/* Guidance for 3rd Party Gateway Form */}
        <div className="mt-4 rounded-2xl bg-amber-50/90 p-4 border border-amber-200/80 text-xs leading-relaxed text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900 mb-1.5 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>تنبيه هام عند تعبئة بياناتك في نافذة الدفع:</span>
          </div>
          <p className="text-amber-900/90">
            تفتح بوابة الدفع في نافذة آمنة تتطلب إدخال <strong>الاسم</strong> و<strong>البريد الإلكتروني</strong> و<strong>رقم الموبايل</strong>.
          </p>
          <div className="mt-2 rounded-xl bg-white/80 p-2.5 font-bold text-amber-950 border border-amber-300/60">
            📍 يرجى اختيار مفتاح دولتك (مثل سوريا <span dir="ltr">+963</span> أو السعودية <span dir="ltr">+966</span> أو بلد إقامتك) يدوياً من قائمة الدولة، حيث قد تضع البوابة افتراضياً رمز الإمارات (<span dir="ltr">+971</span>).
          </div>
        </div>

        {/* What You Get Highlights */}
        <div className="mt-4 space-y-1.5 text-xs font-semibold text-[#444] pr-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>وصول فوري ودائم عبر تطبيق Telegram فور إتمام الدفع</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>يشمل 4 جلسات مباشرة للأسئلة والتطبيق العملي</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>ضمان استرجاع كامل لمدة 7 أيام عبر رسالة WhatsApp</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={handleProceedToGateway}
            disabled={isLoading}
            className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-bold text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-98 disabled:opacity-75 disabled:pointer-events-none text-base"
            style={{
              backgroundColor: '#E31E24',
              backgroundImage: 'linear-gradient(135deg, #E31E24 0%, #B92723 100%)',
            }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري فتح بوابة الدفع الآمنة...</span>
              </span>
            ) : (
              <>
                <Lock className="h-4 w-4 opacity-90" />
                <span>المتابعة إلى بوابة الدفع الإلكترونية</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs sm:text-sm font-bold border border-[#E2E2DF] bg-[#F8F8F6] hover:bg-[#F0F0EE] text-[#333] transition shadow-sm"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            <span>أو تواصل للتسجيل والمساعدة عبر WhatsApp</span>
          </a>
        </div>

        <p className="mt-3 text-center text-[11px] text-[#777]">
          🔒 مدعوم بتقنيات تشفير مصرفية متطورة عبر بوابة تكرام باي الرسمية
        </p>
      </div>

      <style jsx>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
