import { Suspense } from 'react'
import type { Metadata } from 'next'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'تم تأكيد اشتراكك بنجاح | كورس الذكاء الاصطناعي للمعلمين',
  description: 'شكراً لاشتراكك في كورس الذكاء الاصطناعي للمعلمين. ابدأ الآن وتواصل للحصول على التفعيل الفوري.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6] text-[#242424]">
          <div className="text-center p-8">
            <div className="w-12 h-12 border-4 border-[#E3342F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold">جاري تحميل تفاصيل طلبك...</p>
          </div>
        </div>
      }
    >
      <ThankYouClient />
    </Suspense>
  )
}
