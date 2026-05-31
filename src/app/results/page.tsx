'use client'

import {
  BookOpen,
  FileText,
  FileOutput,
  Globe,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Headphones,
  Presentation,
  Shield,
} from 'lucide-react'
import Link from 'next/link'

const WHATSAPP_NUMBER = '963985323170'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم')}`

export default function ResultsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[#1E293B]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>

      {/* ===== TOP NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#E2E8F0] py-3 px-4 sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#64748B] hover:text-[#0D9488] transition-colors">
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold text-sm">العودة للصفحة الرئيسية</span>
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            سجّل الآن
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-[#F8FAFC] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1B2A4A 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-5 py-2 rounded-full text-sm font-bold mb-8 border border-[#0D9488]/20">
            <Sparkles className="w-4 h-4" />
            عينات حقيقية من نتائج الشغل
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-[1.4] mb-6 text-[#1B2A4A]">
            شوف شو رح تعمل بعد{' '}
            <span className="text-[#0D9488]">الكورس</span>
          </h1>

          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto mb-10 leading-loose">
            ملفات حقيقية من كتب مدرسية — إنفوجرافيك، عروض تقديمية، فيديوهات، وبودكاست — كل شي معمول بأدوات AI مجانية
          </p>

          {/* Summary icons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'إنفوجرافيك', icon: Sparkles },
              { label: 'خريطة ذهنية', icon: BookOpen },
              { label: 'PDF', icon: FileText },
              { label: 'عرض تقديمي', icon: Presentation },
              { label: 'فيديو تعليمي', icon: Globe },
              { label: 'بودكاست صوتي', icon: Headphones },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
                <item.icon className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHEMISTRY & SCIENCE SAMPLES ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A]">عينات كيمياء وعلوم</h2>
              <p className="text-[#64748B] text-sm">ملفات حقيقية من كتب كيمياء وعلوم مدرسية</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chemistry Infographic */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">إنفوجرافيك كيمياء</h4>
                  <p className="text-[#64748B] text-xs">بثواني من كتابك المدرسي</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">خريطة ذهنية</h4>
                  <p className="text-[#64748B] text-xs">ارفع كتابك → خريطة ذهنية جاهزة</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">مخطط كيمياء — PDF</h4>
                  <p className="text-[#64748B] text-xs">ملف PDF احترافي جاهز للطباعة</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">عرض تقديمي — مخطط كيمياء</h4>
                  <p className="text-[#64748B] text-xs">شرائح احترافية من محتواك</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">فيديو تعليمي — علوم</h4>
                  <p className="text-[#64748B] text-xs">شاركو مع طلابك عبر واتساب</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">فيديو تعليمي — كيمياء</h4>
                  <p className="text-[#64748B] text-xs">من كتابك → فيديو شرح جاهز</p>
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

      {/* ===== ENGLISH SAMPLES ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A]">عينات انكليزي</h2>
              <p className="text-[#64748B] text-sm">ملفات حقيقية من كتاب الانكليزي المدرسي</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* English Infographic */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">إنفوجرافيك انكليزي</h4>
                  <p className="text-[#64748B] text-xs">أهم العبارات الأساسية — بثواني</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">عرض تقديمي — The Language Code</h4>
                  <p className="text-[#64748B] text-xs">شرائح احترافية من كتاب الانكليزي</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">فيديو تعليمي — انكليزي</h4>
                  <p className="text-[#64748B] text-xs">شاركو مع طلابك عبر واتساب</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">بودكاست تعليمي — انكليزي</h4>
                  <p className="text-[#64748B] text-xs">ملف صوتي من محتوى المنهج</p>
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

      {/* ===== EXAM & TEST SAMPLES ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A]">عينات أسئلة وامتحانات</h2>
              <p className="text-[#64748B] text-sm">اختبارات بنسختين مع الإجابات النموذجية وأرقام الصفحات — بثواني من الكتاب المدرسي</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-14 h-14 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">اختبار بنسختين</h3>
              <p className="text-[#64748B] text-sm leading-loose">نسخة A ونسخة B — الطلاب ما بيقدروا ينقلوا. كل نسخة بترتيب وأسئلة مختلفة</p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-14 h-14 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">إجابات نموذجية</h3>
              <p className="text-[#64748B] text-sm leading-loose">كل سؤال بيكون مكتوب جنبو رقم الصفحة من الكتاب المدرسي — دقة عالية وموثوقة</p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center hover:border-[#0D9488]/30 transition-colors">
              <div className="w-14 h-14 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">بـ 3 دقائق فقط</h3>
              <p className="text-[#64748B] text-sm leading-loose">ارفع الكتاب → اطلب الاختبار → جاهز بتنسيق PDF احترافي للطباعة والتوزيع</p>
            </div>
          </div>

          {/* Exam Preview Iframes */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chemistry Exam */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">نموذج اختبار حقيقي — كيمياء</h4>
                  <p className="text-[#64748B] text-xs">من الكتاب المدرسي مع الإجابات وأرقام الصفحات</p>
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
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-[#1B2A4A] font-bold text-sm">مخطط اختبار — كيمياء PDF</h4>
                  <p className="text-[#64748B] text-xs">اختبار منسق جاهز للطباعة مع الإجابات</p>
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

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
            كل هاد بتعملو من <span className="text-[#0D9488]">ملف واحد!</span>
          </h2>
          <p className="text-[#64748B] mb-8 text-base leading-loose">
            ارفع كتابك المدرسي → إنفوجرافيك، عرض تقديمي، فيديو، بودكاست، PDF — كل شي بثواني
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors mb-4"
          >
            سجّل الآن بالكورس
            <MessageCircle className="w-5 h-5" />
          </a>
          <div className="mt-4 flex items-center justify-center gap-2 text-[#64748B] text-sm">
            <Shield className="w-4 h-4 text-[#0D9488]" />
            <span>ضمان استرداد 7 أيام — بدون أسئلة</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1B2A4A] py-6">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-3">
            <Link href="/" className="text-white/70 text-sm hover:text-white transition-colors">
              الصفحة الرئيسية
            </Link>
            <Link href="/schools" className="text-white/70 text-sm hover:text-white transition-colors">
              حلول المؤسسات التعليمية
            </Link>
          </div>
          <p className="text-white/50 text-xs">
            جميع الحقوق محفوظة {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين
          </p>
        </div>
      </footer>
    </div>
  )
}
