'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { affiliateMessageSuffix, referralHref, resolveAffiliateRef } from '@/lib/affiliate'
import {
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

const red = '#E3342F'
const redDark = '#B92723'
const ink = '#242424'
const muted = '#666666'
const paper = '#F8F8F6'
const soft = '#F0F0EE'
const line = '#E2E2DF'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [offerTimeLeft, setOfferTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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
    const offerEndsAt = new Date('2026-09-14T23:59:59-07:00').getTime()
    const update = () => {
      const total = Math.max(0, Math.floor((offerEndsAt - Date.now()) / 1000))
      setOfferTimeLeft({ days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 })
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
  }
  const trackResultsOpen = (source: string) => {
    track('results_open', { source, affiliate_ref: affiliateRef || 'direct' })
    trackGoogleEvent('view_samples', { button_location: source })
  }

  const modules = [
    { title: 'المسار الأول: من كتاب المنهج الجاف إلى شرح تفاعلي مخصص', lessons: 6, desc: 'تخلّص من الورقة البيضاء، وحوّل الدرس إلى شرح يناسب عمر طلابك ومستوياتهم المختلفة.', items: ['خطة تحضير أسبوعية متكاملة خلال دقائق، تحفظها كقالب وتستخدمها مع كل درس بدل البدء من الصفر.', 'تبسيط المفاهيم الصعبة والمجردة بصياغة تناسب طلابك من الابتدائي وحتى البكالوريا.', 'تحويل المادة الجافة إلى فيديوهات تعليمية صامتة أو متحركة بتعليق صوتي، دون الحاجة لمعدات تصوير أو مونتاج.', 'ملخص PDF مكتوب لكل درس من كتب المنهج، تقدمه لطلابك كمذكرة مرجعية جاهزة.'] },
    { title: 'المسار الثاني: أتمتة الاختبارات وصناعة أوراق الامتحانات الرسمية', lessons: 7, desc: 'وفّر الساعات التي تضيع في كتابة الأسئلة والتنسيق، واطلع بورقة امتحان مرتبة وجاهزة للطباعة.', items: ['بنك أسئلة متنوع: صح وخطأ، خيارات متعددة، وأسئلة تفكير نقدي مع سلالم تصحيح نموذجية.', 'تصدير الاختبار إلى Word قابل للتعديل أو عرض PowerPoint تفاعلي تظهر إجاباته بنقرة واحدة أمام الطلاب.', 'إخراج ورقة امتحان رسمية خلال نحو 18 دقيقة، مع الترويسة وبيانات الطالب وهوامش مريحة للعين.', 'بطاقات مراجعة رقمية Flashcards تساعد الطلاب يثبتوا المفاهيم بطريقة تفاعلية وممتعة.'] },
    { title: 'المسار الثالث: الوسائط البصرية والسمعية والبحث الاحترافي', lessons: 7, desc: 'خاطب الطالب البصري والسمعي، واختصر وقت البحث والتفريغ والتنسيق في مخرجات تعليمية مبهرة.', items: ['تحويل فصل كامل إلى Podcast تعليمي بصوتين يتناقشان بطريقة طبيعية تساعد الطالب يسمع ويراجع أثناء التنقل.', 'تفكيك الفصول الطويلة إلى خرائط ذهنية وإنفوجرافيك منظم يختصر الوحدة المعقدة في صفحة واحدة.', 'إعداد تقارير علمية موثقة والبحث عن استراتيجيات تدريس حديثة من مصادر موثوقة بدل البحث العشوائي.', 'تحويل أي فيديو تعليمي من YouTube إلى مصدر مكتوب وملخص داخل دفترك دون تفريغ يدوي.'] },
  ]
  const gifts = [
    { title: 'مكتبة البرومبتات وحزمة الأوامر الذهبية', value: '40 أمرًا + 40 مثالًا مجانًا', desc: 'أوامر عربية تفصيلية تغطي احتياجات المعلم والمدرب حتى تبدأ التطبيق بسرعة وبطريقة آمنة.', icon: Zap },
    { title: '4 جلسات متابعة مباشرة للأسئلة والأجوبة', value: 'مجانًا', desc: 'تطرح سؤالك ومادتك، ونطبق عليها معًا حتى تتأكد أنك أتقنت المسار ولم تبقَ وحدك أمام أي مشكلة.', icon: Users },
    { title: 'ملخصات PDF مكتوبة لكل درس', value: 'مجانًا', desc: 'مرجع سريع تراجع منه خطوات التطبيق العملي دون الحاجة لإعادة مشاهدة الفيديوهات من البداية.', icon: FileOutput },
  ]
  const faqs = [
    ['هل الكورس مناسب لمن لا يملك خبرة تقنية كبيرة؟', 'نعم. الشرح تدريجي ومبسط، ونبدأ من الصفر، ومع كل درس ملخص PDF يرجعلك وقت التطبيق حتى ما تضطر تعيد الفيديو كاملًا.'],
    ['هل المخرجات والامتحانات تلائم المناهج السورية الرسمية؟', 'نبدأ من كتاب المنهج أو المصدر الذي ترفقه أنت، ثم نراجع الناتج بشريًا قبل استخدامه. طبّقنا أمثلة على مواد واختبارات للمعلمين، لكن يبقى قرار الدقة والملاءمة بيد المعلم.'],
    ['هل الأدوات تحتاج اشتراكات شهرية مدفوعة؟', 'المسار يعتمد على حلول مجانية قدر الإمكان، ولا توجد تكاليف خفية ضمن رسوم الكورس. وإذا تغيّرت سياسات أي خدمة، نوضح ذلك قبل استخدامها.'],
    ['كيف أحصل على دعم إذا واجهت مشكلة؟', 'عندك 4 جلسات متابعة مباشرة للأسئلة والأجوبة، وتقدر تجيب سؤالك أو مادتك ونطبق عليها معًا.'],
    ['كيف يتم الدفع والاستلام من داخل سوريا وخارجها؟', 'داخل سوريا نوفر وسائل محلية مثل سيريتل كاش، شبكة الهرم، الفؤاد، بنك بيمو وغيرها حسب المتاح، ونوضح لك الطريقة المناسبة عبر WhatsApp. وبعد التفعيل تحصل على وصول دائم عبر Telegram.'],
    ['هل الشهادة إلزامية؟', 'لا. شهادة وزارة التنمية السورية اختيارية برسوم منفصلة، ويمكن طلبها بعد اختبار أو مشروع نهاية الكورس.'],
  ]

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden text-[#242424]" style={{ backgroundColor: paper, fontFamily: 'var(--font-ibm-plex-sans-arabic), sans-serif' }}>
      <div className="bg-[#242424] px-4 py-2.5 text-center text-sm font-bold text-white"><span className="text-[#F5F5F2]">سعر الإطلاق: </span><span style={{ color: red }}>35$</span><span className="mx-2 text-white/60">•</span><span>ينتهي خلال: </span><span className="tabular-nums">{offerTimeLeft.days}d : {String(offerTimeLeft.hours).padStart(2, '0')}h : {String(offerTimeLeft.minutes).padStart(2, '0')}m : {String(offerTimeLeft.seconds).padStart(2, '0')}s</span></div>

      <nav className="border-b px-4 py-4" style={{ borderColor: line, backgroundColor: paper }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: red }}><BookOpen className="h-4 w-4" /></span><span className="text-sm font-bold md:text-base">كورس الذكاء الاصطناعي للمعلمين</span></div><Link href="/schools" className="hidden items-center gap-2 text-sm font-bold sm:flex" style={{ color: red }}>للمؤسسات التعليمية <Building2 className="h-4 w-4" /></Link></div>
      </nav>

      <section className="px-5 py-14 text-center md:px-8 md:py-20">
        <div className="mx-auto max-w-[1000px]"><p className="mb-5 text-base font-bold" style={{ color: red }}>لكل معلم يريد بناء طريقة أذكى للتحضير وصناعة المحتوى</p><h1 className="mx-auto max-w-5xl text-4xl font-black leading-[1.35] tracking-tight md:text-6xl">تعلّم النظام الذي يساعدك على تحويل كتبك ودروسك إلى محتوى تعليمي جاهز بدل إعادة التحضير كل أسبوع</h1><p className="mx-auto mt-6 max-w-3xl text-base leading-[2] md:text-lg" style={{ color: muted }}>كورس عملي يأخذك من المصدر إلى الشرح والاختبار وملف PDF والعرض والفيديو والبودكاست، بخطوات واضحة تترك قرار المراجعة والدقة بإيدك.</p><p className="mx-auto mt-3 max-w-2xl font-bold leading-[2]" style={{ color: red }}>وفّر وقت التحضير، واصنع محتوى مفيد لطلابك، وانتقل من معلم يعيد إلى معلم يبني.</p><div className="mx-auto mt-9 aspect-video max-w-[900px] overflow-hidden bg-[#242424] shadow-[0_20px_45px_rgba(0,0,0,0.14)]">{isVideoOpen ? <iframe className="h-full w-full" src="https://www.youtube-nocookie.com/embed/rbblFAZJbjI?autoplay=1&rel=0" title="عينة من درس متقدم" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button type="button" onClick={() => { setIsVideoOpen(true); track('video_sample_play', { source: 'reference_style_hero' }); trackGoogleEvent('play_advanced_lesson', { source: 'reference_style_hero' }) }} className="group relative h-full w-full"><Image src="/images/advanced-lesson-poster.webp" alt="عينة من درس متقدم" width={1280} height={720} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" priority /><div className="absolute inset-0 bg-black/40" /><div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"><span className="text-sm font-bold">عينة من درس متقدم</span><span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: red }}><Play className="h-7 w-7 fill-current" /></span><span className="font-bold">شغّل العينة</span></div></button>}</div><div className="mt-8 flex flex-col items-center gap-3"><a href={createWhatsAppLink('مرحباً، أريد حجز مقعدي في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('reference_style_hero')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-bold text-white shadow-[0_14px_30px_rgba(227,52,47,0.22)] transition hover:-translate-y-0.5" style={{ backgroundColor: red }}>احجز مقعدك الآن <MessageCircle className="h-5 w-5" /></a><a href={resultsHref} onClick={() => trackResultsOpen('reference_style_hero')} className="text-sm font-bold underline decoration-2 underline-offset-8" style={{ textDecorationColor: red }}>شاهد النماذج الحقيقية أولًا</a></div><p className="mt-5 text-sm font-bold" style={{ color: muted }}>وصول دائم إلى الكورس · ملخصات PDF لكل درس · ضمان استرجاع كامل خلال 7 أيام</p></div>
      </section>

      <section className="border-y px-5 py-14 md:px-8 md:py-20" style={{ borderColor: line, backgroundColor: soft }}><div className="mx-auto max-w-[1180px]"><p className="mb-4 text-center text-sm font-bold" style={{ color: red }}>آراء معلمين ومدربين من المنطقة</p><h2 className="text-center text-3xl font-black md:text-5xl">شوف كيف تغيّر وقت التحضير والمخرجات</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{[
        ['أ. ماهر العلي', 'مدرس رياضيات للبكالوريا — حلب', 'يا جماعة، نحنا كمدرسين بكالوريا منعرف قديش تحضير درس الرياضيات وتأليف الأسئلة بياخد وقت ويهدّ الحيل. مسكت درس صعب ومن كتاب المنهج نفسه، وبوقت قصير طلعت دليل دراسة بصري وورقة امتحان مرتبة للطباعة. صار عندي بنك أسئلة وتصدير لملفات Word بدون تشتّت.'],
        ['أ. نورة الحربي', 'معلمة صفوف أولية ومصممة أنشطة — جدة', 'كمعلمة صفوف أولية كان أكبر همي شد انتباه الصغار. صرت أعمل إنفوجرافيك ملون وبطاقات مراجعة تفاعلية، وصار الشرح يناسب عمر الطلاب بدل ما يكون جاف. الأهم أني وفّرت وقت وجهد كبير بالتحضير.'],
        ['أ. عمر الحديثي', 'مدرس لغة إنكليزية — بغداد', 'كنت أعاني كيف أعمل محتوى استماع ممتع للطلاب. هلق بحوّل الدرس لبودكاست بصوتين يتناقشوا بالإنكليزي، وبجهّز الفيديوهات التوضيحية بدقائق. الكورس عملي وجاء بوقته.'],
        ['د. رغد العبد الله', 'مدربة ومستشارة تطوير تربوي — دمشق', 'صياغة الحقائب التدريبية وتصميم الورش كان يستهلك أسابيع. تعلمت أبني خطة الورشة والتمارين وأنشطة كسر الجمود بجودة أكاديمية وبوقت أقصر. هذا ليس مجرد تعليم أدوات، بل طريقة عمل تختصر الجهد التقليدي.'],
      ].map(([name, role, quote]) => <article key={name} className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]"><p className="text-base font-bold leading-[2]">“{quote}”</p><p className="mt-5 font-black" style={{ color: red }}>{name}</p><p className="mt-1 text-sm" style={{ color: muted }}>{role}</p></article>)}</div></div></section>

      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-[1180px]"><div className="max-w-3xl"><p className="mb-4 text-sm font-bold" style={{ color: red }}>المشكلة ليست في خبرتك</p><h2 className="text-3xl font-black leading-[1.4] md:text-5xl">المشكلة أن التحضير المتكرر يستهلك وقتك قبل أن تبدأ التدريس.</h2><p className="mt-5 text-base leading-[2]" style={{ color: muted }}>عندك الكتاب والخبرة، لكن كل اختبار أو شرح أو ورقة امتحان أو مادة بصرية تحتاج أن تعيد تنسيقها من جديد. ومع الوقت يصير التشتت بين الملفات والأدوات أكبر من وقتك مع الطلاب.</p></div><div className="mt-12 grid gap-5 md:grid-cols-4">{[['01','تحضير عشوائي','كل درس يبدأ من صفحة فارغة.'],['02','وقت ضائع','الكتابة والتنسيق يأخذان وقت الشرح.'],['03','نسخة واحدة','تراجع متأخرًا وتعيد العمل عند كل تعديل.'],['04','تشتت','تبحث عن الأداة بدل التركيز على المخرج.']].map(([n,t,d]) => <article key={n} className="rounded-2xl border bg-white p-6" style={{ borderColor: line }}><span className="text-sm font-black" style={{ color: red }}>{n}</span><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-3 text-sm leading-[1.9]" style={{ color: muted }}>{d}</p></article>)}</div></div></section>

      <section className="px-5 py-16 text-white md:px-8 md:py-24" style={{ backgroundColor: ink }}><div className="mx-auto max-w-[1180px]"><p className="mb-4 text-sm font-bold" style={{ color: red }}>الحل</p><h2 className="max-w-3xl text-3xl font-black leading-[1.4] md:text-5xl">مسار واحد يربط كل مراحل صناعة المحتوى التعليمي</h2><p className="mt-5 max-w-2xl text-base leading-[2] text-white/70">بدل نصائح متفرقة، تتعلم إطارًا يبدأ من المصدر، يمر بالاستخراج والمراجعة، وينتهي بمخرج تستطيع استخدامه مع طلابك.</p><div className="mt-12 grid gap-5 md:grid-cols-3">{[['01','من المصدر إلى الشرح','حوّل الكتاب أو الدرس إلى شرح وفيديو واضح.'],['02','من الدرس إلى الاختبار','استخرج الأسئلة وأخرج ورقة PDF ونموذج إجابة.'],['03','من المحتوى إلى التأثير','ابنِ عرضًا أو بودكاست أو بحثًا ومادة تعليمية.']].map(([n,t,d]) => <article key={n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><span className="text-sm font-bold" style={{ color: red }}>{n}</span><h3 className="mt-5 text-xl font-black">{t}</h3><p className="mt-3 text-sm leading-[1.9] text-white/65">{d}</p></article>)}</div></div></section>

      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}><div className="mx-auto max-w-[1180px]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-sm font-bold" style={{ color: red }}>أثر الكورس على أرض الواقع</p><h2 className="text-3xl font-black md:text-5xl">بنهاية المسار، ستكون قادرًا على إنتاج مخرجات تستخدمها فعلًا.</h2></div><span className="text-sm font-bold" style={{ color: muted }}>12 وحدة تقريبًا · 5 ساعات ونصف</span></div><div className="mt-10 grid gap-4 md:grid-cols-3">{['شرح وفيديو تعليمي من مصدرك','اختبارات وPDF جاهزة بعد المراجعة','عروض وخرائط ذهنية وإنفوجرافيك','بودكاست ومحتوى صوتي تعليمي','تقارير وأبحاث مع تنظيم المصادر','قوالب PDF للرجوع والتطبيق'].map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: red }} /><span className="font-bold">{item}</span></div>)}</div></div></section>

      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-[1180px]"><p className="mb-4 text-sm font-bold" style={{ color: red }}>محتوى الكورس</p><h2 className="max-w-3xl text-3xl font-black md:text-5xl">ثلاثة مسارات عملية من المصدر إلى المخرج التعليمي</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{modules.map((mod, i) => <article key={mod.title} className="rounded-2xl border bg-white p-2 shadow-[0_12px_35px_rgba(0,0,0,0.05)]" style={{ borderColor: line }}><button onClick={() => setOpenModule(openModule === i ? null : i)} className="flex w-full items-start justify-between gap-4 p-5 text-right"><span><span className="block text-sm font-black" style={{ color: red }}>المسار 0{i + 1}</span><span className="mt-3 block text-lg font-black">{mod.title}</span><span className="mt-2 block text-sm" style={{ color: muted }}>{mod.lessons} محاضرات · {mod.desc}</span></span><ChevronDown className={`mt-1 h-5 w-5 shrink-0 transition-transform ${openModule === i ? 'rotate-180' : ''}`} style={{ color: red }} /></button>{openModule === i && <ul className="space-y-3 px-5 pb-6">{mod.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-[1.9]" style={{ color: muted }}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={{ color: red }} />{item}</li>)}</ul>}</article>)}</div></div></section>

      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}><div className="mx-auto max-w-[1180px]"><p className="mb-4 text-sm font-bold" style={{ color: red }}>مع التسجيل</p><h2 className="max-w-3xl text-3xl font-black md:text-5xl">هدايا وملفات تساعدك تطبق من أول يوم</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{gifts.map((gift) => <article key={gift.title} className="rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]"><gift.icon className="h-7 w-7" style={{ color: red }} /><p className="mt-5 text-xs font-black uppercase" style={{ color: red }}>{gift.value}</p><h3 className="mt-2 text-xl font-black">{gift.title}</h3><p className="mt-3 text-sm leading-[1.9]" style={{ color: muted }}>{gift.desc}</p></article>)}</div></div></section>

      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center"><div className="flex justify-center"><Image src="/images/trainer-nawaf.webp" alt="المدرب نواف البوسطة" width={280} height={280} className="h-64 w-64 rounded-full object-cover ring-8 ring-[#F0F0EE]" /></div><div><p className="mb-4 text-sm font-bold" style={{ color: red }}>من يقودك؟</p><h2 className="text-3xl font-black md:text-5xl">نواف البوسطة</h2><p className="mt-3 font-bold" style={{ color: red }}>مدرب في الذكاء الاصطناعي وزيادة الإنتاجية</p><p className="mt-5 max-w-2xl text-base leading-[2]" style={{ color: muted }}>صممت هذا الكورس للمعلم الذي يريد أن يخفف العمل المتكرر دون أن يتنازل عن خبرته أو قراره. الهدف ليس استعراض الأدوات، بل تحويلها إلى طريقة عمل واضحة ومخرجات تعليمية مفيدة.</p><Link href="/about" className="mt-6 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-8" style={{ color: red }}>اعرف المزيد عن المدرب <ArrowLeft className="h-4 w-4" /></Link></div></div></section>

      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}><div className="mx-auto max-w-[1180px]"><p className="mb-4 text-sm font-bold" style={{ color: red }}>لمن يناسب الكورس؟</p><h2 className="max-w-3xl text-3xl font-black md:text-5xl">هذا الكورس لك إذا كنت تريد تحضيرًا أسرع ومحتوى أوضح.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{['تبدأ كل درس من الصفر وتريد طريقة ثابتة.', 'تريد إعداد اختبار أو عرض أو PDF خلال وقت أقل.', 'تريد صناعة محتوى تعليمي يعرّف الطلاب بخبرتك.', 'تحتاج مراجعة وتنظيمًا قبل مشاركة أي مخرج.', 'لا تملك خبرة تقنية كبيرة وتريد شرحًا خطوة بخطوة.', 'تريد العودة إلى ملخصات PDF بدل إعادة كل درس.'].map((text) => <div key={text} className="rounded-2xl bg-white p-5 font-bold leading-[1.9] shadow-[0_8px_25px_rgba(0,0,0,0.04)]"><CheckCircle2 className="mb-3 h-5 w-5" style={{ color: red }} />{text}</div>)}</div></div></section>

      <section className="px-5 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-[1000px]"><p className="mb-4 text-sm font-bold" style={{ color: red }}>مقارنة واضحة</p><h2 className="text-3xl font-black md:text-5xl">ما الذي يجعله مختلفًا؟</h2><div className="mt-10 overflow-hidden rounded-2xl border bg-white" style={{ borderColor: line }}><div className="grid grid-cols-3 bg-[#242424] p-4 text-sm font-black text-white"><span>المعيار</span><span>التحضير المعتاد</span><span style={{ color: red }}>هذا الكورس</span></div>{[['البداية','صفحة فارغة كل مرة','تبدأ من مصدرك'],['المخرج','ملف واحد أو شرح واحد','شرح واختبار وPDF وعرض ومحتوى'],['المراجعة','متأخرة ومجهدة','مراجعة بشرية قبل الاستخدام'],['الدعم','تجربة فردية','ملخصات PDF و4 جلسات أسئلة']].map(([a,b,c]) => <div key={a} className="grid grid-cols-3 gap-3 border-t p-4 text-sm leading-[1.8]" style={{ borderColor: line }}><span className="font-black">{a}</span><span style={{ color: muted }}>{b}</span><span className="font-bold" style={{ color: red }}>{c}</span></div>)}</div></div></section>

      <section className="px-5 py-16 text-white md:px-8 md:py-24" style={{ backgroundColor: ink }}><div className="mx-auto max-w-[900px] text-center"><p className="mb-4 text-sm font-bold" style={{ color: red }}>ضمان استرجاع كامل لمدة 7 أيام</p><h2 className="text-3xl font-black leading-[1.4] md:text-5xl">ابدأ من مصدرك، وخلي وقتك للشرح والطلاب.</h2><p className="mx-auto mt-5 max-w-2xl leading-[2] text-white/70">تحصل على الكورس الكامل، ملفات PDF لكل درس، 4 جلسات مباشرة للأسئلة، وتحديثات مستقبلية.</p><div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-7 text-right shadow-[0_18px_45px_rgba(0,0,0,0.16)]"><p className="text-sm text-white/60">كل ما ستحصل عليه عند التسجيل</p><div className="mt-5 space-y-3 text-sm text-white/80"><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />الكورس الكامل — 5 ساعات ونصف</p><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />ملخصات PDF لجميع الدروس</p><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />4 جلسات مباشرة للأسئلة والأجوبة</p><p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: red }} />وصول دائم وتحديثات</p></div><div className="my-6 border-t border-white/10 pt-5 text-center"><span className="text-sm text-white/50 line-through decoration-2">79$</span><span className="mr-3 text-4xl font-black" style={{ color: red }}>35$</span><p className="mt-2 text-xs text-white/50">قسطان متاحان: 17.5$ + 17.5$</p></div><a href={createWhatsAppLink('مرحباً، أريد الاشتراك في كورس الذكاء الاصطناعي للمعلمين بسعر العرض.')} onClick={() => trackWhatsAppClick('reference_style_final')} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 font-bold text-white transition hover:opacity-90" style={{ backgroundColor: red }}>اشترك الآن في عرض التسجيل <MessageCircle className="h-5 w-5" /></a><p className="mt-4 text-center text-xs text-white/50">وصول فوري للمحتوى · ضمان استرجاع كامل لمدة 7 أيام</p></div></div></section>

      <section className="border-y px-5 py-16 md:px-8 md:py-24" style={{ borderColor: line, backgroundColor: soft }}><div className="mx-auto max-w-[900px]"><div className="text-center"><p className="mb-4 text-sm font-bold" style={{ color: red }}>الأسئلة الشائعة</p><h2 className="text-3xl font-black md:text-5xl">أسئلة طبيعية قبل اتخاذ القرار</h2></div><div className="mt-10 grid gap-3">{faqs.map(([q,a], i) => <article key={q} className="rounded-2xl bg-white px-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-5 text-right font-black"><span>{q}</span><ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: red }} /></button>{openFaq === i && <p className="pb-5 text-sm leading-[2]" style={{ color: muted }}>{a}</p>}</article>)}</div></div></section>

      <footer className="px-5 py-8 text-center text-sm text-white" style={{ backgroundColor: ink }}>© {new Date().getFullYear()} — كورس الذكاء الاصطناعي للمعلمين <span className="mx-2 text-white/40">·</span> <Link href={resultsHref} className="underline">نماذج المخرجات</Link></footer>
      <a href={createWhatsAppLink('مرحباً، أريد تفاصيل التسجيل في كورس الذكاء الاصطناعي للمعلمين.')} onClick={() => trackWhatsAppClick('reference_style_mobile_sticky')} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg md:hidden" style={{ backgroundColor: red }}>احجز مكانك الآن <MessageCircle className="h-5 w-5" /></a>
    </main>
  )
}
