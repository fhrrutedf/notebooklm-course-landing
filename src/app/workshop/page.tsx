'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, MessageCircle, Shield, Sparkles } from 'lucide-react'

export default function WorkshopPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = new FormData(event.currentTarget)
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      subject: String(form.get('subject') || ''),
    }

    try {
      const response = await fetch('/api/workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.message)
      setStatus('success')
      setMessage('تم تسجيلك بنجاح. سنرسل لك تفاصيل الورشة وموعدها على البريد ورقم WhatsApp.')
      event.currentTarget.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'تعذر إتمام التسجيل الآن.')
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#FBFAF7] text-[#152238]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <nav className="border-b border-[#DCE3E1] bg-[#FBFAF7]/95 px-4 py-4">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <Link href="/" className="text-sm font-bold text-[#152238]">كورس الذكاء الاصطناعي للمعلمين</Link>
          <Link href="/" className="text-sm font-bold text-[#0F766E]">العودة إلى صفحة الكورس</Link>
        </div>
      </nav>

      <section className="border-b border-[#DCE3E1] bg-[#FBFAF7]">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#0F766E]"><span className="h-2 w-2 rounded-full bg-[#C89B3C]" /> ورشة مجانية للمعلمين</p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.4] tracking-tight md:text-6xl">تعلّم كيف تحوّل مصدرك إلى محتوى تعليمي جاهز بدون ما تبدأ كل مرة من الصفر.</h1>
            <p className="mt-6 max-w-xl text-base leading-[2] text-[#5E6B78] md:text-xl">جلسة عملية للمعلمين السوريين نشرح فيها المسار الذي يساعدك تحضّر شرحًا، اختبارًا، ورقة PDF أو مادة تعليمية بطريقة أوضح وأسرع.</p>
            <div className="mt-8 grid gap-4 text-sm font-bold text-[#3E5361] sm:grid-cols-2">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#0F766E]" /> مناسبة للمبتدئين</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#0F766E]" /> تطبيق عملي مباشر</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#0F766E]" /> أمثلة من عمل المعلم</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#0F766E]" /> بدون التزام بالشراء</span>
            </div>
          </div>

          <div className="border border-[#B9D2CD] bg-white p-6 shadow-[0_20px_50px_rgba(21,34,56,0.1)] md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#DCE3E1] pb-5">
              <div><p className="text-sm font-bold text-[#C89B3C]">احجز مقعدك</p><h2 className="mt-2 text-2xl font-bold">سجّل للورشة المجانية</h2></div>
              <Sparkles className="h-6 w-6 text-[#0F766E]" />
            </div>
            {status === 'success' ? (
              <div className="border border-[#B9D2CD] bg-[#EAF4F1] p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#0F766E]" />
                <p className="mt-4 font-bold leading-[1.9]">{message}</p>
                <Link href="/" className="mt-6 inline-flex rounded-full bg-[#0F766E] px-6 py-3 text-sm font-bold text-white">تعرّف على الكورس</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-bold">الاسم الكامل<input name="name" required minLength={2} className="mt-2 w-full border border-[#DCE3E1] bg-[#FBFAF7] px-4 py-3 outline-none transition focus:border-[#0F766E]" placeholder="مثال: أحمد محمد" /></label>
                <label className="block text-sm font-bold">البريد الإلكتروني<input name="email" type="email" required className="mt-2 w-full border border-[#DCE3E1] bg-[#FBFAF7] px-4 py-3 outline-none transition focus:border-[#0F766E]" placeholder="name@example.com" /></label>
                <label className="block text-sm font-bold">رقم WhatsApp<input name="phone" type="tel" required className="mt-2 w-full border border-[#DCE3E1] bg-[#FBFAF7] px-4 py-3 outline-none transition focus:border-[#0F766E]" placeholder="09xxxxxxxx" /></label>
                <label className="block text-sm font-bold">المادة أو المرحلة التي تدرّسها <span className="font-normal text-[#71808A]">(اختياري)</span><input name="subject" className="mt-2 w-full border border-[#DCE3E1] bg-[#FBFAF7] px-4 py-3 outline-none transition focus:border-[#0F766E]" placeholder="رياضيات، عربي، تاريخ..." /></label>
                <button type="submit" disabled={status === 'loading'} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F766E] px-6 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(15,118,110,0.2)] transition hover:bg-[#115E59] disabled:cursor-wait disabled:opacity-70">{status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />} سجّلني في الورشة</button>
                {status === 'error' && <p className="text-sm font-bold text-[#A34F4F]">{message}</p>}
                <p className="flex items-start gap-2 text-xs leading-[1.8] text-[#71808A]"><Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" /> نستخدم بياناتك لإرسال تفاصيل الورشة والتذكيرات المتعلقة بها فقط، ولا تحتاج أن تدفع أو تسجل في الكورس حتى تحضر الورشة.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#152238] px-5 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-[900px] text-center"><p className="text-sm font-bold text-[#D9B96C]">ماذا ستخرج به؟</p><h2 className="mt-4 text-3xl font-bold leading-[1.45] md:text-5xl">خريطة واضحة من المصدر إلى المخرج التعليمي</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-[2] text-white/70">ستشاهد أمثلة عملية على استخراج الأفكار والأسئلة، إعداد ورقة PDF، بناء عرض أو شرح، ثم مراجعة الناتج قبل استخدامه مع الطلاب.</p></div>
      </section>
    </main>
  )
}
