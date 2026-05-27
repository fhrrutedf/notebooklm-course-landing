'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
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
  Building2,
} from 'lucide-react'

// Animated Count-Up Component
function CountUp({ target, duration = 2000, suffix = '', color = 'text-[#A735D7]' }: { target: number; duration?: number; suffix?: string; color?: string }) {
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

// Countdown Timer Component — client-only rendered via dynamic import (no SSR)
function CountdownTimerInner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const OFFER_KEY = 'offer_start_date'
    const OFFER_DAYS = 14

    let stored = localStorage.getItem(OFFER_KEY)
    let start: Date
    if (stored) {
      start = new Date(stored)
    } else {
      start = new Date()
      localStorage.setItem(OFFER_KEY, start.toISOString())
    }
    const endDate = new Date(start.getTime() + OFFER_DAYS * 24 * 60 * 60 * 1000)

    const tick = () => {
      const diff = endDate.getTime() - Date.now()
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
  }, [])

  return (
    <div className="bg-[#FF0000]/10 border border-[#FF0000]/30 rounded-[20px] px-5 py-3 inline-flex items-center gap-3">
      <span className="text-[#FF0000] font-bold text-sm">خصم ينتهي قريباً ⏰</span>
      <div className="flex items-center gap-1.5">
        {[
          { value: timeLeft.days, label: 'يوم' },
          { value: timeLeft.hours, label: 'ساعة' },
          { value: timeLeft.minutes, label: 'دقيقة' },
          { value: timeLeft.seconds, label: 'ثانية' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="bg-[#000] rounded-lg px-2.5 py-1 min-w-[42px] text-center">
              <span className="text-[#FF0000] font-black text-lg">{String(item.value).padStart(2, '0')}</span>
            </div>
            {i < 3 && <span className="text-[#FF0000]/50 text-lg font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Dynamic import with ssr: false prevents hydration mismatch
const CountdownTimer = dynamic(() => Promise.resolve(CountdownTimerInner), { ssr: false })

// Guarantee Badge (reused in 3 locations)
function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-[#FFD814] text-sm font-bold bg-[#FFD814]/10 border border-[#FFD814]/20 rounded-[12px] px-4 py-2.5">
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
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#000] text-white" style={{ fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>

      {/* ===== STICKY TOP URGENCY BAR ===== */}
      <div className="bg-[#FF0000] text-white py-2 px-4 sticky top-0 z-50 flex items-center justify-center gap-4">
        <p className="text-sm font-bold">🔥 عرض محدود — خصم ينتهي قريباً!{geoLoaded ? ` سجّل الآن بـ ${currentPricing.price} بدل ${currentPricing.oldPrice}` : ''}</p>
        <a href="/schools" className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full transition-colors flex items-center gap-1.5 shrink-0 border border-white/30">
          <Building2 className="w-3.5 h-3.5" />
          للمدارس
        </a>
      </div>

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative bg-[#000] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#614BEB]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A735D7]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-12 pb-6 md:pt-16 md:pb-8 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#614BEB] to-[#A735D7] text-white px-5 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            كورس عملي - المدرب نواف البوسطه
          </div>

          {/* Offer Countdown */}
          <div className="mt-4 flex justify-center">
            <CountdownTimer />
          </div>

          {/* Single punchy headline with gradient text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-5 mt-6">
            حوّل 3 ساعات تحضير
            <br />
            لـ{' '}
            <span
              className="font-black"
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              15 دقيقة
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            أدوات ذكاء اصطناعي مجانية بتحول الكتاب المدرسي لاختبارات بنسختين، مذكرات PDF احترافية، وشروحات صوتية — كل شي موثق بأرقام الصفحات
          </p>

          {/* CTA - RED */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30 mb-4"
          >
            اشترك الآن - {currentPricing.price} فقط
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Syria Price Badge - always visible */}
          <div className="mt-3 flex justify-center">
            <div className="bg-[#FFD814]/10 border border-[#FFD814]/25 rounded-[12px] px-5 py-3 inline-flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇸🇾</span>
                <span className="text-[#FFD814] font-black text-sm">داخل سوريا: $14 فقط</span>
                <span className="text-[#FFD814]/60 text-xs">بدل $120</span>
              </div>
              <span className="text-[#FFD814]/70 text-xs">لأننا مانعرف نترك المعلم السوري لحاله — وضعو ما بيسمحلو يدفع أكتر</span>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-4">
            <GuaranteeBadge />
          </div>

          {/* Intro Video - YouTube Shorts */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative rounded-[20px] overflow-hidden bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] group">
              <iframe
                src="https://www.youtube.com/embed/Ze-HjqkxIJM?rel=0&modestbranding=1"
                className="w-full border-0"
                style={{ aspectRatio: '9/16', maxHeight: '600px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="تعريف بالكورس - المدرب نواف البوسطه"
              />
              <div className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }} />
            </div>
            <p className="text-center text-white/50 text-xs mt-2">
              شوف تعريف الكورس — فيديو قصير
            </p>
          </div>

          {/* Social Proof Counters - White cards on dark */}
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg mx-auto">
            <div className="bg-white rounded-[20px] p-4 text-center shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#614BEB]" />
              </div>
              <CountUp target={465} suffix="+" color="text-[#614BEB]" />
              <div className="text-[#565A7C] text-xs mt-1 font-bold">معلم ومدرب ودكتور سجّلو</div>
            </div>
            <div className="bg-white rounded-[20px] p-4 text-center shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Globe className="w-5 h-5 text-[#A735D7]" />
              </div>
              <CountUp target={106} suffix="+" color="text-[#A735D7]" />
              <div className="text-[#565A7C] text-xs mt-1 font-bold">منصة ومدرسة سجّلو</div>
            </div>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-4 gap-4 mt-4 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#FFD814]">20</div>
              <div className="text-white/50 text-[10px] mt-0.5">درس عملي</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#FFD814]">5</div>
              <div className="text-white/50 text-[10px] mt-0.5">وحدات</div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-black text-[#FFD814]">مجاني</div>
              <div className="text-white/50 text-[10px] mt-0.5">الأداة الأساسية</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-[#FFD814] text-[#FFD814]" />
                ))}
              </div>
              <div className="text-white/50 text-[10px] mt-0.5">4.9/5 تقييم</div>
            </div>
          </div>

          {/* Credibility: Google product + Verified */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Globe className="w-3.5 h-3.5 text-[#614BEB]" />
              أداة من Google
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Users className="w-3.5 h-3.5 text-[#A735D7]" />
              معلمين من كل المحافظات اشتركوا
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Shield className="w-3.5 h-3.5 text-[#FFD814]" />
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
                    <div className="w-8 h-8 bg-[#614BEB]/20 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#614BEB]" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#614BEB] font-bold">خطوة {item.step}</div>
                      <div className="text-xs text-white/50">{item.text}</div>
                    </div>
                  </div>
                  {i < 2 && <ArrowLeft className="w-4 h-4 text-white/20 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: BEFORE/AFTER — Light background ===== */}
      <section className="py-12 md:py-16 bg-[#F5F3F3]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-[#111]">
            <span className="text-[#FF0000]">قبل</span> الكورس vs{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              بعد
            </span>{' '}
            الكورس
          </h2>
          <p className="text-[#565A7C] text-center mb-10 max-w-xl mx-auto text-sm">
            الفرق واضح - شوف كيف بيتغير يومك كمعلم
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* BEFORE - White card */}
            <div className="bg-white rounded-[20px] p-6 border-2 border-red-200 relative shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="absolute -top-3 right-6 bg-[#FF0000] text-white text-sm font-black px-4 py-1 rounded-full">قبل</div>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF0000] mt-0.5">⏰</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">2-3 ساعات بتحضير درس واحد</p>
                    <p className="text-[#565A7C] text-xs">بتقعد من العصر للمغرب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF0000] mt-0.5">📝</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">أكتب الأسئلة بإيدي - ساعة ونص عشان 20 سؤال</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF0000] mt-0.5">📄</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">نسخة وحدة من الاختبار - الطلاب بينقلوا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF0000] mt-0.5">💻</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">تنسيق الوورد بياخد ساعات وبالنهاية مو مرتب</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER - White card */}
            <div className="bg-white rounded-[20px] p-6 border-2 border-[#614BEB]/30 relative shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div
                className="absolute -top-3 right-6 text-white text-sm font-black px-4 py-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
              >
                بعد
              </div>
              <div className="space-y-4 mt-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5">⚡</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">15 دقيقة بتحضير نفس الدرس</p>
                    <p className="text-[#614BEB] text-xs font-bold">بتخلص وأنت مستغرب!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5">🤖</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">AI بيعمللك 20 سؤال بـ 3 دقائق من الكتاب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5">📋</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">نسختين مختلفات + إجابات نموذجية + رقم الصفحة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5">🖨️</span>
                  <div>
                    <p className="text-[#111] font-bold text-sm">PDF احترافي جاهز للطباعة بغلاف وتنسيق مرتب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loss Aversion */}
          <div className="max-w-3xl mx-auto mt-8 bg-[#FF0000]/5 rounded-[20px] p-4 border border-[#FF0000]/20">
            <p className="text-center text-[#111] font-bold text-sm">
              كل أسبوع بتأخر = <span className="text-[#FF0000] font-black">5 ساعات</span> ضائعة × 40 أسبوع = <span className="text-[#FF0000] font-black">200 ساعة بسنة</span>
            </p>
            <p className="text-center text-[#565A7C] text-xs mt-1">
              الكورس بـ <span className="text-[#FF0000] font-black">{currentPricing.price}</span> = {currentPricing.dailyCost} — وبتحفّظ 200 ساعة
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30"
            >
              اشترك الآن {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TOOLS & RESULTS — Dark navy ===== */}
      <section className="py-12 md:py-16 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 text-white">
            شو رح تتعلم تعمل؟
          </h2>
          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto text-sm">
            من رفع المصدر لحد إخراج اختبار وملف PDF جاهز للطباعة - كل شي عملي
          </p>

          {/* Tool Cards - White cards on dark */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Tool 1 */}
            <div className="bg-white rounded-[20px] p-6 border border-[#614BEB]/20 hover:border-[#614BEB]/50 transition-colors shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#614BEB]/15 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#614BEB]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111] text-lg">أداة رفع المصادر والأسئلة</h3>
                  <span
                    className="text-sm font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    مجانية تماماً - من Google
                  </span>
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
                    <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="bg-white rounded-[20px] p-6 border border-[#A735D7]/20 hover:border-[#A735D7]/50 transition-colors shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#A735D7]/15 rounded-xl flex items-center justify-center">
                  <FileOutput className="w-6 h-6 text-[#A735D7]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#111] text-lg">أداة التصميم والتنسيق الذكي</h3>
                  <span className="text-sm text-[#A735D7] font-bold">لإنشاء ملفات PDF احترافية</span>
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
                    <CheckCircle2 className="w-4 h-4 text-[#A735D7] mt-0.5 shrink-0" />
                    <span className="text-[#565A7C] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Savings Table - White card */}
          <h3 className="text-lg md:text-xl font-black text-center mb-4 text-white">كم وقت بتوفر؟</h3>
          <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}>
                  <th className="py-3 px-4 text-right text-white font-bold text-sm">المهمة</th>
                  <th className="py-3 px-4 text-center text-white/90 font-bold text-sm">الطريقة العادية</th>
                  <th className="py-3 px-4 text-center text-white font-bold text-sm">بـ AI</th>
                  <th className="py-3 px-4 text-center text-white font-bold text-sm">التوفير</th>
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
                  <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-[#F7F7F7]'}>
                    <td className="py-2.5 px-4 text-right font-medium text-[#111] text-sm">{row.task}</td>
                    <td className="py-2.5 px-4 text-center text-[#FF0000] text-sm">{row.old}</td>
                    <td className="py-2.5 px-4 text-center text-[#614BEB] font-medium text-sm">{row.ai}</td>
                    <td className="py-2.5 px-4 text-center text-[#FFD814] font-bold text-sm">{row.save}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Results Gallery CTA ===== */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_6px_16px_rgba(0,0,0,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#614BEB]/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#A735D7]/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {['✨', '🧠', '📄', '📊', '🎬', '🎙️'].map((icon, i) => (
                    <span key={i} className="text-2xl md:text-3xl">{icon}</span>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#111] mb-3">
                  شوف عينات حقيقية من نتائج الشغل
                </h3>
                <p className="text-[#565A7C] text-sm mb-6 max-w-md mx-auto">
                  إنفوجرافيك، عروض تقديمية، فيديوهات، وبودكاست — ملفات حقيقية من كتب كيمياء وعلوم وانكليزي
                </p>
                <a
                  href="/results"
                  className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30"
                >
                  شوف العينات الحقيقية
                  <ArrowLeft className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: COURSE CONTENT + BONUSES — Black ===== */}
      <section className="py-12 md:py-16 bg-[#000]">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2 text-white">محتوى الكورس التعليمي</h2>
          <p className="text-white/70 text-center mb-10 text-sm">5 وحدات - 20 درس عملي مباشر</p>

          <div className="space-y-3 mb-12">
            {courseModules.map((mod, i) => (
              <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-right hover:bg-[#F7F7F7] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-[#111] text-base">{mod.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs text-white px-2 py-0.5 rounded-full font-bold"
                          style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
                        >
                          {mod.lessons} محاضرات
                        </span>
                        <span className="text-xs text-[#565A7C]">{mod.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#565A7C] transition-transform shrink-0 ${openModule === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openModule === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[#F5F3F3] pt-3">
                    <ul className="space-y-2">
                      {mod.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#614BEB] mt-0.5 shrink-0" />
                          <span className="text-[#565A7C] text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <h3 className="text-xl md:text-2xl font-black text-center mb-2 text-white">مازلت متردد؟</h3>
          <p className="text-white/70 text-center mb-8 text-sm">
            هدايا مجانية بقيمة{' '}
            <span className="text-[#FFD814] font-bold">$45</span>{' '}
            تحصل عليها مجاناً
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {bonuses.map((bonus, i) => (
              <div key={i} className="bg-white rounded-[20px] p-5 border border-[#FFD814]/20 hover:border-[#FFD814]/50 transition-colors shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <bonus.icon className="w-7 h-7 text-[#FFD814]" />
                  <span className="text-xs font-bold text-[#565A7C] tracking-wider">{bonus.subtitle}</span>
                </div>
                <h4 className="font-bold text-[#111] mb-1">{bonus.title}</h4>
                <p className="text-[#565A7C] text-xs leading-relaxed mb-3">{bonus.desc}</p>
                <div className="border-t border-[#F5F3F3] pt-2">
                  <span className="text-xs text-[#565A7C]">سعره </span>
                  <span className="text-[#FF0000] font-bold line-through text-xs">{bonus.value}</span>
                  <span className="text-xs text-[#565A7C]">، </span>
                  <span
                    className="font-bold text-xs"
                    style={{
                      background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    لكن هتحصل عليه مجاناً!
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: TRAINER — Dark navy ===== */}
      <section className="py-12 md:py-16 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-white rounded-[20px] p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
            <div className="shrink-0">
              <img
                src="/images/trainer-nawaf.jpg"
                alt="نواف البوسطه - مدرب الذكاء الاصطناعي بالتعليم"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#614BEB]/30 shadow-lg shadow-[#614BEB]/20"
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-black text-[#111] mb-1">نواف البوسطه</h3>
              <p
                className="font-bold text-sm mb-2"
                style={{
                  background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                مدرب في الذكاء الاصطناعي التطبيقي بالتعليم
              </p>
              <p className="text-[#565A7C] text-sm leading-relaxed mb-3">
                أنا معلم متلكم، كنت بقعد ساعات بتحضير الدروس. لما اكتشفت هالأدوات حياتي انقلبت. صرت بعمل اختبار بنسختين بـ 5 دقائق وبعمل مذكرات PDF احترافية بدقائق. مؤمن إن كل معلم يقدر يستفيد من هالأدوات بغض النظر عن خلفيته التقنية.
              </p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/share/18UPsSwfwQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-[#1877F2]/20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  فيسبوك
                </a>
                <a
                  href="https://instagram.com/noaf.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-[#E4405F]/20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  noaf.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: PRICING + FAQ + FINAL CTA — Light ===== */}
      <section className="py-12 md:py-16 bg-[#F7F7F7]">
        <div className="max-w-[1000px] mx-auto px-4">
          {/* Pricing Summary */}
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-[#111]">كل ما ستحصل عليه</h2>

          <div className="bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] mb-10 max-w-xl mx-auto">
            {[
              { title: 'كورس الذكاء الاصطناعي بالتعليم', desc: 'محتوى عملي مباشر', value: currentPricing.oldPrice },
              ...bonuses.map((b) => ({ title: b.title, desc: '', value: b.value })),
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'border-t border-[#F5F3F3] pt-3 mt-3' : 'pb-3'}`}>
                <div>
                  <h4 className="font-bold text-[#111] text-sm">{item.title}</h4>
                  {item.desc && <p className="text-xs text-[#565A7C]">{item.desc}</p>}
                </div>
                <span className="text-[#FF0000] font-bold shrink-0 mr-3 text-sm">
                  {item.value}{' '}
                  <span
                    className="text-xs font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    مجاناً
                  </span>
                </span>
              </div>
            ))}

            <div className="border-t-2 border-[#614BEB]/30 mt-4 pt-4">
              <div className="text-center">
                <span className="text-4xl md:text-5xl font-black text-[#FF0000]">{currentPricing.price}</span>
                <p className="text-[#565A7C] mt-1 text-sm">بدل <span className="text-[#FF0000] line-through font-bold">{currentPricing.oldPrice}</span></p>
                <p className="text-[#565A7C] text-xs">دفع واحد - وصول دائم</p>

                {/* Spots left counter */}
                <div className="mt-3 bg-[#FF0000]/5 border border-[#FF0000]/20 rounded-lg px-4 py-2 inline-flex items-center gap-2">
                  <span className="text-[#FF0000] text-xs font-bold">🔥 بقي 23 مكان فقط!</span>
                </div>

                {region === 'syria' ? (
                  <div className="mt-3 bg-[#FFD814]/10 border border-[#FFD814]/20 rounded-[12px] px-4 py-3 inline-flex flex-col items-center gap-1">
                    <span className="text-[#FFD814] font-black text-sm">🇸🇾 سعر خاص لداخل سوريا — خصم يصل الى 90%</span>
                    <span className="text-[#FFD814]/70 text-xs">لأننا مانعرف نترك المعلم السوري لحاله — وضعو ما بيسمحلو يدفع أكتر</span>
                  </div>
                ) : (
                  <div className="mt-3 bg-[#614BEB]/10 border border-[#614BEB]/20 rounded-[12px] px-4 py-3 inline-flex flex-col items-center gap-1">
                    <span
                      className="font-black text-sm"
                      style={{
                        background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      🇸🇾 داخل سوريا سعر خاص — خصم يصل الى 90%
                    </span>
                    <span className="text-[#614BEB]/70 text-xs">لأننا مانعرف نترك المعلم السوري لحاله — وضعو ما بيسمحلو يدفع أكتر</span>
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
              className="w-full mt-4 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#FF0000]/30"
            >
              اشترك الآن - {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* FAQ */}
          <h3 className="text-xl md:text-2xl font-black text-center mb-6 text-[#111]">الأسئلة الشائعة</h3>
          <div className="space-y-3 max-w-xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-right hover:bg-[#F7F7F7] transition-colors"
                >
                  <span className="font-bold text-[#111] text-sm ml-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#565A7C] transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-[#565A7C] text-sm leading-relaxed border-t border-[#F5F3F3] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-10 bg-white rounded-[20px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-center max-w-xl mx-auto border border-[#FF0000]/20">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(90deg, #614BEB, #A735D7)' }}
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-2 text-[#111]">جاهز تبدأ؟</h3>
            <p className="text-[#565A7C] text-sm mb-4">تواصل عبر واتساب ورح نبعثلك رابط الكورس فوراً</p>

            <div className="bg-[#F7F7F7] rounded-xl p-3 mb-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#614BEB]">١. تواصل واتساب</span>
                <span className="text-[#565A7C]">←</span>
                <span className="text-[#A735D7]">٢. حول {currentPricing.price}</span>
                <span className="text-[#565A7C]">←</span>
                <span className="text-[#614BEB]">٣. استلم الرابط</span>
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#FF0000]/30"
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

      {/* ===== SCHOOLS BANNER — Before Footer ===== */}
      <section className="py-10 md:py-14 bg-[#011839]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_6px_16px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#614BEB]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#A735D7]/5 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-[16px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #614BEB, #A735D7)' }}>
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-center md:text-right flex-1">
                <h3 className="text-xl md:text-2xl font-black text-[#111] mb-2">
                  مدير مدرسة أو مشرف تربوي؟
                </h3>
                <p className="text-[#565A7C] text-sm leading-relaxed">
                  وفّر على مدرستك ساعات من التحضير اليومي. اشتراكات جماعية بأسعار خاصة للمدارس والمنصات التعليمية — بدءاً من 5 معلمين فقط
                </p>
              </div>
              <a
                href="/schools"
                className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/30 shrink-0"
              >
                عروض المدارس
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER — Black ===== */}
      <footer className="bg-[#000] py-6 mt-auto border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <div className="mb-2">
            <span
              className="font-black"
              style={{
                background: 'linear-gradient(90deg, #614BEB, #A735D7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              نواف البوسطه
            </span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-white/70 text-sm">المدرب</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 mb-2">
            <a href="/schools" className="text-white/50 hover:text-white text-xs transition-colors flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              عروض المدارس
            </a>
            <span className="text-white/20">|</span>
            <a href="/results" className="text-white/50 hover:text-white text-xs transition-colors">
              عينات النتائج
            </a>
          </div>
          <p className="text-white/40 text-xs">كورس الذكاء الاصطناعي بالتعليم | للمعلمين والدكاترة الجامعيين والمدربين</p>
          <p className="text-xs mt-1 text-white/25">جميع الحقوق محفوظة 2026</p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON — RED ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#FF0000] hover:bg-[#E93D3D] rounded-full flex items-center justify-center shadow-lg shadow-[#FF0000]/40 transition-all hover:scale-110 ${showStickyBar ? 'md:flex hidden' : 'flex'}`}
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* ===== STICKY MOBILE CTA BAR — RED ===== */}
      {mounted && showStickyBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#000]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div>
            <span className="text-[#FF0000] font-black text-xl">{currentPricing.price}</span>
            <span className="text-white/50 text-xs mr-1">بدل <span className="line-through">{currentPricing.oldPrice}</span></span>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black px-6 py-3 rounded-xl text-base transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#FF0000]/30"
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
            className="relative bg-white rounded-[20px] p-6 max-w-sm w-full border border-[#614BEB]/30 shadow-2xl text-center"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-3 left-3 text-[#565A7C] hover:text-[#111] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-3xl mb-3">⏳</div>
            <h3 className="text-xl font-black text-[#111] mb-2">لحظة! فيه عرض خاص</h3>
            <p className="text-[#565A7C] text-sm leading-relaxed mb-4">
              عرض {currentPricing.price} لفترة محدودة بس. لما يخلص السعر بيرجع {currentPricing.oldPrice}. سجّل هلأ قبل ما يخلص العرض
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF0000] hover:bg-[#E93D3D] text-white font-black py-3 rounded-xl text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-[#FF0000]/30 mb-2"
              onClick={() => setShowExitPopup(false)}
            >
              سجّل الآن {currentPricing.price}
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setShowExitPopup(false)}
              className="text-[#565A7C] hover:text-[#111] text-xs transition-colors"
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
