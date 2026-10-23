'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { trackWhatsApp } from '@/lib/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import { TekramPayButton } from '@/components/TekramPayButton'
import { RegistrationModal } from '@/components/RegistrationModal'
import { openTekramCheckout } from '@/lib/tekram'
import { useGeoPricing } from '@/hooks/useGeoPricing'
import {
  ArrowDown,
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  FileOutput,
  FileText,
  Headphones,
  HelpCircle,
  Lock,
  MessageCircle,
  Play,
  Presentation,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
  ZoomIn,
} from 'lucide-react'

type TestimonialScreenshot = {
  id: number
  src: string
  width: number
  height: number
  tag: string
  highlight: string
  detail: string
}

const testimonialScreenshots: TestimonialScreenshot[] = [
  {
    id: 1,
    src: '/images/testimonials/testimonial-1.jpg',
    width: 1005,
    height: 591,
    tag: '📊 الإنفوجرافيك والملخصات البصرية',
    highlight: '«قسم الإنفوجرافيك فتحلي عيوني إنو التصميم مو بس ألوان.. صار عندي قدرة أعمل ملخص بصري للعلوم أو الكيمياء أو أي درس فيه خطوات ومفاهيم معقدة»',
    detail: 'تعلّم صياغة العناوين الجاذبة وترتيب المعلومات بصرياً ليلتقط الطالب فكرة الدرس بلمحة سريعة.',
  },
  {
    id: 2,
    src: '/images/testimonials/testimonial-2.jpg',
    width: 968,
    height: 657,
    tag: '🖥️ العروض التقديمية والسلايدات',
    highlight: '«السلايدات كانت وجع رأس.. هلق صار عندي عرض بقدر راجعه وعدل عليه بثواني بدل ما صمم كل شيء من الصفر»',
    detail: 'تحويل محتوى الدرس لشرائح مرتبة، كل شريحة لها هدف تعليمي وصورة داعمة دون تضييع ساعات بالتصميم.',
  },
  {
    id: 3,
    src: '/images/testimonials/testimonial-3.jpg',
    width: 1024,
    height: 511,
    tag: '🎬 الفيديوهات والسيناريو التعليمي',
    highlight: '«تعلمت كيف أكتب سيناريو مرتب، وقسم الشرح لمشاهد، وحدد شو يطلع ع الشاشة وشو ينحكى بصوت.. جهزت مادة للطلاب يدرسوها برات الحصة»',
    detail: 'نقلة نوعية تتجاوز الـ PDF إلى إنتاج دروس فيديو تعليمية بسيناريو احترافي يشاهده الطلاب في أي وقت.',
  },
  {
    id: 4,
    src: '/images/testimonials/testimonial-4.jpg',
    width: 952,
    height: 484,
    tag: '🧠 الخرائط الذهنية وهيكلة الدرس',
    highlight: '«الخريطة الذهنية ساعدتني أفهم هيكل الدرس.. مفروزة بصرياً من الفكرة الأساسية للتفاصيل، ومفيدة جداً وقت مراجعة الفحوصات»',
    detail: 'تفكيك الدروس المعقدة وتوزيع الأفكار شجرياً وبصرياً لتسهيل الشرح على المعلم والمراجعة على الطالب.',
  },
]

const subscribeAffiliate = () => () => {}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const trackGoogleEvent = (eventName: string, parameters: Record<string, string>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters)
  }
}

// الألوان المعتمدة للهوية البصرية
const primaryRed = '#E31E24'
const darkRed = '#B92723'
const inkBlack = '#141414'
const pureWhite = '#FFFFFF'
const lightPink = '#FFF0F2'
const mutedText = '#666666'
const paperBg = '#F8F8F6'
const softBg = '#F0F0EE'
const lineBorder = '#E2E2DF'

export default function LandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [selectedScreenshot, setSelectedScreenshot] = useState<TestimonialScreenshot | null>(null)
  const exitPopupShownRef = useRef(false)

  const affiliateRef = useSyncExternalStore(
    subscribeAffiliate,
    () => resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || '',
    () => '',
  )
  const pricing = useGeoPricing()

  useEffect(() => {
    const directRef = resolveAffiliateRef(window.location.search)
    if (directRef) window.localStorage.setItem('course_affiliate_ref', directRef)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedScreenshot(null)
    }
    if (selectedScreenshot) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedScreenshot])

  const triggerExitPopup = useCallback(() => {
    if (exitPopupShownRef.current) return
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('exit_popup_shown')) return
    exitPopupShownRef.current = true
    window.sessionStorage.setItem('exit_popup_shown', '1')
    setShowExitPopup(true)
  }, [])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerExitPopup()
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    const idleTimer = window.setTimeout(() => {
      triggerExitPopup()
    }, 75_000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.clearTimeout(idleTimer)
    }
  }, [triggerExitPopup])

  const whatsappNumber = '963985323170'
  const createWhatsAppLink = (message: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${message}${affiliateMessageSuffix(affiliateRef)}`)}`
  const resultsHref = referralHref('/results', affiliateRef)

  const trackWhatsAppClick = (source: string) => {
    track('whatsapp_click', { source, affiliate_ref: affiliateRef || 'direct' })
    trackGoogleEvent('click_whatsapp', { button_location: source })
    trackWhatsApp(source as any, { affiliate_ref: affiliateRef || 'direct' })
  }

  const trackResultsOpen = (source: string) => {
    track('results_open', { source, affiliate_ref: affiliateRef || 'direct' })
    trackGoogleEvent('view_samples', { button_location: source })
  }

  const handleOpenRegistration = (source: string) => {
    track('open_registration_modal', { source, affiliate_ref: affiliateRef || 'direct' })
    trackGoogleEvent('click_register_button', { button_location: source })
    setIsRegistrationModalOpen(true)
  }

  // المراحل التدريبية الثلاث
  const phases = [
    {
      number: '1',
      phaseLabel: 'المرحلة الأولى',
      title: 'فهم المصدر وبناء الشرح',
      subtitle: 'من كتاب المنهج إلى شرح تفاعلي مخصص ومذكرات واضحة',
      lessonsCount: '6 محاضرات مسجلة',
      overview:
        'في هذه المرحلة، تتعلم التعامل مع كتاب المنهج أو ملف PDF أو صورة أو ملاحظات خط اليد، واستخراج الأفكار والمفاهيم الأساسية، وتبسيط الدرس، وتجهيز شرح منظم ومذكرات مرجعية لكل درس دون الحاجة للبدء من صفحة بيضاء.',
      items: [
        'بناء خطة تحضير درس متكاملة خلال دقائق، تحفظها كقالب جاهز للاستخدام الأسبوعي.',
        'تبسيط المفاهيم الصعبة والمجردة بصياغة تناسب المرحلة العمرية لطلابك.',
        'تحويل المادة المكتوبة إلى فيديوهات تعليمية وسيناريوهات شرح واضحة.',
        'ملخص PDF مكتوب ومنظم لكل درس يقدم للطلاب كمذكرة مرجعية جاهزة.',
      ],
    },
    {
      number: '2',
      phaseLabel: 'المرحلة الثانية',
      title: 'بناء الأسئلة والأنشطة والاختبارات',
      subtitle: 'أتمتة الاختبارات وصناعة أوراق الامتحانات الرسمية بسلالم التصحيح',
      lessonsCount: '7 محاضرات مسجلة',
      overview:
        'في هذه المرحلة، تتعلم إعداد الأسئلة المتنوعة، والأنشطة الصفية، والاختبارات الشهرية والنهائية، وأوراق الامتحان الرسمية مع سلالم التصحيح، مع بقاء التدقيق والمراجعة التربوية بيدك أنت كمعلم قبل الطباعة والاستخدام.',
      items: [
        'بنك أسئلة متدرج: صح وخطأ، اختيار من متعدد، وأسئلة تفكير نقدي مع سلم تصحيح نموذجي.',
        'تصدير الاختبار إلى ملف Word قابل للتعديل أو عرض PowerPoint تظهر إجاباته تفاعلياً.',
        'إخراج ورقة امتحان رسمية جاهزة للطباعة خلال نحو 18 دقيقة مع الترويسة وهوامش مريحة.',
        'بطاقات مراجعة رقمية Flashcards تساعد الطلاب على تثبيت المفاهيم بطريقة تفاعلية.',
      ],
    },
    {
      number: '3',
      phaseLabel: 'المرحلة الثالثة',
      title: 'إخراج المحتوى بصيغ تعليمية متعددة',
      subtitle: 'الوسائط البصرية والسمعية والبحث الاحترافي المنظم',
      lessonsCount: '7 محاضرات مسجلة',
      overview:
        'في هذه المرحلة، تتعلم إخراج محتوى الدرس في قوالب متعددة تخاطب مختلف أنماط تعلم الطلاب: ملفات PDF مجهزة، عروض تقديمية تفاعلية، خرائط ذهنية، إنفوجرافيك بصري، وبودكاست صوتي يسهل الاستماع إليه أثناء التنقل.',
      items: [
        'تحويل فصل كامل إلى Podcast تعليمي بصوتين يتناقشان بطريقة طبيعية تناسب المراجعة.',
        'تفكيك الوحدات الطويلة إلى خرائط ذهنية وإنفوجرافيك يختصر الدرس المعقد في صفحة واحدة.',
        'إعداد تقارير علمية موثقة والبحث عن استراتيجيات تدريس حديثة من مصادر موثوقة.',
        'تحويل أي فيديو تعليمي من YouTube إلى ملخص دراسي منظم داخل دفترك الرقمي.',
      ],
    },
  ]

  // التسلسل العملي لتحضير كل درس
  const workflowSteps = [
    'كتاب المنهج أو مصدر الدرس',
    'تحديد الهدف التعليمي ومستوى الطلاب',
    'استخراج المفاهيم والأفكار الأساسية',
    'صياغة شرح مبسط وأمثلة توضيحية',
    'بناء أسئلة وأنشطة صفية تفاعلية',
    'إعداد اختبار مع سلم تصحيح نموذجي',
    'إخراج المخرجات: PDF، عرض، خريطة، أو بودكاست',
    'مراجعة المعلم وتعديل الناتج النهائي',
    'استخدام المحتوى بثقة داخل الصف',
  ]

  // الهدايا المرفقة
  const gifts = [
    {
      title: '4 جلسات تفاعلية مباشرة للأسئلة والتطبيق',
      value: 'متابعة مباشرة مشمولة',
      desc: 'جلسات مباشرة مع المدرب تطرح فيها أسئلتك ومادتك الدراسية ونطبق عليها معاً خطوة بخطوة (العدد محدود لضمان التفاعل).',
      icon: Users,
    },
    {
      title: 'ملخصات PDF وقوالب العمل لكل درس',
      value: 'قوالب وملخصات لكل درس',
      desc: 'مرجع سريع منظم يرافق كل محاضرة، تراجع منه خطوات التطبيق العملي مباشرة دون الحاجة لإعادة مشاهدة الفيديوهات.',
      icon: FileOutput,
    },
    {
      title: 'مكتبة البرومبتات وحزمة الأوامر الذهبية',
      value: '40 أمراً + 40 مثالاً عملياً',
      desc: 'حزمة أوامر تعليمية باللغة العربية مخصصة لتحضير الدروس وصياغة الأسئلة الامتحانية واستخراج الخرائط الذهنية بدقة.',
      icon: Zap,
    },
  ]

  // الأسئلة الشائعة
  const faqs = [
    [
      'ما هو نظام الكورس: مسجّل أم مباشر؟',
      'الكورس يجمع بين الاثنين بذكاء: محتوى أساسي مسجّل (5 ساعات ونصف مقسمة على 20 محاضرة عملية) تتابعه في أي وقت ومن هاتفك دون قيود، بالإضافة إلى 4 جلسات تفاعلية مباشرة للأسئلة والأجوبة والتطبيق العملي على مقررك الدراسي مع المدرب.',
    ],
    [
      'هل أحتاج جهاز لابتوب أو كمبيوتر للبدء والتطبيق؟',
      'لا، لا تحتاج لابتوب بالضرورة! الكورس مصمم بحيث يمكنك مشاهدة الدروس وتطبيق جميع الأدوات وبناء الشروحات والامتحانات والمحتوى التعليمي مباشرة من هاتفك المحمول أو جهازك اللوحي بسهولة.',
    ],
    [
      'هل الأدوات المستخدمة مجانية أم تتطلب اشتراكات؟',
      'المسار التدريبي يعتمد على أدوات ذكاء اصطناعي توفر خططاً مجانية (مثل NotebookLM وGemini)، ولا توجد أي رسوم أو تكاليف خفية ضمن رسوم الكورس. وفي حال طرأت أي تغييرات من مزودي الأدوات، نوضح البدائل والسياسات مباشرة.',
    ],
    [
      'كيف أطلب استرجاع المبلغ إذا لم يناسبني الكورس؟',
      'نقدم ضمان استرجاع كامل لمدة 7 أيام. يمكنك طلب الاسترجاع بكل بساطة وبدون أي تعقيد عبر رسالة واحدة إلى رقم WhatsApp الخاص بنا أو البريد الإلكتروني وسيتم إعادة المبلغ لك وفق الشروط.',
    ],
    [
      'هل المخرجات والامتحانات تلائم المناهج والكتب الدراسية التي أدرّسها؟',
      'نعم، نبدأ من كتاب المنهج أو المصدر الذي ترفقه أنت لأي مادة ومرحلة، ثم نراجع الناتج بشرياً قبل استخدامه. الكورس يعطيك إطار عمل تطبقه على أي كتاب أو مقرر دراسي، ويبقى قرار الدقة والملاءمة بيدك كمعلم.',
    ],
    [
      'كيف يتم الدفع والوصول للكورس؟',
      pricing.hideShamCash
        ? 'الدفع إلكتروني آمن ومباشر عبر بطاقات مدى Mada، البطاقات البنكية الدولية (فيزا / ماستركارد)، بايبال وتكرام باي. وفور إتمام الدفع، يتم تفعيل حسابك مباشرة واستلام رابط الوصول الدائم عبر Telegram.'
        : 'من داخل سوريا الدفع فوري وبسيط عبر شام كاش، ومن خارج سوريا الدفع متاح بالبطاقات البنكية (فيزا / ماستركارد)، مدى، بايبال وتكرام باي مع تفعيل مباشر. وفور الدفع تحصل على وصول دائم وفوري عبر Telegram.',
    ],
    [
      'هل الشهادة إلزامية؟',
      'لا. شهادة وزارة التنمية السورية اختيارية برسوم منفصلة، ويمكن طلبها بعد اختبار أو مشروع نهاية الكورس لمن يرغب.',
    ],
    [
      'هل أحصل على ملفات PDF وقوالب عمل مع كل درس؟',
      'نعم. كل درس يرافقه ملخص PDF وقالب عملي وخطوات واضحة حتى تراجع الخطوات وتطبقها دون الحاجة لإعادة مشاهدة الفيديو كاملاً.',
    ],
    [
      'هل الدورة مناسبة لمعلم المدرسة أو المدرّس الخصوصي؟',
      'نعم. الأمثلة قابلة للتخصيص حسب المادة والمرحلة، من الابتدائي وحتى البكالوريا، مع بقاء المعلم صاحب القرار في المراجعة والاستخدام.',
    ],
    [
      'هل أستطيع استخدام المخرجات في صفي مباشرة؟',
      'نعم، بعد مراجعة المحتوى وتعديله بما يناسب طلابك. تتعلم إخراج شرح واختبار وورقة عمل وعرض ومواد بصرية قابلة للاستخدام والتطوير.',
    ],
    [
      'هل أحصل على وصول دائم وتحديثات مستقبلية؟',
      'نعم. تسجيلك يمنحك وصولاً دائماً لمحتوى الكورس عبر Telegram مع التحديثات المستقبلية بحسب تطور المسارات والأدوات.',
    ],
  ]

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden text-[#141414]"
      style={{ backgroundColor: paperBg, fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}
    >
      {/* الشريط العلوي الثابت */}
      <nav className="border-b px-4 py-3.5 sm:py-4 sticky top-0 z-40 bg-white/95 backdrop-blur-md" style={{ borderColor: lineBorder }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm"
              style={{ backgroundColor: primaryRed }}
            >
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold sm:text-base text-[#141414]">
              كورس الذكاء الاصطناعي للمعلمين
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/schools"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold transition hover:opacity-85 text-[#E31E24]"
            >
              <Building2 className="h-4 w-4 shrink-0" />
              <span>برامج التدريب المؤسسي للمدارس</span>
            </Link>

            <button
              type="button"
              onClick={() => handleOpenRegistration('navbar_cta')}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold text-white shadow transition hover:opacity-95"
              style={{ backgroundColor: primaryRed }}
            >
              ابدأ التسجيل
            </button>
          </div>
        </div>
      </nav>

      {/* 1. العرض المختصر والمعلومات الأساسية (Hero Section) */}
      <section className="px-4 py-10 sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            {/* جهة العنوان والشرح الرئيسي */}
            <div className="text-center md:text-right">
              {/* شارة توضيح طبيعة الكورس */}
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold mb-4 border border-[#E2E2DF] bg-white shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[#444]">كورس تطبيقي شامل للمعلمين والمدربين</span>
              </div>

              {/* العنوان المطلوب نصاً */}
              <h1 className="text-3xl font-black leading-[1.3] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl text-[#141414]">
                حضّر دروسك وأسئلتك بالذكاء الاصطناعي، من موبايلك
              </h1>

              {/* الوصف المطلوب نصاً */}
              <p className="mt-5 max-w-3xl text-base leading-[1.9] sm:text-lg text-[#555]">
                كورس عملي مسجّل للمعلمين، تتعلّم فيه تحويل كتابك إلى شرح مبسّط، وأسئلة واختبارات، ومواد تعليمية تراجعها وتستخدمها مع طلابك.
              </p>

              {/* المعلومات الخمس الأساسية مع التمييز البصري الحاسم بين المسجل والمباشر */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-right">
                {/* البطاقة الأولى: المحتوى المسجل والمتابعة */}
                <div className="rounded-2xl border p-4 bg-white shadow-sm" style={{ borderColor: lineBorder }}>
                  <div className="flex items-center gap-2 text-xs font-black text-[#E31E24]">
                    <Video className="h-4 w-4" />
                    <span>محتوى الكورس المسجّل (وصول دائم)</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 text-xs font-medium text-[#444]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span><strong>كورس مسجّل تتابعه بوقتك:</strong> متى شئت دون تقيد بمواعيد.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span><strong>5 ساعات ونصف من المحتوى العملي</strong> (20 محاضرة).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span><strong>إمكانية المتابعة والتطبيق من الموبايل</strong> (لا يُشترط لابتوب).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span><strong>وصول دائم عبر Telegram</strong> مع ملفات PDF لكل درس.</span>
                    </li>
                  </ul>
                </div>

                {/* البطاقة الثانية: الجلسات المباشرة التفاعلية */}
                <div className="rounded-2xl border p-4 bg-[#FFF0F2] shadow-sm border-[#E31E24]/20">
                  <div className="flex items-center gap-2 text-xs font-black text-[#B92723]">
                    <Users className="h-4 w-4" />
                    <span>الجلسات التفاعلية المباشرة</span>
                  </div>
                  <div className="mt-2.5 space-y-2 text-xs text-[#555]">
                    <p className="font-bold text-[#141414] flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E31E24] shrink-0 mt-0.5" />
                      <span><strong>4 جلسات مباشرة للأسئلة والتطبيق:</strong> لقاءات تفاعلية تطرح فيها استفساراتك وتطبق على مقررك الدراسي مع المدرب.</span>
                    </p>
                    <p className="rounded-xl bg-white/80 p-2 text-[11px] text-[#666] border border-[#E31E24]/10">
                      ℹ️ العدد محدود في الجلسات لضمان جودة المتابعة الفردية والإجابة على أسئلة المشاركين.
                    </p>
                  </div>
                </div>
              </div>

              {/* الأزرار الرئيسية في أول شاشة */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => handleOpenRegistration('hero_primary_button')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-98"
                  style={{ backgroundColor: primaryRed }}
                >
                  <Lock className="h-4 w-4" />
                  <span>ابدأ التسجيل</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <a
                  href="#free-demo-video"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold border border-[#E2E2DF] bg-white text-[#141414] hover:bg-slate-50 transition shadow-sm"
                >
                  <Play className="h-4 w-4 text-[#E31E24] fill-current" />
                  <span>شاهد التطبيق المجاني</span>
                </a>

                <a
                  href={createWhatsAppLink('مرحباً، أريد الاستفسار عن كورس الذكاء الاصطناعي للمعلمين.')}
                  onClick={() => trackWhatsAppClick('hero_whatsapp_help')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#444] hover:text-[#25D366] transition py-2"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>المساعدة عبر WhatsApp</span>
                </a>
              </div>
            </div>

            {/* بطاقة السعر والتسجيل الجانبية في الهيرو */}
            <aside
              className="rounded-3xl border bg-white p-6 sm:p-7 text-center shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
              style={{ borderColor: lineBorder }}
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#B92723]">
                <span>كورس مسجّل + 4 جلسات تفاعلية</span>
              </div>

              <p className="mt-3 text-xs font-bold text-[#666]">سعر الكورس الأساسي</p>
              <div className="mt-1 flex items-baseline justify-center gap-3">
                <span className="text-lg font-bold line-through text-[#888] decoration-2">{pricing.originalPrice}</span>
                <span className="text-4xl sm:text-5xl font-black text-[#E31E24]">{pricing.currentPrice}</span>
              </div>
              {pricing.approxUsdNote && (
                <p className="mt-1 text-xs font-bold text-[#666]">{pricing.approxUsdNote}</p>
              )}

              {/* شفافية رسوم بوابة الدفع الإلكترونية */}
              <div className="mt-4 rounded-2xl bg-[#F8F8F6] p-3 text-right text-xs border border-[#E2E2DF] space-y-1.5">
                <p className="font-bold text-[#222] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>شفافية تفاصيل الدفع:</span>
                </p>
                <p className="text-[#555] leading-relaxed text-[11px]">
                  سعر الكورس <strong>{pricing.currentPrice}</strong>. بوابة الدفع الإلكترونية تضيف رسوم معالجة مصرفية حسب وسيلتك المختارة:
                </p>
                <div className="bg-white rounded-lg p-2 text-[11px] text-[#444] border border-[#E2E2DF] space-y-1">
                  <div className="flex justify-between">
                    <span>البطاقات البنكية:</span>
                    <span className="font-bold text-[#141414]">~23.50$ إجمالي</span>
                  </div>
                  {!pricing.hideShamCash && (
                    <div className="flex justify-between">
                      <span>شام كاش:</span>
                      <span className="font-bold text-[#141414]">~22.45$ إجمالي</span>
                    </div>
                  )}
                </div>
              </div>

              {/* زر التسجيل بالبطاقة */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenRegistration('hero_price_card')}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-98 text-sm"
                  style={{
                    backgroundColor: primaryRed,
                    backgroundImage: 'linear-gradient(135deg, #E31E24 0%, #B92723 100%)',
                  }}
                >
                  <Lock className="h-4 w-4" />
                  <span>ابدأ التسجيل</span>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </button>

                <a
                  href={createWhatsAppLink('مرحباً، أريد الاشتراك في كورس الذكاء الاصطناعي للمعلمين.')}
                  onClick={() => trackWhatsAppClick('hero_price_card_whatsapp')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold border border-[#E2E2DF] bg-[#F8F8F6] hover:bg-[#F0F0EE] text-[#444] transition shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>أو تواصل عبر WhatsApp للاستفسار والمساعدة</span>
                </a>
              </div>

              <p className="mt-4 text-xs text-[#666] leading-relaxed">
                وصول فوري وتفعيل مباشر · <strong className="text-[#E31E24]">ضمان استرجاع كامل 7 أيام</strong>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. الفيديو التطبيقي المجاني */}
      <section id="free-demo-video" className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20 bg-white" style={{ borderColor: lineBorder }}>
        <div className="mx-auto max-w-[1000px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-black text-[#B92723]">
            <Play className="h-3.5 w-3.5 fill-current" />
            فيديو تطبيقي مجاني
          </span>
          <h2 className="mt-3 text-2xl font-black text-[#141414] md:text-4xl">
            شاهد كيف تُصنع ورقة امتحان جاهزة من كتاب المنهج
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-[1.9] text-[#666] md:text-base">
            تطبيق عملي يوضح كيف يتحول كتاب المنهج ونماذج الأسئلة إلى ورقة امتحان منظمة مع سلم تصحيح، جاهزة للمراجعة والطباعة فوراً.
          </p>

          <div className="mx-auto mt-7 aspect-video max-w-[960px] overflow-hidden rounded-3xl bg-[#141414] shadow-2xl border border-[#E2E2DF]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/nuXcfg0Bhbw?rel=0"
              title="شاهد كيف تُصنع ورقة امتحان جاهزة من كتاب المنهج"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F8F8F6] px-4 py-2 text-xs font-bold text-[#555] border border-[#E2E2DF] shadow-sm">
            <span>💡</span>
            <span>هذه عينة مجانية واقعية للمهارات التي تتقنها خطوة بخطوة داخل الكورس.</span>
          </div>
        </div>
      </section>

      {/* 3. نماذج المخرجات التعليمية */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20" style={{ borderColor: lineBorder, backgroundColor: softBg }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#E31E24] border border-[#E2E2DF] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              أدلة عملية حقيقية
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl text-[#141414]">
              نماذج حقيقية من مخرجات الكورس
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-[1.9] text-[#666]">
              نماذج أُنتجت فعلياً من كتب ومناهج ومصادر حقيقية، مع توضيح المصدر والنتيجة الملموسة لكل نموذج.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* نموذج 1: ورقة امتحان للبكالوريا */}
            <article className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md" style={{ borderColor: lineBorder }}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-black/5">
                <img
                  src="/samples/user/math-baccalaureate-exam.webp"
                  alt="ورقة امتحان رياضيات للبكالوريا"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 rounded-full bg-[#E31E24] px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                  ورقة امتحان رسمية
                </span>
              </div>
              <h3 className="mt-4 text-base font-black text-[#141414]">
                ورقة امتحان رياضيات للبكالوريا
              </h3>
              <div className="mt-2 text-xs text-[#555] space-y-1.5 flex-1">
                <p><strong>المصدر:</strong> كتاب الرياضيات المدرسي ونماذج المنهج.</p>
                <p><strong>النتيجة:</strong> ورقة امتحان وزارية مع ترويسة وسلم تصحيح نموذجي قابلة للطباعة في 18 دقيقة.</p>
              </div>
            </article>

            {/* نموذج 2: دليل دراسة اطراد المتتاليات والخرائط الذهنية */}
            <article className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md" style={{ borderColor: lineBorder }}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-black/5">
                <img
                  src="/samples/user/sequence-guide.webp"
                  alt="دليل دراسة اطراد المتتاليات"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 rounded-full bg-emerald-700 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                  دليل دراسة وخريطة
                </span>
              </div>
              <h3 className="mt-4 text-base font-black text-[#141414]">
                دليل دراسة اطراد المتتاليات
              </h3>
              <div className="mt-2 text-xs text-[#555] space-y-1.5 flex-1">
                <p><strong>المصدر:</strong> درس رياضيات معقد من كتاب المنهج.</p>
                <p><strong>النتيجة:</strong> تفكيك المفاهيم وتفريغها في صفحة واحدة مريحة لتسهيل الشرح والمراجعة.</p>
              </div>
            </article>

            {/* نموذج 3: تحويل خط اليد إلى ملخص منسق */}
            <article className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md" style={{ borderColor: lineBorder }}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-black/5">
                <img
                  src="/samples/user/handwriting-to-ai-summary.png"
                  alt="تحويل خط اليد إلى ملخص منسق"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 rounded-full bg-indigo-700 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                  من خط اليد إلى رقمي
                </span>
              </div>
              <h3 className="mt-4 text-base font-black text-[#141414]">
                تحويل خط اليد إلى درس رقمي
              </h3>
              <div className="mt-2 text-xs text-[#555] space-y-1.5 flex-1">
                <p><strong>المصدر:</strong> ملاحظات درس لغة عربية مكتوبة بخط اليد.</p>
                <p><strong>النتيجة:</strong> ملخص رقمي مطبوع ومنظم يشمل القواعد وجدول المطابقة والأمثلة.</p>
              </div>
            </article>

            {/* نموذج 4: وسائط تعليمية (إنفوجرافيك وعروض) */}
            <article className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md" style={{ borderColor: lineBorder }}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-black/5">
                <img
                  src="/samples/previews/chemistry-infographic.webp"
                  alt="إنفوجرافيك ووسائط تعليمية"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 rounded-full bg-amber-700 px-2.5 py-0.5 text-[11px] font-bold text-white shadow">
                  إنفوجرافيك ووسائط
                </span>
              </div>
              <h3 className="mt-4 text-base font-black text-[#141414]">
                وسائط تعليمية مرئية وصوتية
              </h3>
              <div className="mt-2 text-xs text-[#555] space-y-1.5 flex-1">
                <p><strong>المصدر:</strong> فصول ونصوص دراسية مختلفة.</p>
                <p><strong>النتيجة:</strong> شرائح PowerPoint تفاعلية، بودكاست حواري بصوتين، ومخططات بصرية.</p>
              </div>
            </article>
          </div>

          <div className="mt-9 text-center">
            <Link
              href={resultsHref}
              onClick={() => trackResultsOpen('models_section_button')}
              className="inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-black text-[#141414] bg-white hover:bg-slate-50 transition shadow-sm hover:border-[#E31E24]"
              style={{ borderColor: lineBorder }}
            >
              <span>تصفّح جميع النماذج والمخرجات بالتفصيل</span>
              <ArrowLeft className="h-4 w-4 text-[#E31E24]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. الفوائد العملية للمعلم */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20 bg-white" style={{ borderColor: lineBorder }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#E31E24]">
              أثر الكورس عليك
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl text-[#141414]">
              الفوائد العملية التي يربحها المعلم
            </h2>
            <p className="mt-4 text-base leading-[2] text-[#666]">
              الكورس يمنحك طريقة عمل واضحة تحل مشكلة الوقت والجهد وتتيح لك التركيز على طلابك وشرحك:
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'توفير ساعات التحضير الأسبوعية',
                desc: 'لا تبدأ من صفحة بيضاء كل أسبوع؛ حوّل كتابك المنهجي إلى خطة درس وشرح منظم وقوالب جاهزة في دقائق معدودة.',
              },
              {
                num: '02',
                title: 'بنوك أسئلة وامتحانات بسلالم تصحيح',
                desc: 'صياغة أوراق امتحانات رسمية متدرجة (اختيار من متعدد، صح وخطأ، وتفكير نقدي) مع سلم تصحيح نموذجي للطباعة.',
              },
              {
                num: '03',
                title: 'تطبيق كامل ومريح من هاتفك المحمول',
                desc: 'شاهد المحتوى وطبّق الأدوات وأنتج شروحاتك وامتحاناتك مباشرة من هاتفك أينما كنت دون اشتراط وجود لابتوب.',
              },
              {
                num: '04',
                title: 'الاحتفاظ بالقرار التربوي والمراجعة بيدك',
                desc: 'الذكاء الاصطناعي مسوّدة سريعة ومساعد بحثي فائق، والقرار والتدقيق النهائي والملاءمة لطلابك بيدك أنت كمعلم.',
              },
              {
                num: '05',
                title: 'تنويع أساليب التعلم لجميع الطلاب',
                desc: 'خاطب الطالب البصري بالإنفوجرافيك والخرائط، والسمعي بالبودكاست، ووفر مذكرات PDF للطباعة وعروضاً للشاشة.',
              },
              {
                num: '06',
                title: 'أدوات مجانية دون تكاليف إضافية مخفية',
                desc: 'تعتمد مسارات الكورس على الأدوات المتاحة مجاناً دون فرض أي اشتراكات مدفوعة إلزامية على المتدربين.',
              },
            ].map((benefit) => (
              <article
                key={benefit.num}
                className="rounded-2xl border p-6 bg-[#F8F8F6] transition hover:bg-white hover:shadow-md"
                style={{ borderColor: lineBorder }}
              >
                <span className="text-sm font-black text-[#E31E24]">{benefit.num}</span>
                <h3 className="mt-3 text-lg font-black text-[#141414]">{benefit.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-[1.9] text-[#666]">{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. مراحل الكورس: المسار الكامل */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20" style={{ borderColor: lineBorder, backgroundColor: softBg }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center md:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#E31E24] border border-[#E2E2DF] shadow-sm">
              المسار الكامل للكورس
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl text-[#141414]">
              مراحل الكورس التدريبية
            </h2>
            <p className="mt-3 text-sm sm:text-base font-bold text-[#E31E24]">
              3 مراحل تدريبية رئيسية تشمل 20 محاضرة مسجلة (~5.5 ساعات) + 4 جلسات تفاعلية مباشرة
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-[1.9] text-[#666]">
              مسار منطقي واضح يبدأ من كتابك أو مادتك الدراسية، ويمر بمراحل الاستخراج والصياغة، وينتهي بمخرجات جاهزة للاستخدام مع طلابك.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {phases.map((phase, idx) => (
              <div key={phase.number} className="relative">
                <article
                  className="rounded-3xl border bg-white p-6 sm:p-8 shadow-sm"
                  style={{ borderColor: lineBorder }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5" style={{ borderColor: lineBorder }}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl text-base sm:text-lg font-black text-white shadow-sm"
                        style={{ backgroundColor: primaryRed }}
                      >
                        {phase.number}
                      </span>
                      <div>
                        <span className="block text-xs font-bold text-[#B92723]">
                          {phase.phaseLabel}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-[#141414]">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full px-3 py-1 text-xs font-bold bg-[#F8F8F6] text-[#555] border border-[#E2E2DF]">
                        ⏱ {phase.lessonsCount}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                        مشمولة في الكورس
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs sm:text-sm font-bold text-[#E31E24]">{phase.subtitle}</p>
                    <p className="mt-2 text-sm leading-[1.9] text-[#444]">{phase.overview}</p>
                  </div>

                  <div className="mt-5 rounded-2xl p-4 sm:p-5 bg-[#F8F8F6] border border-[#E2E2DF]">
                    <p className="mb-3 text-xs font-black text-[#141414]">
                      ماذا تتقن وتنجز عملياً في هذه المرحلة؟
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#333]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E31E24]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {idx < phases.length - 1 && (
                  <div className="flex justify-center py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF0F2] text-[#B92723]">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* التسلسل العملي لتحضير كل درس */}
          <div className="mt-12 rounded-3xl border bg-white p-6 sm:p-8 shadow-sm" style={{ borderColor: lineBorder }}>
            <div className="mx-auto max-w-xl text-center">
              <span className="rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-black text-[#B92723]">
                تسلسل العمل الثابت
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-black text-[#141414]">
                التسلسل العملي لكل درس من البداية وحتى الصف
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#666]">
                إطار عمل مكرر تطبقه على أي مقرر أو كتاب مدرسي
              </p>
            </div>

            <div className="mx-auto mt-7 flex max-w-lg flex-col items-center">
              {workflowSteps.map((step, idx) => (
                <div key={step} className="flex w-full flex-col items-center">
                  <div
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-center transition ${
                      idx === workflowSteps.length - 1
                        ? 'border-[#E31E24] bg-[#FFF0F2] text-[#B92723] font-black'
                        : idx === 0
                        ? 'border-[#141414] bg-[#141414] text-white font-black'
                        : 'border-[#E2E2DF] bg-[#F8F8F6] text-[#222]'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                        idx === workflowSteps.length - 1
                          ? 'bg-[#E31E24] text-white'
                          : idx === 0
                          ? 'bg-white text-[#141414]'
                          : 'bg-white text-[#E31E24] border border-[#E2E2DF]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-xs sm:text-sm font-bold">{step}</span>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="flex flex-col items-center py-1 text-[#E31E24]">
                      <ArrowDown className="h-3.5 w-3.5 opacity-60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. تجارب المشتركين الأصلية */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20 bg-white" style={{ borderColor: lineBorder }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-black text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>محادثات وتقييمات حقيقية عبر WhatsApp 💬</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl text-[#141414]">
              تجارب حقيقية ورسائل المشتركين
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-[1.9] text-[#666]">
              لقطات شاشة أصلية بدقة عالية من محادثات المعلمين والمدربين بعد تطبيق محاور الكورس في تحضير الدروس وتصميم السلايدات والإنفوجرافيك وإنتاج الفيديو.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
            {testimonialScreenshots.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border bg-white shadow-sm transition hover:shadow-md"
                style={{ borderColor: lineBorder }}
              >
                {/* رأس البطاقة */}
                <div className="flex items-center justify-between gap-3 border-b px-4 py-3 bg-[#F8F8F6]" style={{ borderColor: lineBorder }}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-[#FFF0F2] px-2.5 py-0.5 text-xs font-bold text-[#B92723]">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                    ✓ محادثة موثقة
                  </span>
                </div>

                {/* صورة السكرين شوت الأصلية */}
                <div
                  onClick={() => setSelectedScreenshot(item)}
                  className="relative cursor-pointer overflow-hidden bg-white p-3 sm:p-4 flex items-center justify-center transition"
                  title="انقر لتكبير المحادثة بدقة عالية"
                >
                  <div className="w-full overflow-hidden rounded-xl border border-black/5 bg-[#F8F8F6] shadow-sm transition-transform duration-300 group-hover:scale-[1.015]">
                    <img
                      src={item.src}
                      alt={`${item.tag} - ${item.highlight}`}
                      width={item.width}
                      height={item.height}
                      className="block h-auto w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm transition group-hover:bg-black/90">
                    <ZoomIn className="h-3.5 w-3.5 text-white" />
                    <span>انقر للتكبير</span>
                  </div>
                </div>

                {/* نص التقييم */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 bg-white">
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-[1.8] text-[#141414]">
                      {item.highlight}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                      <span>💡 <strong>النتيجة:</strong> {item.detail}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedScreenshot(item)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E2DF] bg-[#F8F8F6] px-4 py-2.5 text-xs font-bold text-[#444] transition hover:bg-[#FFF0F2] hover:text-[#B92723]"
                  >
                    <ZoomIn className="h-4 w-4" />
                    <span>عرض المحادثة كاملة بدقة عالية</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[#777]">
            🔒 نُشرت شهادات ومحادثات المشتركين الأصلية بموافقتهم لعرض الأثر العملي في الميدان التعليمي.
          </p>
        </div>
      </section>

      {/* 7. نبذة المدرب */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20" style={{ borderColor: lineBorder, backgroundColor: softBg }}>
        <div className="mx-auto grid max-w-[1000px] gap-8 md:grid-cols-[0.6fr_1.4fr] md:items-center">
          <div className="flex justify-center">
            <Image
              src="/images/trainer-nawaf.webp"
              alt="المدرب نواف البوسطة"
              width={260}
              height={260}
              className="h-56 w-56 sm:h-64 sm:w-64 rounded-full object-cover ring-8 ring-white shadow-xl"
            />
          </div>
          <div className="text-center md:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#E31E24] border border-[#E2E2DF]">
              من يقدّم الكورس؟
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-4xl text-[#141414]">
              نواف البوسطة
            </h2>
            <p className="mt-1 text-sm font-bold text-[#E31E24]">
              مدرب في توظيف الذكاء الاصطناعي وزيادة الإنتاجية
            </p>
            <p className="mt-4 text-xs sm:text-sm leading-[2] text-[#555]">
              صممت هذا الكورس للمعلم والمدرب الذي يريد تخفيف ساعات العمل المتكرر في التحضير وكتابة الأسئلة دون أن يتنازل عن خبرته أو تدقيقه البشري. الهدف ليس استعراض أدوات تقنية، بل بناء أسلوب عمل منظّم ومخرجات تعليمية تخدم طلابك مباشرة.
            </p>
            <div className="mt-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E31E24] underline underline-offset-8 transition hover:opacity-85"
              >
                <span>تعرّف على مسيرة وخبرة المدرب</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. الملفات المرفقة والجلسات المباشرة */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20 bg-white" style={{ borderColor: lineBorder }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F2] px-3.5 py-1 text-xs font-bold text-[#E31E24]">
              حزمة الدعم والتطبيق
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl text-[#141414]">
              الملفات المرفقة وجلسات المتابعة
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-[1.9] text-[#666]">
              مواد عملية وجلسات تفاعلية مشمولة ضمن تسجيلك لضمان عدم بقائك وحدك أمام أي خطوة:
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gifts.map((gift) => (
              <article
                key={gift.title}
                className="flex flex-col justify-between rounded-2xl border p-6 bg-[#F8F8F6] shadow-sm transition hover:bg-white hover:shadow-md"
                style={{ borderColor: lineBorder }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <gift.icon className="h-7 w-7 text-[#E31E24]" />
                    <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                      {gift.value}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-black text-[#141414]">{gift.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-[1.9] text-[#666]">{gift.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E2E2DF] flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>مشمولة بالكامل عند التسجيل</span>
                  <span>✓</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. الأسئلة الشائعة */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20" style={{ borderColor: lineBorder, backgroundColor: softBg }}>
        <div className="mx-auto max-w-[850px]">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#E31E24] border border-[#E2E2DF]">
              إجابات مباشرة
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-4xl text-[#141414]">
              الأسئلة الشائعة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#666]">
              إجابات واضحة ومباشرة عن الاستفسارات الأساسية قبل التسجيل
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map(([q, a], i) => (
              <article
                key={q}
                className="rounded-2xl bg-white px-5 shadow-sm border border-[#E2E2DF] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-right font-black text-xs sm:text-sm md:text-base text-[#141414]"
                >
                  <span>{q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 text-[#E31E24] ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="pb-4 pt-1 text-xs sm:text-sm leading-[1.9] text-[#555] border-t border-slate-100">
                    {a}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ملخص العرض والتسجيل */}
      <section className="border-t px-4 py-14 sm:px-6 md:px-8 md:py-20 text-white" style={{ backgroundColor: inkBlack }}>
        <div className="mx-auto max-w-[850px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            ملخص العرض الشامل
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black md:text-5xl leading-tight">
            ابدأ من كتابك، ووفّر وقتك للشرح ولطلابك
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-[1.9] text-white/70">
            تحصل على الكورس المسجّل كاملاً، ملفات PDF وقوالب العمل، حزمة البرومبتات، مع 4 جلسات تفاعلية مباشرة ومتابعة شخصية عبر Telegram.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 text-right shadow-2xl">
            <p className="text-xs font-bold text-white/60">كل ما يشمله تسجيلك:</p>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>الكورس المسجّل كاملاً (20 محاضرة · ~5.5 ساعات)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>4 جلسات تطبيق وأسئلة تفاعلية مباشرة مع المدرب</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>إمكانية المتابعة والتطبيق مباشرة من هاتفك المحمول</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>ملخصات PDF وقوالب العمل لجميع الدروس</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>مكتبة البرومبتات وحزمة الأوامر الذهبية (40 أمراً تعليمياً)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E31E24] mt-0.5" />
                <span>وصول دائم ومتابعة وتحديثات مستقبلية عبر Telegram</span>
              </li>
            </ul>

            {/* تفاصيل السعر ورسوم بوابة الدفع */}
            <div className="my-5 border-t border-white/10 pt-4 text-center">
              <span className="text-xs text-white/50 line-through">{pricing.originalPrice}</span>
              <span className="mr-2 text-3xl sm:text-4xl font-black text-[#E31E24]">{pricing.currentPrice}</span>
              {pricing.approxUsdNote && (
                <p className="mt-1 text-xs text-white/70">{pricing.approxUsdNote}</p>
              )}

              <div className="mt-3 rounded-xl bg-white/5 p-2.5 text-right text-[11px] text-white/75 border border-white/10 leading-relaxed">
                <span>💳 <strong>رسوم بوابة الدفع الإلكترونية:</strong> سعر الكورس الأساسي <strong>{pricing.currentPrice}</strong>. بوابة الدفع تضيف عمولة المعالجة المصرفية (بطاقات بنكية: ~23.50$ إجمالي | شام كاش: ~22.45$ إجمالي).</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleOpenRegistration('final_offer_card')}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-white shadow-xl transition-all hover:scale-[1.01] active:scale-98 text-sm sm:text-base"
                style={{
                  backgroundColor: primaryRed,
                  backgroundImage: 'linear-gradient(135deg, #E31E24 0%, #B92723 100%)',
                }}
              >
                <Lock className="h-4 w-4" />
                <span>ابدأ التسجيل</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <a
                href={createWhatsAppLink('مرحباً، أريد التسجيل في كورس الذكاء الاصطناعي للمعلمين.')}
                onClick={() => trackWhatsAppClick('final_offer_whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>أو تواصل عبر WhatsApp للتسجيل والمساعدة</span>
              </a>
            </div>

            <p className="mt-4 text-center text-[11px] text-white/60">
              تفعيل فوري للمحتوى · <strong className="text-[#E31E24]">ضمان استرجاع كامل لمدة 7 أيام</strong>
            </p>
          </div>
        </div>
      </section>

      {/* رابط التدريب المؤسسي للمدارس */}
      <div className="border-t py-6 px-4 text-center bg-white" style={{ borderColor: lineBorder }}>
        <p className="text-xs sm:text-sm font-bold text-[#333]">
          هل تمثل مدرسة أو معهداً تعليمياً؟{' '}
          <Link
            href="/schools"
            className="font-black text-[#E31E24] hover:text-[#B92723] inline-flex items-center gap-1 underline underline-offset-4 mr-1"
          >
            <span>تعرّف على برامج التدريب المؤسسي لفرق المعلمين</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="px-4 py-7 text-center text-xs text-white/70" style={{ backgroundColor: inkBlack }}>
        © {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين{' '}
        <span className="mx-2 text-white/30">·</span>{' '}
        <Link href={resultsHref} className="underline hover:text-white">
          نماذج المخرجات
        </Link>{' '}
        <span className="mx-2 text-white/30">·</span>{' '}
        <Link href="/about" className="underline hover:text-white">
          عن المدرب
        </Link>
      </footer>

      {/* الشريط العائم لأسفل شاشة الموبايل */}
      <div className="fixed inset-x-3 bottom-3 z-50 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => handleOpenRegistration('mobile_sticky_bar')}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3.5 text-xs font-bold text-white shadow-xl active:scale-95"
          style={{ backgroundColor: primaryRed }}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>ابدأ التسجيل ({pricing.currentPrice})</span>
        </button>
        <a
          href={createWhatsAppLink('مرحباً، أريد تفاصيل التسجيل في كورس الذكاء الاصطناعي للمعلمين.')}
          onClick={() => trackWhatsAppClick('mobile_sticky_whatsapp')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 shadow-xl active:scale-95"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <span>واتساب</span>
        </a>
      </div>

      {/* نافذة إرشاد وشفافية التسجيل والدفع (Registration Modal) */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        amount={pricing.checkoutAmount}
        currencySymbol={pricing.currencySymbol}
        displayPrice={pricing.currentPrice}
        affiliateRef={affiliateRef}
        source="registration_modal"
        hideShamCash={pricing.hideShamCash}
        whatsappLink={createWhatsAppLink('مرحباً، أريد المساعدة في التسجيل في كورس الذكاء الاصطناعي للمعلمين.')}
      />

      {/* نافذة الخروج التفاعلية (Exit Popup) */}
      {showExitPopup && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowExitPopup(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl border border-[#E2E2DF]"
            style={{ animation: 'exitPopupIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute left-4 top-4 rounded-full p-1.5 text-[#888] transition hover:bg-slate-100 hover:text-[#333]"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F2]">
              <Eye className="h-7 w-7 text-[#E31E24]" />
            </div>

            <h3 className="text-xl font-black text-[#141414]">قبل أن تغادر...</h3>
            <p className="mt-2 text-xs sm:text-sm leading-[1.8] text-[#555]">
              شاهد نماذج حقيقية من مخرجات الكورس: أوراق امتحانات، خرائط ذهنية، عروض، مذكرات PDF، وبودكاست تعليمي — كلها جاهزة للاستخدام الصفي.
            </p>

            <Link
              href={resultsHref}
              onClick={() => {
                trackResultsOpen('exit_intent_popup')
                setShowExitPopup(false)
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] active:scale-95"
              style={{ backgroundColor: primaryRed }}
            >
              <Eye className="h-4 w-4" />
              <span>شاهد النماذج الآن</span>
            </Link>

            <button
              onClick={() => setShowExitPopup(false)}
              className="mt-3 text-xs font-bold text-[#777] transition hover:underline"
            >
              لا شكرًا، سأتابع التصفح
            </button>
          </div>
        </div>
      )}

      {/* نافذة تكبير لقطات الشاشة (Lightbox Modal) */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-sm"
          onClick={() => setSelectedScreenshot(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-3xl flex-col items-center rounded-2xl bg-neutral-900/95 p-3 sm:p-5 border border-white/10 shadow-2xl text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between border-b border-white/10 pb-3 text-white">
              <span className="text-xs sm:text-sm font-bold text-amber-300">
                {selectedScreenshot.tag}
              </span>
              <button
                type="button"
                onClick={() => setSelectedScreenshot(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex w-full items-center justify-center overflow-auto max-h-[72vh] p-1">
              <img
                src={selectedScreenshot.src}
                alt={selectedScreenshot.highlight}
                width={selectedScreenshot.width}
                height={selectedScreenshot.height}
                className="h-auto max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl bg-white border border-black/10"
              />
            </div>

            <div className="mt-3 w-full border-t border-white/10 pt-3 text-center">
              <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed max-w-2xl mx-auto">
                {selectedScreenshot.highlight}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes exitPopupIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(15px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
