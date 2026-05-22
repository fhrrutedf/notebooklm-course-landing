'use client'

import { useState, useEffect, useRef } from 'react'
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
  X,
  Globe,
} from 'lucide-react'

// Animated Count-Up Component
function CountUp({ target, duration = 2000, suffix = '', color = 'text-[#f59e0b]' }: { target: number; duration?: number; suffix?: string; color?: string }) {
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
    <div ref={ref} className={`text-3xl md:text-4xl font-black ${color}`}>
      {count}{suffix}
    </div>
  )
}

// Countdown Timer Component
function CountdownTimer() {
  const OFFER_KEY = 'offer_start_date'
  const OFFER_DAYS = 14

  const [endDate, setEndDate] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    let stored = localStorage.getItem(OFFER_KEY)
    let start: Date
    if (stored) {
      start = new Date(stored)
    } else {
      start = new Date()
      localStorage.setItem(OFFER_KEY, start.toISOString())
    }
    const end = new Date(start.getTime() + OFFER_DAYS * 24 * 60 * 60 * 1000)
    setEndDate(end)
  }, [])

  useEffect(() => {
    if (!endDate) return
    const tick = () => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  if (!endDate) return null

  return (
    <div className="bg-red-950/40 border border-red-500/30 rounded-xl px-5 py-3 inline-flex items-center gap-3">
      <span className="text-red-400 font-bold text-sm">⏰ العرض ينتهي خلال:</span>
      <div className="flex items-center gap-1.5">
        {[
          { value: timeLeft.days, label: 'يوم' },
          { value: timeLeft.hours, label: 'ساعة' },
          { value: timeLeft.minutes, label: 'دقيقة' },
          { value: timeLeft.seconds, label: 'ثانية' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="bg-[#0a0a0a] rounded-lg px-2 py-1 min-w-[40px] text-center">
              <span className="text-red-400 font-black text-lg">{String(item.value).padStart(2, '0')}</span>
            </div>
            {i < 3 && <span className="text-red-500/50 text-lg font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Guarantee Badge (reused in 3 locations)
function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-[#22c55e] text-sm font-bold bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-lg px-4 py-2.5">
      <Shield className="w-5 h-5 shrink-0" />
      <span>ضمان 7 أيام - بدك فلوسك رجعنا، بدون أسئلة</span>
    </div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [mounted, setMounted] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)

  // IP-based region detection
  const [region, setRegion] = useState<'syria' | 'gulf'>('syria')
  const [geoLoaded, setGeoLoaded] = useState(false)

  const PRICING = {
    syria: {
      price: '$12',
      oldPrice: '$35',
      currency: 'شام كاش / تحويل بنكي',
      dailyCost: 'أقل من 400 ليرة باليوم',
      whatsappText: 'مرحباً، بدي اشترك بكورس NotebookLM - $12',
    },
    gulf: {
      price: '$120',
      oldPrice: '$300',
      currency: 'تحويل بنكي / PayPal / بطاقة',
      dailyCost: 'أقل من دولار باليوم',
      whatsappText: 'مرحباً، بدي اشترك بكورس NotebookLM - $120',
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
      setRegion(cached === 'SY' ? 'syria' : 'gulf')
      setGeoLoaded(true)
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
        setRegion('gulf') // Default to gulf on error
        setGeoLoaded(true)
      })
  }, [])

  // ===== Sticky Mobile CTA Bar =====
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== Exit Intent Popup =====
  useEffect(() => {
    if (!mounted) return

    const EXIT_KEY = 'exit_popup_shown'
    if (localStorage.getItem(EXIT_KEY)) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(EXIT_KEY)) {
        setShowExitPopup(true)
        localStorage.setItem(EXIT_KEY, 'true')
      }
    }

    let hasScrolledDown = false
    const handleScrollMobile = () => {
      if (window.scrollY > 600) hasScrolledDown = true
      if (hasScrolledDown && window.scrollY < 50 && !localStorage.getItem(EXIT_KEY)) {
        setShowExitPopup(true)
        localStorage.setItem(EXIT_KEY, 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScrollMobile, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScrollMobile)
    }
  }, [mounted])

  // Mark mounted after first render
  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  // ===== DATA =====

  const whatsappChats = [
    {
      title: 'رأي مشترك - معلم رياضيات',
      contactName: 'م***** ع',
      messages: [
        { from: 'them', text: 'السلام عليكم نواف، بدي أشكرك على الكورس فعلاً غير حياتي' },
        { from: 'me', text: 'الله يبارك فيك! شو أكثر شي استفدت منه؟' },
        { from: 'them', text: 'أكتر شي عمللك اختبار بنسختين بـ 5 دقائق! قبل هيك كنت بقعد ساعة ونص بكتب أسئلة بإيدي. هلأ بعمل اختبار كامل بنسختين مختلفات مع الإجابات النموذجية بأقل من 5 دقائق' },
        { from: 'them', text: 'وطول ما بعمل الاختبار بكون من الكتاب المدرسي وكل إجادة مكتوب جنبها رقم الصفحة. هاد اللي بيخلي الآباء والأمهات يثقوا بالاختبار' },
      ],
    },
    {
      title: 'رأي مشتركة - معلمة عربي',
      contactName: 'س***** ح',
      messages: [
        { from: 'them', text: 'نواف بجد الكورس من أحلى الكورسات اللي أخدتها! صرت بعمل شروحات مكتوبة وملفات صوتية لطلابي' },
        { from: 'me', text: 'حلو كتير! والطلاب كيف ردة فعلهم؟' },
        { from: 'them', text: 'الطلاب صاروا يطلبوا كتير من هالملفات! بوزعهم عليهم واتساب وبيفهموا المادة وهم بالمشي. وأكتر شي حبيته إنو ما بتحتاج خبرة تقنية، أنا معلمة عربي بس قدرت أشتغل عليهن بسهولة' },
      ],
    },
    {
      title: 'رأي مشترك - دكتور جامعي',
      contactName: 'د***** خ',
      messages: [
        { from: 'them', text: 'دكتور نواف، الأداة رائعة فعلاً! قدرت أعمل محاضرة كاملة عن الانقسام الخلوي من المرجع الجامعي' },
        { from: 'me', text: 'ممتاز! أسئلة جامعية كمان عملت؟' },
        { from: 'them', text: 'أي نعم! عملت 10 أسئلة مقالية وموضوعية بمستوى الطالب الجامعي وكلها من الكتاب صفحات 120-145. والملف PDF طلع بتنسيق احترافي غلاف وأرقام صفحات ومخططات' },
      ],
    },
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
      a: 'هاد أكتر شي بيميزها عن ChatGPT! الأداة بترجع للكتاب المدرسي اللي رفعته وبتجاوب منه بس. كل إجادة بيكون مكتوب جنبها رقم الصفحة. ما بتطلع معلومات من بره المنهج.',
    },
    {
      q: 'كيف بدفع؟',
      a: region === 'syria'
        ? 'الدفع عبر شام كاش أو تحويل بنكي أو مكتب صرافة. بعد التحويل، أرسل إثبات الدفع عبر واتساب ورح نبعثلك رابط الكورس خلال ساعات قليلة.'
        : 'الدفع عبر تحويل بنكي أو PayPal أو بطاقة ائتمان. بعد التحويل، أرسل إثبات الدفع عبر واتساب ورح نبعثلك رابط الكورس خلال ساعات قليلة.',
    },
  ]

  const courseModules = [
    {
      title: 'الوحدة 1: الأساسيات والتحضير الذكي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'ما هو الذكاء الاصطناعي بالتعليم ولماذا يحتاجه كل معلم؟',
        'رفع المصادر وتنظيم الدفتر الذكي',
        'المحادثة الذكية مع محتواك - أسئلة تفتح بوابات',
        'تغيير اللغة للعربية والإعدادات المخصصة',
      ],
    },
    {
      title: 'الوحدة 2: البودكاست التعليمي',
      lessons: 4,
      time: '60 دقيقة',
      items: [
        'إنشاء بودكاست تعليمي من أي محتوى',
        'تخصيص البودكاست المتقدم - تحكّم كامل بالمحتوى',
        'مشاركة البودكاست مع الطلاب - قنوات التوزيع',
        'ربط البودكاست بالمنهج - استراتيجيات متقدمة',
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
        'التعليم الشامل - دمج طلاب الاحتياجات الخاصة',
        'دمج مع منصات التعليم الإلكتروني',
        'خطة الدرس الذكية - تحضير كامل بالذكاء الاصطناعي',
        'بناء نظامك التعليمي الذكي المتكامل',
      ],
    },
  ]

  const bonuses = [
    { title: '15 برومبت جاهز', subtitle: 'PROMPTS', value: '$15', desc: '15 برومبت جاهز للنسخ واللصق مباشرة. مصممة خصيصاً للمعلمين والدكاترة والمدربين. كل برومبت مجرّب وبيدي نتائج ممتازة.', icon: Zap },
    { title: 'ورقة مرجعية سريعة', subtitle: 'CHEAT SHEET', value: '$10', desc: 'ورقة مرجعية سريعة بتلخص أهم الأوامر والخطوات. طباعها وحطها جنبك.', icon: FileText },
    { title: 'وصول دائم + تحديثات', subtitle: 'LIFETIME', value: '$20', desc: 'ادفع مرة واحتفظ بالكورس للأبد. مفيش اشتراك شهري ولا تجديد.', icon: Shield },
  ]

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#0a0a0a] font-sans text-white">

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-6 md:pt-16 md:pb-8 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-[#f59e0b]/15 text-[#f59e0b] px-5 py-2 rounded-full text-sm font-bold mb-6 border border-[#f59e0b]/20">
            <Sparkles className="w-4 h-4" />
            كورس عملي - المدرب نواف البوسطه
          </div>

          {/* Offer Countdown */}
          <div className="mt-4 flex justify-center">
            <CountdownTimer />
          </div>

          {/* Single punchy headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-5">
            حوّل 3 ساعات تحضير
            <br />
            لـ <span className="text-[#f59e0b]">15 دقيقة</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            أدوات ذكاء اصطناعي مجانية بتحول الكتاب المدرسي لاختبارات بنسختين، مذكرات PDF احترافية، وشروحات صوتية — كل شي موثق بأرقام الصفحات
          </p>

          {/* CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30 mb-4"
          >
            اشترك الآن - {currentPricing.price} فقط
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Guarantee */}
          <div className="mt-4">
            <GuaranteeBadge />
          </div>

          {/* Hero Video */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#f59e0b]/10 group">
              <video
                id="hero-video"
                className="w-full aspect-video bg-black"
                poster="/videos/hero-poster.jpg"
                preload="metadata"
                controls
                playsInline
              >
                <source src="/videos/hero-intro-web.mp4" type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو
              </video>
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-l from-[#f59e0b] via-[#8b5cf6] to-[#22c55e]" />
            </div>
            <p className="text-center text-gray-500 text-xs mt-2">
              شوف كيف بيتغيّر يومك كمعلم — فيديو تعريفي 7 دقائق
            </p>
          </div>

          {/* Social Proof Counters */}
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center border border-[#f59e0b]/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <CountUp target={465} suffix="+" />
              <div className="text-gray-400 text-xs mt-1 font-bold">معلم ومدرب ودكتور سجّلو</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center border border-[#8b5cf6]/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Globe className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <CountUp target={106} suffix="+" color="text-[#8b5cf6]" />
              <div className="text-gray-400 text-xs mt-1 font-bold">منصة ومدرسة سجّلو</div>
            </div>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-4 gap-4 mt-4 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#f59e0b]">20</div>
              <div className="text-gray-500 text-[10px] mt-0.5">درس عملي</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#f59e0b]">5</div>
              <div className="text-gray-500 text-[10px] mt-0.5">وحدات</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#22c55e]">مجاني</div>
              <div className="text-gray-500 text-[10px] mt-0.5">الأداة الأساسية</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <div className="text-gray-500 text-[10px] mt-0.5">4.9/5 تقييم</div>
            </div>
          </div>

          {/* Credibility: Google product + Verified */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              أداة من Google
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5 text-[#22c55e]" />
              معلمين من كل المحافظات اشتركوا
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 text-[#22c55e]" />
              مجرّب على مناهج حقيقية
            </span>
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
                    <div className="w-8 h-8 bg-[#f59e0b]/15 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#f59e0b] font-bold">خطوة {item.step}</div>
                      <div className="text-xs text-gray-400">{item.text}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowLeft className="w-4 h-4 text-gray-600 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: BEFORE/AFTER ===== */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            <span className="text-red-400">قبل</span> الكورس vs <span className="text-[#22c55e]">بعد</span> الكورس
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm">
            الفرق واضح - شوف كيف بيتغير يومك كمعلم
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BEFORE */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-red-900/30 relative">
              <div className="absolute -top-3 right-6 bg-red-500 text-white text-sm font-black px-4 py-1 rounded-full">قبل</div>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">⏰</span>
                  <div>
                    <p className="text-white font-bold text-sm">2-3 ساعات بتحضير درس واحد</p>
                    <p className="text-gray-500 text-xs">بتقعد من العصر للمغرب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">📝</span>
                  <div>
                    <p className="text-white font-bold text-sm">أكتب الأسئلة بإيدي - ساعة ونص عشان 20 سؤال</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">📄</span>
                  <div>
                    <p className="text-white font-bold text-sm">نسخة وحدة من الاختبار - الطلاب بينقلوا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">💻</span>
                  <div>
                    <p className="text-white font-bold text-sm">تنسيق الوورد بياخد ساعات وبالنهاية مو مرتب</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#22c55e]/30 relative shadow-lg shadow-[#22c55e]/5">
              <div className="absolute -top-3 right-6 bg-[#22c55e] text-white text-sm font-black px-4 py-1 rounded-full">بعد</div>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] mt-0.5">⚡</span>
                  <div>
                    <p className="text-white font-bold text-sm">15 دقيقة بتحضير نفس الدرس</p>
                    <p className="text-[#22c55e] text-xs">بتخلص وأنت مستغرب!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] mt-0.5">🤖</span>
                  <div>
                    <p className="text-white font-bold text-sm">AI بيعمللك 20 سؤال بـ 3 دقائق من الكتاب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] mt-0.5">📋</span>
                  <div>
                    <p className="text-white font-bold text-sm">نسختين مختلفات + إجابات نموذجية + رقم الصفحة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#22c55e] mt-0.5">🖨️</span>
                  <div>
                    <p className="text-white font-bold text-sm">PDF احترافي جاهز للطباعة بغلاف وتنسيق مرتب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loss Aversion */}
          <div className="max-w-3xl mx-auto mt-8 bg-[#1a0a0a] rounded-xl p-4 border border-red-900/20">
            <p className="text-center text-white font-bold text-sm">
              كل أسبوع بتأخر = <span className="text-red-400 font-black">5 ساعات</span> ضائعة × 40 أسبوع = <span className="text-red-400 font-black">200 ساعة بسنة</span>
            </p>
            <p className="text-center text-gray-400 text-xs mt-1">
              الكورس بـ <span className="text-[#22c55e] font-black">{currentPricing.price}</span> = {currentPricing.dailyCost} — وبتحفّظ 200 ساعة
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TOOLS & RESULTS ===== */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            شو رح تتعلم تعمل؟
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm">
            من رفع المصدر لحد إخراج اختبار وملف PDF جاهز للطباعة - كل شي عملي
          </p>

          {/* Tool Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Tool 1 */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">أداة رفع المصادر والأسئلة</h3>
                  <span className="text-sm text-[#8b5cf6]">مجانية تماماً - من Google</span>
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
                    <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-amber-900/30 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-xl flex items-center justify-center">
                  <FileOutput className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">أداة التصميم والتنسيق الذكي</h3>
                  <span className="text-sm text-[#f59e0b]">لإنشاء ملفات PDF احترافية</span>
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
                    <CheckCircle2 className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Savings Table */}
          <h3 className="text-lg md:text-xl font-black text-center mb-4">كم وقت بتوفر؟</h3>
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f59e0b]/10 border-b border-white/10">
                  <th className="py-3 px-4 text-right text-[#f59e0b] font-bold text-sm">المهمة</th>
                  <th className="py-3 px-4 text-center text-red-400 font-bold text-sm">الطريقة العادية</th>
                  <th className="py-3 px-4 text-center text-[#22c55e] font-bold text-sm">بـ AI</th>
                  <th className="py-3 px-4 text-center text-[#f59e0b] font-bold text-sm">التوفير</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: 'تلخيص فصل كامل', old: '2-3 ساعات', ai: '5 دقائق', save: '95%' },
                  { task: 'إعداد 20 سؤال اختبار', old: 'ساعة ونص', ai: '3 دقائق', save: '97%' },
                  { task: 'عمل عرض تقديمي تعليمي', old: '3-4 ساعات', ai: '10 دقائق', save: '95%' },
                  { task: 'تصميم مذكرة PDF', old: 'ساعتين', ai: '10 دقائق', save: '92%' },
                  { task: 'عمل ملف صوتي تعليمي', old: 'مستحيل', ai: '5 دقائق', save: '∞' },
                  { task: 'بحث عن أحدث الدراسات وطرق التدريس', old: '2-3 ساعات', ai: 'ثواني', save: '99%' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                    <td className="py-2.5 px-4 text-right font-medium text-white text-sm">{row.task}</td>
                    <td className="py-2.5 px-4 text-center text-red-400 text-sm">{row.old}</td>
                    <td className="py-2.5 px-4 text-center text-[#22c55e] font-medium text-sm">{row.ai}</td>
                    <td className="py-2.5 px-4 text-center text-[#f59e0b] font-bold text-sm">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Results Gallery CTA ===== */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-3xl p-8 md:p-10 border border-[#f59e0b]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#8b5cf6]/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {['✨', '🧠', '📄', '📊', '🎬', '🎙️'].map((icon, i) => (
                    <span key={i} className="text-2xl md:text-3xl">{icon}</span>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                  شوف عينات حقيقية من نتائج الشغل
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                  إنفوجرافيك، عروض تقديمية، فيديوهات، وبودكاست — ملفات حقيقية من كتب كيمياء وعلوم وانكليزي
                </p>
                <a
                  href="/results"
                  className="inline-flex items-center gap-3 bg-[#f59e0b] hover:bg-[#d97706] text-black font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#f59e0b]/30"
                >
                  شوف العينات الحقيقية
                  <ArrowLeft className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXAM SAMPLES ===== */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            أسئلة وامتحانات <span className="text-[#f59e0b]">جاهزة</span>
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm">
            اختبارات بنسختين مختلفات مع الإجابات النموذجية وأرقام الصفحات — بثواني من الكتاب المدرسي
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#22c55e]/20 hover:border-[#22c55e]/40 transition-colors text-center">
              <div className="w-14 h-14 bg-[#22c55e]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">اختبار بنسختين</h3>
              <p className="text-gray-400 text-sm">نسخة A ونسخة B — الطلاب ما بيقدروا ينقلوا. كل نسخة بترتيب وأسئلة مختلفة</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 transition-colors text-center">
              <div className="w-14 h-14 bg-[#8b5cf6]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-[#8b5cf6]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">إجابات نموذجية</h3>
              <p className="text-gray-400 text-sm">كل سؤال بيكون مكتوب جنبو رقم الصفحة من الكتاب المدرسي — دقة عالية وموثوقة</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#f59e0b]/20 hover:border-[#f59e0b]/40 transition-colors text-center">
              <div className="w-14 h-14 bg-[#f59e0b]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-[#f59e0b]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">بـ 3 دقائق فقط</h3>
              <p className="text-gray-400 text-sm">ارفع الكتاب → اطلب الاختبار → جاهز بتنسيق PDF احترافي للطباعة والتوزيع</p>
            </div>
          </div>

          {/* Exam Preview */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10">
              <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#22c55e]/15 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#22c55e]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">نموذج اختبار حقيقي — كيمياء</h4>
                  <p className="text-gray-500 text-xs">من الكتاب المدرسي مع الإجابات وأرقام الصفحات</p>
                </div>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1ldVt1B0GcWTjav0TyGY3wBFsyYNYe1KC/preview"
                className="w-full border-0"
                style={{ height: '450px' }}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: COURSE CONTENT + BONUSES ===== */}
      <section className="py-12 md:py-16 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2">محتوى الكورس التعليمي</h2>
          <p className="text-gray-400 text-center mb-10 text-sm">5 وحدات - 20 درس عملي مباشر</p>

          <div className="space-y-3 mb-12">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#f59e0b]/15 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-base">{mod.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs bg-[#f59e0b]/15 text-[#f59e0b] px-2 py-0.5 rounded-full">{mod.lessons} محاضرات</span>
                        <span className="text-xs text-gray-500">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-white/5 pt-3">
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <h3 className="text-xl md:text-2xl font-black text-center mb-2">مازلت متردد؟</h3>
          <p className="text-gray-400 text-center mb-8 text-sm">
            هدايا مجانية بقيمة <span className="text-[#f59e0b] font-bold">$45</span> تحصل عليها مجاناً
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#f59e0b]/10 hover:border-[#f59e0b]/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <bonus.icon className="w-7 h-7 text-[#f59e0b]" />
                  <span className="text-xs font-bold text-gray-500 tracking-wider">{bonus.subtitle}</span>
                </div>
                <h4 className="font-bold text-white mb-1">{bonus.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{bonus.desc}</p>
                <div className="border-t border-white/5 pt-2">
                  <span className="text-xs text-gray-500">سعره </span>
                  <span className="text-[#f59e0b] font-bold line-through text-xs">{bonus.value}</span>
                  <span className="text-xs text-gray-500">، </span>
                  <span className="text-[#22c55e] font-bold text-xs">لكن هتحصل عليه مجاناً!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: REVIEWS + TRAINER ===== */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2">شو قالوا المشتركين؟</h2>
          <p className="text-gray-400 text-center mb-10 text-sm">محادثات حقيقية مع مشتركين</p>

          <div className="grid md:grid-cols-3 gap-4">
            {whatsappChats.map((chat, ci) => (
              <div key={ci} className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  &ldquo;{chat.messages.filter(m => m.from === 'them').map(m => m.text).join(' ')}&rdquo;
                </p>
                <div className="border-t border-white/5 pt-2">
                  <p className="text-[#f59e0b] font-bold text-xs">{chat.contactName}</p>
                  <p className="text-gray-500 text-xs">{chat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trainer */}
          <div className="mt-12 bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="نواف البوسطه - مدرب الذكاء الاصطناعي بالتعليم"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#f59e0b]/30 shadow-lg shadow-[#f59e0b]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-black text-white mb-1">نواف البوسطه</h3>
              <p className="text-[#f59e0b] font-bold text-sm mb-2">مدرب في الذكاء الاصطناعي التطبيقي بالتعليم</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                أنا معلم متلكم، كنت بقعد ساعات بتحضير الدروس. لما اكتشفت هالأدوات حياتي انقلبت. صرت بعمل اختبار بنسختين بـ 5 دقائق وبعمل مذكرات PDF احترافية بدقائق. مؤمن إن كل معلم يقدر يستفيد من هالأدوات بغض النظر عن خلفيته التقنية.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-[#1877F2]/20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  فيسبوك
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#E4405F]/15 hover:bg-[#E4405F]/25 text-[#E4405F] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-[#E4405F]/20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  noaf.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: PRICING + FAQ + FINAL CTA ===== */}
      <section className="py-12 md:py-16 bg-[#111] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          {/* Pricing Summary */}
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8">كل ما ستحصل عليه</h2>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 mb-10">
            {[
              { title: 'كورس الذكاء الاصطناعي بالتعليم', desc: 'محتوى عملي مباشر', value: currentPricing.oldPrice },
              ...bonuses.map((b) => ({ title: b.title, desc: '', value: b.value })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'border-t border-white/5 pt-3 mt-3' : 'pb-3'}`}>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
                </div>
                <span className="text-[#f59e0b] font-bold shrink-0 mr-3 text-sm">
                  {item.value} <span className="text-[#22c55e] text-xs">مجاناً</span>
                </span>
              </div>
            ))}

            <div className="border-t-2 border-[#f59e0b]/30 mt-4 pt-4">
              <div className="text-center">
                <span className="text-4xl md:text-5xl font-black text-[#22c55e]">{currentPricing.price}</span>
                <p className="text-gray-400 mt-1 text-sm">بدل <span className="text-[#f59e0b] line-through font-bold">{currentPricing.oldPrice}</span></p>
                <p className="text-gray-400 text-xs">دفع واحد - وصول دائم</p>
                {region === 'syria' ? (
                  <div className="mt-3 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-lg px-4 py-2.5 inline-block">
                    <span className="text-[#22c55e] font-black text-sm">🇸🇾 سعر خاص لداخل سوريا — خصم يصل الى 90%</span>
                  </div>
                ) : (
                  <div className="mt-3 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg px-4 py-2.5 inline-block">
                    <span className="text-[#f59e0b] font-black text-sm">🇸🇾 داخل سوريا سعر خاص — خصم يصل الى 90%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <GuaranteeBadge />
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن - {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* FAQ */}
          <h3 className="text-xl md:text-2xl font-black text-center mb-6">الأسئلة الشائعة</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-right hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-white text-sm ml-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-10 bg-[#1a1a1a] rounded-2xl p-6 border border-[#25D366]/20 text-center">
            <div className="w-16 h-16 bg-[#25D366]/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-2">جاهز تبدأ؟</h3>
            <p className="text-gray-400 text-sm mb-4">تواصل عبر واتساب ورح نبعثلك رابط الكورس فوراً</p>

            <div className="bg-[#0a0a0a] rounded-xl p-3 mb-4 border border-white/5 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#22c55e]">١. تواصل واتساب</span>
                <span className="text-gray-600">←</span>
                <span className="text-[#22c55e]">٢. حول {currentPricing.price}</span>
                <span className="text-gray-600">←</span>
                <span className="text-[#22c55e]">٣. استلم الرابط</span>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30"
            >
              اشترك الآن - {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>

            <div className="mt-3 flex justify-center">
              <GuaranteeBadge />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] py-6 mt-auto border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-2">
            <span className="text-[#f59e0b] font-black">نواف البوسطه</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-400 text-sm">المدرب</span>
          </div>
          <p className="text-gray-600 text-xs">كورس الذكاء الاصطناعي بالتعليم | للمعلمين والدكاترة الجامعيين والمدربين</p>
          <p className="text-xs mt-1 text-gray-700">جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-all hover:scale-110 ${showStickyBar ? 'md:flex hidden' : 'flex'}`}
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* ===== STICKY MOBILE CTA BAR ===== */}
      {mounted && showStickyBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div>
            <span className="text-[#22c55e] font-black text-xl">{currentPricing.price}</span>
            <span className="text-gray-500 text-xs mr-1">بدل <span className="line-through">{currentPricing.oldPrice}</span></span>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-6 py-3 rounded-xl text-base transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#25D366]/30"
          >
            اشترك الآن
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* ===== EXIT INTENT POPUP ===== */}
      {mounted && showExitPopup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowExitPopup(false)} />
          <div
            className="relative bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full border border-[#f59e0b]/30 shadow-2xl text-center"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-3xl mb-3">⏳</div>
            <h3 className="text-xl font-black text-white mb-2">لحظة! فيه عرض خاص</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              عرض {currentPricing.price} لفترة محدودة بس. لما يخلص السعر بيرجع {currentPricing.oldPrice}. سجّل هلأ قبل ما يخلص العرض
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-3 rounded-xl text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/30 mb-2"
              onClick={() => setShowExitPopup(false)}
            >
              سجّل الآن {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setShowExitPopup(false)}
              className="text-gray-500 hover:text-gray-400 text-xs transition-colors"
            >
              لا شكراً
            </button>
          </div>
        </div>
      )}

      {/* ===== ANIMATIONS ===== */}
      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
