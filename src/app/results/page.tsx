'use client'

import {
  BookOpen,
  FileText,
  FileOutput,
  Globe,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const WHATSAPP_NUMBER = '963985323170'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم')}`

export default function ResultsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#000] text-white" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      {/* Header - Dark with red CTA */}
      <header className="sticky top-0 z-50 bg-[#000]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-[#A735D7] transition-colors">
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold text-sm">العودة للصفحة الرئيسية</span>
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/20"
          >
            اشترك الآن
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero - Black with gradient text */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#000]">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#614BEB]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A735D7]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#614BEB] to-[#A735D7] text-white px-5 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            عينات حقيقية من نتائج الشغل
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-white">
            شوف شو رح تعمل
            <br />
            بعد{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              الكورس
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            ملفات حقيقية من كتب مدرسية — إنفوجرافيك، عروض تقديمية، فيديوهات، وبودكاست — كل شي معمول بأدوات AI مجانية
          </p>

          {/* Summary icons */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: 'إنفوجرافيك', icon: '✨' },
              { label: 'خريطة ذهنية', icon: '🧠' },
              { label: 'PDF', icon: '📄' },
              { label: 'عرض تقديمي', icon: '📊' },
              { label: 'فيديو تعليمي', icon: '🎬' },
              { label: 'بودكاست صوتي', icon: '🎙️' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[12px] px-4 py-2 flex items-center gap-2 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[#111] font-bold text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chemistry & Science Samples - Dark navy */}
      <section className="py-8 md:py-12 bg-[#011839]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">عينات كيمياء وعلوم</h2>
              <p className="text-white/70 text-sm">ملفات حقيقية من كتب كيمياء وعلوم مدرسية</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chemistry Infographic */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#614BEB]/15 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#614BEB]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">إنفوجرافيك كيمياء</h4>
                  <p className="text-[#565A7C] text-xs">بثواني من كتابك المدرسي</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1GSoYmYvVRESBmufHbArniTMeSrhLZ4qI/preview"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Mind Map */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#A735D7]/15 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#A735D7]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">خريطة ذهنية</h4>
                  <p className="text-[#565A7C] text-xs">ارفع كتابك → خريطة ذهنية جاهزة</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1g3woKWaQwzBx26aKSAv-2bwyMcdQnjDk/preview"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Chemistry Blueprint PDF */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FFD814]/15 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#FFD814]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">مخطط كيمياء - PDF</h4>
                  <p className="text-[#565A7C] text-xs">ملف PDF احترافي جاهز للطباعة</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1ldVt1B0GcWTjav0TyGY3wBFsyYNYe1KC/preview"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Chemistry Presentation PPTX */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E4405F]/15 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-4 h-4 text-[#E4405F]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">عرض تقديمي - مخطط كيمياء</h4>
                  <p className="text-[#565A7C] text-xs">شرائح احترافية من محتواك</p>
                </div>
              </div>
              <iframe
                src="https://docs.google.com/presentation/d/1tCPwC6a5DkkuzOyJyCdQzl-h-msNu_oo/embed"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Science Video */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#06b6d4]/15 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">فيديو تعليمي - علوم</h4>
                  <p className="text-[#565A7C] text-xs">شاركو مع طلابك عبر واتساب</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1gVPnr4gh-Oh7Nm2Js5KddZTXxVhofZJs/preview"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Chemistry Video */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#614BEB]/15 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#614BEB]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">فيديو تعليمي - كيمياء</h4>
                  <p className="text-[#565A7C] text-xs">من كتابك → فيديو شرح جاهز</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1xIGeh3bGBgZvUdsKJCKwE21sYWe9-1Qo/preview"
                className="w-full border-0"
                style={{ height: '350px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* English Samples - Black */}
      <section className="py-8 md:py-12 bg-[#000]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#06b6d4]/20 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">عينات انكليزي</h2>
              <p className="text-white/70 text-sm">ملفات حقيقية من كتاب الانكليزي المدرسي</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* English Infographic */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#06b6d4]/15 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">إنفوجرافيك انكليزي</h4>
                  <p className="text-[#565A7C] text-xs">أهم العبارات الأساسية - بثواني</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1N8abwytlmW7VMr0ZK_aBzJ9EOFbz1lXq/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* English Presentation PPTX */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E4405F]/15 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-4 h-4 text-[#E4405F]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">عرض تقديمي - The Language Code</h4>
                  <p className="text-[#565A7C] text-xs">شرائح احترافية من كتاب الانكليزي</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1FvdVE4FBXI97g2LpTbarBTRRJQH7sWEd/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* English Video */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#06b6d4]/15 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">فيديو تعليمي - انكليزي</h4>
                  <p className="text-[#565A7C] text-xs">شاركو مع طلابك عبر واتساب</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/12ZmG8cG2xTvXmHQYgebK3iSGYdZibJru/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* English Audio / Podcast */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">بودكاست تعليمي - انكليزي</h4>
                  <p className="text-[#565A7C] text-xs">ملف صوتي من محتوى المنهج</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1-D0YiQFieS9uYRKbnYJfDqNUd5gmQlNI/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Exam & Test Samples - Dark navy */}
      <section className="py-8 md:py-12 bg-[#011839]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#614BEB]/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#614BEB]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">عينات أسئلة وامتحانات</h2>
              <p className="text-white/70 text-sm">اختبارات بنسختين مع الإجابات النموذجية وأرقام الصفحات — بثواني من الكتاب المدرسي</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center hover:shadow-xl transition-shadow">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
              >
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#111] text-lg mb-2">اختبار بنسختين</h3>
              <p className="text-[#565A7C] text-sm">نسخة A ونسخة B — الطلاب ما بيقدروا ينقلوا. كل نسخة بترتيب وأسئلة مختلفة</p>
            </div>
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#A735D7]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-[#A735D7]" />
              </div>
              <h3 className="font-bold text-[#111] text-lg mb-2">إجابات نموذجية</h3>
              <p className="text-[#565A7C] text-sm">كل سؤال بيكون مكتوب جنبو رقم الصفحة من الكتاب المدرسي — دقة عالية وموثوقة</p>
            </div>
            <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#FF0000]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-[#FF0000]" />
              </div>
              <h3 className="font-bold text-[#111] text-lg mb-2">بـ 3 دقائق فقط</h3>
              <p className="text-[#565A7C] text-sm">ارفع الكتاب → اطلب الاختبار → جاهز بتنسيق PDF احترافي للطباعة والتوزيع</p>
            </div>
          </div>

          {/* Exam Preview Iframes */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chemistry Exam */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                >
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">نموذج اختبار حقيقي — كيمياء</h4>
                  <p className="text-[#565A7C] text-xs">من الكتاب المدرسي مع الإجابات وأرقام الصفحات</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1ldVt1B0GcWTjav0TyGY3wBFsyYNYe1KC/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Chemistry Blueprint PDF */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-[#F5F3F3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#A735D7]/15 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#A735D7]" />
                </div>
                <div>
                  <h4 className="text-[#111] font-bold text-sm">مخطط اختبار — كيمياء PDF</h4>
                  <p className="text-[#565A7C] text-xs">اختبار منسق جاهز للطباعة مع الإجابات</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1ldVt1B0GcWTjav0TyGY3wBFsyYNYe1KC/preview"
                className="w-full border-0"
                style={{ height: '400px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA - Black */}
      <section className="py-12 md:py-16 bg-[#000]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4 text-white">
            كل هاد بتعملو من{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ملف واحد!
            </span>
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            ارفع كتابك المدرسي → إنفوجرافيك، عرض تقديمي، فيديو، بودكاست، PDF — كل شي بثواني
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30 mb-4"
          >
            اشترك الآن بالكورس
            <MessageCircle className="w-6 h-6" />
          </a>
          <p className="text-white/50 text-sm mt-4">ضمان 7 أيام - بدك فلوسك رجعنا، بدون أسئلة</p>
        </div>
      </section>
    </div>
  )
}
