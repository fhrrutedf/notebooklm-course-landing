'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { trackWhatsApp } from '@/lib/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import {
  ArrowDown,
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileOutput,
  FileText,
  MessageCircle,
  Play,
  Shield,
  Users,
  Zap,
} from 'lucide-react'

const subscribeAffiliate = () => () => {}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const trackGoogleEvent = (eventName: string, parameters: Record<string, string>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', eventName, parameters)
}

type CountdownTime = { days: number; hours: number; minutes: number; seconds: number }

const red = '#E3342F'
const redDark = '#B92723'
const ink = '#242424'
const muted = '#666666'
const paper = '#F8F8F6'
const soft = '#F0F0EE'
const line = '#E2E2DF'

export default function LandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [offerTimeLeft, setOfferTimeLeft] = useState<CountdownTime | null>(null)
  const affiliateRef = useSyncExternalStore(
    subscribeAffiliate,
    () => resolveAffiliateRef(window.location.search) || window.localStorage.getItem('course_affiliate_ref') || '',
    () => '',
  )

  useEffect(() => {
    const directRef = resolveAffiliateRef(window.location.search)
    if (directRef) window.localStorage.setItem('course_affiliate_ref', directRef)
  }, [])

  useEffect(() => {
    const STORAGE_KEY = 'course_offer_deadline'
    let deadline = Number(window.localStorage.getItem(STORAGE_KEY))
    const now = Date.now()
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

    if (!deadline || isNaN(deadline) || deadline <= now) {
      deadline = now + SEVEN_DAYS_MS
      window.localStorage.setItem(STORAGE_KEY, String(deadline))
    }

    const update = () => {
      const currentNow = Date.now()
      let remaining = deadline - currentNow
      if (remaining <= 0) {
        deadline = currentNow + SEVEN_DAYS_MS
        window.localStorage.setItem(STORAGE_KEY, String(deadline))
        remaining = SEVEN_DAYS_MS
      }
      const total = Math.floor(remaining / 1000)
      setOfferTimeLeft({
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
      })
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const whatsappNumber = '963985323170'
  const createWhatsAppLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${message}${affiliateMessageSuffix(affiliateRef)}`)}`
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

  const phases = [
    {
      number: '1',
      phaseLabel: 'المرحلة الأولى',
      title: 'المرحلة الأولى: فهم المصدر وبناء الشرح',
      subtitle: 'من كتاب المنهج الجاف إلى شرح تفاعلي مخصص',
      lessons: '6 محاضرات',
      overview:
        'في هذه المرحلة، تتعلم التعامل مع كتاب المنهج أو PDF أو صورة أو مادة تعليمية، واستخراج الأفكار والمفاهيم، وتبسيط الدرس، وتجهيز شرح منظم وملف PDF لكل درس. تخلّص من الورقة البيضاء، وحوّل الدرس إلى شرح يناسب عمر طلابك ومستوياتهم المختلفة.',
      items: [
        'خطة تحضير أسبوعية متكاملة خلال دقائق، تحفظها كقالب وتستخدمها مع كل درس بدل البدء من الصفر.',
        'تبسيط المفاهيم الصعبة والمجردة بصياغة تناسب طلابك من الابتدائي وحتى البكالوريا.',
        'تحويل المادة الجافة إلى فيديوهات تعليمية صامتة أو متحركة بتعليق صوتي، دون الحاجة لمعدات تصوير أو مونتاج.',
        'ملخص PDF مكتوب لكل درس من كتب المنهج، تقدمه لطلابك كمذكرة مرجعية جاهزة.',
      ],
    },
    {
      number: '2',
      phaseLabel: 'المرحلة الثانية',
      title: 'المرحلة الثانية: بناء الأسئلة والأنشطة والاختبارات',
      subtitle: 'أتمتة الاختبارات وصناعة أوراق الامتحانات الرسمية',
      lessons: '7 محاضرات',
      overview:
        'في هذه المرحلة، تتعلم إعداد الأسئلة، والأنشطة الصفية، والأسئلة الشفهية، والاختبارات، وأوراق الامتحان، مع مراجعة المعلم وتعديل الناتج قبل استخدامه. وفّر الساعات التي تضيع في كتابة الأسئلة والتنسيق، واطلع بورقة امتحان مرتبة وجاهزة للطباعة.',
      items: [
        'بنك أسئلة متنوع: صح وخطأ، خيارات متعددة، وأسئلة تفكير نقدي مع سلالم تصحيح نموذجية.',
        'تصدير الاختبار إلى Word قابل للتعديل أو عرض PowerPoint تفاعلي تظهر إجاباته بنقرة واحدة أمام الطلاب.',
        'إخراج ورقة امتحان رسمية خلال نحو 18 دقيقة، مع الترويسة وبيانات الطالب وهوامش مريحة للعين.',
        'بطاقات مراجعة رقمية Flashcards تساعد الطلاب يثبتوا المفاهيم بطريقة تفاعلية وممتعة.',
      ],
    },
    {
      number: '3',
      phaseLabel: 'المرحلة الثالثة',
      title: 'المرحلة الثالثة: إخراج المحتوى بصيغ تعليمية متعددة',
      subtitle: 'الوسائط البصرية والسمعية والبحث الاحترافي',
      lessons: '7 محاضرات',
      overview:
        'في هذه المرحلة، تتعلم إخراج المحتوى على شكل PDF، وعرض تقديمي، وخريطة ذهنية، وإنفوجرافيك، وفيديو تعليمي، وPodcast، وملخصات وأنشطة تفاعلية، بحسب المحتوى الموجود أصلًا في الكورس. خاطب الطالب البصري والسمعي، واختصر وقت البحث والتفريغ والتنسيق في مخرجات تعليمية مبهرة.',
      items: [
        'تحويل فصل كامل إلى Podcast تعليمي بصوتين يتناقشان بطريقة طبيعية تساعد الطالب يسمع ويراجع أثناء التنقل.',
        'تفكيك الفصول الطويلة إلى خرائط ذهنية وإنفوجرافيك منظم يختصر الوحدة المعقدة في صفحة واحدة.',
        'إعداد تقارير علمية موثقة والبحث عن استراتيجيات تدريس حديثة من مصادر موثوقة بدل البحث العشوائي.',
        'تحويل أي فيديو تعليمي من YouTube إلى مصدر مكتوب وملخص داخل دفترك دون تفريغ يدوي.',
      ],
    },
  ]

  const workflowSteps = [
    'مصدر الدرس',
    'تحديد هدف التعلم',
    'استخراج الأفكار والمفاهيم',
    'بناء شرح مبسط',
    'إضافة نشاط وأسئلة',
    'إعداد اختبار أو ورقة امتحان',
    'إخراج المحتوى بصيغة PDF أو عرض أو خريطة أو فيديو',
    'مراجعة المعلم وتعديل الناتج',
    'استخدام المحتوى مع الطلاب',
  ]
  const gifts = [
    { title: 'مكتبة البرومبتات وحزمة الأوامر الذهبية', value: '40 أمرًا + 40 مثالًا مجانًا', desc: 'أوامر عربية تفصيلية تغطي احتياجات المعلم والمدرب حتى تبدأ التطبيق بسرعة وبطريقة آمنة.', icon: Zap },
    { title: '4 جلسات متابعة مباشرة للأسئلة والأجوبة', value: 'مجانًا', desc: 'تطرح سؤالك ومادتك، ونطبق عليها معًا حتى تتأكد أنك أتقنت المسار ولم تبقَ وحدك أمام أي مشكلة.', icon: Users },
    { title: 'ملخصات PDF مكتوبة لكل درس', value: 'مجانًا', desc: 'مرجع سريع تراجع منه خطوات التطبيق العملي دون الحاجة لإعادة مشاهدة الفيديوهات من البداية.', icon: FileOutput },
  ]
  const faqs = [
    ['هل الكورس مناسب لمن لا يملك خبرة تقنية كبيرة؟', 'نعم. الشرح تدريجي ومبسط، ونبدأ من الصفر، ومع كل درس ملخص PDF يرجعلك وقت التطبيق حتى ما تضطر تعيد الفيديو كاملًا.'],
    ['هل أحتاج جهاز لابتوب أو كمبيوتر للبدء والتطبيق؟', 'لا، لا تحتاج لابتوب بالضرورة! الكورس مصمم بحيث يمكنك مشاهدة الدروس وتطبيق جميع الأدوات وبناء الشروحات والامتحانات والمحتوى التعليمي مباشرة من هاتفك المحمول أو جهازك اللوحي (الآيباد) بسهولة.'],
    ['هل المخرجات والامتحانات تلائم المناهج السورية الرسمية؟', 'نبدأ من كتاب المنهج أو المصدر الذي ترفقه أنت، ثم نراجع الناتج بشريًا قبل استخدامه. طبّقنا أمثلة على مواد واختبارات للمعلمين، لكن يبقى قرار الدقة والملاءمة بيد المعلم.'],
    ['هل الأدوات تحتاج اشتراكات شهرية مدفوعة؟', 'المسار يعتمد على حلول مجانية قدر الإمكان، ولا توجد تكاليف خفية ضمن رسوم الكورس. وإذا تغيّرت سياسات أي خدمة، نوضح ذلك قبل استخدامها.'],
    ['كيف أحصل على دعم إذا واجهت مشكلة؟', 'عندك 4 جلسات متابعة مباشرة للأسئلة والأجوبة، وتقدر تجيب سؤالك أو مادتك ونطبق عليها معًا.'],
    ['كيف يتم الدفع والاستلام من داخل سوريا وخارجها؟', 'داخل سوريا نوفر وسائل محلية سريعة مثل سيريتل كاش، شام كاش، شبكة الهرم، الفؤاد، بنك بيمو وغيرها حسب المتاح، ونوضح لك الطريقة المناسبة عبر WhatsApp. وبعد التفعيل تحصل على وصول دائم عبر Telegram.'],
    ['هل الشهادة إلزامية؟', 'لا. شهادة وزارة التنمية السورية اختيارية برسوم منفصلة، ويمكن طلبها بعد اختبار أو مشروع نهاية الكورس.'],
    ['هل أحصل على ملفات PDF مع كل درس؟', 'نعم. كل درس معه ملخص PDF أو قالب عملي يساعدك تراجع الخطوات وتطبقها دون إعادة مشاهدة المحتوى كاملًا.'],
    ['هل الدورة مناسبة لمعلم المدرسة أو المدرّس الخصوصي؟', 'نعم. الأمثلة قابلة للتخصيص حسب المادة والمرحلة، من الابتدائي وحتى البكالوريا، مع بقاء المعلم صاحب القرار في المراجعة والاستخدام.'],
    ['هل أستطيع استخدام المخرجات في صفي مباشرة؟', 'نعم، بعد مراجعة المحتوى وتعديله بما يناسب طلابك. تتعلم إخراج شرح واختبار وورقة عمل وعرض ومواد بصرية قابلة للاستخدام والتطوير.'],
    ['هل أحصل على وصول دائم وتحديثات؟', 'نعم. تحصل على وصول دائم إلى محتوى الكورس، مع تحديثات مستقبلية بحسب تطور المسارات والمخرجات.'],
    ['هل يمكنني الدفع بالتقسيط؟', 'نعم. يمكنك التسجيل على قسطين بقيمة 17.5$ لكل قسط، وتعرف تفاصيل التفعيل والطريقة المناسبة عبر WhatsApp.'],
  ]

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-[#242424]" style={{ backgroundColor: paper, fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      {offerTimeLeft && (
        <div className="bg-[#242424] px-4 py-2.5 text-center text-xs md:text-sm font-bold text-white">
          <span className="text-[#F5F5F2]">عرض إطلاق محدود: </span>
          <span style={{ color: red }} className="font-black">35$ (متبقي 6 مقاعد فقط)</span>
          <span className="mx-2 text-white/60">•</span>
          <span>ينتهي العرض خلال: </span>
          <span className="tabular-nums font-black text-amber-400">
            {offerTimeLeft.days} أيام : {String(offerTimeLeft.hours).padStart(2, '0')} س : {String(offerTimeLeft.minutes).padStart(2, '0')} د : {String(offerTimeLeft.seconds).padStart(2, '0')} ث
          </span>
        </div>
      )}

      <nav className="border-b px-4 py-4" style={{ borderColor: line, backgroundColor: paper }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: red }}><BookOpen className="h-4 w-4" /></span><span className="text-sm font-bold md:text-base">كورس الذكاء الاصطناعي للمعلمين</span></div><Link href="/schools" className="hidden items-center gap-2 text-sm font-bold sm:flex" style={{ color: red }}>للمؤسسات التعليمية <Building2 className="h-4 w-4" /></Link></div>
      </nav>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1180px]"><div className="grid items-center gap-10 md:grid-cols-[1.35fr_0.65fr] md:gap-14"><div className="text-center md:text-right"><p className="mb-5 text-base font-bold" style={{ color: red }}>لكل معلم يريد بناء طريقة أذكى للتحضير وصناعة المحتوى</p><h1 className="max-w-5xl text-4xl font-black leading-[1.35] tracking-tight md:text-6xl">تعلّم النظام الذي يساعدك على تحويل كتبك ودروسك إلى محتوى تعليمي جاهز بدل إعادة التحضير كل أسبوع</h1><p className="mt-6 max-w-3xl text-base leading-[2] md:text-lg" style={{ color: muted }}>كورس عملي يأخذك من المصدر إلى الشرح والاختبار وملف PDF والعرض والفيديو والبودكاست، بخطوات واضحة تُبقي قرار المراجعة والدقّة النهائية بيدك، لا بيد الأداة.</p><p className="mt-3 max-w-2xl font-bold leading-[2]" style={{ color: red }}>وفّر وقت التحضير، واصنع محتوى مفيد لطلابك، وانتقل من معلم يعيد إلى معلم يبني.</p><div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold md:justify-start" style={{ color: muted }}><span>وصول دائم</span><span>ملخصات PDF لكل درس</span><span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-black text-emerald-800">📱 لا يحتاج لابتوب — طبّق من هاتفك</span><span style={{ color: red }}>ضمان استرجاع 7 أيام</span></div></div><aside className="rounded-2xl border bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]" style={{ borderColor: line }}>
  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F7EDEC] px-3 py-1 text-xs font-black" style={{ color: redDark }}>
    <Zap className="h-3.5 w-3.5 text-[#E3342F]" />
    <span>متبقي 6 مقاعد فقط بسعر الإطلاق</span>
  </div>
  <p className="mt-4 text-sm font-black" style={{ color: red }}>وفر تعب العام الدراسي بأكمله الآن!</p>
  <p className="mt-3 text-sm font-bold" style={{ color: muted }}>سعر الإطلاق الحالي</p>
  <div className="mt-1">
    <span className="text-lg font-bold line-through decoration-2" style={{ color: muted }}>79$</span>
    <span className="mr-3 text-5xl font-black" style={{ color: red }}>35$</span>
  </div>
  <p className="mt-2 text-sm font-bold" style={{ color: muted }}>قسطان مريحان بقيمة 17.5$ فقط لكل قسط</p>

  <div className="mt-4 rounded-xl bg-[#F8F8F6] p-3 text-xs leading-[1.8] font-bold text-[#444444] border border-[#E2E2DF] text-right">
    <p className="flex items-center gap-1.5 text-emerald-800">
      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
      <span>وصول فوري ودائم عبر تطبيق Telegram</span>
    </p>
    <p className="mt-1 text-[#666666] pr-5">
      متابعة خطوة بخطوة مع المدرب مباشرة من هاتفك المحمول.
    </p>
  </div>

  <a href={createWhatsAppLink('مرحباً، أريد الاشتراك الآن والحصول على تفعيل فوري في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('hero_price_card')} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-bold text-white transition hover:opacity-90 shadow-md" style={{ backgroundColor: red }}>
    اشترك الآن واحصل على تفعيل فوري <MessageCircle className="h-5 w-5" />
  </a>

  <div className="mt-3 rounded-xl bg-amber-50/90 p-2.5 text-right text-xs leading-[1.8] text-amber-950 border border-amber-200/70">
    <p className="font-bold flex items-center gap-1.5 text-amber-900">
      <span>💬</span>
      <span>ماذا سيحدث بعد الضغط على الزر؟</span>
    </p>
    <p className="mt-0.5 text-amber-900/90">
      ستتحدث مباشرة مع فريق الدعم عبر WhatsApp لاختيار وسيلة الدفع الأنسب لك، ونرسل لك رابط تفعيل الكورس فوراً خلال 5 دقائق دون أي تعقيد.
    </p>
  </div>

  <p className="mt-3 text-xs leading-[1.8]" style={{ color: muted }}>
    متاح التسجيل الفوري والدفع الآمن لجميع المعلمين والمدربين من داخل وخارج سوريا.
  </p>
</aside></div><div className="mx-auto mt-10 aspect-video max-w-[1000px] overflow-hidden bg-[#242424] shadow-[0_20px_45px_rgba(0,0,0,0.14)]">{isVideoOpen ? <iframe className="h-full w-full" src="https://www.youtube-nocookie.com/embed/9VwwdCr72bc?autoplay=1&rel=0" title="محاضرة مجانية: صناعة وكيل ذكاء اصطناعي للمعلم" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button type="button" onClick={() => { setIsVideoOpen(true); track('video_sample_play', { source: 'reference_style_hero' }); trackGoogleEvent('play_advanced_lesson', { source: 'reference_style_hero' }) }} className="group relative h-full w-full"><Image src="/images/advanced-lesson-poster.webp" alt="محاضرة مجانية" width={1280} height={720} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" priority /><div className="absolute inset-0 bg-black/40" /><div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"><span className="text-sm font-bold">محاضرة مجانية</span><span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: red }}><Play className="h-7 w-7 fill-current" /></span><span className="font-bold">شاهد العينة الآن</span></div></button>}</div><div className="mt-10 flex flex-col items-center gap-3 text-center">
  <Link
    href={resultsHref}
    onClick={() => trackResultsOpen('reference_style_hero')}
    className="group inline-flex items-center justify-center gap-3 rounded-2xl border-2 px-8 py-4 text-lg font-black text-white shadow-[0_14px_35px_rgba(227,52,47,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(227,52,47,0.45)] active:scale-95 md:px-10 md:py-5 md:text-xl"
    style={{ backgroundColor: red, borderColor: redDark }}
  >
    <span>شاهد نماذج عملناها من خلال الكورس</span>
    <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1.5" />
  </Link>
  <p className="text-sm font-bold" style={{ color: muted }}>
    امتحانات وزارية، خرائط ذهنية، إنفوجرافيك، عروض وبودكاست أُنتجت عمليًا
  </p>
</div></div>
      </section>

      {/* 2. المشكلة */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold" style={{ color: red }}>المشكلة ليست في خبرتك</p>
            <h2 className="text-3xl font-black leading-[1.4] md:text-5xl">المشكلة أن التحضير المتكرر يستهلك وقتك قبل أن تبدأ التدريس.</h2>
            <p className="mt-5 text-base leading-[2]" style={{ color: muted }}>عندك الكتاب والخبرة، لكن كل اختبار أو شرح أو ورقة امتحان أو مادة بصرية تحتاج أن تعيد تنسيقها من جديد. ومع الوقت يصير التشتت بين الملفات والأدوات أكبر من وقتك مع الطلاب.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ['01','تحضير عشوائي','كل درس يبدأ من صفحة فارغة.'],
              ['02','وقت ضائع','الكتابة والتنسيق يأخذان وقت الشرح.'],
              ['03','نسخة واحدة','تراجع متأخرًا وتعيد العمل عند كل تعديل.'],
              ['04','تشتت','تبحث عن الأداة بدل التركيز على المخرج.']
            ].map(([n,t,d]) => (
              <article key={n} className="rounded-2xl border bg-white p-6" style={{ borderColor: line }}>
                <span className="text-sm font-black" style={{ color: red }}>{n}</span>
                <h3 className="mt-5 text-xl font-black">{t}</h3>
                <p className="mt-3 text-sm leading-[1.9]" style={{ color: muted }}>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. الحل: مسار واحد */}
      <section className="px-5 py-16 text-white md:px-8 md:py-24" style={{ backgroundColor: ink }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 text-sm font-bold" style={{ color: red }}>الحل</p>
          <h2 className="max-w-3xl text-3xl font-black leading-[1.4] md:text-5xl">مسار واحد يربط كل مراحل صناعة المحتوى التعليمي</h2>
          <p className="mt-5 max-w-2xl text-base leading-[2] text-white/70">بدل نصائح متفرقة، تتعلم إطارًا يبدأ من المصدر، يمر بالاستخراج والمراجعة، وينتهي بمخرج تستطيع استخدامه مع طلابك.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['01','من المصدر إلى الشرح','حوّل الكتاب أو الدرس إلى شرح وفيديو واضح.'],
              ['02','من الدرس إلى الاختبار','استخرج الأسئلة وأخرج ورقة PDF ونموذج إجابة.'],
              ['03','من المحتوى إلى التأثير','ابنِ عرضًا أو بودكاست أو بحثًا ومادة تعليمية.']
            ].map(([n,t,d]) => (
              <article key={n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="text-sm font-bold" style={{ color: red }}>{n}</span>
                <h3 className="mt-5 text-xl font-black">{t}</h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/65">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. أثر الكورس على أرض الواقع */}
      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-bold" style={{ color: red }}>أثر الكورس على أرض الواقع</p>
              <h2 className="text-3xl font-black md:text-5xl">بنهاية المسار، ستكون قادرًا على إنتاج مخرجات تستخدمها فعلًا.</h2>
            </div>
            <span className="text-sm font-bold" style={{ color: muted }}>12 وحدة تقريبًا · 5 ساعات ونصف</span>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'شرح وفيديو تعليمي من مصدرك',
              'اختبارات وPDF جاهزة بعد المراجعة',
              'عروض وخرائط ذهنية وإنفوجرافيك',
              'بودكاست ومحتوى صوتي تعليمي',
              'تقارير وأبحاث مع تنظيم المصادر',
              'قوالب PDF للرجوع والتطبيق'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: red }} />
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. محتوى الكورس: المسار الكامل */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center md:text-right">
            <p className="mb-3 text-sm font-black" style={{ color: red }}>محتوى الكورس</p>
            <h2 className="text-3xl font-black md:text-5xl">المسار الكامل للكورس</h2>
            <p className="mt-2 text-xl font-bold md:text-2xl" style={{ color: red }}>من مصدر الدرس إلى محتوى تعليمي جاهز</p>
            <p className="mt-4 max-w-4xl text-base leading-[2] md:text-lg" style={{ color: muted }}>
              رحلة عملية واحدة بتبدأ من كتاب أو ملف أو درس عندك، وبتنتهي بمخرجات تعليمية جاهزة تقدر تراجعها وتستخدمها مع طلابك. بتتعلم المسار كاملًا خطوة بخطوة، من فهم المصدر وبناء الشرح، إلى إعداد الأسئلة والاختبارات، ثم إخراج المحتوى بالشكل المناسب.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {phases.map((phase, idx) => (
              <div key={phase.number} className="relative">
                <article className="overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)] md:p-8" style={{ borderColor: line }}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5" style={{ borderColor: line }}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-sm" style={{ backgroundColor: red }}>
                        {phase.number}
                      </span>
                      <div>
                        <span className="block text-xs font-black tracking-wide uppercase" style={{ color: redDark }}>
                          {phase.phaseLabel}
                        </span>
                        <h3 className="text-xl font-black md:text-2xl" style={{ color: ink }}>
                          {phase.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-3.5 py-1 text-xs font-bold" style={{ backgroundColor: soft, color: muted }}>
                        ⏱ {phase.lessons}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
                        مشمولة بالكامل ضمن الكورس
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-bold" style={{ color: red }}>
                      {phase.subtitle}
                    </p>
                    <p className="mt-3 text-base leading-[2] md:text-lg" style={{ color: ink }}>
                      {phase.overview}
                    </p>
                  </div>

                  <div className="mt-6 rounded-2xl p-5 md:p-6" style={{ backgroundColor: paper, border: `1px solid ${line}` }}>
                    <p className="mb-4 text-sm font-black" style={{ color: ink }}>
                      ماذا تتقن وتنجز عمليًا في هذه المرحلة؟
                    </p>
                    <div className="grid gap-3.5 md:grid-cols-2">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm leading-[1.9]" style={{ color: '#333333' }}>
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: red }} />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {idx < phases.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="flex flex-col items-center text-[#E3342F]">
                      <div className="h-4 w-0.5 bg-[#E3342F]/30" />
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F7EDEC] text-xs font-bold text-[#B92723]">
                        <ArrowDown className="h-4 w-4" />
                      </span>
                      <div className="h-4 w-0.5 bg-[#E3342F]/30" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)] md:p-10" style={{ borderColor: line }}>
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-[#F7EDEC] px-3.5 py-1 text-xs font-black" style={{ color: redDark }}>مخطط المسار المتكامل</span>
              <h3 className="mt-3 text-2xl font-black md:text-3xl">التسلسل العملي لكل درس من البداية وحتى الصف</h3>
              <p className="mt-2 text-sm leading-[1.8]" style={{ color: muted }}>تسلسل منطقي ثابت تطبقه على أي درس أو مادة تعليمية</p>
            </div>

            <div className="mx-auto mt-8 flex max-w-xl flex-col items-center">
              {workflowSteps.map((step, idx) => (
                <div key={step} className="flex w-full flex-col items-center">
                  <div className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-center transition ${idx === workflowSteps.length - 1 ? 'border-[#E3342F] bg-[#F7EDEC] text-[#B92723]' : idx === 0 ? 'border-[#242424] bg-[#242424] text-white' : 'border-[#E2E2DF] bg-[#F8F8F6] text-[#242424]'}`}>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${idx === workflowSteps.length - 1 ? 'bg-[#E3342F] text-white' : idx === 0 ? 'bg-white text-[#242424]' : 'bg-white text-[#E3342F] border border-[#E2E2DF]'}`}>{idx + 1}</span>
                    <span className="flex-1 text-base font-bold md:text-lg">{step}</span>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="flex flex-col items-center py-2 text-[#E3342F]">
                      <div className="h-3 w-0.5 bg-[#E3342F]/30" />
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border-2 p-6 text-center shadow-[0_8px_25px_rgba(0,0,0,0.03)] md:p-8" style={{ borderColor: 'rgba(227, 52, 47, 0.25)', backgroundColor: '#F7EDEC' }}>
            <p className="text-lg font-black leading-[1.9] md:text-2xl" style={{ color: ink }}>
              «لا تتعلم أدوات متفرقة؛ تتعلم نظامًا واحدًا يساعدك على الانتقال من مصدر الدرس إلى محتوى تعليمي جاهز.»
            </p>
          </div>
        </div>
      </section>

      {/* 6. المدرب */}
      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}>
        <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div className="flex justify-center">
            <Image src="/images/trainer-nawaf.webp" alt="المدرب نواف البوسطة" width={280} height={280} className="h-64 w-64 rounded-full object-cover ring-8 ring-white shadow-lg" />
          </div>
          <div>
            <p className="mb-4 text-sm font-bold" style={{ color: red }}>من يقودك؟</p>
            <h2 className="text-3xl font-black md:text-5xl">نواف البوسطة</h2>
            <p className="mt-3 font-bold" style={{ color: red }}>مدرب في الذكاء الاصطناعي وزيادة الإنتاجية</p>
            <p className="mt-5 max-w-2xl text-base leading-[2]" style={{ color: muted }}>
              صممت هذا الكورس للمعلم الذي يريد أن يخفف العمل المتكرر دون أن يتنازل عن خبرته أو قراره. الهدف ليس استعراض الأدوات، بل تحويلها إلى طريقة عمل واضحة ومخرجات تعليمية مفيدة.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-8" style={{ color: red }}>
              اعرف المزيد عن المدرب <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. هدايا التسجيل */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 text-sm font-bold" style={{ color: red }}>مع التسجيل</p>
          <h2 className="max-w-3xl text-3xl font-black md:text-5xl">هدايا وملفات تساعدك تطبق من أول يوم</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {gifts.map((gift) => (
              <article key={gift.title} className="rounded-2xl bg-white border p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]" style={{ borderColor: line }}>
                <gift.icon className="h-7 w-7" style={{ color: red }} />
                <p className="mt-5 text-xs font-black uppercase" style={{ color: red }}>{gift.value}</p>
                <h3 className="mt-2 text-xl font-black">{gift.title}</h3>
                <p className="mt-3 text-sm leading-[1.9]" style={{ color: muted }}>{gift.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. لمن يناسب الكورس */}
      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 text-sm font-bold" style={{ color: red }}>لمن يناسب الكورس؟</p>
          <h2 className="max-w-3xl text-3xl font-black md:text-5xl">هذا الكورس لك إذا كنت تريد تحضيرًا أسرع ومحتوى أوضح.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'تبدأ كل درس من الصفر وتريد طريقة ثابتة.',
              'لا تملك لابتوب وتريد التطبيق بالكامل من هاتفك المحمول.',
              'تريد إعداد اختبار أو عرض أو PDF خلال وقت أقل.',
              'تريد صناعة محتوى تعليمي يعرّف الطلاب بخبرتك.',
              'تحتاج مراجعة وتنظيمًا قبل مشاركة أي مخرج.',
              'لا تملك خبرة تقنية كبيرة وتريد شرحًا خطوة بخطوة.'
            ].map((text) => (
              <div key={text} className="rounded-2xl bg-white p-5 font-bold leading-[1.9] shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
                <CheckCircle2 className="mb-3 h-5 w-5" style={{ color: red }} />{text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. المقارنة */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-4 text-sm font-bold" style={{ color: red }}>مقارنة واضحة</p>
          <h2 className="text-3xl font-black md:text-5xl">ما الذي يجعله مختلفًا؟</h2>
          <div className="mt-10 overflow-hidden rounded-2xl border bg-white" style={{ borderColor: line }}>
            <div className="grid grid-cols-3 bg-[#242424] p-4 text-sm font-black text-white">
              <span>المعيار</span>
              <span>التحضير المعتاد</span>
              <span style={{ color: red }}>هذا الكورس</span>
            </div>
            {[
              ['البداية','صفحة فارغة كل مرة','تبدأ من مصدرك'],
              ['المخرج','ملف واحد أو شرح واحد','شرح واختبار وPDF وعرض ومحتوى'],
              ['المراجعة','متأخرة ومجهدة','مراجعة بشرية قبل الاستخدام'],
              ['الدعم','تجربة فردية','ملخصات PDF و4 جلسات أسئلة']
            ].map(([a,b,c]) => (
              <div key={a} className="grid grid-cols-3 gap-3 border-t p-4 text-sm leading-[1.8]" style={{ borderColor: line }}>
                <span className="font-black">{a}</span>
                <span style={{ color: muted }}>{b}</span>
                <span className="font-bold" style={{ color: red }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. آراء معلمين ومدربين من المنطقة */}
      <section className="border-y px-5 py-14 md:px-8 md:py-20" style={{ borderColor: line, backgroundColor: soft }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 text-center text-sm font-bold" style={{ color: red }}>آراء معلمين ومدربين من المنطقة</p>
          <h2 className="text-center text-3xl font-black md:text-5xl">شوف كيف تغيّر وقت التحضير والمخرجات</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ['أ. ماهر العلي', 'مدرس رياضيات للبكالوريا — حلب', 'يا جماعة، نحنا كمدرسين بكالوريا منعرف قديش تحضير درس الرياضيات وتأليف الأسئلة بياخد وقت ويهدّ الحيل. مسكت درس صعب ومن كتاب المنهج نفسه، وبوقت قصير طلعت دليل دراسة بصري وورقة امتحان مرتبة للطباعة. صار عندي بنك أسئلة وتصدير لملفات Word بدون تشتّت.'],
              ['أ. نورة الحربي', 'معلمة صفوف أولية ومصممة أنشطة — جدة', 'كمعلمة صفوف أولية كان أكبر همي شد انتباه الصغار. صرت أعمل إنفوجرافيك ملون وبطاقات مراجعة تفاعلية، وصار الشرح يناسب عمر الطلاب بدل ما يكون جاف. الأهم أني وفّرت وقت وجهد كبير بالتحضير.'],
              ['أ. عمر الحديثي', 'مدرس لغة إنكليزية — بغداد', 'كنت أعاني كيف أعمل محتوى استماع ممتع للطلاب. هلق بحوّل الدرس لبودكاست بصوتين يتناقشوا بالإنكليزي، وبجهّز الفيديوهات التوضيحية بدقائق. الكورس عملي وجاء بوقته.'],
              ['د. رغد العبد الله', 'مدربة ومستشارة تطوير تربوي — دمشق', 'صياغة الحقائب التدريبية وتصميم الورش كان يستهلك أسابيع. تعلمت أبني خطة الورشة والتمارين وأنشطة كسر الجمود بجودة أكاديمية وبوقت أقصر. هذا ليس مجرد تعليم أدوات، بل طريقة عمل تختصر الجهد التقليدي.']
            ].map(([name, role, quote]) => (
              <article key={name} className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
                <p className="text-base font-bold leading-[2]">“{quote}”</p>
                <p className="mt-5 font-black" style={{ color: red }}>{name}</p>
                <p className="mt-1 text-sm" style={{ color: muted }}>{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. طرق الدفع */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-4 text-center text-sm font-bold" style={{ color: red }}>التسجيل والدفع</p>
          <h2 className="text-center text-3xl font-black md:text-5xl">طرق دفع مريحة داخل سوريا وخارجها</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center leading-[2]" style={{ color: muted }}>
            ما بدنا طريقة الدفع تكون عائق أمام أي معلم أو مدرب. تواصل معنا، وخد الطريقة الأنسب إلك مع تفعيل سريع ومباشر.
          </p>
          <div className="mx-auto mt-10 grid max-w-[1000px] gap-5 md:grid-cols-2">
            <article className="rounded-2xl bg-white border p-7 shadow-[0_12px_35px_rgba(0,0,0,0.05)]" style={{ borderColor: line }}>
              <p className="text-sm font-black" style={{ color: red }}>داخل سوريا</p>
              <h3 className="mt-3 text-2xl font-black">دفع محلي وتفعيل فوري</h3>
              <p className="mt-4 leading-[2]" style={{ color: muted }}>عبر سيريتل كاش، شام كاش، شبكات الهرم، الفؤاد، بنك بيمو، وغيرها من الوسائل المتاحة، مع توضيح الخطوات كاملة عبر WhatsApp.</p>
            </article>
            <article className="rounded-2xl bg-white border p-7 shadow-[0_12px_35px_rgba(0,0,0,0.05)]" style={{ borderColor: line }}>
              <p className="text-sm font-black" style={{ color: red }}>خارج سوريا</p>
              <h3 className="mt-3 text-2xl font-black">تحويل آمن من أي دولة</h3>
              <p className="mt-4 leading-[2]" style={{ color: muted }}>نستقبل التسجيل والتحويل من جميع دول العالم عبر وسائل مريحة وآمنة مثل Western Union وPayPal وبطاقات الدفع العالمية، حسب المتاح.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 12. الأسئلة الشائعة */}
      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}>
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold" style={{ color: red }}>الأسئلة الشائعة</p>
            <h2 className="text-3xl font-black md:text-5xl">أسئلة طبيعية قبل اتخاذ القرار</h2>
          </div>
          <div className="mt-10 grid gap-3">
            {faqs.map(([q,a], i) => (
              <article key={q} className="rounded-2xl bg-white px-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-5 text-right font-black">
                  <span>{q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: red }} />
                </button>
                {openFaq === i && <p className="pb-5 text-sm leading-[2]" style={{ color: muted }}>{a}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 13. بطاقة العرض الختامي الشامل */}
      <section className="px-5 py-16 text-white md:px-8 md:py-24" style={{ backgroundColor: ink }}>
        <div className="mx-auto max-w-[900px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <Zap className="h-3.5 w-3.5" />
            <span>متبقي 6 مقاعد فقط بسعر الإطلاق</span>
          </div>
          <h2 className="mt-3 text-3xl font-black leading-[1.4] md:text-5xl">ابدأ من مصدرك، وخلي وقتك للشرح والطلاب.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-[2] text-white/70">
            تحصل على الكورس الكامل، ملفات PDF لكل درس، وصول دائم وتحديثات، مع متابعة شخصية خطوة بخطوة مع المدرب عبر Telegram.
          </p>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-7 text-right shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
            <p className="text-sm text-white/60">كل ما ستحصل عليه عند التسجيل</p>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />الكورس الكامل — 5 ساعات ونصف</p>
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />وصول فوري ودائم عبر Telegram مع متابعة خطوة بخطوة مع المدرب</p>
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />إمكانية المتابعة والتطبيق مباشرة من هاتفك المحمول</p>
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />ملخصات PDF مكتوبة لجميع الدروس</p>
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />4 جلسات مباشرة للأسئلة والأجوبة والتطبيق العملي</p>
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />وصول دائم وتحديثات مستقبلية مجانية</p>
            </div>
            <div className="my-6 border-t border-white/10 pt-5 text-center">
              <span className="text-sm text-white/50 line-through decoration-2">79$</span>
              <span className="mr-3 text-4xl font-black" style={{ color: red }}>35$</span>
              <p className="mt-2 text-xs text-white/50">قسطان متاحان: 17.5$ + 17.5$</p>
            </div>
            <a href={createWhatsAppLink('مرحباً، أريد الاشتراك في كورس الذكاء الاصطناعي للمعلمين بسعر العرض.')} onClick={() => trackWhatsAppClick('reference_style_final')} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 font-bold text-white transition hover:opacity-90 shadow-lg" style={{ backgroundColor: red }}>
              اشترك الآن في عرض التسجيل <MessageCircle className="h-5 w-5" />
            </a>
            <div className="mt-3 rounded-xl bg-white/5 p-2.5 text-right text-xs leading-[1.8] text-white/80 border border-white/10">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>💬</span>
                <span>ماذا سيحدث بعد الضغط على الزر؟</span>
              </p>
              <p className="mt-0.5 text-white/70">
                ستتحدث مباشرة مع فريق الدعم عبر WhatsApp لمساعدتك باختيار وسيلة الدفع الأنسب لك وتفعيل حسابك خلال دقائق دون أي تعقيد.
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-white/60">وصول فوري للمحتوى · <span className="font-bold" style={{ color: red }}>ضمان استرجاع كامل لمدة 7 أيام</span></p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-sm text-white" style={{ backgroundColor: ink }}>© {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين <span className="mx-2 text-white/40">·</span> <Link href={resultsHref} className="underline">نماذج المخرجات</Link></footer>
      <a href={createWhatsAppLink('مرحباً، أريد تفاصيل التسجيل في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('reference_style_mobile_sticky')} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg md:hidden" style={{ backgroundColor: red }}>احجز مكانك الآن <MessageCircle className="h-5 w-5" /></a>
    </main>
  )
}
