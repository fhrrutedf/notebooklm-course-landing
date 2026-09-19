'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, MessageCircle, Send, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react'

const WHATSAPP_NUMBER = '963985323170'

export default function ThankYouClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id') || 'مكتمل'
  const affiliateRef = searchParams.get('ref') || ''

  const whatsappMessage = `مرحباً، لقد أتممت الدفع بنجاح عبر تكرام باي برقم الطلب: ${orderId}. أريد استلام رابط التفعيل والمتابعة عبر Telegram.`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F8F8F6] text-[#242424] flex flex-col justify-between"
      style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}
    >
      {/* رأس الصفحة */}
      <header className="border-b border-[#E2E2DF] bg-white py-4 px-6 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3342F] text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-bold text-base md:text-lg">كورس الذكاء الاصطناعي للمعلمين</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#666666] hover:text-[#E3342F] transition"
          >
            <span>العودة للرئيسية</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex items-center justify-center p-5 md:p-8">
        <div className="w-full max-w-2xl bg-white border border-[#E2E2DF] rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center">
          {/* أيقونة النجاح */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-black text-emerald-800">
            🎉 تم تأكيد الدفع بنجاح
          </span>

          <h1 className="mt-4 text-2xl md:text-4xl font-black text-[#242424] leading-tight">
            مبارك! تم حجز مقعدك في الكورس بنجاح
          </h1>

          <p className="mt-3 text-sm md:text-base text-[#666666] leading-relaxed max-w-xl mx-auto">
            شكراً لثقتك واشتراكك. تم تأكيد عمليتك المالية بنجاح وأمان.
          </p>

          {/* تفاصيل الطلب */}
          <div className="mt-6 rounded-2xl bg-[#F8F8F6] border border-[#E2E2DF] p-4 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
              <span className="text-[#666666]">رقم مرجع الطلب (Order ID):</span>
              <span className="font-mono font-bold text-[#E3342F] bg-white px-3 py-1 rounded-lg border border-[#E2E2DF] inline-block">
                {orderId}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E2E2DF] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
              <span className="text-[#666666]">حالة العملية:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> مدفوع ومكتمل
              </span>
            </div>
          </div>

          {/* خطوات التفعيل الفوري */}
          <div className="mt-8 text-right bg-gradient-to-br from-amber-50/90 to-orange-50/50 border border-amber-200/80 rounded-2xl p-5">
            <h2 className="font-black text-amber-950 text-base flex items-center gap-2">
              <span>🚀</span>
              <span>الخطوة التالية لبدء دراسة الكورس فوراً:</span>
            </h2>
            <p className="mt-2 text-xs md:text-sm text-amber-900/90 leading-loose">
              لإضافتك إلى مجموعة التدريب الخاصة على <strong>Telegram</strong> وتسليمك كافة الحقائب وملخصات الـ PDF والقوالب التفاعلية، اضغط على الزر أدناه لإرسال رقم طلبك إلى فريق الدعم وسيتم تفعيل حسابك فوراً خلال دقائق!
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 px-6 shadow-md transition transform hover:scale-[1.01]"
            >
              <MessageCircle className="h-5 w-5" />
              <span>تفعيل حسابي واستلام الكورس عبر WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#888888]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> ضمان استرجاع كامل 7 أيام
            </span>
            <span>•</span>
            <span>دعم فني ومتابعة شخصية مستمرة</span>
          </div>
        </div>
      </main>

      {/* تذييل */}
      <footer className="py-4 text-center text-xs text-[#888888]">
        © {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين · دفع آمن وتفعيل فوري
      </footer>
    </div>
  )
}
