'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Zap,
  FileOutput,
  Users,
  CreditCard,
  Send,
  ArrowLeft,
  Globe,
  Building2,
  Clock,
  Award,
  Presentation,
  Headphones,
} from 'lucide-react'

// Animated Count-Up Component
function CountUp({ target, duration = 2000, suffix = '', color = 'text-[#0D9488]' }: { target: number; duration?: number; suffix?: string; color?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <div ref={ref} className={`text-2xl md:text-3xl font-bold ${color}`}>
      {count}{suffix}
    </div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)

  // IP-based region detection
  const [region, setRegion] = useState<'syria' | 'gulf'>('gulf')
  const [geoLoaded, setGeoLoaded] = useState(false)

  const PRICING = {
    syria: {
      price: '$14',
      oldPrice: '$35',
      currency: 'شام كاش / تحويل بنكي',
      dailyCost: 'أقل من 500 ليرة باليوم',
      whatsappText: 'مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم - $14',
    },
    gulf: {
      price: '$120',
      oldPrice: '$300',
      currency: 'تحويل بنكي / PayPal / بطاقة',
      dailyCost: 'أقل من دولار باليوم',
      whatsappText: 'مرحباً، بدي اشترك بكورس الذكاء الاصطناعي بالتعليم - $120',
    },
  }

  const currentPricing = PRICING[region]
  const WHATSAPP_NUMBER = '963985323170'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentPricing.whatsappText)}`

  // ===== IP GEOLOCATION =====
  useEffect(() => {
    const GEO_KEY = 'user_country'
    const cached = localStorage.getItem(GEO_KEY)

    if (cached) {
      queueMicrotask(() => {
        setRegion(cached === 'SY' ? 'syria' : 'gulf')
        setGeoLoaded(true)
      })
      return
    }

    fetch('/api/geo')
      .then((r) => r.json())
      .then((data) => {
        const isSyria = data.country === 'SY'
        setRegion(isSyria ? 'syria' : 'gulf')
        localStorage.setItem(GEO_KEY, data.country || 'OTHER')
        setGeoLoaded(true)
      })
      .catch(() => {
        setRegion('gulf')
        setGeoLoaded(true)
      })
  }, [])

  // ===== DATA =====

  const courseModules = [
    {
      title: 'الوحدة 1: الأساسيات والتحضير الذكي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'ما هو الذكاء الاصطناعي بالتعليم ولماذا يحتاجه كل معلم؟',
        'رفع المصادر وتنظيم الدفتر الذكي',
        'المحادثة الذكية مع محتواك — أسئلة تفتح بوابات',
        'تغيير اللغة للعربية والإعدادات المخصصة',
      ],
    },
    {
      title: 'الوحدة 2: البودكاست التعليمي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'إنشاء بودكاست تعليمي من أي محتوى',
        'تخصيص البودكاست المتقدم — تحكّم كامل بالمحتوى',
        'مشاركة البودكاست مع الطلاب — قنوات التوزيع',
        'ربط البودكاست بالمنهج — استراتيجيات متقدمة',
      ],
    },
    {
      title: 'الوحدة 3: العروض والوسائط المتقدمة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'إنشاء عرض تقديمي احترافي من محتواك',
        'الخرائط الذهنية والإنفوجرافيك',
        'ملخص الفيديو والنظرة العامة',
        'دمج أدوات العرض والتصميم المتقدمة',
      ],
    },
    {
      title: 'الوحدة 4: التقييم والدراسة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'توليد أسئلة وامتحانات بضغطة زر',
        'البطاقات التعليمية للمراجعة السريعة',
        'أدلة الدراسة المخصصة',
        'تقييم الفهم والتعلّم التكيفي',
      ],
    },
    {
      title: 'الوحدة 5: الاستراتيجيات المتقدمة',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'التعليم الشامل — دمج طلاب الاحتياجات الخاصة',
        'دمج مع منصات التعليم الإلكتروني',
        'خطة الدرس الذكية — تحضير كامل بالذكاء الاصطناعي',
        'بناء نظامك التعليمي الذكي المتكامل',
      ],
    },
  ]

  const bonuses = [
    { title: '15 أمراً جاهزاً للنسخ واللصق', subtitle: 'Prompts', value: '$15', desc: '15 برومبت جاهز للنسخ واللصق مباشرة. مصممة خصيصاً للمعلمين والدكاترة والمدربين. كل برومبت مجرّب وبيدي نتائج ممتازة.', icon: Zap },
    { title: 'ورقة مرجعية سريعة', subtitle: 'Cheat Sheet', value: '$10', desc: 'ورقة مرجعية سريعة بتلخص أهم الأوامر والخطوات. طباعها وحطها جنبك.', icon: FileText },
    { title: 'وصول دائم + تحديثات مجانية', subtitle: 'Lifetime', value: '$20', desc: 'ادفع مرة واحتفظ بالكورس للأبد. مفيش اشتراك شهري ولا تجديد.', icon: Shield },
  ]

  const faqs = [
    {
      q: 'أنا معلم أو دكتور جامعي ما بعرف شي بالتكنولوجيا، فيي أستفيد؟',
      a: 'أكيد! الكورس مصمم خصيصاً للمعلمين والدكاترة والمدربين اللي ما عندهن أي خبرة تقنية. كل اللي بتحتاجه تعرف تفتح موقع وتضغط زر. رح نمشي معك خطوة بخطوة من الصفر.',
    },
    {
      q: 'الأدوات مجانية ولا لازم ادفع اشتراك؟',
      a: 'الأداة الأولى مجانية تماماً. الأداة التانية فيها نسخة مجانية كافية لتطبيق كل اللي رح تتعلمه بالكورس. مش محتاج تدفع شي إضافي عشان تبدأ.',
    },
    {
      q: 'الإجابات اللي بتطلع دقيقة ومطابقة للمنهج؟',
      a: 'هاد أكتر شي بيميزها عن غيرها! الأداة بترجع للكتاب المدرسي اللي رفعته وبتجاوب منه بس. كل إجادة بيكون مكتوب جنبها رقم الصفحة. ما بتطلع معلومات من بره المنهج.',
    },
    {
      q: 'كيف بدفع؟',
      a: region === 'syria'
        ? 'الدفع عبر شام كاش أو تحويل بنكي أو مكتب صرافة. بعد التحويل، أرسل إثبات الدفع عبر واتساب ورح نبعثلك رابط الكورس خلال ساعات قليلة.'
        : 'الدفع عبر تحويل بنكي أو PayPal أو بطاقة ائتمان. بعد التحويل، أرسل إثبات الدفع عبر واتساب ورح نبعثلك رابط الكورس خلال ساعات قليلة.',
    },
  ]

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white text-[#1E293B]" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }} suppressHydrationWarning>

      {/* ===== 1. TOP NAVIGATION BAR ===== */}
      <nav className="bg-white border-b border-[#E2E8F0] py-3 px-4 sticky top-0 z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0D9488]" />
            <span className="font-bold text-[#1B2A4A] text-sm md:text-base">كورس الذكاء الاصطناعي للمعلمين</span>
          </div>
          <Link
            href="/schools"
            className="text-[#0D9488] text-xs md:text-sm font-bold hover:text-[#0B7C72] transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4" />
            للمؤسسات التعليمية
          </Link>
        </div>
      </nav>

      {/* ===== 2. HERO SECTION ===== */}
      <section className="relative bg-[#F8FAFC] overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1B2A4A 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-5 py-2 rounded-full text-sm font-bold mb-8 border border-[#0D9488]/20">
            <Sparkles className="w-4 h-4" />
            برنامج تدريبي عملي — المدرب نواف البوسطه
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.4] mb-6 text-[#1B2A4A]">
            حوّل 3 ساعات تحضير لـ{' '}
            <span className="text-[#0D9488]">15 دقيقة</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto mb-10 leading-loose">
            أدوات ذكاء اصطناعي مجانية بتحول الكتاب المدرسي لاختبارات بنسختين، مذكرات PDF احترافية، وشروحات صوتية — كل شي موثق بأرقام الصفحات
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              سجّل الآن — {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="/results"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#1B2A4A]/20 hover:border-[#1B2A4A]/40 text-[#1B2A4A] font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              <Presentation className="w-4 h-4" />
              شوف النماذج الحقيقية
            </a>
          </div>

          {/* Price info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
            {/* Syria Price */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <span className="text-base">🇸🇾</span>
              <span>داخل سوريا: <span className="text-[#0D9488] font-bold">$14</span> بدل $35</span>
            </div>
            {/* Guarantee */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>ضمان استرداد 7 أيام</span>
            </div>
            {/* Google tool */}
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>أداة من Google — مجانية</span>
            </div>
          </div>

          {/* Intro Video */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative rounded-xl overflow-hidden bg-white border border-[#E2E8F0]">
              <iframe
                src="https://www.youtube.com/embed/Ze-HjqkxIJM?rel=0&modestbranding=1"
                className="w-full border-0"
                style={{ aspectRatio: '16/9' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="تعريف بالبرنامج التدريبي — المدرب نواف البوسطه"
              />
            </div>
            <p className="text-center text-[#64748B] text-xs mt-2">
              تعريف بالبرنامج التدريبي — فيديو قصير
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <CountUp target={465} suffix="+" />
              <div className="text-[#64748B] text-xs mt-1">معلم ومدرب سجّلوا</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <CountUp target={106} suffix="+" />
              <div className="text-[#64748B] text-xs mt-1">مؤسسة تعليمية</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#0D9488]">20</div>
              <div className="text-[#64748B] text-xs mt-1">درس عملي</div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#0D9488] text-[#0D9488]" />
                ))}
              </div>
              <div className="text-[#64748B] text-xs mt-1">4.9/5 تقييم</div>
            </div>
          </div>

          {/* Purchase Steps */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { icon: MessageCircle, step: '١', text: 'تواصل واتساب' },
                { icon: CreditCard, step: '٢', text: `حول ${currentPricing.price}` },
                { icon: Send, step: '٣', text: 'استلم الرابط فوراً' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#0D9488]" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#0D9488] font-bold">خطوة {item.step}</div>
                      <div className="text-xs text-[#64748B]">{item.text}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowLeft className="w-4 h-4 text-[#E2E8F0] hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. BEFORE/AFTER SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              قبل الكورس vs <span className="text-[#0D9488]">بعد</span> الكورس
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              الفرق واضح — شوف كيف بيتغير يومك كمعلم
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BEFORE */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 relative border-t-4 border-t-[#EF4444]">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">قبل — الطريقة التقليدية</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">2-3 ساعات بتحضير درس واحد</p>
                    <p className="text-[#64748B] text-xs">بتقعد من العصر للمغرب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">أكتب الأسئلة بإيدي — ساعة ونص عشان 20 سؤال</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">نسخة وحدة من الاختبار — الطلاب بينقلوا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">تنسيق الوورد بياخد ساعات وبالنهاية مو مرتب</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-white border-2 border-[#0D9488] rounded-xl p-6 relative border-t-4 border-t-[#0D9488]">
              <h3 className="font-bold text-[#1B2A4A] text-lg mb-4">بعد — بالذكاء الاصطناعي</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">15 دقيقة بتحضير نفس الدرس</p>
                    <p className="text-[#0D9488] text-xs font-bold">بتخلص وأنت مستغرب!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">AI بيعمللك 20 سؤال بـ 3 دقائق من الكتاب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">نسختين مختلفات + إجابات نموذجية + رقم الصفحة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0D9488] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#1E293B] font-medium text-sm">PDF احترافي جاهز للطباعة بغلاف وتنسيق مرتب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loss Aversion */}
          <div className="mt-8 bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-5 text-center">
            <p className="text-[#1B2A4A] font-bold text-base">
              كل أسبوع بتأخر = <span className="text-[#EF4444] font-bold">5 ساعات</span> ضائعة × 40 أسبوع = <span className="text-[#EF4444] font-bold">200 ساعة بالسنة</span>
            </p>
            <p className="text-[#64748B] text-sm mt-1">
              الكورس بـ <span className="text-[#0D9488] font-bold">{currentPricing.price}</span> = {currentPricing.dailyCost} — وبتحفّظ 200 ساعة سنوياً
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. TOOLS SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              شو رح تتعلم تعمل؟
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              من رفع المصدر لحد إخراج اختبار وملف PDF جاهز للطباعة — كل شي عملي
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Tool 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg">أداة رفع المصادر والأسئلة</h3>
                  <span className="text-[#0D9488] text-sm font-bold">مجانية تماماً — من Google</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'ارفع كتابك المدرسي واسألو أي سؤال عنه',
                  'بيعمللك اختبارات وأسئلة بنسختين مختلفة',
                  'كل إجابة موثقة بأرقام الصفحات من الكتاب',
                  'بيعمل شرح صوتي (بودكاست) للطلاب ترسله واتساب',
                  'يعمل شروحات وملخصات من الكتاب فقط',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] text-lg">أداة التصميم والتنسيق الذكي</h3>
                  <span className="text-[#0D9488] text-sm font-bold">لإنشاء ملفات PDF احترافية</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'يحول المحتوى لملف PDF احترافي جاهز للطباعة',
                  'بيعمل عروض تقديمية تعليمية بأسلوب الورقة والقلم',
                  'يدعم العربية مع تنسيق من اليمين لليسار',
                  'بيعمل اختبارات منسقة + إجابات نموذجية',
                  'كل شي جاهز للطباعة والتوزيع على الطلاب',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                    <span className="text-[#64748B] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Savings Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B2A4A]">
                  <th className="py-3.5 px-4 text-right text-white font-bold text-sm">المهمة</th>
                  <th className="py-3.5 px-4 text-center text-white/80 font-bold text-sm">الطريقة التقليدية</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">بالذكاء الاصطناعي</th>
                  <th className="py-3.5 px-4 text-center text-white font-bold text-sm">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونص', ai: '3 دقائق', save: '97%' },
                  { task: 'إعداد عرض تقديمي تعليمي', old: '3-4 ساعات', ai: '10 دقائق', save: '95%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتان', ai: '10 دقائق', save: '92%' },
                  { task: 'إعداد ملف صوتي تعليمي', old: 'غير متاح', ai: '5 دقائق', save: '∞' },
                  { task: 'البحث عن أحدث الدراسات', old: '2-3 ساعات', ai: 'ثوانٍ', save: '99%' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[#E2E8F0] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                    <td className="py-3 px-4 text-right font-medium text-[#1E293B] text-sm">{row.task}</td>
                    <td className="py-3 px-4 text-center text-[#64748B] text-sm">{row.old}</td>
                    <td className="py-3 px-4 text-center text-[#0D9488] font-medium text-sm">{row.ai}</td>
                    <td className="py-3 px-4 text-center text-[#0D9488] font-bold text-sm">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 5. RESULTS CTA ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <Presentation className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0D9488]/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-[#0D9488]" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-3">
              اطلع على نماذج من المخرجات التعليمية
            </h3>
            <p className="text-[#64748B] text-sm mb-6 max-w-lg mx-auto leading-loose">
              إنفوجرافيك، عروض تقديمية، ملفات صوتية، وبودكاست — نماذج حقيقية من كتب الكيمياء والعلوم والإنجليزية
            </p>
            <a
              href="/results"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors"
            >
              اطلع على النماذج
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== 6. COURSE CONTENT SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              محتوى البرنامج التدريبي
            </h2>
            <p className="text-[#64748B] text-sm">5 وحدات — 20 درساً عملياً مباشراً</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0D9488] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <span className="font-bold text-[#1B2A4A] text-base">{mod.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#0D9488] font-medium bg-[#0D9488]/10 px-2 py-0.5 rounded-md">
                          {mod.lessons} محاضرات
                        </span>
                        <span className="text-xs text-[#64748B]">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#E2E8F0] pt-3">
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
                          <span className="text-[#64748B] text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. BONUSES SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              هدايا مجانية بقيمة $45
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              تحصل عليها مجاناً مع التسجيل
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#0D9488]/30 transition-colors text-center">
                <div className="w-12 h-12 rounded-lg bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
                  <bonus.icon className="w-6 h-6 text-[#0D9488]" />
                </div>
                <span className="text-xs font-bold text-[#0D9488] tracking-wider mb-1 block">{bonus.subtitle}</span>
                <h4 className="font-bold text-[#1B2A4A] text-lg mb-2">{bonus.title}</h4>
                <p className="text-[#64748B] text-sm leading-loose mb-3">{bonus.desc}</p>
                <div className="border-t border-[#E2E8F0] pt-3">
                  <span className="text-[#64748B] text-sm">سعره </span>
                  <span className="text-[#EF4444] font-bold line-through text-sm">{bonus.value}</span>
                  <span className="text-[#64748B] text-sm">، </span>
                  <span className="text-[#0D9488] font-bold text-sm">مجاناً!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. TRAINER SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="المدرب نواف البوسطه — متخصص في تطبيقات الذكاء الاصطناعي في التعليم"
                className="w-24 h-24 rounded-full object-cover border-3 border-[#0D9488]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">نواف البوسطه</h3>
              <p className="text-[#0D9488] font-bold text-sm mb-3">
                متخصص في تطبيقات الذكاء الاصطناعي في التعليم
              </p>
              <p className="text-[#64748B] text-sm leading-loose mb-4">
                معلم متمرس قضى سنوات في تحضير الدروس تقليدياً. بعد اكتشاف أدوات الذكاء الاصطناعي، تحوّل أسلوب عمله بالكامل — من إعداد الاختبارات بنسختين خلال 5 دقائق، إلى تصميم مذكرات PDF احترافية في دقائق. يؤمن بأن كل معلم قادر على الاستفادة من هذه الأدوات بغض النظر عن خلفيته التقنية.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#1B2A4A]/5 rounded-lg flex items-center justify-center hover:bg-[#1B2A4A]/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#1B2A4A]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#1B2A4A]/5 rounded-lg flex items-center justify-center hover:bg-[#1B2A4A]/10 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#1B2A4A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <span className="text-[#64748B] text-xs">@noaf.ai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. FAQ SECTION ===== */}
      <section className="py-14 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
              أسئلة شائعة
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose">
              إجابات على الأسئلة الأكثر شيوعاً
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F8FAFC] transition-colors"
                >
                  <span className="font-bold text-[#1E293B] text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform shrink-0 mr-3 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#E2E8F0] pt-3">
                    <p className="text-[#64748B] text-sm leading-loose">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. FINAL CTA SECTION ===== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1B2A4A] mb-3">
            جاهز تبدأ رحلتك مع الذكاء الاصطناعي؟
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-sm leading-loose mb-8">
            سجّل الآن واحصل على وصول دائم للبرنامج التدريبي + الهدايا المجانية + ضمان استرداد 7 أيام
          </p>

          {/* Price card */}
          <div className="max-w-md mx-auto bg-white border-2 border-[#0D9488] rounded-xl p-6 mb-6">
            <div className="text-[#64748B] text-sm mb-1">السعر</div>
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-3xl font-bold text-[#1B2A4A]">{currentPricing.price}</span>
              <span className="text-[#64748B] line-through text-lg">{currentPricing.oldPrice}</span>
            </div>
            <div className="text-[#0D9488] text-sm font-bold mb-4">{currentPricing.currency}</div>
            {region === 'syria' && (
              <div className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-lg p-3 mb-4 text-sm">
                <span className="text-[#0D9488] font-bold">سعر خاص لسوريا</span> — لأننا مانعرف نترك المعلم السوري لحاله
              </div>
            )}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors w-full justify-center"
            >
              سجّل الآن عبر واتساب
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Shield className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>ضمان 7 أيام</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Award className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>شهادة إتمام معتمدة</span>
            </div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>وصول دائم</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. FOOTER ===== */}
      <footer className="bg-[#1B2A4A] py-8">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link href="/schools" className="text-white/70 text-sm hover:text-white transition-colors">
              حلول المؤسسات التعليمية
            </Link>
            <Link href="/results" className="text-white/70 text-sm hover:text-white transition-colors">
              نماذج المخرجات
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
